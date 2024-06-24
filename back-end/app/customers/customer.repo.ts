import customerModel from "./customer.schema";
import { ICustomerSchema, IPurchaseSchema } from "./customer.types";

export const addCustomer = (customer: Partial<ICustomerSchema>) => {
    const newCustomer = new customerModel(customer);
    newCustomer.save();
    return newCustomer;
};

export const findByMobileNumber = async (mobileNumber: string) => {
    const user = await customerModel.findOne({ mobileNumber });
    return user;
};

export const updatePurchaseHistroy = async (
    newHistory: IPurchaseSchema[],
    userId: string
) => {
    const isUpated = await customerModel.findOneAndUpdate(
        { _id: userId },
        { $set: { purchaseHistory: newHistory } }
    );
    return isUpated;
};

export const getAllCustomers = async () => {
    const customers = await customerModel.find();
    console.log(customers);
    return customers;
};
export default {
    addCustomer,
    findByMobileNumber,
    getAllCustomers,
    updatePurchaseHistroy,
};
