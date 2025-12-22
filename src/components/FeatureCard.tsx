import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: "primary" | "secondary" | "accent";
  delay?: string;
}

const gradientClasses = {
  primary: "from-primary/20 to-primary/5 group-hover:from-primary/30 group-hover:to-primary/10",
  secondary: "from-secondary/20 to-secondary/5 group-hover:from-secondary/30 group-hover:to-secondary/10",
  accent: "from-accent/20 to-accent/5 group-hover:from-accent/30 group-hover:to-accent/10",
};

const iconBgClasses = {
  primary: "bg-primary/20 text-primary group-hover:bg-primary group-hover:text-primary-foreground",
  secondary: "bg-secondary/20 text-secondary group-hover:bg-secondary group-hover:text-secondary-foreground",
  accent: "bg-accent/20 text-accent group-hover:bg-accent group-hover:text-accent-foreground",
};

const FeatureCard = ({ icon: Icon, title, description, gradient, delay }: FeatureCardProps) => {
  return (
    <div 
      className="group glass-card-hover p-6 lg:p-8 opacity-0 animate-scale-in"
      style={{ animationDelay: delay }}
    >
      {/* Icon Container */}
      <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-500 ${iconBgClasses[gradient]}`}>
        <Icon className="w-7 h-7" />
      </div>

      {/* Content */}
      <h3 className="font-display font-semibold text-xl text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
        {title}
      </h3>
      <p className="text-muted-foreground leading-relaxed">
        {description}
      </p>

      {/* Bottom Gradient Overlay */}
      <div className={`absolute inset-0 rounded-xl bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${gradientClasses[gradient]}`} />
    </div>
  );
};

export default FeatureCard;
