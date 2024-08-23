import prisma from '@/prisma';
import { PaymentMethod } from '@prisma/client';

interface CreateTransactionBody {
  qty: number;
  eventId: number;
  paymentMethod: PaymentMethod;
}

export const createTransactionService = async (
  body: CreateTransactionBody,
  userId: number,
) => {
  try {
    const { qty, eventId, paymentMethod } = body;

    const event = await prisma.event.findFirst({
      where: { id: eventId },
    });

    if (!event) {
      throw new Error('Invalid event id');
    }

    if (event.quota - event.booked < qty) {
      throw new Error('Ticket quota exceeded.');
    }

    await prisma.event.update({
      where: { id: eventId },
      data: {
        booked: {
          increment: qty,
        },
      },
    });

    return await prisma.transaction.create({
      data: {
        qty,
        eventId,
        userId,
        total: event.price * qty,
        status: `WAIITNG_FOR_PAYMENT`,
        paymentMethod,
      },
    });
  } catch (error) {
    throw error;
  }
};
