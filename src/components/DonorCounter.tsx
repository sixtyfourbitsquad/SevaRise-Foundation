import { Users, Heart, Target } from "lucide-react";

const DonorCounter = () => {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            India's Most Trusted Online Donation Platform
          </h2>
          <p className="text-xl text-text-secondary">
            Join thousands of people already making a difference
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <Users className="w-12 h-12 text-brand-red mx-auto mb-4" />
            <div className="text-3xl md:text-4xl font-bold text-text-primary mb-2">2.7M+</div>
            <div className="text-text-secondary">Donors</div>
          </div>
          
          <div>
            <Heart className="w-12 h-12 text-brand-red mx-auto mb-4" />
            <div className="text-3xl md:text-4xl font-bold text-text-primary mb-2">185K+</div>
            <div className="text-text-secondary">Fundraisers</div>
          </div>
          
          <div>
            <Target className="w-12 h-12 text-brand-red mx-auto mb-4" />
            <div className="text-3xl md:text-4xl font-bold text-text-primary mb-2">3000+</div>
            <div className="text-text-secondary">NGO Partners</div>
          </div>
          
          <div>
            <div className="text-3xl md:text-4xl font-bold text-brand-red mx-auto mb-4">₹</div>
            <div className="text-3xl md:text-4xl font-bold text-text-primary mb-2">350+</div>
            <div className="text-text-secondary">Crores Raised</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonorCounter;