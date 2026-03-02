import React from 'react';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, CalendarDays, Tag, UserCircle, Facebook, Linkedin, Mail, Twitter, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApi } from '@/hooks/useApi';
import { useSiteSettings } from '@/context/SiteSettingsContext';
import Seo from '@/components/Seo';

const SinglePostPage = () => {
  const { slug } = useParams();
  const { settings } = useSiteSettings();
  const { data, loading, error } = useApi(slug ? `/posts/${slug}` : null, { skip: !slug });
  const post = data?.data;

  const fadeInProps = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.6, delay }
  });

  if (loading) {
    return (
      <div className="bg-background text-foreground pt-24 md:pt-32 pb-16">
        <div className="next-container space-y-6">
          <div className="shimmer h-4 w-32 rounded" />
          <div className="shimmer h-10 w-3/4 rounded" />
          <div className="flex flex-wrap gap-4 justify-center">
            <div className="shimmer h-4 w-28 rounded" />
            <div className="shimmer h-4 w-40 rounded" />
          </div>
          <div className="shimmer h-64 w-full rounded-lg" />
          <div className="space-y-3">
            <div className="shimmer h-4 w-full rounded" />
            <div className="shimmer h-4 w-5/6 rounded" />
            <div className="shimmer h-4 w-4/5 rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="next-container next-section-padding text-center">
        <h1 className="text-3xl font-bold">Post not found</h1>
        <p className="text-muted-foreground mt-4">The blog post you are looking for does not exist.</p>
        <Button asChild className="mt-8">
          <Link to="/blog">Back to Blog</Link>
        </Button>
      </div>
    );
  }

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const siteName = settings?.site_name || 'TechTower Innovations';
  const shareText = `Check out this article from ${siteName}: ${post.title}`;
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedText = encodeURIComponent(shareText);

  const socialLinks = [
    {
      label: 'Share on X',
      href: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      icon: Twitter,
    },
    {
      label: 'Share on Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: Facebook,
    },
    {
      label: 'Share on LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: Linkedin,
    },
    {
      label: 'Share by email',
      href: `mailto:?subject=${encodedText}&body=${encodedUrl}`,
      icon: Mail,
    },
  ];

  const handleCopyLink = async () => {
    if (!shareUrl) {
      return;
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
      alert('Link copied to clipboard.');
    } catch (error) {
      console.error('Error copying link:', error);
      alert('Unable to copy link. Please copy it manually.');
    }
  };

  const categories = post.categories?.length ? post.categories : (post.category ? [post.category] : []);
  const primaryCategory = categories[0] || null;
  const ogImage = post.seo?.og_image_url || post.featured_image_url;
  const metaDescription = post.seo?.description || post.excerpt || '';

  return (
    <div className="bg-background text-foreground pt-24 md:pt-32 pb-16">
      <div className="next-container">
        <Seo
          title={post.seo?.title || post.title}
          description={metaDescription}
          image={ogImage}
          canonical={post.seo?.canonical_url}
          robots={post.seo?.robots}
          keywords={post.seo?.keywords}
          type="article"
        />
        <motion.div {...fadeInProps()} className="mb-8">
          <Button variant="ghost" asChild className="text-sm text-muted-foreground hover:text-primary">
            <Link to="/blog"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog</Link>
          </Button>
        </motion.div>

        <article>
          <header className="mb-12 text-center">
            <motion.div {...fadeInProps(0.1)}>
              {primaryCategory && (
                <Link to={`/blog?category=${primaryCategory.toLowerCase().replace(/\s+/g, '-')}`} className="inline-block px-3 py-1 text-xs font-semibold text-primary bg-primary/10 rounded-full mb-4 uppercase tracking-wider">
                  {primaryCategory}
                </Link>
              )}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6 text-foreground text-balance">{post.title}</h1>
              <div className="flex flex-wrap justify-center items-center text-sm text-muted-foreground space-x-4">
                <div className="flex items-center">
                  <UserCircle className="w-4 h-4 mr-1.5" />
                  <span>{post.author_name || 'TechTower'}</span>
                </div>
                {post.published_at && (
                  <div className="flex items-center">
                    <CalendarDays className="w-4 h-4 mr-1.5" />
                    <time dateTime={post.published_at}>{new Date(post.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                  </div>
                )}
              </div>
            </motion.div>
          </header>

          <motion.div {...fadeInProps(0.2)} className="aspect-[16/9] md:aspect-[2/1] rounded-lg overflow-hidden mb-12 shadow-lg">
             <img  
                alt={post.image_alt || post.title} 
                className="w-full h-full object-cover"
                src={post.featured_image_url || 'https://images.unsplash.com/photo-1504983875-d3b163aba9e6'} />
          </motion.div>

          <motion.div 
            {...fadeInProps(0.3)} 
            className="prose dark:prose-invert prose-lg max-w-none mx-auto text-foreground prose-headings:text-foreground prose-headings:font-semibold prose-a:text-primary hover:prose-a:text-primary/80 prose-strong:text-foreground prose-p:leading-relaxed prose-li:marker:text-muted-foreground prose-blockquote:border-l-primary/40 prose-blockquote:text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: post.content }} 
          />

          <motion.footer {...fadeInProps(0.4)} className="mt-12 pt-8 border-t border-border">
            <div className="flex flex-wrap items-center mb-6">
              <Tag className="w-5 h-5 mr-2 text-muted-foreground"/> 
              <span className="text-sm font-semibold mr-2 text-muted-foreground">Tags:</span>
              {(post.tags || []).map(tag => (
                <Link 
                  key={tag} 
                  to={`/blog?tag=${tag.toLowerCase().replace(/\s+/g, '-')}`} 
                  className="mr-2 mb-2 text-xs bg-secondary text-secondary-foreground px-3 py-1 rounded-full hover:bg-secondary/80 transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-3">
                <span className="text-sm font-semibold text-muted-foreground">Share:</span>
                <div className="flex flex-wrap gap-2">
                    {socialLinks.map((link) => {
                      const Icon = link.icon;
                      return (
                        <Button key={link.label} variant="outline" size="icon" asChild aria-label={link.label}>
                          <a href={link.href} target="_blank" rel="noopener noreferrer">
                            <Icon className="h-4 w-4" />
                          </a>
                        </Button>
                      );
                    })}
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleCopyLink}
                      aria-label="Copy link"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                </div>
            </div>
          </motion.footer>
        </article>
      </div>
    </div>
  );
};

export default SinglePostPage;
