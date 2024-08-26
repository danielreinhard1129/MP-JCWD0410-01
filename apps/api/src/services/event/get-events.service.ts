import { Prisma } from '@prisma/client';
import prisma from '../../prisma';

interface GetEventsService {
  page: number;
  take: number;
  sortBy: string;
  sortOrder: string;
  search?: string;
  location?: string;
  category?: string;
}

export const getEventsService = async (query: GetEventsService) => {
  try {
    const { page, take, sortBy, sortOrder, search, location, category } = query;

    const whereClause: Prisma.EventWhereInput = {
      isDeleted: false,
    };

    if (location) {
      whereClause.location = { contains: location };
    }

    if (category) {
      whereClause.category = {
        title: { contains: category },
      };
    }

    if (search) {
      whereClause.name = { contains: search };
    }

    const events = await prisma.event.findMany({
      where: whereClause,
      take: take,
      skip: (page - 1) * take,
      orderBy: {
        [sortBy]: sortOrder,
      },
      include: {
        user: {
          include: { userPoints: true },
        },
        category: {
          select: {
            title: true,
          },
        },
        reviews: true,
      },
    });

    const total = await prisma.event.count({
      where: whereClause,
    });

    return {
      data: events,
      meta: { total, take, page },
    };
  } catch (error) {
    throw error;
  }
};
