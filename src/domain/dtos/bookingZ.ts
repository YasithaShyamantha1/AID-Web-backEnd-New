import { z } from "zod";

export const CreateBookingDTO = z.object({
  hotelId: z.string(),
  userId: z.string(),
  checkIn: z.union([z.string(), z.date()]).transform(val => new Date(val)),
  checkOut: z.union([z.string(), z.date()]).transform(val => new Date(val)),
  roomNumber: z.number(),
});

  

//export type CreateBookingDTOType = z.infer<typeof CreateBookingDTO>;
