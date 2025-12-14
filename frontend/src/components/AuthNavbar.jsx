import { useEffect, useState } from "react";

export default function AuthNavbar() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-900 shadow">
      <h1 className="text-xl font-bold text-orange-600 dark:text-violet-400">
        Fit Plan Hub
      </h1>

      <button
        onClick={() => setDark(!dark)}
        className="px-4 py-1 rounded bg-gray-200 dark:bg-gray-700 text-sm"
      >
        {dark ? "Light Mode" : "Dark Mode"}
      </button>
    </nav>
  );
}
