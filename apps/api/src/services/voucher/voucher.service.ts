import { Event } from '@prisma/client';
import prisma from '../../prisma';

export const voucherService = async (body: Event) => {
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
    price, // pastikan properti price juga disertakan
  } = body;

  try {
    const newEvent = await prisma.event.create({
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
        price, // sertakan properti price di sini
      },
    });
    
    return newEvent;
  } catch (error) {
    throw error;
  }
};
