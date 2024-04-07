import React, {ReactNode, FormEvent} from "react";
import { transition } from "../../../shared/helpers";
// import LoadingIndicatorSpinner from "components/shared/LoadingIndicator/Spinner";
import styled from "styled-components";
import FormWrapper from "./Wrapper";

interface FormProps {
  children: ReactNode;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}


// ${(props) => from line 15 props.loading making a problem
//   props.loading &&
//   "filter: grayscale(0.5) blur(5px) opacity(0.6); pointer-events: none"};
const StyledForm = styled.form`
  ${transition("filter")};

  display: flex;
  flex-direction: column;
  align-items: flex-start;

`;

const Form: React.FC<FormProps> = ({children,onSubmit}) => (
  <FormWrapper>
    <StyledForm onSubmit={onSubmit}>
      {children}
    </StyledForm>
    <div>width: {window.innerWidth}px</div>
    {/* {props.loading && <LoadingIndicatorSpinner />} */}
  </FormWrapper>
);

export default Form;