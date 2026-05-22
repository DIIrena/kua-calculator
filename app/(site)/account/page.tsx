import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { saveDetails, deleteAccount } from "./actions";

export const metadata: Metadata = {
  title: "Your account | My Feng Shui Home",
  description: "Your My Feng Shui Home account: saved birth data and charts.",
  robots: { index: false, follow: true },
};

type Profile = {
  email: string | null;
  birth_year: number | null;
  birth_month: number | null;
  birth_day: number | null;
  gender: string | null;
  marketing_opt_in: boolean;
};

type SavedChart = {
  id: string;
  kua_number: number | null;
  kua_group: string | null;
  label: string | null;
  created_at: string;
};

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

// Auth-gated dashboard. Server Component. Redirects to /sign-in when there
// is no session. Shows the account email, lets the holder save their birth
// data, toggle the marketing opt-in, and delete their account.
export default async function AccountPage() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;

  // With placeholder env vars there is no real auth; show a clear notice
  // instead of crashing so the page still builds and renders.
  if (!url || url.includes("PLACEHOLDER")) {
    return (
      <div className="page-narrow">
        <div className="account-section">
          <h2>Account not connected yet</h2>
          <p>
            The account features need a Supabase project. Once the site owner
            connects Supabase and sets the environment variables, sign-in and
            this dashboard go live.
          </p>
        </div>
      </div>
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/sign-in");

  const { data: profileData } = await supabase
    .from("profiles")
    .select(
      "email, birth_year, birth_month, birth_day, gender, marketing_opt_in",
    )
    .eq("id", user.id)
    .single();

  const profile: Profile = profileData ?? {
    email: user.email ?? null,
    birth_year: null,
    birth_month: null,
    birth_day: null,
    gender: null,
    marketing_opt_in: false,
  };

  const { data: chartsData } = await supabase
    .from("saved_charts")
    .select("id, kua_number, kua_group, label, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const charts: SavedChart[] = chartsData ?? [];

  return (
    <div className="page-narrow">
      <p className="eyebrow">My Feng Shui Home</p>
      <h1 style={{ marginTop: 0 }}>Your account</h1>

      <section className="account-section">
        <h2>Signed in as</h2>
        <p className="account-email">{profile.email ?? user.email}</p>
      </section>

      <section className="account-section">
        <h2>Your birth data</h2>
        <p>
          Save your birth date and gender so the calculator can recall them.
          This is optional. The calculator itself never sends this data
          anywhere; saving it here stores it on your account.
        </p>
        <form action={saveDetails}>
          <div className="account-grid">
            <div className="field">
              <label className="field-label" htmlFor="birth_year">
                Birth year
              </label>
              <input
                id="birth_year"
                name="birth_year"
                type="number"
                min="1900"
                max="2050"
                defaultValue={profile.birth_year ?? ""}
                placeholder="1985"
              />
            </div>
            <div className="field">
              <label className="field-label" htmlFor="birth_month">
                Birth month
              </label>
              <select
                id="birth_month"
                name="birth_month"
                defaultValue={profile.birth_month ?? ""}
              >
                <option value="">--</option>
                {MONTHS.map((m, i) => (
                  <option key={m} value={i + 1}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label className="field-label" htmlFor="birth_day">
                Birth day
              </label>
              <input
                id="birth_day"
                name="birth_day"
                type="number"
                min="1"
                max="31"
                defaultValue={profile.birth_day ?? ""}
                placeholder="15"
              />
            </div>
            <div className="field">
              <label className="field-label" htmlFor="gender">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                defaultValue={profile.gender ?? ""}
              >
                <option value="">--</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>

          <div className="checkbox-row">
            <input
              id="marketing_opt_in"
              name="marketing_opt_in"
              type="checkbox"
              defaultChecked={profile.marketing_opt_in}
            />
            <label htmlFor="marketing_opt_in" className="checkbox-text">
              Email me my chart and occasional feng shui guidance. You can
              change this at any time.
            </label>
          </div>

          <button type="submit" className="cta-primary">
            Save my details
          </button>
        </form>
      </section>

      <section className="account-section">
        <h2>Your saved charts</h2>
        {charts.length === 0 ? (
          <p>
            You have not saved any charts yet. Saving a chart is part of
            Stage 2 of the build.
          </p>
        ) : (
          <ul className="account-saved-list">
            {charts.map((c) => (
              <li key={c.id}>
                {c.label ?? "Chart"} - Kua {c.kua_number ?? "?"} (
                {c.kua_group ?? "group unknown"})
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="account-section">
        <h2>Delete your account</h2>
        <p>
          This permanently removes your account, your saved birth data, and
          your saved charts. It cannot be undone.
        </p>
        <form action={deleteAccount}>
          <div className="account-actions">
            <button type="submit" className="btn-danger">
              Delete my account
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
