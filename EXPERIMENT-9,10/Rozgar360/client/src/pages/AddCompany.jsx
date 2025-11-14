import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { toast } from "react-toastify";
import { fetchCompanies, addCompany, deleteCompanyApi } from "../api/companyApi";


const AddCompany = () => {
  const [showForm, setShowForm] = useState(false);

 const [companies, setCompanies] = useState([]);


  const [formData, setFormData] = useState({
    name: "",
    industry: "",
    size: "",
    location: "",
    website: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      industry: "",
      size: "",
      location: "",
      website: "",
      email: "",
      phone: "",
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const newCompany = await addCompany(formData);
    setCompanies([newCompany, ...companies]);
    toast.success("Company added successfully!");
    resetForm();
    setShowForm(false);
  } catch (err) {
    toast.error("Error adding company");
  }
};

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentCompanies = companies.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(companies.length / itemsPerPage);
React.useEffect(() => {
  const loadCompanies = async () => {
    try {
      const data = await fetchCompanies();
      setCompanies(data);
    } catch (err) {
      toast.error("Failed to fetch companies");
    }
  };
  loadCompanies();
}, []);

  return (
    <>
      <Navbar />

      {/* Main content wrapper */}
      <div
        className={`main-content transition-filter duration-300 ${
          showForm ? "blur-sm pointer-events-none" : ""
        }`}
      >
        <div className="container mx-auto px-4 min-h-[65vh] my-10">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Company Directory
          </h2>

          {/* Add Company Button */}
          <div className="text-center mb-6">
            <button
              onClick={() => setShowForm(true)}
              className="px-6 py-2 rounded-md text-white font-medium bg-green-600 hover:bg-green-700 transition"
            >
              Add New Company
            </button>
          </div>

          {/* Company Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden shadow-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-5 text-left text-gray-700 font-semibold">
                    Name
                  </th>
                  <th className="py-3 px-5 text-left text-gray-700 font-semibold">
                    Industry
                  </th>
                  <th className="py-3 px-5 text-left text-gray-700 font-semibold">
                    Size
                  </th>
                  <th className="py-3 px-5 text-left text-gray-700 font-semibold">
                    Location
                  </th>
                  <th className="py-3 px-5 text-left text-gray-700 font-semibold">
                    Website
                  </th>
                  <th className="py-3 px-5 text-left text-gray-700 font-semibold">
                    Email
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
                {currentCompanies.map((c, idx) => (
                  <tr
                    key={c._id}
                    className={`${
                      idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-green-50 transition`}
                  >
                    <td className="py-3 px-5">{c.name}</td>
                    <td className="py-3 px-5">{c.industry}</td>
                    <td className="py-3 px-5">{c.size}</td>
                    <td className="py-3 px-5">{c.location}</td>
                    <td className="py-3 px-5">
                      <a
                        href={c.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 hover:underline"
                      >
                        {c.website}
                      </a>
                    </td>
                    <td className="py-3 px-5">{c.email}</td>
                    <td className="py-3 px-5">{c.phone}</td>
                    <td className="py-3 px-5">
  <button
    onClick={async () => {
      try {
        await deleteCompanyApi(c._id);
        setCompanies(companies.filter((company) => company._id !== c._id));
        toast.success("Company deleted successfully!");
      } catch (err) {
        toast.error("Failed to delete company");
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

         <div className="flex justify-center mt-4 space-x-2">
  {/* Previous Button */}
  <button
    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
    disabled={currentPage === 1}
    className={`px-4 py-2 rounded-md border ${
      currentPage === 1
        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
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
    onClick={() =>
      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
    }
    disabled={currentPage === totalPages}
    className={`px-4 py-2 rounded-md border ${
      currentPage === totalPages
        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
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
              Add a New Company
            </h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Company Name *"
                required
                value={formData.name}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500"
              />
              <input
                type="text"
                name="industry"
                placeholder="Industry"
                value={formData.industry}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500"
              />
              <input
                type="text"
                name="size"
                placeholder="Company Size"
                value={formData.size}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500"
              />
              <input
                type="text"
                name="location"
                placeholder="Location"
                value={formData.location}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500"
              />
              <input
                type="text"
                name="website"
                placeholder="Website"
                value={formData.website}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500"
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500"
              />
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
                  Save Company
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

export default AddCompany;
