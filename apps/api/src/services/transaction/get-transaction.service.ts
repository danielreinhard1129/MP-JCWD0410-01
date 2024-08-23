import prisma from '../../prisma';

export const getTransactionService = async (id: number) => {
  try {
    const transaction = await prisma.transaction.findFirst({
      where: { id },
      include: {
        event: {
          select: {
            id: true,
            thumbnail: true,
            startDate: true,
            endDate: true,
            name: true,
            location: true,
          },
        },
      },
    });

    if (!transaction) {
      throw new Error('Invalid Transaction');
    }

    return transaction;
  } catch (error) {
    throw error;
  }
};
