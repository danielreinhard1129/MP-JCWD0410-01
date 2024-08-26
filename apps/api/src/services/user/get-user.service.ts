import prisma from '../../prisma';

export const getUserService = async (id: number) => {
  const user = await prisma.user.findFirst({
    where: { id },
    include: {
      reviews: true,
      userPoints: true,
    },
  });

  if (!user) {
    throw new Error('Organizer not found');
  }

  return user;
};
