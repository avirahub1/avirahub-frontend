

import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import HomeClient from '@/app/home-client';

export const dynamic = 'force-static';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <HomeClient />
      </main>
      <Footer />
    </div>
  );
}


