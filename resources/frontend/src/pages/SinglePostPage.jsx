
import React from 'react';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, CalendarDays, Tag, UserCircle, Share2, Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Dummy data - replace with actual data fetching
const blogPosts = {
  'the-future-of-web-development-in-uganda': {
    slug: 'the-future-of-web-development-in-uganda',
    title: 'The Future of Web Development in Uganda: Trends and Opportunities',
    date: '2025-05-28',
    author: 'Jjuuko Ronald, CEO',
    category: 'Web Development',
    imageAlt: 'Abstract representation of web development code and network connections for Uganda',
    tags: ['Uganda Tech', 'Web Trends', 'Innovation', 'Software Development'],
    content: `
      <p class="mb-6 text-lg">The landscape of web development in Uganda is undergoing a dynamic transformation, driven by increased internet penetration, a youthful tech-savvy population, and a growing digital economy. At TechTower Innovations, we are at the forefront of these changes, embracing new technologies and methodologies to deliver cutting-edge web solutions for our clients.</p>
      
      <h2 class="text-2xl font-semibold mt-8 mb-4 text-foreground">Key Trends Shaping the Future</h2>
      <ul class="list-disc list-inside space-y-2 mb-6 text-muted-foreground">
        <li><strong>Mobile-First Approach:</strong> With the majority of Ugandans accessing the internet via mobile devices, responsive and mobile-first design is no longer optional but a necessity. PWAs (Progressive Web Apps) are gaining traction for their native-like experience.</li>
        <li><strong>JavaScript Frameworks:</strong> React, Angular, and Vue.js continue to dominate the frontend landscape, enabling the creation of interactive and dynamic user interfaces. We specialize in leveraging these frameworks for optimal performance.</li>
        <li><strong>Headless CMS & Jamstack:</strong> The demand for faster, more secure, and scalable websites is driving the adoption of Headless CMS and Jamstack architectures. This approach decouples the frontend from the backend, offering greater flexibility.</li>
        <li><strong>AI and Machine Learning Integration:</strong> AI-powered chatbots, personalized user experiences, and data analytics are becoming increasingly integrated into web applications, providing significant value to businesses.</li>
        <li><strong>Cybersecurity Focus:</strong> As digital threats evolve, robust security measures, including SSL/TLS encryption, secure coding practices, and regular vulnerability assessments, are paramount.</li>
      </ul>

      <h2 class="text-2xl font-semibold mt-8 mb-4 text-foreground">Opportunities for Businesses and Developers</h2>
      <p class="mb-4 text-muted-foreground">For Ugandan businesses, these trends present immense opportunities to enhance their digital presence, reach wider audiences, and improve operational efficiency. Investing in modern web solutions can lead to increased customer engagement, higher conversion rates, and a stronger brand identity.</p>
      <p class="mb-6 text-muted-foreground">For developers, continuous learning and upskilling in these emerging technologies are crucial. The demand for skilled web developers in Uganda is on the rise, offering exciting career prospects in areas like full-stack development, UI/UX design, and DevOps.</p>

      <blockquote class="border-l-4 border-primary pl-4 italic my-8 text-muted-foreground">
        "Uganda's tech ecosystem is vibrant and full of potential. By embracing innovation and fostering local talent, we can build a truly digital-first nation." - Jjuuko Ronald, CEO
      </blockquote>
      
      <h2 class="text-2xl font-semibold mt-8 mb-4 text-foreground">TechTower's Role</h2>
      <p class="mb-6 text-muted-foreground">TechTower Innovations is committed to contributing to this growth by providing world-class web development services, nurturing local talent through internships and training, and partnering with businesses to help them navigate the digital landscape successfully. We believe that by building robust and innovative web solutions, we can empower Ugandan enterprises to compete on a global scale.</p>
      <p class="text-muted-foreground">Contact us today to discuss how we can help you leverage these trends for your next web project.</p>
    `
  },
  'ai-and-its-impact-on-african-businesses': {
    slug: 'ai-and-its-impact-on-african-businesses',
    title: 'AI and Its Impact on African Businesses: A TechTower Perspective',
    date: '2025-05-15',
    author: 'Sarah Nabukenya, CTO',
    category: 'Artificial Intelligence',
    imageAlt: 'Futuristic AI brain graphic with connecting nodes across African continent map',
    tags: ['AI in Africa', 'Business Technology', 'Machine Learning', 'Innovation'],
    content: `
      <p class="mb-6 text-lg">Artificial Intelligence (AI) is no longer a futuristic concept but a transformative force reshaping industries worldwide. Across Africa, businesses are increasingly recognizing the potential of AI to drive innovation, enhance efficiency, and create new avenues for growth. At TechTower Innovations, we are excited by the possibilities AI offers and are actively helping African enterprises harness its power.</p>

      <h2 class="text-2xl font-semibold mt-8 mb-4 text-foreground">How AI is Making a Difference in Africa</h2>
      <ul class="list-disc list-inside space-y-2 mb-6 text-muted-foreground">
        <li><strong>Agriculture (AgriTech):</strong> AI-powered solutions are optimizing crop yields through precision farming, disease detection, and market linkage platforms, crucial for a continent where agriculture is a major economic driver.</li>
        <li><strong>Healthcare (HealthTech):</strong> From diagnostic tools and telemedicine platforms to personalized treatment plans, AI is improving access to healthcare and its quality, especially in remote areas.</li>
        <li><strong>Financial Services (FinTech):</strong> AI algorithms are enhancing fraud detection, credit scoring, customer service through chatbots, and personalized financial advice, fostering financial inclusion.</li>
        <li><strong>Retail & E-commerce:</strong> AI-driven recommendation engines, supply chain optimization, and personalized marketing are transforming the customer experience and operational efficiency for African retailers.</li>
        <li><strong>Education (EdTech):</strong> Personalized learning paths, automated grading, and intelligent tutoring systems are making education more accessible and effective.</li>
      </ul>
      
      <h2 class="text-2xl font-semibold mt-8 mb-4 text-foreground">Challenges and Considerations</h2>
      <p class="mb-4 text-muted-foreground">While the potential is vast, adopting AI in Africa comes with its unique challenges, including data availability and quality, infrastructure limitations, skills gaps, and ethical considerations. It's crucial to develop AI solutions that are contextually relevant, inclusive, and address local needs responsibly.</p>
      
      <blockquote class="border-l-4 border-primary pl-4 italic my-8 text-muted-foreground">
        "AI offers an unprecedented opportunity for Africa to leapfrog developmental challenges. Our focus at TechTower is to build AI solutions that are ethical, impactful, and tailored to the African context." - Sarah Nabukenya, CTO
      </blockquote>

      <h2 class="text-2xl font-semibold mt-8 mb-4 text-foreground">TechTower's Approach to AI</h2>
      <p class="mb-6 text-muted-foreground">At TechTower Innovations, we work closely with businesses to identify strategic AI use cases, develop custom models, and integrate AI capabilities into existing systems. Our services include natural language processing, computer vision, predictive analytics, and machine learning model development. We are passionate about empowering African businesses with AI tools that drive real-world impact and sustainable growth.</p>
    `
  },
  // Add other posts similarly
};

