import { NextRequest, NextResponse } from "next/server"; // NextRequest يستخدم لاستقبال البيانات، NextResponse للرد
import clientPromise from "../../../lib/mongodb"; // اتصال بقاعدة بيانات MongoDB
import bcrypt from "bcryptjs"; // مقارنة كلمات المرور المشفرة

export async function POST(req) {
  try {
    const { email, password } = await req.json(); // قراءة البيانات القادمة من المستخدم

    if (!email || !password) {
      return NextResponse.json({ message: "Missing password or email" }, { status: 400 }); // Bad Request
    }

    const client = await clientPromise; // it is an invoked promise not a function
    const db = client.db('Education');
    const users = db.collection('Edu-users'); // تصحيح ab إلى db و collections → collection

    const user = await users.findOne({ email }); // البحث عن المستخدم بواسطة البريد

    if (!user) {
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 }); // unauthorized
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password); // مقارنة كلمة المرور المدخلة مع المشفرة

    if (!isPasswordCorrect) {
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 }); // unauthorized
    }

    return NextResponse.json(
      {
        message: "Logged in Successfully",
        fullname: user.fullname
      },
      { status: 200 } // ok successfully , 201 created a new one
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
