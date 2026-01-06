import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Row = {
  id: string;
  slug: string | null;
  title: string;
  organizer: string | null;
  image: string | null;
  raised: number | null;
  goal: number | null;
  donations: number | null;
  days_left: number | null;
};

const FundraiserCards = () => {
  const [items, setItems] = useState<Row[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const { data } = await supabase
        .from('fundraisers')
        .select('id, slug, title, organizer, image, raised, goal, donations, days_left, status, type')
        .in('status', ['approved','published'])
        .eq('type', 'org')
        .order('created_at', { ascending: false }) as any;
      setItems((data as Row[]) || []);
      setLoading(false);
    };
    load();
  }, []);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-text-primary text-center mb-12">
          Pick a cause close to your heart and donate now
        </h2>
        {loading ? (
          <div className="text-center text-text-secondary">Loading...</div>
        ) : items.length === 0 ? (
          <div className="text-center text-text-secondary">No fundraisers yet.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((fundraiser) => {
              const raised = fundraiser.raised || 0;
              const goal = fundraiser.goal || 1;
              const progress = (raised / goal) * 100;
              const link = fundraiser.slug ? `/campaign/${fundraiser.slug}` : '#';
              return (
                <Link
                  key={fundraiser.id}
                  to={link}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group block"
                >
                  <div className="aspect-video overflow-hidden">
                    {fundraiser.image ? (
                      <img src={fundraiser.image} alt={fundraiser.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    ) : (
                      <div className="w-full h-full bg-gray-100" />
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-text-primary mb-2 line-clamp-2">{fundraiser.title}</h3>
                    {fundraiser.organizer ? (
                      <p className="text-sm text-text-secondary mb-4">by {fundraiser.organizer}</p>
                    ) : null}
                    <div className="flex justify-between text-sm text-text-secondary mb-3">
                      <span>{fundraiser.donations || 0} donations</span>
                      <span>{fundraiser.days_left || 0} days left</span>
                    </div>
                    <Progress value={progress} className="h-2 mb-3" />
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-lg font-bold text-text-primary">₹{raised.toLocaleString()}</p>
                        <p className="text-sm text-text-secondary">raised of ₹{goal.toLocaleString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-brand-red">{progress.toFixed(0)}%</p>
                        <p className="text-xs text-text-secondary">funded</p>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default FundraiserCards;