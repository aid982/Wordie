import { signIn, auth, providerMap } from "@/auth";
import { SignupForm } from "@/components/forms/sign-in";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export default async function SignInPage1({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const logIn = async (form: FormData, providerId: string) => {
    "use server";
    try {
      const callbackUrl = searchParams["callbackUrl"];      
      await signIn(providerId,{
        redirect:true,
        redirectTo:  typeof callbackUrl==='string' ? callbackUrl:'/'
      });
      
    } catch (error) {
      console.log(error);
      // Signin can fail for a number of reasons, such as the user
      // not existing, or the user not having the correct role.
      // In some cases, you may want to redirect to a custom error
      if (error instanceof AuthError) {
        //return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`)
      }

      // Otherwise if a redirects happens NextJS can handle it
      // so you can just re-thrown the error and let NextJS handle it.
      // Docs:
      // https://nextjs.org/docs/app/api-reference/functions/redirect#server-component
      throw error;
    }
    finally {
      //redirect("/");

    }
  };
  return (
    <div className="h-screen flex justify-center items-center">
      <SignupForm submit={logIn} />
    </div>
  );
}
