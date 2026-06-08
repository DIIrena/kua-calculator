# Week 1 Session 1: Pinterest setup checklist

Calm, practitioner voice. Follow each numbered sub-step in order. Time budget is 60 to 90 minutes of active work. DNS propagation can add 1 to 24 hours of passive waiting; the verification confirmation can be checked the next day.

This session covers only the account, the domain claim, three empty boards, the bio, and one screenshot. Pin design, pin templates, and any guide page edits are out of scope.

Before starting, have these ready in front of you:

1. The Gmail address `diirena@gmail.com` and its password.
2. Login access to the domain dashboard where `myfengshuihome.com` is registered (this is the registrar, for example Namecheap, GoDaddy, Cloudflare, Porkbun, or wherever the domain was bought).
3. A web browser on a desktop or laptop (Pinterest will not let a new business account be created on a phone).
4. A note app or sticky note for copying the verification string Pinterest provides.

---

## Part A. Claim the Pinterest Business account

1. Open a web browser and go to `https://www.pinterest.com/business/create/`.
2. In the field labeled `Email`, type `diirena@gmail.com`.
3. In the field labeled `Create a password`, type a new password that is not reused from another site. Save it in the password manager.
4. In the field labeled `Birthday` (or `Date of birth`, depending on which Pinterest shows on the form), enter the correct date.
5. In the field labeled `Country/Region`, select the current country of residence.
6. In the field labeled `Language`, select `English`.
7. Click the red button labeled `Create account`.
8. On the next screen titled `Build your profile`, in the field labeled `Profile name`, type `My Feng Shui Home`.
9. In the field labeled `Website`, type `https://myfengshuihome.com`.
10. In the field labeled `Country/region`, confirm the correct country.
11. Click `Next`.
12. On the screen titled `Describe your business`, in the field labeled `Business type`, select `Creator`.
13. In the field labeled `What kind of content will you create?`, select `Home decor` (closest fit). If `Home decor` is not present, select `Lifestyle`.
14. Click `Next`.
15. On the screen titled `Where would you like to advertise?`, click `Next` or `Skip` (do not start an ad campaign).
16. If a screen titled `Let's get you set up` or `Pick a goal` appears, click the small text link `Skip` or the `x` close icon in the top right corner.
17. The browser should now land on the Pinterest home feed or a profile view.

How to know it worked:

- The top right of the Pinterest header shows a small circular avatar (default gray silhouette).
- Click that avatar. The dropdown shows `My Feng Shui Home` as the account name.
- The URL bar shows `pinterest.com` and no error.

Gotchas:

- If Pinterest returns `That email is already in use`, the Gmail address was used on a prior personal Pinterest account. Stop here and ask Claude before continuing; the old account may need to be converted to a business account instead of creating a new one.
- New business accounts cannot be created from a phone. If the screen looks wrong or fields are missing, switch to a laptop or desktop.
- Do not enter any credit card or billing information. Pinterest Business accounts are free.

---

## Part B. Verify domain ownership of myfengshuihome.com

Pinterest calls this `claim your website`. The primary path is a DNS TXT record at the domain registrar. The fallback path is an HTML meta tag added to the Next.js site.

### B1. Open the claim flow inside Pinterest

1. In the top right of the Pinterest header, click the avatar circle.
2. From the dropdown, click `Settings`.
3. In the left side navigation of the Settings page, click `Claimed accounts`. (If the label reads `Claim` instead, click that. If neither appears, look under `Privacy and data` for `Claimed accounts`.)
4. Scroll to the section titled `Websites`.
5. To the right of the empty website slot, click the button labeled `Claim`.
6. In the field labeled `Add a website`, type `myfengshuihome.com` (no `https://`, no trailing slash).
7. Click `Continue`.
8. Pinterest now shows two or three verification options. Look for the one labeled `Add a TXT record`. Click it.
9. A box appears containing a string that starts with `pinterest-site-verification=` followed by a long code. Click the small `Copy` icon next to that string.
10. Paste the copied string into a note app or sticky note as a backup, so it is not lost if the Pinterest tab closes.
11. Leave this Pinterest tab open. Do not click `Verify` yet.

