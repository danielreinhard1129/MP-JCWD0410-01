import prisma from '@/prisma';
import { PaymentMethod } from '@prisma/client';

interface CreateTransactionBody {
  qty: number;
  eventId: number;
  paymentMethod: PaymentMethod;
  isPointUsed: boolean;
}

export const createTransactionService = async (
  body: CreateTransactionBody,
  userId: number,
) => {
  try {
    const { qty, eventId, paymentMethod, isPointUsed } = body;

    // get data user berdasarkan userid
    const user = await prisma.user.findFirst({
      where: { id: userId },
      include: {
        userPoints: true,
      },
    });

    if (!user) {
      throw new Error('Invalid user id');
    }

    // kalo isPointUsed === true
    // cek point nya user tsb, kalo <= 0 throw error
    // kalo engga lanjut ke process berikutnya
    if (isPointUsed === true) {
      if (user.userPoints[0].points <= 0) {
        throw new Error('Point anda nol');
      }
    }

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

    // Calculate total price
    const totalPrice = event.price * qty;

    let pointsUsed = 0;

    if (isPointUsed) {
      pointsUsed = Math.min(user.userPoints[0].points, totalPrice);
    }

    // Update user points if points are used
    if (isPointUsed) {
      await prisma.userPoint.update({
        where: {
          userId,
        },
        data: {
          points: {
            decrement: pointsUsed,
          },
        },
      });
    }

    // cek isPointUsed
    // kalo misalnya true, update point milik si user jadi 0
    // if (isPointUsed === true) {
    //   user.userPoints[0].points === 0;
    // }
    // create new transaction
    // kolom total (event.price * qty) - point usernya kalo isPointUsed true. kalo isPointUsed false event.pricce * qty
    // kolom pointUsed di isi sama point usernya kalo misalnya isPointUsed === true

    return await prisma.transaction.create({
      data: {
        qty,
        eventId,
        userId,
        total: isPointUsed ? totalPrice - pointsUsed : totalPrice,
        status: `WAIITNG_FOR_PAYMENT`,
        paymentMethod,
      },
    });
  } catch (error) {
    throw error;
  }
};
