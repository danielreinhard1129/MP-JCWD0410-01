import * as Yup from "yup";
import YupPassword from "yup-password";
YupPassword(Yup);

export const CreateCategorySchema = Yup.object().shape({
  //penamaannya harus sama kayak di initialValues
  title: Yup.string().required("Category name is required"),
});
