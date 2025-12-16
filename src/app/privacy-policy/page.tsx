
import type { Metadata } from 'next';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Privacy Policy | Avira Hub',
    description: 'Learn how Avira Hub collects, uses, and protects your personal information. Your privacy is our priority.',
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "December 8, 2025";

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-16">
        <section className="py-16 sm:py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-center">Privacy Policy</h1>
              <p className="mt-4 text-center text-muted-foreground">Last Updated: {lastUpdated}</p>

              <div className="mt-12 space-y-8 text-muted-foreground prose prose-invert prose-lg max-w-none">
                <section id="introduction">
                    <h2 className="text-2xl font-semibold text-foreground">1. Introduction</h2>
                    <p>Welcome to Avira Hub. We are committed to protecting your privacy and handling your data in an open and transparent manner. This privacy policy explains how we collect, use, share, and protect your personal information when you visit our website.</p>
                </section>

                <section id="information-we-collect">
                    <h2 className="text-2xl font-semibold text-foreground">2. Information We Collect</h2>
                    <p>We may collect the following types of information:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li><strong>Personal Identification Information:</strong> Name, email address, phone number, etc., which you voluntarily provide to us through our contact forms or other direct interactions.</li>
                        <li><strong>Non-Personal Information:</strong> We may collect non-personal information about your visit, such as your IP address, browser type, operating system, and browsing behavior, through tools like Google Analytics.</li>
                    </ul>
                </section>

                <section id="how-we-use-your-information">
                    <h2 className="text-2xl font-semibold text-foreground">3. How We Use Your Information</h2>
                    <p>Your information is used for the following purposes:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>To respond to your inquiries and provide the services you have requested.</li>
                        <li>To improve our website and services by analyzing how you use them.</li>
                        <li>To send you marketing communications, if you have opted in to receive them.</li>
                        <li>To comply with legal obligations and protect our legal rights.</li>
                    </ul>
                </section>

                <section id="sharing-of-information">
                    <h2 className="text-2xl font-semibold text-foreground">4. Sharing of Information</h2>
                    <p>We do not sell, trade, or rent your personal identification information to others. We may share your information with trusted third-party service providers who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential. We may also release information when its release is appropriate to comply with the law, enforce our site policies, or protect ours or others' rights, property, or safety.</p>
                </section>

                <section id="cookies">
                    <h2 className="text-2xl font-semibold text-foreground">5. Cookies</h2>
                    <p>Our website may use "cookies" to enhance your experience. A cookie is a small file placed on your device. You may choose to set your web browser to refuse cookies or to alert you when cookies are being sent. If you do so, note that some parts of the site may not function properly. We use cookies for analytics and to understand user behavior to improve our services.</p>
                </section>

                <section id="data-security">
                    <h2 className="text-2xl font-semibold text-foreground">6. Data Security</h2>
                    <p>We adopt appropriate data collection, storage, and processing practices and security measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal information stored on our site. While we strive to use commercially acceptable means to protect your Personal Information, we cannot guarantee its absolute security.</p>
                </section>

                <section id="third-party-links">
                    <h2 className="text-2xl font-semibold text-foreground">7. Third-Party Links</h2>
                    <p>Our website may contain links to other websites that are not operated by us. If you click on a third-party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.</p>
                </section>
                
                <section id="childrens-privacy">
                    <h2 className="text-2xl font-semibold text-foreground">8. Children’s Privacy</h2>
                    <p>Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from children under 13. If you are a parent or guardian and you are aware that your child has provided us with Personal Information, please contact us. If we become aware that we have collected Personal Information from a child under age 13 without verification of parental consent, we take steps to remove that information from our servers.</p>
                </section>

                <section id="changes-to-this-policy">
                    <h2 className="text-2xl font-semibold text-foreground">9. Changes to This Policy</h2>
                    <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p>
                </section>

                <section id="contact-information">
                    <h2 className="text-2xl font-semibold text-foreground">10. Contact Information</h2>
                    <p>If you have any questions about this Privacy Policy, please contact us:</p>
                    <ul className="list-none pl-0 space-y-2">
                        <li>By email: <a href="mailto:contact@avirahub.in" className="text-primary hover:underline">contact@avirahub.in</a></li>
                        <li>By visiting this page on our website: <Link href="/contact" className="text-primary hover:underline">avirahub.in/contact</Link></li>
                        <li>By phone number: +91 9137315368</li>
                    </ul>
                </section>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
