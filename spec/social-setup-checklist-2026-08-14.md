# Social accounts + email: the one-sitting checklist (2026-08-14)

Work top to bottom and tick as you go. Budget ~2 to 2.5 hours. Everything
paste-ready is in a code block. The avatar for every account is the same
file: `projects/kua-calculator/public/apple-icon.png` (the brand heart).
Handle everywhere: `myfengshuihome`. If a platform says the name is taken,
use `my.fengshui.home` there and note it at the bottom of this file.

---

## Phase 0 - The brand email address (15 min, do this first)

Everything below signs up with ONE dedicated address, so your personal
inbox stays clean and the business survives any personal account issue.

- [ ] 1. Go to `gmail.com`, click `Create account`, choose `For work or my business`.
- [x] 2. Done: the address is `myfengshuihomeusa@gmail.com`.
- [ ] 3. Recovery email: `diirena@gmail.com`. Recovery phone: your phone.
- [ ] 4. After signup, open `myaccount.google.com` > `Security` >
      `2-Step Verification` and turn it ON with your phone.
- [ ] 5. Save the password in your browser's password manager when prompted,
      and use "Sign in with Google" on every platform below that offers it.
- [ ] 6. Keep `hello@myfengshuihome.com` as the public contact address in
      bios; the new Gmail is for logins only.

## Phase 0b - Make hello@ a real mailbox with Zoho Mail (20 min)

**Required before the newsletter send.** Checked 2026-08-14: the domain
has NO MX records, so replies to hello@myfengshuihome.com currently
bounce, and our emails invite replies. Resend keeps doing the sending;
Zoho Mail (free plan) becomes the receiving inbox.

- [ ] 0b.1. Go to `zoho.com/mail`, open `Pricing`, scroll to the bottom
      and pick the `Forever Free` plan. Sign up with the new Gmail.
- [ ] 0b.2. Choose `Add an existing domain`, enter `myfengshuihome.com`
      (organisation: Mens Sana LLC).
- [ ] 0b.3. Verify the domain: Zoho shows a TXT record. In a new tab open
      `hpanel.hostinger.com` (your DNS lives at Hostinger, NOT Vercel),
      go to `Domains` > `myfengshuihome.com` > `DNS / Nameservers`, click
      `Add record`: Type `TXT`, Name `@`, paste the Zoho value, `Add
      record`. Back in Zoho click `Verify`.
- [ ] 0b.4. Create the mailbox user: `hello@myfengshuihome.com`.
- [ ] 0b.5. MX records: Zoho shows three (like `mx.zoho.com` priority 10,
      `mx2.zoho.com` 20, `mx3.zoho.com` 50; use exactly what your Zoho
      screen shows). Add each in Hostinger DNS: Type `MX`, Name `@`,
      the mail server, its priority.
- [x] 0b.6. DNS verified by Claude 2026-08-14: MX live (Zoho EU),
      Resend's SPF is scoped to the `send.` subdomain, no root SPF
      exists. Enabling Zoho sending is conflict-free. Do 0b.6a-0b.6d.
