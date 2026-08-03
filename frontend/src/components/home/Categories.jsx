import { useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";

function Categories() {

  const { language } =
    useContext(LanguageContext);


  const categories = [
    {
      en: "University",
      bn: "বিশ্ববিদ্যালয়",
    },
    {
      en: "College",
      bn: "কলেজ",
    },
    {
      en: "School",
      bn: "স্কুল",
    },
    {
      en: "Polytechnic",
      bn: "পলিটেকনিক",
    },
    {
      en: "Medical College",
      bn: "মেডিকেল কলেজ",
    },
    {
      en: "Madrasa",
      bn: "মাদ্রাসা",
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
              ? "Institution Categories"
              : "প্রতিষ্ঠানের ধরন"
          }

        </h2>


        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">

          {categories.map((category) => (

            <div
              className="bg-white dark:bg-gray-800 rounded-xl
              shadow-md p-4 md:p-6 text-center hover:shadow-lg
              transition-colors"
            >

              <h3 className="text-base md:text-xl font-semibold text-gray-900
              dark:text-white">

                {
                  language === "en"
                    ? category.en
                    : category.bn
                }

              </h3>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Categories;
