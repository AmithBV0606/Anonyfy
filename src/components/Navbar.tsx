"use client";

import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { User } from "next-auth";
import { Button } from "./ui/button";

export default function Navbar() {
  const { data: session, status } = useSession();

  // console.log(session);
  // console.log(status);

  const user: User = session?.user as User;

  return (
    <nav className="p-4 md:p-6 shadow-md bg-[#0D0C1D] m-0 text-white">
      <div className="px-4 md:px-10 lg:px-20 flex justify-between items-center">
        <a href="#" className="text-xl font-bold">
          Anonyfy
        </a>

        <div>
          {session ? (
            <div className="">
              <span className="mr-4 hidden md:inline-block">
                Welcome, {user?.username || user?.email}
              </span>

              <Button
                variant={"outline"}
                className="w-full md:w-auto text-black"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                Logout
              </Button>
            </div>
          ) : (
            <Link href={"/sign-in"}>
              <Button
                className="w-full md:w-auto bg-slate-100 text-black"
                variant={"outline"}
              >
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}