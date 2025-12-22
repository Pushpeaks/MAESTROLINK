import { UserPlus, Search, Handshake, Rocket } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    number: "01",
    title: "Create Your Profile",
    description: "Sign up and build your musician profile with skills, instruments, genres, and location.",
  },
  {
    icon: Search,
    number: "02",
    title: "Discover & Connect",
    description: "Find musicians, browse instruments, explore tutorials, and discover gigs tailored to you.",
  },
  {
    icon: Handshake,
    number: "03",
    title: "Collaborate & Transact",
    description: "Form bands, rent gear, book sessions, and apply to jobs with secure payments.",
  },
  {
    icon: Rocket,
    number: "04",
    title: "Grow Your Career",
    description: "Build your reputation, expand your network, and take your music career to new heights.",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[200px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-4">
            How It Works
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
            Your Journey to{" "}
            <span className="gradient-text-secondary">Musical Success</span>
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
            Getting started is easy. Follow these simple steps to unlock the full 
            potential of the MaestroLink platform.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div 
              key={step.number}
              className="relative group opacity-0 animate-slide-up"
              style={{ animationDelay: `${0.2 + index * 0.15}s` }}
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[60%] w-[calc(100%-20%)] h-px bg-gradient-to-r from-border to-transparent" />
              )}

              {/* Step Card */}
              <div className="text-center lg:text-left">
                {/* Number Badge */}
                <div className="relative inline-flex items-center justify-center mb-6">
                  <div className="w-20 h-20 rounded-2xl glass-card flex items-center justify-center group-hover:border-primary/50 transition-all duration-300">
                    <step.icon className="w-8 h-8 text-primary" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground font-display font-bold text-sm flex items-center justify-center shadow-lg">
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <h3 className="font-display font-semibold text-xl text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
