// essentially actions are like controllers

import { z } from "zod";
import {
  AddRoomSchema,
  DeleteRoomSchema,
  GetRoomSchema,
  GetRoomsSchema,
  UpdateRoomSchema,
} from "../_schemas";
import { RoomRepository } from "~~/repositories/RoomRepository";
import { TApiResponse, TApiResponseWithPagination } from "~~/types";
import { Room } from "@prisma/client";

const { createRoom, updateRoom, destroyRoom, retrieveRoomById, retrieveRooms } =
  new RoomRepository();
export const getRooms = async (
  values: z.infer<typeof GetRoomsSchema>
): Promise<TApiResponseWithPagination<Room> | void> => {
  try {
    const validatedFields = GetRoomsSchema.safeParse(values);
    if (!validatedFields.success) {
      return { message: "Validation Error!" };
    }

    const pagination = validatedFields.data?.pagination;
    const search = validatedFields.data?.search;

    const Rooms = await retrieveRooms({ pagination, search });
    return {
      message: "Rooms retrieved successfully!",
      data: {
        currentPage: Rooms?.metaData.lastIndex ?? "",
        result: Rooms?.data ?? [],
        total: Rooms?.metaData.total ?? 0,
      },
    };
  } catch (error) {
    throw error;
  }
};
export const getRoom = async (
  values: z.infer<typeof GetRoomSchema>
): Promise<TApiResponse<Room> | void> => {
  try {
    const validatedFields = GetRoomSchema.safeParse(values);
    if (!validatedFields.success) {
      return { message: "Validation Error!" };
    }

    const { id } = validatedFields.data;

    const Room = await retrieveRoomById({ id });
    return {
      message: "Room retrieved successfully!",
      data: Room,
    };
  } catch (error) {
    throw error;
  }
};
export const deleteRoom = async (
  values: z.infer<typeof DeleteRoomSchema>
): Promise<TApiResponse<Room> | void> => {
  try {
    const validatedFields = DeleteRoomSchema.safeParse(values);
    if (!validatedFields.success) {
      return { message: "Validation Error!" };
    }

    const { id } = validatedFields.data;

    const Room = await destroyRoom(id);
    return {
      message: "Room updated successfully!",
      data: Room,
    };
  } catch (error) {
    throw error;
  }
};
export const editRoom = async (
  values: z.infer<typeof UpdateRoomSchema>
): Promise<TApiResponse<Room> | void> => {
  try {
    const validatedFields = UpdateRoomSchema.safeParse(values);
    if (!validatedFields.success) {
      return { message: "Validation Error!" };
    }

    const { data, id } = validatedFields.data;

    const Room = await updateRoom(id, data);
    return {
      message: "Room updated successfully!",
      data: Room,
    };
  } catch (error) {
    throw error;
  }
};
export const addRoom = async (
  values: z.infer<typeof AddRoomSchema>
): Promise<TApiResponse<Room> | void> => {
  try {
    const validatedFields = AddRoomSchema.safeParse(values);
    if (!validatedFields.success) {
      return { message: "Validation Error!" };
    }

    const data = validatedFields.data;

    const Room = await createRoom(data);
    return {
      message: "Room added successfully!",
      data: Room,
    };
  } catch (error) {
    throw error;
  }
};