### B2. Primary path: Add the DNS TXT record at the domain registrar

1. Open a new browser tab.
2. Log in to the domain registrar where `myfengshuihome.com` is registered.
3. Find the domain list and click on `myfengshuihome.com`.
4. Look in the left side navigation or top tabs for a section labeled `DNS`, `Advanced DNS`, `DNS Records`, `DNS Management`, or `Manage DNS`. Click it.
5. Look for a button labeled `Add record`, `Add new record`, or a `+` icon. Click it.
6. In the field labeled `Type`, select `TXT`.
7. In the field labeled `Host`, `Name`, or `Hostname`, type `@` (a single at sign). The `@` represents the root domain. If the registrar does not accept `@`, leave the field blank.
8. In the field labeled `Value`, `Content`, or `TXT Value`, paste the full string that was copied from Pinterest, including the `pinterest-site-verification=` part.
9. In the field labeled `TTL`, leave the default value, or select `Automatic` if offered.
10. Click `Save`, `Add record`, or the equivalent confirmation button.
11. Confirm a new row now appears in the DNS records list with type `TXT` and the Pinterest verification value.
12. Return to the Pinterest browser tab from step B1.
13. Click `Continue` or `Next` in the Pinterest claim flow.
14. Pinterest will show a screen that says something like `We will email you when verification is complete` or `Verification in progress`. Close the window.

How to know it worked (DNS path):

- The DNS dashboard lists a TXT record with the Pinterest string visible in the Value column.
- The Pinterest `Claimed accounts` page lists `myfengshuihome.com` with a status of `Pending` or `In review`.
- Within 1 to 24 hours, Pinterest sends an email to `diirena@gmail.com` with a subject similar to `Your website has been claimed`. The `Claimed accounts` page then shows a green checkmark next to `myfengshuihome.com`.

Gotchas (DNS path):

- Do not type the Pinterest verification string into the `Host` or `Name` field. The string goes into `Value` only.
- Do not add `https://` or `www.` to the Host field. The Host is `@` or blank.
- Some registrars require the value to be wrapped in straight double quotes. If the registrar shows an example with quotes, follow the example. If unsure, save without quotes first; most registrars add them automatically.
- DNS propagation can take from 15 minutes to 24 hours. Do not retry the claim repeatedly. Wait at least a few hours before assuming something is wrong.
- If 48 hours pass with no email and no green check, stop and ask Claude to help debug.

### B3. Fallback path: HTML meta tag in the Next.js site

Use this path only if the DNS path is blocked (for example, the registrar dashboard is inaccessible or DNS edits are not permitted). The site is built on Next.js, so the verification tag must be added to the layout file in the codebase, not pasted into a CMS.

1. Return to the Pinterest claim flow from step B1.
2. If the claim flow was closed, repeat steps B1.1 through B1.6.
3. On the verification options screen, click `Add HTML tag` instead of `Add a TXT record`.
4. Pinterest shows a full HTML snippet that looks like `<meta name="p:domain_verify" content="LONG_CODE_HERE" />`.
5. Click the `Copy` icon to copy the full snippet.
6. Paste the snippet into a note app for safekeeping.
7. Stop here. Do not attempt to edit the Next.js codebase manually.
8. Open Claude and say: `I need to add a Pinterest p:domain_verify meta tag to the Next.js layout. Here is the snippet:` and paste the snippet. Claude will add it to the correct layout file and confirm the deploy.
9. Once Claude confirms the meta tag is live on the deployed site, return to the Pinterest claim flow and click `Verify`.

How to know it worked (HTML path):

- The Pinterest `Claimed accounts` page lists `myfengshuihome.com` with a green checkmark.
- Visiting `https://myfengshuihome.com` and viewing the page source shows the `<meta name="p:domain_verify" ...>` tag in the `<head>`.

Gotchas (HTML path):

