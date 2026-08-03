import { useState, useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";
import admissions from "../data/admissions";

function Admission() {

  const { language } = useContext(LanguageContext);

  const [search, setSearch] = useState("");
  const [division, setDivision] = useState("");
  const [status, setStatus] = useState("");

  const divisions = [
    "Dhaka",
    "Chittagong",
    "Rajshahi",
    "Khulna",
    "Barisal",
    "Sylhet",
    "Rangpur",
    "Mymensingh",
];

const divisionBangla = {
  Dhaka: "ঢাকা",
  Chittagong: "চট্টগ্রাম",
  Rajshahi: "রাজশাহী",
  Khulna: "খুলনা",
  Barisal: "বরিশাল",
  Sylhet: "সিলেট",
  Rangpur: "রংপুর",
  Mymensingh: "ময়মনসিংহ",
};


  const filteredAdmissions = admissions.filter((item) => {

    const matchSearch =
      item.institutionName
        .toLowerCase()
        .includes(search.toLowerCase());


    const matchDivision =
      division === "" ||
      item.division === division;


    const matchStatus =
      status === "" ||
      item.admissionStatus === status;


    return (
      matchSearch &&
      matchDivision &&
      matchStatus
    );

  });


  return (

    <section className="max-w-7xl mx-auto px-6 py-10 text-gray-900 dark:text-white">


      <h1 className="text-3xl md:text-4xl font-bold text-center">
          {
           language === "en"
           ? "Admission Portal"
           : "ভর্তি পোর্টাল"
          }
      </h1>


      <p className="text-center mt-4 text-gray-600 dark:text-gray-300">
          {
            language === "en"
              ? "Find admission information from educational institutions across Bangladesh."
              : "বাংলাদেশের বিভিন্ন শিক্ষা প্রতিষ্ঠানের ভর্তি সংক্রান্ত তথ্য খুঁজুন।"
          }
      </p>



      <div className="grid md:grid-cols-3 gap-4 mt-8">


        <input
          type="text"
          placeholder={
            language === "en"
              ? "Search Institution..."
              : "প্রতিষ্ঠান খুঁজুন..."
          }
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-xl p-4 bg-white dark:bg-gray-800"
        />


        <select
          value={division}
          onChange={(e)=>setDivision(e.target.value)}
          className="border rounded-xl p-4 bg-white dark:bg-gray-800"
        >

          <option value="">
            {
              language === "en"
                ? "All Divisions"
                : "সব বিভাগ"
            }
          </option>

          {divisions.map((div) => (
            <option key={div} value={div}>
              {
                language === "en"
                  ? div
                  : divisionBangla[div]
              }
            </option>
          ))}

        </select>



        <select
          value={status}
          onChange={(e)=>setStatus(e.target.value)}
          className="border rounded-xl p-4 bg-white dark:bg-gray-800"
        >

          <option value="">
            {
              language === "en"
                ? "All Status"
                : "সব স্ট্যাটাস"
            }
          </option>

          <option value="Ongoing">
            {
              language === "en"
                ? "Ongoing"
                : "চলমান"
            }
          </option>

          <option value="Upcoming">
            {
              language === "en"
                ? "Upcoming"
                : "আসছে"
            }
          </option>

          <option value="Closed">
            {
              language === "en"
                ? "Closed"
                : "বন্ধ"
            }
          </option>

        </select>


      </div>




      <div className="grid md:grid-cols-3 gap-6 mt-10">


        {filteredAdmissions.map((item)=>(


          <div
            key={item.id}
            className="bg-white dark:bg-gray-800 shadow rounded-xl p-6 transition-colors hover:shadow-lg"
          >

            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          {item.institutionName}
            </h2>

            <p className="mt-2 text-gray-700 dark:text-gray-300">
             {
               language === "en"
                 ? "Category: "
                 : "ক্যাটাগরি: "
             }
             {item.category}
            </p>

            <p className="text-gray-700 dark:text-gray-300">
             {
               language === "en"
                 ? "Program: "
                 : "প্রোগ্রাম: "
             }
             {item.program}
            </p>

            <p className="text-gray-700 dark:text-gray-300">
             {
               language === "en"
                 ? "Division: "
                 : "বিভাগ: "
             }
             {
               language === "en"
                 ? item.division
                 : divisionBangla[item.division] || item.division
             }
            </p>

            <p className="text-gray-700 dark:text-gray-300">
             {
               language === "en"
                 ? "Deadline: "
                 : "শেষ তারিখ: "
             }

             {
               item.deadline
                 ? item.deadline
                 : (
                     language === "en"
                       ? "Not announced"
                       : "এখনও ঘোষণা করা হয়নি"
                   )
             }
           </p>

            <p className="mt-2 text-gray-700 dark:text-gray-300">
             {
               language === "en"
                 ? "Website: "
                 : "ওয়েবসাইট: "
             }

            <a
               href={item.officialWebsite}
               target="_blank"
               rel="noopener noreferrer"
               className="ml-1 text-blue-600 hover:underline"
            >
             {
               language === "en"
                 ? "Visit"
                 : "ভিজিট করুন"
             }
           </a>
         </p>

         <p
            className={`mt-3 inline-block px-3 py-1 rounded-full text-sm font-semibold ${
            item.admissionStatus === "Ongoing"
              ? "bg-green-100 text-green-700"
              : item.admissionStatus === "Upcoming"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-700"
          }`}
       >
         {
            item.admissionStatus === "Ongoing"
              ? (language === "en" ? "🟢 Ongoing" : "🟢 চলমান")
              : item.admissionStatus === "Upcoming"
              ? (language === "en" ? "🟡 Upcoming" : "🟡 আসছে")
              : (language === "en" ? "🔴 Closed" : "🔴 বন্ধ")
         }
       </p>

       <div className="mt-5 flex flex-wrap gap-3">

       <a
          href={item.applyLink}
          target="_blank"
          rel="noopener noreferrer"
         className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
       >
         {
           language === "en"
             ? "Apply Now"
             : "এখনই আবেদন করুন"
         }
       </a>
 
       <a
          href={`/admission/${item.id}`}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
       >
         {
           language === "en"
             ? "View Details"
             : "বিস্তারিত দেখুন"
         }
       
      </a>

      </div>

      </div>

      ))}

      </div>

      {filteredAdmissions.length === 0 && (

        <p className="text-center mt-10">
           No admission found.
        </p>

      )}

    </section>

  );

}


export default Admission;
