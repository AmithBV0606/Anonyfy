"use client";

import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { User } from "next-auth";
import { Button } from "./ui/button";
import { Shield } from "lucide-react";
import { Separator } from "./ui/separator";

export default function Navbar() {
  const { data: session, status } = useSession();

  // console.log(session);
  // console.log(status);

  const user: User = session?.user as User;

  return (
    <>
      <header className="container mx-auto py-6 px-4 lg:px-32 flex items-center justify-between min-w-full bg-gradient-to-br from-black via-gray-900 to-black text-gray-100">
        <div className="flex items-center gap-2">
          <Shield className="h-8 w-8 text-gray-100" />
          <span className="text-xl font-bold">Anonyfy</span>
        </div>

        {session ? (
          <></>
        ) : (
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="#features"
              className="text-gray-300 hover:text-white transition-colors scroll-smooth"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-gray-300 hover:text-white transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="#testimonials"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Testimonials
            </Link>
            <Link
              href="#faq"
              className="text-gray-300 hover:text-white transition-colors"
            >
              FAQ
            </Link>
          </nav>
        )}

        <div className="flex items-center gap-4">
          {session ? (
            <>
              <Button
                variant={"outline"}
                className="w-full md:w-auto text-black"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Login
              </Link>

              <Link href={"/sign-up"}>
                <Button
                  className="w-full md:w-auto bg-slate-100 text-black"
                  variant={"outline"}
                >
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </header>

      <Separator className="bg-gray-700" />
    </>
  );
}