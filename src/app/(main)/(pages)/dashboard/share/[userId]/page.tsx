
import { auth } from "@/auth";
import LoadWords from "@/components/share/load-words";
import { db } from "@/lib/db";
import { redirect } from 'next/navigation'

const  AddAnotherUesrWords =async  ({ params }: { params: { userId: string } }) => {
  const session = await auth();
  const user = session?.user;
  if (!user) return;  

  const userFrom = await db.user.findFirst({
    where:{
      id:params.userId
    }
  })
  
  if(!userFrom||!userFrom.email) return;  

  const loadData = async ()=>{
    'use server'
    const words = await db.words.findMany({
      where:{
        userId: params.userId
      },
      select:{
        russian:true,
        auxiliaryVerb:true,
        englisch:true,
        declination:true,
        german:true
      }
    })
   // saveJSON_WORDS(words,user.id);
    redirect(`/words`) // Navig

  }

  return (
    <div className="flex justify-items-center  justify-center min-h-screen">
      <LoadWords userFromLoading={userFrom.email} loadData={loadData}/>      
      
      
    </div>
  );
};

export default AddAnotherUesrWords;
