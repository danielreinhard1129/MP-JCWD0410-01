import prisma from '../../prisma';

export const getCategoryService = async (id: number) => {
  const category = await prisma.category.findFirst({
    where: { id },
  });

  if (!category) {
    throw new Error('Category not found');
  }

  return event;
};
