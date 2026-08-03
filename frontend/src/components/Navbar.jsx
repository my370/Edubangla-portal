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
 
  const [menuOpen, setMenuOpen] = useState(false);



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
        
        <button
          className="md:hidden border px-3 py-1 rounded"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>


        <div className="hidden md:flex items-center gap-5">


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
             <Link to="/student-dashboard">
               {language === "en"
                 ? "My Applications"
                 : "আমার আবেদন"}
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


      {menuOpen && (
        <div className="md:hidden bg-white
dark:bg-gray-800 border-t p-4">

    <Link
      to="/"
      onClick={() => setMenuOpen(false)}
      className="block py-2"
    >
      {language === "en" ? "Home" : "হোম"}
    </Link>

    <Link
      to="/institutions"
      onClick={() => setMenuOpen(false)}
      className="block py-2"
    >
      {language === "en" ? "Institutions" : "প্রতিষ্ঠান"}
    </Link>

    <Link
      to="/admission"
      onClick={() => setMenuOpen(false)}
      className="block py-2"
    >
      {language === "en" ? "Admission" : "ভর্তি"}
    </Link>

    <Link
      to="/scholarships"
      onClick={() => setMenuOpen(false)}
      className="block py-2"
    >
      {language === "en" ? "Scholarships" : "বৃত্তি"}
    </Link>

    <Link
      to="/news"
      onClick={() => setMenuOpen(false)}
      className="block py-2"
    >
      {language === "en" ? "News" : "খবর"}
    </Link>

    <Link
      to="/saved"
      onClick={() => setMenuOpen(false)}
      className="block py-2"
    >
      ❤️  {language === "en"
        ? "Saved"
        : "সংরক্ষিত"} ({savedCount})
    </Link>

    {user && (
      <Link
        to="/student-dashboard"
        onClick={() => setMenuOpen(false)}
        className="block py-2"
      >
        {language === "en"
          ? "My Applications"
          : "আমার আবেদন"}
      </Link>
    )}

   {user && user.role === "Admin" && (
  <Link
    to="/admin"
    onClick={() => setMenuOpen(false)}
    className="block py-2"
  >
    {language === "en"
      ? "Admin Panel"
      : "অ্যাডমিন প্যানেল"}
  </Link>
)}

<button
  onClick={toggleLanguage}
  className="block w-full text-left py-2"
>
  {language === "en"
    ? "বাংলা"
    : "English"}
</button>

<button
  onClick={toggleTheme}
  className="block w-full text-left py-2"
>
  {theme === "light"
    ? "🌙 Dark Mode"
    : "☀️ Light Mode"}
</button>

{user ? (
  <button
    onClick={() => {
      handleLogout();
      setMenuOpen(false);
    }}
    className="block w-full text-left py-2 text-red-600"
  >
    {language === "en"
      ? "Logout"
      : "লগআউট"}
  </button>
) : (
  <Link
    to="/login"
    onClick={() => setMenuOpen(false)}
    className="block py-2"
  >
    {language === "en"
      ? "Login"
      : "লগইন"}
  </Link>
)}

</div>

)}

    </nav>

  );

}


export default Navbar;

  
