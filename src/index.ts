import app from "./app";
import mongoDBConnection from "./config/database";
import data from "./data/category_dataset.json";
import Category from "./model/category.model";

const PORT = process.env.PORT || 0;

mongoDBConnection().then(async()=>{
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
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
})
