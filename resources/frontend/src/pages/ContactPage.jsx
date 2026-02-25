
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Mail, Phone, MapPin, MessageSquare, Send, Building, Clock } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const ContactPage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#get-quote') {
      const formElement = document.getElementById('contact-form-section');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. We'll get back to you within 24 business hours.",
      className: "bg-primary text-primary-foreground border-primary",
    });
    e.target.reset();
  };

  const fadeInProps = (delay = 0, x = 0, y = 0) => ({
    initial: { opacity: 0, x, y },
    whileInView: { opacity: 1, x: 0, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.6, delay }
  });

  const contactDetails = [
    { icon: Mail, title: "Email Us", content: "info@techtowerinc.com", href: "mailto:info@techtowerinc.com", aria: "Email TechTower Innovations" },
    { icon: Phone, title: "Call Us", content: "+256 703 283 529", href: "tel:+256703283529", aria: "Call TechTower Innovations" },
    { icon: MessageSquare, title: "WhatsApp", content: "Chat with us", href: "https://wa.me/256703283529", aria: "Message TechTower on WhatsApp" },
    { icon: Building, title: "Our Office", content: "Innovation Hub, Kampala, Uganda", href: "https://maps.google.com/?q=Innovation+Hub,+Kampala,+Uganda", aria: "View TechTower office location" },
    { icon: Clock, title: "Business Hours", content: "Mon - Fri, 9 AM - 5 PM (EAT)", aria: "TechTower business hours" },
  ];

  return (
    <div className="bg-background text-foreground pt-24 md:pt-32 pb-16">
      <header className="next-container next-section-padding text-center">
        <motion.div {...fadeInProps(0, 0, 20)} className="max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground border border-border/60 rounded-full mb-4">
            Connect With Us
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight mb-6 text-balance">
            Let’s build something remarkable together.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground text-balance">
            Have a project in mind, a question, or want to explore ideas? Our team is ready to help.
          </p>
        </motion.div>
      </header>

      <section id="contact-form-section" className="next-section-padding pt-0">
        <div className="next-container">
          <div className="grid lg:grid-cols-5 gap-8 md:gap-12 items-start">
            <motion.div 
              className="lg:col-span-2 space-y-6"
              {...fadeInProps(0.2, -20, 0)}
            >
              <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Information</h2>
              {contactDetails.map((item, index) => (
                <div key={index} className="flex items-start p-4 next-card hover:shadow-primary/10">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-md flex items-center justify-center mr-4">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-md font-semibold text-foreground mb-0.5">{item.title}</h3>
                    {item.href ? (
                       <a href={item.href} target={item.href.startsWith('http') || item.href.startsWith('mailto') || item.href.startsWith('tel') ? "_blank" : "_self"} rel="noopener noreferrer" aria-label={item.aria} className="text-sm text-muted-foreground hover:text-primary transition-colors break-all">
                        {item.content}
                      </a>
                    ) : (
                      <p className="text-sm text-muted-foreground break-all">{item.content}</p>
                    )}
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div 
              className="lg:col-span-3"
              {...fadeInProps(0.4, 20, 0)}
            >
              <form onSubmit={handleContactSubmit} className="next-card p-6 md:p-8">
                <h2 className="text-2xl font-semibold text-foreground mb-6">Send Us a Message or Request a Quote</h2>
                <div className="grid sm:grid-cols-2 gap-x-6 gap-y-5 mb-5">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-muted-foreground mb-1.5">First Name</label>
                    <input type="text" id="firstName" name="firstName" className="next-input" placeholder="e.g. Jjuuko" required aria-label="First Name" />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-muted-foreground mb-1.5">Last Name</label>
                    <input type="text" id="lastName" name="lastName" className="next-input" placeholder="e.g. Ronald" required aria-label="Last Name" />
                  </div>
                </div>
                <div className="mb-5">
                  <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-1.5">Email Address</label>
                  <input type="email" id="email" name="email" className="next-input" placeholder="you@example.com" required aria-label="Email Address"/>
                </div>
                <div className="mb-5">
                  <label htmlFor="subject" className="block text-sm font-medium text-muted-foreground mb-1.5">Subject / Service Interested In</label>
                  <input type="text" id="subject" name="subject" className="next-input" placeholder="e.g., Web Development Quote, AI Consultation" required aria-label="Subject or Service Interested In" />
                </div>
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-1.5">Your Message / Project Details</label>
                  <textarea id="message" name="message" rows={5} className="next-input min-h-[120px]" placeholder="Tell us about your project, requirements, or any questions you have..." required aria-label="Your Message or Project Details"></textarea>
                </div>
                <Button type="submit" size="lg" className="w-full next-button">
                  Send Message / Get Quote <Send className="ml-2 w-4 h-4" />
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

   <section className="next-section-padding">
  <div className="next-container text-center py-12">
    <motion.div {...fadeInProps(0.2)} className="max-w-2xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary">Follow us on Social Media</h2>
      <p className="text-muted-foreground mb-6">Stay connected and get the latest updates from TechTower Innovations.</p>

      <div className="flex justify-center space-x-6">
        <a href="https://whatsapp.com/channel/0029Vb7pYve9WtC3fDl7KJ0K" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
          className="text-primary hover:text-blue-600 transition">
          <i className="fab fa-whatsapp fa-2x"></i>
        </a>


        <a href="https://facebook.com/techtowerug" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
          className="text-primary hover:text-blue-600 transition">
          <i className="fab fa-facebook fa-2x"></i>
        </a>
        <a href="https://twitter.com/techtowerug" target="_blank" rel="noopener noreferrer" aria-label="Twitter"
          className="text-primary hover:text-sky-500 transition">
          <i className="fab fa-x-twitter fa-2x"></i>
        </a>
        <a href="https://instagram.com/techtowerug" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
          className="text-primary hover:text-pink-500 transition">
          <i className="fab fa-instagram fa-2x"></i>
        </a>
        <a href="https://linkedin.com/company/techtowerug" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
          className="text-primary hover:text-blue-700 transition">
          <i className="fab fa-linkedin fa-2x"></i>
        </a>
        <a href="https://youtube.com/@techtowerug" target="_blank" rel="noopener noreferrer" aria-label="YouTube"
          className="text-primary hover:text-red-600 transition">
          <i className="fab fa-youtube fa-2x"></i>
        </a>
      </div>
    </motion.div>
  </div>
</section>

    </div>
  );
};

export default ContactPage;
