import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: "Sarah M.",
    company: "CEO, Innovate Uganda",
    text: "TechTower's team transformed our vision into a stunning, functional platform. Their dedication and expertise are unmatched. We've seen a 200% increase in user engagement!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    name: "John B.",
    company: "CTO, Fintech Solutions Ltd.",
    text: "The mobile app TechTower developed for us is a masterpiece of engineering and design. It's robust, secure, and incredibly user-friendly. Our customer satisfaction is through the roof.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    name: "Aisha K.",
    company: "Founder, E-commerce Hub Africa",
    text: "Working with TechTower was a breeze. They understood our complex e-commerce needs and delivered a scalable solution that has significantly boosted our sales and operational efficiency.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  }
];

const TestimonialsSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  return (
    <section className="next-section-padding bg-background">
      <div className="next-container">
        <motion.div
          className="text-left mb-16 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Client stories</span>
          <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-foreground mt-3">
            Trusted by product leaders and innovators.
          </h2>
          <p className="text-lg text-muted-foreground text-balance">
            Hear how teams are growing faster with TechTower on their side.
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="next-card flex flex-col"
              variants={itemVariants}
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-muted-foreground mb-6 italic text-base flex-grow">"{testimonial.text}"</p>
              <div className="flex items-center mt-auto">
                <img alt={`${testimonial.name} avatar`} className="w-10 h-10 rounded-full mr-3 object-cover" src={testimonial.avatar} />
                <div>
                  <div className="font-semibold text-foreground text-sm">{testimonial.name}</div>
                  <div className="text-xs text-muted-foreground">{testimonial.company}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
