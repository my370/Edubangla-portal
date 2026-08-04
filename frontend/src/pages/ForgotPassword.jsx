import { useState } from "react";
import axios from "axios";

function ForgotPassword(){

  const [email,setEmail] = useState("");

  const handleSubmit = async(e)=>{

    e.preventDefault();

    try{

      await axios.post(
        "https://edubangla-portal.onrender.com/api/auth/forgot-password",
        {
          email
        }
      );

      alert(
        "Password reset email sent"
      );

    }catch(error){

      alert(
        error.response?.data?.message ||
        "Something went wrong"
      );

    }

  };


  return (

    <section className="max-w-md mx-auto px-6 py-10">

      <h1 className="text-3xl font-bold text-center mb-6">
        Forgot Password
      </h1>


      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow space-y-4"
      >

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className="w-full border p-3 rounded"
          required
        />


        <button
          className="w-full bg-blue-600 text-white py-3 rounded"
        >

          Send Reset Link

        </button>


      </form>

    </section>

  );

}

export default ForgotPassword;
