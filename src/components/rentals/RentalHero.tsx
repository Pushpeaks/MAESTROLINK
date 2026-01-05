import { Music2, Users, Shield, Sparkles } from "lucide-react";

const stats = [
  { icon: Music2, value: "2,500+", label: "Instruments" },
  { icon: Users, value: "10K+", label: "Musicians" },
  { icon: Shield, value: "100%", label: "Insured" },
];

export function RentalHero() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-2xl" />
      
      <div className="container relative">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm">
            <Sparkles className="h-4 w-4" />
            <span>Peer-to-peer instrument rentals</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
            Rent the Perfect{" "}
            <span className="text-primary">Instrument</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Access thousands of quality instruments from fellow musicians. 
            Whether you need a vintage guitar for a gig or a keyboard for practice, 
            find it in your neighborhood.
          </p>
          
          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 pt-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
