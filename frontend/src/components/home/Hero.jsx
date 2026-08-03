import { useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";

function Hero() {

  const { language } =
    useContext(LanguageContext);

  return (
    <section className="bg-blue-50 dark:bg-gray-900 
    py-12 md:py-20 transition-colors">

      <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">

        <h1 className="text-3xl md:text-5xl font-bold text-gray-900
        dark:text-white">

          {
            language === "en"
              ? "Bangladesh Education Platform"
              : "বাংলাদেশ শিক্ষা প্ল্যাটফর্ম"
          }

        </h1>


        <p className="mt-6 text-base md:text-lg text-gray-600
        dark:text-gray-300">

          {
            language === "en"
              ? "Find schools, colleges, universities, admissions and scholarships across Bangladesh."
              : "বাংলাদেশের স্কুল, কলেজ, বিশ্ববিদ্যালয়, ভর্তি তথ্য এবং বৃত্তি খুঁজে পান।"
          }

        </p>


        <div className="mt-10">

          <button className="bg-blue-600 text-white px-5 md:px-6 py-3 rounded-lg hover:bg-blue-700">

            {
              language === "en"
                ? "Explore Institutions"
                : "প্রতিষ্ঠান দেখুন"
            }

          </button>

        </div>

      </div>

    </section>
  );
}

export default Hero;
