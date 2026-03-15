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
    <section className="py-16 relative overflow-hidden" style={{background: 'hsl(185, 65%, 45%)'}}>
      <div className="container mx-auto px-4">
        <p className="text-comic text-sm italic text-center mb-2" style={{color: 'hsl(48, 100%, 50%)'}}>TESTIMONIALS</p>
        <h2 className="text-comic text-3xl md:text-5xl text-center mb-10" style={{color: 'hsl(20, 40%, 12%)'}}>What Our Customers Say</h2>

        <div className="relative">
          {/* Left Arrow */}
          <button onClick={prev} className="absolute top-1/2 -translate-y-1/2 left-4 md:left-12 w-12 h-12 flex items-center justify-center transition-all hover:scale-110 z-10" style={{color: 'hsl(48, 100%, 50%)'}}>
            <ChevronLeft className="w-10 h-10" />
          </button>

          {/* Card */}
          <div className="bg-white rounded-2xl p-8 max-w-2xl mx-auto shadow-lg" style={{border: '3px solid hsl(20, 40%, 12%)'}}>
            <div className="flex gap-1 justify-center my-3">
              {[...Array(t.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" style={{color: 'hsl(48, 100%, 50%)'}} />
              ))}
            </div>
            <p className="text-sm leading-relaxed italic my-4 text-center" style={{color: 'hsl(20, 20%, 30%)'}}>"{t.text}"</p>
            <p className="font-bold text-base text-center" style={{color: 'hsl(20, 40%, 12%)'}}>{t.name}</p>
            <p className="text-sm text-center" style={{color: 'hsl(20, 20%, 40%)'}}>{t.title}</p>
          </div>

          {/* Right Arrow */}
          <button onClick={next} className="absolute top-1/2 -translate-y-1/2 right-4 md:right-12 w-12 h-12 flex items-center justify-center transition-all hover:scale-110 z-10" style={{color: 'hsl(48, 100%, 50%)'}}>
            <ChevronRight className="w-10 h-10" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
