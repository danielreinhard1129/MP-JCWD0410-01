import prisma from '../../prisma';

export const getEventService = async (id: number) => {
  try {
    const event = await prisma.event.findFirst({
      where: { id, isDeleted: false },
    });

    if (!event) {
      throw new Error('Event not found');
    }

    return event;
  } catch (error) {
    throw error;
  }
};
