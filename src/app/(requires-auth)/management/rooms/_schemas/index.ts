import { z } from "zod";
import { PaginationSchema, SearchShema } from "~~/schema";

export const AddRoomSchema = z.object({
  roomNumber: z.string(),
  branchId: z.string(),
  type: z.string(),
  description: z.string().nullable().default(null),
  price: z.number().positive(),
  capacity: z.number().positive(),
  bedType: z.string(),
  amenities: z.array(z.string()).transform((val) => val.join(",")),
  availability: z.boolean(),
  images: z.array(z.string()).transform((val) => val.join(",")),
  floor: z.number().int().positive(),
  status: z.string(),
  lastCleaned: z.date().optional().default(new Date()),
});
export const UpdateRoomSchema = z.object({
  id: z.string(),
  data: AddRoomSchema,
});
export const GetRoomSchema = z.object({
  id: z.string(),
});
export const DeleteRoomSchema = GetRoomSchema;
export const GetRoomsSchema = z
  .object({
    pagination: PaginationSchema.optional(),
    search: SearchShema.optional(),
  })
  .optional();
