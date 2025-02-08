import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { addNewChildren, getAllCategories, getCategoryByids, getCategoryBySlug, storeCategory } from "../service/category.service";

const createCategory = expressAsyncHandler(async(req: Request, res: Response)=>{
    const { parentId } = req.params;
    const data = req.body;
    const parent = await getCategoryBySlug(parentId);
    if(!parent){
        res.status(400).json({status:"failed", message:"Parent category not found"});
        return;
    }
    Object.assign(data, {parent: parent._id});
    const category = await storeCategory(data);
    if(!category){
        res.status(400).json({status:"failed", message:"Cannot create category"});
        return;
    }
    if(parent){
        await addNewChildren(parent._id as string, category._id as string);
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
