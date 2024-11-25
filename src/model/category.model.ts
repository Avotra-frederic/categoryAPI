import mongoose, { model, models, Schema } from "mongoose";
import ICategory from "../interface/category.interface";

const categoryScheme = new Schema<ICategory>({
    name: {
        type: String,
        required: true,
        trim: true
      },
      slug: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true
      },
      parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        default: null
      },
      level: {
        type: Number,
        default: 1
      },
      children: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
      }],
      attributes: [{
        key: String,
        value: String
      }],
},{
    timestamps: true,
});
categoryScheme.pre<ICategory>('save', async function (next) {
    const category = this as ICategory; 
    if (category.parent) {
      const parentCategory = await category.model('Category').findById(category.parent) as ICategory;
      if (parentCategory) {
        category.level = parentCategory.level + 1; 
      }
    }
    next();
  });

const Category = models.Category || model("Category",categoryScheme);
export default Category;