const SinglePostPage = () => {
  const { slug } = useParams();
  const post = blogPosts[slug]; // In a real app, fetch this data

  const fadeInProps = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.6, delay }
  });

  if (!post) {
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

  const handleShare = () => {
    if(navigator.share) {
      navigator.share({
        title: post.title,
        text: `Check out this article from TechTower Innovations: ${post.title}`,
        url: window.location.href,
      })
      .catch(error => console.log('Error sharing:', error));
    } else {
      alert('Web Share API not supported in your browser. You can manually copy the URL.');
    }
  }

  const handlePrint = () => {
    window.print();
  }

  return (
    <div className="bg-background text-foreground pt-24 md:pt-32 pb-16">
      <div className="next-container">
        <motion.div {...fadeInProps()} className="mb-8">
          <Button variant="ghost" asChild className="text-sm text-muted-foreground hover:text-primary">
            <Link to="/blog"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog</Link>
          </Button>
        </motion.div>

        <article>
          <header className="mb-12 text-center">
            <motion.div {...fadeInProps(0.1)}>
              <Link to={`/blog?category=${post.category.toLowerCase().replace(/\s+/g, '-')}`} className="inline-block px-3 py-1 text-xs font-semibold text-primary bg-primary/10 rounded-full mb-4 uppercase tracking-wider">
                {post.category}
              </Link>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6 text-foreground text-balance">{post.title}</h1>
              <div className="flex flex-wrap justify-center items-center text-sm text-muted-foreground space-x-4">
                <div className="flex items-center">
                  <UserCircle className="w-4 h-4 mr-1.5" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center">
                  <CalendarDays className="w-4 h-4 mr-1.5" />
                  <time dateTime={post.date}>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                </div>
              </div>
            </motion.div>
          </header>

          <motion.div {...fadeInProps(0.2)} className="aspect-[16/9] md:aspect-[2/1] rounded-lg overflow-hidden mb-12 shadow-lg">
             <img  
                alt={post.imageAlt} 
                className="w-full h-full object-cover"
                src="https://images.unsplash.com/photo-1504983875-d3b163aba9e6" />
          </motion.div>

          <motion.div 
            {...fadeInProps(0.3)} 
            className="prose dark:prose-invert prose-lg max-w-none mx-auto text-foreground prose-headings:text-foreground prose-a:text-primary hover:prose-a:text-primary/80 prose-strong:text-foreground"
            dangerouslySetInnerHTML={{ __html: post.content }} 
          />

          <motion.footer {...fadeInProps(0.4)} className="mt-12 pt-8 border-t border-border">
            <div className="flex flex-wrap items-center mb-6">
              <Tag className="w-5 h-5 mr-2 text-muted-foreground"/> 
              <span className="text-sm font-semibold mr-2 text-muted-foreground">Tags:</span>
              {post.tags.map(tag => (
                <Link 
                  key={tag} 
                  to={`/blog?tag=${tag.toLowerCase().replace(/\s+/g, '-')}`} 
                  className="mr-2 mb-2 text-xs bg-secondary text-secondary-foreground px-3 py-1 rounded-full hover:bg-secondary/80 transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
            <div className="flex items-center space-x-3">
                <Button variant="outline" size="sm" onClick={handleShare} aria-label="Share this article">
                    <Share2 className="w-4 h-4 mr-2"/> Share
                </Button>
                <Button variant="outline" size="sm" onClick={handlePrint} aria-label="Print this article">
                    <Printer className="w-4 h-4 mr-2"/> Print
                </Button>
            </div>
          </motion.footer>
        </article>
      </div>
    </div>
  );
};

export default SinglePostPage;
