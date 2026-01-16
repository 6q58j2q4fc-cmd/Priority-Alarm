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
          {/* Analytics & Retargeting */}
          <GoogleAnalytics />
          <RetargetingPixels />
          
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
