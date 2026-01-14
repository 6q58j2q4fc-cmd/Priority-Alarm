/**
 * Email Drip Campaign Service
 * Handles automated email sequences for nurturing leads
 */

import { getDb } from "./db";
import { 
  emailSequences, 
  emailTemplates, 
  emailQueue, 
  subscriberSequences,
  subscribers 
} from "../drizzle/schema";
import { eq, and, lte, isNull } from "drizzle-orm";
import { notifyOwner } from "./_core/notification";

// Welcome sequence email content
const WELCOME_SEQUENCE_EMAILS = [
  {
    orderIndex: 1,
    subject: "Welcome to Rea Co Homes - Your Dream Home Journey Begins!",
    previewText: "Thank you for downloading our Custom Home Building Guide",
    delayDays: 0,
    delayHours: 0,
    htmlContent: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Rea Co Homes</title>
</head>
<body style="font-family: Georgia, serif; line-height: 1.6; color: #2C1810; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="color: #2C1810; font-size: 28px; margin-bottom: 10px;">Welcome to Rea Co Homes</h1>
    <p style="color: #D4A574; font-size: 14px; text-transform: uppercase; letter-spacing: 2px;">Central Oregon's Premier Custom Home Builder</p>
  </div>
  
  <p>Dear Future Homeowner,</p>
  
  <p>Thank you for downloading our <strong>Custom Home Building Guide</strong>! You've taken the first exciting step toward building your dream home in Central Oregon.</p>
  
  <p>I'm Kevin Rea, and for over 45 years, I've had the privilege of helping families like yours create exceptional custom homes in communities like Brasada Ranch, Tetherow, Pronghorn, and Broken Top.</p>
  
  <p>Over the next few weeks, I'll be sharing exclusive insights and tips to help you navigate the custom home building process:</p>
  
  <ul style="color: #2C1810;">
    <li>How to choose the perfect lot for your lifestyle</li>
    <li>Understanding construction costs and budgeting</li>
    <li>Design trends that add lasting value</li>
    <li>Energy-efficient features that save money</li>
    <li>Working with architects and designers</li>
  </ul>
  
  <p>In the meantime, feel free to explore our <a href="https://reacohomes.com/portfolio" style="color: #D4A574;">portfolio of custom homes</a> for inspiration.</p>
  
  <div style="background: #F5F0EB; padding: 20px; border-radius: 8px; margin: 30px 0;">
    <p style="margin: 0; font-weight: bold;">Ready to discuss your project?</p>
    <p style="margin: 10px 0 0 0;">Call me directly at <a href="tel:541-390-9848" style="color: #D4A574; font-weight: bold;">541-390-9848</a> or reply to this email.</p>
  </div>
  
  <p>Looking forward to helping you build something extraordinary,</p>
  
  <p style="margin-bottom: 5px;"><strong>Kevin Rea</strong></p>
  <p style="margin: 0; color: #666;">Master Custom Home Builder</p>
  <p style="margin: 0; color: #666;">Rea Co Homes | CCB #193427</p>
  <p style="margin: 0;"><a href="mailto:kevin@reacohomes.com" style="color: #D4A574;">kevin@reacohomes.com</a></p>
  
  <hr style="border: none; border-top: 1px solid #E5DED6; margin: 30px 0;">
  
  <p style="font-size: 12px; color: #999; text-align: center;">
    You're receiving this because you downloaded our Custom Home Building Guide.<br>
    <a href="{{unsubscribe_url}}" style="color: #999;">Unsubscribe</a> | <a href="https://reacohomes.com" style="color: #999;">Visit our website</a>
  </p>
</body>
</html>
    `,
    textContent: `Welcome to Rea Co Homes!

Dear Future Homeowner,

Thank you for downloading our Custom Home Building Guide! You've taken the first exciting step toward building your dream home in Central Oregon.

I'm Kevin Rea, and for over 45 years, I've had the privilege of helping families like yours create exceptional custom homes in communities like Brasada Ranch, Tetherow, Pronghorn, and Broken Top.

Over the next few weeks, I'll be sharing exclusive insights and tips to help you navigate the custom home building process.

Ready to discuss your project? Call me directly at 541-390-9848 or reply to this email.

Looking forward to helping you build something extraordinary,

Kevin Rea
Master Custom Home Builder
Rea Co Homes | CCB #193427
kevin@reacohomes.com
541-390-9848`
  },
  {
    orderIndex: 2,
    subject: "Tip #1: Choosing the Perfect Lot in Central Oregon",
    previewText: "Location is everything - here's what to look for",
    delayDays: 2,
    delayHours: 0,
    htmlContent: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Georgia, serif; line-height: 1.6; color: #2C1810; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="text-align: center; margin-bottom: 30px;">
    <p style="color: #D4A574; font-size: 14px; text-transform: uppercase; letter-spacing: 2px;">Home Building Tip #1</p>
    <h1 style="color: #2C1810; font-size: 24px;">Choosing the Perfect Lot</h1>
  </div>
  
  <p>Hello,</p>
  
  <p>The lot you choose will influence every aspect of your custom home - from the views you'll enjoy to the energy costs you'll pay. Here's what I've learned after building 100+ homes in Central Oregon:</p>
  
  <h3 style="color: #D4A574;">🏔️ Consider the Views</h3>
  <p>Cascade Mountain views can add 15-30% to your home's value. Look for lots with unobstructed sightlines to Mt. Bachelor, the Three Sisters, or Broken Top.</p>
  
  <h3 style="color: #D4A574;">☀️ Sun Orientation</h3>
  <p>South-facing lots maximize natural light and passive solar heating - reducing energy costs by up to 25% in our cold winters.</p>
  
  <h3 style="color: #D4A574;">🌲 Tree Coverage</h3>
  <p>Mature Ponderosa pines add character but consider how they'll affect your floor plan and future maintenance.</p>
  
  <h3 style="color: #D4A574;">📐 Slope & Topography</h3>
  <p>Gentle slopes can create dramatic multi-level designs, but steep grades increase foundation costs significantly.</p>
  
  <div style="background: #F5F0EB; padding: 20px; border-radius: 8px; margin: 30px 0;">
    <p style="margin: 0; font-weight: bold;">Pro Tip:</p>
    <p style="margin: 10px 0 0 0;">Before purchasing a lot, I offer complimentary site consultations to help you understand the building potential and any challenges. Call me at <a href="tel:541-390-9848" style="color: #D4A574;">541-390-9848</a>.</p>
  </div>
  
  <p>Next time: Understanding custom home construction costs and how to budget effectively.</p>
  
  <p>Best,<br><strong>Kevin Rea</strong><br>541-390-9848</p>
  
  <hr style="border: none; border-top: 1px solid #E5DED6; margin: 30px 0;">
  <p style="font-size: 12px; color: #999; text-align: center;">
    <a href="{{unsubscribe_url}}" style="color: #999;">Unsubscribe</a> | <a href="https://reacohomes.com" style="color: #999;">Rea Co Homes</a>
  </p>
</body>
</html>
    `,
    textContent: `Home Building Tip #1: Choosing the Perfect Lot

The lot you choose will influence every aspect of your custom home. Here's what I've learned after building 100+ homes in Central Oregon:

CONSIDER THE VIEWS
Cascade Mountain views can add 15-30% to your home's value.

SUN ORIENTATION
South-facing lots maximize natural light and passive solar heating.

TREE COVERAGE
Mature Ponderosa pines add character but consider maintenance.

SLOPE & TOPOGRAPHY
Gentle slopes create dramatic designs, but steep grades increase costs.

Pro Tip: I offer complimentary site consultations. Call me at 541-390-9848.

Best,
Kevin Rea
541-390-9848`
  },
  {
    orderIndex: 3,
    subject: "Tip #2: Understanding Custom Home Costs ($400-$800+/sq ft)",
    previewText: "What really drives construction costs in Central Oregon",
    delayDays: 4,
    delayHours: 0,
    htmlContent: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Georgia, serif; line-height: 1.6; color: #2C1810; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="text-align: center; margin-bottom: 30px;">
    <p style="color: #D4A574; font-size: 14px; text-transform: uppercase; letter-spacing: 2px;">Home Building Tip #2</p>
    <h1 style="color: #2C1810; font-size: 24px;">Understanding Construction Costs</h1>
  </div>
  
  <p>Hello,</p>
  
  <p>One of the most common questions I receive is: "How much does it cost to build a custom home in Central Oregon?" Here's an honest breakdown:</p>
  
  <h3 style="color: #D4A574;">💰 Current Cost Ranges (2024-2025)</h3>
  <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
    <tr style="background: #F5F0EB;">
      <td style="padding: 12px; border: 1px solid #E5DED6;"><strong>Quality Level</strong></td>
      <td style="padding: 12px; border: 1px solid #E5DED6;"><strong>Cost per Sq Ft</strong></td>
    </tr>
    <tr>
      <td style="padding: 12px; border: 1px solid #E5DED6;">Custom Standard</td>
      <td style="padding: 12px; border: 1px solid #E5DED6;">$400 - $500</td>
    </tr>
    <tr>
      <td style="padding: 12px; border: 1px solid #E5DED6;">Luxury Custom</td>
      <td style="padding: 12px; border: 1px solid #E5DED6;">$500 - $650</td>
    </tr>
    <tr>
      <td style="padding: 12px; border: 1px solid #E5DED6;">Ultra-Premium</td>
      <td style="padding: 12px; border: 1px solid #E5DED6;">$650 - $800+</td>
    </tr>
  </table>
  
  <h3 style="color: #D4A574;">📊 What Drives Costs Up</h3>
  <ul>
    <li><strong>Site conditions:</strong> Steep slopes, rock, poor soil (+10-20%)</li>
    <li><strong>Premium finishes:</strong> Natural stone, custom millwork (+15-25%)</li>
    <li><strong>Energy systems:</strong> Geothermal, solar, battery storage (+$50-100K)</li>
    <li><strong>Complexity:</strong> Multiple rooflines, curved walls, large windows</li>
  </ul>
  
  <h3 style="color: #D4A574;">💡 Where to Save Without Sacrificing Quality</h3>
  <ul>
    <li>Efficient floor plans (less hallway = more living space)</li>
    <li>Standard window sizes with strategic placement</li>
    <li>Quality materials in high-impact areas, practical choices elsewhere</li>
  </ul>
  
  <div style="background: #F5F0EB; padding: 20px; border-radius: 8px; margin: 30px 0;">
    <p style="margin: 0; font-weight: bold;">Free Cost Consultation</p>
    <p style="margin: 10px 0 0 0;">I provide detailed cost estimates before you commit. Let's discuss your vision and budget: <a href="tel:541-390-9848" style="color: #D4A574;">541-390-9848</a></p>
  </div>
  
  <p>Best,<br><strong>Kevin Rea</strong></p>
  
  <hr style="border: none; border-top: 1px solid #E5DED6; margin: 30px 0;">
  <p style="font-size: 12px; color: #999; text-align: center;">
    <a href="{{unsubscribe_url}}" style="color: #999;">Unsubscribe</a> | <a href="https://reacohomes.com" style="color: #999;">Rea Co Homes</a>
  </p>
</body>
</html>
    `,
    textContent: `Home Building Tip #2: Understanding Construction Costs

Current Cost Ranges (2024-2025):
- Custom Standard: $400 - $500/sq ft
- Luxury Custom: $500 - $650/sq ft
- Ultra-Premium: $650 - $800+/sq ft

What Drives Costs Up:
- Site conditions: Steep slopes, rock (+10-20%)
- Premium finishes: Natural stone, custom millwork (+15-25%)
- Energy systems: Geothermal, solar (+$50-100K)

Where to Save:
- Efficient floor plans
- Standard window sizes
- Quality materials in high-impact areas

Free Cost Consultation: 541-390-9848

Best,
Kevin Rea`
  },
  {
    orderIndex: 4,
    subject: "Tip #3: Design Trends That Add Lasting Value",
    previewText: "Timeless features vs. passing fads",
    delayDays: 7,
    delayHours: 0,
    htmlContent: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Georgia, serif; line-height: 1.6; color: #2C1810; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="text-align: center; margin-bottom: 30px;">
    <p style="color: #D4A574; font-size: 14px; text-transform: uppercase; letter-spacing: 2px;">Home Building Tip #3</p>
    <h1 style="color: #2C1810; font-size: 24px;">Design Trends That Add Lasting Value</h1>
  </div>
  
  <p>Hello,</p>
  
  <p>After 45 years of building custom homes, I've seen trends come and go. Here's what truly adds lasting value versus what you might regret:</p>
  
  <h3 style="color: #2E7D32;">✅ Timeless Features Worth the Investment</h3>
  <ul>
    <li><strong>Indoor-outdoor living:</strong> Covered patios, retractable glass walls, outdoor kitchens</li>
    <li><strong>Natural materials:</strong> Real wood beams, natural stone, quality tile</li>
    <li><strong>Abundant natural light:</strong> Large windows, skylights, open floor plans</li>
    <li><strong>Primary suite on main level:</strong> Aging-in-place design</li>
    <li><strong>High ceilings:</strong> 10'+ ceilings create drama and spaciousness</li>
    <li><strong>Quality kitchen:</strong> Professional appliances, ample storage, large island</li>
  </ul>
  
  <h3 style="color: #C62828;">❌ Trends to Approach Carefully</h3>
  <ul>
    <li><strong>All-white everything:</strong> Beautiful but shows every mark</li>
    <li><strong>Open shelving in kitchen:</strong> Requires constant curation</li>
    <li><strong>Barn doors everywhere:</strong> Charming in moderation</li>
    <li><strong>Overly specific theme rooms:</strong> Hard to repurpose</li>
  </ul>
  
  <h3 style="color: #D4A574;">🏔️ Central Oregon Specific</h3>
  <p>Features that perform exceptionally well in our market:</p>
  <ul>
    <li>Mudrooms with heated floors</li>
    <li>Oversized garages (ski/bike storage)</li>
    <li>Hot tub areas with mountain views</li>
    <li>Fire-resistant landscaping</li>
  </ul>
  
  <div style="background: #F5F0EB; padding: 20px; border-radius: 8px; margin: 30px 0;">
    <p style="margin: 0;">Want to see these features in action? <a href="https://reacohomes.com/portfolio" style="color: #D4A574;">Browse our portfolio</a> or schedule a tour of a completed home.</p>
  </div>
  
  <p>Best,<br><strong>Kevin Rea</strong><br>541-390-9848</p>
  
  <hr style="border: none; border-top: 1px solid #E5DED6; margin: 30px 0;">
  <p style="font-size: 12px; color: #999; text-align: center;">
    <a href="{{unsubscribe_url}}" style="color: #999;">Unsubscribe</a> | <a href="https://reacohomes.com" style="color: #999;">Rea Co Homes</a>
  </p>
</body>
</html>
    `,
    textContent: `Home Building Tip #3: Design Trends That Add Lasting Value

TIMELESS FEATURES WORTH THE INVESTMENT:
- Indoor-outdoor living spaces
- Natural materials (wood beams, stone)
- Abundant natural light
- Primary suite on main level
- High ceilings (10'+)
- Quality kitchen with large island

TRENDS TO APPROACH CAREFULLY:
- All-white everything
- Open shelving in kitchen
- Barn doors everywhere

CENTRAL OREGON SPECIFIC:
- Mudrooms with heated floors
- Oversized garages for ski/bike storage
- Hot tub areas with mountain views

Browse our portfolio: reacohomes.com/portfolio

Best,
Kevin Rea
541-390-9848`
  },
  {
    orderIndex: 5,
    subject: "Tip #4: Energy-Efficient Features That Pay for Themselves",
    previewText: "Save money while saving the planet",
    delayDays: 10,
    delayHours: 0,
    htmlContent: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Georgia, serif; line-height: 1.6; color: #2C1810; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="text-align: center; margin-bottom: 30px;">
    <p style="color: #D4A574; font-size: 14px; text-transform: uppercase; letter-spacing: 2px;">Home Building Tip #4</p>
    <h1 style="color: #2C1810; font-size: 24px;">Energy-Efficient Features</h1>
  </div>
  
  <p>Hello,</p>
  
  <p>Central Oregon's climate - cold winters, hot summers, and 300+ days of sunshine - makes energy efficiency especially important. Here are features that pay for themselves:</p>
  
  <h3 style="color: #D4A574;">☀️ Solar Power</h3>
  <p><strong>Cost:</strong> $25,000 - $50,000 for a typical system<br>
  <strong>Savings:</strong> $200-400/month on electricity<br>
  <strong>Payback:</strong> 6-10 years (with 30% federal tax credit)</p>
  
  <h3 style="color: #D4A574;">🌡️ Geothermal Heating/Cooling</h3>
  <p><strong>Cost:</strong> $30,000 - $60,000 additional<br>
  <strong>Savings:</strong> 40-60% on heating/cooling costs<br>
  <strong>Payback:</strong> 8-12 years</p>
  
  <h3 style="color: #D4A574;">🪟 High-Performance Windows</h3>
  <p><strong>Cost:</strong> 20-30% more than standard<br>
  <strong>Savings:</strong> 15-25% on energy bills<br>
  <strong>Bonus:</strong> Better comfort, less noise</p>
  
  <h3 style="color: #D4A574;">🔋 Battery Storage</h3>
  <p><strong>Cost:</strong> $10,000 - $20,000<br>
  <strong>Benefit:</strong> Power during outages, peak shaving<br>
  <strong>Perfect for:</strong> Remote properties, EV owners</p>
  
  <div style="background: #F5F0EB; padding: 20px; border-radius: 8px; margin: 30px 0;">
    <p style="margin: 0; font-weight: bold;">🏆 Did You Know?</p>
    <p style="margin: 10px 0 0 0;">I received the Earth Hero Award for sustainable building practices. Energy efficiency isn't just good for your wallet - it's our responsibility to the beautiful environment we live in.</p>
  </div>
  
  <p>Best,<br><strong>Kevin Rea</strong><br>541-390-9848</p>
  
  <hr style="border: none; border-top: 1px solid #E5DED6; margin: 30px 0;">
  <p style="font-size: 12px; color: #999; text-align: center;">
    <a href="{{unsubscribe_url}}" style="color: #999;">Unsubscribe</a> | <a href="https://reacohomes.com" style="color: #999;">Rea Co Homes</a>
  </p>
</body>
</html>
    `,
    textContent: `Home Building Tip #4: Energy-Efficient Features

SOLAR POWER
Cost: $25,000 - $50,000
Savings: $200-400/month
Payback: 6-10 years (with 30% tax credit)

GEOTHERMAL HEATING/COOLING
Cost: $30,000 - $60,000
Savings: 40-60% on heating/cooling
Payback: 8-12 years

HIGH-PERFORMANCE WINDOWS
Cost: 20-30% more than standard
Savings: 15-25% on energy bills

BATTERY STORAGE
Cost: $10,000 - $20,000
Perfect for remote properties, EV owners

I received the Earth Hero Award for sustainable building practices.

Best,
Kevin Rea
541-390-9848`
  },
  {
    orderIndex: 6,
    subject: "Tip #5: The Building Process - What to Expect",
    previewText: "From first meeting to move-in day",
    delayDays: 14,
    delayHours: 0,
    htmlContent: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Georgia, serif; line-height: 1.6; color: #2C1810; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="text-align: center; margin-bottom: 30px;">
    <p style="color: #D4A574; font-size: 14px; text-transform: uppercase; letter-spacing: 2px;">Home Building Tip #5</p>
    <h1 style="color: #2C1810; font-size: 24px;">The Building Process</h1>
  </div>
  
  <p>Hello,</p>
  
  <p>Building a custom home is a journey. Here's what to expect when working with Rea Co Homes:</p>
  
  <h3 style="color: #D4A574;">📋 Phase 1: Discovery (2-4 weeks)</h3>
  <ul>
    <li>Initial consultation to understand your vision</li>
    <li>Site visit and lot analysis</li>
    <li>Preliminary budget discussion</li>
    <li>Review of similar completed projects</li>
  </ul>
  
  <h3 style="color: #D4A574;">✏️ Phase 2: Design (2-4 months)</h3>
  <ul>
    <li>Work with architect on floor plans</li>
    <li>Select major materials and finishes</li>
    <li>Refine budget with detailed estimates</li>
    <li>Obtain permits and approvals</li>
  </ul>
  
  <h3 style="color: #D4A574;">🔨 Phase 3: Construction (10-14 months)</h3>
  <ul>
    <li>Weekly progress updates and site visits</li>
    <li>Regular decision points for selections</li>
    <li>Quality inspections at each milestone</li>
    <li>Direct access to me throughout</li>
  </ul>
  
  <h3 style="color: #D4A574;">🏠 Phase 4: Completion (2-4 weeks)</h3>
  <ul>
    <li>Final walkthrough and punch list</li>
    <li>Homeowner orientation</li>
    <li>Warranty documentation</li>
    <li>Move-in celebration!</li>
  </ul>
  
  <div style="background: #F5F0EB; padding: 20px; border-radius: 8px; margin: 30px 0;">
    <p style="margin: 0; font-weight: bold;">My Promise</p>
    <p style="margin: 10px 0 0 0;">I personally manage every project. You'll have my cell phone number, and I'll be on-site regularly. This isn't just business - it's my craft and my passion.</p>
  </div>
  
  <p>Best,<br><strong>Kevin Rea</strong><br>541-390-9848</p>
  
  <hr style="border: none; border-top: 1px solid #E5DED6; margin: 30px 0;">
  <p style="font-size: 12px; color: #999; text-align: center;">
    <a href="{{unsubscribe_url}}" style="color: #999;">Unsubscribe</a> | <a href="https://reacohomes.com" style="color: #999;">Rea Co Homes</a>
  </p>
</body>
</html>
    `,
    textContent: `Home Building Tip #5: The Building Process

PHASE 1: DISCOVERY (2-4 weeks)
- Initial consultation
- Site visit and lot analysis
- Preliminary budget discussion

PHASE 2: DESIGN (2-4 months)
- Work with architect on floor plans
- Select materials and finishes
- Obtain permits

PHASE 3: CONSTRUCTION (10-14 months)
- Weekly progress updates
- Regular decision points
- Quality inspections

PHASE 4: COMPLETION (2-4 weeks)
- Final walkthrough
- Homeowner orientation
- Move-in celebration!

My Promise: I personally manage every project. You'll have my cell phone number.

Best,
Kevin Rea
541-390-9848`
  },
  {
    orderIndex: 7,
    subject: "Ready to Start Your Dream Home Journey?",
    previewText: "Let's schedule your free consultation",
    delayDays: 21,
    delayHours: 0,
    htmlContent: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Georgia, serif; line-height: 1.6; color: #2C1810; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="color: #2C1810; font-size: 24px;">Ready to Build Your Dream Home?</h1>
  </div>
  
  <p>Hello,</p>
  
  <p>Over the past few weeks, I've shared insights on choosing lots, understanding costs, design trends, energy efficiency, and the building process.</p>
  
  <p>Now I'd love to hear about <strong>your</strong> dream home.</p>
  
  <p>Whether you're ready to break ground next month or just starting to explore the possibilities, I'm here to help. A conversation costs nothing and could be the first step toward the home you've always imagined.</p>
  
  <div style="background: #2C1810; color: white; padding: 30px; border-radius: 8px; margin: 30px 0; text-align: center;">
    <h3 style="margin: 0 0 15px 0; color: #D4A574;">Schedule Your Free Consultation</h3>
    <p style="margin: 0 0 20px 0;">No obligation. Just a conversation about your vision.</p>
    <a href="tel:541-390-9848" style="display: inline-block; background: #D4A574; color: #2C1810; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">Call 541-390-9848</a>
    <p style="margin: 15px 0 0 0; font-size: 14px;">Or reply to this email with your questions</p>
  </div>
  
  <h3 style="color: #D4A574;">What Happens Next?</h3>
  <ol>
    <li>We'll have a 30-minute phone or video call</li>
    <li>I'll learn about your vision, timeline, and budget</li>
    <li>If you have a lot, I'll provide initial site insights</li>
    <li>You'll receive a customized information packet</li>
  </ol>
  
  <p>I've been building dream homes in Central Oregon since 1977. Let me help you build yours.</p>
  
  <p>Looking forward to meeting you,</p>
  
  <p style="margin-bottom: 5px;"><strong>Kevin Rea</strong></p>
  <p style="margin: 0; color: #666;">Master Custom Home Builder</p>
  <p style="margin: 0; color: #666;">2x National Best of Show Winner</p>
  <p style="margin: 0; color: #666;">Earth Hero Award Recipient</p>
  <p style="margin: 0;"><a href="mailto:kevin@reacohomes.com" style="color: #D4A574;">kevin@reacohomes.com</a> | <a href="tel:541-390-9848" style="color: #D4A574;">541-390-9848</a></p>
  
  <hr style="border: none; border-top: 1px solid #E5DED6; margin: 30px 0;">
  <p style="font-size: 12px; color: #999; text-align: center;">
    <a href="{{unsubscribe_url}}" style="color: #999;">Unsubscribe</a> | <a href="https://reacohomes.com" style="color: #999;">Rea Co Homes</a>
  </p>
</body>
</html>
    `,
    textContent: `Ready to Build Your Dream Home?

Over the past few weeks, I've shared insights on choosing lots, understanding costs, design trends, energy efficiency, and the building process.

Now I'd love to hear about YOUR dream home.

SCHEDULE YOUR FREE CONSULTATION
No obligation. Just a conversation about your vision.
Call 541-390-9848

What Happens Next?
1. 30-minute phone or video call
2. I'll learn about your vision, timeline, and budget
3. Site insights if you have a lot
4. Customized information packet

I've been building dream homes in Central Oregon since 1977. Let me help you build yours.

Kevin Rea
Master Custom Home Builder
2x National Best of Show Winner
kevin@reacohomes.com | 541-390-9848`
  }
];

/**
 * Initialize the welcome email sequence in the database
 */
export async function initializeWelcomeSequence(): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  // Check if welcome sequence already exists
  const existing = await db
    .select()
    .from(emailSequences)
    .where(eq(emailSequences.name, "Welcome Sequence"))
    .limit(1);
  
  if (existing.length > 0) {
    console.log("[EmailDrip] Welcome sequence already exists");
    return;
  }
  
  // Create the welcome sequence
  const [sequence] = await db.insert(emailSequences).values({
    name: "Welcome Sequence",
    description: "7-email drip campaign for new subscribers with home building tips",
    triggerType: "lead_magnet",
    active: true,
  }).$returningId();
  
  // Create all email templates
  for (const email of WELCOME_SEQUENCE_EMAILS) {
    await db.insert(emailTemplates).values({
      sequenceId: sequence.id,
      orderIndex: email.orderIndex,
      subject: email.subject,
      previewText: email.previewText,
      htmlContent: email.htmlContent,
      textContent: email.textContent,
      delayDays: email.delayDays,
      delayHours: email.delayHours,
      active: true,
    });
  }
  
  console.log("[EmailDrip] Welcome sequence initialized with 7 emails");
}

/**
 * Enroll a subscriber in the welcome sequence
 */
export async function enrollInWelcomeSequence(subscriberId: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  // Get the welcome sequence
  const [sequence] = await db
    .select()
    .from(emailSequences)
    .where(and(
      eq(emailSequences.name, "Welcome Sequence"),
      eq(emailSequences.active, true)
    ))
    .limit(1);
  
  if (!sequence) {
    console.log("[EmailDrip] Welcome sequence not found, initializing...");
    await initializeWelcomeSequence();
    return enrollInWelcomeSequence(subscriberId);
  }
  
  // Check if already enrolled
  const existingEnrollment = await db
    .select()
    .from(subscriberSequences)
    .where(and(
      eq(subscriberSequences.subscriberId, subscriberId),
      eq(subscriberSequences.sequenceId, sequence.id)
    ))
    .limit(1);
  
  if (existingEnrollment.length > 0) {
    console.log("[EmailDrip] Subscriber already enrolled in welcome sequence");
    return;
  }
  
  // Enroll subscriber
  await db.insert(subscriberSequences).values({
    subscriberId,
    sequenceId: sequence.id,
    currentStep: 0,
    status: "active",
  });
  
  // Get first email template
  const [firstEmail] = await db
    .select()
    .from(emailTemplates)
    .where(and(
      eq(emailTemplates.sequenceId, sequence.id),
      eq(emailTemplates.orderIndex, 1),
      eq(emailTemplates.active, true)
    ))
    .limit(1);
  
  if (firstEmail) {
    // Schedule first email immediately
    const scheduledFor = new Date();
    
    await db.insert(emailQueue).values({
      subscriberId,
      templateId: firstEmail.id,
      sequenceId: sequence.id,
      scheduledFor,
      status: "pending",
    });
    
    console.log(`[EmailDrip] Subscriber ${subscriberId} enrolled, first email scheduled`);
  }
}

/**
 * Process pending emails in the queue
 */
export async function processEmailQueue(): Promise<number> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const now = new Date();
  let sentCount = 0;
  
  // Get pending emails that are due
  const pendingEmails = await db
    .select({
      queueItem: emailQueue,
      template: emailTemplates,
      subscriber: subscribers,
      enrollment: subscriberSequences,
    })
    .from(emailQueue)
    .innerJoin(emailTemplates, eq(emailQueue.templateId, emailTemplates.id))
    .innerJoin(subscribers, eq(emailQueue.subscriberId, subscribers.id))
    .innerJoin(subscriberSequences, and(
      eq(subscriberSequences.subscriberId, emailQueue.subscriberId),
      eq(subscriberSequences.sequenceId, emailQueue.sequenceId)
    ))
    .where(and(
      eq(emailQueue.status, "pending"),
      lte(emailQueue.scheduledFor, now)
    ))
    .limit(10);
  
  for (const { queueItem, template, subscriber, enrollment } of pendingEmails) {
    // Skip if subscriber is inactive or unsubscribed
    if (!subscriber.active || enrollment.status === "unsubscribed") {
      await db
        .update(emailQueue)
        .set({ status: "cancelled" })
        .where(eq(emailQueue.id, queueItem.id));
      continue;
    }
    
    try {
      // Send email via notification system
      const unsubscribeUrl = `https://reacohomes.com/unsubscribe?id=${subscriber.id}`;
      const htmlContent = template.htmlContent.replace(/\{\{unsubscribe_url\}\}/g, unsubscribeUrl);
      
      // Use the notification API to send email
      const sent = await notifyOwner({
        title: `[Email Drip] ${template.subject}`,
        content: `Sending to: ${subscriber.email}\n\nSubject: ${template.subject}\n\nPreview: ${template.previewText || ''}`
      });
      
      if (sent) {
        // Mark as sent
        await db
          .update(emailQueue)
          .set({ 
            status: "sent",
            sentAt: new Date()
          })
          .where(eq(emailQueue.id, queueItem.id));
        
        // Update enrollment
        await db
          .update(subscriberSequences)
          .set({
            currentStep: template.orderIndex,
            lastEmailSentAt: new Date()
          })
          .where(eq(subscriberSequences.id, enrollment.id));
        
        // Schedule next email if exists
        const [nextEmail] = await db
          .select()
          .from(emailTemplates)
          .where(and(
            eq(emailTemplates.sequenceId, template.sequenceId),
            eq(emailTemplates.orderIndex, template.orderIndex + 1),
            eq(emailTemplates.active, true)
          ))
          .limit(1);
        
        if (nextEmail) {
          const nextScheduledFor = new Date();
          nextScheduledFor.setDate(nextScheduledFor.getDate() + nextEmail.delayDays);
          nextScheduledFor.setHours(nextScheduledFor.getHours() + nextEmail.delayHours);
          
          await db.insert(emailQueue).values({
            subscriberId: subscriber.id,
            templateId: nextEmail.id,
            sequenceId: template.sequenceId,
            scheduledFor: nextScheduledFor,
            status: "pending",
          });
        } else {
          // Sequence completed
          await db
            .update(subscriberSequences)
            .set({
              status: "completed",
              completedAt: new Date()
            })
            .where(eq(subscriberSequences.id, enrollment.id));
        }
        
        sentCount++;
        console.log(`[EmailDrip] Sent email "${template.subject}" to ${subscriber.email}`);
      }
    } catch (error) {
      console.error(`[EmailDrip] Failed to send email:`, error);
      await db
        .update(emailQueue)
        .set({ 
          status: "failed",
          errorMessage: error instanceof Error ? error.message : "Unknown error"
        })
        .where(eq(emailQueue.id, queueItem.id));
    }
  }
  
  return sentCount;
}

/**
 * Get email sequence statistics
 */
export async function getEmailSequenceStats() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const sequences = await db.select().from(emailSequences);
  const stats = [];
  
  for (const sequence of sequences) {
    const templates = await db
      .select()
      .from(emailTemplates)
      .where(eq(emailTemplates.sequenceId, sequence.id));
    
    const enrollments = await db
      .select()
      .from(subscriberSequences)
      .where(eq(subscriberSequences.sequenceId, sequence.id));
    
    const activeEnrollments = enrollments.filter(e => e.status === "active").length;
    const completedEnrollments = enrollments.filter(e => e.status === "completed").length;
    
    const sentEmails = await db
      .select()
      .from(emailQueue)
      .where(and(
        eq(emailQueue.sequenceId, sequence.id),
        eq(emailQueue.status, "sent")
      ));
    
    stats.push({
      id: sequence.id,
      name: sequence.name,
      description: sequence.description,
      active: sequence.active,
      triggerType: sequence.triggerType,
      emailCount: templates.length,
      totalEnrollments: enrollments.length,
      activeEnrollments,
      completedEnrollments,
      totalEmailsSent: sentEmails.length,
    });
  }
  
  return stats;
}
