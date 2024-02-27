// essentially actions are like controllers

import { z } from "zod";
import { StaffRepository } from "~~/repositories/StaffRepository";

import { TApiResponse, TApiResponseWithPagination } from "~~/types";
import {
  AddStaffSchema,
  GetSIngleStaffSchema,
  GetStaffSchema,
  UpdateStaffSchema,
} from "../_schemas";
import { User } from "@prisma/client";

const { createStaff, retrieveStaff, retrieveStaffById, updateStaff } =
  new StaffRepository();
export const getBranches = async (
  values: z.infer<typeof GetStaffSchema>
): Promise<TApiResponseWithPagination<User> | void> => {
  try {
    const validatedFields = GetStaffSchema.safeParse(values);
    if (!validatedFields.success) {
      return { message: "Validation Error!" };
    }

    const pagination = validatedFields.data?.pagination;
    const search = validatedFields.data?.search;

    const output = await retrieveStaff({ pagination, search });
    return {
      message: "Staff retrieved successfully!",
      data: {
        currentPage: output?.metaData.lastIndex ?? "",
        result: output?.data ?? [],
        total: output?.metaData.total ?? 0,
      },
    };
  } catch (error) {
    throw error;
  }
};
export const getSingleStaff = async (
  values: z.infer<typeof GetSIngleStaffSchema>
): Promise<TApiResponse<User> | void> => {
  try {
    const validatedFields = GetSIngleStaffSchema.safeParse(values);
    if (!validatedFields.success) {
      return { message: "Validation Error!" };
    }

    const { id } = validatedFields.data;

    const output = await retrieveStaffById({ id });
    return {
      message: "Staff retrieved successfully!",
      data: output,
    };
  } catch (error) {
    throw error;
  }
};

export const editStaff = async (
  values: z.infer<typeof UpdateStaffSchema>
): Promise<TApiResponse<User> | void> => {
  try {
    const validatedFields = UpdateStaffSchema.safeParse(values);
    if (!validatedFields.success) {
      return { message: "Validation Error!" };
    }

    const { data, id } = validatedFields.data;
    const { name, image } = data;

    const output = await updateStaff({
      id,
      data: {
        name,
        image,
      },
    });
    return {
      message: "Staff updated successfully!",
      data: output,
    };
  } catch (error) {
    throw error;
  }
};
export const addStaff = async (
  values: z.infer<typeof AddStaffSchema>
): Promise<TApiResponse<User> | void> => {
  try {
    const validatedFields = AddStaffSchema.safeParse(values);
    if (!validatedFields.success) {
      return { message: "Validation Error!" };
    }

    const { name, email, password } = validatedFields.data;

    const staff = await createStaff({ name, email, password });
    return {
      message: "Staff added successfully!",
      data: staff,
    };
  } catch (error) {
    throw error;
  }
};
