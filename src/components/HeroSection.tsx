import React from "react";
import { Button } from "./ui/button";
import { ChevronRight, MessageSquare } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="container mx-auto py-20 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Grid 1 : Text and Call-To-Action */}
        <div className="space-y-6">
          <div className="inline-block px-3 py-1 rounded-full bg-gray-800 text-gray-300 text-sm">
            Connect with your audience anonymously
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Receive <span className="text-gray-500">anonymous</span> messages
            from your audience
          </h1>

          <p className="text-xl text-gray-400 max-w-lg">
            Anonyfy lets content creators and influencers receive honest
            feedback and questions from their audience while keeping their
            identity hidden.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href={"/sign-up"}>
              <Button className="bg-gray-100 text-gray-900 hover:bg-gray-400 px-8 py-6 text-lg w-full">
                Get Started
              </Button>
            </Link>

            <Link href="#how-it-works">
              <Button className="border border-gray-500 bg-black text-gray-400 hover:bg-gray-800 px-20 py-6 text-lg w-full">
                Learn More <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Grid 2 : Image */}
        <div className="relative h-[400px] lg:h-[500px] rounded-xl overflow-hidden border border-gray-800 shadow-2xl">
          {/* A thin transparent screen on top of Image */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800/50 via-gray-900/50 to-black/50 z-10"></div>

          <Image
            src="/placeholder.svg?height=500&width=500"
            alt="Anonyfy Platform Preview"
            fill
            className="object-cover"
          />

          {/* A thin transparent screen at the bottom of Image */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-1/3 z-20"></div>

          {/* Message card on top of Image */}
          <div className="absolute bottom-8 left-8 right-8 z-30 bg-gray-900/80 backdrop-blur-sm p-4 rounded-lg border border-gray-800">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center">
                <MessageSquare className="h-5 w-5 text-gray-300" />
              </div>

              <div className="flex-1">
                <p className="text-gray-400 text-sm">Anonymous User</p>
                <p className="text-gray-100">
                  What inspired you to start your channel? Your content has been
                  so helpful!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}