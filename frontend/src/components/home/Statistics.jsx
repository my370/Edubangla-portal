import { useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";

function Statistics() {

  const { language } =
    useContext(LanguageContext);


  return (
    <section className="py-12 md:py-16 bg-white dark:bg-gray-900
    transition-colors">

      <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-2 md:grid-cols-4 gap-6">


        <div className="bg-blue-100 dark:bg-gray-800 
        rounded-xl p-4 md:p-6 text-center transition-colors">

          <h2 className="text-2xl md:text-3xl font-bold text-blue-700">
            8
          </h2>

          <p className="text-gray-700 dark:text-gray-300">
            {
              language === "en"
                ? "Divisions"
                : "বিভাগ"
            }
          </p>

        </div>


        <div className="bg-green-100 dark:bg-gray-800 
        rounded-xl p-4 md:p-6 text-center transition-colors">

          <h2 className="text-2xl md:text-3xl font-bold text-green-700">
            64
          </h2>

          <p className="text-sm md:text-base text-gray-700 dark:text-gray-300">
            {
              language === "en"
                ? "Districts"
                : "জেলা"
            }
          </p>

        </div>


        <div className="bg-yellow-100 dark:bg-gray-800 
        rounded-xl p-4 md:p-6 text-center transition-colors">

          <h2 className="text-2xl md:text-3xl font-bold text-yellow-700">
            5000+
          </h2>

          <p className="text-sm md:text-base text-gray-700 dark:text-gray-300">
            {
              language === "en"
                ? "Institutions"
                : "প্রতিষ্ঠান"
            }
          </p>

        </div>


        <div className="bg-red-100 dark:bg-gray-800 
        rounded-xl p-4 md:p-6 text-center transition-colors">

          <h2 className="text-2xl md:text-3xl font-bold text-red-700">
            100000+
          </h2>

          <p className="text-sm md:text-base text-gray-700 dark:text-gray-300">
            {
              language === "en"
                ? "Students"
                : "শিক্ষার্থী"
            }
          </p>

        </div>


      </div>

    </section>
  );
}

export default Statistics;
