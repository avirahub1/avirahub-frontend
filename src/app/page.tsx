
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import HomeClient from '@/app/home-client';
import connectToDatabase from '@/lib/mongodb';
import CMS from '@/models/CMS';
import { serializeData } from '@/lib/utils';

export const dynamic = 'force-dynamic';

async function getStatsData(): Promise<any> {
  try {
    await connectToDatabase();
    const data = await CMS.findOne({ section: 'about_stats' }).lean();
    return serializeData(data) || {};
  } catch (error) {
    return {};
  }
}

export default async function Home() {
  const statsData = await getStatsData();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <HomeClient statsData={statsData} />
      </main>
      <Footer />
    </div>
  );
}

