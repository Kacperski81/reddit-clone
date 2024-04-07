import styled from "styled-components";
import { smallFont } from "../helpers";

const Label = styled.label`
  ${smallFont};

  display: block;
  margin-bottom: 8px;
  color: ${(props) => props.theme.mutedText};
`;

export default Label;