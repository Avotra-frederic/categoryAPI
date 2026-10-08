import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { addNewChildren, getAllCategories, getCategoryByids, getCategoryBySlug, storeCategory } from "../service/category.service";

const createCategory = expressAsyncHandler(async(req: Request, res: Response)=>{
    const { parentId } = req.params;
    const { name, slug } = req.body ?? {};
    if (typeof name !== "string" || name.trim().length < 2 || name.trim().length > 80 || typeof slug !== "string" || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
        res.status(400).json({status:"Failed", message:"Nom ou identifiant de catégorie invalide"});
        return;
    }
    const parent = parentId ? await getCategoryBySlug(parentId) : null;
    if (parentId && !parent) {
        res.status(404).json({status:"Failed", message:"Catégorie parente introuvable"});
        return;
    }
    const data = { name: name.trim(), slug, ...(parent ? { parent: parent._id } : {}) };
    let category;
    try { category = await storeCategory(data as any); }
    catch (error) {
        if ((error as { code?: number }).code === 11000) {
            res.status(409).json({status:"Failed", message:"Cet identifiant de catégorie existe déjà"});
            return;
        }
        throw error;
    }
    if(!category){
        res.status(400).json({status:"failed", message:"Cannot create category"});
        return;
    }
    if(parent){
        await addNewChildren(String(parent._id), String(category._id));
    }
    res.status(201).json({status:"Success",message:"New category added successfuly", category});
})

const getCategory = expressAsyncHandler(async(req: Request, res: Response)=>{
    const {parentId} = req.params;
    let category;
    if(parentId){
        category = await getCategoryBySlug(parentId);
    }else{
        category = await getAllCategories();
    }
    res.status(200).json({status:"success",category})
})

const findAllCategoryByArrayId = expressAsyncHandler(async(req: Request, res: Response)=>{
    const slug = req.body;
    const category = await getCategoryByids(slug as string[]);
    res.status(200).json({status:"success", category})
})

export {createCategory, getCategory, findAllCategoryByArrayId};
