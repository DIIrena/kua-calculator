// Renderer for 7-Day Home Reset course emails. Converts an email's
// markdown body into inline-styled HTML (email clients strip <style>
// blocks, so every element carries its own style), wraps it in the brand
// shell, and appends a one-click unsubscribe footer.
//
// Markdown subset supported (matches the drafted course bodies):
//   ## Heading
//   paragraphs (blank-line separated)
//   - bullet list
//   1. ordered list
//   **bold** inline

const BRAND = "My Feng Shui Home";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function inline(s: string): string {
  // Escape first, then apply **bold**. The source is trusted (our own
  // course copy), but escaping keeps any stray angle bracket safe.
  return escapeHtml(s).replace(
    /\*\*(.+?)\*\*/g,
    '<strong style="font-weight:700;color:#0e3b2c;">$1</strong>',
  );
}

const P = 'style="margin:0 0 14px;font:16px/1.6 sans-serif;color:#0e3b2c;"';
const H2 =
  'style="margin:26px 0 10px;font:700 17px sans-serif;color:#0e3b2c;"';
const LI = 'style="margin:0 0 8px;font:16px/1.55 sans-serif;color:#0e3b2c;"';
const UL = 'style="margin:0 0 14px;padding-left:22px;"';

/** Render the supported markdown subset to inline-styled email HTML. */
export function renderCourseBody(markdown: string): string {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const out: string[] = [];
  let para: string[] = [];
  let list: string[] = [];
  let listTag: "ul" | "ol" | null = null;

  const flushPara = () => {
    if (para.length) {
      out.push(`<p ${P}>${inline(para.join(" "))}</p>`);
      para = [];
    }
  };
  const flushList = () => {
    if (list.length && listTag) {
      const items = list.map((t) => `<li ${LI}>${inline(t)}</li>`).join("");
      out.push(`<${listTag} ${UL}>${items}</${listTag}>`);
      list = [];
      listTag = null;
    }
  };

  for (const raw of lines) {
    const line = raw.trimEnd();
    if (line.trim() === "") {
      flushPara();
      flushList();
      continue;
    }
    const h2 = line.match(/^##\s+(.*)$/);
    if (h2) {
      flushPara();
      flushList();
      out.push(`<h2 ${H2}>${inline(h2[1])}</h2>`);
      continue;
    }
    const bullet = line.match(/^-\s+(.*)$/);
    if (bullet) {
      flushPara();
      if (listTag && listTag !== "ul") flushList();
      listTag = "ul";
      list.push(bullet[1]);
      continue;
    }
    const ordered = line.match(/^\d+\.\s+(.*)$/);
    if (ordered) {
      flushPara();
      if (listTag && listTag !== "ol") flushList();
      listTag = "ol";
      list.push(ordered[1]);
      continue;
    }
    // plain text -> part of the current paragraph
    flushList();
    para.push(line.trim());
  }
  flushPara();
  flushList();
  return out.join("\n");
}

function shell(bodyHtml: string, preheader: string, unsubscribeUrl: string): string {
  return `<!doctype html>
<html lang="en">
<body style="margin:0;padding:32px 16px;background:#fcfcf8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;color:#0e3b2c;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preheader)}</div>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
    <tr><td align="center">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:560px;background:#ffffff;border:1px solid #e2dac5;border-radius:14px;padding:32px;">
        <tr><td>
          <div style="font-family:'Brush Script MT',cursive;font-size:30px;color:#0e3b2c;line-height:1;">${BRAND}</div>
          <hr style="border:none;border-top:1px solid #e2dac5;margin:18px 0 24px;" />
          ${bodyHtml}
        </td></tr>
        <tr><td style="padding-top:24px;font:13px/1.5 sans-serif;color:#4f5b53;border-top:1px solid #e2dac5;">
          You are getting these because you started the 7-Day Home Reset.
          <a href="${unsubscribeUrl}" style="color:#4f5b53;">Unsubscribe</a> any time and the emails stop.
        </td></tr>
      </table>
      <div style="font-size:12px;color:#4f5b53;padding-top:14px;">myfengshuihome.com</div>
    </td></tr>
  </table>
</body>
</html>`;
}

function plainText(markdown: string, unsubscribeUrl: string): string {
  const body = markdown
    .replace(/\r\n/g, "\n")
    .replace(/^##\s+/gm, "")
    .replace(/\*\*(.+?)\*\*/g, "$1");
  return `${body}\n\n---\nYou are getting these because you started the 7-Day Home Reset.\nUnsubscribe: ${unsubscribeUrl}\n${BRAND} - myfengshuihome.com`;
}

export function buildCourseEmail(input: {
  subject: string;
  preheader: string;
  body: string;
  unsubscribeUrl: string;
}): { subject: string; html: string; text: string } {
  const bodyHtml = renderCourseBody(input.body);
  return {
    subject: input.subject,
    html: shell(bodyHtml, input.preheader, input.unsubscribeUrl),
    text: plainText(input.body, input.unsubscribeUrl),
  };
}
