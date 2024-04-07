import styled from "styled-components";
import { NavLink as RouterNavLink, NavLinkProps } from "react-router-dom";
import { link, transition } from "./helpers";

const activeclassname = "active";

type StyledNavLinkProps = NavLinkProps & { activeclassname?: string };  

const NavLink = styled(RouterNavLink).attrs<StyledNavLinkProps>({activeclassname})<StyledNavLinkProps>`
  ${link};

  position: relative;

  ::after {
    ${transition("opacity")};

    content: "";
    position: absolute;
    opacity: 0;
  }

  &.${activeclassname} {
    background-color: ${(props) => props.theme.activeBackground};

    ::after {
      opacity: 1;
    }
  }
`;

export default NavLink;