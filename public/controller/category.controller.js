"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategory = exports.createCategory = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const category_service_1 = require("../service/category.service");
const createCategory = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { parentId } = req.params;
    const data = req.body;
    if (parentId) {
        Object.assign(data, { parent: parentId });
    }
    const category = yield (0, category_service_1.storeCategory)(data);
    if (!category) {
        res.status(400).json({ status: "failed", message: "Cannot create category" });
        return;
    }
    if (parentId) {
        yield (0, category_service_1.addNewChildren)(parentId, category._id);
    }
    res.status(201).json({ status: "Success", message: "New category added successfuly" });
}));
exports.createCategory = createCategory;
const getCategory = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { parentId } = req.params;
    let category;
    if (parentId) {
        category = yield (0, category_service_1.getCategoryBySlug)(parentId);
    }
    else {
        category = yield (0, category_service_1.getAllCategories)();
    }
    res.status(200).json({ status: "success", category });
}));
exports.getCategory = getCategory;
