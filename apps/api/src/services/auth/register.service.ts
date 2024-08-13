import { User } from '@prisma/client';
import prisma from '../../prisma';
import { hashPassword } from '@/lib/bcrypt';


export const registerService = async (body: User) => {
  try {
    const { name, email, password } = body;

    const existingUser = await prisma.user.findFirst({
      where: { email },
    });
    
    if (existingUser) {
      throw new Error("Email already exist");
    }

    // Hash the password
    const hashedPassword = await hashPassword(password!);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
       
      },
    });

return newUser
  } catch (error) {
    throw error;
  }
};
