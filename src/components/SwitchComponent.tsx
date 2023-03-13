import styled from "styled-components"
import { v4 as uuid } from 'uuid'

interface props {
    label: string
    estado: boolean
    handleEstado: React.Dispatch<React.SetStateAction<boolean>> | ((opt: boolean)=>void)
}

export default function SwitchComponent ( {label, estado, handleEstado} : props) {

    const unique_id = uuid()

    return (
        <SwitchComponentWrapper>
            <div>
                <input id={unique_id} type="checkbox" checked={estado} onChange={e => handleEstado(!estado)}/>
                <label htmlFor={unique_id}></label>
            </div>
            <span className={estado ? 'ativo' : ''} onClick={e => handleEstado(!estado)}>{label}</span>
        </SwitchComponentWrapper>
    )
}

const SwitchComponentWrapper = styled.div`
    padding: 8px 0;
    display: grid;
    grid-template-columns: 52px 1fr;

    & span {
        color: #aaa;
        font-size: 1.1em;
        font-weight: 500;
        transition: all 0.4s;
        cursor: pointer;
    }

    & span.ativo {
        color: #8950D9;
    }

    & div {

        & input[type="checkbox"] {
            position: absolute;
            margin-left: -9999px;
            visibility: hidden;
        }

        & label {
            display: block;
            position: relative;
            cursor: pointer;
            outline: none;
            user-select: none;
            width: 40px;
            height: 23px;
            border-radius: 15px;
            border: 2px solid #8950D9cc;
        }

        & label:before, & label:after {
            display: inline-block;
            position: absolute;
            top: 2px;
            left: 3px;
            bottom: 2px;
            content: '';
        }

        & label:before {
            right: 3px;
            border-radius: 15px;
            transition: all 0.4s;
        }

        & label:after {
            width: 15px;
            height: 15px;
            top: 2px;
            left: 3px;
            background-color: #ddd;
            border-radius: 100%;
            transition: all 0.4s;
        }

        & input[type="checkbox"]:checked + label:before {
            background-color: #8950D955;
        }

        & input[type="checkbox"]:checked + label:after {
            transform: translateX(15px);
            background-color: #8950D9aa;
        }
    }
`