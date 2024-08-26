import { Prisma } from '@prisma/client';
import prisma from '../../prisma';

interface GetReviewsService {
  userId: number;
  page: number;
  take: number;
  sortBy: string;
  sortOrder: string;
}

export const getReviewsService = async (query: GetReviewsService) => {
  try {
    const { page, take, sortBy, sortOrder, userId } = query;

    const whereClause: Prisma.ReviewWhereInput = {};

    if (userId) {
      whereClause.event = {
        userId,
      };
    }

    const reviews = await prisma.review.findMany({
      where: whereClause,
      take: take,
      skip: (page - 1) * take,
      orderBy: {
        [sortBy]: sortOrder,
      },
      include: { user: true, event: true },
    });

    const total = await prisma.review.count({
      where: whereClause,
    });

    return { data: reviews, meta: take, page, total };
  } catch (error) {
    throw error;
  }
};
