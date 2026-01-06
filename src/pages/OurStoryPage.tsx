import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

const images = [
  "https://give.do/blog/wp-content/uploads/2025/08/Blind-Welfare-society-homepage-768x432.jpeg",
  "https://give.do/blog/wp-content/uploads/2025/06/12.png",
  "https://cfstatic.give.do/489b5434-33b4-4ab5-aea6-847a1ddc7935.webp"
];

const OurStoryPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-12">
        <div className="container mx-auto px-4 space-y-10">
          <section className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-extrabold text-text-primary mb-4">Our Story</h1>
            <p className="text-text-secondary text-lg">
              We started with a simple belief: small acts of kindness can change lives. Today,
              your generosity powers food, education, and care for communities across the country.
            </p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {["Humble Beginnings","Growing With Communities","Scaling Impact"].map((title, idx) => (
              <Card key={idx}>
                <CardContent className="p-6 space-y-2">
                  <img 
                    src={images[idx]} 
                    alt={title} 
                    className="h-36 w-full rounded-xl object-cover" 
                  />
                  <h3 className="text-xl font-semibold text-text-primary">{title}</h3>
                  <p className="text-sm text-text-secondary">
                    We build long-term programs and transparent systems to channel your support where it matters most.
                  </p>
                </CardContent>
              </Card>
            ))}
          </section>

          <section className="text-center">
            <div className="inline-flex items-center gap-3 bg-white border rounded-2xl px-6 py-4 shadow-sm">
              <span className="text-lg font-semibold text-text-primary">Be part of our story</span>
              <a href="/donate" className="text-brand-red font-semibold underline">Donate now</a>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OurStoryPage;
