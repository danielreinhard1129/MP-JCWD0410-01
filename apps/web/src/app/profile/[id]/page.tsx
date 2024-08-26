import ProfilePage from "@/features/profile/ProfileDetail";
import React from "react";

const Profile = ({ params }: { params: { id: string } }) => {
  return <ProfilePage userId={Number(params.id)} />;
};

export default Profile;
