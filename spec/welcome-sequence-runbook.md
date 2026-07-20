# Welcome sequence runbook (OFF by default)

The three emails you approved on 2026-07-18 are now wired, word for word, as a
sequence: step 1 on join, step 2 about day 3, step 3 about day 7. The audience
is only the consented note lists (footer subscribers, checklist opt-ins, and
Good Days opt-ins). Every email carries a one-click unsubscribe that deletes
the address entirely. NOTHING SENDS until you complete Part B.

## Part A - Apply the database migration (one time, 2 minutes)

1. Go to `supabase.com`, open the `My-feng-shui-home` project.
2. In the left sidebar click `SQL Editor`.
3. Click `New query`.
4. In VS Code, open
   `projects/kua-calculator/supabase/migrations/0010_newsletter_sequence.sql`,
   copy the whole file, paste it into the SQL editor.
5. Click `Run`. You should see `Success. No rows returned`.

## Part B - Turn the sequence on (when you are ready, 3 minutes)

1. Go to `vercel.com`, open the `my-feng-shui-home` project.
2. Click `Settings`, then `Environment Variables`.
3. Click `Add New`. In `Key` type `WELCOME_SEQUENCE_ENABLED`, in `Value` type
   `true`. Tick only `Production`. Click `Save`.
4. Go to the `Deployments` tab, open the newest deployment's `...` menu and
   click `Redeploy` so the variable takes effect.
5. From then on the sequence runs once a day at 14:30 UTC automatically.

## Part C - Safe preview any time (even while OFF)

1. In Vercel, `Settings > Environment Variables`, click the eye icon on
   `CRON_SECRET` and copy its value.
2. In a terminal run (paste your secret in place of SECRET):
   `curl -H "Authorization: Bearer SECRET" "https://myfengshuihome.com/api/cron/welcome?dry=1"`
3. It answers with `enabled`, the audience size, and exactly which step
   emails WOULD go out, without sending anything.

## Part D - Turning it off

Set `WELCOME_SEQUENCE_ENABLED` to `false` in Vercel (or delete the variable)
and redeploy. The cron keeps running but reports enabled:false and sends
nothing.

## Notes

- A fourth email (a gentle flagship case study) can join the sequence later;
  per the standing rule its copy goes into spec/welcome-emails-2026-07-18.md
  for your approval first.
- Anyone who unsubscribes disappears from the audience immediately (the rows
  are deleted); their progress row stays so a re-subscribe never restarts
  the sequence from step 1.
