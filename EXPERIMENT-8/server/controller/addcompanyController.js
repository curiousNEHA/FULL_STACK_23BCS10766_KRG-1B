import Companys from "../models/companyModel.js";
export const getCompanies = async (req, res) => {
  try {
    const companies = await Companys.find();
    res.json(companies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addCompany = async (req, res) => {
  try {
    const company = await Companys.create(req.body);
    res.json(company);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteCompany = async (req, res) => {
  try {
    await Companys.findByIdAndDelete(req.params.id);
    res.json({ message: "Company deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
