import { Home, GraduationCap, Heart } from "lucide-react";
import shelterImage from "@/assets/shelter-impact.jpg";
import educationImage from "@/assets/education-impact.jpg";
import impactImage from "@/assets/community-impact.jpg";

const HowYourDonationHelps = () => {
  const impacts = [
    {
      icon: Home,
      title: "Provides Shelter",
      description: "Your donation helps provide safe housing and living spaces for children and families in need.",
      image: shelterImage,
      bgColor: "bg-blue-50"
    },
    {
      icon: GraduationCap,
      title: "Enables Education",
      description: "Support educational programs that give children the tools they need to build better futures.",
      image: educationImage,
      bgColor: "bg-green-50"
    },
    {
      icon: Heart,
      title: "Creates Impact",
      description: "Every contribution creates lasting change in communities and transforms lives for generations.",
      image: impactImage,
      bgColor: "bg-purple-50"
    }
  ];

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            How Your Donation Helps
          </h2>
          <p className="text-xl text-text-secondary">
            Every rupee you donate makes a direct impact in changing lives
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {impacts.map((impact, index) => {
            const IconComponent = impact.icon;
            return (
              <div key={index} className="text-center">
                <div className={`${impact.bgColor} rounded-xl p-6 mb-6`}>
                  <img 
                    src={impact.image} 
                    alt={impact.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <div className="flex justify-center mb-4">
                    <IconComponent className="w-8 h-8 text-brand-red" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-3">
                  {impact.title}
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  {impact.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowYourDonationHelps;