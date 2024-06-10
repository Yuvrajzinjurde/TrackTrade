"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateInventory = exports.updateManufacturersInventory = exports.checkInventoryLevel = exports.getInventory = exports.addProductToInventory = void 0;
const product_service_1 = __importDefault(require("../Products/product.service"));
const user_responses_1 = require("../users/user.responses");
const user_service_1 = __importDefault(require("../users/user.service"));
const inventory_responces_1 = require("./inventory.responces");
const addProductToInventory = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield user_service_1.default.addProductToInventory({
            productId: productId,
            quantity: 0,
        });
        // notification logic will go here
    }
    catch (e) {
        throw e;
    }
});
exports.addProductToInventory = addProductToInventory;
const getInventory = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userInventory = yield user_service_1.default.getInventory(userId);
        if (!userInventory)
            return inventory_responces_1.inventoryResponses.NO_DATA_FOUND;
        if (!userInventory.inventory)
            return inventory_responces_1.inventoryResponses.EMPTY_INVENTORY;
        const inventory = userInventory.inventory.map((product) => {
            const { productId, quantity } = product;
            return { product: productId, quantity };
        });
        return inventory;
    }
    catch (e) {
        throw e;
    }
});
exports.getInventory = getInventory;
const checkInventoryLevel = (user, products) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!user.inventory || user.inventory.length === 0)
            return inventory_responces_1.inventoryResponses.EMPTY_INVENTORY;
        for (const product of products) {
            const inventoryItem = user.inventory.find((item) => item.productId.toString() === product.productId.toString());
            if (!inventoryItem ||
                inventoryItem.quantity < product.quantity ||
                inventoryItem.quantity <= 10) {
                const theProduct = yield product_service_1.default.getSpecificProduct(product.productId);
                if (theProduct) {
                    throw `Insufficient quantity for product ${theProduct.productName}`;
                }
            }
        }
    }
    catch (e) {
        throw e;
    }
});
exports.checkInventoryLevel = checkInventoryLevel;
const updateManufacturersInventory = (userId, product) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_service_1.default.getSpecificUser(userId);
        yield product_service_1.default.getSpecificProduct(product.productId);
        if (user.inventory) {
            const inventoryItem = user.inventory.find((item) => item.productId.toString() === product.productId.toString());
            if (inventoryItem)
                inventoryItem.quantity += product.quantity;
        }
        else {
            throw inventory_responces_1.inventoryResponses.EMPTY_INVENTORY;
        }
        yield user.save();
    }
    catch (e) {
        throw e;
    }
});
exports.updateManufacturersInventory = updateManufacturersInventory;
const updateInventory = (userId, products) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_service_1.default.getSpecificUser(userId);
        products.forEach((product) => {
            if (user.inventory) {
                const inventoryItem = user.inventory.find((item) => item.productId.toString() ===
                    product.productId.toString());
                if (inventoryItem) {
                    inventoryItem.quantity += product.quantity;
                }
            }
        });
        yield user.save();
        return user_responses_1.userResponses.INVENTORY_UPDATED;
    }
    catch (e) {
        throw e;
    }
});
exports.updateInventory = updateInventory;
exports.default = {
    addProductToInventory: exports.addProductToInventory,
    updateInventory: exports.updateInventory,
    checkInventoryLevel: exports.checkInventoryLevel,
    updateManufacturersInventory: exports.updateManufacturersInventory,
    getInventory: exports.getInventory,
};