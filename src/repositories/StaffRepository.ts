import { User } from "@prisma/client";
import { UserRepository } from "./UserRepository";
import { z } from "zod";
import { PaginationSchema, SearchShema } from "~~/schema";

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
    try {
      const { retrieveUsers } = this.userRepo;
      return await retrieveUsers({ pagination, search, userRole: "STAFF" });
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
      const { updateUser } = this.userRepo;
      return await updateUser({ id, data });
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
      const { getUserById } = this.userRepo;
      return await getUserById({ id });
    } catch {
      return null;
    }
  }
}
