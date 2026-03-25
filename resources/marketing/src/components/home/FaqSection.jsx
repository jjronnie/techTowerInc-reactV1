import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useSiteSettings } from '@marketing/context/SiteSettingsContext';
import { useReveal } from '@marketing/hooks/useReveal';

const FaqSection = () => {
    const { settings } = useSiteSettings();
    const faqConfig = settings?.home_faqs || {};
    const faqs = faqConfig.items?.length ? faqConfig.items : [];
    const [openIndex, setOpenIndex] = useState(-1);
    const headerRef = useReveal();

    return (
        <section className="next-section-padding bg-background">
            <div className="next-container">
                <div className="next-card p-8 md:p-12">
                    <div
                        ref={headerRef}
                        className="reveal mb-10 flex flex-col items-center text-center"
                    >
                        <span className="text-xs font-semibold tracking-[0.3em] text-muted-foreground uppercase">
                            {faqConfig.label || 'Frequently Asked Questions'}
                        </span>
                        <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
                            {faqConfig.subheading ||
                                'Everything teams ask before starting a new build with TechTower.'}
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        {faqs.map((faq, index) => {
                            const isOpen = openIndex === index;
                            return (
                                <FaqItem
                                    key={faq.question}
                                    faq={faq}
                                    index={index}
                                    isOpen={isOpen}
                                    setOpenIndex={setOpenIndex}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

const FaqItem = ({ faq, index, isOpen, setOpenIndex }) => {
    const ref = useReveal();

    return (
        <div
            ref={ref}
            className={`reveal reveal-delay-${(index % 6) + 1} border-b border-white/10 pb-4`}
        >
            <button
                type="button"
                onClick={() =>
                    setOpenIndex((current) => (current === index ? -1 : index))
                }
                className="flex w-full cursor-pointer items-center justify-between text-left text-sm font-semibold text-foreground"
            >
                <span>{faq.question}</span>
                <span
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-muted-foreground transition-transform duration-300"
                    style={{
                        transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                    }}
                >
                    <Plus className="h-4 w-4" />
                </span>
            </button>
            <div
                style={{
                    display: 'grid',
                    gridTemplateRows: isOpen ? '1fr' : '0fr',
                    transition: 'grid-template-rows 0.3s ease',
                    overflow: 'hidden',
                }}
            >
                <div style={{ overflow: 'hidden', minHeight: 0 }}>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {faq.answer || faq.text}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FaqSection;
