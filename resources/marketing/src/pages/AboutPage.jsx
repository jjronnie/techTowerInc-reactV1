import React from 'react';
import { motion } from 'framer-motion';
import { Users, Award, Zap, Target, Eye, Code, Lightbulb, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useSiteSettings } from '@/context/SiteSettingsContext';
import Seo from '@/components/Seo';

const AboutPage = () => {
  const { settings } = useSiteSettings();
  const header = settings?.about_header || {};
  const story = settings?.about_story || {};
  const principles = settings?.about_principles || {};
  const cards = settings?.about_cards?.items || [];
  const team = settings?.about_team || {};
  const cta = settings?.about_cta || {};

  const storyParagraphs = (story.body_paragraphs || []).map((paragraph) => paragraph.text || paragraph);
  const teamMembers = team.members || [];

  const iconMap = {
    lightbulb: Lightbulb,
    users: Users,
    award: Award,
    target: Target,
    eye: Eye,
    code: Code,
    briefcase: Briefcase,
    zap: Zap,
  };

  const fadeInProps = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.6, delay }
  });

  return (
    <div className="bg-background text-foreground pt-24 md:pt-32 pb-16">
      <Seo
        title={header.headline || 'About'}
        description={header.subheadline}
      />
      <header className="next-container next-section-padding text-center">
        <motion.div {...fadeInProps()} className="max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground border border-border/60 rounded-full mb-4">
            {header.badge_text || 'Our Story'}
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight mb-6 text-balance">
            {header.headline || 'Pioneering digital solutions in Africa.'}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground text-balance">
            {header.subheadline || 'TechTower Innovations is a Kireka Namugongo Road, Kampala-based software development company dedicated to crafting exceptional digital experiences that drive progress and empower businesses across the continent and beyond.'}
          </p>
        </motion.div>
      </header>

      <section className="next-section-padding">
        <div className="next-container">
          <motion.div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center" {...fadeInProps(0.2)}>
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl font-bold mb-6 text-foreground">{story.heading || 'From Vision to Reality'}</h2>
              {storyParagraphs.length ? (
                storyParagraphs.map((paragraph, index) => (
                  <p key={index} className={`text-muted-foreground text-lg ${index === storyParagraphs.length - 1 ? 'mb-6' : 'mb-4'}`}>
                    {paragraph}
                  </p>
                ))
              ) : (
                <>
                  <p className="text-muted-foreground mb-4 text-lg">
                    Founded with a passion for technology and a commitment to innovation, TechTower Innovations began as a collective of bright minds aiming to solve complex challenges with elegant software solutions. Our journey is fueled by a desire to not just meet client expectations, but to exceed them, fostering growth and digital transformation.
                  </p>
                  <p className="text-muted-foreground text-lg mb-6">
                    We believe in the power of collaboration, working closely with our clients to understand their unique needs and co-create solutions that deliver tangible results. Our Ugandan roots provide us with a unique perspective, allowing us to build technology that is both globally competitive and locally relevant.
                  </p>
                </>
              )}
              <Button asChild className="next-button">
                <Link to={story.cta_href || '/contact'}>{story.cta_label || 'Partner With Us'}</Link>
              </Button>
            </div>
            <div className="order-1 lg:order-2 aspect-video lg:aspect-square rounded-xl overflow-hidden shadow-2xl">
              <img
                alt={story.image_alt || 'Modern office space in Kireka Namugongo Road, Kampala, Uganda with a diverse team of TechTower software developers collaborating'}
                className="w-full h-full object-cover"
                src={story.image_url || 'https://images.unsplash.com/photo-1637622124152-33adfabcc923'}
              />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="next-section-padding bg-secondary/30 dark:bg-secondary/10">
        <div className="next-container">
          <motion.div className="text-center mb-12 md:mb-16" {...fadeInProps()}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">{principles.section_heading || 'Our Guiding Principles'}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
              {principles.section_subheading || 'These values are the bedrock of our company culture and the driving force behind our success.'}
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {(principles.items || []).map((value, index) => {
              const Icon = iconMap[value.icon_key] || Lightbulb;
              return (
                <motion.div 
                  key={index}
                  className="next-card text-center p-8"
                  {...fadeInProps(0.1 * index)}
                >
                  <div className="inline-block p-3 bg-primary/10 rounded-full mb-5"><Icon className="w-8 h-8 text-primary" /></div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
      
      <section className="next-section-padding">
        <div className="next-container">
          <div className="grid lg:grid-cols-3 gap-8 mb-12 md:mb-16">
            {cards.map((card, index) => {
              const Icon = iconMap[card.icon_key] || Code;
              return (
                <motion.div className="next-card p-8" {...fadeInProps(0.1 * index)} key={index}>
                  <Icon className="w-10 h-10 text-primary mb-4" />
                  <h3 className="text-2xl font-semibold text-foreground mb-3">{card.title}</h3>
                  <p className="text-muted-foreground">{card.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="team" className="next-section-padding bg-secondary/30 dark:bg-secondary/10">
        <div className="next-container">
          <motion.div className="text-center mb-12 md:mb-16" {...fadeInProps()}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">{team.section_heading || 'Meet Our Leadership'}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
              {team.section_subheading || "The driving force behind TechTower's innovation and success."}
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div 
                key={index}
                className="next-card text-center p-6"
                {...fadeInProps(0.1 * index)}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="w-32 h-32 mx-auto mb-5 rounded-full overflow-hidden border-2 border-primary/50 shadow-lg">
                  <img  alt={member.image_alt || member.name} className="w-full h-full object-cover" src={member.image_url || 'https://images.unsplash.com/photo-1603991414220-51b87b89a371'} />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{member.name}</h3>
                <p className="text-sm text-primary mb-2">{member.role}</p>
                <p className="text-muted-foreground text-xs">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="next-section-padding">
        <div className="next-container text-center">
            <motion.div {...fadeInProps()}>
                <Briefcase className="w-12 h-12 text-primary mx-auto mb-6" />
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                    {cta.heading || 'Join Us on Our Journey'}
                </h2>
                <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10 text-balance">
                    {cta.body || "Whether you're looking to build the next big thing, scale your operations, or innovate within your industry, TechTower is here to help."}
                </p>
                <Button size="lg" asChild className="next-button">
                    <Link to={cta.cta_href || '/contact'}>{cta.cta_label || "Let's Build Together"}</Link>
                </Button>
            </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
