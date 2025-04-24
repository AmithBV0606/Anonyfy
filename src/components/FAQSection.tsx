import React from "react";

export default function FAQSection() {
  return (
    <section
      id="faq"
      className="bg-gradient-to-br from-gray-900 via-black to-gray-900 py-20"
    >
      <div className="container mx-auto px-4">
        {/* Heading and a sentence about the app */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400 text-lg">
            Everything you need to know about Anonyfy and how it works.
          </p>
        </div>

        {/* FAQ's */}
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Question 1 : */}
          <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
            <h3 className="text-xl font-bold mb-2">
              Is Anonyfy completely anonymous?
            </h3>

            <p className="text-gray-400">
              Yes, we do not{" "}
              <span className="underline decoration-sky-500">collect</span> or{" "}
              <span className="underline decoration-pink-400">store</span> any
              identifiable information about the people sending messages. Your
              audience can share their thoughts with complete anonymity.
            </p>
          </div>

          {/* Queston 2 : */}
          <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
            <h3 className="text-xl font-bold mb-2">
              Can I moderate the messages I receive?
            </h3>

            <p className="text-gray-400">
              Currently this feature is{" "}
              <span className="underline decoration-sky-500">unavailable</span>.
              We will be building robust moderation tools to filter out
              inappropriate content. In future, You'll have full control over
              which messages you choose to view and respond to.
            </p>
          </div>

          {/* Question 3 : */}
          <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
            <h3 className="text-xl font-bold mb-2">
              Is there a free plan available?
            </h3>

            <p className="text-gray-400">
              Yes, As of now Anonyfy is completely{" "}
              <span className="underline decoration-pink-400">FREE</span> to use
              with basic features. As we progress we might introduce the premium
              plans for creators who need advanced features and higher message
              limits.
            </p>
          </div>

          {/* Question 4 : */}
          <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
            <h3 className="text-xl font-bold mb-2">
              How do I share my Anonyfy link?
            </h3>

            <p className="text-gray-400">
              Once you create your account, you'll see a{" "}
              <span className="underline decoration-sky-500">unique link</span>{" "}
              on your dashboard that you can share on your social media
              profiles, video descriptions, or anywhere your audience can find
              it.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}