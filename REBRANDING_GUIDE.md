# Complete Rebranding Guide

This guide shows you **exactly where** to change all text, images, names, and titles to rebrand the website while keeping all functionality intact.

---

## 📋 Quick Checklist

- [ ] Brand name changed
- [ ] Page titles updated
- [ ] All headings/text updated
- [ ] Images replaced
- [ ] Meta tags updated
- [ ] Favicon replaced
- [ ] Campaign names updated
- [ ] Footer content updated

---

## 🎨 1. Brand Name Changes

### Files to Edit:

#### `src/components/Header.tsx` (Line 37)
```tsx
// CHANGE THIS:
<Link to="/" className="text-2xl font-bold text-brand-red">
  donate.now
</Link>

// TO YOUR BRAND:
<Link to="/" className="text-2xl font-bold text-brand-red">
  Your Brand Name
</Link>
```

#### `src/components/Footer.tsx` (Line 71)
```tsx
// CHANGE THIS:
<span>© donate.now</span>

// TO YOUR BRAND:
<span>© Your Brand Name</span>
```

#### `src/pages/AdminPanel.tsx` (Line 180)
```tsx
// CHANGE THIS:
organizer: newCampaign.type === 'monthly' ? 'donate.now' : null,

// TO YOUR BRAND:
organizer: newCampaign.type === 'monthly' ? 'Your Brand Name' : null,
```

#### `src/pages/CampaignDetailPage.tsx` (Line 49)
```tsx
// CHANGE THIS:
organizer: data.type === "monthly" ? "donate.now" : data.organizer,

// TO YOUR BRAND:
organizer: data.type === "monthly" ? "Your Brand Name" : data.organizer,
```

---

## 📄 2. Page Titles & Meta Tags

### `index.html` (Lines 6-13)
```html
<!-- CHANGE THESE: -->
<title>donate now</title>
<meta name="description" content="hothead Generated Project" />
<meta name="author" content="hothead" />
<meta property="og:title" content="donate now" />
<meta property="og:description" content="hothead Generated Project" />
<meta property="og:image" content="https://hothead.dev/opengraph-image-p98pqg.png" />

<!-- TO YOUR BRAND: -->
<title>Your Brand Name - Donation Platform</title>
<meta name="description" content="Your description here" />
<meta name="author" content="Your Organization" />
<meta property="og:title" content="Your Brand Name" />
<meta property="og:description" content="Your description here" />
<meta property="og:image" content="https://yourdomain.com/og-image.png" />
```

### `src/index.css` (Line 5)
```css
/* CHANGE THIS: */
/* Donate Now - Fundraising Website Design System */

/* TO YOUR BRAND: */
/* Your Brand Name - Fundraising Website Design System */
```

---

## 🖼️ 3. Images to Replace

### Hero Images (in `src/assets/`)
Replace these files with your own images:
- `hero-children-education.jpg` - Main hero image
- `hero-food-aid.jpg` - Food aid hero
- `hero-medical-care.jpg` - Medical care hero
- `campaign-elderly.jpg` - Elderly campaign image
- `campaign-water.jpg` - Water campaign image
- `community-impact.jpg` - Community impact image
- `education-impact.jpg` - Education impact image
- `shelter-impact.jpg` - Shelter impact image

**Keep the same filenames** or update the imports in:
- `src/components/HeroSection.tsx`
- `src/components/HowYourDonationHelps.tsx`

### Favicon
Replace the base64 favicon in `index.html` (Line 18) with your logo:
```html
<!-- Replace the long data:image/jpeg;base64... with: -->
<link rel="icon" type="image/png" href="/favicon.png" />
```

Or keep base64 but replace the image data.

---

## 📝 4. Text Content Changes

### `src/components/Header.tsx`

**Navigation Labels** (Lines 42-61) - Update if needed:
- "Home" → Keep or change
- "Campaigns" → Keep or change
- "Our Story" → Keep or change
- "How it works" → Keep or change
- "Impact" → Keep or change
- "Start a Fundraiser" → Keep or change
- "Contact" → Keep or change

**Donate Dropdown** (Lines 69-136) - Update campaign names:
- "No Child Orphaned" → Your campaign name
- "Protect Abandoned Elders" → Your campaign name
- "Safe Water for All" → Your campaign name
- etc.

### `src/components/Footer.tsx`

**Footer Links** (Lines 27-33) - Update campaign links:
- Same campaign names as Header dropdown

**Social Media** (Lines 61-65) - Update links:
```tsx
// Add href attributes:
<Facebook 
  className="w-5 h-5 text-text-muted hover:text-brand-red cursor-pointer"
  onClick={() => window.open('https://facebook.com/yourpage', '_blank')}
/>
// Repeat for Twitter, Instagram, LinkedIn, YouTube
```

