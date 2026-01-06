import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { HandCoins, ShieldCheck, Wallet, BarChart3 } from "lucide-react";

const steps = [
  { 
    title: "You Donate", 
    desc: "Choose a cause or start a monthly gift.", 
    icon: HandCoins 
  },
  { 
    title: "We Verify", 
    desc: "Programs and fundraisers are vetted for impact and transparency.", 
    icon: ShieldCheck 
  },
  { 
    title: "Funds Deployed", 
    desc: "Your support is transferred securely to verified beneficiaries.", 
    icon: Wallet 
  },
  { 
    title: "Impact Tracked", 
    desc: "See updates, stories, and outcomes from the field.", 
    icon: BarChart3 
  },
];

const HowItWorksPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-12">
        <div className="container mx-auto px-4 space-y-10">
          <section className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-extrabold text-text-primary mb-4">
              How Your Donation Works
            </h1>
            <p className="text-text-secondary text-lg">
              A transparent, secure, and human approach to giving.
            </p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <Card key={i}>
                  <CardContent className="p-6 space-y-3 flex flex-col items-center text-center">
                    <div className="flex items-center justify-center h-24 w-24 rounded-full bg-gradient-to-br from-rose-500/20 to-pink-500/20">
                      <Icon className="h-12 w-12 text-rose-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-text-primary">
                      {s.title}
                    </h3>
                    <p className="text-sm text-text-secondary">{s.desc}</p>
                  </CardContent>
                </Card>
              );
            })}
          </section>

          <section className="text-center">
            <a
              href="/campaigns"
              className="inline-block text-brand-red font-semibold underline"
            >
              Explore campaigns
            </a>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorksPage;
