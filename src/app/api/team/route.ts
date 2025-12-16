
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectToDatabase from '@/lib/mongodb';
import Team from '@/models/Team';

export async function GET(req: Request) {
    try {
        await connectToDatabase();

        // Check if admin for fetching all (including inactive)
        const session = await getServerSession(authOptions);
        const isAdmin = (session?.user as any)?.role === 'admin';

        const filter = isAdmin ? {} : { active: true };

        const team = await Team.find(filter).sort({ order: 1, createdAt: 1 });
        return NextResponse.json(team);
    } catch (error) {
        console.error('Error fetching team members:', error);
        return NextResponse.json(
            { error: 'Failed to fetch team members' },
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

        // Basic validation
        if (!body.name || !body.role || !body.image) {
            return NextResponse.json(
                { error: 'Name, Role and Image are required' },
                { status: 400 }
            );
        }

        await connectToDatabase();

        const newMember = await Team.create(body);
        return NextResponse.json(newMember, { status: 201 });
    } catch (error) {
        console.error('Error creating team member:', error);
        return NextResponse.json(
            { error: 'Failed to create team member' },
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
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        await connectToDatabase();

        const updatedMember = await Team.findByIdAndUpdate(_id, updateData, { new: true });

        if (!updatedMember) {
            return NextResponse.json({ error: 'Member not found' }, { status: 404 });
        }

        return NextResponse.json(updatedMember);
    } catch (error) {
        console.error('Error updating team member:', error);
        return NextResponse.json(
            { error: 'Failed to update team member' },
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
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        await connectToDatabase();
        await Team.findByIdAndDelete(id);

        return NextResponse.json({ message: 'Member deleted successfully' });
    } catch (error) {
        console.error('Error deleting team member:', error);
        return NextResponse.json(
            { error: 'Failed to delete team member' },
            { status: 500 }
        );
    }
}
