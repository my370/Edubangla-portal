import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [savedInstitutions, setSavedInstitutions] =
    useState([]);
 const [name, setName] = useState(user?.name || "");
 const [email, setEmail] = useState(user?.email || "");
 const [photo, setPhoto] = useState(user?.photo || "");
const chartData = [
  {
    name: "Saved",
    total: savedInstitutions.length,
  },
]; 
 useEffect(() => {
    const saved =
      JSON.parse(
        localStorage.getItem("savedInstitutions")
      ) || [];

    setSavedInstitutions(saved);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };
 const handleProfileUpdate = () => {

  const updatedUser = {
    ...user,
    name,
    email,
    photo,
  };

  localStorage.setItem(
    "user",
    JSON.stringify(updatedUser)
  );

  alert("Profile Updated Successfully");

};
  const removeSaved = (id) => {
    const updated =
      savedInstitutions.filter(
        (item) => (item._id || item.id) !== id
      );

    localStorage.setItem(
      "savedInstitutions",
      JSON.stringify(updated)
    );

    setSavedInstitutions(updated);
  };

  if (!user) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-bold">
          Please Login First
        </h1>
      </div>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-4 md:px-6 py-10 
    text-gray-900 dark:text-white transition-colors">

      <h1 className="text-2xl md:text-3xl font-bold mb-8">
        User Dashboard
    </h1>

      <div className="bg-white dark:bg-gray-800 shadow 
       rounded-xl p-4 md:p-8 mb-8 transition-colors">

        <h2 className="text-xl md:text-2xl font-bold mb-4">
          Profile Information
        </h2>
          
        
      
 {photo && (
  <div className="mb-6 flex justify-center">
     <img
       src={photo}
       alt="Profile"
       className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-blue-500"
       />
  </div>
)}
        <div  className="mb-4">
         <label className="block font-semibold mb-2">
           Name
         </label>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded-lg p-3 bg-white 
          dark:bg-gray-700 dark:text-white"
        />
      </div>
        <div className="mb-4">

  <label className="block font-semibold mb-2">
    Email
  </label>
  <input
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    className="w-full border rounded-lg p-3 bg-white
    dark:bg-gray-700 dark:text-white"
  />

</div>

<div className="mb-4">
  <label className="block font-semibold mb-2">
    Profile Photo URL
  </label>

  <input
    type="text"
    value={photo}
    onChange={(e) => setPhoto(e.target.value)}
    placeholder="https://example.com/photo.jpg"
    className="w-full border rounded-lg p-3 bg-white 
    dark:bg-gray-700 dark:text-white"
  />
</div>

<button
  onClick={handleProfileUpdate}
 
  className="bg-green-600 text-white px-6 py-3 rounded"
>
  Save Profile
</button>
        <p>
          <strong>Email:</strong> {user.email}
        </p>

        <p>
          <strong>Role:</strong> {user.role}
        </p>

        <button
          onClick={handleLogout}
          className="mt-6 bg-red-600 text-white px-6 py-3 rounded"
        >
          Logout
        </button>

      </div>
      <div className="bg-white dark:bg-gray-800 shadow 
      rounded-xl p-8 transition-colors">

     <div className="bg-white dark:bg-gray-800 shadow
     rounded-xl p-4 md:p-6 mb-8 transition-colors">
  <h2 className="text-xl md:text-2xl font-bold mb-4">
    Saved Institutions Chart
  </h2>

  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={chartData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="total" />
     </BarChart>
    </ResponsiveContainer>
     </div>  
      <h2 className="text-xl md:text-2xl font-bold mb-6">
        Saved Institutions
      </h2>

        <p className="mb-6">
          Total Saved: {savedInstitutions.length}
        </p>

        {savedInstitutions.length === 0 ? (

          <p>No saved institutions found.</p>

        ) : (

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {savedInstitutions.map((institution) => (

              <div
                key={institution._id || institution.id}
                className="border rounded-lg p-4 bg-white 
              dark:bg-gray-700 transition-colors"
              >
                
                 
               

                <h3 className="text-lg font-bold">
                  {institution.name}
                </h3>

                <p>{institution.category}</p>

                <p>{institution.division}</p>

                <div className="flex flex-col sm:flex-row gap-3 mt-4">

                  <Link
                    to={`/institutions/${institution._id || institution.id}`}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    Details
                  </Link>

                  <button
                    onClick={() =>
                      removeSaved(institution._id || institution.id)
                    }
                    className="bg-red-600 text-white px-4 py-2 rounded"
                  >
                    Remove
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>
    </section>
  );
}

export default Dashboard;
