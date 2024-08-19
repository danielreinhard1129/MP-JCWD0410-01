import { hashPassword } from '@/lib/bcrypt';
import prisma from '@/prisma';
import { User } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

export const registerService = async (body: Partial<User>) => {
  try {
    const { name, email, password, role, referral } = body;

    // Pastikan semua properti yang dibutuhkan tidak undefined
    if (!name || !email || !role) {
      throw new Error('Name, email, and role are required');
    }

    // Check if the user already exists
    const existingUser = await prisma.user.findFirst({
      where: { email },
    });

    if (existingUser) {
      throw new Error('Email already exists');
    }

    // Hash the user's password
    const hashedPassword = await hashPassword(password!);

    // Generate a new referral code for the new user
    const newReferralCode = uuidv4();

    // Initialize user creation payload
    const newUserPayload = {
      email,
      name,
      password: hashedPassword,
      referral: newReferralCode, // Assign a new referral code
      role,
    };

    // Create the new user in the database
    const newUser = await prisma.user.create({
      data: newUserPayload,
    });

    // If a referral code is provided, process the referral
    if (referral) {
      // Find the referrer based on the referral code
      const referrer = await prisma.user.findFirst({
        where: { referral },
      });

      if (!referrer) {
        throw new Error('Invalid referral code');
      }

      // Increment points for the referrer
      const pointsExpirationDate = new Date();
      pointsExpirationDate.setMonth(pointsExpirationDate.getMonth() + 3); // Points valid for 3 months

      await prisma.userPoint.create({
        data: {
          userId: referrer.id,
          points: 10000, // Increment referrer's points by 10,000
          exp_date: pointsExpirationDate,
        },
      });

      // Give the new user a reward
      const rewardExpirationDate = new Date();
      rewardExpirationDate.setMonth(rewardExpirationDate.getMonth() + 3); // Reward valid for 3 months

      const reward = await prisma.reward.create({
        data: {
          name: 'Referral Reward',
          code: uuidv4(),
          quota: 1,
          nominal: 5000, // This is just an example, adjust based on your needs
          exp_date: rewardExpirationDate,
        },
      });

      // Assign the reward to the new user
      await prisma.userReward.create({
        data: {
          userId: newUser.id,
          rewardId: reward.id,
        },
      });

      // Create a voucher reward for the new user
      const voucherExpirationDate = new Date();
      voucherExpirationDate.setMonth(voucherExpirationDate.getMonth() + 3); // Voucher valid for 3 months

      const voucher = await prisma.voucher.create({
        data: {
          name: 'Welcome Discount Voucher',
          code: uuidv4(),
          quota: 1,
          nominal: 5000, // This is just an example, adjust based on your needs
          exp_date: voucherExpirationDate,
        },
      });

      // Assign the voucher to the new user
      await prisma.userVoucher.create({
        data: {
          userId: newUser.id,
          voucherId: voucher.id,
        },
      });
    }

    // Return the newly created user
    return newUser;
  } catch (error) {
    throw error;
  }
};
