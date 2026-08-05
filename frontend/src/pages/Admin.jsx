import {useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function Admin() {

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || user.role !== "Admin") {
      navigate("/login");
    }
  }, [navigate]);

  const emptyForm = {
    name: "",
    shortName: "",
    category: "University",
    type: "Public",
    division: "",
    district: "",
    established: "",
    website: "",
    description: "",
    logo: "",
  };

  const [institutions, setInstitutions] = useState([]);
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [institution, setInstitution] = useState(emptyForm);

  const [editId, setEditId] = useState(null);

  const [applicationLoading, setApplicationLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [applicationSearch, setApplicationSearch] = useState("");

  useEffect(() => {
    fetchInstitutions();
    fetchApplications();
  }, []);

  const fetchInstitutions = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await axios.get(
        "https://edubangla-portal.onrender.com/api/institutions",
        institution,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setInstitutions(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  const fetchApplications = async () => {

    try {

      setApplicationLoading(true);

      const token = localStorage.getItem("token");

      const res = await axios.get(
        "https://edubangla-portal.onrender.com/api/applications",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setApplications(res.data);

    } catch (error) {

      console.log(error);

    } finally {

      setApplicationLoading(false);

    }

  };

  const handleChange = (e) => {

    setInstitution({
      ...institution,
      [e.target.name]: e.target.value,
    });

  };

  const handleImage = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {

      setInstitution((prev) => ({
        ...prev,
        logo: reader.result,
      }));

    };

    reader.readAsDataURL(file);

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      if (editId) {

        const token = localStorage.getItem("token");

        const res = await axios.put(
        `https://edubangla-portal.onrender.com/api/institutions/${editId}`,
          institution,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setInstitutions(
          institutions.map((item) =>
            item._id === editId ? res.data : item
          )
        );

        alert("Institution Updated Successfully");

        setEditId(null);

      } else {

        const res = await axios.get(
          "https://edubangla-portal.onrender.com/api/institutions",
          institution
        );

        setInstitutions((prev) => [...prev, res.data]);

        alert("Institution Added Successfully");

      }

      setInstitution(emptyForm);

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Operation Failed"
      );

    }

  };

  const updateApplicationStatus = async (id, status) => {

    try {

      const res = await axios.put(
        `https://edubangla-portal.onrender.com/api/applications/${id}`,
        {
          status,
        }
      );

      setApplications(
        applications.map((app) =>
          app._id === id ? res.data : app
        )
      );

      alert(`Application ${status}`);

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        error.message
      );

    }

  };
   const deleteApplication = async (id) => {

    try {

      const token = localStorage.getItem("token");

      await axios.delete(
        `https://edubangla-portal.onrender.com/api/institutions/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setApplications(
        applications.filter(
          (app) => app._id !== id
        )
      );

      alert("Application Deleted Successfully");

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        error.message
      );

    }

  };

  const downloadApplicationPDF = (app) => {

  const pdf = new jsPDF();

  pdf.setFontSize(18);
  pdf.text("Application Details", 20, 20);

  pdf.setFontSize(12);

  pdf.text(`Name: ${app.fullName || ""}`, 20, 40);
  pdf.text(`Father: ${app.fatherName || ""}`, 20, 50);
  pdf.text(`Mother: ${app.motherName || ""}`, 20, 60);
  pdf.text(`Email: ${app.email || ""}`, 20, 70);
  pdf.text(`Phone: ${app.phone || ""}`, 20, 80);
  pdf.text(`DOB: ${app.dob || ""}`, 20, 90);
  pdf.text(`Gender: ${app.gender || ""}`, 20, 100);
  pdf.text(`SSC GPA: ${app.sscGpa || ""}`, 20, 110);
  pdf.text(`HSC GPA: ${app.hscGpa || ""}`, 20, 120);
  pdf.text(`Address: ${app.address || ""}`, 20, 130);
  pdf.text(`Status: ${app.status || ""}`, 20, 140);

  pdf.save(`${app.fullName}-Application.pdf`);

};
  
  

  const editInstitution = (item) => {

    setInstitution({
      name: item.name,
      shortName: item.shortName,
      category: item.category,
      type: item.type,
      division: item.division,
      district: item.district,
      established: item.established,
      website: item.website,
      description: item.description,
      logo: item.logo || "",
    });

    setEditId(item._id);

  };

  const deleteInstitution = async (id) => {

    try {

      await axios.delete(
        `https://edubangla-portal.onrender.com/api/institutions/${id}`
      );

      setInstitutions(
        institutions.filter(
          (item) => item._id !== id
        )
      );

      alert("Institution Deleted Successfully");

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        error.message
      );

    }

  };

  const filteredInstitutions = institutions.filter((item) => {

    const matchSearch =
      item.name
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchCategory =
      categoryFilter === "" ||
      item.category === categoryFilter;

    const matchType =
      typeFilter === "" ||
      item.type === typeFilter;

    return (
      matchSearch &&
      matchCategory &&
      matchType
    );

  });

  const filteredApplications = applications.filter((app) => {

  const searchText =
    applicationSearch.toLowerCase();

  return (
    app.fullName
      ?.toLowerCase()
      .includes(searchText) ||

    app.email
      ?.toLowerCase()
      .includes(searchText) ||

    app.phone
      ?.toLowerCase()
      .includes(searchText)
  );

});

  const totalInstitutions = institutions.length;

  const totalUniversities =
    institutions.filter(
      (item) => item.category === "University"
    ).length;

  const totalColleges =
    institutions.filter(
      (item) => item.category === "College"
    ).length;

  const totalPublic =
    institutions.filter(
      (item) => item.type === "Public"
    ).length;

  const totalPrivate =
    institutions.filter(
      (item) => item.type === "Private"
    ).length;

  const totalApplications = applications.length;
  const pendingApplications =
  applications.filter(
    (app) => app.status === "Pending"
  ).length;

  const approvedApplications =
  applications.filter(
    (app) => app.status === "Approved"
  ).length;
 
  const rejectedApplications =
  applications.filter(
    (app) => app.status === "Rejected"
  ).length;
 
  const approvalRate =
  totalApplications === 0
    ? 0
    : Math.round(
        (approvedApplications / totalApplications) * 100
      );

  const chartData = [
  {
    name: "Pending",
    value: pendingApplications,
  },
  {
    name: "Approved",
    value: approvedApplications,
  },
  {
    name: "Rejected",
    value: rejectedApplications,
  },
];

  const COLORS = [
  "#EAB308",
  "#16A34A",
  "#DC2626",
];

  return (

<section className="max-w-6xl mx-auto px-4 md:px-6 py-10 text-gray-900 dark:text-white">

<h1 className="text-3xl font-bold text-center mb-8">
Admin Panel
</h1>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

<div className="bg-indigo-600 text-white rounded-xl p-5 mb-6 text-center">
  <h2 className="text-lg font-semibold">
    Total Applications
  </h2>

  <p className="text-3xl font-bold mt-2">
    {totalApplications}
  </p>
</div> 

<div className="bg-yellow-500 text-white rounded-xl p-5 mb-6 text-center">
  <h2 className="text-lg font-semibold">
    Pending Applications
  </h2>

  <p className="text-3xl font-bold mt-2">
    {pendingApplications}
  </p>
</div>

<div className="bg-green-600 text-white rounded-xl p-5 mb-6 text-center">
  <h2 className="text-lg font-semibold">
    Approved Applications
  </h2>

  <p className="text-3xl font-bold mt-2">
    {approvedApplications}
  </p>
</div>

<div className="bg-red-600 text-white rounded-xl p-5 mb-6 text-center">
  <h2 className="text-lg font-semibold">
    Rejected Applications
  </h2>

  <p className="text-3xl font-bold mt-2">
    {rejectedApplications}
  </p>
</div>

<div className="bg-cyan-600 text-white rounded-xl p-5 mb-6 text-center">
  <h2 className="text-lg font-semibold">
    Approval Rate
  </h2>

  <p className="text-3xl font-bold mt-2">
    {approvalRate}%
  </p>
</div>

 <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 mb-8">
  <h2 className="text-2xl font-bold mb-4">
    Application Overview
  </h2>

  <div className="h-80">
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          outerRadius={100}
          label
        >
          {chartData.map((entry, index) => (
            <Cell
              key={index}
              fill={COLORS[index]}
            />
          ))}
        </Pie>

        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  </div>
</div>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">

  <div className="bg-blue-600 text-white rounded-xl p-5 text-center">
    <h2 className="text-lg font-semibold">
      Total Institutions
    </h2>

    <p className="text-3xl font-bold mt-2">
      {totalInstitutions}
    </p>
  </div>

  <div className="bg-green-600 text-white rounded-xl p-5 text-center">
    <h2 className="text-lg font-semibold">
      Universities
    </h2>

    <p className="text-3xl font-bold mt-2">
      {totalUniversities}
    </p>
  </div>

  <div className="bg-yellow-600 text-white rounded-xl p-5 text-center">
    <h2 className="text-lg font-semibold">
      Colleges
    </h2>

    <p className="text-3xl font-bold mt-2">
      {totalColleges}
    </p>
  </div>

  <div className="bg-purple-600 text-white rounded-xl p-5 text-center">
    <h2 className="text-lg font-semibold">
      Public
    </h2>

    <p className="text-3xl font-bold mt-2">
      {totalPublic}
    </p>
  </div>

  <div className="bg-red-600 text-white rounded-xl p-5 text-center">
    <h2 className="text-lg font-semibold">
      Private
    </h2>

    <p className="text-3xl font-bold mt-2">
      {totalPrivate}
    </p>
  </div>

</div>

<input
  type="text"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  placeholder="Search Institution..."
  className="w-full border p-3 rounded mb-5"
/>

<select
  value={categoryFilter}
  onChange={(e) => setCategoryFilter(e.target.value)}
  className="w-full border p-3 rounded mb-5"
>

  <option value="">
    All Categories
  </option>

  <option value="University">
    University
  </option>

  <option value="College">
    College
  </option>

  <option value="School">
    School
  </option>

  <option value="Polytechnic">
    Polytechnic
  </option>

  <option value="Medical College">
    Medical College
  </option>

  <option value="Madrasah">
    Madrasah
  </option>

</select>

<form
  onSubmit={handleSubmit}
  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow space-y-4"
>

<input
  name="name"
  value={institution.name}
  onChange={handleChange}
  placeholder="Institution Name"
  className="w-full border p-3 rounded"
  required
/>

<input
  name="shortName"
  value={institution.shortName}
  onChange={handleChange}
  placeholder="Short Name"
  className="w-full border p-3 rounded"
/>

<select
  name="category"
  value={institution.category}
  onChange={handleChange}
  className="w-full border p-3 rounded"
>

<option>University</option>
<option>College</option>
<option>School</option>
<option>Polytechnic</option>
<option>Medical College</option>
<option>Madrasah</option>

</select>

<select
  name="type"
  value={institution.type}
  onChange={handleChange}
  className="w-full border p-3 rounded"
>

<option>Public</option>
<option>Private</option>

</select>

<input
  name="division"
  value={institution.division}
  onChange={handleChange}
  placeholder="Division"
  className="w-full border p-3 rounded"
/>

<input
  name="district"
  value={institution.district}
  onChange={handleChange}
  placeholder="District"
  className="w-full border p-3 rounded"
/>

<input
  name="established"
  value={institution.established}
  onChange={handleChange}
  placeholder="Established Year"
  className="w-full border p-3 rounded"
/>

<input
  name="website"
  value={institution.website}
  onChange={handleChange}
  placeholder="Website"
  className="w-full border p-3 rounded"
/>

<input
  type="file"
  accept="image/*"
  onChange={handleImage}
  className="w-full border p-3 rounded"
/>

{institution.logo && (

<img
  src={institution.logo}
  alt="Preview"
  className="w-32 h-32 rounded object-cover"
/>

)}

<textarea
  name="description"
  value={institution.description}
  onChange={handleChange}
  placeholder="Description"
  className="w-full border p-3 rounded"
/>

<button
  className="bg-blue-600 text-white px-6 py-3 rounded"
>

{editId ? "Update Institution" : "Add Institution"}

</button>

</form>
<h2 className="text-2xl font-bold mt-10 mb-6">
  Institutions List
</h2>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

  {filteredInstitutions.map((item) => (

    <div
      key={item._id}
      className="bg-white dark:bg-gray-800 rounded-xl shadow p-5"
    >

      {item.logo && (
        <img
          src={item.logo}
          alt={item.name}
          className="w-20 h-20 object-cover rounded mb-4"
        />
      )}

      <h3 className="text-xl font-bold">
        {item.name}
      </h3>

      <p>
        <strong>Short:</strong> {item.shortName}
      </p>

      <p>
        <strong>Category:</strong> {item.category}
      </p>

      <p>
        <strong>Type:</strong> {item.type}
      </p>

      <p>
        <strong>Division:</strong> {item.division}
      </p>

      <p>
        <strong>District:</strong> {item.district}
      </p>

      <p>
        <strong>Established:</strong> {item.established}
      </p>

      <p className="break-all">
        <strong>Website:</strong> {item.website}
      </p>

      <p className="mt-2">
        {item.description}
      </p>

      <div className="flex gap-3 mt-5">

        <button
          onClick={() => editInstitution(item)}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Edit
        </button>

        <button
          onClick={() => deleteInstitution(item._id)}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Delete
        </button>

      </div>

    </div>

  ))}

</div>

<h2 className="text-2xl font-bold mt-12 mb-6">
  Submitted Applications
</h2>

<input
  type="text"
  value={applicationSearch}
  onChange={(e) =>
    setApplicationSearch(e.target.value)
  }
  placeholder="Search by name, email or phone..."
  className="w-full border p-3 rounded mb-5"
/>

{applicationLoading ? (

<p>Loading Applications...</p>

) : applications.length === 0 ? (

<p>No Applications Found</p>

) : (

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
{filteredApplications.map((app) => (

  <div
    key={app._id}
    className="bg-white dark:bg-gray-800 shadow rounded-xl p-5"
  >

    <h3 className="text-xl font-bold">
      {app.fullName}
    </h3>

    <p>Father: {app.fatherName || "N/A"}</p>
    <p>Mother: {app.motherName || "N/A"}</p>
    <p>Email: {app.email}</p>
    <p>Phone: {app.phone}</p>
    <p>SSC GPA: {app.sscGpa || "N/A"}</p>
    <p>HSC GPA: {app.hscGpa || "N/A"}</p>
    <p>Gender: {app.gender || "N/A"}</p>

    <p>
      Status:
      <span className="font-bold ml-2">
        {app.status}
      </span>
    </p>

    <div className="flex flex-wrap gap-3 mt-5">
    
      <button
        onClick={() =>
          setSelectedApplication(app)
        }
        className="bg-blue-600 text-white px-4 py-2 rounded"
    >
        View Details
      </button>

      <button
        onClick={() =>
          updateApplicationStatus(
            app._id,
            "Approved"
          )
        }
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Approve
      </button>

      <button
        onClick={() =>
          updateApplicationStatus(
            app._id,
            "Rejected"
          )
        }
        className="bg-yellow-600 text-white px-4 py-2 rounded"
      >
        Reject
      </button>

      <button
        onClick={() =>
          deleteApplication(app._id)
        }
        className="bg-red-600 text-white px-4 py-2 rounded"
      >
        Delete
      </button>

    </div>

  </div>

))}

</div>

)}

</div>

      {
        selectedApplication && (

          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">

              <h2 className="text-2xl font-bold mb-4">
                Application Details
              </h2>

              <p>
                Name: {selectedApplication.fullName}
              </p>

              <p>
                Father: {selectedApplication.fatherName || "N/A"}
              </p>

              <p>
                Mother: {selectedApplication.motherName || "N/A"}
              </p>

              <p>
                Email: {selectedApplication.email}
              </p>

              <p>
                Phone: {selectedApplication.phone}
              </p>

              <p>
                Date of Birth: {selectedApplication.dob || "N/A"}
              </p>

              <p>
                Gender: {selectedApplication.gender || "N/A"}
              </p>

              <p>
                SSC GPA: {selectedApplication.sscGpa || "N/A"}
              </p>

              <p>
                HSC GPA: {selectedApplication.hscGpa || "N/A"}
              </p>

              <p>
                Address: {selectedApplication.address || "N/A"}
              </p>

              <p>
                Date of Birth: {selectedApplication.dob || "N/A"}
              </p>

              <p>
                Gender: {selectedApplication.gender || "N/A"}
              </p>

              <p>
                Address: {selectedApplication.address || "N/A"}
              </p>

              <p className="mt-3">
                Status:

                <span
                  className={`ml-2 px-3 py-1 rounded-full text-white ${
                    selectedApplication.status === "Approved"
                      ? "bg-green-600"
                      : selectedApplication.status === "Rejected"
                      ? "bg-red-600"
                      : "bg-yellow-500"
                  }`}
                >
                  {selectedApplication.status}
                </span>
              </p>


              <div className="flex gap-3 mt-5">

  <button
    onClick={() =>
      downloadApplicationPDF(
        selectedApplication
      )
    }
    className="bg-blue-600 text-white px-5 py-2 rounded"
  >
    Download PDF
  </button>

  <button
    onClick={() =>
      setSelectedApplication(null)
    }
    className="bg-red-600 text-white px-5 py-2 rounded"
  >
    Close
  </button>

</div>

            </div>

          </div>

        )
      }

    </section>

  );

}

export default Admin;
