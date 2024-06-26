import { IProductResponses } from "./product.types";

export const productResponses: IProductResponses = {
    PRODUCT_ADDED: {
        statusCode: 200,
        message: "NEW PRODUCT ADDED SUCCESSFULLY ",
    },
    CAN_NOT_ADD_PRODUCT: {
        statusCode: 400,
        message: "CAN NOT ADD PRODUCT",
    },
    CANNOT_UPDATE_PRODUCT: {
        statusCode: 400,
        message: "CAN NOT UPDATE PRODUCT",
    },
    PRODUCT_UPDATED: {
        statusCode: 200,
        message: "PRODUCT UPDATED",
    },
    PRODUCT_DELETED_SUCCESSFULLY: {
        statusCode: 200,
        message: "PRODUCT DELETED SUCCESSFULLY",
    },
    CAN_NOT_DELETE_PRODUCT: {
        statusCode: 200,
        message: "CAN NOT DELETE PRODUCT",
    },
    PRODUCTS_NOT_FOUND: {
        statusCode: 404,
        message: "PRODUCTS NOT FOUND",
    },
};
