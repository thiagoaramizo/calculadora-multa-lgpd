import { useState } from "react"
import styled from "styled-components"
import { v4 as uuid } from 'uuid'

interface opcao {
    opcao?: string
    valor: string | number
    descricao: string
} 

interface props {
    opcoes: opcao[]
    nome: string
    selecionado: opcao | undefined
    onSelect: React.Dispatch<React.SetStateAction<any>>
}

export default function RadioGroup( { opcoes, nome, selecionado, onSelect }: props) {
    
    const [controle, setControle] = useState( Array.from( {length: opcoes.length }, (i) => 0) )
    const unique_id = uuid()

    const handleDescricao = ( numero?: number ) => {
        setControle( controle.map( (value, index) => {
            if (index === numero && value === 0) return 1
            return 0
        } ) )
    }

    const handleChange = ( opcao: opcao ) => {
        onSelect( opcao )
        handleDescricao()
    }

    return(
        <RadioGroupWrap>
            <div className="opcoes">
                {opcoes.map( ( opcao, i ) => {
                    return(
                    <div key={opcao.valor} className='radioInput'>
                        <input type='radio' id={unique_id+opcao.valor} value={opcao.valor} name={nome} onChange={ (e) => { handleChange( opcao )}} checked={opcao === selecionado}/>
                        <label htmlFor={unique_id+opcao.valor}>{opcao.opcao ? opcao.opcao : opcao.valor}</label>
                        <span onClick={ (e) => handleDescricao(i)} className={controle[i] === 1 ? 'select' : ''}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm1,15a1,1,0,0,1-2,0V11a1,1,0,0,1,2,0ZM12,8a1.5,1.5,0,1,1,1.5-1.5A1.5,1.5,0,0,1,12,8Z"/></svg>
                        </span>
                    </div>
                    )
                })}
            </div>
            
            {opcoes.map( ( opcao, i ) => {
                return(<div className={controle[i] === 1 ? 'desc show' : 'desc'} key={opcao.valor}><p>{opcao.descricao}</p></div>)
            })}
        </RadioGroupWrap>
    )
}

const RadioGroupWrap = styled.div`
    background-color: white;

    & .opcoes {
        margin-top: 16px;
        padding: 16px 0;
        display: flex;

        & .radioInput {
            margin: 0 8px;
            font-size: 1.1em;
            line-height: 1.1;
            display: grid;
            grid-template-columns: 1em auto 1em;
            gap: 0.5em;
            color: #8950D9;

            & input[type="radio"] {
                appearance: none;
                background-color: #fff;
                margin: 0;
                font: inherit;
                color: currentColor;
                width: 1.15em;
                height: 1.15em;
                border: 2px solid currentColor;
                border-radius: 50%;
                transform: translateY(-0.075em);
                display: grid;
                place-content: center;
                cursor: pointer;
            }

            & input[type="radio"]::before {
                content: "";
                width: 0.65em;
                height: 0.65em;
                border-radius: 50%;
                transform: scale(0);
                transition: 120ms transform ease-in-out;
                box-shadow: inset 1em 1em #8950D9aa; 
            }

            & input[type="radio"]:checked::before {
                transform: scale(1);
            }

            & span {
                width: 20px;
                transform: translate(-5px, 0px);
                cursor: pointer;
                fill: #ccc;
            }

            & span.select {
                fill: #8950D9aa;
            }
        }
    } 

    & .desc {
        border: 2px solid #8950D9aa;
        border-radius: 8px;
        padding: 16px 24px;
        font-size: 0.8em;
        display: none;
        animation: scale-in-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    }

    & .show {
        display: block;
    }

    @keyframes scale-in-top {
        0% {
            -webkit-transform: scale(0);
                    transform: scale(0);
            -webkit-transform-origin: 50% 0%;
                    transform-origin: 50% 0%;
            opacity: 1;
        }
        100% {
            -webkit-transform: scale(1);
                    transform: scale(1);
            -webkit-transform-origin: 50% 0%;
                    transform-origin: 50% 0%;
            opacity: 1;
        }
    }
`