- Do not paste the meta tag into any guide page body. It must live in the root layout `<head>`.
- Do not edit the Next.js layout file manually during this session. Ask Claude.
- If both DNS and HTML methods are attempted at the same time, that is fine; Pinterest will verify whichever it finds first.

---

## Part C. Create three boards

Boards are empty containers for pins. No pins are added in this session.

### C1. Open the board creation surface

1. In the top right of the Pinterest header, click the avatar circle.
2. Click `Your profile` (or click the avatar a second time to land on the profile page).
3. The profile page shows the account name `My Feng Shui Home` near the top.
4. Below the name, find the row of tabs or buttons. Look for a `+` plus-sign icon button, or a button labeled `Create`.
5. Click the `+` button.
6. From the small menu that appears, click `Board`.

### C2. Create board 1

1. In the field labeled `Name`, type `Compass School Basics`.
2. Leave the `Keep this board secret` toggle in the `Off` position. (The board must be public.)
3. Click `Create`.
4. If Pinterest asks `What do you want to save first?`, click `Done` or the `x` close icon. Do not save any pin in this session.
5. The new board page loads at the top of the profile.

### C3. Add board 1 description

1. On the new board page, click `Edit board details`, the pencil icon, or the three-dot menu and select `Edit board`.
2. In the field labeled `Description`, paste the description for `Compass School Basics` from the descriptions list at the bottom of this checklist.
3. Click `Done` or `Save`.

### C4. Create board 2

1. Return to the profile page by clicking the avatar, then `Your profile`.
2. Click the `+` button and select `Board`.
3. In the field labeled `Name`, type `Reading Your Home Corner by Corner`.
4. Click `Create`.
5. Close any `Save your first pin` prompt.
6. Click `Edit board details` and paste the description for `Reading Your Home Corner by Corner`.
7. Click `Done`.

### C5. Create board 3

1. Return to the profile page.
2. Click the `+` button and select `Board`.
3. In the field labeled `Name`, type `Feng Shui Walkthroughs`.
4. Click `Create`.
5. Close any `Save your first pin` prompt.
6. Click `Edit board details` and paste the description for `Feng Shui Walkthroughs`.
7. Click `Done`.

How to know it worked:

- The profile page shows three board tiles in a row.
- The tile labels read exactly `Compass School Basics`, `Reading Your Home Corner by Corner`, and `Feng Shui Walkthroughs`.
- Clicking each tile opens a board page with the matching description visible at the top.
- All three boards show `0 Pins`.

Gotchas:

- Do not turn on the `Secret` toggle. Secret boards do not appear to other Pinterest users.
- Do not add any collaborators in this session.
- Do not pin anything yet. Pinning happens in Session 2 and later.
- If a board name is mistyped, click the three-dot menu on the board, click `Edit board`, and correct the `Name` field.

---

## Part D. Set the profile bio

1. In the top right of the Pinterest header, click the avatar circle.
2. Click `Your profile`.
3. On the profile page, click the button labeled `Edit profile`. (If the button is not visible, click the three-dot menu and select `Settings`, then in the left navigation click `Edit profile` or `Public profile`.)
4. In the field labeled `About` (the bio field), paste one of the three bio options listed at the bottom of this checklist. Pick the one that reads most calmly.
5. Confirm the field labeled `Website` reads either `https://myfengshuihome.com` or `myfengshuihome.com` (Pinterest sometimes strips the `https://` prefix; either form is fine). If it is blank or wrong, correct it.
6. Confirm the field labeled `Name` reads `My Feng Shui Home`.
7. Leave the `Pronouns` field blank or fill it in as preferred.
8. Optional: upload a profile photo by clicking the camera icon on the avatar circle. A simple square logo or a calm photo is fine. This is optional in this session.
9. Click `Save` or `Done` at the top right of the edit profile panel.

How to know it worked:

- Return to the profile page.
- The bio text appears below the account name.
- The website `myfengshuihome.com` appears as a clickable link below the bio.
- Clicking that link opens `https://myfengshuihome.com` in a new tab.

