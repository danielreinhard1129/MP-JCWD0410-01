import prisma from '@/prisma';

interface CreateCategoryBody {
  title: string;
}

export const createCategoryService = async (body: CreateCategoryBody) => {
  try {
    const { title } = body;

    const category = await prisma.category.findFirst({
      where: { title },
    });

    if (category) {
      throw new Error('Category already exist');
    }

    return prisma.category.create({
      data: {
        title,
      },
    });
  } catch (error) {
    throw error;
  }
};
