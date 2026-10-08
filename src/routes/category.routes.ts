import { Router } from "express";
import { createCategory, findAllCategoryByArrayId, getCategory } from "../controller/category.controller";
import categoryAdmin from "../middleware/category-admin.middleware";

const categoryRoutes = Router();

categoryRoutes.post("/store/category", categoryAdmin, createCategory);
categoryRoutes.post("/:parentId/add", categoryAdmin, createCategory);
categoryRoutes.get("/all/category",getCategory);
categoryRoutes.get("/:parentId/category",getCategory);
categoryRoutes.post("/find/category",findAllCategoryByArrayId);
export default categoryRoutes;
