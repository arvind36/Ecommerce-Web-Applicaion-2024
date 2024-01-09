import CategoryModel from "../models/CategoryModel.js";
import slugify from "slugify";

export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({ message: "Name is required" });
    }
    const existingCategory = await CategoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({ message: "This category already exists." });
    }
    const category = await new CategoryModel({
      name,
      slug: slugify(name),
    }).save();
    res.status(200).send({
      success: true,
      message: "new category created",
      category,
    });
  } catch (error) {
    console.log(error);
    req.status(500).send({
      success: false,
      error,
      message: "error in category",
    });
  }
};

//update category
export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await CategoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Category Updated Successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while updating category",
    });
  }
};
//get all category
export const categoryController = async (req, res) => {
  try {
    const category = await CategoryModel.find({});
    res.status(200).send({
      success: true,
      message: "All Categories List",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While getting all Categories",
    });
  }
};

//single category
export const singleCategoryController = async (req, res) => {
  try {
    const category = await CategoryModel.findOne({ slug: req.params.slug });
    res.status(200).send({
      success: true,
      message: "Single Category List",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While getting single Category",
    });
  }
};

//delete category

export const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await CategoryModel.findByIdAndDelete(id);

    if (!category) {
      return res.status(404).send({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Category deleted successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while deleting Category",
    });
  }
};
