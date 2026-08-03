import { useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";


function FeaturedInstitutions() {

  const { language } =
    useContext(LanguageContext);


  const institutions = [
    "University of Dhaka",
    "Bangladesh University of Engineering and Technology (BUET)",
    "University of Chittagong",
    "University of Rajshahi",
    "Jahangirnagar University",
    "Khulna University",
  ];


  return (
    <section className="py-12 md:py-16 bg-white dark:bg-gray-900
    transition-colors">

      <div className="max-w-7xl mx-auto px-4 md:px-6">


        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10
        text-gray-900 dark:text-white">

          {
            language === "en"
              ? "Featured Institutions"
              : "উল্লেখযোগ্য প্রতিষ্ঠান"
          }

        </h2>



        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {institutions.map((institution) => (

            <div
              key={institution}
              className="bg-white dark:bg-gray-800 rounded-xl
              border border-gray-200 dark:border-gray-700 p-4 md:p-6
              shadow hover:shadow-lg transition-colors"
            >


              <h3 className="text-lg md:text-xl font-semibold text-gray-900
              dark:text-white">
                {institution}
              </h3>



              <p className="mt-2 text-sm md:text-base text-gray-600
              dark:text-gray-300">

                {
                  language === "en"
                    ? "View institution details, admission information and more."
                    : "প্রতিষ্ঠানের বিস্তারিত তথ্য, ভর্তি তথ্য এবং আরও অনেক কিছু দেখুন।"
                }

              </p>



              <button
                className="mt-4 rounded-lg bg-blue-600 px-3 md:px-4 py-2 text-sm md:text-base text-white hover:bg-blue-700"
              >

                {
                  language === "en"
                    ? "View Details"
                    : "বিস্তারিত দেখুন"
                }

              </button>


            </div>

          ))}

        </div>


      </div>

    </section>
  );
}


export default FeaturedInstitutions;

