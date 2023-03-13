import { useState } from 'react'
import klsnLogo from './assets/klsn-logo.svg'
import InputNumber from './components/InputValor'
import Title from './components/Title'
import styled from 'styled-components'
import { regulamento, calculoAliquotaBase, calculoValorBase, calculoValorFinal, calculoMatrizValorBase, calculoMatrizValorFinal } from './calculadora'
import RadioGroup from './components/RadioGroup'
import CircunstanciaComponent from './components/AgravanteComponent'
import SwitchComponent from './components/SwitchComponent'
import { ResultadoType } from './App'

interface classificacaoInfracaoType {
  valor: 'Leve' | 'Média' | 'Grave'
  descricao: string
}

interface GrauDoDanoType {
  opcao: string
  valor: 0 | 1 | 2 | 3
  descricao: string
}

export default function Formulario() {

  const [faturamento, setFaturamento] = useState<number>()
  const [tributo, setTributo] = useState<number>()
  const [pessoaFisica, setPessoaFisica] = useState(false)
  const [classificacaoInfracao, setClassificacaoInfracao] = useState<classificacaoInfracaoType>()
  const [grauDoDano, setGrauDoDano] = useState<GrauDoDanoType>()
  const [circustanticas, setCircustanticas] = useState(false)
  const [agravantes, setAgravantes] = useState(0)
  const [atenuantes, setAtenuantes] = useState(0)
  const [dados, setDados] = useState<ResultadoType>()
  const [envio, setEnvio] = useState(false)

  const handleCalcular = () => {

    if ( classificacaoInfracao && grauDoDano ){
      const faturamentoInf = faturamento ? faturamento : 0
      const tributoInf = tributo ? tributo : 0
      const aliquota = calculoAliquotaBase(classificacaoInfracao.valor, grauDoDano.valor)
      const valorBase = calculoValorBase( aliquota, faturamentoInf, tributoInf, pessoaFisica, classificacaoInfracao.valor, grauDoDano.valor)
      const valorFinal = calculoValorFinal( valorBase, classificacaoInfracao.valor, faturamentoInf, agravantes, atenuantes, pessoaFisica)
      const matrizValorBase = calculoMatrizValorBase(faturamentoInf, tributoInf, pessoaFisica)

      const dados: ResultadoType = {
        faturamento: faturamentoInf,
        tributo: tributoInf,
        pessoaFisica: pessoaFisica,
        classificacaoInfracao: classificacaoInfracao.valor,
        grauDoDano: grauDoDano.valor,
        agravantes: agravantes,
        atenuantes: atenuantes,
        aliquota: aliquota,
        valorBase: valorBase,
        valorFinal: valorFinal,
        matrizValorBase: matrizValorBase,
        matrizValorFinal: calculoMatrizValorFinal( faturamentoInf, classificacaoInfracao.valor, valorBase, grauDoDano.valor, pessoaFisica)

      }
      setEnvio( false )
      setDados( dados )
    }
    else { setEnvio(true) }
  }

  const handleCircustanticas = ( opt: boolean ) => {
    setAgravantes(0)
    setAtenuantes (0)
    setCircustanticas( opt )
  }

  const paraReal = ( valor: number ) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  }

  const paraPercentual = ( valor: number ) => {
    return valor.toLocaleString(undefined,{style: 'percent', minimumFractionDigits:2})
  }

  return (
    <FormularioWrapper>
      <div className='card'>

        <div className='section'>
          <h2>Informações do infrator</h2>
          <SwitchComponent label={'Pessoa física'} estado={pessoaFisica} handleEstado={setPessoaFisica} />
          { !pessoaFisica ? <div className='columns'>
            <InputNumber label={'Faturamento anual'} inputValue={faturamento} actionChange={setFaturamento} />
            <InputNumber label={'Tributação anual sobre vendas'} inputValue={tributo} actionChange={setTributo} />
          </div> : ''}

        </div>

        <div className='section'>
          <h2>Classificação da infração</h2>
          {!classificacaoInfracao && envio  ? <span className='alerta'>Você deve selecionar um valor</span> : ''}
          <RadioGroup opcoes={regulamento.classificacaoDaInfracao} nome='classificacaoInfracao' selecionado={classificacaoInfracao} onSelect={setClassificacaoInfracao}/> 
        </div>

        <div className='section'>
          <h2>Grau do dano</h2>
          {!grauDoDano && envio ? <span className='alerta'>Você deve selecionar um valor</span> : ''}
          <RadioGroup opcoes={regulamento.grauDoDano} nome='grauDoDano' selecionado={grauDoDano} onSelect={setGrauDoDano}/> 
        </div>

        <SwitchComponent label={'Calcular agravantes e atenuantes'} estado={circustanticas} handleEstado={handleCircustanticas} />

        { circustanticas ?
          <div> 
            <div className='section'>
                <h2>Agravantes <span>(+{paraPercentual(agravantes)})</span></h2>
                <CircunstanciaComponent circunstancias={regulamento.agravantes} handleEstado={setAgravantes} />
              </div>
              <div className='section'>
                <h2>Atenuantes <span>(-{paraPercentual(atenuantes)})</span></h2>
                <CircunstanciaComponent circunstancias={regulamento.atenuantes} handleEstado={setAtenuantes} />
            </div>
          </div>
        : ''}

        <button onClick={(e) => handleCalcular()}>Calcular</button>
        
      </div>
      
      { dados ? 
        <div className='card'>
          <p>Pessoa {pessoaFisica ? 'Física' : 'Jurídica'}</p>
          {!pessoaFisica ? <p>Faturamento: { paraReal(dados.faturamento) }</p> : ''}
          {!pessoaFisica ? <p>Tributo: { paraReal(dados.tributo) }</p> : ''}
          <p>Classificação da infração: { dados.classificacaoInfracao }</p>
          <p>Grau do dano: { dados.grauDoDano }</p>
          <p>Alíquota: { dados.faturamento > 0 || !pessoaFisica ? paraPercentual(dados.aliquota) : 'N/A' }</p>
          <p>Valor base: { paraReal(dados.valorBase) }</p>
          
          <MatrizWrapper>
            <div className='linha'>
              <div></div>
              <div>Leve</div>
              <div>Média</div>
              <div>Grave</div>
            </div>
            { dados.matrizValorBase.map( (valores, i) => 
            (<div key={`valores`+i} className='linha'>
              <div>{i}</div>
              {valores.map( (v, j) => (
                <div key={(`valor`+i)+j} className={ v === dados.valorBase? 'destaque' : '' }>{paraReal(v)}</div>
              ) )}
            </div>)  )}
          </MatrizWrapper>
          
          <p>Agravantes: { paraPercentual(dados.agravantes) }</p>
          <p>Atenuantes: { paraPercentual(dados.atenuantes) }</p>
          <p>Valor final: { paraReal(dados.valorFinal) }</p>
          <p>Valor final mínimo: { paraReal( dados.matrizValorFinal[0])} (considerando o máximo de atenuantes)</p>
          <p>Valor final máximo: { paraReal( dados.matrizValorFinal[1])} (considerando o máximo de agravantes)</p>
          {dados.matrizValorFinal[1] > dados.matrizValorFinal[0] ? 
          <div>
            <p>Posição: { (dados.valorFinal - dados.matrizValorFinal[0])/(dados.matrizValorFinal[1]-dados.matrizValorFinal[0]) }</p>
            <Barra>
              <div style={{ width:( ((dados.valorFinal - dados.matrizValorFinal[0])/(dados.matrizValorFinal[1]-dados.matrizValorFinal[0])).toLocaleString(undefined,{style: 'percent', maximumFractionDigits:0})  ) }}></div>
            </Barra>  
          </div> 
          : ''}

        </div>
      : ''}
    </FormularioWrapper>
  )
}