Gotchas:

- Pinterest sometimes truncates the bio at around 140 characters in the default view. Keep the chosen bio under 160 characters so the full line is visible without expansion.
- Do not add hashtags in the bio. Pinterest does not parse hashtags in profile bios.
- Do not add phone numbers or email addresses to the bio.

---

## Part E. Save the verification screenshot for evidence

1. Wait until the Pinterest `Claimed accounts` page shows `myfengshuihome.com` with a green checkmark. This may be the same day or up to 24 hours later.
2. In the top right of the Pinterest header, click the avatar circle.
3. Click `Settings`.
4. In the left side navigation, click `Claimed accounts`.
5. Scroll to the `Websites` section. Confirm `myfengshuihome.com` is listed with a green checkmark or the word `Verified`.
6. Take a screenshot of the full browser window showing this state.
   - On Windows: press `Windows key + Shift + S`, drag a box around the Pinterest browser window, and click `Save` in the snip notification.
   - On Mac: press `Command + Shift + 4`, drag a box around the Pinterest browser window, and the screenshot saves to the desktop.
7. Rename the screenshot file to `pinterest-domain-verified-2026-06-08.png`. If the verification confirms on a later date, use that date.
8. Move the file into the folder `projects/kua-calculator/spec/evidence/`. The folder already exists with a README explaining what lands there.
9. Open the folder once to confirm the file is present and the filename is correct.

How to know it worked:

- The folder `projects/kua-calculator/spec/evidence/` contains the file `pinterest-domain-verified-YYYY-MM-DD.png`.
- Opening the file shows the Pinterest `Claimed accounts` screen with the green checkmark next to `myfengshuihome.com`.

Gotchas:

- Do not paste the screenshot into a chat or document and then delete the original. The file in `spec/evidence/` is the record of truth.
- If the verification has not completed within 48 hours, stop and ask Claude before retrying.

---

## Board descriptions (paste these in Part C)

Each is under 200 characters. Calm, practitioner voice. Uses six-lever vocabulary where it fits (element, placement, visibility, proportion, timing, room use).

### Compass School Basics

```
Compass School fundamentals: the eight directions, the trigrams tied to each, and how a kua number connects a person to room use, placement, and timing.
```

### Reading Your Home Corner by Corner

```
Walk the bagua across a real floor plan. Each pin covers one corner: element, room use, placement notes, and proportion cues for everyday rooms.
```

### Feng Shui Walkthroughs

```
Full-room reads from entry to back wall. Visibility, element pairings, placement of key furniture, and timing notes for seasonal adjustments.
```

---

## Bio options (pick one in Part D)

All three are under 160 characters. Pick the one that reads most calmly to the ear.

Option 1:

```
Feng shui notes for real homes. Free Kua calculator and a 38-page guide at myfengshuihome.com. Compass School, calmly explained.
```

Option 2:

```
My Feng Shui Home: a free Kua calculator and a 38-page guide on element, placement, and room use. Compass School notes for real rooms.
```

Option 3:

```
Compass School feng shui for everyday homes. Free Kua calculator and a 38-page guide at myfengshuihome.com. Element, placement, room use.
```

---

## When this session is done

Stop here. Do not start Session 2 (master pin template). Do not design pins, do not edit guide pages, do not touch the palette stub or analytics baseline. Those have their own sessions in the promotion calendar.

The deliverables for Session 1 are:

1. A Pinterest Business account on `diirena@gmail.com` with profile name `My Feng Shui Home` and the chosen bio.
2. A claimed `myfengshuihome.com` website on that account, verified by DNS TXT (primary) or HTML meta tag (fallback).
3. Three empty public boards: `Compass School Basics`, `Reading Your Home Corner by Corner`, `Feng Shui Walkthroughs`.
4. One screenshot file in `projects/kua-calculator/spec/evidence/` showing the verified state.

When all four are in place, mark Session 1 complete in the promotion calendar and wait for the cue to begin Session 2.
