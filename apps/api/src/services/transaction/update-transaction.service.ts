import { cloudinaryUpload } from '@/lib/cloudinary';
import { transporter } from '@/lib/nodemailer';
import prisma from '@/prisma';
import { Status } from '@prisma/client';

interface UpdateTransactionBody {
  status: Status;
}

export const updateTransactionService = async (
  transactionId: number,
  body: UpdateTransactionBody,
  file: Express.Multer.File,
) => {
  try {
    const { status } = body;

    const transaction = await prisma.transaction.findFirst({
      where: { id: transactionId },
      include: { user: { select: { name: true, email: true } } },
    });

    if (!transaction) {
      throw new Error('Invalid transaction id');
    }

    const { secure_url } = await cloudinaryUpload(file);

    // TODO: send email
    // transaction.user.email
    await transporter.sendMail({
      to: transaction.user.email,
      subject: 'Payment Proof Successfully Uploaded - TIXIFY',
      html: `
        <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
          <h2 style="color: #56298d;">Payment Proof Uploaded Successfully</h2>
          <p>Dear ${transaction.user.name},</p>
          <p>We have successfully received the payment proof for your recent transaction. Our team is currently reviewing your submission.</p>
          <p><strong>Transaction Details:</strong></p>
          <ul>
            <li><strong>Transaction ID:</strong> ${transaction.id}</li>
            <li><strong>Amount:</strong>${new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(transaction.total)}</li>
            <li><strong>Date:</strong> ${new Date(transaction.updateAt).toLocaleDateString()}</li>
          </ul>
          <p>You will receive another email once your payment has been confirmed.</p>
          <p>If you have any questions, feel free to reply to this email or contact our support team.</p>
          <p>Thank you for choosing Tixify]!</p>
          <p>Best regards,<br/>Tixify Team</p>
        </div>
      `,
    });

    return await prisma.transaction.update({
      where: { id: transactionId },
      data: {
        status,
        paymentProof: secure_url,
      },
    });
  } catch (error) {
    throw error;
  }
};
