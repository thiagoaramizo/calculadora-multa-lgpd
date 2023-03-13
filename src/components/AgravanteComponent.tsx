import { useState } from "react"
import styled from "styled-components"
import { v4 as uuid } from 'uuid'

export interface CircunstanciaType {
    valor: number
    descricao: string
    limite?: number
    opcoes?: CircunstanciaType[]
}

interface props {
    circunstancias: CircunstanciaType[],
    handleEstado: React.Dispatch<React.SetStateAction<number>>
}

export default function CircunstanciaComponent ( { circunstancias, handleEstado }:props) {
    
    const [controlador, setControlador] = useState<number[]>(Array.from({length: circunstancias.length}, (v, k) => v = 0))
    const unique_id = uuid()

    const handleChange = ( i:number, v: number) => {
        setControlador( controlador.map( (old, k) => old = k === i ? v: old )  )
        handleEstado( controlador.map( (old, k) => old = k === i ? v: old ).reduce( (a, b) => a+b ) ) 
    }
    
    return (
        <CircunstanciaWrapper>
            { circunstancias.map( (v, i) => ( 
                <div key={unique_id+i}>
                    <h3>{v.descricao}</h3>
                    <div className={ v.opcoes ? "opcoes linha" : 'opcoes'}> 
                    { v.limite ? Array.from({length: v.limite+1}).map( (_, k) => (
                    // Opção com limite
                        <div className='radioInput' key={(unique_id+i)+k}>
                            <input type='radio' value={v.valor} name={(unique_id+i)+k} id={(unique_id+i)+k} onChange={ (e) => { handleChange( i, v.valor*k) }} checked={ controlador[i] === v.valor*k}/>
                             <label htmlFor={(unique_id+i)+k}>{ k === 0 ? 'Nenhuma ocorrência' : k > 1 ? `${k} ocorrências` : `1 ocorrência`}</label>
                        </div>

                    ) ) : v.opcoes ? (
                    // Opções com descrição
                        v.opcoes.map( (opt, k) => (
                            <div className='radioInput' key={(unique_id+i)+k}>
                                <input type='radio' value={opt.valor} id={(unique_id+i)+k} name={(unique_id+i)+k} onChange={ (e) => { handleChange( i, opt.valor) }} checked={ controlador[i] === opt.valor}/>
                                <label htmlFor={(unique_id+i)+k}>{ opt.descricao }</label>
                            </div>
                        ))
                    ) :
                    // Opção sim ou não
                        <div key={unique_id+i} className='opcoes'>
                            <div className='radioInput'>
                                <input type='radio' value={0} name={unique_id+i+'opt'} id={unique_id+i+'n'} onChange={ (e) => { handleChange(i, 0) }} checked={ controlador[i] === 0}/>
                                <label  htmlFor={unique_id+i+'n'} >Não</label>
                            </div>
                            <div className='radioInput'>
                                <input type='radio' value={v.valor} name={unique_id+i+'opt'} id={unique_id+i+'s'} onChange={ (e) => { handleChange(i, v.valor) }} checked={ controlador[i] === v.valor}/>
                                <label htmlFor={unique_id+i+'s'}>Sim</label>
                            </div>
                        </div>
                    }
                    </div>
                </div>
            ) ) }
        </CircunstanciaWrapper>
    )
}

const CircunstanciaWrapper = styled.div`
    & h3 {
        color: #8950D9;
        font-weight: 600;
        font-size: 1.1em;
        margin-top: 16px;
        padding-top: 16px;
        display: block;
        border-top: 1px solid #ddd;
    }

    & .opcoes {
        padding: 8px 0;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;

        & .radioInput {
            margin: 8px 8px;
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
        }
    }
    & .linha {
            grid-template-columns: 1fr;
    }
`

const RadioGroupWrap = styled.div`
    background-color: white;

    

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