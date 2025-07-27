import clientPromise from '../../../lib/mongodb';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  try {
    const { fullname, phone, email, password } = await req.json();

    if (!fullname || !phone || !email || !password) {
      return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('Education');
    const users = db.collection('Edu-users');

    const existing = await users.findOne({ email });
    if (existing) {
      return NextResponse.json({ message: 'Email already exists' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await users.insertOne({
      fullname,
      phone,
      email,
      password: hashedPassword,
    });

    return NextResponse.json({ message: 'User created successfully' }, { status: 201 });

  } catch (error) {
    console.error('SIGNUP ERROR:', error);
    return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
  }
}
