import styled from "styled-components";
import { fade, smallFont } from "../helpers";

const SpanError = styled.span`
  ${fade};
  ${smallFont};

  position: absolute;
  right: 0;
  top: 0;
  color: ${(props) => props.theme.error};
`;

const Error = ({children}: {children: React.ReactNode}) => {
  return <SpanError>{children}</SpanError>;
}

export default Error;