import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-children-education.jpg";

const HeroSection = () => {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary leading-tight mb-6">
              Help Achieve Lives Free from Hunger with Innovative Ideas Spanning Kids
            </h1>
            <p className="text-xl text-text-secondary mb-8 leading-relaxed">
              Join us in creating a world where every child has access to basic necessities, 
              education, and the opportunity to build a brighter future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="donate-large" asChild>
                <Link to="/donate">Give Monthly</Link>
              </Button>
              <Button variant="outline-donate" size="lg" asChild>
                <Link to="/campaign/no-child-orphaned">Learn More</Link>
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <img 
              src={heroImage} 
              alt="Children learning together in a bright classroom"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;