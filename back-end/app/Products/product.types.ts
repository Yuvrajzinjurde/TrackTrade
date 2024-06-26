import { z } from "zod";
import { IUserResponses } from "../users/user.types";

export const productSchema = z.object({
    productName: z.string(),
    productDescription: z.string(),
    productPrice: z.number(),
    productImage: z.string(),
    createdBy: z.string().optional(),
    updatedBy: z.string().optional(),
    isDeleted: z.string().optional(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
});

export const updatedFields = z.object({
    productName: z.string().optional(),
    productDescription: z.string().optional(),
    productPrice: z.number().optional(),
    productImage: z.string().optional(),
    updatedBy: z.string().optional(),
    updatedAt: z.string().optional(),
});

export interface IUpdatedFields extends z.infer<typeof updatedFields> {}
export interface IProductSchema extends z.infer<typeof productSchema> {}
export interface IProductResponses extends IUserResponses {}

export const id = z.object({
    id: z.string(),
});
