import { useMemo, useState, useContext, useEffect } from "react";
import InstitutionCard from "../components/InstitutionCard";
import axios from "axios";
import divisions from "../data/divisions";
import districts from "../data/districts";
import { LanguageContext } from "../context/LanguageContext";


function Institutions() {

  const [institutionsData, setInstitutionsData] = 
useState([]);

  useEffect(() => {

  const fetchInstitutions = async () => {

    try {

      const res = await axios.get(
        "https://edubangla-portal.onrender.com/api/institutions"
      );

      setInstitutionsData(res.data);

    } catch (error) {

      console.log(
        "Fetch Institutions Error:",
        error
      );

    }

  };


  fetchInstitutions();

}, []);

  const { language } = useContext(LanguageContext);


  const [search, setSearch] = useState("");
  const [division, setDivision] = useState("");
  const [district, setDistrict] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);


  const itemsPerPage = 9;


  const categories = [
    "University",
    "College",
    "School",
    "Polytechnic",
    "Medical College",
    "Madrasah",
  ];


  const filteredInstitutions = useMemo(() => {

    return institutionsData.filter((institution)=>{

      const matchSearch =
         search === "" ||
         institution.name
           .toLowerCase()
           .includes(search.toLowerCase());
        
     
        
        


      const matchDivision =
        division === "" ||
        institution.division === division;


      const matchDistrict =
        district === "" ||
        institution.district === district;


      const matchCategory =
        category === "" ||
        institution.category === category;


      const matchType =
        type === "" ||
        institution.type === type;


      return (
        matchSearch &&
        matchDivision &&
        matchDistrict &&
        matchCategory &&
        matchType
      );

    });

  },[
    search,
    division,
    district,
    category,
    type
  ]);


  const totalPages = Math.ceil(
    filteredInstitutions.length / itemsPerPage
  );


  const currentInstitutions =
    filteredInstitutions.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );


  return (

    <section className="max-w-7xl mx-auto px-4 md:px-6 py-10 
    text-gray-900 dark:text-gray-100 
    transition-colors">

      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
        {
          language === "en"
          ? "All Institutions"
          : "সকল প্রতিষ্ঠান"
        }
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">

        <input
          type="text"
          placeholder={
            language === "en"
            ? "Search Institution"
            : "প্রতিষ্ঠান খুঁজুন"
          }
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          className="w-full border p-3 rounded bg-white
          dark:bg-gray-800 text-black dark:text-white 
          border-gray-300 dark:border-gray-600"
        />


        <select
          value={division}
          onChange={(e)=>setDivision(e.target.value)}
          className="w-full border p-3 rounded bg-white 
          dark:bg-gray-800 text-black dark:text-white 
          border-gray-300 dark:border-gray-600"
        >

          <option value="">
            {
              language === "en"
              ? "All Divisions"
              : "সব বিভাগ"
            }
          </option>

          {
            divisions.map((item)=>(
              <option key={item.id} value={item.name}>
                {item.name}
              </option>
            ))
          }

        </select>



        <select
          value={district}
          onChange={(e)=>setDistrict(e.target.value)}
          className="w-full border p-3 rounded bg-white 
          dark:bg-gray-800 text-black dark:text-white 
          border-gray-300 dark:border-gray-600"
        >

          <option value="">
            {
              language === "en"
              ? "All Districts"
              : "সব জেলা"
            }
          </option>


          {
            districts.map((item)=>(
              <option key={item.id} value={item.name}>
                {item.name}
              </option>
            ))
          }

        </select>



        <select
          value={category}
          onChange={(e)=>setCategory(e.target.value)}
          className="w-full border p-3 rounded bg-white 
          dark:bg-gray-800 text-black dark:text-white 
          border-gray-300 dark:border-gray-600"
        >

          <option value="">
            {
              language === "en"
              ? "All Categories"
              : "সব ক্যাটাগরি"
            }
          </option>


          {
            categories.map((item)=>(
              <option key={item} value={item}>
                {item}
              </option>
            ))
          }

        </select>


      </div>



      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">


        {
          currentInstitutions.map((institution)=>(
            <InstitutionCard
              key={institution._id || institution.id}
              institution={institution}
            />
          ))
        }


      </div>



      <div className="flex flex-wrap justify-center items-center gap-4 mt-10">


        <button
          onClick={()=>setCurrentPage(currentPage-1)}
          disabled={currentPage === 1}
          className="border px-4 py-2 rounded 
          dark:border-gray-600 dark:bg-gray-800 
          dark:text-white"
        >

          {
            language === "en"
            ? "Previous"
            : "আগের"
          }

        </button>



        <span>
          {currentPage} / {totalPages || 1}
        </span>



        <button
          onClick={()=>setCurrentPage(currentPage+1)}
          disabled={currentPage === totalPages}
          className="border px-4 py-2 rounded 
          dark:border-gray-600 dark:bg-gray-800 
          dark:text-white"
        >

          {
            language === "en"
            ? "Next"
            : "পরবর্তী"
          }

        </button>


      </div>


    </section>

  );

}


export default Institutions;
