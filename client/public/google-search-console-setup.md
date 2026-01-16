# Google Search Console Setup Guide for Rea Co Homes

This guide walks you through setting up Google Search Console to monitor your website's search performance and ensure all pages are properly indexed.

---

## Step 1: Access Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Sign in with your Google account (use your business Google account if you have one)
3. Click "Add Property"

---

## Step 2: Add Your Property

1. Choose "URL prefix" method (recommended for simplicity)
2. Enter your full website URL: `https://reacohomes.com`
3. Click "Continue"

---

## Step 3: Verify Ownership

**Recommended Method: HTML Tag**

1. Copy the meta tag provided by Google (looks like: `<meta name="google-site-verification" content="xxxxx" />`)
2. Add this tag to your website's `<head>` section in `client/index.html`
3. Click "Verify" in Google Search Console

**Alternative: DNS Verification**

1. Copy the TXT record provided by Google
2. Add it to your domain's DNS settings
3. Wait 5-10 minutes for DNS propagation
4. Click "Verify"

---

## Step 4: Submit Your Sitemap

1. In Search Console, go to "Sitemaps" in the left sidebar
2. Enter your sitemap URL: `sitemap.xml`
3. Click "Submit"
4. Google will crawl and index your pages

**Your sitemap includes these pages:**
- Homepage
- About
- Portfolio
- Neighborhoods
- Contact
- Blog
- News
- Testimonials
- Resources
- Brasada Ranch Builder
- Tetherow Custom Homes
- Pronghorn Builder
- Broken Top Builder
- Caldera Springs Builder
- Awbrey Butte Builder
- Sunriver Builder

---

## Step 5: Verify Structured Data

1. Go to [Rich Results Test](https://search.google.com/test/rich-results)
2. Enter your homepage URL: `https://reacohomes.com`
3. Click "Test URL"
4. Verify that LocalBusiness schema is detected

**Your structured data includes:**
- Business name: Rea Co Homes
- Business type: HomeBuilder
- Address: Bend, Oregon
- Phone: 541-390-9848
- Rating: 5.0 (based on client reviews)
- Services: Custom Home Building, Luxury Home Construction, etc.
- Service areas: All Central Oregon neighborhoods

---

## Step 6: Monitor Performance

After setup, check these reports regularly:

**Performance Report**
- See which search queries bring visitors
- Track clicks, impressions, and average position
- Identify opportunities for improvement

**Coverage Report**
- Ensure all pages are indexed
- Fix any crawl errors
- Monitor for excluded pages

**Core Web Vitals**
- Check page loading speed
- Monitor mobile usability
- Fix any performance issues

---

## Step 7: Request Indexing (Optional)

To speed up indexing of new pages:

1. Go to "URL Inspection" in Search Console
2. Enter the URL of a new page
3. Click "Request Indexing"
4. Repeat for important new pages

---

## Troubleshooting

**Pages not indexed?**
- Check robots.txt isn't blocking them
- Ensure pages are linked from your sitemap
- Request indexing manually

**Structured data errors?**
- Use the Rich Results Test to identify issues
- Check for missing required fields
- Validate JSON-LD syntax

**Mobile usability issues?**
- Test pages on mobile devices
- Ensure responsive design works
- Fix any touch target issues

---

## Next Steps

1. **Set up Google Analytics** - Track visitor behavior and conversions
2. **Claim Google Business Profile** - Enhance local search visibility
3. **Monitor weekly** - Check Search Console for new issues or opportunities

---

*For assistance with SEO optimization, contact your web developer or SEO specialist.*
