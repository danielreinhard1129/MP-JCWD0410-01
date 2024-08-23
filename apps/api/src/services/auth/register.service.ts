import { hashPassword } from '@/lib/bcrypt';
import prisma from '@/prisma';
import { User } from '@prisma/client';
import { nanoid } from 'nanoid';

export const registerService = async (body: Partial<User>) => {
  try {
    const { name, email, password, role, referral } = body;

    // Memastikan bahwa properti name, email, role tidak undefined atau wajib diisi
    if (!name || !email || !role) {
      throw new Error('Name, email, and role are required');
    }

    // Periksa apakah user sudah ada berdasarkan email
    const existingUser = await prisma.user.findFirst({
      where: { email },
    });

    if (existingUser) {
      throw new Error('Email already exists');
    }

    // Jika ada referral, lakukan validasi dan assign ke const
    const referrer = referral
      ? await prisma.user.findFirst({ where: { referral } })
      : null;

    if (referral && !referrer) {
      throw new Error('Invalid referral code');
    }

    // Hitung jumlah penggunaan referral code sebelum melanjutkan
    if (referrer) {
      const referralUsageCount = await prisma.user.count({
        where: {
          referral: referrer.referral,
        },
      });

      // Batasi penggunaan referral code hingga maksimal 3 kali
      if (referralUsageCount >= 3) {
        throw new Error(
          'Referral code has reached its maximum usage limit of 3.',
        );
      }
    }

    // Bungkus seluruh proses dalam transaksi dengan menggunakan $transaction
    return await prisma.$transaction(async (prisma) => {
      // Hash password user
      const hashedPassword = await hashPassword(password!);

      // Generate kode referral baru untuk user baru
      const newReferralCode = nanoid(5); // Menggunakan nanoid untuk generate referral code

      // Buat payload user baru
      const newUserPayload = {
        email,
        name,
        password: hashedPassword,
        referral: newReferralCode, // Assign a new referral code
        role,
      };

      // Buat user baru di database
      const newUser = await prisma.user.create({
        data: newUserPayload,
      });

      // Jika referral valid, tambahkan poin ke pemilik referral dan berikan reward kepada user baru
      if (referrer) {
        // Tambahkan atau perbarui poin ke pemilik referral
        const pointsExpirationDate = new Date();
        pointsExpirationDate.setMonth(pointsExpirationDate.getMonth() + 3); // Poin berlaku 3 bulan

        // Periksa apakah user sudah memiliki entry di userPoint
        const existingUserPoint = await prisma.userPoint.findUnique({
          where: { userId: referrer.id },
        });

        if (existingUserPoint) {
          // Jika sudah ada, update poin dan tanggal kedaluwarsa
          await prisma.userPoint.update({
            where: { userId: referrer.id },
            data: {
              points: existingUserPoint.points + 10000, // Tambah poin referrer sebanyak 10.000
              expDate:
                pointsExpirationDate > existingUserPoint.expDate
                  ? pointsExpirationDate
                  : existingUserPoint.expDate,
            },
          });
        } else {
          // Jika belum ada, buat entry baru
          await prisma.userPoint.create({
            data: {
              userId: referrer.id,
              points: 10000, // Tambah poin referrer sebanyak 10.000
              expDate: pointsExpirationDate,
            },
          });
        }

        // Berikan reward kepada user baru
        const rewardExpirationDate = new Date();
        rewardExpirationDate.setMonth(rewardExpirationDate.getMonth() + 3); // Reward berlaku 3 bulan

        const reward = await prisma.reward.create({
          data: {
            name: 'Voucher Diskon',
            code: nanoid(), // Menggunakan nanoid untuk generate reward code
            quota: 1,
            nominal: 500, // Nominal reward
            claimed: 1,
            expDate: rewardExpirationDate,
          },
        });

        await prisma.userReward.create({
          data: {
            userId: newUser.id,
            rewardId: reward.id,
          },
        });
      }

      // Return user yang baru dibuat
      return newUser;
    });
  } catch (error) {
    throw error;
  }
};
