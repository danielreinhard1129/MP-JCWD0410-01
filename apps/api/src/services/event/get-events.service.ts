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
      whereClause.location = { contains: location };  // Tanpa 'mode'
    }

    if (category) {
      whereClause.category = {
        title: { contains: category }  // Tanpa 'mode'
      };
    }

    if (search) {
      whereClause.name = { contains: search };  // Tanpa 'mode'
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
          select: {
            name: true,
            profilePic: true,
          },
        },
        category: {
          select: {
            title: true,
          },
        },
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
