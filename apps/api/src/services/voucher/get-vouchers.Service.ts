// src/services/event/get-voucher.service.ts
import { Prisma } from '@prisma/client';
import prisma from '../../prisma';

interface GetVouchersService {
  page: number;
  take: number;
  sortBy: string;
  sortOrder: string;
  search: string;
  eventId?: number;
}

export const getVouchersService = async (query: GetVouchersService) => {
  try {
    const { page, take, sortBy, sortOrder, search, eventId } = query;

    const whereClause: Prisma.VoucherWhereInput = {
      code: { contains: search },
    };

    if (eventId) {
      whereClause.eventId = eventId;
    }

    const vouchers = await prisma.voucher.findMany({
      where: whereClause,
      take: take,
      skip: (page - 1) * take,
      orderBy: {
        [sortBy]: sortOrder,
      },

      include: {
        event: {
          select: {
            name: true,
          },
        },
      },
    });

    const total = await prisma.voucher.count({
      where: whereClause,
    });

    return {
      data: vouchers,
      meta: { total, take, page },
    };
  } catch (error) {
    throw error;
  }
};
