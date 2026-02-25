import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, CalendarDays, UserCircle } from 'lucide-react';

const BlogPage = () => {
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    fetch('https://thetechtower.com/wp-json/wp/v2/posts?per_page=6&_embed')
      .then(response => response.json())
      .then(data => {
        const formattedPosts = data.map(post => ({
          slug: post.slug,
          title: post.title.rendered,
          date: post.date,
          author: post._embedded?.author?.[0]?.name || 'Unknown Author',

          excerpt: post.excerpt.rendered
  .replace(/<[^>]+>/g, '')
  .split(' ')
  .slice(0, 20)
  .join(' ') + '...',



          category: post._embedded?.['wp:term']?.[0]?.[0]?.name || 'Uncategorized',
          image: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'https://images.unsplash.com/photo-1504983875-d3b163aba9e6',
          imageAlt: post.title.rendered
        }));
        setBlogPosts(formattedPosts);
      })
      .catch(error => console.error('Error fetching blog posts:', error));
  }, []);

  const fadeInProps = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.6, delay }
  });

  return (
    <div className="bg-background text-foreground pt-24 md:pt-32 pb-16">
      <header className="next-container next-section-padding text-center">
        <motion.div {...fadeInProps()} className="max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground border border-border/60 rounded-full mb-4">
            Tech Insights
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight mb-6 text-balance">
           Stories, insights, and engineering breakthroughs.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground text-balance">
            Fresh perspectives from <a href="https://thetechtower.com">TheTechTower</a> on building,
            scaling, and operating modern products.
          </p>
        </motion.div>
      </header>

      <section className="next-section-padding pt-0">
        <div className="next-container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.slug}
                className="next-card flex flex-col overflow-hidden group"
                {...fadeInProps(index * 0.1)}
              >
                <a href={`https://thetechtower.com/${post.slug}`} target="_blank" rel="noopener noreferrer" className="block aspect-video overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.imageAlt}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                </a>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="mb-4 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    <span>{post.category}</span>
                    <span>Insight</span>
                  </div>
                  <h2 className="text-xl font-semibold mb-3 text-foreground">
                    <a href={`https://thetechtower.com/${post.slug}`} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                      {post.title}
                    </a>
                  </h2>
                  <p className="text-muted-foreground text-sm mb-5 flex-grow">{post.excerpt}</p>
                  <div className="text-xs text-muted-foreground mt-auto flex items-center justify-between">
                    <div className="flex items-center">
                      <UserCircle className="w-3.5 h-3.5 mr-1.5" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center">
                      <CalendarDays className="w-3.5 h-3.5 mr-1.5" />
                      <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </time>
                    </div>
                  </div>
                  <Button asChild variant="link" className="p-0 h-auto text-sm mt-5 self-start text-primary">
                    <a href={`https://thetechtower.com/${post.slug}`} target="_blank" rel="noopener noreferrer">
                      Read More <ArrowRight className="ml-1 w-4 h-4" />
                    </a>
                  </Button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
