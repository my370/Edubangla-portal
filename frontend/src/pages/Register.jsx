import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
function Register() {

  const navigate = useNavigate();

  const [user, setUser] = useState({
  name: "",
  email: "",
  password: "",
});



  const handleChange = (e) => {

    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });

  };



  const handleSubmit = async (e) => {

  e.preventDefault();

  try {

    await axios.post(
      "http://localhost:5000/api/auth/register",
      user
    );

    alert("Registration Successful");

    navigate("/login");

  } catch (error) {

    console.log("REGISTER ERROR:", error);

    if (error.response) {
      alert(error.response.data.message);
    } else {
      alert(error.message);
    }

  }

};



  return (

<section className="max-w-md mx-auto px-6 py-10 
text-gray-900 dark:text-white transition-colors">


<h1 className="text-3xl font-bold text-center mb-8">
Register
</h1>



<form
onSubmit={handleSubmit}
className="bg-white dark:bg-gray-800 shadow 
rounded-xl p-6 space-y-4 transition-colors"
>



<input
name="name"
value={user.name}
onChange={handleChange}
placeholder="Full Name"
className="w-full border p-3 rounded bg-white 
dark:bg-gray-700 text-black dark:text-white 
border-gray-300 dark:border-gray-600"
required
/>




<input
name="email"
type="email"
value={user.email}
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
value={user.password}
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
Register
</button>



<p className="text-center">

Already have account?

<Link
to="/login"
className="text-blue-600 ml-2"
>
Login
</Link>

</p>



</form>



</section>

  );

}

export default Register;

