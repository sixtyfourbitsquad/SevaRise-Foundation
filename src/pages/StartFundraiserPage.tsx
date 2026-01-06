import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const StartFundraiserPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-12">
        <div className="container mx-auto px-4 space-y-10">
          <section className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-extrabold text-text-primary mb-4">Start a Fundraiser</h1>
            <p className="text-text-secondary text-lg">Create a campaign in minutes and raise support for what matters to you.</p>
          </section>

          <Card>
            <CardHeader>
              <CardTitle>Ready to begin?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-text-secondary">You’ll need an account. Create your fundraiser from your dashboard and submit for approval.</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild><a href="/auth">Sign in / Sign up</a></Button>
                <Button variant="outline" asChild><a href="/dashboard">Go to Dashboard</a></Button>
                <Button variant="ghost" asChild><a href="/how-it-works">How it works</a></Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default StartFundraiserPage;


