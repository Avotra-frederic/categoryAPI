import mongoose from "mongoose"

const mongoDBConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI as string);

        const db = mongoose.connection;
        db.on("error", async (err) => {
            console.error(err);
        });
        db.once("open", () => {
            console.log("database connected");
        })
    } catch (error) {
        throw error;
    }
}
export default mongoDBConnection;
