import { useState } from "react";
import { Link } from "react-router-dom";

function SavedInstitutions() {

  const [saved, setSaved] = useState(() => {
    return (
      JSON.parse(localStorage.getItem("savedInstitutions")) || []
    );
  });


  const handleRemove = (id) => {

    const updated = saved.filter(
      (item) => (item._id || item.id) !== id
    );

    setSaved(updated);

    localStorage.setItem(
      "savedInstitutions",
      JSON.stringify(updated)
    );

    window.dispatchEvent(
      new Event("savedUpdated")
    );
  };


  return (
    <section className="max-w-7xl mx-auto px-6 py-10 
    text-gray-900 dark:text-gray-100 
    transition-colors">

      <h1 className="text-3xl font-bold text-center mb-8 
      text-gray-900 dark:text-white">
        ❤️ Saved Institutions
      </h1>


      {saved.length === 0 ? (

        <p className="text-center text-gray-500 dark:text-gray-300">
          No saved institutions yet.
        </p>

      ) : (

        <div className="grid md:grid-cols-3 gap-6">

          {saved.map((item) => (

            <div
              key={item._id || item.id}
              className="bg-white dark:bg-gray-800 border 
              border-gray-200 dark:border-gray-700 shadow 
              rounded-xl p-5 transition-colors"
            >

              <Link
                to={`/institutions/${item._id || item.id}`}
                className="text-xl font-bold text-blue-600 dark:text-blue-400"
              >
                {item.name}
              </Link>


              <p className="mt-2 text-gray-700 dark:text-gray-300">
                {item.category}
              </p>


              <p className="text-gray-700 dark:text-gray-300">
                {item.division}
              </p>


              <button
                onClick={() => handleRemove(item._id || item.id)}
                className="mt-4 bg-red-600 hover:bg-red-700 
                text-white px-4 py-2 rounded transition-colors"
              >
                Remove
              </button>


            </div>

          ))}

        </div>

      )}

    </section>
  );
}

export default SavedInstitutions;
