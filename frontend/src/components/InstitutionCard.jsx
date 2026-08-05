import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";


function InstitutionCard({ institution }) {

  const { language } =
    useContext(LanguageContext);


  const [saved, setSaved] =
    useState(() => {

      const data =
        JSON.parse(
          localStorage.getItem("savedInstitutions")
        ) || [];

      return data.some(
        (item) => (item._id || item.id) === (institution._id || 
      institution.id)

      );

    });



  const handleSave = () => {

    const data =
      JSON.parse(
        localStorage.getItem("savedInstitutions")
      ) || [];


    let updated;


    if(saved){

      updated =
        data.filter(
          (item)=> (item._id || item.id) !== (institution._id || institution.id)
        );

      setSaved(false);

    }
    else{

      updated = [
        ...data,
        institution
      ];

      setSaved(true);

    }


    localStorage.setItem(
      "savedInstitutions",
      JSON.stringify(updated)
    );

    console.log(updated);

    window.dispatchEvent(new Event("savedUpdated"));

   alert("Saved button clicked");

  };



  return (

    <div className="bg-white dark:bg-gray-800 
    rounded-xl shadow p-6 transition-colors 
    duration-300">


      {
        institution.logo && (

          <img
            src={institution.logo}
            alt={institution.name}
            className="w-24 h-24 object-cover rounded mb-4 mx-auto"
          />

        )
      }



      <h3 className="text-xl font-bold text-center">

        {institution.name}

      </h3>



      <p className="text-gray-600 dark:text-gray-300 
      mt-2">

        {
          language === "en"
          ? institution.category
          : institution.category === "University"
          ? "বিশ্ববিদ্যালয়"
          : institution.category === "College"
          ? "কলেজ"
          : institution.category === "School"
          ? "স্কুল"
          : institution.category === "Polytechnic"
          ? "পলিটেকনিক"
          : institution.category === "Medical College"
          ? "মেডিকেল কলেজ"
          : "মাদ্রাসা"
        }

      </p>



      <p className="text-gray-500 dark:text-gray-400">

        {
          language === "en"
          ? institution.division
          : institution.division
        }

      </p>



      <div className="flex gap-3 mt-5">


        <Link
          to={`/institutions/${institution._id || 
        institution.id}`}
          
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >

          {
            language === "en"
            ? "Details"
            : "বিস্তারিত"
          }

        </Link>




        <button
          onClick={handleSave}
          className="bg-yellow-500 text-white px-4 py-2 rounded"
        >

          {
            saved
            ?
            (
              language === "en"
              ? "Saved"
              : "সংরক্ষিত"
            )
            :
            (
              language === "en"
              ? "Save"
              : "সংরক্ষণ"
            )
          }

        </button>



      </div>



    </div>

  );

}


export default InstitutionCard;
