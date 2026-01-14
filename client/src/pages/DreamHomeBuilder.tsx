/**
 * AI Dream Home Builder - Interactive Home Design & Cost Estimation
 * Allows users to visualize their dream home with adjustable parameters
 * and get real-time cost estimates before scheduling a consultation
 */

import { useState, useEffect, useMemo } from "react";
import Header from "@/components/Header";
import SEOHead from "@/components/SEOHead";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { trpc } from "@/lib/trpc";
import FloorPlanVisualization from "@/components/FloorPlanVisualization";
import FinancingCalculator from "@/components/FinancingCalculator";
import { Link } from "wouter";
import {
  Home,
  Mountain,
  Sun,
  Zap,
  Leaf,
  DollarSign,
  Send,
  Calendar,
  Sparkles,
  ArrowRight,
  Check,
  Phone,
  Mail,
  Building2,
  Thermometer,
  Battery,
  Wind,
} from "lucide-react";

// Location options with value multipliers
const locationOptions = [
  { id: "standard", name: "Standard Location", multiplier: 1.0, description: "Accessible lot with standard site work" },
  { id: "mountain-view", name: "Mountain View Lot", multiplier: 1.15, description: "Premium lot with Cascade Mountain views" },
  { id: "river-front", name: "River Frontage", multiplier: 1.25, description: "Deschutes River or waterfront property" },
  { id: "golf-course", name: "Golf Course Community", multiplier: 1.20, description: "Brasada Ranch, Tetherow, or Pronghorn" },
  { id: "remote-acreage", name: "Remote Acreage", multiplier: 1.30, description: "5+ acres with extended utilities" },
];

// Home style options
const homeStyles = [
  { id: "modern-contemporary", name: "Modern Contemporary", basePrice: 550 },
  { id: "mountain-modern", name: "Mountain Modern", basePrice: 500 },
  { id: "ranch-contemporary", name: "Ranch Contemporary", basePrice: 475 },
  { id: "craftsman-luxury", name: "Craftsman Luxury", basePrice: 525 },
  { id: "agrarian-modern", name: "Agrarian Modern", basePrice: 485 },
];

// Energy enhancement options
const energyOptions = [
  { id: "solar-panels", name: "Solar Panel Array", icon: Sun, cost: 25000, description: "10kW rooftop solar system" },
  { id: "solar-tiles", name: "Tesla Solar Roof Tiles", icon: Zap, cost: 55000, description: "Integrated solar roof tiles" },
  { id: "thermal-energy", name: "Geothermal Heating/Cooling", icon: Thermometer, cost: 35000, description: "Ground-source heat pump system" },
  { id: "battery-storage", name: "Battery Storage System", icon: Battery, cost: 15000, description: "Powerwall or equivalent storage" },
  { id: "zero-point", name: "Zero-Point Energy Ready", icon: Wind, cost: 20000, description: "Future-proof energy infrastructure" },
  { id: "passive-house", name: "Passive House Certification", icon: Leaf, cost: 45000, description: "Ultra-efficient building envelope" },
];

// Animated home visualization styles
const visualizationStyles = [
  { sqft: 2000, style: "Cozy Modern", image: "/images/chiaramonte-hero-exterior.webp" },
  { sqft: 3000, style: "Family Contemporary", image: "/images/mccartney-exterior-night.webp" },
  { sqft: 4000, style: "Luxury Estate", image: "/images/underwood-hero-exterior.webp" },
  { sqft: 5000, style: "Grand Showcase", image: "/images/1ststreet-hero-exterior.webp" },
  { sqft: 6000, style: "Ultimate Custom", image: "/images/vonschlegell-hero-hallway.webp" },
];

