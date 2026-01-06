import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Monthly = {
  id: string;
  slug: string | null;
  title: string;
  description: string | null;
  image: string | null;
  raised: number | null;
  goal: number | null;
  donations: number | null;
};

const CampaignCards = () => {
  const [items, setItems] = useState<Monthly[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const { data } = await supabase
        .from('fundraisers')
        .select('id, slug, title, description, image, raised, goal, donations, status, type')
        .eq('type', 'monthly')
        .in('status', ['approved','published'])
        .order('created_at', { ascending: false }) as any;
      setItems((data as Monthly[]) || []);
      setLoading(false);
    };
    load();
  }, []);

  return (
    <section className="py-16 bg-section-gray">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-text-primary text-center mb-12">
          Give Monthly
        </h2>
        {loading ? (
          <div className="text-center text-text-secondary">Loading...</div>
        ) : items.length === 0 ? (
          <div className="text-center text-text-secondary">No monthly campaigns yet.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {items.map((campaign) => {
              const raised = campaign.raised || 0;
              const goal = campaign.goal || 1;
              const progress = (raised / goal) * 100;
              const link = campaign.slug ? `/campaign/${campaign.slug}` : '#';
              return (
                <div
                  key={campaign.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
                >
                  <div className="aspect-video overflow-hidden">
                    {campaign.image ? (
                      <img src={campaign.image} alt={campaign.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    ) : (
                      <div className="w-full h-full bg-gray-100" />
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-text-primary mb-3">{campaign.title}</h3>
                    {campaign.description ? (
                      <p className="text-text-secondary mb-4 leading-relaxed">{campaign.description}</p>
                    ) : null}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-text-secondary mb-2">
                        <span>{campaign.donations || 0} donations</span>
                        <span>{progress.toFixed(0)}% funded</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                      <div className="flex justify-between text-sm text-text-secondary mt-2">
                        <span className="font-semibold">₹{raised.toLocaleString()}</span>
                        <span>Goal: ₹{goal.toLocaleString()}</span>
                      </div>
                    </div>
                    <Button variant="outline-donate" className="w-full" asChild>
                      <Link to={link}>
                        <span className="text-brand-red font-semibold">Donate now!</span>
                      </Link>
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default CampaignCards;