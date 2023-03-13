export const regulamento = {
    classificacaoDaInfracao: [
        {
            valor: 'Leve',
            descricao: 'A infração é considerada leve se não se classificar na hipótese média ou grave (§ 1º do art. 8 da Resolução CD/ANPD nº 4).'
        },
        {
            valor: 'Média',
            descricao: `A infração é considerada média se quando puder afetar significativamente interesses e direitos fundamentais dos titulares de dados pessoais, 
            caracterizada nas situações em que a atividade de tratamento puder impedir ou limitar, de maneira significativa, o exercício de direitos ou a utilização de um serviço, assim como ocasionar danos materiais ou morais aos titulares, 
            tais como discriminação; violação à integridade física; ao direito à imagem e à reputação; fraudes financeiras ou uso indevido de identidade, desde que não seja classificada como grave. (§ 2º do art. 8 da Resolução CD/ANPD nº 4)`
        },
        {
            valor: 'Grave',
            descricao: `A infração é considerada grave se houver obstrução à atividade de fiscalização e/ou ocorrer a cumulação de alguma das hipóteses da classificação média com:
            a) envolver tratamento de dados pessoais em larga escala, caracterizado quando abranger número significativo de titulares, considerando-se, ainda, o volume de dados envolvidos, bem como a duração, a frequência e a extensão geográfica do tratamento realizado;
            b) o infrator auferir ou pretender auferir vantagem econômica em decorrência da infração cometida;
            c) a infração implicar risco à vida dos titulares;
            d) a infração envolver tratamento de dados sensíveis ou de dados pessoais de crianças, de adolescentes ou de idosos;
            e) o infrator realizar tratamento de dados pessoais sem amparo em uma das hipóteses legais previstas na LGPD;
            f) o infrator realizar tratamento com efeitos discriminatórios ilícitos ou abusivos; ou
            g) verificada a adoção sistemática de práticas irregulares pelo infrator; (§ 3º do art. 8 da Resolução CD/ANPD nº 4)`
        }
    ],
    grauDoDano: [
        {
            opcao: 'Grau 0',
            valor: 0,
            descricao: `A infração não ocasiona danos ou somente ocasiona danos com impactos insignificantes aos titulares, que decorrem de situações previsíveis ou corriqueiras e que não justificam a necessidade de compensação.`
        },
        {
            opcao: 'Grau 1',
            valor: 1,
            descricao: `A infração ocasiona lesão ou ofensa a direitos ou interesses de um número reduzido de titulares, com impacto de ordem material ou moral limitado, que pode ser revertido ou compensado com relativa facilidade; ou
            Descumprimento de determinação ou envio ou disponibilização de informações fora dos prazos ou condições estabelecidos pela ANPD, sem prejuízo direto para o processo de fiscalização ou administrativo sancionador ou para terceiros e que não decorra de litigância de má-fé.`
        },
        {
            opcao: 'Grau 2',
            valor: 2,
            descricao: `A infração ocasiona lesão ou ofensa a direitos ou interesses difusos, coletivos ou individuais, que, dadas as circunstâncias do caso, geram impactos aos titulares, de ordem material ou moral, que não se enquadram nos critérios indicados na descrição do grau de dano 0, 1 ou 3; ou
            Dano decorrente do envio de informações intempestivas ou cumprimento intempestivo com prejuízo direto para o processo de fiscalização ou administrativo sancionador ou para terceiros e que não decorra de litigância de má-fé.`
        },
        {
            opcao: 'Grau 3',
            valor: 3,
            descricao: `A infração ocasiona lesão ou ofensa a direitos ou interesses difusos, coletivos ou individuais, que, dadas as circunstâncias extraordinárias do caso, têm impacto irreversível ou de difícil reversão sobre os titulares afetados, de ordem material ou moral, ocasionando, entre outras situações, discriminação, violação à integridade física, ao direito à imagem e à reputação, fraudes financeiras ou uso indevido de identidade; ou
            Danos decorrentes de litigância de má-fé, tais como, entre outras hipóteses previstas na legislação processual, alteração da verdade dos fatos, uso do processo para conseguir objetivo ilegal, resistência injustificada ao andamento do processo, atuação temerária em qualquer ato do processo ou impedimento da atuação da ANPD.`
        },
    ],
    agravantes: [ 
        {
            valor: 0.1,
            descricao: `Houve reinciência específica?`,
            limite: 4
        },
        {
            valor: 0.05,
            descricao: `Houve reincidência genérica?`,
            limite: 4
        },
        {
            valor: 0.2,
            descricao: `Houve o descumprimento de medida de orientação ou preventiva no
            processo de fiscalização ou do procedimento preparatório que precedeu o processo administrativo
            sancionador?`,
            limite: 4
        },
        {
            valor: 0.3,
            descricao: `Houve o descumprimento de medida corretiva?`,
            limite: 3
        },
    ],
    atenuantes: [
        {
            valor: 0,
            descricao: `Houve a cessação da infração?`,
            opcoes: [
                {valor: 0,
                descricao: `Não cessou ou cessou apenas após a prolação da decisão de primeira instância no âmbito do processo administrativo sancionador.`},

                {valor: 0.3,
                descricao: `Sim, após a instauração de processo administrativo sancionador e até a
                prolação da decisão de primeira instância no âmbito do processo administrativo sancionador.`},

                {valor: 0.5,
                descricao: `Sim, após a instauração de procedimento preparatório e até a
                instauração de processo administrativo sancionador.`},

                {valor: 0.75,
                descricao: `Sim, antes da instauração de procedimento preparatóriopela ANPD.`},
            ]
        },
        {
            valor: 0.2,
            descricao: `Implementou política de boas práticas e de
            governança ou adotou de forma reiterada e demonstrada mecanismos e procedimentos internos capazes de
            minimizar os danos aos titulares, voltados ao tratamento seguro e adequado de dados, até a prolação da
            decisão de primeira instância no âmbito do processo administrativo sancionador?`
        },
        {
            valor: 0,
            descricao: `Comprovou a implementação de medidas capazes de
            reverter ou mitigar os efeitos da infração sobre os titulares de dados pessoais afetados?`,
            opcoes: [
                {valor: 0,
                    descricao: `Não se comprovou a implementação de medidas.`
                },
                {valor: 0.2,
                    descricao: `Sim, previamente à instauração de procedimento preparatório ou processo
                    administrativo sancionador pela ANPD.`
                },
                {valor: 0.1,
                    descricao: `Sim, após a instauração de procedimento preparatório e até a instauração
                    de processo administrativo sancionador.`
                },

            ]
        },
        {
            valor: 0.05,
            descricao: `Ocorreu a cooperação ou boa-fé por parte do infrator?`
        },

    ],
}


