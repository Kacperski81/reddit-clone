import styled from "styled-components"

const Wrapper = styled.span`
    // border: 1px solid;
    display: flex;
    align-items: center;
`

export default function HeaderUserName({username}: {username: string}) {
    return (
        <Wrapper>
            {username}
        </Wrapper>
    )
}