
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectToDatabase from '@/lib/mongodb';
import Pricing from '@/models/Pricing';

export async function GET(req: Request) {
    try {
        await connectToDatabase();

        // Check if it's an admin request to see all plans, otherwise only active
        const session = await getServerSession(authOptions);
        const isAdmin = (session?.user as any)?.role === 'admin';

        const filter = isAdmin ? {} : { status: 'active' };
        const pricingPlans = await Pricing.find(filter).sort({ createdAt: 1 });

        return NextResponse.json(pricingPlans);
    } catch (error) {
        console.error('Error fetching pricing plans:', error);
        return NextResponse.json(
            { error: 'Failed to fetch pricing plans' },
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if ((session?.user as any)?.role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const { title, price, features, popular, status } = body;

        if (!title || !price || !features) {
            return NextResponse.json(
                { error: 'Title, price, and features are required' },
                { status: 400 }
            );
        }

        await connectToDatabase();
        const newPricing = await Pricing.create({
            title,
            price,
            features,
            popular: popular || false,
            status: status || 'active',
        });

        return NextResponse.json(newPricing, { status: 201 });
    } catch (error) {
        console.error('Error creating pricing plan:', error);
        return NextResponse.json(
            { error: 'Failed to create pricing plan' },
            { status: 500 }
        );
    }
}

export async function PUT(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if ((session?.user as any)?.role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const { _id, ...updateData } = body;

        if (!_id) {
            return NextResponse.json(
                { error: 'Pricing ID is required' },
                { status: 400 }
            );
        }

        await connectToDatabase();
        const updatedPricing = await Pricing.findByIdAndUpdate(
            _id,
            { $set: updateData },
            { new: true }
        );

        if (!updatedPricing) {
            return NextResponse.json(
                { error: 'Pricing plan not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(updatedPricing);
    } catch (error) {
        console.error('Error updating pricing plan:', error);
        return NextResponse.json(
            { error: 'Failed to update pricing plan' },
            { status: 500 }
        );
    }
}

export async function DELETE(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if ((session?.user as any)?.role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { error: 'Pricing ID is required' },
                { status: 400 }
            );
        }

        await connectToDatabase();
        const deletedPricing = await Pricing.findByIdAndDelete(id);

        if (!deletedPricing) {
            return NextResponse.json(
                { error: 'Pricing plan not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting pricing plan:', error);
        return NextResponse.json(
            { error: 'Failed to delete pricing plan' },
            { status: 500 }
        );
    }
}
