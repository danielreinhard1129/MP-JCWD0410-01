import prisma from '@/prisma';

interface CreateVoucherBody {
  name: string;
  code: string;
  quota: number;
  nominal: number;
  expDate: Date;
  eventId: number;
}

export const createVoucherService = async (
  body: CreateVoucherBody
) => {
  try {
    const {
      name,
      code,
      quota,
      nominal,
      expDate,
      eventId
    } = body;

    // Check if the event exists
    const event = await prisma.event.findFirst({
      where: { id: eventId },
    });

    if (!event) {
      throw new Error('Event not found');
    }

    // Check if the voucher code is unique
    const existingVoucher = await prisma.voucher.findFirst
    ({
      where: { code },
    });

    if (existingVoucher) {
      throw new Error('Voucher code already exists');
    }

    // Create the voucher
    return await prisma.voucher.create({
      data: {
        name,
        code,
        quota: Number(quota),
        nominal: Number(nominal),
        expDate: new Date(expDate),
        eventId: event.id,
      },
    });
  } catch (error) {
    throw error;
  }
};
