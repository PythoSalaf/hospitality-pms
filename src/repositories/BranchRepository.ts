import { Branch } from "@prisma/client";
import { z } from "zod";
import { DEFAULT_PAGE_SIZE } from "~~/constants";
import { db } from "~~/lib/database";
import { PaginationSchema, SearchShema } from "~~/schema";

/**
 * Repository class for managing branch-related operations in the database.
 */
export class BranchRepository {
  /**
   * Updates a branch.
   *
   * @param id - The ID of the branch to update.
   * @returns A Promise that resolves to the updated branch or null if not found.
   */
  updateBranch = async (
    id: string,
    data: Pick<Branch, "description" | "name">
  ) => {
    return await db.branch.update({
      where: {
        id,
      },
      data,
    });
  };

  /**
   * Deletes a branch.
   *
   * @param id - The ID of the branch to delete.
   * @returns A Promise that resolves to the deleted branch or null if not found.
   */
  destroyBranch = async (id: string) => {
    return await db.branch.delete({
      where: {
        id,
      },
    });
  };
  /**
   * Creates a new branch in the database.
   * @param param0 - Object containing branch details (name, email, password).
   * @returns A promise that resolves with the created branch.
   */
  createBranch = async ({
    name,
    description,
  }: {
    name: string;
    description?: string;
  }): Promise<Branch> => {
    return await db.branch.create({
      data: {
        name,
        description,
      },
    });
  };

  /**
   * Retrieves a branches .
   * @param param0 - Object containing the branch's ID.
   * @returns A promise that resolves with the retrieved branch or null if not found.
   */
  async retrieveBranches({
    pagination = {},
    search,
  }: {
    pagination?: z.infer<typeof PaginationSchema>;
    search?: z.infer<typeof SearchShema>;
  }) {
    const { currentPage, pageSize = DEFAULT_PAGE_SIZE } = pagination;

    try {
      const data = await db.branch.findMany({
        take: pageSize,
        skip: 1, // Skip the cursor
        cursor: {
          id: currentPage,
        },
        where: { name: { contains: search } },
      });
      const lastItemInResults = data[pageSize - 1]; // Remember: zero-based index! :)
      const cursor = lastItemInResults.id;
      return {
        data,
        total: data.length,
        currentIndex: cursor,
      };
    } catch {
      return null;
    }
  }
  /**
   * Retrieves a branch by their ID.
   * @param param0 - Object containing the branch's ID.
   * @returns A promise that resolves with the retrieved branch or null if not found.
   */
  async retrieveBranchById({ id }: { id: string }) {
    try {
      const branch = await db.branch.findUnique({ where: { id } });
      return branch;
    } catch {
      return null;
    }
  }
}
