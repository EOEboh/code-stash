import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

function Logo() {
  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <div className="relative">
        <Image
          src="/logo.svg"
          width={32}
          height={32}
          alt="Code Stash Logo"
          className="sm:w-10 sm:h-10 rounded-lg"
        />
      </div>
      <span className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Code Stash
      </span>
    </div>
  );
}

function LoginBtn() {
  return (
    <Button
      size="lg"
      className="w-full sm:w-auto min-w-[140px] px-6 sm:px-8 py-3 
  bg-gradient-to-r from-primary to-primary.hover 
  hover:from-primary.hover hover:to-primary.dark 
  text-white font-semibold rounded-lg shadow-lg 
  hover:shadow-xl transition-all duration-200"
      asChild
    >
      <Link href="/login">Log In</Link>
    </Button>
  );
}

function SignUpBtn() {
  return (
    <Button
      variant="outline"
      size="lg"
      className="w-full sm:w-auto min-w-[140px] px-6 sm:px-8 py-3 
  border-2 border-primary.light text-primary 
  hover:bg-background.soft hover:border-primary 
  font-semibold rounded-lg transition-all duration-200 bg-transparent"
      asChild
    >
      <Link href="/signup">Sign Up</Link>
    </Button>
  );
}

function Buttons() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm sm:max-w-md justify-center items-center">
      <LoginBtn />
      <SignUpBtn />
    </div>
  );
}

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="flex justify-center pt-4 sm:pt-6 lg:pt-8 pb-2 sm:pb-4 px-4">
        <Logo />
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-16 text-center min-h-[calc(100vh-120px)]">
        <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8 lg:space-y-12">
          {/* Hero Section */}
          <div className="space-y-4 sm:space-y-6 lg:space-y-8">
            <div className="space-y-3 sm:space-y-4 lg:space-y-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight px-2">
                Welcome to{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Code Stash
                </span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-4xl mx-auto px-4">
                Your ultimate destination for code snippets, templates, and
                development resources. Discover, save, and share amazing code
                with developers worldwide.
              </p>
            </div>

            {/* Feature highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mt-8 sm:mt-12 mb-8 sm:mb-12 px-4">
              <div className="flex flex-col items-center space-y-2 sm:space-y-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                  Code Snippets
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 text-center">
                  Ready-to-use code snippets
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 sm:space-y-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-purple-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                  Templates
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 text-center">
                  Project starter templates
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 sm:space-y-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-green-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                  Community
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 text-center">
                  Connect with developers
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="space-y-4 sm:space-y-6 flex flex-col items-center">
            <Buttons />
            <p className="text-xs sm:text-sm text-gray-500 px-4">
              Join thousands of developers already using Code Stash
            </p>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        </div>
      </main>
    </div>
  );
};

export default Home;
