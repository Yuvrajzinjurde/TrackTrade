"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAndDeleteValidations = exports.updateValidations = exports.productValidations = void 0;
const validator_1 = require("../utility/validator");
const product_types_1 = require("./product.types");
exports.productValidations = [(0, validator_1.body)(product_types_1.productSchema)];
exports.updateValidations = [(0, validator_1.params)(product_types_1.id), (0, validator_1.body)(product_types_1.updatedFields)];
exports.getAndDeleteValidations = [(0, validator_1.params)(product_types_1.id)];
