import * as Yup from "yup";
import YupPassword from "yup-password";
YupPassword(Yup);

export const CreateEventSchema = Yup.object().shape({
  //penamaannya harus sama kayak di initialValues
  name: Yup.string().required("Event name is required"),
  location: Yup.string().required("Location is required"),
  description: Yup.string().required("Description is required"),
  thumbnail: Yup.mixed().nullable().required("Thumbnail is required"),
  price: Yup.number().required("Price is required"),
  quota: Yup.number()
    .min(1, "Qouta must be at least 1")
    .required("Quota is required"),
});
