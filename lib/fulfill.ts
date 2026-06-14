import type Stripe from "stripe";
import {
  findCommerceProduct,
  DOWNLOAD_URL_TTL_SECONDS,
} from "@/lib/commerce";
import { createAdminClient } from "@/lib/supabase/server";
import { sendEmail } from "@/lib/resend";
import {
  buildStaticDeliveryEmail,
  buildPersonalizationInviteEmail,
} from "@/lib/email-delivery";
import { findCourse, courseEmailForDay } from "@/lib/courses/seven-day-reset";
import { buildCourseEmail } from "@/lib/email-course";
import { unsubscribeUrl } from "@/lib/unsubscribe-token";

// Shared post-payment fulfilment for ONE product. Extracted so the
// single-item checkout (/api/checkout) and the multi-item cart checkout
// (/api/cart-checkout) deliver identically.
//
//   - static       : mint 7-day signed URLs and email them now.
//   - personalized : email a link to the post-checkout form.
//   - course       : enrol + send the welcome email.
//
// Never throws: any hiccup is logged. The order row already exists, and
// the success page can re-deliver, so the webhook stays a 200.

type Admin = ReturnType<typeof createAdminClient>;
type Product = NonNullable<ReturnType<typeof findCommerceProduct>>;

export async function fulfillProduct(
  admin: Admin,
  product: Product,
  email: string,
  orderId: string,
  session: Stripe.Checkout.Session,
  site: string,
): Promise<void> {
  try {
    if (product.fulfillment === "static" && product.files?.length) {
      const links: Array<{ url: string; label: string }> = [];
      for (const file of product.files) {
        const { data: signed, error: signErr } = await admin.storage
          .from("product-files")
          .createSignedUrl(file.path, DOWNLOAD_URL_TTL_SECONDS);
        if (signErr || !signed?.signedUrl) {
          throw new Error(
            `sign failed for ${file.path}: ${signErr?.message ?? "no url"}`,
          );
        }
        links.push({ url: signed.signedUrl, label: file.label });
      }

      const crossSell =
        product.slug === "annual-feng-shui-planner-2026"
          ? {
              text: "Also useful with the Planner:",
              url: `${site}/products/personal-feng-shui-compass`,
              label: "the Personal Feng Shui Compass, keyed to your Kua.",
            }
          : undefined;

      const mail = buildStaticDeliveryEmail({
        productTitle: product.shortTitle,
        links,
        crossSellLine: crossSell,
      });
      const sent = await sendEmail({
        to: email,
        subject: mail.subject,
        html: mail.html,
        text: mail.text,
      });
      if (!sent.ok) {
        console.error(
          `[fulfill] delivery email failed for order ${orderId}: ${sent.error}`,
        );
      }
    } else if (product.fulfillment === "personalized") {
      const formUrl = `${site}/products/${product.slug}/success?session_id=${session.id}`;
      const mail = buildPersonalizationInviteEmail({
        productTitle: product.shortTitle,
        formUrl,
      });
      const sent = await sendEmail({
        to: email,
        subject: mail.subject,
        html: mail.html,
        text: mail.text,
      });
      if (!sent.ok) {
        console.error(
          `[fulfill] invite email failed for order ${orderId}: ${sent.error}`,
        );
      }
    } else if (product.fulfillment === "course" && product.courseSlug) {
      const course = findCourse(product.courseSlug);
      if (course) {
        const emailLower = email.toLowerCase();
        const { error: enrolErr } = await admin
          .from("course_enrollments")
          .upsert(
            {
              email: emailLower,
              course_slug: course.slug,
              order_id: orderId,
              day_sent: 0,
              last_sent_at: new Date().toISOString(),
            },
            { onConflict: "email,course_slug", ignoreDuplicates: true },
          );
        if (enrolErr) {
          console.error(
            `[fulfill] enrol failed for order ${orderId}: ${enrolErr.message}`,
          );
        }
        const welcome = courseEmailForDay(course, 0);
        if (welcome) {
          const mail = buildCourseEmail({
            subject: welcome.subject,
            preheader: welcome.preheader,
            body: welcome.body,
            unsubscribeUrl: unsubscribeUrl(site, emailLower, course.slug),
          });
          const sent = await sendEmail({
            to: email,
            subject: mail.subject,
            html: mail.html,
            text: mail.text,
          });
          if (!sent.ok) {
            console.error(
              `[fulfill] welcome email failed for order ${orderId}: ${sent.error}`,
            );
          }
        }
      }
    }
  } catch (err) {
    console.error(`[fulfill] error for order ${orderId}:`, err);
  }
}
