
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@marketing/components/ui/button';
import { ArrowRight, FileText, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSiteSettings } from '@marketing/context/SiteSettingsContext';

const CtaSection = () => {
  const { settings } = useSiteSettings();
  const cta = settings?.home_cta || {};
  return (
    <section className="next-section-padding bg-background">
      <div className="next-container">
        <motion.div
          className="next-card p-8 md:p-12 text-left overflow-hidden relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-full mb-6">
              <Zap className="w-7 h-7 text-foreground" />
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-foreground">
              {cta.heading || "Let's build your next flagship product."}
            </h2>
            <p className="text-lg text-muted-foreground mb-10 text-balance">
              {cta.body ||
                'Book a discovery call and get a tailored roadmap, timeline, and delivery plan from our product team.'}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild className="next-button rounded-full px-10">
                <Link to={cta.primary_cta_href || '/contact#get-quote'}>
                  {cta.primary_cta_label || 'Get a Quote'} <FileText className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="next-button-outline rounded-full px-10">
                <Link to={cta.secondary_cta_href || '/portfolio'}>
                  {cta.secondary_cta_label || 'View Projects'} <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;
