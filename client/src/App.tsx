import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import GoogleAnalytics from "./components/GoogleAnalytics";
import ChatBot from "./components/ChatBot";
import LeadMagnet from "./components/LeadMagnet";
import ScrollCTA from "./components/ScrollCTA";
import SocialProofNotification from "./components/SocialProofNotification";
import RetargetingPixels from "./components/RetargetingPixels";
import UrgencyBanner from "./components/UrgencyBanner";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import Neighborhoods from "./pages/Neighborhoods";
import News from "./pages/News";
import NewsArticle from "./pages/NewsArticle";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";
import About from "./pages/About";
import AdminDashboard from "./pages/AdminDashboard";
import Articles from "./pages/Articles";
import GeneratedArticle from "./pages/GeneratedArticle";
import Testimonials from "./pages/Testimonials";
import DreamHomeBuilder from "./pages/DreamHomeBuilder";
import DesignInspiration from "./pages/DesignInspiration";
import BrasadaRanchBuilder from "./pages/BrasadaRanchBuilder";
import TetherowCustomHomes from "./pages/TetherowCustomHomes";
import PronghornBuilder from "./pages/PronghornBuilder";
import BrokenTopBuilder from "./pages/BrokenTopBuilder";
import CalderaSpringsBuilder from "./pages/CalderaSpringsBuilder";
import AwbreyButteBuilder from "./pages/AwbreyButteBuilder";
import SunriverBuilder from "./pages/SunriverBuilder";
import AspenLakesBuilder from "./pages/AspenLakesBuilder";
import CrosswaterBuilder from "./pages/CrosswaterBuilder";
import EagleCrestBuilder from "./pages/EagleCrestBuilder";
import RiverRimBuilder from "./pages/RiverRimBuilder";
import ShevlinCommonsBuilder from "./pages/ShevlinCommonsBuilder";
import SummitWestBuilder from "./pages/SummitWestBuilder";
import WidgiCreekBuilder from "./pages/WidgiCreekBuilder";
import RedmondBuilder from "./pages/RedmondBuilder";
import AwbreyGlenBuilder from "./pages/AwbreyGlenBuilder";
import BlackButteRanchBuilder from "./pages/BlackButteRanchBuilder";
import JuniperPreserveBuilder from "./pages/JuniperPreserveBuilder";
import NorthwestCrossingBuilder from "./pages/NorthwestCrossingBuilder";
import HighlandsBrokenTopBuilder from "./pages/HighlandsBrokenTopBuilder";
import OldMillBuilder from "./pages/OldMillBuilder";
import SistersBuilder from "./pages/SistersBuilder";
import LaPineBuilder from "./pages/LaPineBuilder";
import PrinevilleBuilder from "./pages/PrinevilleBuilder";
import Resources from "./pages/Resources";
import FAQ from "./pages/FAQ";
import LocalBusinessSchema from "./components/LocalBusinessSchema";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/portfolio" component={Portfolio} />
      <Route path="/neighborhoods" component={Neighborhoods} />
      <Route path="/news" component={News} />
      <Route path="/news/:slug" component={NewsArticle} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={BlogPost} />
      <Route path="/articles" component={Articles} />
      <Route path="/articles/:slug" component={GeneratedArticle} />
      <Route path="/contact" component={Contact} />
      <Route path="/about" component={About} />
      <Route path="/testimonials" component={Testimonials} />
      <Route path="/dream-home-builder" component={DreamHomeBuilder} />
      <Route path="/inspiration" component={DesignInspiration} />
      <Route path="/inspiration/:category" component={DesignInspiration} />
      <Route path="/brasada-ranch-builder" component={BrasadaRanchBuilder} />
      <Route path="/tetherow-custom-homes" component={TetherowCustomHomes} />
      <Route path="/pronghorn-builder" component={PronghornBuilder} />
      <Route path="/broken-top-builder" component={BrokenTopBuilder} />
      <Route path="/caldera-springs-builder" component={CalderaSpringsBuilder} />
      <Route path="/awbrey-butte-builder" component={AwbreyButteBuilder} />
      <Route path="/sunriver-builder" component={SunriverBuilder} />
      <Route path="/aspen-lakes-builder" component={AspenLakesBuilder} />
      <Route path="/crosswater-builder" component={CrosswaterBuilder} />
      <Route path="/eagle-crest-builder" component={EagleCrestBuilder} />
      <Route path="/river-rim-builder" component={RiverRimBuilder} />
      <Route path="/shevlin-commons-builder" component={ShevlinCommonsBuilder} />
      <Route path="/summit-west-builder" component={SummitWestBuilder} />
      <Route path="/widgi-creek-builder" component={WidgiCreekBuilder} />
      <Route path="/redmond-builder" component={RedmondBuilder} />
      <Route path="/awbrey-glen-builder" component={AwbreyGlenBuilder} />
      <Route path="/black-butte-ranch-builder" component={BlackButteRanchBuilder} />
      <Route path="/juniper-preserve-builder" component={JuniperPreserveBuilder} />
      <Route path="/northwest-crossing-builder" component={NorthwestCrossingBuilder} />
      <Route path="/highlands-broken-top-builder" component={HighlandsBrokenTopBuilder} />
      <Route path="/old-mill-builder" component={OldMillBuilder} />
      <Route path="/sisters-builder" component={SistersBuilder} />
      <Route path="/la-pine-builder" component={LaPineBuilder} />
      <Route path="/prineville-builder" component={PrinevilleBuilder} />
      <Route path="/resources" component={Resources} />
      <Route path="/faq" component={FAQ} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          {/* Analytics, SEO & Retargeting */}
          <GoogleAnalytics />
          <RetargetingPixels />
          <LocalBusinessSchema />
          
          {/* Urgency Banner - Shows limited 2026 build slots message */}
          <UrgencyBanner variant="slots" />
          
          <Toaster />
          <Router />
          
          {/* Lead Generation Components */}
          <ChatBot />
          <LeadMagnet variant="popup" />
          <ScrollCTA variant="phone" scrollThreshold={40} />
          <SocialProofNotification />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
