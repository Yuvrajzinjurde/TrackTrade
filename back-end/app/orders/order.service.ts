import inventoyService from "../inventory/inventory.service";
import userService from "../users/user.service";
import orderRepo from "./order.repo";
import { orderResponses } from "./order.responses";
import { IOrderSchema, IStatusUpdate, statusUpdate } from "./orders.types";

export const placeOrder = (order: IOrderSchema) => {
    try {
        const newOrder = orderRepo.placeOrder(order);
        if (!newOrder) throw orderResponses.CAN_NOT_PLACE_ORDER;
        return orderResponses.ORDER_PLACED_SUCCESSFULLY;
    } catch (e) {
        throw e;
    }
};

export const getAllorders = async (status: string) => {
    try {
        status = status || "";
        const orders = orderRepo.getAllorders(status);
        if (!orders) throw orderResponses.ORDERS_NOT_FOUND;
        return orders;
    } catch (e) {
        throw e;
    }
};

export const updateOrderStatus = async (
    updates: IStatusUpdate,
    orderId: string,
    manufacturerId: string
) => {
    try {
        const orderToComplete = await orderRepo.getSpecificOrder(orderId);
        const user = await userService.getUserById(manufacturerId);

        if (orderToComplete && user) {
            await inventoyService.checkInventoryLevel(
                user,
                orderToComplete.products
            );

            // transaction
            await inventoyService.updateInventory(
                manufacturerId,
                orderToComplete.products.map((product) => ({
                    productId: product.productId,
                    quantity: -product.quantity,
                }))
            );

            await inventoyService.updateInventory(
                orderToComplete.distributorId,
                orderToComplete.products
            );

            const isUpdated = await orderRepo.updateOrderStatus(
                updates,
                orderId
            );

            if (!isUpdated) {
                throw orderResponses.CAN_NOT_UPDATE_ORDER;
            }
            return orderResponses.ORDER_STATUS_UPDATED;
        } else {
            throw orderResponses.ORDER_OR_USER_NOT_FOUND;
        }
    } catch (e) {
        throw e;
    }
};

export default {
    getAllorders,
    placeOrder,
    updateOrderStatus,
};
