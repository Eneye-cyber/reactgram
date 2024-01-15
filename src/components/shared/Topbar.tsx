import { Link, useNavigate } from "react-router-dom"
import { Button } from "../ui/button"
import { useSignoutAccount } from "@/lib/react-query/queriesAndMutations"
import { useEffect } from "react"
import { useUserContext } from "@/context/AuthProvider"

const Topbar = () => {

  //define the sign out mutation
  const { mutate: signOut, isSuccess} = useSignoutAccount();
  const navigate = useNavigate();
  const { user } = useUserContext()

  useEffect(() => {
    if(isSuccess) navigate(0)
  }, [isSuccess])

  return (
    <header className="topbar">
      <section className="flex-between py-4 px-5">
        <Link to="/" className="flex gap-3 items-center">
          <img src="/assets/images/logo.svg" alt="nav_logo" width={130} height={130} />
        </Link>

        <div className="flex gap-4">
          <Button variant={'ghost'} className="shad-button_ghost" onClick={() => signOut()}>
            <img src="/assets/icons/logout.svg" alt="logout" />
          </Button>
          <Link to={`/profile/${user.id}`} className="flex-center gap-3">
            <img src={user.imageUrl || '/assets/images/profile-placeholder.svg'} 
            alt="profile" className="h-8 w-8 rounded-full" />
          </Link>
        </div>
      </section>
    </header>
  )
}

export default Topbar