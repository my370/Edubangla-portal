import { useEffect, useState } from "react";
import axios from "axios";

function StudentDashboard() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));

        if (!user || !user.email) {
          setLoading(false);
          return;
        }

        const res = await axios.get(
          `https://edubangla-portal.onrender.com/api/applications/student/${user.email}`
        );

        setApplications(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error(error);
        setApplications([]);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) {
    return (
      <section className="max-w-5xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8">
          My Applications
        </h1>

        <p>Loading...</p>
      </section>
    );
  }

  return (
    <section className="max-w-5xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-8">
        My Applications
      </h1>

      {applications.length === 0 ? (

        <p>No Application Found</p>

      ) : (

        <div className="grid gap-5">

          {applications.map((app) => (

            <div
              key={app._id}
              className="bg-white dark:bg-gray-800 shadow rounded-xl p-5"
            >
              <h2 className="text-xl font-bold">
                {app.fullName}
              </h2>

              <p>
                <strong>Email:</strong> {app.email}
              </p>

              <p>
                <strong>Phone:</strong> {app.phone || "N/A"}
              </p>

              <p>
                <strong>Father:</strong> {app.fatherName || "N/A"}
              </p>

              <p>
                <strong>Mother:</strong> {app.motherName || "N/A"}
              </p>

              <p>
                <strong>SSC GPA:</strong> {app.sscGpa || "N/A"}
              </p>

              <p>
                <strong>HSC GPA:</strong> {app.hscGpa || "N/A"}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                <span className="font-bold">
                  {app.status}
                </span>
              </p>
            </div>

          ))}

        </div>

      )}

    </section>
  );
}

export default StudentDashboard;
