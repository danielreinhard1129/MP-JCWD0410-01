import * as Yup from "yup";
import YupPassword from "yup-password";
YupPassword(Yup);

export const CreateReviewSchema = Yup.object().shape({
  rating: Yup.number()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating cannot be more than 5")
    .required("Rating is required"),
  comment: Yup.string().required("Review is required").max(255),
});
