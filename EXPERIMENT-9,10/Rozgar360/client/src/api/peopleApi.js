const API_BASE = "http://localhost:5000/api"; // change if needed

// Fetch all people
export const fetchPeople = async () => {
  const res = await fetch(`${API_BASE}/people`);
  if (!res.ok) throw new Error("Failed to fetch people");
  return res.json();
};

// Add new person
export const addPerson = async (data) => {
  const res = await fetch(`${API_BASE}/people`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to add person");
  return res.json();
};

// Delete person
export const deletePersonApi = async (id) => {
  const res = await fetch(`http://localhost:5000/api/people/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete person");
  return res.json();
};
