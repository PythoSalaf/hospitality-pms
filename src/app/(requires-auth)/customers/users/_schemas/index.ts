import * as z from "zod";

export const FilterUsersSchema = z.object({
  phoneNumber: z.string().optional(),
  date: z.string().optional(),
  email: z.string().optional(),
  name: z.string().optional(),
  organizationId: z.string().optional(),
  //   TODO: Find out why imports are not recognized properly in enum
  status: z.enum(["inactive", "pending", "blacklisted", "active"]).optional(),
});
