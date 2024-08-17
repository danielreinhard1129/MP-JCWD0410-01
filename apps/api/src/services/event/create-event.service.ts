import { Event } from '@prisma/client';
import prisma from '../../prisma';

export const CreateEventService = async (body: Event) => {
  const {
    name,
    thumbnail,
    description,
    location,
    start_date,
    end_date,
    discount,
    quota,
    booked,
    isDeleted,
    userId,
    categoryId,
  } = body;

  try {
    const newEvent = prisma.event.create({
      data: {
        name,
        thumbnail,
        description,
        location,
        start_date,
        end_date,
        discount,
        quota,
        booked,
        isDeleted,
        userId,
        categoryId,
      },
    });
  } catch (error) {
    throw error;
  }
};
