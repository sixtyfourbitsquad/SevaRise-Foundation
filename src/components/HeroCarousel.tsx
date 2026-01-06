import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";

const fallbackSlides: { id: number; image: string; title: string; description: string; cta?: string; cta_link?: string | null }[] = [];

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState<{ id: number; image: string; title: string; description: string; cta?: string; cta_link?: string | null }[]>(fallbackSlides);

  useEffect(() => {
    const loadSlides = async () => {
      try {
        const { data, error } = await supabase
          .from("hero_slides")
          .select("id, image_url, title, description, cta, cta_link, sort_order, is_active")
          .eq("is_active", true)
          .order("sort_order", { ascending: true });
        if (!error && data && data.length > 0) {
          const mapped = (data as any[]).map((row) => ({
            id: row.id as number,
            image: row.image_url as string,
            title: row.title as string,
            description: row.description as string,
            cta: (row.cta as string) || "Donate Now",
            cta_link: (row.cta_link as string) || "/donate",
          }));
          setSlides(mapped);
        }
      } catch {}
    };
    loadSlides();
  }, []);

  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative h-[70vh] overflow-hidden rounded-2xl mx-4">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
            index === currentSlide ? 'translate-x-0' :
            index < currentSlide ? 'translate-x-full' : '-translate-x-full'
          }`}
        >
          <div 
            className="w-full h-full bg-cover bg-center relative rounded-2xl"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-black/40 rounded-2xl" />
            <div className="relative z-10 h-full flex items-center">
              <div className="container mx-auto px-8">
                <div className="max-w-2xl text-white">
                  <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-xl mb-8 leading-relaxed opacity-90">
                    {slide.description}
                  </p>
                  <Button variant="donate-large" asChild>
                    <Link to={slide.cta_link || "/donate"}>{slide.cta || "Donate Now"}</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;