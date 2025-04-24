import React from "react";

export default function StatsSection() {
  return (
    <section className="bg-gray-900/50 backdrop-blur-sm border-y border-gray-800">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <p className="text-4xl font-bold">10k+</p>
            <p className="text-gray-400 mt-2">Content Creators</p>
          </div>

          <div className="text-center">
            <p className="text-4xl font-bold">1M+</p>
            <p className="text-gray-400 mt-2">Anonymous Messages</p>
          </div>

          <div className="text-center">
            <p className="text-4xl font-bold">150+</p>
            <p className="text-gray-400 mt-2">Countries</p>
          </div>
        </div>

        <div className="text-center mt-6">
          <div className="inline-block px-3 py-1 rounded-full bg-[#7765E3] backdrop-blur-sm text-gray-300 text-sm">
            <p className="font-bold text-gray-800">
              Just kidding <span className="text-xl">😝</span>, these are fake
              stats!!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}