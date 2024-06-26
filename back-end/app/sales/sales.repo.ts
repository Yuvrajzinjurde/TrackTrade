import salesModel from "./sales.schema";
import { ISalesSchema } from "./sales.types";

export const createSales = (sale: ISalesSchema) => {
    const newSale = new salesModel(sale);
    newSale.save();
    return newSale;
};

export const aggregate = (pipeline: any) => salesModel.aggregate(pipeline);

export default {
    createSales,
    aggregate,
};
