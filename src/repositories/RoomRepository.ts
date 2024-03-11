import { Room } from "@prisma/client";
import { z } from "zod";
import { DEFAULT_PAGE_SIZE } from "~~/constants";
import { db } from "~~/lib/database";
import { PaginationSchema, SearchShema } from "~~/schema";

/**
 * Repository class for managing room-related operations in the database.
 */
export class RoomRepository {
  /**
   * Updates a room.
   *
   * @param id - The ID of the room to update.
   * @returns A Promise that resolves to the updated room or null if not found.
   */
  updateRoom = async (id: string, data: Omit<Room, "id">) => {
    return await db.room.update({
      where: {
        id,
      },
      data,
    });
  };

  /**
   * Deletes a room.
   *
   * @param id - The ID of the room to delete.
   * @returns A Promise that resolves to the deleted room or null if not found.
   */
  destroyRoom = async (id: string) => {
    return await db.room.delete({
      where: {
        id,
      },
    });
  };
  /**
   * Creates a new room in the database.
   * @param param0 - Object containing room details to be created.
   * @returns A promise that resolves with the created room.
   */
  createRoom = async (data: Omit<Room, "id">): Promise<Room> => {
    return await db.room.create({
      data,
    });
  };

  /**
   * Retrieves rooms .
   * @param param0 - Object containing the room's ID.
   * @returns A promise that resolves with the retrieved rooms .
   */
  async retrieveRooms({
    pagination = {},
    search,
  }: {
    pagination?: z.infer<typeof PaginationSchema>;
    search?: z.infer<typeof SearchShema>;
  }) {
    const { currentPage: lastItemIndex, pageSize = DEFAULT_PAGE_SIZE } =
      pagination;

    try {
      const total = await db.room.count({
        where: { roomNumber: { contains: search } },
      });
      const data = await db.room.findMany({
        take: pageSize,
        ...(lastItemIndex
          ? {
              skip: 1, // Skip the cursor
              cursor: {
                id: lastItemIndex,
              },
            }
          : {}),
        where: { roomNumber: { contains: search } },
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
   * Retrieves a room by their ID.
   * @param param0 - Object containing the room's ID.
   * @returns A promise that resolves with the retrieved room or null if not found.
   */
  async retrieveRoomById({ id }: { id: string }) {
    try {
      const room = await db.room.findUnique({ where: { id } });
      return room;
    } catch {
      return null;
    }
  }
}
