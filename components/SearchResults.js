import PaginationButtons from "./PaginationButtons";
import { MoonIcon } from "@heroicons/react/solid";

function SearchResults({ results, newsResults, setDarkMode, darkMode }) {
  console.log(newsResults);
  return (
    <div className="flex">
      <div className="mx-auto w-full px-3 sm:pl-[5%] md:pl-[14%] lg:pl-52">
        <p className="text-gray-600 text-md mt-5 mb-3">
          About {results.searchInformation?.formattedTotalResults} results (
          {results.searchInformation?.formattedSearchTime} seconds)
        </p>

        {results.items?.map((result) => (
          <div key={result.link} className="max-w-xl mb-8">
            <div className="group">
              <a href={result.link} className="text-sm line-clamp-1">
                {result.formattedUrl}
              </a>
              <a href={result.link}>
                <h2 className="truncate text-xl text-blue-800 font-medium group-hover:underline">
                  {result.title}
                </h2>
              </a>
            </div>

            <p className="line-clamp-2">{result.snippet}</p>
          </div>
        ))}

        <PaginationButtons />
      </div>

      <div className="mx-auto w-full px-20 p-5 hidden lg:inline-flex flex-col">
        <div className="flex justify-between w-full py-5 mb-3 rounded-lg px-2 max-w-sm items-center bg-gray-50 dark:bg-gray-700">
          <h2 className="text-xl font-bold dark:text-gray-50">
            India Top HeadLines{" "}
          </h2>
          <div className="flex space-x-3 items-center">
            <span className="text-xs text-gray-600 dark:text-gray-100">
              {newsResults?.totalResults}
            </span>
            <MoonIcon
              onClick={() => setDarkMode(darkMode ? false : true)}
              className="h-10 w-10 p-2 rounded-full hover:bg-gray-200 cursor-pointer dark:bg-gray-100 dark:text-gray-700"
            />
          </div>
        </div>

        {newsResults?.articles?.map((article) => (
          <div
            key={article?.url}
            className="pb-2 mb-10 w-full max-w-sm bg-gray-100 group rounded-lg dark:bg-gray-700"
          >
            <img
              className="rounded-md"
              loading="lazy"
              src={article?.urlToImage}
            />

            <div className="px-4 py-2">
              <div className="flex justify-between py-2 pt-3">
                <p className="text-xs text-gray-500 dark:text-gray-100">
                  {article?.author}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-100">
                  Published At: {article.publishedAt.slice(0, 10)}
                </p>
              </div>

              <p className="text-sm text-gray-600 line-clamp-1 dark:text-gray-400">
                {article?.url}
              </p>

              <h2
                className="text-lg font-medium
               group-hover:underline text-blue-900 line-clamp-2 dark:text-gray-100"
              >
                {article?.title}
              </h2>

              <p className="line-clamp-1 text-gray-800 dark:text-gray-400">
                {article?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchResults;
