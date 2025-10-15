const Tag = require("../models/tag");

const getAllTag = async () => {
  const tag = await Tag.find();
  return tag;
};

const createTag = async (tag_name) => {
  const tag = await Tag.findOne({ tag_name });

  if (tag) throw new Error("Tag already exist");

  const newTag = new Tag({
    tag_name,
  });

  await newTag.save();
  return newTag;
};

const updateTag = async(id, update) => {
    const {tag_name} = update

    const updateTag = await Tag.findByIdAndUpdate(
        id,
        {tag_name},
        {new: true}
    )

    if(!updateTag) throw new Error('Error updating Tag')

    return updateTag;
}

const deleteTag = async (id) => {
    const tag = await Tag.findByIdAndDelete(id)
    if(!tag) throw new Error('Tag not found')
    return tag 
}

module.exports = { getAllTag, createTag, updateTag, deleteTag };
