import { User } from '@prisma/client';
import prisma from '../../prisma';
import { hashPassword } from '@/lib/bcrypt';
import { nanoid } from 'nanoid';

export const registerService = async (body: User) => {
  try {
    const { name, email, password, role, referral } = body;

    console.log("Memulai proses pendaftaran...");

    // Periksa apakah email sudah terdaftar
    const existingUser = await prisma.user.findFirst({
      where: { email },
    });

    if (existingUser) {
      console.error('Email sudah terdaftar');
      throw new Error('Email sudah terdaftar');
    }

    // Hash password sebelum disimpan
    const hashedPassword = await hashPassword(password!);

    // Buat kode referral baru untuk pengguna baru
    const newReferralCode = nanoid(5);

    console.log("Membuat pengguna baru dengan referral code:", newReferralCode);

    // Buat pengguna baru
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
        referral: newReferralCode,
      },
    });

    console.log("Pengguna baru dibuat:", newUser.id);

    // Periksa apakah kode referral diberikan
    if (referral) {
      console.log("Kode referral digunakan:", referral);

      // Temukan pengguna dengan kode referral yang diberikan
      const referrer = await prisma.user.findFirst({
        where: { referral },
      });

      if (!referrer) {
        console.error('Kode referral tidak valid');
        throw new Error('Kode referral tidak valid');
      }

      console.log("Referrer ditemukan:", referrer.id);

      // Temukan atau buat UserPoint untuk pengguna yang memberikan referral
      const userPoint = await prisma.userPoint.findFirst({
        where: { userId: referrer.id },
      });

      if (userPoint) {
        // Jika UserPoint sudah ada, lakukan update poinnya
        await prisma.userPoint.update({
          where: { id: userPoint.id },
          data: { points: { increment: 10000 } }, // Tambahkan 10000 poin
        });
        console.log("Poin ditambahkan untuk referrer:", referrer.id);
      } else {
        // Jika UserPoint belum ada, buat yang baru
        await prisma.userPoint.create({
          data: {
            userId: referrer.id,
            points: 10000,
            exp_date: new Date(new Date().setFullYear(new Date().getFullYear() + 1)), // Set tanggal kedaluwarsa poin
          },
        });
        console.log("Poin baru dibuat untuk referrer:", referrer.id);
      }

      // Pastikan reward default ada
      const reward = await prisma.reward.findFirst({
        where: { id: 1 }, // Asumsikan rewardId 1 adalah reward default untuk pengguna baru
      });

      if (!reward) {
        console.error('Reward default tidak ditemukan');
        throw new Error('Reward default tidak ditemukan');
      }

      console.log("Reward default ditemukan:", reward.id);

      // Berikan reward kepada pengguna baru
      await prisma.userReward.create({
        data: {
          userId: newUser.id,
          rewardId: reward.id,
        },
      });

      // Tambahkan jumlah klaim pada reward
      await prisma.reward.update({
        where: { id: reward.id },
        data: { claimed: { increment: 1 } },
      });

      console.log("Reward diberikan kepada pengguna baru:", newUser.id);

      // Jika kode referral digunakan, berikan reward kepada pemberi referral
      await prisma.userReward.create({
        data: {
          userId: referrer.id,
          rewardId: reward.id,
        },
      });

      // Tambahkan jumlah klaim pada reward untuk pemberi referral
      await prisma.reward.update({
        where: { id: reward.id },
        data: { claimed: { increment: 1 } },
      });

      console.log("Reward diberikan kepada referrer:", referrer.id);
    } else {
      console.log("Tidak ada kode referral yang digunakan.");
    }

    return newUser; // Kembalikan data pengguna baru
  } catch (error) {
    throw error; // Lempar error jika terjadi masalah
  }
};
