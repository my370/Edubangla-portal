import { useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";


function LatestNews() {

  const { language } =
    useContext(LanguageContext);


  const news = [
    {
      title: "Education Board Results",
      bnTitle: "শিক্ষা বোর্ডের ফলাফল",

      description:
        "Education Board announced the HSC results.",

      bnDescription:
        "শিক্ষা বোর্ড এইচএসসি পরীক্ষার ফলাফল প্রকাশ করেছে।",
    },

    {
      title: "Government Scholarship",
      bnTitle: "সরকারি বৃত্তি",

      description:
        "Applications are now open for government scholarships.",

      bnDescription:
        "সরকারি বৃত্তির জন্য আবেদন শুরু হয়েছে।",
    },
  ];


  return (
    <section className="py-12 md:py-16 bg-gray-50
    dark:bg-gray-900 transition-colors">

      <div className="max-w-7xl mx-auto px-4 md:px-6">


        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10
        text-gray-900 dark:text-white">
 
          {
            language === "en"
              ? "Latest Education News"
              : "সর্বশেষ শিক্ষা সংবাদ"
          }

        </h2>



        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {news.map((item) => (

            <div
              key={item.title}
              className="bg-white dark:bg-gray-800 rounded-xl
              shadow p-4 md:p-6 transition-colors"
            >


              <h3 className="text-lg md:text-xl font-semibold text-gray-900
              dark:text-white">

                {
                  language === "en"
                    ? item.title
                    : item.bnTitle
                }

              </h3>



              <p className="mt-3 text-sm md:text-base text-gray-600
              dark:text-gray-300">

                {
                  language === "en"
                    ? item.description
                    : item.bnDescription
                }

              </p>



              <button
                className="mt-4 bg-blue-600 text-white px-3 md:px-4 
                py-2 text-sm md:text-base rounded-lg"
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


export default LatestNews;
