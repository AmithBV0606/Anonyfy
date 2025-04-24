import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

export default function BottomCTASection() {
  return (
    <section className="container mx-auto py-20 px-4">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-12 rounded-2xl border border-gray-700 text-center max-w-4xl mx-auto">
        {/* Main Heading */}
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Connect With Your Audience?
        </h2>

        {/* CTA Paragraph */}
        <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
          Join thousands of content creators who are building stronger
          connections with their audience through anonymous messaging.
        </p>

        {/* CTA Button */}
        <Link href={"/sign-up"}>
          <Button
            className="text-white bg-black border border-gray-500 px-8 py-6 text-lg"
            variant={"default"}
          >
            Get Started For Free
          </Button>
        </Link>
      </div>
    </section>
  );
}