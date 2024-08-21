import { cloudinaryUpload } from '@/lib/cloudinary';
import prisma from '@/prisma';

interface CreateEventBody {
  name: string;
  description: string;
  location: string;
  startDate: Date;
  endDate: Date;
  price: number;
  discount: number;
  quota: number;
  categoryId: number;
}

export const createEventService = async (
  body: CreateEventBody,
  file: Express.Multer.File,
  userId: number,
) => {
  try {
    const {
      name,
      description,
      location,
      startDate,
      endDate,
      price,
      discount,
      quota,
      categoryId,
    } = body;

    const event = await prisma.event.findFirst({
      where: { name },
    });

    if (event) {
      throw new Error('Event already exist');
    }

    const { secure_url } = await cloudinaryUpload(file);

    return await prisma.event.create({
      data: {
        name,
        description,
        location,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        price: Number(price),
        discount: Number(discount),
        quota: Number(quota),
        userId: Number(userId),
        categoryId: Number(categoryId),
        thumbnail: secure_url,
      },
    });
  } catch (error) {
    throw error;
  }
};