const Barra = styled.div`
  display: block;
  width: 100%;
  height: 20px;
  border: 2px solid #ddd;
  border-radius: 4px;

  & div {
    display: block;
    height: 100%;
    border-right: 10px solid #aaa;
  }
`

const MatrizWrapper = styled.div`
  border: 2px solid #ddd;
  border-radius: 8px;
  overflow: hidden;

  & .linha {
    display: grid;
    grid-template-columns: 2em 1fr 1fr 1fr;
    border-bottom: 1px solid #ddd;

    & div {
      padding: 8px;
      border-left: 1px solid #ddd;
      text-align: center;
    }

    & div:first-child {
      border-left: none;
    }

    & .destaque {
      font-weight: 600;
    }
  }

  & .linha:last-child {
      border-bottom: none;
    }

  
`

const FormularioWrapper = styled.div`
  
  background-color: #8950D9;
  width: 100vw;
  min-height: 100vh;
  padding: 24px;

  & .card {
    background-color: white;
    max-width: 960px;
    margin: 0 auto;
    padding: 40px;
    border-radius: 8px;
    line-height: 1.5em;

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

    & .columns {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 36px;
    }

    & .section {

      border: 2px solid #ddd;
      border-radius: 8px;
      padding: 24px;
      margin: 16px 0;
      animation: fade-in 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;

      & h2 {
        color: #8950D9;
        font-size: 1.3em;
        font-weight: 600;

        & span {
          font-size: 0.8em;
          font-weight: 500;
        }
      }

      & .alerta {
        color: #d30383;
        font-size: 0.9em;
      }

    }
    
  }

  @keyframes fade-in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`
