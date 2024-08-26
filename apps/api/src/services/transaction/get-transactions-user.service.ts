import prisma from '../../prisma';

export const getTransactionsUserService = async (userId: number) => {
  try {
    const transactions = await prisma.transaction.findMany({
      where: { userId },
      include: {
        event: {
          include: {
            reviews: {
              where: { userId },
            },
          },
        },
      },
    });

    return transactions;
  } catch (error) {
    throw error;
  }
};
