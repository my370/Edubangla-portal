import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";


function ResetPassword(){

  const { token } = useParams();

  const navigate = useNavigate();


  const [password,setPassword] = useState("");

  const [confirmPassword,setConfirmPassword] = useState("");



  const handleSubmit = async(e)=>{

    e.preventDefault();


    if(password !== confirmPassword){

      alert("Passwords do not match");

      return;

    }



    try{


      await axios.post(

        `http://localhost:5000/api/auth/reset-password/${token}`,

        {
          password
        }

      );



      alert(
        "Password reset successful"
      );


      navigate("/login");



    }catch(error){


      alert(

        error.response?.data?.message ||

        "Reset failed"

      );


    }


  };



  return (

    <section className="max-w-md mx-auto px-6 py-10">


      <h1 className="text-3xl font-bold text-center mb-6">

        Reset Password

      </h1>



      <form

        onSubmit={handleSubmit}

        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow space-y-4"

      >


        <input

          type="password"

          placeholder="New Password"

          value={password}

          onChange={(e)=>setPassword(e.target.value)}

          className="w-full border p-3 rounded"

          required

        />



        <input

          type="password"

          placeholder="Confirm Password"

          value={confirmPassword}

          onChange={(e)=>setConfirmPassword(e.target.value)}

          className="w-full border p-3 rounded"

          required

        />



        <button

          className="w-full bg-green-600 text-white py-3 rounded"

        >

          Reset Password

        </button>



      </form>


    </section>

  );

}


export default ResetPassword;