**Terms & Privacy** (Lines 69-70) - Add actual links:
```tsx
<Link to="/terms" className="hover:text-text-primary">Terms</Link>
<Link to="/privacy" className="hover:text-text-primary">Privacy Policy</Link>
```

### `src/pages/Index.tsx`

**Monthly Donate CTA** (Lines 24-25):
```tsx
// CHANGE THIS:
<h2 className="text-2xl md:text-3xl font-bold mb-2">Donate Monthly</h2>
<p className="opacity-90">Your steady support powers food, education, and care all year round.</p>

// TO YOUR MESSAGE:
<h2 className="text-2xl md:text-3xl font-bold mb-2">Your Monthly Title</h2>
<p className="opacity-90">Your custom message here</p>
```

### `src/components/HeroSection.tsx`

**Hero Text** (Lines 12-16):
```tsx
// CHANGE THIS:
<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary leading-tight mb-6">
  Help Achieve Lives Free from Hunger with Innovative Ideas Spanning Kids
</h1>
<p className="text-xl text-text-secondary mb-8 leading-relaxed">
  Join us in creating a world where every child has access to basic necessities, 
  education, and the opportunity to build a brighter future.
</p>

// TO YOUR MESSAGE:
<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary leading-tight mb-6">
  Your Main Hero Heading
</h1>
<p className="text-xl text-text-secondary mb-8 leading-relaxed">
  Your hero description text here
</p>
```

### `src/components/ImpactStats.tsx`

**Stats** (Lines 3-6):
```tsx
// CHANGE THESE NUMBERS AND LABELS:
const stats = [
  { number: "2,764", label: "Children supported with monthly meals", color: "text-blue-600" },
  { number: "1,849", label: "Families provided safe shelter", color: "text-green-600" },
  { number: "3,500+", label: "Healthcare services delivered", color: "text-purple-600" },
  { number: "5,621", label: "Educational opportunities created", color: "text-orange-600" }
];

// TO YOUR STATS:
const stats = [
  { number: "Your Number", label: "Your Stat Label", color: "text-blue-600" },
  // ... etc
];
```

**Section Title** (Lines 13-18):
```tsx
// CHANGE THIS:
<h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
  Impact of Monthly Donors
</h2>
<p className="text-xl text-text-secondary">
  See how your regular contributions are making a real difference
</p>

// TO YOUR TEXT:
<h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
  Your Impact Title
</h2>
<p className="text-xl text-text-secondary">
  Your impact description
</p>
```

### `src/components/HowYourDonationHelps.tsx`

**Impact Cards** (Lines 7-28):
```tsx
// UPDATE EACH IMPACT:
const impacts = [
  {
    icon: Home,
    title: "Provides Shelter",  // ← Change this
    description: "Your donation helps provide safe housing...",  // ← Change this
    image: shelterImage,
    bgColor: "bg-blue-50"
  },
  // ... update others
];
```

**Section Title** (Lines 35-40):
```tsx
// CHANGE THIS:
<h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
  How Your Donation Helps
</h2>
<p className="text-xl text-text-secondary">
  Every rupee you donate makes a direct impact in changing lives
</p>

// TO YOUR TEXT:
<h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
  Your Section Title
</h2>
<p className="text-xl text-text-secondary">
  Your description
</p>
```

### `src/components/DonationForm.tsx`

**Campaign Details** (Lines 42-155):
```tsx
// UPDATE ALL CAMPAIGN DETAILS:
const campaignDetails = {
  "no-child-orphaned": {
    title: "No Child Orphaned",  // ← Change
    description: "Ensure every child has a safe home...",  // ← Change
    image: images[0]
  },
  // ... update all campaigns
};
```

### `src/pages/OurStoryPage.tsx`

**Story Content** (Lines 18-22):
```tsx
// CHANGE THIS:
<h1 className="text-4xl md:text-5xl font-extrabold text-text-primary mb-4">Our Story</h1>
<p className="text-text-secondary text-lg">
  We started with a simple belief: small acts of kindness can change lives. Today,
  your generosity powers food, education, and care for communities across the country.
</p>

// TO YOUR STORY:
<h1 className="text-4xl md:text-5xl font-extrabold text-text-primary mb-4">Your Story Title</h1>
<p className="text-text-secondary text-lg">
  Your organization's story here
</p>
```

**Story Sections** (Line 26):
```tsx
// CHANGE THESE:
{["Humble Beginnings","Growing With Communities","Scaling Impact"].map((title, idx) => (
  // Update titles and descriptions
))}
```

