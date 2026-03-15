import { useEffect, useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Testimonial {
  id: string;
  name: string;
  title: string;
  text: string;
  rating: number;
}

const fallback = [
  { id: "1", name: "Cara D.", title: "So Helpful!", text: "Oh my gosh I love Dang so much! Kirk is always so helpful, informative and nice!", rating: 5 },
  { id: "2", name: "Murray S.", title: "Professional & Super Friendly", text: "Dang Pest Control is very professional and super friendly! I love that they always explain what they are doing and follow up after the service. Highly recommend!", rating: 5 },
  { id: "3", name: "Shelley H.", title: "Quick Treatment & Suggestions", text: "When we moved into our new Barndominium, we apparently brought German Cockroaches in with our moving boxes. Dang quickly discovered where they were coming from and treated them. We haven't had any issues since!", rating: 5 },
  { id: "4", name: "Kelley S.", title: "Friendly & Informative", text: "Dang is so friendly and informative. We recommend everyone use them!", rating: 5 },
];

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(fallback);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    supabase
      .from("testimonials")
      .select("id, name, title, text, rating")
      .eq("is_featured", true)
      .order("sort_order", { ascending: true })
      .then(({ data }) => {
        if (data && data.length > 0) setTestimonials(data);
      });
  }, []);

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));
  const t = testimonials[current];

  return (
    <section
      className="py-16 relative overflow-hidden"
      style={{ background: 'hsl(185, 65%, 45%)' }}
    >
      {/* Halftone dot background pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle, hsl(185, 65%, 30%) 1.5px, transparent 1.5px)',
          backgroundSize: '20px 20px',
        }}
      />

      {/* Ray burst lines from center */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `repeating-conic-gradient(
            hsl(185, 65%, 30%) 0deg 2deg,
            transparent 2deg 30deg
          )`,
          backgroundSize: '200% 200%',
          backgroundPosition: 'center',
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <p
          className="text-comic text-sm italic text-center mb-2"
          style={{ color: 'hsl(48, 100%, 50%)' }}
        >
          TESTIMONIALS
        </p>
        <h2
          className="text-comic text-3xl md:text-5xl text-center mb-10"
          style={{ color: 'hsl(20, 40%, 12%)' }}
        >
          What Our Customers Say
        </h2>

        <div className="relative flex items-center justify-center">

          {/* Left arrow */}
          <button
            onClick={prev}
            className="absolute left-0 md:left-8 z-10 transition-all 
              hover:scale-110"
            style={{ color: 'hsl(48, 100%, 50%)' }}
          >
            <ChevronLeft className="w-14 h-14 drop-shadow-lg" />
          </button>

          {/* Card */}
          <div
            className="bg-white rounded-2xl px-10 py-8 mx-16 md:mx-32 
              w-full max-w-2xl shadow-xl relative"
            style={{ border: '4px solid hsl(20, 40%, 12%)' }}
          >
            {/* Open quote mark */}
            <div
              className="absolute top-4 left-5 text-6xl leading-none 
                font-serif font-bold"
              style={{ color: 'hsl(20, 40%, 12%)', lineHeight: 1 }}
            >
              &#8220;
            </div>

            {/* Close quote mark */}
            <div
              className="absolute bottom-4 right-5 text-6xl leading-none 
                font-serif font-bold"
              style={{ color: 'hsl(20, 40%, 12%)', lineHeight: 1 }}
            >
              &#8221;
            </div>

            {/* Reviewer name ABOVE quote */}
            <p
              className="font-bold text-base text-center mb-1 mt-4"
              style={{ color: 'hsl(20, 40%, 12%)' }}
            >
              {t.name}
            </p>
            <p
              className="text-sm text-center mb-4"
              style={{ color: 'hsl(20, 20%, 40%)' }}
            >
              {t.title}
            </p>

            {/* Review text */}
            <p
              className="text-sm leading-relaxed italic text-center 
                px-4 mb-4"
              style={{ color: 'hsl(20, 20%, 30%)' }}
            >
              {t.text}
            </p>

            {/* Stars */}
            <div className="flex gap-1 justify-center">
              {[...Array(t.rating)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 fill-current"
                  style={{ color: 'hsl(48, 100%, 50%)' }}
                />
              ))}
            </div>
          </div>

          {/* Right arrow */}
          <button
            onClick={next}
            className="absolute right-0 md:right-8 z-10 transition-all 
              hover:scale-110"
            style={{ color: 'hsl(48, 100%, 50%)' }}
          >
            <ChevronRight className="w-14 h-14 drop-shadow-lg" />
          </button>

        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;