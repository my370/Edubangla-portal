import { Link, useParams } from "react-router-dom";
import { useContext } from "react";
import institutionsData from "../data/institutions";
import { LanguageContext } from "../context/LanguageContext";

function InstitutionDetails() {
  const { id } = useParams();

const { language } = useContext(LanguageContext);

const institution = institutionsData.find(
  (item) => item.id === Number(id)

);

  if (!institution) {
    return (
      <section className="py-10 text-center">
        <h1 className="text-3xl font-bold">
          {language === "en"
            ? "Institution Not Found"
            : "প্রতিষ্ঠান পাওয়া যায়নি"}
        </h1>
      </section>
    );
  }

  return (
    <section className="max-w-5xl mx-auto px-6 py-10 
    text-gray-900 dark:text-gray-100 
    transition-colors">
      <div className="bg-white dark:bg-gray-800 shadow 
      rounded-xl p-8 transition-colors">

        {institution.logo && (
          <img
            src={institution.logo}
            alt={institution.name}
            className="w-32 h-32 object-cover rounded mx-auto mb-6"
          />
        )}

        <h1 className="text-4xl font-bold text-center mb-6">
          {institution.name}
        </h1>

        <div className="space-y-4 text-lg text-gray-700
        dark:text-gray-300">

          <p>
            <strong>
              {language === "en" ? "Category:" : "ধরন:"}
            </strong>{" "}
            {institution.category}
          </p>

          <p>
            <strong>
              {language === "en" ? "Division:" : "বিভাগ:"}
            </strong>{" "}
            {institution.division}
          </p>

          <p>
            <strong>
              {language === "en" ? "District:" : "জেলা:"}
            </strong>{" "}
            {institution.district || "N/A"}
          </p>

          <p>
            <strong>
              {language === "en" ? "Address:" : "ঠিকানা:"}
            </strong>{" "}
            {institution.address || "N/A"}
          </p>

          <p>
            <strong>
              {language === "en" ? "Website:" : "ওয়েবসাইট:"}
            </strong>{" "}
            {institution.website ? (
              <a
                href={institution.website}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 dark:text-blue-400
                underline"
              >
                {language === "en"
                  ? "Visit Website"
                  : "ওয়েবসাইট দেখুন"}
              </a>
            ) : (
              "N/A"
            )}
          </p>

          <p>
            <strong>
              {language === "en" ? "Email:" : "ইমেইল:"}
            </strong>{" "}
            {institution.email || "N/A"}
          </p>

          <p>
            <strong>
              {language === "en" ? "Phone:" : "ফোন:"}
            </strong>{" "}
            {institution.phone || "N/A"}
          </p>

        </div>

        <div className="mt-8">
          <Link
            to="/institutions"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            {language === "en"
              ? "← Back to Institutions"
              : "← প্রতিষ্ঠানে ফিরে যান"}
          </Link>
        </div>

      </div>
    </section>
  );
}

export default InstitutionDetails;