**Story Images** (Lines 5-9):
```tsx
// REPLACE IMAGE URLs:
const images = [
  "https://your-image-url-1.jpg",
  "https://your-image-url-2.jpg",
  "https://your-image-url-3.jpg"
];
```

### `src/pages/ContactPage.tsx`

Update contact information, address, phone, email, etc.

### `src/pages/HowItWorksPage.tsx`

Update the "How It Works" content and steps.

### `src/pages/ImpactPage.tsx`

Update impact stories and testimonials.

### `src/components/FAQSection.tsx`

Update FAQ questions and answers.

### `src/components/StoriesOfHope.tsx`

Update success stories and testimonials.

---

## 🎯 5. Campaign Names & Slugs

### Important: Campaign Slugs

Campaign slugs are used in URLs. If you change campaign names, you can either:

**Option A**: Keep existing slugs, just change display names
```tsx
// In DonationForm.tsx, keep slug but change title:
"no-child-orphaned": {
  title: "Your New Campaign Name",  // ← Display name
  description: "Your description",
  image: images[0]
}
```

**Option B**: Update slugs everywhere (more work)
- Update in `Header.tsx` dropdown links
- Update in `Footer.tsx` links
- Update in `DonationForm.tsx` campaignDetails
- Update any hardcoded campaign links

---

## 🎨 6. Colors & Branding

### `src/index.css`

Update CSS variables for brand colors:
```css
:root {
  --brand-red: 350 89% 60%;  /* Your primary color */
  --brand-red-hover: 350 89% 55%;
  --brand-red-light: 350 89% 95%;
  /* ... other colors */
}
```

### `tailwind.config.ts`

Colors are defined via CSS variables, so updating `index.css` is enough.

---

## 📱 7. Database Content (Admin Panel)

After setup, you can manage these via Admin Panel:

1. **Hero Carousel Slides** - Admin Panel → Content tab
   - Add/edit/delete slides
   - Update images, titles, descriptions

2. **Campaigns** - Admin Panel → Campaigns tab
   - Create new campaigns
   - Update existing campaigns

3. **Payment Settings** - Admin Panel → Payments tab
   - Update UPI, bank details, QR code

---

## 🔧 8. Quick Find & Replace

Use your IDE's Find & Replace (Ctrl+Shift+H) to quickly change:

1. **"donate.now"** → "Your Brand Name"
2. **"Donate Now"** → "Your CTA Text" (if you want to change button text)
3. **"donate now"** → "your brand name" (lowercase)

**Be careful**: Some "Donate Now" might be button text you want to keep.

---

## 📦 9. Image Replacement Steps

1. **Prepare your images**:
   - Hero images: Recommended size 1920x1080px
   - Campaign images: 800x600px
   - Impact images: 600x400px
   - Favicon: 32x32px or 64x64px

2. **Replace files**:
   - Copy your images to `src/assets/`
   - Keep same filenames OR update imports

3. **Update imports** (if filenames changed):
   ```tsx
   // In component files, change:
   import heroImage from "@/assets/hero-children-education.jpg";
   // To:
   import heroImage from "@/assets/your-hero-image.jpg";
   ```

---

## ✅ 10. Final Checklist

After making changes:

- [ ] Test homepage loads correctly
- [ ] Check all navigation links work
- [ ] Verify images display properly
- [ ] Test donation form
- [ ] Check mobile responsiveness
- [ ] Verify footer links
- [ ] Test admin panel access
- [ ] Check campaign detail pages
- [ ] Verify meta tags in page source
- [ ] Test on different browsers

---

## 🚀 Quick Start Template

Create a file `BRAND_CONFIG.ts` (optional) to centralize branding:

```typescript
export const BRAND_CONFIG = {
  name: "Your Brand Name",
  tagline: "Your Tagline",
  description: "Your description",
  email: "contact@yourbrand.com",
  phone: "+91 XXXXX XXXXX",
  address: "Your Address",
  social: {
    facebook: "https://facebook.com/yourpage",
    twitter: "https://twitter.com/yourhandle",
    instagram: "https://instagram.com/yourhandle",
    linkedin: "https://linkedin.com/company/yourcompany",
    youtube: "https://youtube.com/yourchannel"
  }
};
```

Then import and use throughout the app. (This requires code changes, but makes future updates easier.)

---

## 📞 Need Help?

If you get stuck:
1. Check browser console for errors
2. Verify image paths are correct
3. Ensure all imports are updated
4. Test one change at a time

---

**Remember**: All functionality stays the same - you're only changing the visual content, text, and branding!

