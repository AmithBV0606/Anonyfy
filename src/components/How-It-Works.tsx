import React from "react";

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="bg-gradient-to-br from-gray-900 via-black to-gray-900 py-20"
    >
      <div className="container mx-auto px-4">
        {/* Heading and a sentence about the app */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How Anonyfy Works
          </h2>

          <p className="text-gray-400 text-lg">
            Get started in minutes and begin receiving anonymous messages from
            your audience.
          </p>
        </div>

        {/* Steps about how Anonyfy Works : */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            {/* Step 1 : */}
            <div className="h-16 w-16 rounded-full bg-gray-800 flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-bold">1</span>
            </div>

            <h3 className="text-2xl font-bold mb-3">Create Your Account</h3>

            <p className="text-gray-400">
              {/* Sign up for Anonyfy and set up your profile with your name, bio,
              and profile picture. */}
              Sign up for Anonyfy and you&apos;ll receive an email with 6-digit OTP.
              Verify your account by entering the OTP and then you&apos;ll be
              redirected to Login/Sign Up page.
            </p>
          </div>

          {/* Step 2 : */}
          <div className="text-center p-6">
            <div className="h-16 w-16 rounded-full bg-gray-800 flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-bold">2</span>
            </div>

            <h3 className="text-2xl font-bold mb-3">Share Your Link</h3>

            <p className="text-gray-400">
              Get your unique Anonyfy link and share it across your social media
              platforms.
            </p>
          </div>

          {/* Step 3 : */}
          <div className="text-center p-6">
            <div className="h-16 w-16 rounded-full bg-gray-800 flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-bold">3</span>
            </div>

            <h3 className="text-2xl font-bold mb-3">Receive & Respond</h3>

            <p className="text-gray-400">
              Start receiving anonymous messages and choose which ones to
              respond to publicly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}