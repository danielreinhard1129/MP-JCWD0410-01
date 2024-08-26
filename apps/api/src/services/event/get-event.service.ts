import prisma from '../../prisma';

export const getEventService = async (id: number) => {
  try {
    const event = await prisma.event.findFirst({
      where: { id, isDeleted: false },
      include: {
        user: { include: { userPoints: true } },
        category: { select: { title: true } },
      },
    });

    if (!event) {
      throw new Error('Event not found');
    }

    return event;
  } catch (error) {
    throw error;
  }
};
