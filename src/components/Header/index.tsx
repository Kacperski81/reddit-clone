import HeaderLogo from "./Logo";
import HeaderDarkButton from "./DarkButton";
import styled from "styled-components";
import NavLink from "./NavLink";
import useStore from "../../store";
import { shallow } from "zustand/shallow";
import { useMutation } from "@tanstack/react-query";
import { logOut } from "../../lib/firebase";
import toast from "react-hot-toast";
const Wrapper = styled.header`
    position: sticky;
    z-index: 10;
    top: 0;
    display: flex;
    align-items: stretch;
    margin-bottom: 24px;
    box-shadow: 0 4px 12px ${(props) => props.theme.shadow};
    border-bottom: 1px solid ${(props) => props.theme.border};
    height: 48px;
    padding: 0 10vw;
    background-color: ${(props) => props.theme.foreground};
    user-select: none;

    @media (max-width: 425px) {
      margin-bottom: 16px;
      height: 40px;
    }
  
    @media (max-width: 768px) {
      padding: 0;
    }
`

export default function Header() {
  const [user,resetUser] = useStore(state => [state.user, state.resetUser], shallow);
  console.log(user)

  const mutation = useMutation({mutationFn: logOut,
    onSuccess: () => {
      resetUser();
      toast("Logged out", {
        icon: "👋"
      })
    },
    onError: () => {
      toast.error("Failed to log out")
    }
  });

  return (
    <Wrapper>
      <HeaderLogo />
      <HeaderDarkButton />
      {user ? (
        <>
          <NavLink to={`/u/${user.username}`}>{user.username}</NavLink>
          <NavLink to="/login" onClick={() => mutation.mutate()}>LOGOUT</NavLink>
        </>
      ) : (
        <>
          <NavLink to="/login">LOGIN</NavLink>
          <NavLink to="/signup">SIGN UP</NavLink>
        </>
      )
      }
    </Wrapper >
  )
}