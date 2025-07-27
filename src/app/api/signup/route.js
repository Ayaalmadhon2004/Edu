import clientPromise from "../../../lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { fullname, phone, email, password } = body;

    if (!fullname || !phone || !email || !password) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("Education");
    const users = db.collection("Edu-users");

    const existing = await users.findOne({ email });
    if (existing) {
      return NextResponse.json({ message: "Email already exists" }, { status: 400 });
    }

    await users.insertOne({ fullname, phone, email, password });

    return NextResponse.json({ message: "User created successfully" }, { status: 201 });

  } catch (error) {
    console.error("🔥 SIGNUP ERROR:", error); 
    return NextResponse.json({ message: "Server error", error: error.message }, { status: 500 });
  }
}
