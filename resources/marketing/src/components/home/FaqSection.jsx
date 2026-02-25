import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useSiteSettings } from '@/context/SiteSettingsContext';

const FaqSection = () => {
  const { settings } = useSiteSettings();
  const faqConfig = settings?.home_faqs || {};
  const faqs = faqConfig.items?.length ? faqConfig.items : [];
  return (
    <section className="next-section-padding bg-background">
      <div className="next-container">
        <motion.div
          className="next-card p-8 md:p-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col items-center text-center mb-10">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              {faqConfig.label || 'Frequently Asked Questions'}
            </span>
            <p className="text-lg text-muted-foreground mt-3 max-w-2xl">
              {faqConfig.subheading || 'Everything teams ask before starting a new build with TechTower.'}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {faqs.map((faq) => (
              <details key={faq.question} className="group border-b border-white/10 pb-4">
                <summary className="faq-summary flex items-center justify-between cursor-pointer text-sm font-semibold text-foreground">
                  {faq.question}
                  <span className="h-8 w-8 rounded-full border border-white/10 flex items-center justify-center text-muted-foreground transition group-open:rotate-45">
                    <Plus className="h-4 w-4" />
                  </span>
                </summary>
                <div className="faq-content">
                  <div className="faq-content-inner">
                    <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                      {faq.answer || faq.text}
                    </p>
                  </div>
                </div>
              </details>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FaqSection;
