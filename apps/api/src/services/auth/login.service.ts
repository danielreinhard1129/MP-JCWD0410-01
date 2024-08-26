import { JWT_SECRET } from '@/config';
import { comparePassword } from '@/lib/bcrypt';
import prisma from '@/prisma';
import { User } from '@prisma/client';
import { sign } from 'jsonwebtoken';
import React from 'react';

export const loginService = async (body: Pick<User, 'email' | 'password'>) => {
  try {
    const { email, password } = body;

    const user = await prisma.user.findFirst({
      where: { email, provider: 'CREDENTIALS' },
      include: { userPoints: true },
    });

    if (!user) {
      throw new Error('Invalid email address');
    }

    const isPasswordValid = await comparePassword(password!, user.password!);

    if (!isPasswordValid) {
      throw new Error('Incorrect password');
    }

    const token = sign({ id: user.id }, JWT_SECRET!, {
      expiresIn: '2h',
    });

    const { password: pass, ...userWithoutPassword } = user;

    // Mengembalikan data user termasuk role
    return { ...userWithoutPassword, token, role: user.role };
  } catch (error) {
    throw error;
  }
};
