import { Link } from "react-router-dom";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white mt-16">

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          <div>
            <h2 className="text-2xl font-bold text-blue-400 mb-4">
              Bangladesh Education
            </h2>

            <p className="text-gray-300 text-sm">
              Find schools, colleges, universities, admission
              information, scholarships and education news.
            </p>
          </div>


          <div>
            <h3 className="text-lg font-semibold mb-4">
              Quick Links
            </h3>

            <ul className="space-y-2 text-gray-300">

              <li>
                <Link to="/" className="hover:text-blue-400">
                  Home
                </Link>
              </li>

              <li>
                <Link to="/institutions" className="hover:text-blue-400">
                  Institutions
                </Link>
              </li>

              <li>
                <Link to="/admission" className="hover:text-blue-400">
                  Admission
                </Link>
              </li>

              <li>
                <Link to="/scholarships" className="hover:text-blue-400">
                  Scholarships
                </Link>
              </li>

            </ul>
          </div>


          <div>
            <h3 className="text-lg font-semibold mb-4">
              Account
            </h3>

            <ul className="space-y-2 text-gray-300">

              <li>
                <Link to="/login" className="hover:text-blue-400">
                  Login
                </Link>
              </li>

              <li>
                <Link to="/register" className="hover:text-blue-400">
                  Register
                </Link>
              </li>

              <li>
                <Link to="/dashboard" className="hover:text-blue-400">
                  Dashboard
                </Link>
              </li>

            </ul>
          </div>


          <div>
            <h3 className="text-lg font-semibold mb-4">
              Contact
            </h3>

            <p className="text-gray-300 text-sm">
              Email: support@example.com
            </p>

            <p className="text-gray-300 text-sm mt-2">
              Bangladesh
            </p>
          </div>


        </div>


        <hr className="border-gray-700 my-8" />


        <p className="text-center text-gray-400 text-sm">
          © {year} Bangladesh Education Platform. All Rights Reserved.
        </p>


      </div>

    </footer>
  );
}

export default Footer;
