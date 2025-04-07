import { NextResponse } from "next/server";
import dbConnect from "../../lib/connectDB";
import User from "../../models/User";

export async function GET() {
  await dbConnect();
  const users = await User.find();
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  const body = await request.json();
  await dbConnect();
  const user = await User.create(body);
  return NextResponse.json(user, { status: 201 });
}
