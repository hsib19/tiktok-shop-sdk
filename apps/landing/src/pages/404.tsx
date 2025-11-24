import Link from 'next/link';

export default function Custom404() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 dark:bg-neutral-950">
      <h1 className="text-6xl font-bold text-blue-600 dark:text-blue-400">
        404
      </h1>
      <h2 className="mt-4 text-2xl font-semibold text-neutral-900 dark:text-white">
        Page Not Found
      </h2>
      <p className="mt-2 max-w-md text-center text-neutral-600 dark:text-neutral-400">
        Sorry, the page you are looking for doesn’t exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-lg bg-blue-600 px-6 py-3 text-white! transition hover:bg-blue-700"
      >
        Go back home
      </Link>
    </div>
  );
}
