import React from 'react';
import { motion } from 'framer-motion';
import { Users, Award, Zap, Target, Eye, Code, MapPin, Building, Lightbulb, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const teamMembers = [
  { name: "Jjuuko Ronald", role: "CEO & Lead Innovator", imageAlt: "Portrait of Jjuuko Ronald, CEO of TechTower Innovations", description: "Driving TechTower's vision with passion and expertise in emerging technologies." },
  { name: "Sarah Nabukenya", role: "CTO", imageAlt: "Portrait of Sarah Nabukenya, CTO of TechTower Innovations", description: "Expert in scalable systems and cloud architecture, ensuring robust solutions." },
  { name: "David Mugisha", role: "Head of Product", imageAlt: "Portrait of David Mugisha, Head of Product at TechTower Innovations", description: "Leads product strategy with a keen eye for user experience and market needs." },
  { name: "Aisha Nakato", role: "Lead Engineer", imageAlt: "Portrait of Aisha Nakato, Lead Software Engineer at TechTower Innovations", description: "Specializes in full-stack development and agile methodologies." }
];

const AboutPage = () => {
  const fadeInProps = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.6, delay }
  });

  return (
    <div className="bg-background text-foreground pt-24 md:pt-32 pb-16">
      <header className="next-container next-section-padding text-center">
        <motion.div {...fadeInProps()} className="max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground border border-border/60 rounded-full mb-4">
            Our Story
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight mb-6 text-balance">
            Pioneering digital solutions in Africa.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground text-balance">
            TechTower Innovations is a Kampala-based software development company dedicated to crafting exceptional digital experiences that drive progress and empower businesses across the continent and beyond.
          </p>
        </motion.div>
      </header>

      <section className="next-section-padding">
        <div className="next-container">
          <motion.div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center" {...fadeInProps(0.2)}>
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl font-bold mb-6 text-foreground">From Vision to Reality</h2>
              <p className="text-muted-foreground mb-4 text-lg">
                Founded with a passion for technology and a commitment to innovation, TechTower Innovations began as a collective of bright minds aiming to solve complex challenges with elegant software solutions. Our journey is fueled by a desire to not just meet client expectations, but to exceed them, fostering growth and digital transformation.
              </p>
              <p className="text-muted-foreground text-lg mb-6">
                We believe in the power of collaboration, working closely with our clients to understand their unique needs and co-create solutions that deliver tangible results. Our Ugandan roots provide us with a unique perspective, allowing us to build technology that is both globally competitive and locally relevant.
              </p>
              <Button asChild className="next-button">
                <Link to="/contact">Partner With Us</Link>
              </Button>
            </div>
            <div className="order-1 lg:order-2 aspect-video lg:aspect-square rounded-xl overflow-hidden shadow-2xl">
              <img  alt="Modern office space in Kampala, Uganda with a diverse team of TechTower software developers collaborating" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1637622124152-33adfabcc923" />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="next-section-padding bg-secondary/30 dark:bg-secondary/10">
        <div className="next-container">
          <motion.div className="text-center mb-12 md:mb-16" {...fadeInProps()}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Our Guiding Principles</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
              These values are the bedrock of our company culture and the driving force behind our success.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Lightbulb className="w-8 h-8 text-primary" />, title: "Innovation First", description: "We constantly explore new technologies and creative approaches to deliver cutting-edge solutions." },
              { icon: <Users className="w-8 h-8 text-primary" />, title: "Client Success", description: "Your goals are our goals. We are dedicated to building partnerships that drive tangible business value." },
              { icon: <Award className="w-8 h-8 text-primary" />, title: "Unwavering Integrity", description: "We operate with transparency, honesty, and the highest ethical standards in all our interactions." }
            ].map((value, index) => (
              <motion.div 
                key={index}
                className="next-card text-center p-8"
                {...fadeInProps(0.1 * index)}
              >
                <div className="inline-block p-3 bg-primary/10 rounded-full mb-5">{value.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="next-section-padding">
        <div className="next-container">
          <div className="grid lg:grid-cols-3 gap-8 mb-12 md:mb-16">
            <motion.div className="next-card p-8" {...fadeInProps(0.1)}>
              <Target className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-2xl font-semibold text-foreground mb-3">Our Mission</h3>
              <p className="text-muted-foreground">To empower businesses with transformative technology, fostering innovation and sustainable growth across Africa and beyond.</p>
            </motion.div>
            <motion.div className="next-card p-8" {...fadeInProps(0.2)}>
              <Eye className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-2xl font-semibold text-foreground mb-3">Our Vision</h3>
              <p className="text-muted-foreground">To be the leading digital innovation partner, recognized for excellence, impact, and shaping the future of technology.</p>
            </motion.div>
            <motion.div className="next-card p-8" {...fadeInProps(0.3)}>
              <Code className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-2xl font-semibold text-foreground mb-3">Our Approach</h3>
              <p className="text-muted-foreground">We combine agile methodologies, user-centric design, and deep technical expertise to deliver solutions that are not just built right, but are the right build.</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="team" className="next-section-padding bg-secondary/30 dark:bg-secondary/10">
        <div className="next-container">
          <motion.div className="text-center mb-12 md:mb-16" {...fadeInProps()}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Meet Our Leadership</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
              The driving force behind TechTower's innovation and success.
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
                  <img  alt={member.imageAlt} className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1603991414220-51b87b89a371" />
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
                    Join Us on Our Journey
                </h2>
                <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10 text-balance">
                    Whether you're looking to build the next big thing, scale your operations, or innovate within your industry, TechTower is here to help.
                </p>
                <Button size="lg" asChild className="next-button">
                    <Link to="/contact">Let's Build Together</Link>
                </Button>
            </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
