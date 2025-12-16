
import type { Metadata } from 'next';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { ContactForm } from '@/components/contact-form';
import { Mail, Phone, MapPin } from 'lucide-react';
import connectToDatabase from '@/lib/mongodb';
import CMS from '@/models/CMS';

export const metadata: Metadata = {
  title: 'Contact Us | Get a Free Web Design Quote | Avira Hub',
  description: 'Ready to start your project? Contact Avira Hub today for a free consultation and quote on our expert web design and development services.',
};

async function getContactData(): Promise<any> {
  try {
    await connectToDatabase();
    const data = await CMS.findOne({ section: 'contact' }).lean();
    return data || {};
  } catch (error) {
    return {};
  }
}

export const dynamic = 'force-dynamic';

export default async function ContactPage() {
  const data = await getContactData();

  const address = data.address || "123 Tech Avenue, Bangalore, India";
  const email = data.email || "contact@avirahub.in";
  const phone = data.phone || "+91 9137315368";
  const mapEmbed = data.googleMapEmbed; // If present, use it

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-16">
        <section className="py-16 sm:py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">Let's Build Something Extraordinary</h1>
              <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground">
                We're here to answer your questions, discuss your ideas, and help you get started on your digital journey.
              </p>
            </div>

            <div className="mt-12 sm:mt-16 grid md:grid-cols-2 gap-12 sm:gap-16 items-start">
              <div className="space-y-8">
                <h2 className="text-2xl sm:text-3xl font-bold">Get in Touch</h2>
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Our Office</h3>
                    <p className="text-foreground whitespace-pre-line">{address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Email Us</h3>
                    <p className="text-foreground">{email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Call Us</h3>
                    <p className="text-foreground">{phone}</p>
                  </div>
                </div>

                <div className="pt-4 sm:pt-8">
                  <h3 className="text-xl sm:text-2xl font-bold mb-4">Business Hours</h3>
                  <p className="text-foreground">Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p className="text-foreground">Saturday: 10:00 AM - 2:00 PM</p>
                  <p className="text-foreground">Sunday: Closed</p>
                </div>

                {mapEmbed && (
                  <div className="w-full h-64 mt-8 rounded-lg overflow-hidden border">
                    <iframe
                      src={mapEmbed}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                )}
              </div>

              <div>
                <ContactForm />
              </div>
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
