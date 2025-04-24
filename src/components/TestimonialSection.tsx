import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function TestimonialSection() {
  return (
    <section id="testimonials" className="container mx-auto py-20 px-4">
      {/* Heading and a sentence about the app */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          What Creators Say
        </h2>
        <p className="text-gray-400 text-lg">
          Hear from content creators who have transformed their audience
          engagement with Anonyfy.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Card 1 : */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl border border-gray-700">
          <div className="flex items-center mb-6">
            {/* Avatar */}
            <div className="h-12 w-12 rounded-full bg-gray-700 mr-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src="/Hitesh-Choudhary.png" alt="@ChaiCode" />
                <AvatarFallback>HC</AvatarFallback>
              </Avatar>
            </div>

            {/* Name and Type of YouTuber */}
            <div>
              <h4 className="font-bold">Hitesh Choudhary</h4>
              <p className="text-gray-400 text-sm">Tech Youtuber</p>
            </div>
          </div>

          {/* About */}
          <p className="text-gray-300">
            "Anonyfy has completely changed how I interact with my audience. I'm
            getting questions I never would have received otherwise, and it's
            helped me create content that truly resonates."
          </p>
        </div>

        {/* Card 2 : */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl border border-gray-700">
          <div className="flex items-center mb-6">
            {/* Avatar */}
            <div className="h-12 w-12 rounded-full bg-gray-700 mr-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src="/Harkirat-Singh.jpg" alt="@100xdevs" />
                <AvatarFallback>HS</AvatarFallback>
              </Avatar>
            </div>

            {/* Name and Type of YouTuber */}
            <div>
              <h4 className="font-bold">Harkirat Singh</h4>
              <p className="text-gray-400 text-sm">Programming</p>
            </div>
          </div>

          {/* About */}
          <p className="text-gray-300">
            "The anonymous feedback I get through Anonyfy has been invaluable
            for improving my reviews. My audience feels comfortable pointing out
            things I might have missed."
          </p>
        </div>

        {/* Card 3 : */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl border border-gray-700">
          <div className="flex items-center mb-6">
            {/* Avatar */}
            <div className="h-12 w-12 rounded-full bg-gray-700 mr-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src="/CodeWithHarry.png" alt="@CodeWithHarry" />
                <AvatarFallback>CWH</AvatarFallback>
              </Avatar>
            </div>

            {/* Name and Type of YouTuber */}
            <div>
              <h4 className="font-bold">Haris Ali Khan</h4>
              <p className="text-gray-400 text-sm">Programming Influencer</p>
            </div>
          </div>

          {/* About */}
          <p className="text-gray-300">
            "My followers ask me questions about their fitness journeys that
            they wouldn't feel comfortable asking publicly. Anonyfy has helped
            me build a more supportive community."
          </p>
        </div>
      </div>
    </section>
  );
}