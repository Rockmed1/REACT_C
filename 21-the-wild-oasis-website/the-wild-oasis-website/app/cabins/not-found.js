function NotFound() {
  return (
    <main className="mt-4 space-y-6 text-center">
      <h1 className="text-3xl font-semibold">
        This cabin could not be found :(
      </h1>
      <a
        href="/cabins"
        className="bg-accent-500 text-primary-800 inline-block px-6 py-3 text-lg"
      >
        Go back to cabins
      </a>
    </main>
  );
}

export default NotFound;
