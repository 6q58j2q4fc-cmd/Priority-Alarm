/**
 * ChatBot Component - Customer Service & Sales Assistant
 * Provides 24/7 automated customer service with lead generation capabilities
 */

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  MessageCircle, 
  X, 
  Send, 
  Phone, 
  Mail, 
  Calendar, 
  Home, 
  MapPin,
  ChevronDown,
  Sparkles,
  User
} from "lucide-react";
import { trpc } from "@/lib/trpc";

interface Message {
  id: string;
  type: "bot" | "user";
  content: string;
  options?: QuickOption[];
  timestamp: Date;
}

interface QuickOption {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

// Predefined responses and conversation flows
const botResponses: Record<string, { response: string; options?: QuickOption[] }> = {
  greeting: {
    response: "Hi there! 👋 I'm Kevin's virtual assistant at Rea Co Homes. I'm here to help you learn about our custom home building services in Central Oregon. What can I help you with today?",
    options: [
      { label: "View Portfolio", value: "portfolio", icon: <Home className="w-3 h-3" /> },
      { label: "Building Process", value: "process", icon: <Calendar className="w-3 h-3" /> },
      { label: "Neighborhoods", value: "neighborhoods", icon: <MapPin className="w-3 h-3" /> },
      { label: "Get a Quote", value: "quote", icon: <Sparkles className="w-3 h-3" /> },
    ],
  },
  portfolio: {
    response: "Our portfolio showcases over 45 years of award-winning custom homes! From the stunning Chiaramonte Residence at Tetherow to the award-winning Brown Residence on Awbrey Butte, each home reflects Kevin's commitment to quality craftsmanship.\n\nWould you like to schedule a private tour of one of our completed homes, or explore specific styles?",
    options: [
      { label: "Modern Contemporary", value: "style_modern" },
      { label: "Ranch Style", value: "style_ranch" },
      { label: "Schedule Tour", value: "tour" },
      { label: "Talk to Kevin", value: "contact" },
    ],
  },
  process: {
    response: "Kevin's building process is designed to make your dream home a reality with minimal stress:\n\n1️⃣ **Discovery** - We learn about your vision, lifestyle, and budget\n2️⃣ **Design** - Collaborate with architects to create your perfect plans\n3️⃣ **Pre-Construction** - Detailed cost analysis and material selection\n4️⃣ **Construction** - Weekly updates and transparent communication\n5️⃣ **Completion** - Final walkthrough and warranty support\n\nWant to start your journey?",
    options: [
      { label: "Schedule Consultation", value: "consultation" },
      { label: "View Timeline", value: "timeline" },
      { label: "Cost Estimates", value: "cost" },
      { label: "Back to Menu", value: "menu" },
    ],
  },
  neighborhoods: {
    response: "We build in Central Oregon's most prestigious communities:\n\n🏔️ **Tetherow** - Golf course living with mountain views\n🌲 **Brasada Ranch** - High desert luxury resort community\n🏡 **Broken Top** - Established neighborhood with mature landscaping\n⛰️ **Awbrey Butte** - Panoramic city and mountain views\n🌊 **Deschutes River Ranch** - Riverfront living\n\nWhich neighborhood interests you?",
    options: [
      { label: "Tetherow", value: "tetherow" },
      { label: "Brasada Ranch", value: "brasada" },
      { label: "Broken Top", value: "brokentop" },
      { label: "All Neighborhoods", value: "all_neighborhoods" },
    ],
  },
  quote: {
    response: "I'd love to help you get started on your custom home journey! To provide an accurate estimate, I'll need a few details.\n\nCustom homes in Central Oregon typically range from $400-$800+ per square foot depending on finishes, location, and complexity.\n\nWould you like to share some details about your project?",
    options: [
      { label: "Share My Vision", value: "share_vision" },
      { label: "Budget Discussion", value: "budget" },
      { label: "Schedule Call", value: "call" },
      { label: "Email Kevin", value: "email" },
    ],
  },
  consultation: {
    response: "Excellent choice! Kevin personally meets with every potential client to understand your vision.\n\n📞 **Call directly:** 541-390-9848\n📧 **Email:** kevin@reacohomes.com\n\nOr I can help you schedule a consultation right now. What works best for you?",
    options: [
      { label: "Call Now", value: "call_now" },
      { label: "Send Email", value: "send_email" },
      { label: "Leave Message", value: "leave_message" },
      { label: "Back to Menu", value: "menu" },
    ],
  },
  contact: {
    response: "Kevin Rea is always happy to discuss your custom home dreams!\n\n📞 **Phone:** 541-390-9848\n📧 **Email:** kevin@reacohomes.com\n🌐 **Website:** reacohomes.com\n📍 **Service Area:** Bend, Sunriver, Brasada Ranch, Tetherow, and surrounding Central Oregon\n\nHow would you like to connect?",
    options: [
      { label: "Call Kevin", value: "call_now" },
      { label: "Send Email", value: "send_email" },
      { label: "Visit Website", value: "website" },
      { label: "Back to Menu", value: "menu" },
    ],
  },
  style_modern: {
    response: "Our Modern Contemporary homes feature:\n\n✨ Floor-to-ceiling glass walls\n✨ Open floor plans with seamless indoor-outdoor living\n✨ Clean lines and natural materials\n✨ Smart home integration\n✨ Energy-efficient design\n\nThe Chiaramonte and McCartney residences are perfect examples. Would you like to see more or discuss your modern home vision?",
    options: [
      { label: "View Portfolio", value: "view_portfolio" },
      { label: "Schedule Tour", value: "tour" },
      { label: "Get Started", value: "quote" },
      { label: "Back to Menu", value: "menu" },
    ],
  },
  style_ranch: {
    response: "Our Ranch Style homes blend rustic charm with modern comfort:\n\n🏠 Single-story living with vaulted ceilings\n🏠 Exposed timber beams and natural stone\n🏠 Expansive decks and outdoor living\n🏠 Mountain and high desert views\n🏠 ADU options available\n\nThe Rozewski and Von Schlegell residences showcase this beautiful style. Interested in learning more?",
    options: [
      { label: "View Portfolio", value: "view_portfolio" },
      { label: "Schedule Tour", value: "tour" },
      { label: "Get Started", value: "quote" },
      { label: "Back to Menu", value: "menu" },
    ],
  },
  tour: {
    response: "A private tour is a great way to experience Kevin's craftsmanship firsthand! We can arrange visits to completed homes or homes under construction.\n\nPlease share your contact information and preferred dates, and we'll set up a personalized tour experience.",
    options: [
      { label: "Leave Contact Info", value: "leave_message" },
      { label: "Call to Schedule", value: "call_now" },
      { label: "Back to Menu", value: "menu" },
    ],
  },
  cost: {
    response: "Custom home costs in Central Oregon vary based on several factors:\n\n💰 **Entry Level:** $400-500/sq ft - Quality finishes, standard features\n💰 **Mid-Range:** $500-650/sq ft - Premium finishes, custom details\n💰 **Luxury:** $650-800+/sq ft - High-end finishes, complex designs\n\nLot costs, site work, and permits are additional. Kevin provides detailed cost breakdowns during the pre-construction phase.\n\nWant to discuss your specific budget?",
    options: [
      { label: "Discuss Budget", value: "budget" },
      { label: "Schedule Consultation", value: "consultation" },
      { label: "Back to Menu", value: "menu" },
    ],
  },
  budget: {
    response: "Kevin works with clients across various budgets to create their dream homes. Whether you're planning a 2,500 sq ft family home or a 6,000+ sq ft estate, we'll help you maximize value.\n\nWhat's your approximate budget range for your custom home project?",
    options: [
      { label: "Under $1.5M", value: "budget_low" },
      { label: "$1.5M - $3M", value: "budget_mid" },
      { label: "$3M+", value: "budget_high" },
      { label: "Not Sure Yet", value: "consultation" },
    ],
  },
  call_now: {
    response: "Great! Kevin's direct line is:\n\n📞 **541-390-9848**\n\nBest times to reach him are Monday-Friday, 8am-6pm. If he's on a job site, leave a message and he'll call you back within 24 hours.\n\nIs there anything else I can help you with?",
    options: [
      { label: "Leave Message Instead", value: "leave_message" },
      { label: "Send Email", value: "send_email" },
      { label: "Back to Menu", value: "menu" },
    ],
  },
  send_email: {
    response: "You can reach Kevin directly at:\n\n📧 **kevin@reacohomes.com**\n\nInclude details about your project vision, timeline, and preferred contact method. Kevin personally responds to all inquiries within 24-48 hours.\n\nWould you like me to help you draft a message?",
    options: [
      { label: "Leave Message Here", value: "leave_message" },
      { label: "Call Instead", value: "call_now" },
      { label: "Back to Menu", value: "menu" },
    ],
  },
  leave_message: {
    response: "I'd be happy to take your information and have Kevin reach out to you personally!\n\nPlease share:\n• Your name\n• Phone number or email\n• Brief description of your project\n• Preferred contact time\n\nType your message below and I'll make sure Kevin gets it right away.",
    options: [],
  },
  view_portfolio: {
    response: "Our portfolio page showcases our finest work! You can browse projects by style, location, or features.\n\n👉 Visit /portfolio to see all our custom homes\n\nOr I can tell you about specific projects. Which interests you?",
    options: [
      { label: "Chiaramonte Residence", value: "project_chiaramonte" },
      { label: "Brown Residence", value: "project_brown" },
      { label: "McCartney Residence", value: "project_mccartney" },
      { label: "Back to Menu", value: "menu" },
    ],
  },
  menu: {
    response: "What else can I help you with today?",
    options: [
      { label: "View Portfolio", value: "portfolio", icon: <Home className="w-3 h-3" /> },
      { label: "Building Process", value: "process", icon: <Calendar className="w-3 h-3" /> },
      { label: "Neighborhoods", value: "neighborhoods", icon: <MapPin className="w-3 h-3" /> },
      { label: "Get a Quote", value: "quote", icon: <Sparkles className="w-3 h-3" /> },
    ],
  },
  default: {
    response: "Thanks for your message! I want to make sure Kevin can help you personally with your specific question.\n\nWould you like to:\n• Leave your contact info for a callback\n• Call Kevin directly at 541-390-9848\n• Send an email to kevin@reacohomes.com\n\nOr I can help with general information about our services.",
    options: [
      { label: "Leave Message", value: "leave_message" },
      { label: "Call Kevin", value: "call_now" },
      { label: "Back to Menu", value: "menu" },
    ],
  },
};

// Keywords for intent detection
const intentKeywords: Record<string, string[]> = {
  portfolio: ["portfolio", "projects", "homes", "work", "gallery", "photos", "pictures", "see", "show"],
  process: ["process", "how", "steps", "timeline", "build", "construction", "long"],
  neighborhoods: ["neighborhood", "area", "location", "where", "tetherow", "brasada", "broken top", "awbrey"],
  quote: ["quote", "price", "cost", "estimate", "budget", "afford", "much", "expensive"],
  contact: ["contact", "call", "email", "reach", "talk", "speak", "kevin", "phone"],
  consultation: ["consultation", "meet", "meeting", "appointment", "schedule", "visit"],
};

function detectIntent(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  for (const [intent, keywords] of Object.entries(intentKeywords)) {
    if (keywords.some(keyword => lowerMessage.includes(keyword))) {
      return intent;
    }
  }
  
  return "default";
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // tRPC mutation for lead submission (triggers email notification to Kevin)
  const submitLeadMutation = trpc.leads.submit.useMutation();

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Initialize with greeting
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const greeting = botResponses.greeting;
      setMessages([
        {
          id: "1",
          type: "bot",
          content: greeting.response,
          options: greeting.options,
          timestamp: new Date(),
        },
      ]);
    }
  }, [isOpen, messages.length]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, isMinimized]);

  const addBotResponse = (key: string) => {
    setIsTyping(true);
    
    setTimeout(() => {
      const response = botResponses[key] || botResponses.default;
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          type: "bot",
          content: response.response,
          options: response.options,
          timestamp: new Date(),
        },
      ]);
      setIsTyping(false);
    }, 800 + Math.random() * 400);
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue.trim();
    setInputValue("");
    setHasInteracted(true);

    // Add user message
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        type: "user",
        content: userMessage,
        timestamp: new Date(),
      },
    ]);

    // Check if this looks like contact info (for lead capture)
    const hasEmail = /\S+@\S+\.\S+/.test(userMessage);
    const hasPhone = /\d{3}[-.\s]?\d{3}[-.\s]?\d{4}/.test(userMessage);
    
    if (hasEmail || hasPhone) {
      // Extract contact info
      const extractedEmail = hasEmail ? userMessage.match(/\S+@\S+\.\S+/)?.[0] : undefined;
      const extractedPhone = hasPhone ? userMessage.match(/\d{3}[-.\s]?\d{3}[-.\s]?\d{4}/)?.[0] : undefined;
      
      // Try to capture as lead using tRPC (triggers email notification to Kevin)
      try {
        await submitLeadMutation.mutateAsync({
          firstName: "Chat",
          lastName: "Visitor",
          email: extractedEmail || "chatbot@reacohomes.com",
          phone: extractedPhone,
          message: `[Chatbot Lead] ${userMessage}`,
          source: "chatbot",
        });
        console.log("[ChatBot] Lead captured and notification sent to Kevin");
      } catch (e) {
        console.error("[ChatBot] Failed to capture lead:", e);
        // Silent fail - don't interrupt chat
      }
      
      setIsTyping(true);
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            type: "bot",
            content: "Thank you for sharing your information! Kevin will reach out to you personally within 24 hours. Is there anything else I can help you with in the meantime?",
            options: [
              { label: "View Portfolio", value: "portfolio" },
              { label: "Learn About Process", value: "process" },
              { label: "That's All", value: "goodbye" },
            ],
            timestamp: new Date(),
          },
        ]);
        setIsTyping(false);
      }, 1000);
      return;
    }

    // Detect intent and respond
    const intent = detectIntent(userMessage);
    addBotResponse(intent);
  };

  const handleOptionClick = (value: string) => {
    setHasInteracted(true);
    
    // Add user selection as message
    const option = messages[messages.length - 1]?.options?.find(o => o.value === value);
    if (option) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          type: "user",
          content: option.label,
          timestamp: new Date(),
        },
      ]);
    }

    // Handle special actions
    if (value === "call_now") {
      window.location.href = "tel:541-390-9848";
    } else if (value === "send_email") {
      window.location.href = "mailto:kevin@reacohomes.com";
    } else if (value === "website") {
      window.open("https://www.reacohomes.com", "_blank");
    } else if (value === "view_portfolio") {
      window.location.href = "/portfolio";
    } else if (value === "all_neighborhoods") {
      window.location.href = "/neighborhoods";
    } else if (value === "goodbye") {
      setIsTyping(true);
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            type: "bot",
            content: "Thank you for chatting with us! If you have any questions in the future, I'm always here. Have a wonderful day! 🏠",
            timestamp: new Date(),
          },
        ]);
        setIsTyping(false);
      }, 500);
      return;
    }

    addBotResponse(value);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Floating button when closed
  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-amber hover:bg-amber/90 text-timber rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
        aria-label="Open chat"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
          1
        </span>
        <span className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-timber text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Chat with us!
        </span>
      </button>
    );
  }

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 bg-white rounded-2xl shadow-2xl transition-all duration-300 overflow-hidden ${
        isMinimized ? "w-72 h-14" : "w-96 h-[500px] max-h-[80vh]"
      }`}
    >
      {/* Header */}
      <div
        className="bg-timber text-white p-4 flex items-center justify-between cursor-pointer"
        onClick={() => setIsMinimized(!isMinimized)}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-amber flex items-center justify-center">
            <Home className="w-5 h-5 text-timber" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">Rea Co Homes</h3>
            <p className="text-xs text-white/70">
              {isTyping ? "Typing..." : "Online • Ready to help"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsMinimized(!isMinimized);
            }}
            className="p-1 hover:bg-white/10 rounded transition-colors"
            aria-label={isMinimized ? "Expand" : "Minimize"}
          >
            <ChevronDown className={`w-5 h-5 transition-transform ${isMinimized ? "rotate-180" : ""}`} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }}
            className="p-1 hover:bg-white/10 rounded transition-colors"
            aria-label="Close chat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="h-[calc(100%-130px)] overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] ${
                    message.type === "user"
                      ? "bg-amber text-timber rounded-2xl rounded-br-md"
                      : "bg-white text-gray-800 rounded-2xl rounded-bl-md shadow-sm"
                  } p-3`}
                >
                  {message.type === "bot" && (
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-full bg-timber/10 flex items-center justify-center">
                        <Home className="w-3 h-3 text-timber" />
                      </div>
                      <span className="text-xs text-gray-500">Rea Co Homes</span>
                    </div>
                  )}
                  <p className="text-sm whitespace-pre-line">{message.content}</p>
                  
                  {/* Quick options */}
                  {message.options && message.options.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {message.options.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => handleOptionClick(option.value)}
                          className="flex items-center gap-1 px-3 py-1.5 bg-sand/50 hover:bg-amber/20 text-timber text-xs rounded-full transition-colors"
                        >
                          {option.icon}
                          {option.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white rounded-2xl rounded-bl-md shadow-sm p-3">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-white border-t">
            <div className="flex gap-2">
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                className="flex-1 rounded-full border-gray-200 focus:border-amber focus:ring-amber"
              />
              <Button
                onClick={handleSend}
                disabled={!inputValue.trim()}
                className="rounded-full bg-amber hover:bg-amber/90 text-timber w-10 h-10 p-0"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-gray-400 text-center mt-2">
              Or call <a href="tel:541-390-9848" className="text-amber hover:underline">541-390-9848</a>
            </p>
          </div>
        </>
      )}
    </div>
  );
}
