import { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";
import news from "../data/news";

function News() {

  const { language } = useContext(LanguageContext);

  return (
    <section className="py-12 md:py-16 bg-gray-50 dark:bg-gray-900">

      <div className="max-w-7xl mx-auto px-4 md:px-6">

        <h1 className="text-2xl md:text-3xl font-bold text-center mb-10 text-gray-900 dark:text-white">
          {
            language === "en"
              ? "Latest Education News"
              : "সর্বশেষ শিক্ষা সংবাদ"
          }
        </h1>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {news.map((item) => (

            <div
              key={item.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 md:p-6"
            >

              <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">
  {
    language === "en"
      ? item.title
      : item.bnTitle
  }
</h2>

<p className="mt-3 text-sm md:text-base text-gray-600 dark:text-gray-300">
  {
    language === "en"
      ? item.description
      : item.bnDescription
  }
</p>

<p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
  {
    language === "en"
      ? "Published: "
      : "প্রকাশের তারিখ: "
  }
  {item.date}
</p>

<p className="mt-2 text-sm text-blue-600 font-medium">
  {item.category}
</p>

<button
  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
>
  {
    language === "en"
      ? "Read More"
      : "আরও পড়ুন"
  }
</button>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default News;
