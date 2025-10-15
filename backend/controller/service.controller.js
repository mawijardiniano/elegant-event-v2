const servService = require("../services/service.service");

const getAllService = async (req, res) => {
  try {
    const service = await servService.getAllService();
    res.status(200).json(service);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createService = async (req, res) => {
  try {
    const { serv_name, serv_price, serv_type } = req.body;

    const service = await servService.createService(
      serv_name,
      serv_price,
      serv_type
    );
    res.status(200).json(service);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { serv_name, serv_price, serv_type } = req.body;
    const service = await servService.updateService(id, {
      serv_name,
      serv_price,
      serv_type,
    });
    res.status(200).json(service);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteService = async (req,res) => {
    try {
        const {id} = req.params
        const service = await servService.deleteService(id)

        res.status(200).json({message: "Service successfully deleted"}, service)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = { getAllService, createService, updateService, deleteService };
