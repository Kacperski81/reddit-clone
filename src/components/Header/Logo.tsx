import { headerItem } from "../shared/helpers";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Logo = styled(Link)`
    ${headerItem};

    margin-right: auto;
    font-size: 24px;
    font-weight: 500;
    color: ${(props) => props.theme.normalText};
    text-decoration: none;

    @media (max-width: 425px) {
        padding: 0 8px 0 16px;
        font-zise: 19px;
    }
`

const HeaderLogo = () => <Logo to="/">Reddit</Logo>

export default HeaderLogo;