export function calculoAliquotaBase( classificacaoInfracao: 'Grave' | 'Média' | 'Leve', grauDano: 0 | 1 | 2 | 3 ) {
   const aliquotas = {
        leve: [0.0008, 0.0015],
        medio: [0.0013, 0.005],
        alto: [0.0045, 0.015]
    }
    let aliquota = aliquotas.leve
    if ( classificacaoInfracao === 'Média') aliquota = aliquotas.medio
    if ( classificacaoInfracao === 'Grave') aliquota = aliquotas.alto
    
    const validar = [
        (aliquotas.leve[1]-aliquotas.leve[0])/3*grauDano+aliquotas.leve[0],
        (aliquotas.medio[1]-aliquotas.medio[0])/3*grauDano+aliquotas.medio[0],
        (aliquotas.alto[1]-aliquotas.alto[0])/3*grauDano+aliquotas.alto[0]
    ]

    return (aliquota[1]-aliquota[0])/3*grauDano+aliquota[0]
}

export function calculoValorBase( aliquotaBase: number, faturamento: number, tributos: number, pessoaFisica: boolean, classificacaoInfracao: 'Grave' | 'Média' | 'Leve', grauDano: 0 | 1 | 2 | 3 ) {
    if ( faturamento === 0 || pessoaFisica ) {
        const ValorBaseZero = classificacaoInfracao === 'Grave' ? [6750, 15750] : classificacaoInfracao === 'Média'? [3000, 7000] : [1500, 3500]
        return (ValorBaseZero[1]-ValorBaseZero[0])/3*grauDano+ValorBaseZero[0]
    }
    return aliquotaBase * ( faturamento - tributos )
}

export function calculoValorFinal( valorBase: number, classificacaoInfracao: 'Grave' | 'Média' | 'Leve', faturamento: number, agravantes: number, atenuantes: number, pessoaFisica: boolean ) {
    
// Hipoteses com faturamento
    
    // Definindo valor mínimo
    let valorMinimo = 3000
    if( classificacaoInfracao === 'Média' ) { valorMinimo = 6000 }
    if (classificacaoInfracao === 'Grave' ) { valorMinimo = 12000 }
    // Hipoteses de faturamento zero ou pessoa física
    if ( faturamento <= 0 || pessoaFisica ) {
        if (classificacaoInfracao === 'Leve' ) { valorMinimo = 1000 }
        if( classificacaoInfracao === 'Média' ) { valorMinimo = 2000 }
        if (classificacaoInfracao === 'Grave' ) { valorMinimo = 4000 }
    }
    
    // Definindo o valor máximo
    let valorMaximo = faturamento*0.02
    valorMaximo = valorMaximo < 50000000 ? valorMaximo : 50000000


    //Calculando valor final
    let valorFinal = valorBase * ( 1 + agravantes - atenuantes )
    console.log(valorFinal)

    //Resolvendo limites
    if ( faturamento > 0 && !pessoaFisica ) {
        valorFinal = valorFinal > valorMaximo ? valorMaximo : valorFinal
    }
    valorFinal = valorFinal < valorMinimo ? valorMinimo : valorFinal

    return valorFinal
}

export function calculoMatrizValorBase ( faturamento: number, tributos: number, pessoaFisica: boolean ) {
    const classificacaoInfracao = [  'Leve', 'Média', 'Grave' ]
    const grauDano = [ 0, 1, 2, 3 ]

    //@ts-ignore
    const matriz = []
    
    grauDano.map( g => {
        //@ts-ignore
        const array = []
        classificacaoInfracao.map( c => {
            // Verificando se o faturamento é ZERO ou pessoa física
            if( faturamento <= 0 || pessoaFisica ){
                //@ts-ignore
                array.push( calculoValorBase( 0, faturamento, tributos, pessoaFisica, c, g ) )
            }
            else {
                //@ts-ignore
                array.push( calculoValorBase( calculoAliquotaBase(c, g), faturamento, tributos ) )
            }
            
        })
        //@ts-ignore
        matriz.push(array)
    })

    //@ts-ignore
    return matriz
}

export function calculoMatrizValorFinal ( faturamento: number, classificacaoInfracao: 'Grave' | 'Média' | 'Leve', valorBase: number, grauDano: 0 | 1 | 2 | 3,  pessoaFisica: boolean) {
    const maxAtenuantes = 1.2
    const maxAgravantes = 2.3
    const valorMinimo = calculoValorFinal(valorBase, classificacaoInfracao, faturamento, 0, maxAtenuantes, pessoaFisica)
    const valorMaximo = calculoValorFinal(valorBase, classificacaoInfracao, faturamento, maxAgravantes, 0, pessoaFisica)

    return [valorMinimo, valorMaximo]
}