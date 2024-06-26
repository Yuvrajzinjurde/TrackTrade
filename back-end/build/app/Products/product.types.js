"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.id = exports.updatedFields = exports.productSchema = void 0;
const zod_1 = require("zod");
exports.productSchema = zod_1.z.object({
    productName: zod_1.z.string(),
    productDescription: zod_1.z.string(),
    productPrice: zod_1.z.number(),
    productImage: zod_1.z.string(),
    createdBy: zod_1.z.string().optional(),
    updatedBy: zod_1.z.string().optional(),
    isDeleted: zod_1.z.string().optional(),
    createdAt: zod_1.z.string().optional(),
    updatedAt: zod_1.z.string().optional(),
});
exports.updatedFields = zod_1.z.object({
    productName: zod_1.z.string().optional(),
    productDescription: zod_1.z.string().optional(),
    productPrice: zod_1.z.number().optional(),
    productImage: zod_1.z.string().optional(),
    updatedBy: zod_1.z.string().optional(),
    updatedAt: zod_1.z.string().optional(),
});
exports.id = zod_1.z.object({
    id: zod_1.z.string(),
});
