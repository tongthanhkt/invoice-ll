export default function NotFound() {
  return (
    <div className="flex flex-col gap-2 items-center justify-center h-screen -mt-10">
      <h1 className="text-2xl font-bold">404 - Not Found</h1>
      <p className="text-sm text-gray-500">
        The page you are looking for does not exist.
      </p>
    </div>
  );
}
