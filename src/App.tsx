import { useState } from 'react'
import klsnLogo from './assets/klsn-logo.svg'
import Title from './components/Title'
import styled from 'styled-components'
import Formulario from './Formulario'

export interface ResultadoType {
  faturamento: number,
  tributo: number,
  pessoaFisica: boolean
  classificacaoInfracao: 'Leve' | 'Média' | 'Grave',
  grauDoDano: 0 | 1 | 2 | 3,
  agravantes: number,
  atenuantes: number,
  aliquota: number,
  valorBase: number,
  valorFinal: number,
  matrizValorBase: number[][],
  matrizValorFinal: number[]
}


export default function App() {

  const [resultado, setResultado] = useState<ResultadoType>()


  return (
    <AppWrapper>
        
      <div className='header'>
        <a href="https://klsn.com.br" target="_blank">
          <img src={klsnLogo} className="logo" alt="KLSN logo" />
        </a>
        <Title>Calculadora de Multa LGPD</Title>
      </div>

      <Formulario/>

      
    </AppWrapper>
  )
}

const AppWrapper = styled.main`
  
  & .header {
      display: grid;
      grid-template-columns: 200px 1fr;
      gap: 24px;
      align-items: center;
      padding-bottom: 24px;

      & .logo {
        width: 200px;
        will-change: filter;
        transition: filter 300ms;
      }

      & .logo:hover {
          filter: drop-shadow(0 0 1em #8950D9aa);
        }

      & h1 {
        padding: 0 24px;
        border-left: 1px solid grey;
      }
    }
`
