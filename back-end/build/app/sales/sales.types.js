"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.salesSchema = void 0;
const zod_1 = require("zod");
exports.salesSchema = zod_1.z.object({
    distributorId: zod_1.z.string(),
    customerName: zod_1.z.string(),
    customerMobileNumber: zod_1.z.string(),
    customerEmail: zod_1.z.string(),
    products: zod_1.z.array(zod_1.z.object({
        productId: zod_1.z.string(),
        quantity: zod_1.z.number(),
        currentPrice: zod_1.z.number(),
    })),
    totalPrice: zod_1.z.number(),
});
