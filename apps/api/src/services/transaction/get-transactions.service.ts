import prisma from '../../prisma';

export const getTransactionsService = async (userId: number) => {
  try {
    const transactions = await prisma.transaction.findMany({
      where: { userId },
      include: { event: { select: { name: true, thumbnail: true } } },
    });

    return transactions;
  } catch (error) {
    throw error;
  }
};
