import React from "react";

interface UserData {
  name: string;
  login: string;
  public_repos: number;
  avatar_url: string;
  followers: number;
  following: number;
  bio: string | null;
  email: string | null;
  hireable: boolean | null;
}

interface DisplayCompProps<T extends UserData> {
  data: T;
  error: Error | null;
  isFetching: boolean;
}

const DisplayComp = <T extends UserData>({
  data,
  error,
  isFetching,
}: DisplayCompProps<T>) => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      {isFetching ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-900/50 border border-red-700 rounded-lg p-4 max-w-md mx-auto">
          <h3 className="text-xl font-bold mb-2">Error</h3>
          <p>{error.message}</p>
        </div>
      ) : data ? (
        <div className="max-w-2xl mx-auto bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          {/* Profile Header */}
          <div className="md:flex p-6">
            <div className="md:flex-shrink-0 flex justify-center">
              <img
                className="h-32 w-32 rounded-full border-4 border-gray-700 object-cover"
                src={data.avatar_url}
                alt={`${data.name || data.login}'s avatar`}
              />
            </div>
            <div className="mt-4 md:mt-0 md:ml-6">
              <div className="flex items-center">
                <h2 className="text-2xl font-bold">
                  {data.name || data.login}
                </h2>
                {data.hireable && (
                  <span className="ml-2 px-2 py-1 text-xs bg-green-600 rounded-full">
                    Available for hire
                  </span>
                )}
              </div>
              <p className="text-blue-400">@{data.login}</p>

              {data.bio && (
                <p className="mt-2 text-gray-300 italic">{data.bio}</p>
              )}

              <div className="mt-3 flex flex-wrap gap-2">
                {data.email && (
                  <a
                    href={`mailto:${data.email}`}
                    className="flex items-center text-sm text-gray-400 hover:text-blue-400"
                  >
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    {data.email}
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="px-6 py-4 bg-gray-700/50">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-3">
                <p className="text-2xl font-bold">{data.public_repos}</p>
                <p className="text-sm text-gray-400">Repositories</p>
              </div>
              <div className="p-3">
                <p className="text-2xl font-bold">{data.followers}</p>
                <p className="text-sm text-gray-400">Followers</p>
              </div>
              <div className="p-3">
                <p className="text-2xl font-bold">{data.following}</p>
                <p className="text-sm text-gray-400">Following</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          Search for a GitHub user to view their profile
        </div>
      )}
    </div>
  );
};

export default DisplayComp;