- [x] 0b.6a. Zoho SPF: DONE, verified in DNS 2026-08-14
      (`v=spf1 include:zohomail.eu ~all`, the value from Zoho's screen).
- [x] 0b.6b. Zoho DKIM: TXT published and verified in DNS 2026-08-14.
      One thing to double-check in `mailadmin.zoho.eu` > `Email
      Configuration` > `DKIM`: the `zmail` selector row must show as
      VERIFIED / enabled, so Zoho actually signs outgoing mail with it.
- [x] 0b.6c. DMARC: DONE, verified in DNS (`v=DMARC1; p=none;`).
- [x] 0b.6d. Claude re-verified all three by DNS lookup 2026-08-14.
- [ ] 0b.7. Test both directions at `mail.zoho.eu`: (1) email
      `hello@myfengshuihome.com` from your personal Gmail and watch it
      arrive; (2) reply to it FROM Zoho and confirm it lands in your
      Gmail inbox, not spam. Check the hello@ inbox weekly once things
      send.

Division of labour, permanent: **Resend** sends everything automated
(site emails, launch sends). **Zoho** is for human mail from hello@:
replies, support, outreach. Bulk never goes through Zoho.

## Phase 1 - Pinterest: only the boards remain (15 min)

Already done in the June 2026 setup session: the business account exists
(Creator type) and `myfengshuihome.com` is claimed and verified. Three
boards exist from June (Compass School Basics, Reading Your Home Corner
by Corner, and the third from that session).

- [x] 7. Business account: done June 2026.
- [x] 8-11. Domain claimed and verified: done June 2026.
- [ ] 11b. Quick confirm (1 min): `Settings` > `Claimed accounts` still
      shows the green check next to `myfengshuihome.com`.
- [ ] 12. Create the 8 search-term boards below (`+` > `Board`, paste
      name, `Create`; then board `Edit` > paste the description). They
      sit beside the June boards. If a new name overlaps an existing
      board's topic, keep the existing board and paste the new
      description into it instead of duplicating:

```
Bedroom Feng Shui          - Bed direction, headboard walls, and calmer sleep, one change at a time.
Feng Shui Wealth Corner    - Finding and tending the money corner of a real home.
Five Elements at Home      - Wood, Fire, Earth, Metal, Water: reading any room in five words.
Good Days Calendar         - Favourable days for starting, signing, and moving, with the reason for each.
Moving House Feng Shui     - Choosing the day and settling the new home with care.
Home Office Feng Shui      - Desk direction and a workroom that works with you.
BaZi and Four Pillars      - Your birth chart, your Day Master, and the person the home is for.
Feng Shui for Beginners    - First steps, plain words, real homes.
```

## Phase 2 - Instagram (20 min)

- [ ] 13. In the Instagram app tap `Sign up`, use `Sign in with Google`
      (the new Gmail). Username: `myfengshuihome`.
- [ ] 14. Switch to business: `Settings and activity` > `Account type and
      tools` > `Switch to professional account` > `Business`. Category:
      `Home and garden` (or `Education`). Skip the contact-sync prompts.
- [ ] 15. Profile photo: the avatar file. Name field: `My Feng Shui Home`.
- [ ] 16. Paste the bio and the link:

```
Feng shui for real homes. Your birth date has a code in it: free chart below.
```

```
https://myfengshuihome.com/bazi-calculator?utm_source=instagram&utm_medium=bio&utm_campaign=bio
```

(Owner decision 2026-08-14: the bio link leads with the BaZi door. On
Instagram and TikTok the bio is the only clickable link, and the content
mix leads with identity hooks, so the landing must match the promise.)

## Phase 3 - TikTok (15 min)

- [ ] 17. In the TikTok app: `Sign up` > `Continue with Google` (new Gmail).
      Username: `myfengshuihome`.
- [ ] 18. `Profile` > `Edit profile`: avatar, name `My Feng Shui Home`, bio:

```
Feng shui for real homes. Free tools in the link.
```

- [ ] 19. Website field (business accounts): switch to Business first via
      `Settings` > `Account` > `Switch to Business Account`, category
      `Home and Garden`, then add the link:

```
https://myfengshuihome.com/bazi-calculator?utm_source=tiktok&utm_medium=bio&utm_campaign=bio
```

## Phase 4 - YouTube (10 min)

- [ ] 20. Go to `youtube.com` signed in as the new Gmail. Click your
      avatar > `Create a channel`. Name: `My Feng Shui Home`, handle:
      `@myfengshuihome`.
- [ ] 21. `Customize channel`: avatar, and in `Description` paste:

```
Feng shui for real homes. Short, calm, practical. Free tools at myfengshuihome.com.
```

- [ ] 22. `Links`: add the Good-Days link with `utm_source=youtube`.

## Phase 5 - The two Facebook pages + auto-crosspost (20 min)

- [ ] 23. Facebook pages need a personal profile. If you have one, sign in;
      if not, create a minimal one at `facebook.com` (real name, nothing
      else required) using the new Gmail.
- [ ] 24. Click the menu grid > `Pages` > `Create new Page`. Name:
      `My Feng Shui Home`, category `Home decor`, bio: the Instagram bio.
      Add the avatar. Publish.
- [ ] 25. Repeat for the second page: `My Feng Shui Love`, category
      `Personal blog`, bio: `Feng shui for love. Arriving soon.`
- [ ] 26. Connect Instagram: open `business.facebook.com` (Meta Business
      Suite) > `Settings` > `Linked accounts` > connect the Instagram
      account to the Home page.
- [ ] 27. Auto-crosspost: in Meta Business Suite `Settings` > `Cross-posting`
      (or on Instagram: `Settings` > `Sharing to other apps` > Facebook >
      toggle `Share your posts and reels to Facebook`). Turn it ON. This is
      the last time you think about Facebook.

## Phase 6 - Park the Love handles (10 min)

Zero posts anywhere; the point is owning the names before launch.

- [ ] 28. Instagram: log out, `Sign up` again with the same Gmail (it can
      hold up to 5 accounts): username `myfengshuilove`, avatar, bio
      `Feng shui for love. Arriving soon.` Set the account to Private.
- [ ] 29. TikTok: `Settings` > `Switch account` > `Add account`: username
      `myfengshuilove`, same bio.
- [ ] 30. YouTube: avatar menu > `Settings` > `Add or manage your channels`
      > `Create a channel`: `My Feng Shui Love`, handle `@myfengshuilove`.
- [ ] 31. Pinterest: nothing to park now (a second Pinterest account can
      wait for the site's launch).

---

## Whenever ready (separate from the sitting, any order)

**A. The Reading's two icon sheets (~20 min in Nano Banana)**
- [ ] A1. Open [bazi-reading-visual-plan-2026-08-14.md](bazi-reading-visual-plan-2026-08-14.md),
      scroll to `Generation prompts`.
- [ ] A2. Generate Set 1 (twelve zodiac animals, one 3x4 sheet) and Set 2
      (ten forces emblems, one 2x5 sheet), regenerating until you like them.
- [ ] A3. Save per the After generation steps in that file, then tell
      Claude: the sheets are in.

**B. Welcome sequence ON (~10 min)**
- [ ] B1. Follow [welcome-sequence-runbook.md](welcome-sequence-runbook.md):
      apply migration `0010` in the Supabase `SQL Editor`.
- [ ] B2. In Vercel: project `Settings` > `Environment Variables` > add
      `WELCOME_SEQUENCE_ENABLED` = `true` (Production).
- [ ] B3. Redeploy (env changes need a redeploy to take effect):
      `Deployments` > latest > `...` > `Redeploy`.

**C. The first send (~10 min)**
- [ ] C0. Phase 0b must be done first (hello@ can receive), because the
      emails invite replies.
- [ ] C1. Tell Claude `send` first, so the previews are re-verified current.
- [ ] C2. Decide the coupon (Part B of
      [waitlist-send-walkthrough-2026-07-20.md](waitlist-send-walkthrough-2026-07-20.md)):
      create `EARLYLIST` in Stripe, or use `--no-coupon`.
- [ ] C3. Run the Part C commands. The newsletter reaches the 14 real
      subscribers; the three product emails reach your own test addresses.

---

Handle exceptions log (fill in if a name was taken):
- Instagram: `myfengshuihome` was taken; the handle is `myfengshuihomecom`.
- Platform: __________ chosen handle: __________

Avatar files (2026-08-14, rendered from the site's brand mark at
1080x1080): `brand/ig-avatar-ivory-on-green.jpg` (recommended: the green
disc stays visible against Instagram's white interface) and
`brand/ig-avatar-green-on-ivory.jpg` (the site-header look). Regenerate
any time with `node scripts/make-ig-logo.mjs`.
