"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inventoryUpdates = exports.inventorySchema = void 0;
const zod_1 = require("zod");
exports.inventorySchema = zod_1.z.object({
    productId: zod_1.z.string(),
    quantity: zod_1.z.number().positive(),
});
exports.inventoryUpdates = zod_1.z.object({
    productId: zod_1.z.string(),
    quantity: zod_1.z.number().positive(),
    // currentPrise: z.number().optional(),
});
