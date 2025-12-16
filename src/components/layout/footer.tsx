
import { Github, Linkedin, Twitter, Youtube } from 'lucide-react';
import Link from 'next/link';
import connectToDatabase from '@/lib/mongodb';
import CMS from '@/models/CMS';

async function getFooterData() {
  try {
    await connectToDatabase();
    const data = await CMS.findOne({ section: 'footer' }).lean();
    return data;
  } catch (error) {
    console.error('Failed to fetch footer data', error);
    return null;
  }
}

export default async function Footer() {
  const data = await getFooterData();
  const year = new Date().getFullYear();

  const footerText = data?.footerText || `© ${year} Avira Hub. All rights reserved.`;
  const copyright = data?.copyrightText || footerText;

  const socialLinks = data?.socialLinks || {};

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
            <p className="text-sm text-muted-foreground">{copyright}</p>
            <Link href="/privacy-policy" className="text-sm text-muted-foreground hover:text-foreground relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-center after:scale-x-0 after:bg-primary after:transition-transform hover:after:scale-x-100">
              Privacy Policy
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {socialLinks.twitter && (
              <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors"><Twitter className="h-5 w-5 transition-transform hover:scale-125" /></a>
            )}
            {socialLinks.linkedin && (
              <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors"><Linkedin className="h-5 w-5 transition-transform hover:scale-125" /></a>
            )}
            {socialLinks.instagram && (
              // Lucide doesn't have Instagram by default? Check if it does, if not skip or use another icon. 
              // Actually Lucide React usually has Instagram. Let's assume it does, but I only imported Github, Linkedin, Twitter above.
              // I need to update imports.
              <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                {/* Fallback to text if Icon missing or just use generic */}
                <span>IG</span>
              </a>
            )}
            {socialLinks.youtube && (
              <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors"><Youtube className="h-5 w-5 transition-transform hover:scale-125" /></a>
            )}
          </div>
        </div>
        {data?.footerText && (
          <div className="mt-4 text-center text-xs text-muted-foreground">
            {data.footerText}
          </div>
        )}
      </div>
    </footer>
  );
}
