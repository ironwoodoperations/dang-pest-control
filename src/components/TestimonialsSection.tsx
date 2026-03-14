import { useEffect, useState } from "react";
import { Star } from "lucide-react";
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

  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <h2 className="text-comic text-3xl md:text-4xl text-center mb-12">What Our Customers Say</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t) => (
            <div key={t.id} className="testimonial-card">
              <div className="flex gap-0.5 mb-3">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
                ))}
              </div>
              <p className="text-sm italic mb-4">"{t.text}"</p>
              <p className="font-bold text-sm">{t.name}</p>
              <p className="text-xs text-muted-foreground">{t.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
