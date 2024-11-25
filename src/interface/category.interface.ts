import  { Document, Types } from "mongoose";

export default interface ICategory extends Document {
    name: string;
    slug: string;
    parent: Types.ObjectId | null;
    level: number;
    children: Types.ObjectId[] | null | ICategory[];
    attributes: {
      key: string;
      value: string;
    }[];
  }
