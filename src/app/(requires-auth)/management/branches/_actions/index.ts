// essentially actions are like controllers

import { z } from "zod";
import {
  AddBranchSchema,
  DeleteBranchSchema,
  GetBranchSchema,
  GetBranchesSchema,
  UpdateBranchSchema,
} from "../_schemas";
import { BranchRepository } from "~~/repositories/BranchRepository";
import { TApiResponse, TApiResponseWithPagination } from "~~/types";
import { Branch } from "@prisma/client";

const {
  createBranch,
  updateBranch,
  destroyBranch,
  retrieveBranchById,
  retrieveBranches,
} = new BranchRepository();
export const getBranches = async (
  values: z.infer<typeof GetBranchesSchema>
): Promise<TApiResponseWithPagination<Branch> | void> => {
  try {
    const validatedFields = GetBranchesSchema.safeParse(values);
    if (!validatedFields.success) {
      return { message: "Validation Error!" };
    }

    const pagination = validatedFields.data?.pagination;
    const search = validatedFields.data?.search;

    const branches = await retrieveBranches({ pagination, search });
    return {
      message: "Branches retrieved successfully!",
      data: {
        currentPage: branches?.metaData.lastIndex ?? "",
        result: branches?.data ?? [],
        total: branches?.metaData.total ?? 0,
      },
    };
  } catch (error) {
    throw error;
  }
};
export const getBranch = async (
  values: z.infer<typeof GetBranchSchema>
): Promise<TApiResponse<Branch> | void> => {
  try {
    const validatedFields = GetBranchSchema.safeParse(values);
    if (!validatedFields.success) {
      return { message: "Validation Error!" };
    }

    const { id } = validatedFields.data;

    const branch = await retrieveBranchById({ id });
    return {
      message: "Branch retrieved successfully!",
      data: branch,
    };
  } catch (error) {
    throw error;
  }
};
export const deleteBranch = async (
  values: z.infer<typeof DeleteBranchSchema>
): Promise<TApiResponse<Branch> | void> => {
  try {
    const validatedFields = DeleteBranchSchema.safeParse(values);
    if (!validatedFields.success) {
      return { message: "Validation Error!" };
    }

    const { id } = validatedFields.data;

    const branch = await destroyBranch(id);
    return {
      message: "Branch updated successfully!",
      data: branch,
    };
  } catch (error) {
    throw error;
  }
};
export const editBranch = async (
  values: z.infer<typeof UpdateBranchSchema>
): Promise<TApiResponse<Branch> | void> => {
  try {
    const validatedFields = UpdateBranchSchema.safeParse(values);
    if (!validatedFields.success) {
      return { message: "Validation Error!" };
    }

    const { data, id } = validatedFields.data;
    const { name, description } = data;

    const branch = await updateBranch(id, {
      name,
      description: description ?? null,
    });
    return {
      message: "Branch updated successfully!",
      data: branch,
    };
  } catch (error) {
    throw error;
  }
};
export const addBranch = async (
  values: z.infer<typeof AddBranchSchema>
): Promise<TApiResponse<Branch> | void> => {
  try {
    const validatedFields = AddBranchSchema.safeParse(values);
    if (!validatedFields.success) {
      return { message: "Validation Error!" };
    }

    const { name, description } = validatedFields.data;

    const branch = await createBranch({ name, description });
    return {
      message: "Branch added successfully!",
      data: branch,
    };
  } catch (error) {
    throw error;
  }
};
