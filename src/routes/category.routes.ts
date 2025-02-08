import { Router } from "express";
import { createCategory, findAllCategoryByArrayId, getCategory } from "../controller/category.controller";

const categoryRoutes = Router();

categoryRoutes.post("/store/category", createCategory);
categoryRoutes.post("/:parentId/add",createCategory);
categoryRoutes.get("/all/category",getCategory);
categoryRoutes.get("/:parentId/category",getCategory);
categoryRoutes.post("/find/category",findAllCategoryByArrayId);
export default categoryRoutes;
