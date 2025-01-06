import { prisma } from "@/prisma";
import ValidationError from "@/utils/error/validation_error";
import {
	responseErrorWithMessage,
	responseSuccessWithData,
} from "@/utils/response";
import { NextFunction, Request, Response } from "express";

export const createProduct = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { name, price, stock } = req.body;
	console.log(req.body);

	if (!name || !price || !stock) {
		// send to error handler
		next(new ValidationError("All field is required"));
	}

	try {
		const data = await prisma.product.create({
			data: {
				name,
				price,
				stock,
			},
		});
		console.log(data);

		// response success with a data
		res.status(200).json(responseSuccessWithData(data));
	} catch (error) {
		// send to error handler
		next(error);
	}
};

export const getProduct = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { id } = req.params;
	if (!id) {
		// send to error handler
		next(new ValidationError("Id is required"));
	}

	try {
		const data = await prisma.product.findUnique({
			where: {
				id: id,
			},
		});
		console.log(data);

		// response success with a data
		res.status(200).json(responseSuccessWithData(data));
	} catch (error) {
		// send to error handler
		next(error);
	}
};

export const getProducts = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const data = await prisma.product.findMany();
		// response success with a data
		res.status(200).json(responseSuccessWithData(data));
	} catch (error) {
		// send to error handler
		console.log(error);
		next(error);
	}
};

export const patchProduct = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { id } = req.params;
	const body = req.body;
	console.log(id);
	console.log(body);
	if (!id || body) {
		// send to error handler
		next(new ValidationError("Id is required"));
	}
	try {
		const data = await prisma.product.update({
			where: {
				id: id,
			},
			data: body,
		});
		res.status(200).json(responseSuccessWithData(data));
	} catch (error) {
		// send to error handler
		console.log(error);
		next(error);
	}
};

export const deleteProduct = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { id } = req.params;
	if (!id) {
		// send to error handler
		next(new ValidationError("Id is required"));
	}

	try {
		const data = await prisma.product.delete({
			where: {
				id: id,
			},
		});
		res.status(200).json(responseSuccessWithData(data));
	} catch (error) {
		// send to error handler
		console.log(error);
		next(error);
	}
};
