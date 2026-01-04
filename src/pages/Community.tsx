import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CommunityMembers from "@/components/community/CommunityMembers";
import CTASection from "@/components/CTASection";

const Community = () => {
  return (
    <>
      <Helmet>
        <title>Community — MaestroLink</title>
        <meta name="description" content="Connect with musicians near you, join groups, and discover jam sessions." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />

        <main className="pt-28">
          {/* Hero */}
          <section className="max-w-7xl mx-auto px-6 lg:px-8 text-center py-20">
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl mb-4">Community</h1>
            <p className="max-w-3xl mx-auto text-muted-foreground text-lg mb-8">
              Find and connect with local musicians, form bands, discover events, and share your work.
            </p>
            <div className="max-w-2xl mx-auto mb-12">
              <CommunityMembers />
            </div>
          </section>

          {/* CTA */}
          <CTASection onGetStarted={() => {}} onContactSales={() => {}} />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Community;
