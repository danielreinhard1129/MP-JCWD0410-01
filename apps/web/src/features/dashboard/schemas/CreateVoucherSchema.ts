import * as Yup from "yup";
import YupPassword from "yup-password";
YupPassword(Yup);

export const CreateVoucherSchema = Yup.object().shape({
  name: Yup.string().required("Voucher name is required"),
  code: Yup.string().required("Voucher code is required"),
  quota: Yup.number().required("Quota is required").positive("Must be a positive number"),
  nominal: Yup.number().required("Nominal value is required").positive("Must be a positive number"),
  expDate: Yup.date().required("Expiration date is required"),
  eventId: Yup.number().required("Event is required"),
});
