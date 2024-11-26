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
exports.addNewChildren = exports.getCategoryBySlug = exports.getAllCategories = exports.storeCategory = void 0;
const category_model_1 = __importDefault(require("../model/category.model"));
const populateCategories = (category) => __awaiter(void 0, void 0, void 0, function* () {
    if (category.children && category.children.length > 0) {
        const children = yield category_model_1.default.find({
            _id: { $in: category.children },
        }).lean();
        category.children = yield Promise.all(children.map(populateCategories));
    }
    else {
        category.children = [];
    }
    return category;
});
const storeCategory = (category) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newCategory = (yield category_model_1.default.create(category));
        return newCategory || null;
    }
    catch (error) {
        throw error;
    }
});
exports.storeCategory = storeCategory;
const getAllCategories = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rootCategories = yield category_model_1.default.find({
            parent: null,
        }).lean();
        return yield Promise.all(rootCategories.map(populateCategories));
    }
    catch (error) {
        throw error;
    }
});
exports.getAllCategories = getAllCategories;
const getCategoryBySlug = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield category_model_1.default.findOne({ slug: slug }).lean();
        if (category) {
            return yield populateCategories(category);
        }
        return null;
    }
    catch (error) {
        throw error;
    }
});
exports.getCategoryBySlug = getCategoryBySlug;
const addNewChildren = (parent, childrenID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newChildren = yield category_model_1.default.findByIdAndUpdate(parent, { $push: { children: childrenID } }, { new: true, runValidators: true }).lean();
        return newChildren || null;
    }
    catch (error) {
        throw error;
    }
});
exports.addNewChildren = addNewChildren;
