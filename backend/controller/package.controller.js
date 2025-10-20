const { features } = require("process");
const packageService = require("../services/package.service");

const createPackage = async (req, res) => {
  try {
    const { pkg_name, pkg_price, pkg_desc, features } = req.body;
    const package = await packageService.createPackage(
      pkg_name,
      pkg_price,
      pkg_desc,
      features
    );
    res.status(200).json(package);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllPackages = async (req, res) => {
  try {
    const pkg = await packageService.getAllPackage();
    res.status(200).json(pkg);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updatePackage = async (req, res) => {
  try {
    const { id } = req.params;
    const { pkg_name, pkg_price, pkg_desc, features } = req.body;
    const pkg = await packageService.updatePackage(id, {
      pkg_name,
      pkg_price,
      pkg_desc,

      features,
    });
    res.status(200).json(pkg);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deletePackage = async (req, res) => {
  try {
    const { id } = req.params;

    const pkg = await packageService.deletePackage(id);
    res.status(200).json({ message: "Package deleted successfully" }, pkg);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createPackage,
  getAllPackages,
  updatePackage,
  deletePackage,
};
