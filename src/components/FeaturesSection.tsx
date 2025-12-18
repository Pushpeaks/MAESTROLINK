import { Users, Guitar, GraduationCap, MapPin, Briefcase, Ticket } from "lucide-react";
import FeatureCard from "./FeatureCard";

const features = [
  {
    icon: Users,
    title: "Musician Community",
    description: "Connect with musicians by skill, genre, and location. Form bands, collaborate on projects, and grow your network.",
    gradient: "primary" as const,
  },
  {
    icon: Guitar,
    title: "Instrument Rentals",
    description: "Rent or list instruments with secure payments. Find guitars, drums, keys and more from trusted owners nearby.",
    gradient: "secondary" as const,
  },
  {
    icon: GraduationCap,
    title: "Learn & Teach",
    description: "Access video tutorials, book live workshops, and find local music teachers. Musicians can sell their own courses too.",
    gradient: "accent" as const,
  },
  {
    icon: MapPin,
    title: "Jam Pad Locator",
    description: "Discover rehearsal spaces near you. Our smart system finds the optimal meeting point for your entire band.",
    gradient: "primary" as const,
  },
  {
    icon: Briefcase,
    title: "AI Job Matching",
    description: "Get personalized gig recommendations powered by AI. Match your profile with the perfect opportunities automatically.",
    gradient: "secondary" as const,
  },
  {
    icon: Ticket,
    title: "Events & Ticketing",
    description: "Promote your live shows, sell tickets with QR entry, and discover upcoming gigs in your area.",
    gradient: "accent" as const,
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="section-padding relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Platform Features
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
            Everything You Need to{" "}
            <span className="gradient-text">Succeed in Music</span>
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
            Six powerful modules designed to support every aspect of your musical journey, 
            from community building to career growth.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              {...feature}
              delay={`${0.1 + index * 0.1}s`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
