import clientPromise from "@/lib/mongodb"; 

import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("Education");
    const collection = db.collection("Teachers");

    const teachers = await collection.find({}).toArray();
    return NextResponse.json(teachers);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

}
