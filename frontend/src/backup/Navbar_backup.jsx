import { Link, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { LanguageContext } from "../context/LanguageContext";
import { ThemeContext } from "../context/ThemeContext";


function Navbar() {

  const navigate = useNavigate();

  const { language, toggleLanguage } =
    useContext(LanguageContext);

  const { theme, toggleTheme } =
    useContext(ThemeContext);


  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );


  const [savedCount, setSavedCount] = useState(0);



  useEffect(() => {

    const updateUser = () => {

      setUser(
        JSON.parse(localStorage.getItem("user"))
      );

    };


    const updateSavedCount = () => {

      const saved =
        JSON.parse(
          localStorage.getItem("savedInstitutions")
        ) || [];

      setSavedCount(saved.length);

    };


    updateUser();
    updateSavedCount();


    window.addEventListener(
      "userUpdated",
      updateUser
    );


    window.addEventListener(
      "savedUpdated",
      updateSavedCount
    );



    return () => {

      window.removeEventListener(
        "userUpdated",
        updateUser
      );


      window.removeEventListener(
        "savedUpdated",
        updateSavedCount
      );

    };


  }, []);




  const handleLogout = () => {

    localStorage.removeItem("user");
    localStorage.removeItem("token");

    setUser(null);

    window.dispatchEvent(
      new Event("userUpdated")
    );

    navigate("/login");

  };




  return (

    <nav className="bg-white shadow-md dark:bg-gray-800">

      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">


        <h1 className="text-2xl font-bold text-blue-600">
          {language === "en"
            ? "Education Portal"
            : "শিক্ষা পোর্টাল"}
        </h1>



        <div className="flex items-center gap-5">


          <Link to="/">
            {language === "en" ? "Home" : "হোম"}
          </Link>


          <Link to="/institutions">
            {language === "en"
              ? "Institutions"
              : "প্রতিষ্ঠান"}
          </Link>


          <Link to="/admission">
            {language === "en"
              ? "Admission"
              : "ভর্তি"}
          </Link>


          <Link to="/scholarships">
            {language === "en"
              ? "Scholarships"
              : "বৃত্তি"}
          </Link>


          <Link to="/news">
            {language === "en"
              ? "News"
              : "খবর"}
          </Link>



          {
            user && (
              <Link to="/dashboard">
                {language === "en"
                  ? "Dashboard"
                  : "ড্যাশবোর্ড"}
              </Link>
            )
          }



          {
            user && user.role === "Admin" && (
              <Link to="/admin">
                {language === "en"
                  ? "Admin Panel"
                  : "অ্যাডমিন প্যানেল"}
              </Link>
            )
          }



          <Link
            to="/saved"
            className="font-semibold text-red-500"
          >
            ❤️ {language === "en"
              ? "Saved"
              : "সংরক্ষিত"} ({savedCount})
          </Link>



          <button
            onClick={toggleLanguage}
            className="border px-3 py-1 rounded"
          >
            {language === "en"
              ? "বাংলা"
              : "English"}
          </button>



          <button
            onClick={toggleTheme}
            className="border px-3 py-1 rounded"
          >
            {theme === "light"
              ? "🌙"
              : "☀️"}
          </button>




          {
            user ? (

              <button
                onClick={handleLogout}
                className="border px-3 py-1 rounded"
              >
                {language === "en"
                  ? "Logout"
                  : "লগআউট"}
              </button>

            )

            :

            (

              <Link to="/login">
                {language === "en"
                  ? "Login"
                  : "লগইন"}
              </Link>

            )
          }


        </div>

      </div>

    </nav>

  );

}


export default Navbar;
