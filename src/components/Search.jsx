import { useState } from "react";
import Fuse from "fuse.js";

export default function Search({ searchList }) {
  const [query, setQuery] = useState("");

  const fuse = new Fuse(searchList, {
    keys: ["data.title", "data.description"],
    threshold: 0.3,
  });

  const results = query ? fuse.search(query).map(r => r.item) : searchList;

  return (
    <div>
      <input
        type="text"
        placeholder="Search posts..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border p-2 w-full"
      />

      <ul className="mt-4">
        {results.map((post) => (
          <li key={post.id}>
            <a href={`/Blog/${post.id}`}>{post.data.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}