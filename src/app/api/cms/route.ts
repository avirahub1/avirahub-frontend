
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectToDatabase from '@/lib/mongodb';
import CMS from '@/models/CMS';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const section = searchParams.get('section');

        await connectToDatabase();

        if (section) {
            const data = await CMS.findOne({ section });
            return NextResponse.json(data || {});
        }

        const allData = await CMS.find({});
        return NextResponse.json(allData);
    } catch (error) {
        console.error('Error fetching CMS content:', error);
        return NextResponse.json(
            { error: 'Failed to fetch content' },
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {
    return PUT(req);
}

export async function PUT(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if ((session?.user as any)?.role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const { section, ...data } = body;

        if (!section) {
            return NextResponse.json(
                { error: 'Section is required' },
                { status: 400 }
            );
        }

        await connectToDatabase();

        // Upsert the section content
        const updated = await CMS.findOneAndUpdate(
            { section },
            { $set: data },
            { new: true, upsert: true }
        );

        return NextResponse.json(updated);
    } catch (error) {
        console.error('Error updating CMS content:', error);
        return NextResponse.json(
            { error: 'Failed to update content' },
            { status: 500 }
        );
    }
}
