import React from 'react';
import { Heart, Code, Users, MessageSquare } from "lucide-react"
import { withAuthInfo } from '@propelauth/react';

const SmashLanding = withAuthInfo((props) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <Heart className="h-6 w-6 text-pink-500" />
          <span className="ml-2 text-2xl font-bold">CSmash</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Button variant="ghost">Features</Button>
          <Button variant="ghost">Testimonials</Button>
          <Button variant="ghost">About</Button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Find Your Perfect <span className="text-pink-500">Match</span> in the World of Code
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl">
                  CSmash: Where algorithms meet attraction. Connect with fellow CS students who speak your language.
                </p>
              </div>
              <div className="space-x-4">
                    <button classname="bg-pink-500 hover:bg-pink-600">sign up</button>
                    <button variant="outline">log in</button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-800">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Why Choose CSmash?
            </h2>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center text-center">
                <Code className="h-12 w-12 text-pink-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">Coding Compatibility</h3>
                <p className="text-gray-300">Our algorithm matches you based on programming languages and coding style.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Users className="h-12 w-12 text-pink-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">CS Community</h3>
                <p className="text-gray-300">Connect with a community of like-minded CS students and professionals.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <MessageSquare className="h-12 w-12 text-pink-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">Code & Chat</h3>
                <p className="text-gray-300">Share code snippets and solve programming challenges together.</p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Compile Your Love Life?
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-300 md:text-xl">
                  Join CSmash today and start your journey to finding your perfect pair programmer!
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input
                    className="max-w-lg flex-1"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Button type="submit">
                    Get Started
                  </Button>
                </form>
                <p className="text-xs text-gray-400">
                  By signing up, you agree to our Terms & Conditions and Privacy Policy.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-gray-700">
        <p className="text-xs text-gray-400">© 2023 CSmash. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
});

export default SmashLanding;