import { useRouteError, Link } from "react-router";

export function ErrorFallback() {
  const error: any = useRouteError();
  const message =
    error?.status === 404
      ? "The page you're looking for was not found."
      : "Something went wrong. Please try again.";

  return (
    <div className="min-h-screen bg-[#0d0d14] text-center text-white flex flex-col items-center justify-center px-4">
      <div className="max-w-md space-y-4">
        <h1 className="text-3xl" style={{ fontWeight: 700 }}>
          Oops!
        </h1>
        <p className="text-gray-400">{message}</p>
        <Link
          to="/"
          className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-pink-600 text-white hover:opacity-90 transition-opacity"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
