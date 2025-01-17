import { Router } from "express";
import {
	createProduct,
	deleteProduct,
	getProduct,
	filterProducts,
	getProducts,
	patchProduct,
} from "@controllers/product.controller";

const ProductRouter = Router();

ProductRouter.get("/", getProducts);
ProductRouter.post("/", createProduct);
ProductRouter.get("/search", filterProducts);
ProductRouter.get("/:id", getProduct);
ProductRouter.delete("/:id", deleteProduct);
ProductRouter.patch("/:id", patchProduct);

export default ProductRouter;
