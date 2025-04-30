import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 p-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-5xl font-bold mb-6">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="mb-8 text-gray-600 dark:text-gray-400">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block bg-blue-600 dark:bg-blue-500 text-white px-6 py-3 rounded-lg font-medium transition-colors hover:bg-blue-700 dark:hover:bg-blue-600"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}