import { useParams, Link } from "react-router-dom";
import { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";
import admissions from "../data/admissions";

function AdmissionDetails() {
  const { language } = useContext(LanguageContext);
  const { id } = useParams();

  const admission = admissions.find(
    (item) => (item._id || item.id) === id
  );

  if (!admission) {
    return (
      <section className="max-w-4xl mx-auto px-6 py-16 text-center text-gray-900 dark:text-white">

        <h1 className="text-3xl font-bold">
          {
            language === "en"
              ? "Admission Not Found"
              : "ভর্তির তথ্য পাওয়া যায়নি"
          }
        </h1>

        <Link
          to="/admission"
          className="inline-block mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
        >
          {
            language === "en"
              ? "Back to Admission"
              : "ভর্তি পোর্টালে ফিরে যান"
          }
        </Link>

      </section>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-6 py-10 text-gray-900 dark:text-white">

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8">

        {/* Institution Header */}

        <h1 className="text-3xl md:text-4xl font-bold text-center">
          {admission.institutionName}
        </h1>

        <p className="text-center mt-3 text-lg text-gray-600 dark:text-gray-300">
          {admission.program}
        </p>


        {/* Main Information */}

        <div className="grid md:grid-cols-2 gap-6 mt-10">

          {/* Category */}

          <div>
            <h2 className="font-bold">
              {
                language === "en"
                  ? "Category"
                  : "ক্যাটাগরি"
              }
            </h2>

            <p className="mt-1">
              {admission.category}
            </p>
          </div>


          {/* Type */}

          <div>
            <h2 className="font-bold">
              {
                language === "en"
                  ? "Type"
                  : "ধরন"
              }
            </h2>

            <p className="mt-1">
              {admission.type}
            </p>
          </div>


          {/* Division */}

          <div>
            <h2 className="font-bold">
              {
                language === "en"
                  ? "Division"
                  : "বিভাগ"
              }
            </h2>

            <p className="mt-1">
              {admission.division}
            </p>
          </div>


          {/* District */}

          <div>
            <h2 className="font-bold">
              {
                language === "en"
                  ? "District"
                  : "জেলা"
              }
            </h2>

            <p className="mt-1">
              {admission.district}
            </p>
          </div>


          {/* Admission Status */}

          <div>
            <h2 className="font-bold">
              {
                language === "en"
                  ? "Admission Status"
                  : "ভর্তির স্ট্যাটাস"
              }
            </h2>

            <p
              className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-semibold ${
                admission.admissionStatus === "Ongoing"
                  ? "bg-green-100 text-green-700"
                  : admission.admissionStatus === "Upcoming"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {
                admission.admissionStatus === "Ongoing"
                  ? (
                      language === "en"
                        ? "🟢 Ongoing"
                        : "🟢 চলমান"
                    )
                  : admission.admissionStatus === "Upcoming"
                  ? (
                      language === "en"
                        ? "🟡 Upcoming"
                        : "🟡 আসছে"
                    )
                  : (
                      language === "en"
                        ? "🔴 Closed"
                        : "🔴 বন্ধ"
                    )
              }
            </p>
          </div>


          {/* Application Deadline */}

          <div>
            <h2 className="font-bold">
              {
                language === "en"
                  ? "Application Deadline"
                  : "আবেদনের শেষ তারিখ"
              }
            </h2>

            <p className="mt-1">
              {
                admission.applicationDeadline ||
                admission.deadline ||
                (
                  language === "en"
                    ? "Not Announced"
                    : "ঘোষণা করা হয়নি"
                )
              }
            </p>
          </div>


          {/* Application Start */}

          <div>
            <h2 className="font-bold">
              {
                language === "en"
                  ? "Application Start"
                  : "আবেদন শুরুর তারিখ"
              }
            </h2>

            <p className="mt-1">
              {
                admission.applicationStartDate ||
                (
                  language === "en"
                    ? "Not Announced"
                    : "ঘোষণা করা হয়নি"
                )
              }
            </p>
          </div>


          {/* Exam Date */}

          <div>
            <h2 className="font-bold">
              {
                language === "en"
                  ? "Exam Date"
                  : "পরীক্ষার তারিখ"
              }
            </h2>

            <p className="mt-1">
              {
                admission.examDate ||
                (
                  language === "en"
                    ? "Not Announced"
                    : "ঘোষণা করা হয়নি"
                )
              }
            </p>
          </div>


          {/* Application Fee */}

          <div>
            <h2 className="font-bold">
              {
                language === "en"
                  ? "Application Fee"
                  : "আবেদন ফি"
              }
            </h2>

            <p className="mt-1">
              {
                admission.applicationFee ||
                (
                  language === "en"
                    ? "Not Announced"
                    : "ঘোষণা করা হয়নি"
                )
              }
            </p>
          </div>

        </div>


        {/* Eligibility */}

        <div className="mt-10">

          <h2 className="text-2xl font-bold">
            {
              language === "en"
                ? "Eligibility"
                : "যোগ্যতা"
            }
          </h2>

          <p className="mt-3 text-gray-700 dark:text-gray-300">
            {
              admission.eligibility ||
              (
                language === "en"
                  ? "Eligibility information is not available."
                  : "যোগ্যতার তথ্য বর্তমানে পাওয়া যায়নি।"
              )
            }
          </p>

        </div>


        {/* Description */}

        <div className="mt-8">

          <h2 className="text-2xl font-bold">
            {
              language === "en"
                ? "Description"
                : "বিবরণ"
            }
          </h2>

          <p className="mt-3 text-gray-700 dark:text-gray-300">
            {admission.description}
          </p>

        </div>


        {/* Buttons */}

        <div className="flex flex-wrap gap-4 mt-10">

          {/* Apply */}

          <Link
            to={`/apply/${admission.id}`}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            {language === "en"
              ? "Apply Now"
              : "এখনই আবেদন করুন"}
          </Link>


          {/* Official Website */}

          <a
            href={admission.officialWebsite}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            {
              language === "en"
                ? "Official Website"
                : "অফিসিয়াল ওয়েবসাইট"
            }
          </a>


          {/* Back */}

          <Link
            to="/admission"
            className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded-lg transition-colors"
          >
            {
              language === "en"
                ? "Back"
                : "ফিরে যান"
            }
          </Link>

        </div>

      </div>

    </section>
  );
}

export default AdmissionDetails;
