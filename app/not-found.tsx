export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-[100svh] bg-[#080810]">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-[#F8F8FF] mb-4">404</h1>
        <p className="text-xl text-[#8B5CF6] mb-6">Page not found</p>
        <a
          href="/"
          className="inline-block px-6 py-3 bg-[#00FF94] text-[#080810] font-semibold rounded-lg hover:bg-[#00D966] transition-colors"
        >
          Return Home
        </a>
      </div>
    </div>
  );
}
