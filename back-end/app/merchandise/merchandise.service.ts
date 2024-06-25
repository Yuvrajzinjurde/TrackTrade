import userRepo from "../users/user.repo";
import userService from "../users/user.service";
import merchandiseRepo from "./merchandise.repo";
import { merchandiseResponses } from "./merchandise.responses";
import { IMerchandiseSchema, IRedeemeRequest } from "./merchandise.types";

export const addMerchandise = (
    merchandise: IMerchandiseSchema,
    manufacturerId: string
) => {
    try {
        merchandise.createdBy = manufacturerId;
        const newMerchandise = merchandiseRepo.insertOne(merchandise);
        if (!newMerchandise) throw merchandiseResponses.CAN_NOT_ADD_MERCHANDISE;
        return merchandiseResponses.MERCHANDISE_ADDED;
    } catch (e) {
        throw e;
    }
};

export const getAllMerchandise = async () => {
    try {
        const merchandise = await merchandiseRepo.getAllMerchandise();
        if (!merchandise) throw merchandiseResponses.MERCHANDISE_NOT_FOUND;

        return merchandise;
    } catch (e) {
        throw e;
    }
};

export const getMerchandiseRequests = async (status: string) => {
    try {
        const pipeline = [
            { $unwind: "$merchandiseRedeemed" },
            { $match: { "merchandiseRedeemed.status": status } },
            {
                $lookup: {
                    from: "merchandises",
                    localField: "merchandiseRedeemed.merchandiseId",
                    foreignField: "_id",
                    as: "merchandiseDetails",
                },
            },
            { $unwind: "$merchandiseDetails" },
            {
                $project: {
                    userId: "$_id",
                    userName: "$name",
                    merchandiseId: "$merchandiseRedeemed.merchandiseId",
                    merchandiseName: "$merchandiseDetails.merchandiseName",
                    status: "$merchandiseRedeemed.status",
                    createdAt: "$merchandiseRedeemed.createdAt",
                },
            },
        ];

        const merchandise = await userService.getMerchandiseRequests(pipeline);
        if (!merchandise || merchandise.length === 0)
            throw merchandiseResponses.MERCHANDISE_NOT_FOUND;
        return merchandise;
    } catch (e) {
        throw e;
    }
};

export const getMerchandiseById = async (merchandiseId: string) => {
    try {
        const merchandise = await merchandiseRepo.getMerchandiseById(
            merchandiseId
        );
        if (!merchandise) throw merchandiseResponses.MERCHANDISE_NOT_FOUND;
        return merchandise;
    } catch (e) {
        throw e;
    }
};

export const reedeemMerchandises = async (redeemRequest: IRedeemeRequest) => {
    try {
        const { merchandiseId, userId } = redeemRequest;
        const user = await userService.checkPointsLevel(merchandiseId, userId);
        if (user) {
            const redeemedMerchandise = user.merchandiseRedeemed;
            if (redeemedMerchandise) {
                let newMerchandise = { merchandiseId: merchandiseId };
                redeemedMerchandise.push(newMerchandise);

                await userService.updateRedeemedMerchandise(
                    redeemedMerchandise,
                    user._id.toString()
                );
            } // what if redeemedMerchandise is null?
        }
        return merchandiseResponses.REQUESTED_TO_REDEEM_MERCHANDISE;
    } catch (e) {
        throw e;
    }
};

export default {
    addMerchandise,
    getAllMerchandise,
    getMerchandiseById,
    reedeemMerchandises,
    getMerchandiseRequests,
};
