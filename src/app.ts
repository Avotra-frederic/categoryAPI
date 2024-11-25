import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import hpp from "hpp";
import helmet from "helmet";
import categoryRoutes from "./routes/category.routes";
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended:true}));
app.use(morgan("dev"));
app.use(helmet());
app.use(hpp());

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


app.get("/", (req: Request, res: Response) => {
    res.status(200).json({message:"thank you for use fullcoding API"});
})

app.use("/api/v1",categoryRoutes);


export default app;

