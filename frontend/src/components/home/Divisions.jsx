import { useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import divisions from "../../data/divisions";


function Divisions() {

  const { language } =
    useContext(LanguageContext);


  const divisionBangla = {
    Barishal: "বরিশাল",
    Chattogram: "চট্টগ্রাম",
    Dhaka: "ঢাকা",
    Khulna: "খুলনা",
    Mymensingh: "ময়মনসিংহ",
    Rajshahi: "রাজশাহী",
    Rangpur: "রংপুর",
    Sylhet: "সিলেট",
  };


  return (
    <section className="py-12 md:py-16 bg-white dark:bg-gray-900
    transition-colors">

      <div className="max-w-7xl mx-auto px-4 md:px-6">


        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">

          {divisions.map((division) => (

            <div
              className="bg-blue-100 dark:bg-gray-800 rounded-xl
              p-4 md:p-6 text-center shadow hover:shadow-lg
              transition-colors"
            >

              <h3 className="text-xl font-bold text-gray-900 
              dark:text-white">

                {
                  language === "en"
                    ? division.name
                    : divisionBangla[division.name]
                }

              </h3>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Divisions;
