"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateBookingDTO = void 0;
const zod_1 = require("zod");
exports.CreateBookingDTO = zod_1.z.object({
    hotelId: zod_1.z.string(),
    userId: zod_1.z.string(),
    checkIn: zod_1.z.union([zod_1.z.string(), zod_1.z.date()]).transform(val => new Date(val)),
    checkOut: zod_1.z.union([zod_1.z.string(), zod_1.z.date()]).transform(val => new Date(val)),
    roomNumber: zod_1.z.number(),
});
//export type CreateBookingDTOType = z.infer<typeof CreateBookingDTO>;
//# sourceMappingURL=bookingZ.js.map