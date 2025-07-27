import clientPromise from "../../../lib/mongodb";  
import {  NextResponse } from "next/server"; // NextResponse used to create responses in API

export async function POST(req) {
  const body = await req.json();
  const { fullname, phone, email, password } = body;

  if (!fullname || !phone || !email || !password) {
    return NextResponse.json({ message: "Missing fields" }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db("Education");
    const users = db.collection("users");

    const existing = await users.findOne({ email });
    if (existing) {
      return NextResponse.json({ message: "Email already exists" }, { status: 400 });
    }

    await users.insertOne({ fullname, phone, email, password });
    return NextResponse.json({ message: "User created successfully" }, { status: 201 });

  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
