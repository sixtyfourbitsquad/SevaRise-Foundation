import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroCarousel from "@/components/HeroCarousel";
import ImpactStats from "@/components/ImpactStats";
import HowYourDonationHelps from "@/components/HowYourDonationHelps";
import StoriesOfHope from "@/components/StoriesOfHope";
import DonorCounter from "@/components/DonorCounter";
import CampaignCards from "@/components/CampaignCards";
import FundraiserCards from "@/components/FundraiserCards";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import FAQSection from "@/components/FAQSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroCarousel />
        {/* Monthly Donate CTA */}
        <section className="container mx-auto px-4 my-10">
          <div className="p-8 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 text-white flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Donate Monthly</h2>
              <p className="opacity-90">Your steady support powers food, education, and care all year round.</p>
            </div>
            <Button variant="secondary" asChild>
              <Link to="/campaign/monthly">Start Monthly Giving</Link>
            </Button>
          </div>
        </section>

        <ImpactStats />
        <HowYourDonationHelps />
        {/* Campaigns grid reused from Campaign page */}
        <CampaignCards />
        <FundraiserCards />
        <StoriesOfHope />
        <DonorCounter />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
