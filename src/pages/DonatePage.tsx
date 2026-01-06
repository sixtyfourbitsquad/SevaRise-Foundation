import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DonationForm from "@/components/DonationForm";

const DonatePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-8">
        <div className="container mx-auto px-4">
          <DonationForm />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DonatePage;