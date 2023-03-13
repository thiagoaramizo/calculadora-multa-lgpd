import styled from "styled-components"

interface props {
    label: string
    inputValue: any
    actionChange: React.Dispatch<React.SetStateAction<number | undefined>>
}

export default function InputNumber( {label, inputValue, actionChange} : props) {
    
    const handleInput = ( e: React.ChangeEvent<HTMLInputElement> ) => {
        actionChange( parseFloat( e.target.value ) )
    }

    return (
        <InputBoxWrapper>
            <input id="input" type='number' pattern="[0-9]" min="0" step="any" value={inputValue ? inputValue : ''} onChange={(e)=>handleInput(e)} placeholder='0,00' required></input>
            <label htmlFor="input">{label}</label>
            <span>R$</span>
        </InputBoxWrapper>
    )
}


const InputBoxWrapper = styled.div`
    position: relative;
    padding: 15px 0 0;
    margin-top: 16px;
    margin-bottom: 16px;
    width: 100%;

    & input {
        font-family: inherit;
        width: 100%;
        border: 0;
        border-bottom: 2px solid #8950D9;
        outline: 0;
        font-size: 1.3em;
        padding: 7px 0;
        padding-left: 30px;
        background: transparent;
        transition: border-color 0.2s;
        color: #8950D9dd;

        ::placeholder {
            color: #8950D9dd;
        }
    }

    & span {
        color: #8950D9dd;
        font-size: 1.3rem;
        position: absolute;
        bottom: 9px;
        left: 0;
    }

    & label {
        position: absolute;
        top: 0;
        display: block;
        font-size: 1rem;
        color: #8950D9;
        
    }

    & input:focus {
        padding-bottom: 6px;  
        font-weight: 700;
        border-width: 3px;

        & ~ span {
            font-weight: 700;
        }

        & ~ label {
            font-weight: 700;
        }
    }

`