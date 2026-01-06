import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Calendar, Heart, Share2 } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

type Fundraiser = {
  title: string;
  subtitle: string | null;
  description: string;
  story: string | null;
  image: string | null;
  raised: number | null;
  goal: number | null;
  donations: number | null;
  days_left: number | null;
  organizer: string | null;
  organizer_verified: boolean | null;
  impact: string[] | null;
  updates: { date: string; title: string; description: string }[] | null;
  type?: string | null;
};

const CampaignDetailPage = () => {
  const { slug } = useParams();
  const [campaign, setCampaign] = useState<Fundraiser | null>(null);
  const [shareOpen, setShareOpen] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (!slug) {
        setNotFound(true);
        return;
      }

      // Decode URL-encoded slug (handles spaces, special characters)
      const decodedSlug = decodeURIComponent(slug);
      
      // Try to find campaign with the slug
      let { data, error } = await supabase
        .from("fundraisers")
        .select(
          "title, subtitle, description, story, image, raised, goal, donations, days_left, organizer, organizer_verified, impact, updates, type"
        )
        .eq("slug", decodedSlug)
        .in("status", ["approved", "published"])
        .maybeSingle();

      // If not found and slug is "monthly", try to find first monthly campaign
      if ((error || !data) && decodedSlug.toLowerCase() === "monthly") {
        const { data: monthlyData } = await supabase
          .from("fundraisers")
          .select(
            "title, subtitle, description, story, image, raised, goal, donations, days_left, organizer, organizer_verified, impact, updates, type"
          )
          .eq("type", "monthly")
          .in("status", ["approved", "published"])
          .order("created_at", { ascending: false })
          .limit(1)
          .maybeSingle();
        
        if (monthlyData) {
          data = monthlyData;
          error = null;
        }
      }

      if (error || !data) {
        setNotFound(true);
      } else {
        const adjusted: Fundraiser = {
          ...data,
          organizer: data.type === "monthly" ? "SevaRise Foundation" : data.organizer,
          organizer_verified: data.type === "monthly" ? true : data.organizer_verified,
        };
        setCampaign(adjusted);
      }
    };
    load();
  }, [slug]);

  if (notFound) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold text-text-primary mb-4">Campaign Not Found</h1>
            <p className="text-text-secondary mb-8">The campaign you're looking for doesn't exist.</p>
            <Button variant="donate" asChild>
              <Link to="/">Back to Home</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-16">
          <div className="container mx-auto px-4 text-center text-text-secondary">Loading...</div>
        </main>
        <Footer />
      </div>
    );
  }

  const progress = (((campaign.raised || 0) / (campaign.goal || 1)) * 100);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <div
          className="w-full h-full bg-cover bg-center relative"
          style={{ backgroundImage: `url(${campaign.image || ''})` }}
        >
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 h-full flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl text-white">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                  {campaign.title}
                </h1>
                <p className="text-xl mb-8 opacity-90">
                  {campaign.subtitle}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="donate-large" asChild>
                    <Link to={`/donate?campaign=${slug}`}>Donate Now</Link>
                  </Button>
                  <Button onClick={() => setShareOpen(true)} variant="outline" className="text-text-primary border-text-primary hover:bg-text-primary hover:text-primary">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Campaign
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="py-12">
        <div className="container mx-auto px-4">
          {shareOpen ? (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
              <div className="bg-white rounded-lg p-4 w-full max-w-md space-y-3">
                <div className="font-semibold text-text-primary">Share this campaign</div>
                <input className="w-full border rounded px-2 py-2" readOnly value={window.location.href} onFocus={(e) => e.currentTarget.select()} />
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => { navigator.clipboard?.writeText(window.location.href); }}>Copy Link</Button>
                  <Button onClick={() => setShareOpen(false)}>Close</Button>
                </div>
              </div>
            </div>
          ) : null}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Campaign Stats */}
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-brand-red">₹{(campaign.raised||0).toLocaleString()}</div>
                      <div className="text-sm text-text-secondary">Raised</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-text-primary">{campaign.donations || 0}</div>
                      <div className="text-sm text-text-secondary">Donations</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-text-primary">{campaign.days_left || 0}</div>
                      <div className="text-sm text-text-secondary">Days Left</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-text-primary">{progress.toFixed(0)}%</div>
                      <div className="text-sm text-text-secondary">Funded</div>
                    </div>
                  </div>
                  <Progress value={progress} className="h-3 mb-2" />
                  <div className="flex justify-between text-sm text-text-secondary">
                    <span>₹{(campaign.raised||0).toLocaleString()} raised</span>
                    <span>Goal: ₹{(campaign.goal||0).toLocaleString()}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Story Section */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-text-primary mb-4">Our Story</h2>
                  <p className="text-text-secondary mb-6 leading-relaxed">
                    {campaign.description}
                  </p>
                  <p className="text-text-secondary leading-relaxed">
                    {campaign.story}
                  </p>
                </CardContent>
              </Card>

              {/* Impact Section */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-text-primary mb-4">How Your Donation Helps</h2>
                  <div className="space-y-3">
                    {(campaign.impact || []).map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <Heart className="w-5 h-5 text-brand-red flex-shrink-0" />
                        <span className="text-text-secondary">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Updates Section */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-text-primary mb-4">Recent Updates</h2>
                  <div className="space-y-4">
                    {(campaign.updates || []).map((update, index) => (
                      <div key={index} className="border-l-4 border-brand-red pl-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="w-4 h-4 text-text-secondary" />
                          <span className="text-sm text-text-secondary">{update.date}</span>
                        </div>
                        <h3 className="font-semibold text-text-primary mb-1">{update.title}</h3>
                        <p className="text-text-secondary">{update.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Donation Card */}
              <Card className="sticky top-4">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-brand-red mb-2">
                      ₹{(campaign.raised||0).toLocaleString()}
                    </div>
                    <div className="text-text-secondary">
                      raised of ₹{(campaign.goal||0).toLocaleString()} goal
                    </div>
                  </div>
                  <Button variant="donate-large" className="w-full mb-4" asChild>
                    <Link to={`/donate?campaign=${slug}`}>
                      <Heart className="w-4 h-4 mr-2" />
                      Donate Now
                    </Link>
                  </Button>
                  <Button variant="outline-donate" className="w-full">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Campaign
                  </Button>
                </CardContent>
              </Card>

              {/* Organizer Info */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-text-primary mb-4">Organized by</h3>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-brand-red rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-text-primary">{campaign.organizer || '—'}</div>
                      <div className="text-sm text-text-secondary">{campaign.organizer_verified ? 'Verified Organization' : 'Organization'}</div>
                    </div>
                  </div>
                  <p className="text-sm text-text-secondary">
                    Trusted organization working to improve lives in communities across India.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CampaignDetailPage;