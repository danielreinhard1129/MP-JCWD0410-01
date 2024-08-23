// validationSchema.js
import * as Yup from "yup";

export const createTransactionSchema = (maxQuantity: number) =>
  Yup.object({
    qty: Yup.number()
      .min(1, "Quantity must be at least 1")
      .max(
        maxQuantity,
        `Only ${maxQuantity} tickets are available. Please adjust your selection and try again.`,
      )
      .required("Quantity is required"),
    paymentMethod: Yup.string().required(
      "Please choose your payment method first",
    ),
  });
