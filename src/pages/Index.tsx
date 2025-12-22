import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
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
          <HeroSection />
          <FeaturesSection />
          <HowItWorksSection />
          <CTASection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
