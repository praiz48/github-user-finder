import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import SearchCop from "./components/SearchCop";
import DisplayComp from "./components/DisplayComp";
interface GitHubUser {
  login: string;
  name: string;
  public_repos: number;
  avatar_url: string;
  followers: number;
  following: number;
  bio: string | null;
  email: string | null;
  hireable: boolean | null;
}

function App() {
  const [input, setInput] = useState("");
  const { data, error, isFetching, refetch } = useQuery<GitHubUser, Error>({
    queryKey: ["username", input],
    queryFn: () => fetchusername(input),
    enabled: false,
  });

  const Handleinput = (input: string) => {
    setInput(input);
    refetch();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header Section */}
      <header className="bg-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h1 className="text-3xl font-bold text-white">
                <span className="text-blue-400">GitHub</span> Profile Finder
              </h1>
              <p className="mt-1 text-sm text-gray-400">
                Search for any GitHub user and view their profile
              </p>
            </div>
            <div className="mt-4 flex md:mt-0 md:ml-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-700 hover:bg-gray-600 transition-colors"
              >
                <svg
                  className="h-5 w-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.167 6.839 9.49.5.09.682-.217.682-.48 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.293 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                  />
                </svg>
                Visit GitHub
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Search Component */}
          <SearchCop handleinput={Handleinput} />

          {/* Results Section */}
          <div className="rounded-lg overflow-hidden">
            {isFetching ? (
              <div className="flex justify-center items-center h-64 bg-gray-800/50 rounded-lg">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : error ? (
              <div className="bg-red-900/50 border border-red-700 rounded-lg p-6 text-center">
                <h3 className="text-xl font-bold mb-2">Error</h3>
                <p>{error.message}</p>
                <button
                  onClick={() => refetch()}
                  className="mt-4 px-4 py-2 bg-red-700 hover:bg-red-600 rounded-md transition-colors"
                >
                  Retry
                </button>
              </div>
            ) : data ? (
              <DisplayComp data={data} error={error} isFetching={isFetching} />
            ) : (
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-300">
                  No profile searched
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Enter a GitHub username to begin
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-400">
            &copy; {new Date().getFullYear()} GitHub Profile Finder. Not
            affiliated with GitHub.
          </p>
        </div>
      </footer>
    </div>
  );
}

const fetchusername = async (username: string): Promise<GitHubUser> => {
  const response = await fetch(`https://api.github.com/users/${username}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export default App;
