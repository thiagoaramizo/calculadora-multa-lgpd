import { ReactNode } from "react"
import styled from "styled-components"

interface props {
    children: ReactNode
}

export default function Title( {children }: props) {
    return (
        <TitleWrap>
            {children}
        </TitleWrap>
    )
}

const TitleWrap = styled.h1`
    font-size: 2em;
    font-weight: 700;
    text-transform: uppercase;
`