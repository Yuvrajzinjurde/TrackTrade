import { Router } from "express";
import { Route } from "../routes/routes.types";
import {
    merchandiseValidations,
    redeemRequestValidation,
} from "./merchandise.validations";
import merchandiseService from "./merchandise.service";
import { ResponseHandler } from "../utility/response-handler";
import { authPermissions } from "../utility/auth-permissions";
import { permissionsToCreate } from "../utility/pemissions";

const merchandiseRouter = Router();

merchandiseRouter.post(
    "/add-merchandise",
    authPermissions(permissionsToCreate),
    ...merchandiseValidations,
    (req, res, next) => {
        try {
            const manufacturerId = req.currentUser._id;
            const result = merchandiseService.addMerchandise(
                req.body,
                manufacturerId
            );
            res.send(new ResponseHandler(result));
        } catch (e) {
            next(e);
        }
    }
);
merchandiseRouter.get(
    "/allmerchandise",
    authPermissions(["viewMerchandise"]),
    async (req, res, next) => {
        try {
            const result = await merchandiseService.getAllMerchandise();
            res.send(new ResponseHandler(result));
        } catch (e) {
            next(e);
        }
    }
);
merchandiseRouter.get("/request/:status", async (req, res, next) => {
    try {
        const status = req.params.status;
        const result = await merchandiseService.getMerchandiseRequests(status);
        res.send(new ResponseHandler(result));
    } catch (e) {
        next(e);
    }
});
merchandiseRouter.post(
    "/redeem",
    authPermissions(["redeemMerchandise"]),
    ...redeemRequestValidation,
    async (req, res, next) => {
        try {
            const result = await merchandiseService.reedeemMerchandises(
                req.body
            );
            res.send(new ResponseHandler(result));
        } catch (e) {
            next(e);
        }
    }
);

export default new Route("/merchandise", merchandiseRouter);
