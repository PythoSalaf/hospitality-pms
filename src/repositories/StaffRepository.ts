import { User } from "@prisma/client";
import { UserRepository } from "./UserRepository";
import { z } from "zod";
import { PaginationSchema, SearchShema } from "~~/schema";
import { db } from "~~/lib/database";
import { DEFAULT_PAGE_SIZE } from "~~/constants";

/**
 * Repository class for managing staff-related operations in the database.
 */
export class StaffRepository {
  private userRepo: UserRepository;
  constructor() {
    this.userRepo = new UserRepository();
  }

  /**
   * Creates a new staff in the database.
   * @param param0 - Object containing user details (name, email, password).
   * @returns A promise that resolves with the created user.
   */
  createStaff = async ({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }): Promise<User> => {
    try {
      const { createUser } = this.userRepo;
      return await createUser({
        name,
        email,
        password,
        currentRole: "STAFF",
        userRoles: ["STAFF"],
        staff: {},
      });
    } catch (error) {
      throw error;
    }
  };

  /**
   * Retrieves staff.
   * @param param0 - Object containing the pagination, ....
   * @returns A promise that resolves with the retrieved staff or null if not found.
   */
  async retrieveStaff({
    pagination = {},
    search,
  }: {
    pagination?: z.infer<typeof PaginationSchema>;
    search?: z.infer<typeof SearchShema>;
  }) {
    const { currentPage: lastItemIndex, pageSize = DEFAULT_PAGE_SIZE } =
      pagination;

    try {
      const total = await db.staff.count({
        where: {
          user: { name: { contains: search } },
        },
      });
      const data = await db.staff.findMany({
        take: pageSize,
        ...(lastItemIndex
          ? {
              skip: 1, // Skip the cursor
              cursor: {
                id: lastItemIndex,
              },
            }
          : {}),
        where: {
          user: { name: { contains: search } },
        },
        include: {
          user: true,
        },
      });

      const lastItemInResults = data[pageSize - 1]; // Remember: zero-based index! :)
      const cursor = lastItemInResults?.id;
      return {
        data,
        metaData: {
          hasNextPage: data.length > 0,
          lastIndex: cursor,
          total,
        },
      };
    } catch {
      return null;
    }
  }
  /**
   * Updates staff
   * @param param0 - Object containing the user id of staff, & data to be updated
   * @returns A promise that resolves with the retrieved staff or null if not found.
   */
  async updateStaff({
    id,
    data,
  }: {
    id: string;
    data: { name: string; image?: string };
  }) {
    try {
      const staff = await db.staff.update({
        where: { id },
        data: {
          user: {
            update: data,
          },
        },
      });
      return staff;
    } catch {
      return null;
    }
  }
  /**
   * Assign Staff to branches
   * @param param0 - staffIds
   * @returns A promise that resolves with the updated branch or null if not found.
   */
  async assignStaffToBranch({
    staffIds,
    branchId,
  }: {
    staffIds: string[];
    branchId: string;
  }) {
    try {
      const updatedBranch = await db.branch.update({
        where: { id: branchId },

        data: {
          staff: {
            connect: staffIds.map((staffId) => ({
              branchId_staffId: {
                branchId,
                staffId: staffId,
              },
            })),
          },
        },
        select: {
          id: true,
          name: true,
          staff: true,
          description: true,
        },
      });
      return updatedBranch;
    } catch {
      return null;
    }
  }
  /**
   * Retrieves staff by id.
   * @param param0 - Object containing the user id of staff
   * @returns A promise that resolves with the retrieved staff or null if not found.
   */
  async retrieveStaffById({ id }: { id: string }) {
    try {
      const staff = await db.staff.findUnique({
        where: { id },
        include: { user: true, branches: true },
      });
      return staff;
    } catch {
      return null;
    }
  }
}
