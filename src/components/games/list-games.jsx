"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function ListGames() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchGames = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.rawg.io/api/games?key=6e261b30827f4f90a2114af648dfe493&page=${page}`
      );
      setGames(response.data.results);
      setTotalPages(Math.ceil(response.data.count / 20));
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGames(currentPage);
  }, [currentPage]);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error.message}</h1>;

  return (
    <div className="p-4">
      <h1 className="font-bold mb-4 text-center">Rama Davana - Frontend Developer Test 2</h1>

      <h1 className="text-2xl font-bold mb-4">List Games</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {games.map((game) => (
          <div
            key={game.id}
            className="border rounded-lg overflow-hidden shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
            <img src={game.background_image} alt={game.name} className="w-full h-48 object-cover" />

            <div className="p-4">
              <h2 className="text-lg font-semibold">{game.name}</h2>

              <p className="text-gray-600">Released: {game.released}</p>

              <p className="text-gray-600">Rating: {game.rating}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50">
          Previous
        </button>

        <span className="self-center">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50">
          Next
        </button>
      </div>
    </div>
  );
}
