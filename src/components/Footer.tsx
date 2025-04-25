import { Shield } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Logo */}
          <div className="max-w-[600px]">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-6 w-6 text-gray-100" />

              <span className="text-xl font-bold">Anonyfy</span>
            </div>

            {/* About Anonyfy */}
            <p className="text-gray-400">
              Anonyfy, the anonymous messaging platform for content creators and
              influencers. Anonyfy lets content creators and influencers receive
              honest feedback and questions from their audience while keeping
              their identity hidden.
            </p>
          </div>

          <div className="ml-0 md:ml-auto mr-16">
            <h4 className="font-bold mb-4">Product</h4>

            <ul className="space-y-2">
              <li>
                <Link
                  href="#features"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Features
                </Link>
              </li>

              <li>
                <Link
                  href="#how-it-works"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  How It Works
                </Link>
              </li>

              <li>
                <Link
                  href="#testimonials"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Testimonials
                </Link>
              </li>

              <li>
                <Link
                  href="#faq"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Anonyfy. All rights reserved.
          </p>

          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              href="https://x.com/AmithBV0606"
              target="_blank"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Twitter
            </Link>

            <Link
              href="https://www.instagram.com/amith_rao_01/"
              target="_blank"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Instagram
            </Link>

            <Link
              href="https://www.linkedin.com/in/amith-b-v-151a281b4/"
              target="_blank"
              className="text-gray-400 hover:text-white transition-colors"
            >
              LinkedIn
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}