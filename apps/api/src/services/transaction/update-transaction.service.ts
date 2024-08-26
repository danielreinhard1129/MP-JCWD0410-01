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
      include: {
        user: { select: { name: true, email: true } },
      },
    });

    if (!transaction) {
      throw new Error('Invalid transaction id');
    }

    const { secure_url } = await cloudinaryUpload(file);
    await transporter.sendMail({
      to: transaction.user.email,
      subject: 'Payment Proof Successfully Uploaded - Tixify',
      html: `
        <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333; line-height: 1.6; padding: 20px; background-color: #f9f9f9;">
          <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); overflow: hidden;">
            <div style="padding: 20px; background-color:#602e9d; color: #ffffff;">
              <h2 style="margin: 0;">Payment Proof Uploaded Successfully</h2>
            </div>
            <div style="padding: 20px;">
              <p>Dear ${transaction.user.name},</p>
              <p>We have successfully received the payment proof for your recent transaction. Our team is currently reviewing your submission.</p>
              <p><strong>Transaction Details:</strong></p>
              <ul style="list-style-type: none; padding: 0;">
                <li style="margin-bottom: 8px;"><strong>Transaction ID:</strong> ${transaction.id}</li>
                <li style="margin-bottom: 8px;"><strong>Total:</strong>  ${new Intl.NumberFormat(
                  'id-ID',
                  {
                    style: 'currency',
                    currency: 'IDR',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  },
                ).format(transaction.total)}</li>
    <li><strong>Date:</strong> ${new Date(transaction.updateAt).toLocaleDateString()}
</li>
              </ul>
              <p>You will receive another email once your payment has been confirmed.</p>
              <p>If you have any questions, feel free to reply to this email or contact our support team.</p>
              <p>Thank you for choosing <strong>Tixify</strong>!</p>
              <p style="margin: 0;">Best regards,</p>
              <p style="margin: 0;"><strong>Tixify Team</strong></p>
            </div>
            <div style="padding: 20px; background-color: #f1f1f1; text-align: center;">
              <p style="margin: 0;">&copy; ${new Date().getFullYear()} Tixify. All rights reserved.</p>
            </div>
          </div>
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
