import styled from 'styled-components';

// @media (max-width: ${props => (props.wide ? '600px' : '375px')}) {
// max-width: ${props => (props.wide ? '600px' : '375px')};
const FormWrapper = styled.div`
    position: relative;
    overflow: hidden;
    margin: 0 auto;
    border: 1px solid ${props => props.theme.border};
    border-radius: 2px;
    max-width: 600px;
    padding: 24px
    background-color: ${props => props.theme.foreground};

    @media (max-width: 768px) {
        box-sizing: border-box;
        padding: 16px;
    }

    @media (max-width: 600px) {
        border-radius: 0;
        border-left: none;
        border-right: none;
    }
`;

export default FormWrapper;