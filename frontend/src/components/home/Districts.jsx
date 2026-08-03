import { useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import districts from "../../data/districts";

function Districts() {

  const { language } =
    useContext(LanguageContext);

  const districtBangla = {
    Barishal: "বরিশাল",
    Barguna: "বরগুনা",
    Bhola: "ভোলা",
    Jhalokathi: "ঝালকাঠি",
    Patuakhali: "পটুয়াখালী",
    Pirojpur: "পিরোজপুর",

    Bandarban: "বান্দরবান",
    Brahmanbaria: "ব্রাহ্মণবাড়িয়া",
    Chandpur: "চাঁদপুর",
    Chattogram: "চট্টগ্রাম",
    Cumilla: "কুমিল্লা",
    "Cox's Bazar": "কক্সবাজার",
    Feni: "ফেনী",
    Khagrachhari: "খাগড়াছড়ি",
    Lakshmipur: "লক্ষ্মীপুর",
    Noakhali: "নোয়াখালী",
    Rangamati: "রাঙামাটি",

    Dhaka: "ঢাকা",
    Faridpur: "ফরিদপুর",
    Gazipur: "গাজীপুর",
    Gopalganj: "গোপালগঞ্জ",
    Kishoreganj: "কিশোরগঞ্জ",
    Madaripur: "মাদারীপুর",
    Manikganj: "মানিকগঞ্জ",
    Munshiganj: "মুন্সিগঞ্জ",
    Narayanganj: "নারায়ণগঞ্জ",
    Narsingdi: "নরসিংদী",
    Rajbari: "রাজবাড়ী",
    Shariatpur: "শরীয়তপুর",
    Tangail: "টাঙ্গাইল",

    Khulna: "খুলনা",
    Bagerhat: "বাগেরহাট",
    Chuadanga: "চুয়াডাঙ্গা",
    Jashore: "যশোর",
    Jhenaidah: "ঝিনাইদহ",
    Kushtia: "কুষ্টিয়া",
    Magura: "মাগুরা",
    Meherpur: "মেহেরপুর",
    Narail: "নড়াইল",
    Satkhira: "সাতক্ষীরা",

    Jamalpur: "জামালপুর",
    Mymensingh: "ময়মনসিংহ",
    Netrokona: "নেত্রকোনা",
    Sherpur: "শেরপুর",

    Bogura: "বগুড়া",
    Joypurhat: "জয়পুরহাট",
    Naogaon: "নওগাঁ",
    Natore: "নাটোর",
    "Chapai Nawabganj": "চাঁপাইনবাবগঞ্জ",
    Pabna: "পাবনা",
    Rajshahi: "রাজশাহী",
    Sirajganj: "সিরাজগঞ্জ",

    Dinajpur: "দিনাজপুর",
    Gaibandha: "গাইবান্ধা",
    Kurigram: "কুড়িগ্রাম",
    Lalmonirhat: "লালমনিরহাট",
    Nilphamari: "নীলফামারী",
    Panchagarh: "পঞ্চগড়",
    Rangpur: "রংপুর",
    Thakurgaon: "ঠাকুরগাঁও",

    Habiganj: "হবিগঞ্জ",
    Moulvibazar: "মৌলভীবাজার",
    Sunamganj: "সুনামগঞ্জ",
    Sylhet: "সিলেট",
  };


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
    <section className="py-12 md:py-16 bg-gray-50
    dark:bg-gray-900 transition-colors">
 
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10
        text-gray-900 dark:text-white">
          {
            language === "en"
              ? "Districts of Bangladesh"
              : "বাংলাদেশের জেলা"
          }
        </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">

          {districts.map((district) => (

            <div
              key={district.id}
              className="bg-white dark:bg-gray-800 border
              border-gray-200 dark:border-gray-700 rounded-lg p-3 md:p-4
              text-center shadow hover:shadow-md
              transition-colors"
            >

              <h3 className="text-sm md:text-base font-semibold text-gray-900
              dark:text-white">
                {
                  language === "en"
                    ? district.name
                    : districtBangla[district.name]
                }
              </h3>

              <p className="text-xs md:text-sm text-gray-500
              dark:text-gray-300">
                {
                  language === "en"
                    ? district.division
                    : divisionBangla[district.division]
                }
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Districts;
