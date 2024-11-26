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
const app_1 = __importDefault(require("./app"));
const database_1 = __importDefault(require("./config/database"));
const PORT = process.env.PORT || 0;
(0, database_1.default)().then(() => __awaiter(void 0, void 0, void 0, function* () {
    // try {
    //     for (const element of data) {
    //       if (element.Parent != null) {
    //         const parent = await Category.findOne({ slug: element.Parent });
    //         if (parent) {
    //           let childCategory = await Category.findOne({ slug: element.Category });
    //           if (!childCategory) {
    //             childCategory = new Category({
    //               name: element.Category,
    //               slug: element.Category,
    //               parent: parent._id,
    //             });
    //             await childCategory.save();
    //             await Category.findByIdAndUpdate(
    //               parent._id,
    //               { $push: { children: childCategory._id } },
    //               { new: true }
    //             );
    //           }
    //         }
    //       } else {
    //         let category = await Category.findOne({ slug: element.Category });
    //         if (!category) {
    //           category = new Category({
    //             name: element.Category,
    //             slug: element.Category,
    //             parent: null,
    //           });
    //           await category.save();
    //         }
    //       }
    //     }
    //   } catch (error) {
    //     console.error("Erreur lors de l'importation des catégories :", error);
    //   }
    app_1.default.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}));
