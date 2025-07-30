import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("Education");
    const collection = db.collection("Teachers");
    if (!client) {
  throw new Error("MongoDB client not initialized");
}


    const teachers = await collection.find({}).toArray();

    // ✅ تحقق أن النتيجة فعلاً مصفوفة
    if (!Array.isArray(teachers)) {
      throw new Error("The result from MongoDB is not an array.");
    }

    return NextResponse.json(teachers);
  } catch (error) {
    console.error("❌ Error in /api/teacher:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
