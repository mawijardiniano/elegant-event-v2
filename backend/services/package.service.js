const packageModel = require("../models/package");

const createPackage = async (pkg_name, pkg_desc, pkg_price, features) => {
  const package = await packageModel.findOne({ pkg_name });

  if (package) throw new Error("Package already exist");

  const newPackage = new packageModel({
    pkg_name,
    pkg_desc,
    pkg_price,
    features,
  });
  await newPackage.save();
  return newPackage;
};

const getAllPackage = async () => {
  const pkg = await packageModel.find();
  return pkg;
};

const updatePackage = async (id, updates) => {
  const { pkg_name, pkg_desc, pkg_price, features } = updates;

  const pkg = await packageModel.findByIdAndUpdate(
    id,
    { pkg_name, pkg_desc, pkg_price, features },
    { new: true }
  );

  if (!pkg) throw new Error("Error updating Package");

  return pkg;
};

const deletePackage = async(id) => {
    const pkg = await packageModel.findByIdAndDelete(id);

    if(!pkg) throw new Error("Package not found")
    return pkg
}

module.exports = { createPackage, getAllPackage, updatePackage , deletePackage};
