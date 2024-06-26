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
exports.deleteById = exports.findByIdAndUpdate = exports.getMerchandiseById = exports.getAllMerchandise = exports.insertOne = void 0;
const merchandise_schema_1 = __importDefault(require("./merchandise.schema"));
const insertOne = (merchandise) => {
    const newMerchandise = new merchandise_schema_1.default(merchandise);
    newMerchandise.save();
    return newMerchandise;
};
exports.insertOne = insertOne;
const getAllMerchandise = (page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    const merchandise = yield merchandise_schema_1.default
        .find()
        .skip((page - 1) * limit)
        .limit(limit);
    return merchandise;
});
exports.getAllMerchandise = getAllMerchandise;
const getMerchandiseById = (merchandiseId) => __awaiter(void 0, void 0, void 0, function* () {
    const merchandise = yield merchandise_schema_1.default.findById(merchandiseId);
    return merchandise;
});
exports.getMerchandiseById = getMerchandiseById;
const findByIdAndUpdate = (merchandiseId, updates) => merchandise_schema_1.default.findByIdAndUpdate({ _id: merchandiseId }, { $set: updates });
exports.findByIdAndUpdate = findByIdAndUpdate;
const deleteById = (merchandiseId) => merchandise_schema_1.default.findByIdAndDelete({ _id: merchandiseId });
exports.deleteById = deleteById;
exports.default = {
    insertOne: exports.insertOne,
    getAllMerchandise: exports.getAllMerchandise,
    getMerchandiseById: exports.getMerchandiseById,
    deleteById: exports.deleteById,
    findByIdAndUpdate: exports.findByIdAndUpdate,
};
