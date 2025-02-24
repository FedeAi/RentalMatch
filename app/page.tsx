import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Find your perfect rental property faster
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Get instant notifications for new rental listings that match your criteria from over 750 platforms.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/search"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Start searching
              </Link>
              <Link href="/how-it-works" className="text-sm font-semibold leading-6 text-gray-900">
                Learn more <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">Find faster</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to find your next home
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col">
                <dt className="font-semibold text-gray-900">Real-time notifications</dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p>Get instant alerts when new properties matching your criteria are listed.</p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="font-semibold text-gray-900">Multiple search profiles</dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p>Create and manage multiple search profiles for different areas or preferences.</p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="font-semibold text-gray-900">750+ platforms</dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p>Access listings from hundreds of rental websites in one place.</p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </main>
  );
}