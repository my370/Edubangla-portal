import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setLoginData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!loginData.email || !loginData.password) {
      alert("Please enter email and password");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        "https://edubangla-portal.onrender.com/api/auth/login",
        loginData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 10000,
        }
      );

      if (!res.data.success) {
        throw new Error("Login failed");
      }

      login(res.data);

      window.dispatchEvent(
        new Event("userUpdated")
      );

      if (res.data.user.role === "Admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
      
          } catch (error) {
      console.error("Login Error:", error);

      if (error.response) {
        alert(error.response.data?.message || "Login failed");
      } else if (error.request) {
        alert("Cannot connect to the server. Please make sure the backend is running.");
      } else {
        alert(error.message || "Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-md mx-auto px-6 py-10 text-gray-900 dark:text-white transition-colors">
      <h1 className="text-3xl font-bold text-center mb-8">
        Login
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 shadow rounded-xl p-6 space-y-4 transition-colors"
      >
        <input
          type="email"
          name="email"
          value={loginData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full border p-3 rounded bg-white dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600"
          required
        />

        <input
          type="password"
          name="password"
          value={loginData.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full border p-3 rounded bg-white dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center">
          Don't have an account?
          <Link
            to="/register"
            className="text-blue-600 ml-2 hover:underline"
          >
            Register
          </Link>
        </p>

        <p className="text-center">
          <Link
            to="/forgot-password"
            className="text-blue-600 hover:underline"
          >
            Forgot Password?
          </Link>
        </p>
      </form>
    </section>
  );
}

export default Login;
