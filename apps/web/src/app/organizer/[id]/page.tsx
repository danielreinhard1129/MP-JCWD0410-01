import OrganizerProfilePage from "@/features/organizer/OrganizerProfile";

const OrganizerProfile = ({ params }: { params: { id: string } }) => {
  return <OrganizerProfilePage userId={Number(params.id)} />;
};

export default OrganizerProfile;
