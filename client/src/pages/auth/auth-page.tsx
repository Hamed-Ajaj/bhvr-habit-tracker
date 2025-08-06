import { useSession } from "@/lib/auth-client";

const AuthPage = () => {
  const {
    data: session,
    isPending, //loading state
    error, //error object
    refetch //refetch the session
  } = useSession()
  console.log("session", session)
  return (
    <div>Auth page</div>
  )
}

export default AuthPage;
