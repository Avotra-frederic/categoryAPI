import { Types } from "mongoose";
import ICategory from "../interface/category.interface";
import Category from "../model/category.model";

const populateCategories = async (category: ICategory): Promise<ICategory> => {
  if (category.children && category.children.length > 0) {
    const children: any = await Category.find({
      _id: { $in: category.children },
    }).lean<ICategory>();
    category.children = await Promise.all(children.map(populateCategories));
  } else {
    category.children = [];
  }

  return category;
};

const storeCategory = async (
  category: ICategory,
): Promise<ICategory | null> => {
  try {
    const newCategory = (await Category.create(category)) as ICategory;
    return newCategory || null;
  } catch (error) {
    throw error;
  }
};

const getAllCategories = async (): Promise<ICategory[]> => {
  try {
    const rootCategories: any = await Category.find({
      parent: null,
    }).lean<ICategory>();
    return await Promise.all(rootCategories.map(populateCategories));
  } catch (error) {
    throw error;
  }
};

const getCategoryBySlug = async (slug: string): Promise<ICategory | null> => {
  try {
    const category = await Category.findOne({slug: slug}).lean<ICategory>();
    if (category) {
      return await populateCategories(category);
    }
    return null;
  } catch (error) {
    throw error;
  }
};

const addNewChildren = async (parent: string, childrenID: string) : Promise<ICategory | null> => {
  try {
    const newChildren = await Category.findByIdAndUpdate(
      parent,
      { $push: { children: childrenID } },
      { new: true, runValidators: true },
    ).lean<ICategory>();
    return newChildren || null;
  } catch (error) {
    throw error;
  }
};


const getCategoryByids = async(slug: string[]): Promise<ICategory[]> => {
    const category : any = await Category.find({_id: {$in: slug}}).lean<ICategory>();
    return Promise.all(category.map(populateCategories));
}
export { storeCategory, getAllCategories, getCategoryBySlug, addNewChildren, getCategoryByids };
