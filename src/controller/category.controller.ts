import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { addNewChildren, getAllCategories, getCategoryByids, getCategoryBySlug, storeCategory, updateCategoryTranslations } from "../service/category.service";

const createCategory = expressAsyncHandler(async(req: Request, res: Response)=>{
    const { parentId } = req.params;
    const { name, slug, translations } = req.body ?? {};
    if (typeof name !== "string" || name.trim().length < 2 || name.trim().length > 80 || typeof slug !== "string" || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
        res.status(400).json({status:"Failed", message:"Nom ou identifiant de catégorie invalide"});
        return;
    }
    const parent = parentId ? await getCategoryBySlug(parentId) : null;
    if (parentId && !parent) {
        res.status(404).json({status:"Failed", message:"Catégorie parente introuvable"});
        return;
    }
    const normalizedTranslations = translations && typeof translations === "object" ? {
        ...(typeof translations.fr === "string" && translations.fr.trim() ? { fr: translations.fr.trim().slice(0, 120) } : {}),
        ...(typeof translations.en === "string" && translations.en.trim() ? { en: translations.en.trim().slice(0, 120) } : {}),
    } : undefined;
    const data = { name: name.trim(), slug, ...(normalizedTranslations ? { translations: normalizedTranslations } : {}), ...(parent ? { parent: parent._id } : {}) };
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

const setCategoryTranslations = expressAsyncHandler(async (req: Request, res: Response) => {
    const { slug } = req.params;
    const { fr, en } = req.body ?? {};
    if ((fr !== undefined && (typeof fr !== "string" || fr.trim().length > 120)) || (en !== undefined && (typeof en !== "string" || en.trim().length > 120)) || (fr === undefined && en === undefined)) {
        res.status(400).json({ status: "Failed", message: "Traduction invalide. Chaque libellé doit contenir au maximum 120 caractères." });
        return;
    }
    const category = await updateCategoryTranslations(slug, {
        ...(typeof fr === "string" && fr.trim() ? { fr: fr.trim() } : {}),
        ...(typeof en === "string" && en.trim() ? { en: en.trim() } : {}),
    });
    if (!category) { res.status(404).json({ status: "Failed", message: "Catégorie introuvable." }); return; }
    res.status(200).json({ status: "Success", message: "Traduction enregistrée.", category });
});

export {createCategory, getCategory, findAllCategoryByArrayId, setCategoryTranslations};
