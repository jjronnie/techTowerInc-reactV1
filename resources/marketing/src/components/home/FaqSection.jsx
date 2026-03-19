import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useSiteSettings } from '@marketing/context/SiteSettingsContext';

const FaqSection = () => {
  const { settings } = useSiteSettings();
  const faqConfig = settings?.home_faqs || {};
  const faqs = faqConfig.items?.length ? faqConfig.items : [];
  const [openIndex, setOpenIndex] = useState(-1);
  return (
    <section className="next-section-padding bg-background">
      <div className="next-container">
        <div className="next-card p-8 md:p-12">
          <div className="flex flex-col items-center text-center mb-10">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              {faqConfig.label || 'Frequently Asked Questions'}
            </span>
            <p className="text-lg text-muted-foreground mt-3 max-w-2xl">
              {faqConfig.subheading || 'Everything teams ask before starting a new build with TechTower.'}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {faqs.map((faq, index) => (
              <div
                key={faq.question}
                data-open={openIndex === index}
                className="faq-item border-b border-white/10 pb-4"
              >
                <button
                  type="button"
                  onClick={() =>
                    setOpenIndex((currentIndex) =>
                      currentIndex === index ? -1 : index
                    )
                  }
                  className="faq-summary flex w-full items-center justify-between text-left text-sm font-semibold text-foreground"
                >
                  <span>{faq.question}</span>
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-muted-foreground transition ${
                      openIndex === index ? 'rotate-45' : ''
                    }`}
                  >
                    <Plus className="h-4 w-4" />
                  </span>
                </button>
                <div className="faq-content">
                  <div className="faq-content-inner">
                    <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                      {faq.answer || faq.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
