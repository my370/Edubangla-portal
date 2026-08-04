import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Login() {

  const navigate = useNavigate();
 
  const { login } = useContext(AuthContext);
  
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });


  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e) => {

  e.preventDefault();

  try {
   
    console.log("Sending:", loginData);
   
    const res = await axios.post(
      "https://edubangla-portal.onrender.com/api/auth/login",
      loginData
    );

    console.log("LOGIN RESPONSE:", res.data);
    
    console.log(res.data);

    login(res.data);

    window.dispatchEvent(
      new Event("userUpdated")
    );

    alert("Login Successful");

    if(res.data.user.role === "Admin"){

      navigate("/admin");

    }else{

      navigate("/dashboard");

    }


  } catch (error) {

    console.log(error);

    alert(
      error.response?.data?.message ||
      error.message
    );

  }

};


  return (

<section className="max-w-md mx-auto px-6 py-10 
text-gray-900 dark:text-white transition-colors">


<h1 className="text-3xl font-bold text-center mb-8">
Login
</h1>



<form
onSubmit={handleSubmit}
className="bg-white dark:bg-gray-800 shadow 
rounded-xl p-6 space-y-4 transition-colors"
>


<input
name="email"
type="email"
value={loginData.email}
onChange={handleChange}
placeholder="Email"
className="w-full border p-3 rounded bg-white 
dark:bg-gray-700 text-black dark:text-white 
border-gray-300 dark:border-gray-600"
required
/>



<input
name="password"
type="password"
value={loginData.password}
onChange={handleChange}
placeholder="Password"
className="w-full border p-3 rounded bg-white 
dark:bg-gray-700 text-black dark:text-white 
border-gray-300 dark:border-gray-600"
required
/>




<button
className="w-full bg-blue-600 text-white py-3 rounded"
>
Login
</button>



<p className="text-center">

Don't have account?

<Link
to="/register"
className="text-blue-600 ml-2"
>
Register
</Link>

</p>

<p className="text-center mt-3">

<Link
to="/forgot-password"
className="text-blue-600"
>
Forgot Password?
</Link>

</p>


</form>


</section>

  );

}

export default Login;
