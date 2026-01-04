import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

interface CTASectionProps {
  onGetStarted?: () => void;
  onContactSales?: () => void;
}

const CTASection = ({ onGetStarted, onContactSales }: CTASectionProps) => {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[250px] animate-pulse-glow" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-foreground">
            Join thousands of musicians today
          </span>
        </div>

        {/* Heading */}
        <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-foreground mb-6">
          Ready to Amplify Your{" "}
          <span className="gradient-text">Musical Journey?</span>
        </h2>

        {/* Description */}
        <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
          Stop searching across multiple platforms. MaestroLink brings together 
          everything you need to connect, create, learn, and grow as a musician.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button onClick={() => onGetStarted && onGetStarted()} variant="hero" size="xl" className="group">
            Start Free Today
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button onClick={() => onContactSales && onContactSales()} variant="glass" size="xl">
            Contact Sales
          </Button>
        </div>

        {/* Trust Text */}
        <p className="mt-8 text-sm text-muted-foreground">
          No credit card required • Free forever plan available • Cancel anytime
        </p>
      </div>
    </section>
  );
};

export default CTASection;
