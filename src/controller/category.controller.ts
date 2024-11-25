import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { addNewChildren, getAllCategories, getCategoryBySlug, storeCategory } from "../service/category.service";

const createCategory = expressAsyncHandler(async(req: Request, res: Response)=>{
    const { parentId } = req.params;
    const data = req.body;

    if (parentId) {
        Object.assign(data, {parent: parentId});
    }
    const category = await storeCategory(data);
    if(!category){
        res.status(400).json({status:"failed", message:"Cannot create category"});
        return;
    }
    if(parentId){
        await addNewChildren(parentId, category._id as string);
    }
    res.status(201).json({status:"Success",message:"New category added successfuly"});
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

export {createCategory, getCategory};
