const API_BASE = "http://localhost:5000/api"; // change port if needed

// Fetch all companies
export const fetchCompanies = async () => {
  const res = await fetch(`${API_BASE}/companies`);
  if (!res.ok) throw new Error("Failed to fetch companies");
  return res.json();
};

// Add new company
export const addCompany = async (data) => {
  const res = await fetch(`${API_BASE}/companies`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to add company");
  return res.json();
};

// DELETE company



export const deleteCompanyApi = async (id) => {
  const res = await fetch(`http://localhost:5000/api/companies/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete person");
  return res.json();
};