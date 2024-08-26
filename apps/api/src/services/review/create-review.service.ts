import prisma from '@/prisma';
import { Review } from '@prisma/client';

interface CreateReviewBody {
  comment: string;
  rating: number;
  eventId: number;
}

export const createReviewService = async (
  body: CreateReviewBody,
  userId: number,
) => {
  try {
    const { comment, rating, eventId } = body;

    const event = await prisma.event.findFirst({
      where: { id: eventId },
    });

    if (!event) {
      throw new Error('Invalid Event Id');
    }

    if (rating < 1 || rating > 5) {
      throw new Error('Rating must be between 1 and 5');
    }

    if (!comment || comment.trim().length === 0) {
      throw new Error('Comment cannot be empty');
    }

    return prisma.review.create({
      data: {
        comment,
        rating,
        userId,
        eventId,
      },
    });
  } catch (error) {
    throw error;
  }
};
