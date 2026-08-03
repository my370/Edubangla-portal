import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ApplicationForm() {

  const { id } = useParams();

  const [formData, setFormData] = useState({

    institutionId: id || "",

    fatherName: "",
    motherName: "",
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    sscGpa: "",
    hscGpa: "",
    address: "",

    agree: false,

  });


  const [loading, setLoading] = useState(false);


  const handleChange = (e) => {

    const { name, value, type, checked } = e.target;

    setFormData({

      ...formData,

      [name]:
        type === "checkbox"
        ? checked
        : value,

    });

  };



  const handleSubmit = async (e) => {

    e.preventDefault();


    if (!formData.agree) {

      alert(
        "Please accept terms and conditions"
      );

      return;

    }


    if (!formData.fullName) {

      alert(
        "Please enter your full name"
      );

      return;

    }


    try {

      setLoading(true);


      await axios.post(
        "http://localhost:5000/api/applications",
        formData
      );


      alert(
        "Application Submitted Successfully"
      );


      setFormData({

        institutionId: id || "",

        fatherName: "",
        motherName: "",
        fullName: "",
        email: "",
        phone: "",
        dob: "",
        gender: "",
        sscGpa: "",
        hscGpa: "",
        address: "",

        agree: false,

      });



    } catch(error) {

      console.log(error);

      alert(
        "Application Submit Failed"
      );


    } finally {

      setLoading(false);

    }

  };



  return (

    <section className="max-w-4xl mx-auto px-6 py-10 text-gray-900 dark:text-white">


      <h1 className="text-3xl font-bold text-center mb-8">
        Admission Application Form
      </h1>


      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-xl shadow"
      >


        <input
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full border p-3 rounded"
          required
        />


        <input
          name="fatherName"
          value={formData.fatherName}
          onChange={handleChange}
          placeholder="Father Name"
          className="w-full border p-3 rounded"
        />


        <input
          name="motherName"
          value={formData.motherName}
          onChange={handleChange}
          placeholder="Mother Name"
          className="w-full border p-3 rounded"
        />


        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full border p-3 rounded"
          required
        />


        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="w-full border p-3 rounded"
          required
        />


        <input
          name="dob"
          type="date"
          value={formData.dob}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />



        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        >

          <option value="">
            Select Gender
          </option>

          <option value="Male">
            Male
          </option>

          <option value="Female">
            Female
          </option>

        </select>



        <input
          name="sscGpa"
          value={formData.sscGpa}
          onChange={handleChange}
          placeholder="SSC GPA"
          className="w-full border p-3 rounded"
        />


        <input
          name="hscGpa"
          value={formData.hscGpa}
          onChange={handleChange}
          placeholder="HSC GPA"
          className="w-full border p-3 rounded"
        />



        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Address"
          className="w-full border p-3 rounded"
        />



        <label className="flex gap-2">

          <input
            type="checkbox"
            name="agree"
            checked={formData.agree}
            onChange={handleChange}
          />

          I agree to submit this application

        </label>



        <button
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-3 rounded w-full"
        >

          {
            loading
            ? "Submitting..."
            : "Submit Application"
          }

        </button>



      </form>


    </section>

  );

}


export default ApplicationForm;
