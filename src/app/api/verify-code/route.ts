import { NextRequest } from "next/server";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

// Zod for validation
import { z } from "zod";
import { usernameValidation } from "@/schemas/signUpSchema";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { username, code } = await request.json();

    const decodedUsername = decodeURIComponent(username);
    const user = await UserModel.findOne({ username: decodedUsername });

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found!",
        },
        { status: 500 }
      );
    }

    const isCodeValid = user.verifyCode === code;
    const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

    if (isCodeValid && isCodeNotExpired) {
      user.isVerified = true;
      await user.save();
      return Response.json(
        {
          success: true,
          message: "Account verified successfully!",
        },
        { status: 200 }
      );
    } else if (!isCodeNotExpired) {
      // Code has expired
      return Response.json(
        {
          success: false,
          message: "Verification code has expired, please sign-up again!",
        },
        { status: 400 }
      );
      // Better way of handling the "code expired" scenario is that, we can generate and set new code and new expiry time of that user in our database. Then we can send an email with the latest code(OTP) and fresh expiry time to that user again.
    } else {
      // Code is incorrect
      return Response.json(
        {
          success: false,
          message: "Incorrect verification code!",
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error verifying user!", error);
    return Response.json(
      {
        success: false,
        message: "Error verifying user!",
      },
      { status: 500 }
    );
  }
}