const Service = require("../models/service");

const getAllService = async () => {
  const service = await Service.find();
  return service;
};

const createService = async (serv_name, serv_price, serv_type) => {
  const serv = await Service.findOne({ serv_name });

  if (serv) throw new Error("Service already exist");

  const newService = new Service({
    serv_name,
    serv_price,
    serv_type,
  });
  await newService.save();
  return newService;
};

const updateService = async (id, updates) => {
  const { serv_name, serv_price, serv_type } = updates;
  const service = await Service.findByIdAndUpdate(
    id,
    { serv_name, serv_price, serv_type },
    { new: true }
  );

  if (!service) throw new Error("Error updating Service");

  return service;
};

const deleteService = async (id) => {
  const service = await Service.findByIdAndDelete(id);
  if (!service) throw new Error("Service not found");

  return service;
};

module.exports = { getAllService, createService, updateService, deleteService };
