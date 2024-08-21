import prisma from '@/prisma';

interface CreateTransactionBody {
  qty: number;
  eventId: number;
}

export const createCategoryService = async (body: CreateTransactionBody) => {
  try {
    const { qty, eventId } = body;

    // const transaction = await prisma.transaction.findFirst({
    //   where: { },
    // });

    // if (transaction) {
    //   throw new Error('Category already exist');
    // }

    return prisma.transaction.create({
      data: { qty, eventId },
    });
  } catch (error) {
    throw error;
  }
};
