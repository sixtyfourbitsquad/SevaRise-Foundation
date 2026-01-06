import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroCarousel from "@/components/HeroCarousel";
import CampaignCards from "@/components/CampaignCards";
import FundraiserCards from "@/components/FundraiserCards";

const CampaignPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroCarousel />
        <CampaignCards />
        <FundraiserCards />
      </main>
      <Footer />
    </div>
  );
};

export default CampaignPage;