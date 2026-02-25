
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, FileText } from 'lucide-react';

const PrivacyPolicyPage = () => {
  const fadeInProps = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.6, delay }
  });

  return (
    <div className="bg-background text-foreground pt-24 md:pt-32 pb-16">
      <header className="next-container next-section-padding text-center">
        <motion.div {...fadeInProps()}>
          <div className="inline-block p-3 bg-primary/10 rounded-full mb-6">
            <Shield className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter mb-6 text-balance">
            Privacy <span className="text-primary">Policy</span>
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground text-balance">
            Your privacy is important to us. This policy outlines how TechTower Innovations Inc. collects, uses, and protects your personal information.
          </p>
          <p className="text-sm text-muted-foreground mt-4">Last Updated: July 7, 2025</p>
        </motion.div>
      </header>

      <section className="next-section-padding pt-0">
        <div className="next-container max-w-3xl mx-auto">
          <motion.div 
            {...fadeInProps(0.2)} 
            className="prose dark:prose-invert prose-base max-w-none text-foreground prose-headings:text-foreground prose-headings:font-semibold prose-a:text-primary hover:prose-a:text-primary/80 prose-strong:text-foreground"
          >
            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Introduction</h2>
            <p>TechTower Innovations Inc. ("we", "us", "our") is committed to protecting the privacy of individuals who visit our website ("Visitors"), who register to use our services ("Customers"), or who apply for a job at TechTower Innovations ("Applicants"). This Privacy Policy describes our privacy practices in relation to the use of our website and the related applications and services offered by us (collectively, the "Services").</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">2. Information We Collect</h2>
            <h3 className="text-xl font-semibold mt-6 mb-3">2.1. Information You Provide to Us:</h3>
            <ul className="list-disc list-inside space-y-1 mb-4">
              <li><strong>Contact Information:</strong> When you express an interest in obtaining additional information about the Services or register to use the Services, we may require you to provide personal contact information, such as name, company name, address, phone number, and email address.</li>
              <li><strong>Billing Information:</strong> When purchasing Services, we may require you to provide financial qualification and billing information, such as billing name and address, credit card number, and the number of employees within the organization that will be using the Services.</li>
              <li><strong>Applicant Information:</strong> When you apply for a job with us, we may collect information such as your resume, cover letter, employment history, and education.</li>
            </ul>
            <h3 className="text-xl font-semibold mt-6 mb-3">2.2. Information We Collect Automatically:</h3>
            <ul className="list-disc list-inside space-y-1 mb-4">
              <li><strong>Log Data:</strong> Like most websites, we gather certain information automatically. This information may include Internet Protocol (IP) addresses, browser type, Internet Service Provider (ISP), referring/exit pages, the files viewed on our site (e.g., HTML pages, graphics, etc.), operating system, date/time stamp, and/or clickstream data to analyze trends in the aggregate and administer the site.</li>
              <li><strong>Cookies and Similar Technologies:</strong> We use cookies and similar tracking technologies to track activity on our Services and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Services.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">3. How We Use Your Information</h2>
            <p>We use the information we collect in the following ways:</p>
            <ul className="list-disc list-inside space-y-1 mb-4">
              <li>To provide, operate, and maintain our Services.</li>
              <li>To improve, personalize, and expand our Services.</li>
              <li>To understand and analyze how you use our Services.</li>
              <li>To develop new products, services, features, and functionality.</li>
              <li>To communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the Service, and for marketing and promotional purposes (where permitted by law).</li>
              <li>To process your transactions and for billing purposes.</li>
              <li>To review your job application.</li>
              <li>For compliance purposes, including enforcing our Terms of Service, or other legal rights, or as may be required by applicable laws and regulations or requested by any judicial process or governmental agency.</li>
              <li>To prevent fraud and ensure the security of our Services.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">4. How We Share Your Information</h2>
            <p>We may share your personal information in the following situations:</p>
            <ul className="list-disc list-inside space-y-1 mb-4">
              <li><strong>With Service Providers:</strong> We may share your personal information with third-party service providers to monitor and analyze the use of our Service, for payment processing, or to otherwise help us operate our business.</li>
              <li><strong>For Business Transfers:</strong> We may share or transfer your personal information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
              <li><strong>With Affiliates:</strong> We may share your information with our affiliates, in which case we will require those affiliates to honor this Privacy Policy.</li>
              <li><strong>With Your Consent:</strong> We may disclose your personal information for any other purpose with your consent.</li>
              <li><strong>For Legal Reasons:</strong> We may disclose your information if we believe it's necessary to comply with a legal obligation, protect our rights or property, prevent or investigate possible wrongdoing in connection with the Services, protect the personal safety of users of the Services or the public, or protect against legal liability.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">5. Data Retention</h2>
            <p>We will retain your personal information only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your information to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">6. Security of Your Information</h2>
            <p>The security of your personal information is important to us. We use commercially acceptable means to protect your personal information but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use appropriate technical and organizational measures to protect your personal information, we cannot guarantee its absolute security.</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">7. Your Data Protection Rights</h2>
            <p>Depending on your location, you may have the following rights regarding your personal information:</p>
            <ul className="list-disc list-inside space-y-1 mb-4">
              <li>The right to access – You have the right to request copies of your personal data.</li>
              <li>The right to rectification – You have the right to request that we correct any information you believe is inaccurate or complete information you believe is incomplete.</li>
              <li>The right to erasure – You have the right to request that we erase your personal data, under certain conditions.</li>
              <li>The right to restrict processing – You have the right to request that we restrict the processing of your personal data, under certain conditions.</li>
              <li>The right to object to processing – You have the right to object to our processing of your personal data, under certain conditions.</li>
              <li>The right to data portability – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</li>
            </ul>
            <p>If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us at <a href="mailto:info@techtowerinc.com">info@techtowerinc.com</a>.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">8. Children's Privacy</h2>
            <p>Our Services are not intended for use by children under the age of 13. We do not knowingly collect personally identifiable information from children under 13. If you become aware that a child has provided us with Personal Data, please contact us. If we become aware that we have collected Personal Data from children without verification of parental consent, we take steps to remove that information from our servers.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">9. Changes to This Privacy Policy</h2>
            <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">10. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us:</p>
            <ul className="list-none space-y-1">
              <li>By email: <a href="mailto:info@techtowerinc.com">info@techtowerinc.com</a></li>
              <li>By phone: +256 703 283 529</li>
              <li>By mail: TechTower Innovations Inc., Kireka Namugongo Road, Kampala, Uganda. P.O BOX 118290.</li>
            </ul>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicyPage;
