"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    const stopId = event.currentTarget.stopId.value as string;
    router.push("/" + stopId);
    event.preventDefault();
  }

  return (
    <div className="w-full flex flex-col gap-4">
      <h1 className="text-xl font-bold text-center">Cerca fermata</h1>
      <form
        className="rounded mx-auto max-w-xs flex gap-4 items-end"
        onSubmit={onSubmit}
      >
        <div>
          <label className="font-bold mb-4" htmlFor="username">
            ID fermata
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="stopId"
            type="text"
            placeholder="ID fermata"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Cerca
          </button>
        </div>
      </form>
    </div>
  );
}
