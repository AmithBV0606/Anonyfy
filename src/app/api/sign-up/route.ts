import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request: Request) {
  await dbConnect();

  try {
    // Data coming from UI(Sign-up page)
    const { username, email, password } = await request.json();

    // __________________________________________________________________________________________

    // Check if that username exists in our database whose already been verified
    const existingVerifiedUserByUsername = await UserModel.findOne({
      username,
      isVerified: true,
    });

    // If the user with that username already exists, send the message that the "username is taken".
    if (existingVerifiedUserByUsername) {
      return Response.json(
        { success: false, message: "Username is already taken!" },
        { status: 400 }
      );
    }

    // __________________________________________________________________________________________

    // Check if the user with the entered email exists in database or not
    const existingUserByEmail = await UserModel.findOne({
      email,
    });

    // Generate OTP
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    if (existingUserByEmail) {
      // If the user with the entered email already exists
      if (existingUserByEmail.isVerified) {
        return Response.json(
          {
            success: false,
            message: "User already exists with this email",
          },
          { status: 400 }
        );
      } else {
        // If the user with the entered email already exists but he/she is not verfied yet.
        const hashedPassword = await bcrypt.hash(password, 10);
        existingUserByEmail.password = hashedPassword;
        existingUserByEmail.verifyCode = verifyCode;
        existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);
        await existingUserByEmail.save();
      }
    } else {
      // If there is not "existingUserByEmail", means that there is no such user with the email id we searched for.

      const hashedPassword = await bcrypt.hash(password, 10);
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);

      const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,
        verifyCode,
        verifyCodeExpiry: expiryDate,
        isVerified: false,
        isAcceptingMessages: true,
        messages: [],
      });

      await newUser.save();
    }

    // Once the user is saved, we need to send the verification email.
    const emailResponse = await sendVerificationEmail(
      email,
      username,
      verifyCode
    );

    // If in case the verification email fails to reach the destination
    if (!emailResponse.success) {
      return Response.json(
        {
          success: false,
          message: emailResponse.message,
        },
        { status: 500 }
      );
    }

    // If the verification email successfully reaches the destination.
    return Response.json(
      {
        success: true,
        message: "User registered successfully. Please verify your email",
      },
      { status: 201 }
    );

    // __________________________________________________________________________________________
  } catch (error) {
    console.error("Error registering user", error);
    return Response.json(
      {
        success: false,
        message: "Error registering user",
      },
      { status: 500 }
    );
  }
}