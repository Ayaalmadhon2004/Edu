import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid course ID" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("Education");
    const collection = db.collection("CourseDataList");

    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ message: "Course not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Course deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("❌ Delete API error:", error);
    return NextResponse.json({ message: "Server error", error: error.message }, { status: 500 });
  }
}
