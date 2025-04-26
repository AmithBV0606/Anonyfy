import {
  ArrowRight,
  MessageSquare,
  Shield,
  ToggleRightIcon,
  Users,
  Zap,
} from "lucide-react";
import React from "react";

export default function FeatureSection() {
  return (
    <section id="features" className="container mx-auto py-20 px-4">
      {/* Heading and a sentence about the app */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Why Creators Love Anonyfy
        </h2>

        <p className="text-gray-400 text-lg">
          Our platform provides everything you need to connect with your
          audience on a deeper level.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Card 1 : */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl border border-gray-700">
          <div className="h-12 w-12 rounded-full bg-gray-700 flex items-center justify-center mb-6">
            <Shield className="h-6 w-6 text-gray-300" />
          </div>

          <h3 className="text-xl font-bold mb-3">Complete Anonymity</h3>

          <p className="text-gray-400">
            We ensure that your audience can share their thoughts without
            revealing their{" "}
            <span className="underline decoration-sky-500">identity</span>,
            encouraging{" "}
            <span className="underline decoration-pink-400">
              honest feedback
            </span>
            .
          </p>
        </div>

        {/* Card 2 : */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl border border-gray-700">
          <div className="h-12 w-12 rounded-full bg-gray-700 flex items-center justify-center mb-6">
            <Users className="h-6 w-6 text-gray-300" />
          </div>

          <h3 className="text-xl font-bold mb-3">Audience Engagement</h3>

          <p className="text-gray-400">
            Boost engagement with your followers by giving them a{" "}
            <span className="underline decoration-sky-500">safe space</span> to
            ask questions they might otherwise hesitate to ask.
          </p>
        </div>

        {/* Card 3 : */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl border border-gray-700">
          <div className="h-12 w-12 rounded-full bg-gray-700 flex items-center justify-center mb-6">
            <Zap className="h-6 w-6 text-gray-300" />
          </div>

          <h3 className="text-xl font-bold mb-3">Easy Integration</h3>

          <p className="text-gray-400">
            Share your{" "}
            <span className="underline decoration-pink-400">
              unique Anonyfy
            </span>{" "}
            link on all your social platforms to start receiving anonymous
            messages instantly.
          </p>
        </div>

        {/* Card 4 : */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl border border-gray-700">
          <div className="h-12 w-12 rounded-full bg-gray-700 flex items-center justify-center mb-6">
            <MessageSquare className="h-6 w-6 text-gray-300" />
          </div>

          <h3 className="text-xl font-bold mb-3">Content Inspiration</h3>

          <p className="text-gray-400">
            Get{" "}
            <span className="underline decoration-pink-400">
              direct insights
            </span>{" "}
            into what your{" "}
            <span className="underline decoration-sky-500">audience wants</span>{" "}
            to know, helping you create more relevant and engaging content.
          </p>
        </div>

        {/* Card 5 : */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl border border-gray-700">
          <div className="h-12 w-12 rounded-full bg-gray-700 flex items-center justify-center mb-6">
            <ToggleRightIcon className="h-6 w-6 text-gray-300" />
          </div>

          <h3 className="text-xl font-bold mb-3">Acceptance Status</h3>

          <p className="text-gray-400">
            After receiving enough messages, you can{" "}
            <span className="underline decoration-pink-400">toggle</span> the{" "}
            <span className="underline decoration-sky-500">
            &quot;Accepting Message&quot;
            </span>{" "}
            button, to stop receiving messages from your audience.
          </p>
        </div>

        {/* Card 6 : */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl border border-gray-700">
          <div className="h-12 w-12 rounded-full bg-gray-700 flex items-center justify-center mb-6">
            <ArrowRight className="h-6 w-6 text-gray-300" />
          </div>

          <h3 className="text-xl font-bold mb-3">Public Responses</h3>

          <p className="text-gray-400">
            Choose to answer questions{" "}
            <span className="underline decoration-pink-400">publicaly</span>,
            creating an{" "}
            <span className="underline decoration-sky-500">
              engaging Q&A format
            </span>
            that your entire audience can benefit from.
          </p>
        </div>
      </div>
    </section>
  );
}