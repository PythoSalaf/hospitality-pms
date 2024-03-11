import { z } from "zod";
import { PaginationSchema, SearchShema } from "~~/schema";

export const AddStaffSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string(),
});
export const AssignMultipleStaffToBranchSchema = z.object({
  branchId: z.string(),
  staffIds: z.array(z.string()),
});
export const UpdateStaffSchema = z.object({
  id: z.string(),
  data: z.object({
    name: z.string().min(3),
    image: z.string().optional(),
  }),
});
export const GetSIngleStaffSchema = z.object({
  id: z.string(),
});
export const GetStaffSchema = z
  .object({
    pagination: PaginationSchema.optional(),
    search: SearchShema.optional(),
  })
  .optional();
