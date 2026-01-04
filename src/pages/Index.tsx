import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import SignUpModal from "@/components/auth/SignUpModal";
import ContactSalesModal from "@/components/auth/ContactSalesModal";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Index = () => {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.search.includes("signup")) setShowSignUp(true);
    if (location.search.includes("contact")) setShowContact(true);
  }, [location]);

  return (
    <>
      <Helmet>
        <title>MaestroLink - The Unified Platform for Musicians</title>
        <meta 
          name="description" 
          content="Join MaestroLink, the all-in-one platform for musicians to connect, rent instruments, learn, find gigs, and grow their careers. Start free today!" 
        />
        <meta name="keywords" content="musicians, music community, instrument rental, music tutorials, gigs, bands, music jobs" />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <HeroSection onGetStarted={() => setShowSignUp(true)} onContactSales={() => setShowContact(true)} />
          <FeaturesSection />
          <HowItWorksSection />
          <CTASection onGetStarted={() => setShowSignUp(true)} onContactSales={() => setShowContact(true)} />
        </main>

        <SignUpModal open={showSignUp} onOpenChange={setShowSignUp} />
        <ContactSalesModal open={showContact} onOpenChange={setShowContact} />

        <Footer />
      </div>
    </>
  );
};

export default Index;
