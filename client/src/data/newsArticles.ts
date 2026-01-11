/**
 * News Articles Data
 * Full content for all news articles
 */

export interface NewsArticle {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  source: string;
  image: string;
  tags: string[];
}

export const newsArticles: NewsArticle[] = [
  {
    id: 1,
    slug: "central-oregon-housing-market-luxury-growth",
    title: "Central Oregon Housing Market Shows Strong Growth in Luxury Segment",
    excerpt: "The custom home market in Bend and surrounding areas continues to see increased demand for high-end properties, with Brasada Ranch and Tetherow leading the way.",
    content: `
## Luxury Home Market Thrives in Central Oregon

The custom home market in Bend and surrounding areas continues to see increased demand for high-end properties, with Brasada Ranch and Tetherow leading the way in sales volume and price appreciation.

### Market Overview

According to recent data from the Central Oregon Association of Realtors, the luxury home segment (properties over $1.5 million) saw a 23% increase in sales volume compared to the previous year. This growth outpaced the overall market, which grew by 12% during the same period.

### Key Drivers

Several factors are contributing to the strong luxury market:

**Remote Work Migration**: Professionals from the Bay Area, Seattle, and Portland continue to relocate to Central Oregon, bringing significant purchasing power and seeking custom homes that accommodate home offices.

**Quality of Life**: The region's outdoor recreation opportunities, including skiing at Mount Bachelor, world-class golf, and extensive trail systems, attract affluent buyers seeking an active lifestyle.

**Limited Inventory**: The scarcity of move-in ready luxury homes has pushed more buyers toward custom construction, benefiting experienced builders like Kevin Rea at Rea Co Homes.

### Community Spotlight

**Brasada Ranch** continues to be the top-performing luxury community, with average home prices exceeding $2.5 million. The community's resort amenities and stunning high desert setting attract buyers from across the country.

**Tetherow** has seen particularly strong demand for golf course homesites, with several new custom homes currently under construction.

### Builder Perspective

"We're seeing unprecedented demand for quality custom homes," says Kevin Rea, owner of Rea Co Homes. "Buyers are willing to wait for the right home rather than compromise on their vision. They want homes that take full advantage of our incredible setting."

### Looking Ahead

Industry experts predict continued strength in the luxury segment through 2026, with particular growth expected in communities offering resort-style amenities and mountain views.

For those considering building a custom home in Central Oregon, now is an excellent time to secure a homesite and begin the planning process.

**Contact Kevin Rea at 541-390-9848 for a consultation about your custom home project.**
    `,
    date: "2026-01-10",
    category: "Market Trends",
    source: "Bend Bulletin",
    image: "/images/hero-neighborhoods.jpg",
    tags: ["Bend Oregon", "Luxury Homes", "Market Trends"],
  },
  {
    id: 2,
    slug: "sustainable-building-practices-high-desert",
    title: "Sustainable Building Practices Gain Traction in High Desert Construction",
    excerpt: "Central Oregon builders are increasingly incorporating energy-efficient designs and sustainable materials in custom home construction.",
    content: `
## Green Building Becomes Standard in Central Oregon

Central Oregon builders are increasingly incorporating energy-efficient designs and sustainable materials in custom home construction, responding to both client demand and the region's unique climate challenges.

### The Shift to Sustainability

What was once a niche market has become mainstream. Today's luxury home buyers expect their custom homes to be both beautiful and environmentally responsible.

### Key Trends

**Energy Efficiency**: New custom homes in Central Oregon are being built to exceed energy code requirements by 30-50%. Features include:
- Advanced insulation systems
- High-performance windows
- Heat pump technology
- Solar-ready designs

**Water Conservation**: Given the region's semi-arid climate, water-efficient features are increasingly important:
- Native landscaping
- Drip irrigation systems
- Low-flow fixtures
- Greywater systems

**Sustainable Materials**: Builders are sourcing materials with lower environmental impact:
- Locally harvested timber
- Recycled content materials
- Low-VOC finishes
- Durable, long-lasting products

### Builder Innovations

Kevin Rea of Rea Co Homes has been at the forefront of sustainable building in Central Oregon. "Our clients want homes that are comfortable, efficient, and responsible," Rea explains. "We've found that sustainable features often enhance the home's performance and reduce long-term operating costs."

### Certification Programs

Several certification programs are gaining popularity in the region:
- **Earth Advantage**: Oregon's green building certification
- **Energy Star**: EPA's energy efficiency program
- **LEED for Homes**: The gold standard in green building

### Economic Benefits

Sustainable homes offer tangible financial benefits:
- Lower utility bills (often 40-60% less than conventional homes)
- Higher resale values
- Available tax credits and incentives
- Reduced maintenance costs

### Looking Forward

As building codes continue to evolve and client expectations increase, sustainable building practices will become even more integral to custom home construction in Central Oregon.

**Learn more about sustainable custom homes: Contact Kevin Rea at 541-390-9848**
    `,
    date: "2026-01-08",
    category: "Industry News",
    source: "Oregon Home Magazine",
    image: "/images/hero-main.jpg",
    tags: ["Sustainable Building", "Green Homes", "Central Oregon"],
  },
  {
    id: 3,
    slug: "brasada-ranch-new-development-phase",
    title: "Brasada Ranch Announces New Phase of Development",
    excerpt: "The popular Powell Butte community continues to expand with new homesites offering stunning Cascade Mountain views.",
    content: `
## Brasada Ranch Expands with Premium Homesites

The popular Powell Butte community continues to expand with new homesites offering stunning Cascade Mountain views, responding to strong demand for luxury living in Central Oregon.

### New Phase Details

Brasada Ranch has released 24 new homesites in what they're calling "The Overlook" phase. These premium lots feature:

- **Sizes ranging from 1.5 to 3.5 acres**
- **Unobstructed views of Mount Bachelor and the Three Sisters**
- **Underground utilities**
- **Paved access roads**
- **Full resort amenity access**

### Pricing and Availability

Homesites in The Overlook phase are priced from $450,000 to $1.2 million, depending on size and view orientation. Early interest has been strong, with several lots already under contract.

### Community Growth

Brasada Ranch has seen remarkable growth since its founding:
- Over 400 homes completed
- More than 200 additional homesites available
- Consistent appreciation in property values
- Growing full-time resident population

### Resort Amenities

New homeowners will have access to Brasada Ranch's world-class amenities:
- Peter Jacobsen-designed golf course
- The Athletic Center with pools and fitness facilities
- Range Restaurant & Bar
- Equestrian center
- Miles of hiking and biking trails

### Builder Opportunities

Kevin Rea of Rea Co Homes has been building custom homes at Brasada Ranch since the community's early days. "The Overlook homesites are some of the best we've seen," Rea notes. "The views are spectacular, and the lot sizes allow for truly impressive custom homes."

### Design Considerations

Building in The Overlook phase requires attention to:
- View optimization
- Integration with the natural landscape
- Compliance with architectural guidelines
- Energy efficiency for the high desert climate

### Next Steps

Interested buyers should act quickly, as premium homesites at Brasada Ranch typically sell within months of release.

**For information about building at Brasada Ranch, contact Kevin Rea at 541-390-9848**
    `,
    date: "2026-01-05",
    category: "Development News",
    source: "Central Oregon Daily",
    image: "/images/oov3bdfkfk6B.jpg",
    tags: ["Brasada Ranch", "New Development", "Powell Butte"],
  },
  {
    id: 4,
    slug: "indoor-outdoor-living-design-trends",
    title: "Indoor-Outdoor Living Trends Dominate Central Oregon Home Design",
    excerpt: "Large glass walls, covered patios, and seamless transitions between indoor and outdoor spaces are the most requested features in new custom homes.",
    content: `
## Blurring the Lines Between Inside and Out

Large glass walls, covered patios, and seamless transitions between indoor and outdoor spaces are the most requested features in new custom homes throughout Central Oregon.

### The Indoor-Outdoor Revolution

Central Oregon's stunning natural setting and favorable climate have made indoor-outdoor living the defining characteristic of luxury homes in the region.

### Most Requested Features

**Expansive Glass Systems**
- Multi-slide and pocket doors that disappear into walls
- Floor-to-ceiling window walls
- Corner glass systems that open entire rooms
- Frameless glass railings for unobstructed views

**Outdoor Living Rooms**
- Covered patios with fireplaces
- Built-in seating and dining areas
- Outdoor kitchens with full appliances
- Heating systems for year-round use

**Seamless Transitions**
- Matching flooring that continues outdoors
- Consistent ceiling heights and materials
- Integrated lighting schemes
- Unified design language

### Climate Considerations

Central Oregon's climate requires thoughtful design:
- **Summer**: Shade structures and cross-ventilation
- **Winter**: Radiant heating in outdoor spaces
- **Year-round**: Protection from wind while maintaining views

### Technology Integration

Modern outdoor spaces incorporate:
- Weatherproof audio/video systems
- Automated shade and screen systems
- Smart lighting controls
- Heated surfaces and furniture

### Builder Expertise

"The key to successful indoor-outdoor design is understanding how people actually use these spaces," explains Kevin Rea. "We design for morning coffee, evening entertaining, and everything in between."

### Investment Value

Homes with well-designed indoor-outdoor spaces command premium prices:
- 15-20% higher valuations
- Faster time on market
- Broader buyer appeal

### Design Inspiration

The best indoor-outdoor designs in Central Oregon draw inspiration from:
- The natural landscape
- Mountain lodge architecture
- Contemporary resort design
- Traditional ranch aesthetics

**Explore indoor-outdoor design options: Contact Kevin Rea at 541-390-9848**
    `,
    date: "2026-01-03",
    category: "Design Trends",
    source: "Architectural Digest",
    image: "/images/hero-portfolio.jpg",
    tags: ["Home Design", "Indoor-Outdoor", "Architecture"],
  },
  {
    id: 5,
    slug: "tetherow-resort-record-home-sales",
    title: "Tetherow Resort Community Sees Record Home Sales",
    excerpt: "The Bend golf resort community reports strong demand for custom homesites with mountain views and resort amenities.",
    content: `
## Tetherow Achieves Record Sales Year

The Bend golf resort community reports strong demand for custom homesites with mountain views and resort amenities, marking its best sales year since the community's founding.

### Sales Highlights

Tetherow's 2025 performance exceeded expectations:
- 47 home sales (up 35% from previous year)
- Average sale price of $2.1 million
- 12 new custom home starts
- Record low days on market for listings

### Driving Factors

**Golf Course Appeal**
The David McLay Kidd-designed course continues to attract golfers from around the world. Its links-style design and stunning setting make it one of Oregon's most celebrated courses.

**Resort Amenities**
Tetherow offers a complete resort experience:
- The Row restaurant and bar
- Full-service spa
- Fitness center and pools
- Tennis and pickleball courts
- Proximity to Mount Bachelor

**Location Advantages**
Tetherow's west Bend location provides:
- Quick access to downtown
- Easy drive to Mount Bachelor
- Adjacent to national forest land
- Views of the Cascade Range

### Custom Home Opportunities

Several premium homesites remain available for custom construction:
- Golf course frontage lots
- Mountain view properties
- Forested settings
- Various sizes from 0.5 to 2+ acres

### Builder Activity

Kevin Rea of Rea Co Homes has completed multiple custom homes at Tetherow. "The community offers an incredible combination of golf, views, and convenience," Rea observes. "Our clients love being able to walk to dinner at The Row after a round of golf."

### Market Outlook

Real estate experts predict continued strong performance:
- Limited remaining inventory
- Growing regional population
- Increasing appeal to remote workers
- Strong rental market for investment buyers

### Getting Started

For those interested in building at Tetherow, the process typically begins with:
1. Touring available homesites
2. Understanding architectural guidelines
3. Selecting a builder
4. Beginning the design process

**Learn about building at Tetherow: Contact Kevin Rea at 541-390-9848**
    `,
    date: "2025-12-28",
    category: "Market Trends",
    source: "Bend Source",
    image: "/images/qHKfAGVqL6Y8.jpg",
    tags: ["Tetherow", "Golf Community", "Home Sales"],
  },
  {
    id: 6,
    slug: "central-oregon-remote-workers-destination",
    title: "Central Oregon Named Top Destination for Remote Workers",
    excerpt: "The region's natural beauty and quality of life continue to attract professionals seeking custom homes with dedicated office spaces.",
    content: `
## Remote Workers Flock to Central Oregon

The region's natural beauty and quality of life continue to attract professionals seeking custom homes with dedicated office spaces, transforming the local real estate market.

### The Remote Work Revolution

The shift to remote work has fundamentally changed where people choose to live. Central Oregon has emerged as one of the top destinations for professionals no longer tethered to urban offices.

### Why Central Oregon?

**Natural Beauty**
- 300+ days of sunshine annually
- Stunning mountain views
- Access to rivers, lakes, and forests
- Clean air and open spaces

**Outdoor Recreation**
- World-class skiing at Mount Bachelor
- Championship golf courses
- Extensive trail systems
- Water sports on the Deschutes River

**Quality of Life**
- Excellent restaurants and breweries
- Vibrant arts and culture scene
- Strong sense of community
- Lower cost of living than coastal cities

### Home Office Trends

Custom homes are being designed with remote work in mind:

**Dedicated Office Spaces**
- Separate entrances for client meetings
- Soundproofing for video calls
- Built-in desks and storage
- Professional-quality lighting

**Technology Infrastructure**
- Fiber internet availability
- Whole-home WiFi systems
- Video conferencing setups
- Backup power systems

**Work-Life Balance Features**
- Views from the desk
- Easy access to outdoor spaces
- Gym and wellness rooms
- Flexible spaces that adapt to needs

### Market Impact

The influx of remote workers has affected the housing market:
- Increased demand for custom homes
- Rising land prices in desirable areas
- Longer wait times for construction
- Higher expectations for home features

### Builder Perspective

"Remote workers have different priorities than traditional buyers," notes Kevin Rea. "They want homes that support both productivity and the outdoor lifestyle that drew them here. We're designing spaces that let them step away from their desk and onto a hiking trail within minutes."

### Community Integration

New residents are contributing to the community:
- Supporting local businesses
- Volunteering and civic engagement
- Bringing diverse perspectives
- Strengthening the tax base

**Design your perfect work-from-home retreat: Contact Kevin Rea at 541-390-9848**
    `,
    date: "2025-12-22",
    category: "Lifestyle",
    source: "Forbes",
    image: "/images/cascade-mountains.jpg",
    tags: ["Remote Work", "Lifestyle", "Central Oregon"],
  },
];

export const categories = [
  "All News",
  "Market Trends",
  "Industry News",
  "Development News",
  "Design Trends",
  "Lifestyle",
];

export function getNewsArticleBySlug(slug: string): NewsArticle | undefined {
  return newsArticles.find((article) => article.slug === slug);
}

export function getNewsArticleById(id: number): NewsArticle | undefined {
  return newsArticles.find((article) => article.id === id);
}
