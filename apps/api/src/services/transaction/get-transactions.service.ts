import { Prisma, Status, PaymentMethod } from '@prisma/client';
import prisma from '../../prisma';

interface GetTransactionsService {
  page: number;
  take: number;
  sortBy: string;
  sortOrder: string;
  search?: string;
  status?: Status;
  paymentMethod?: PaymentMethod;
}

export const getTransactionsService = async (query: GetTransactionsService) => {
  try {
    const { page, take, sortBy, sortOrder, search, status, paymentMethod } = query;

    const whereClause: Prisma.TransactionWhereInput = {};

    if (status) {
      whereClause.status = status;
    }

    if (paymentMethod) {
      whereClause.paymentMethod = paymentMethod;
    }

    // Filter berdasarkan event.name jika search diisi
    if (search) {
      whereClause.event = {
        name: {
          contains: search,
        },
      };
    }

    const transactions = await prisma.transaction.findMany({
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
            email: true,
            profilePic: true,
          },
        },
        event: {
          select: {
            name: true,
            thumbnail: true,
            location: true,
            startDate: true,
            endDate: true,
          },
        },
      },
    });

    const total = await prisma.transaction.count({
      where: whereClause,
    });

    return {
      data: transactions,
      meta: { total, take, page },
    };
  } catch (error) {
    throw error;
  }
};
