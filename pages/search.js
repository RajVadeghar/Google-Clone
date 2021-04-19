import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import Header from "../components/Header";
import SearchResults from "../components/SearchResults";
import { GOOGLE_API_KEY, GOOGLE_CONTEXT_KEY, NEWS_API_KEY } from "../keys";
import Response from "../Response";

function Search({ results, newsResults }) {
  const [darkMode, setDarkMode] = useState(false);
  const router = useRouter();

  return (
    <div className={darkMode && "dark"}>
      <Head>
        <title>{router.query.term} - Google Search</title>
      </Head>

      <Header />

      <SearchResults
        results={results}
        newsResults={newsResults}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
    </div>
  );
}

export default Search;

export async function getServerSideProps(context) {
  const useDummyData = true;
  const startIndex = context.query.start || "0";

  const data = useDummyData
    ? Response
    : await fetch(
        `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${GOOGLE_CONTEXT_KEY}&q=${context.query.term}&start=${startIndex}`
      ).then((response) => response.json());

  const newsData = await fetch(`
  https://newsapi.org/v2/top-headlines?country=in&apiKey=${NEWS_API_KEY}`).then(
    (response) => response.json()
  );

  return {
    props: {
      results: data,
      newsResults: newsData,
    },
  };
}
