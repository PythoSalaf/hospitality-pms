import { z } from "zod";
import { PaginationSchema, SearchShema } from "~~/schema";

export const AddBranchSchema = z.object({
  name: z.string().min(3),
  description: z.string().optional(),
});
export const UpdateBranchSchema = z.object({
  id: z.string(),
  data: AddBranchSchema,
});
export const GetBranchSchema = z.object({
  id: z.string(),
});
export const DeleteBranchSchema = GetBranchSchema;
export const GetBranchesSchema = z
  .object({
    pagination: PaginationSchema.optional(),
    search: SearchShema.optional(),
  })
  .optional();
