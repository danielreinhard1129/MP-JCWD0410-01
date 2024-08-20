import { cloudinaryUpload } from '@/lib/cloudinary';
import prisma from '@/prisma';

interface CreateEventBody {
  name: string;
  description: string;
  location: string;
  start_date: Date;
  end_date: Date;
  price: number;
  discount: number;
  quota: number;
  booked: number;
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
      start_date,
      end_date,
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

    return prisma.event.create({
      data: {
        name,
        description,
        location,
        start_date: new Date(start_date),
        end_date: new Date(end_date),
        price: Number(price),
        discount: Number(discount),
        quota: Number(quota),
        userId: Number(userId),
        categoryId: 1,
        thumbnail: secure_url,
      },
    });
  } catch (error) {
    throw error;
  }
};
