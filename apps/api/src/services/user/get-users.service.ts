import prisma from '../../prisma';

export const getUsersService = async () => {
  try {
    const users = await prisma.user.findMany();

    return users;
  } catch (error) {
    throw error;
  }
};
