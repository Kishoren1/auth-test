import User from "@/models/user";
import connectDB from "@/utilis/db";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const body = await request.json();

  await connectDB();

  const existUser = await User.findOne({ email: body.email });
  if (existUser) {
    return NextResponse.json(
      { error: "Email is already in use" },
      { status: 422 }
    );
  }

  const user = await User.create({ ...body });

  return NextResponse.json({
    user: {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      role: user.role,
    },
  });
};
