import { Link, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { LanguageContext } from "../context/LanguageContext";

function InstitutionDetails() {
  const { id } = useParams();
  const { language } = useContext(LanguageContext);

  const [institution, setInstitution] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInstitution = async () => {
      try {
        const res = await axios.get(
          "https://edubangla-portal.onrender.com/api/institutions"
        );

        const found = res.data.find(
          (item) => item._id === id
        );

        setInstitution(found || null);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchInstitution();
  }, [id]);

  if (loading) {
    return (
      <section className="py-10 text-center">
        <h1>Loading...</h1>
      </section>
    );
  }

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
    <section className="max-w-5xl mx-auto px-6 py-10 text-gray-900 dark:text-gray-100">
      <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-8">

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

        <div className="space-y-4">

          <p><strong>Category:</strong> {institution.category}</p>

          <p><strong>Type:</strong> {institution.type}</p>

          <p><strong>Division:</strong> {institution.division}</p>

          <p><strong>District:</strong> {institution.district}</p>

          <p><strong>Established:</strong> {institution.established || "N/A"}</p>

          <p><strong>Description:</strong> {institution.description || "N/A"}</p>

          <p>
            <strong>Website:</strong>{" "}
            {institution.website ? (
              <a
                href={institution.website}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline"
              >
                Visit Website
              </a>
            ) : (
              "N/A"
            )}
          </p>

        </div>

        <div className="mt-8">
          <Link
            to="/institutions"
            className="bg-blue-600 text-white px-6 py-3 rounded"
          >
            ← Back
          </Link>
        </div>

      </div>
    </section>
  );
}

export default InstitutionDetails;
