import { User } from '@prisma/client';
import prisma from '../../prisma';
import { hashPassword } from '@/lib/bcrypt';

export const registerService = async (body: User) => {
  try {
    const { name, email, password, role } = body;

    const existingUser = await prisma.user.findFirst({
      where: { email },
    });

    if (existingUser) {
      throw new Error('Email already exist');
    }
    // TODO: create logic referral here

    // Hash the password
    const hashedPassword = await hashPassword(password!);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
        referral: '', // TODO: add referral value here
      },
    });

    return newUser;
  } catch (error) {
    throw error;
  }
};
