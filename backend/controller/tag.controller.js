const tagService = require("../services/tag.service");

const getAllTag = async (req, res) => {
  try {
    const tag = await tagService.getAllTag();
    res.status(200).json(tag);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createTag = async (req, res) => {
  try {
    const { tag_name } = req.body;
    const tag = await tagService.createTag(tag_name);
    res.status(200).json(tag);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateTag = async (req, res) => {
  try {
    const { id } = req.params;
    const { tag_name } = req.body;
    const tag = await tagService.updateTag(id, { tag_name });
    res.status(200).json({ message: "Tag updated successfully" }, tag);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteTag = async (req, res) => {
  try {
    const { id } = req.params;

    const tag = await tagService.deleteTag(id);
    res.status(200).json({ message: "Tag deleted successfully" }, tag);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getAllTag, createTag, updateTag, deleteTag };
