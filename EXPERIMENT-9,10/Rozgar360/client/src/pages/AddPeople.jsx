import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { toast } from "react-toastify";
import { fetchPeople, addPerson,deletePersonApi } from "../api/peopleApi";

const AddPeople = () => {
  const [showForm, setShowForm] = useState(false);

  const [people, setPeople] = useState([]);


  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    jobTitle: "",
    companyName: "",
    email: "",
    linkedin: "",
    twitter: "",
    location: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      jobTitle: "",
      companyName: "",
      email: "",
      linkedin: "",
      twitter: "",
      location: "",
      phone: "",
    });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const newPerson = await addPerson(formData);
    setPeople([newPerson, ...people]);
    toast.success("Contact added successfully!");
    resetForm();
    setShowForm(false);
  } catch (err) {
    toast.error("Error adding contact");
  }
};


  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentPeople = people.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(people.length / itemsPerPage);
React.useEffect(() => {
  const loadPeople = async () => {
    try {
      const data = await fetchPeople();
      setPeople(data);
    } catch (err) {
      toast.error("Failed to load contacts");
    }
  };
  loadPeople();
}, []);

  return (
    <>
      <Navbar />

      {/* Main content wrapper that will blur */}
      <div
        className={`main-content transition-filter duration-300 ${
          showForm ? "blur-sm pointer-events-none" : ""
        }`}
      >
        <div className="container mx-auto px-4 min-h-[65vh] my-10">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            People Directory
          </h2>

          {/* Add Contact Button */}
          <div className="text-center mb-6">
            <button
              onClick={() => setShowForm(true)}
              className="px-6 py-2 rounded-md text-white font-medium bg-green-600 hover:bg-green-700 transition"
            >
              Add New Contact
            </button>
          </div>

          {/* Existing People Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden shadow-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-5 text-left text-gray-700 font-semibold">
                    Name
                  </th>
                  <th className="py-3 px-5 text-left text-gray-700 font-semibold">
                    Job Title
                  </th>
                  <th className="py-3 px-5 text-left text-gray-700 font-semibold">
                    Company
                  </th>
                  <th className="py-3 px-5 text-left text-gray-700 font-semibold">
                    Email
                  </th>
                  <th className="py-3 px-5 text-left text-gray-700 font-semibold">
                    LinkedIn
                  </th>
                  <th className="py-3 px-5 text-left text-gray-700 font-semibold">
                    Twitter
                  </th>
                  <th className="py-3 px-5 text-left text-gray-700 font-semibold">
                    Location
                  </th>
                  <th className="py-3 px-5 text-left text-gray-700 font-semibold">
                    Phone
                  </th>
                  <th className="py-3 px-5 text-left text-gray-700 font-semibold">
  Actions
</th>

                </tr>
              </thead>
     <tbody>
  {currentPeople.map((p, idx) => (
    <tr
      key={p._id}
      className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-green-50 transition`}
    >
      <td className="py-3 px-5">{p.firstName + " " + p.lastName}</td>
      <td className="py-3 px-5">{p.jobTitle}</td>
      <td className="py-3 px-5">{p.companyName}</td>
      <td className="py-3 px-5">{p.email}</td>
      <td className="py-3 px-5">{p.linkedin}</td>
      <td className="py-3 px-5">{p.twitter}</td>
      <td className="py-3 px-5">{p.location}</td>
      <td className="py-3 px-5">{p.phone}</td>
      <td className="py-3 px-5">
        <button
          onClick={async () => {
            try {
              await deletePersonApi(p._id);
              setPeople(people.filter((person) => person._id !== p._id));
              toast.success("Contact deleted successfully!");
            } catch (err) {
              toast.error("Failed to delete contact");
            }
          }}
          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
        >
          Delete
        </button>
      </td>
    </tr>
  ))}
</tbody>

            </table>

            {/* Pagination Controls */}
<div className="flex justify-center items-center mt-4 space-x-2">
  {/* Previous Button */}
  <button
    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
    disabled={currentPage === 1}
    className={`px-3 py-1 rounded-md border flex items-center gap-1 ${
      currentPage === 1
        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
        : "bg-white text-gray-700 hover:bg-gray-100"
    }`}
  >
    ← Prev
  </button>

  {/* Page Numbers */}
  {Array.from({ length: totalPages }, (_, i) => (
    <button
      key={i + 1}
      onClick={() => setCurrentPage(i + 1)}
      className={`px-3 py-1 rounded-md border ${
        currentPage === i + 1
          ? "bg-green-600 text-white"
          : "bg-white text-gray-700 hover:bg-gray-100"
      }`}
    >
      {i + 1}
    </button>
  ))}

  {/* Next Button */}
  <button
    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
    disabled={currentPage === totalPages}
    className={`px-3 py-1 rounded-md border flex items-center gap-1 ${
      currentPage === totalPages
        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
        : "bg-white text-gray-700 hover:bg-gray-100"
    }`}
  >
    Next →
  </button>
</div>

          </div>
        </div>
      </div>

      {/* Modal Form */}
      {showForm && (
       <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/10 backdrop-blur-sm">

          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl relative animate-scale-up">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-lg font-bold"
            >
              ×
            </button>
            <h3 className="text-xl font-semibold mb-4 text-gray-700">
              Add a New Contact
            </h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name *"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 w-full"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name *"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 w-full"
                />
              </div>
              <input
                type="text"
                name="jobTitle"
                placeholder="Job Title"
                value={formData.jobTitle}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 w-full"
              />
              <input
                type="text"
                name="companyName"
                placeholder="Company Name"
                value={formData.companyName}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 w-full"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 w-full"
              />
              <input
                type="text"
                name="linkedin"
                placeholder="LinkedIn Profile"
                value={formData.linkedin}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 w-full"
              />
              <input
                type="text"
                name="twitter"
                placeholder="Twitter Handle URL"
                value={formData.twitter}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 w-full"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="location"
                  placeholder="Location"
                  value={formData.location}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 w-full"
                />
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 w-full"
                />
              </div>
              <div className="flex justify-end gap-4 mt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="text-gray-600 hover:text-gray-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg"
                >
                  Save Contact
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default AddPeople;
