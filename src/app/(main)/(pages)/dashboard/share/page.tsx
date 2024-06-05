
import { auth } from "@/auth";
import ShareLink from "@/components/share/share-link";

const  Share =async  () => {
  const session = await auth();
  const user = session?.user;
  const link = `${process.env.PUBLIC_URL}/dashboard/share/${user?.id}`;

  if (!user) return;  
  return (
    <div className="flex justify-items-center  justify-center min-h-screen">
      <ShareLink link={link}/>
      
      
      
    </div>
  );
};

export default Share;
