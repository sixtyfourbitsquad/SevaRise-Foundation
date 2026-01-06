# Rebranding Quick Reference - Exact File Locations

Quick reference for all files and line numbers that need changes.

---

## 🔍 Brand Name: "donate.now" → "Your Brand"

| File | Line | Current Text | Change To |
|------|------|--------------|-----------|
| `src/components/Header.tsx` | 37 | `donate.now` | Your brand name |
| `src/components/Footer.tsx` | 71 | `© donate.now` | `© Your Brand Name` |
| `src/pages/AdminPanel.tsx` | 180 | `'donate.now'` | `'Your Brand Name'` |
| `src/pages/CampaignDetailPage.tsx` | 49 | `"donate.now"` | `"Your Brand Name"` |

---

## 📄 Page Title & Meta Tags

| File | Line | Current Text | Change To |
|------|------|--------------|-----------|
| `index.html` | 6 | `<title>donate now</title>` | Your page title |
| `index.html` | 7 | `content="hothead Generated Project"` | Your description |
| `index.html` | 8 | `content="hothead"` | Your author/org |
| `index.html` | 10 | `content="donate now"` | Your OG title |
| `index.html` | 11 | `content="hothead Generated Project"` | Your OG description |
| `index.html` | 13 | `content="https://hothead.dev/..."` | Your OG image URL |
| `src/index.css` | 5 | `/* Donate Now - ... */` | Your brand comment |

---

## 🖼️ Image Files to Replace

**Location**: `src/assets/`

| Current File | Replace With | Used In |
|--------------|--------------|---------|
| `hero-children-education.jpg` | Your hero image | `HeroSection.tsx` |
| `hero-food-aid.jpg` | Your food hero | (if used) |
| `hero-medical-care.jpg` | Your medical hero | (if used) |
| `campaign-elderly.jpg` | Your elderly image | Campaigns |
| `campaign-water.jpg` | Your water image | Campaigns |
| `community-impact.jpg` | Your community image | `HowYourDonationHelps.tsx` |
| `education-impact.jpg` | Your education image | `HowYourDonationHelps.tsx` |
| `shelter-impact.jpg` | Your shelter image | `HowYourDonationHelps.tsx` |

**Favicon**: `index.html` line 18 - Replace base64 image or use file path

---

## 📝 Text Content Locations

### Header Navigation
**File**: `src/components/Header.tsx`

| Line | Section | What to Change |
|------|---------|----------------|
| 42-61 | Navigation links | Update labels if needed |
| 69-136 | Donate dropdown | Update campaign names |

### Footer
**File**: `src/components/Footer.tsx`

| Line | Section | What to Change |
|------|---------|----------------|
| 27-33 | Donate links | Campaign names |
| 61-65 | Social icons | Add href links |
| 69-70 | Terms/Privacy | Add actual links |

### Homepage Content
**File**: `src/pages/Index.tsx`

| Line | Section | What to Change |
|------|---------|----------------|
| 24-25 | Monthly CTA | Title and description |

**File**: `src/components/HeroSection.tsx`

| Line | Section | What to Change |
|------|---------|----------------|
| 12-16 | Hero heading | Main title and description |

**File**: `src/components/ImpactStats.tsx`

| Line | Section | What to Change |
|------|---------|----------------|
| 3-6 | Stats array | Numbers and labels |
| 13-18 | Section title | Heading and description |

**File**: `src/components/HowYourDonationHelps.tsx`

| Line | Section | What to Change |
|------|---------|----------------|
| 7-28 | Impact cards | Titles, descriptions, images |
| 35-40 | Section title | Heading and description |

### Campaign Details
**File**: `src/components/DonationForm.tsx`

| Line | Section | What to Change |
|------|---------|----------------|
| 42-155 | `campaignDetails` object | All campaign titles, descriptions, images |

### Story Page
**File**: `src/pages/OurStoryPage.tsx`

| Line | Section | What to Change |
|------|---------|----------------|
| 5-9 | Images array | Image URLs |
| 18-22 | Story heading | Title and description |
| 26 | Story sections | Section titles |

### Other Pages
- `src/pages/ContactPage.tsx` - Contact information
- `src/pages/HowItWorksPage.tsx` - How it works content
- `src/pages/ImpactPage.tsx` - Impact stories
- `src/components/FAQSection.tsx` - FAQ content
- `src/components/StoriesOfHope.tsx` - Success stories

---

## 🎨 Campaign Names in Dropdown

**File**: `src/components/Header.tsx` (Lines 72-100)

Current campaigns to update:
- "No Child Orphaned"
- "Protect Abandoned Elders"
- "Safe Water for All"
- "End Period Poverty"
- "Stop Animal Cruelty"
- "Feed the Hungry"
- "Right to Clean Air"
- "Manage India's Waste"
- "Every Girl in School"
- "Break Cycle of Poverty"

**Also update in**: `src/components/Footer.tsx` (same campaign links)

---

## 🔧 Button Text (Optional)

If you want to change "Donate Now" button text:

| File | Line | Current | Change To |
|------|------|---------|-----------|
| `src/components/Header.tsx` | 174 | "Donate Now" | Your CTA |
| `src/components/Footer.tsx` | 88 | "Donate Now" | Your CTA |
| `src/components/CampaignCards.tsx` | 84 | "Donate now!" | Your CTA |
| `src/pages/CampaignDetailPage.tsx` | 111, 234 | "Donate Now" | Your CTA |
| `src/pages/OurStoryPage.tsx` | 46 | "Donate now" | Your CTA |

**Note**: "Donate Now" appears in many places. Use Find & Replace carefully.

---

## 📋 Priority Order

1. **Brand Name** (4 files) - Quickest change
2. **Page Title & Meta** (`index.html`) - Important for SEO
3. **Hero Section** - First thing users see
4. **Campaign Names** - Core content
5. **Images** - Visual branding
6. **Other Content** - Fine-tuning

---

## ⚡ Quick Find & Replace

**In VS Code / Your IDE:**

1. Press `Ctrl+Shift+H` (Find & Replace in Files)
2. Search for: `donate.now`
3. Replace with: `Your Brand Name`
4. Review each match before replacing

**Repeat for:**
- `"donate now"` → `"your brand name"`
- `Donate Now` → `Your CTA Text` (be careful - review each)

---

## 🎯 Database-Managed Content

These can be changed via Admin Panel (after setup):

✅ Hero carousel slides  
✅ Campaign details  
✅ Payment settings  

No code changes needed - just login to admin panel and update!

---

## ✅ Testing Checklist

After changes, test:

- [ ] Homepage loads
- [ ] Brand name appears correctly
- [ ] Images display
- [ ] Navigation works
- [ ] Campaign pages load
- [ ] Donation form works
- [ ] Footer links work
- [ ] Mobile view looks good
- [ ] Admin panel accessible

---

**Tip**: Make one change at a time and test, so you know what broke if something goes wrong!

