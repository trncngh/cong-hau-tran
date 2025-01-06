import { Router } from "express";
import ProductRouter from "./product.routes";

const MainRouter = Router();

MainRouter.use("/product", ProductRouter);

export default MainRouter;
