import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';

export async function POST() {
  try {
    await connectToDatabase();

    const existing = await User.findOne({ email: 'admin@avirahub.in' });
    if (existing) {
      return NextResponse.json({ success: false, message: 'Admin already exists' });
    }

    const hashed = await bcrypt.hash('admin123', 10);

    await User.create({
      email: 'admin@avirahub.in',
      password: hashed,
      role: 'admin',
    });

    return NextResponse.json({ success: true, message: 'Admin created' });
  } catch (error) {
    console.error('Error creating admin user', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 },
    );
  }
}

export async function GET() {
    return POST();
  }
  