export default function DreamHomeBuilder() {
  // State for home configuration
  const [squareFootage, setSquareFootage] = useState(3500);
  const [homeStyle, setHomeStyle] = useState("modern-contemporary");
  const [location, setLocation] = useState("standard");
  const [bedrooms, setBedrooms] = useState(4);
  const [bathrooms, setBathrooms] = useState(3);
  const [garage, setGarage] = useState(3);
  const [selectedEnergy, setSelectedEnergy] = useState<string[]>([]);
  
  // Contact form state
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactForm, setContactForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  
  // Animation state
  const [animationPhase, setAnimationPhase] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  // Lead submission mutation
  const submitLead = trpc.leads.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
    },
  });

  // Calculate costs
  const costs = useMemo(() => {
    const style = homeStyles.find(s => s.id === homeStyle) || homeStyles[0];
    const loc = locationOptions.find(l => l.id === location) || locationOptions[0];
    
    // Base construction cost
    const baseCostPerSqft = style.basePrice;
    const locationAdjustedCost = baseCostPerSqft * loc.multiplier;
    const constructionCost = squareFootage * locationAdjustedCost;
    
    // Energy enhancements
    const energyCost = selectedEnergy.reduce((total, id) => {
      const option = energyOptions.find(e => e.id === id);
      return total + (option?.cost || 0);
    }, 0);
    
    // Additional features
    const bedroomCost = (bedrooms - 3) * 15000; // Extra bedrooms
    const bathroomCost = (bathrooms - 2) * 12000; // Extra bathrooms
    const garageCost = (garage - 2) * 25000; // Extra garage bays
    
    const totalCost = constructionCost + energyCost + bedroomCost + bathroomCost + garageCost;
    const costPerSqft = totalCost / squareFootage;
    
    return {
      baseCostPerSqft,
      locationAdjustedCost,
      constructionCost,
      energyCost,
      featuresCost: bedroomCost + bathroomCost + garageCost,
      totalCost,
      costPerSqft,
      monthlyPayment: (totalCost * 0.065) / 12, // Rough 30-year mortgage estimate at 6.5%
    };
  }, [squareFootage, homeStyle, location, selectedEnergy, bedrooms, bathrooms, garage]);

  // Get visualization image based on square footage
  const currentVisualization = useMemo(() => {
    const sorted = [...visualizationStyles].sort((a, b) => 
      Math.abs(a.sqft - squareFootage) - Math.abs(b.sqft - squareFootage)
    );
    return sorted[0];
  }, [squareFootage]);

  // Animation effect
  useEffect(() => {
    if (!isAnimating) return;
    
    const interval = setInterval(() => {
      setAnimationPhase(prev => (prev + 1) % 4);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [isAnimating]);

  // Toggle energy option
  const toggleEnergy = (id: string) => {
    setSelectedEnergy(prev => 
      prev.includes(id) 
        ? prev.filter(e => e !== id)
        : [...prev, id]
    );
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const dreamHomeDetails = `
Dream Home Configuration:
- Style: ${homeStyles.find(s => s.id === homeStyle)?.name}
- Square Footage: ${squareFootage.toLocaleString()} sq ft
- Location Type: ${locationOptions.find(l => l.id === location)?.name}
- Bedrooms: ${bedrooms}
- Bathrooms: ${bathrooms}
- Garage Bays: ${garage}
- Energy Features: ${selectedEnergy.map(id => energyOptions.find(e => e.id === id)?.name).join(', ') || 'None'}

Estimated Cost: ${formatCurrency(costs.totalCost)}
Cost per Sq Ft: ${formatCurrency(costs.costPerSqft)}

Additional Notes:
${contactForm.message}
    `.trim();

    await submitLead.mutateAsync({
      firstName: contactForm.firstName,
      lastName: contactForm.lastName,
      email: contactForm.email,
      phone: contactForm.phone,
      message: dreamHomeDetails,
      source: "dream-home-builder",
    });
  };

  return (
    <div className="min-h-screen bg-cream">
      <SEOHead
        title="AI Dream Home Builder | Design Your Custom Home"
        description="Use our interactive AI Dream Home Builder to visualize your perfect Central Oregon custom home. Adjust square footage, features, and get instant cost estimates."
        keywords="dream home builder, custom home cost calculator, Bend Oregon home design, luxury home estimator"
      />
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 bg-timber text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-br from-amber/30 to-transparent" />
        </div>
        
        <div className="container relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-amber/20 text-amber px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm font-medium">AI-Powered Design Tool</span>
            </div>
            
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold mb-6">
              Build Your Dream Home
            </h1>
            
            <p className="font-body text-xl text-white/80 mb-8">
              Use our interactive builder to design your perfect Central Oregon custom home. 
              Adjust every detail and see real-time cost estimates before scheduling your consultation with Kevin Rea.
            </p>
          </div>
        </div>
      </section>

      {/* Main Builder Section */}
      <section className="py-16">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Left Column - Visualization & Preview */}
            <div className="space-y-6">
              {/* Animated Home Visualization */}
              <Card className="overflow-hidden border-0 shadow-xl">
                <div className="relative aspect-video">
                  <img
                    src={currentVisualization.image}
                    alt="Your Dream Home Visualization"
                    className="w-full h-full object-cover transition-all duration-1000"
                    style={{
                      transform: `scale(${1 + animationPhase * 0.02})`,
                      filter: `brightness(${1 - animationPhase * 0.05})`,
                    }}
                  />
                  
                  {/* Overlay with specs */}
                  <div className="absolute inset-0 bg-gradient-to-t from-timber/90 via-timber/30 to-transparent">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="flex items-center justify-between text-white">
                        <div>
                          <p className="text-amber text-sm uppercase tracking-wider">Your Vision</p>
                          <h3 className="font-display text-2xl font-semibold">
                            {squareFootage.toLocaleString()} Sq Ft {homeStyles.find(s => s.id === homeStyle)?.name}
                          </h3>
                        </div>
                        <div className="text-right">
                          <p className="text-white/60 text-sm">Estimated Cost</p>
                          <p className="font-display text-3xl font-bold text-amber">
                            {formatCurrency(costs.totalCost)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Animation indicator */}
                  <div className="absolute top-4 right-4 flex gap-1">
                    {[0, 1, 2, 3].map(i => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          i === animationPhase ? 'bg-amber scale-125' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </Card>

              {/* Cost Breakdown */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-timber">
                    <DollarSign className="w-5 h-5 text-amber" />
                    Cost Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-timber/70">Base Construction</span>
                    <span className="font-semibold text-timber">{formatCurrency(costs.constructionCost)}</span>
                  </div>
                  
                  {costs.energyCost > 0 && (
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-timber/70">Energy Enhancements</span>
                      <span className="font-semibold text-sage">+{formatCurrency(costs.energyCost)}</span>
                    </div>
                  )}
                  
                  {costs.featuresCost !== 0 && (
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-timber/70">Additional Features</span>
                      <span className="font-semibold text-sage">
                        {costs.featuresCost >= 0 ? '+' : ''}{formatCurrency(costs.featuresCost)}
                      </span>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center py-3 bg-timber/5 rounded-lg px-4 -mx-4">
                    <span className="font-semibold text-timber">Total Estimate</span>
                    <span className="font-display text-2xl font-bold text-amber">{formatCurrency(costs.totalCost)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-timber/60">Cost per Square Foot</span>
                    <span className="text-timber">{formatCurrency(costs.costPerSqft)}/sq ft</span>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-timber/60">Est. Monthly Payment (30yr @ 6.5%)</span>
                    <span className="text-timber">{formatCurrency(costs.monthlyPayment)}/mo</span>
                  </div>
                </CardContent>
              </Card>

              {/* 3D Floor Plan Visualization */}
              <FloorPlanVisualization
                squareFootage={squareFootage}
                bedrooms={bedrooms}
                bathrooms={bathrooms}
                garageSpaces={garage}
                homeStyle={homeStyles.find(s => s.id === homeStyle)?.name || "Modern Contemporary"}
              />

              {/* Financing Calculator */}
              <FinancingCalculator
                homePrice={costs.totalCost}
                onPreQualify={(data) => {
                  setShowContactForm(true);
                  setContactForm(prev => ({
                    ...prev,
                    message: `Pre-Qualification Request:\nHome Price: ${formatCurrency(data.homePrice)}\nDown Payment: ${formatCurrency(data.downPayment)} (${data.downPaymentPercent}%)\nLoan Amount: ${formatCurrency(data.loanAmount)}\nInterest Rate: ${data.interestRate}%\nLoan Term: ${data.loanTerm} years\nMonthly Payment: ${formatCurrency(data.monthlyPayment)}\n\n${prev.message}`
                  }));
                }}
              />

              {/* Design Inspiration Link */}
              <Card className="border-0 shadow-lg bg-gradient-to-br from-amber/10 to-timber/5">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-amber/20 flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-amber" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display font-semibold text-timber">Need Inspiration?</h3>
                      <p className="text-sm text-muted-foreground">Browse our gallery of premium features</p>
                    </div>
                    <Link href="/inspiration">
                      <Button className="bg-timber text-white hover:bg-timber/90">
                        View Gallery
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Controls */}
            <div className="space-y-6">
              
              {/* Square Footage Dial */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-timber">
                    <Building2 className="w-5 h-5 text-amber" />
                    Home Size
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <Label className="text-timber">Square Footage</Label>
                      <span className="font-display text-2xl font-bold text-amber">
                        {squareFootage.toLocaleString()} sq ft
                      </span>
                    </div>
                    <Slider
                      value={[squareFootage]}
                      onValueChange={(value) => setSquareFootage(value[0])}
                      min={1500}
                      max={10000}
                      step={100}
                      className="py-4"
                    />
                    <div className="flex justify-between text-xs text-timber/60">
                      <span>1,500 sq ft</span>
                      <span>10,000 sq ft</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label className="text-timber text-sm">Bedrooms</Label>
                      <Select value={bedrooms.toString()} onValueChange={(v) => setBedrooms(parseInt(v))}>
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[2, 3, 4, 5, 6, 7].map(n => (
                            <SelectItem key={n} value={n.toString()}>{n} Beds</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label className="text-timber text-sm">Bathrooms</Label>
                      <Select value={bathrooms.toString()} onValueChange={(v) => setBathrooms(parseInt(v))}>
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[2, 2.5, 3, 3.5, 4, 4.5, 5, 6].map(n => (
                            <SelectItem key={n} value={n.toString()}>{n} Baths</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label className="text-timber text-sm">Garage</Label>
                      <Select value={garage.toString()} onValueChange={(v) => setGarage(parseInt(v))}>
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[2, 3, 4, 5, 6].map(n => (
                            <SelectItem key={n} value={n.toString()}>{n} Cars</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Home Style */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-timber">
                    <Home className="w-5 h-5 text-amber" />
                    Home Style
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-2">
                    {homeStyles.map(style => (
                      <button
                        key={style.id}
                        onClick={() => setHomeStyle(style.id)}
                        className={`flex items-center justify-between p-3 rounded-lg border-2 transition-all ${
                          homeStyle === style.id
                            ? 'border-amber bg-amber/10'
                            : 'border-gray-200 hover:border-amber/50'
                        }`}
                      >
                        <span className={`font-medium ${homeStyle === style.id ? 'text-timber' : 'text-timber/70'}`}>
                          {style.name}
                        </span>
                        <span className="text-sm text-timber/60">
                          ${style.basePrice}/sq ft base
                        </span>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Location */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-timber">
                    <Mountain className="w-5 h-5 text-amber" />
                    Location & Views
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {locationOptions.map(loc => (
                      <button
                        key={loc.id}
                        onClick={() => setLocation(loc.id)}
                        className={`w-full flex items-center justify-between p-3 rounded-lg border-2 transition-all ${
                          location === loc.id
                            ? 'border-amber bg-amber/10'
                            : 'border-gray-200 hover:border-amber/50'
                        }`}
                      >
                        <div className="text-left">
                          <p className={`font-medium ${location === loc.id ? 'text-timber' : 'text-timber/70'}`}>
                            {loc.name}
                          </p>
                          <p className="text-xs text-timber/50">{loc.description}</p>
                        </div>
                        <span className={`text-sm font-medium ${
                          loc.multiplier > 1 ? 'text-sage' : 'text-timber/60'
                        }`}>
                          {loc.multiplier > 1 ? `+${((loc.multiplier - 1) * 100).toFixed(0)}%` : 'Base'}
                        </span>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Energy Enhancements */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-timber">
                    <Zap className="w-5 h-5 text-amber" />
                    Energy & Sustainability
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {energyOptions.map(option => {
                      const Icon = option.icon;
                      const isSelected = selectedEnergy.includes(option.id);
                      
                      return (
                        <div
                          key={option.id}
                          className={`flex items-center justify-between p-3 rounded-lg border-2 transition-all cursor-pointer ${
                            isSelected
                              ? 'border-sage bg-sage/10'
                              : 'border-gray-200 hover:border-sage/50'
                          }`}
                          onClick={() => toggleEnergy(option.id)}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${isSelected ? 'bg-sage/20' : 'bg-gray-100'}`}>
                              <Icon className={`w-5 h-5 ${isSelected ? 'text-sage' : 'text-timber/50'}`} />
                            </div>
                            <div>
                              <p className={`font-medium ${isSelected ? 'text-timber' : 'text-timber/70'}`}>
                                {option.name}
                              </p>
                              <p className="text-xs text-timber/50">{option.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-sage">
                              +{formatCurrency(option.cost)}
                            </span>
                            <Switch
                              checked={isSelected}
                              onCheckedChange={() => toggleEnergy(option.id)}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Send to Kevin Section */}
      <section className="py-16 bg-timber text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            {!showContactForm && !submitted ? (
              <>
                <h2 className="font-display text-3xl md:text-4xl font-semibold mb-6">
                  Ready to Make It Real?
                </h2>
                <p className="font-body text-lg text-white/80 mb-8">
                  Send your dream home design to Kevin Rea and schedule a consultation 
                  to discuss bringing your vision to life in Central Oregon.
                </p>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8">
                  <div className="grid md:grid-cols-3 gap-6 text-center">
                    <div>
                      <p className="text-amber text-sm uppercase tracking-wider mb-1">Your Home</p>
                      <p className="font-display text-2xl font-semibold">
                        {squareFootage.toLocaleString()} sq ft
                      </p>
                    </div>
                    <div>
                      <p className="text-amber text-sm uppercase tracking-wider mb-1">Style</p>
                      <p className="font-display text-2xl font-semibold">
                        {homeStyles.find(s => s.id === homeStyle)?.name}
                      </p>
                    </div>
                    <div>
                      <p className="text-amber text-sm uppercase tracking-wider mb-1">Estimate</p>
                      <p className="font-display text-2xl font-semibold text-amber">
                        {formatCurrency(costs.totalCost)}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-amber hover:bg-amber/90 text-timber font-semibold"
                    onClick={() => setShowContactForm(true)}
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Send Design to Kevin
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white/10"
                    asChild
                  >
                    <a href="tel:541-390-9848">
                      <Phone className="w-5 h-5 mr-2" />
                      Call 541-390-9848
                    </a>
                  </Button>
                </div>
              </>
            ) : submitted ? (
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-10 h-10 text-sage" />
                </div>
                <h2 className="font-display text-3xl font-semibold mb-4">
                  Design Sent Successfully!
                </h2>
                <p className="text-white/80 text-lg mb-6">
                  Kevin Rea has received your dream home design and will contact you within 24 hours 
                  to schedule your consultation.
                </p>
                <p className="text-amber">
                  Check your email for a confirmation with your design details.
                </p>
              </div>
            ) : (
              <div className="max-w-xl mx-auto">
                <h2 className="font-display text-3xl font-semibold mb-6">
                  Send Your Design to Kevin
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-white">First Name</Label>
                      <Input
                        id="firstName"
                        value={contactForm.firstName}
                        onChange={(e) => setContactForm(prev => ({ ...prev, firstName: e.target.value }))}
                        required
                        className="mt-1 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-white">Last Name</Label>
                      <Input
                        id="lastName"
                        value={contactForm.lastName}
                        onChange={(e) => setContactForm(prev => ({ ...prev, lastName: e.target.value }))}
                        required
                        className="mt-1 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        placeholder="Smith"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="text-white">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                      required
                      className="mt-1 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      placeholder="john@example.com"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone" className="text-white">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={contactForm.phone}
                      onChange={(e) => setContactForm(prev => ({ ...prev, phone: e.target.value }))}
                      className="mt-1 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      placeholder="(541) 555-0123"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="message" className="text-white">Additional Notes (Optional)</Label>
                    <Textarea
                      id="message"
                      value={contactForm.message}
                      onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                      className="mt-1 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      placeholder="Tell us more about your dream home vision..."
                      rows={3}
                    />
                  </div>
                  
                  <div className="flex gap-4 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1 border-white/20 text-white hover:bg-white/10"
                      onClick={() => setShowContactForm(false)}
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 bg-amber hover:bg-amber/90 text-timber font-semibold"
                      disabled={submitLead.isPending}
                    >
                      {submitLead.isPending ? (
                        "Sending..."
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send & Schedule Call
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
