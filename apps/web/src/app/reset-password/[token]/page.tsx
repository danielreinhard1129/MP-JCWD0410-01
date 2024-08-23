import ResetPasswordPage from "@/features/reset-password/index";


const ResetPassword = ({ params }: { params: { token: string } }) => {
  return <ResetPasswordPage token={params.token} />;
};

export default ResetPassword;
