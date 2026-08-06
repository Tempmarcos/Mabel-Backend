export interface DddInfo {
    ddd: string
    estados: string[]
    regiao: string
}

export const DDDS: Record<string, DddInfo> = {
    "11": {
        ddd: "11",
        estados: ["SP"],
        regiao: "Região Metropolitana de São Paulo/Região Metropolitana de Jundiaí/Região Geográfica Imediata de Bragança Paulista"
    },
    "12": {
        ddd: "12",
        estados: ["SP"],
        regiao: "Região Metropolitana do Vale do Paraíba e Litoral Norte"
    },
    "13": {
        ddd: "13",
        estados: ["SP"],
        regiao: "Região Metropolitana da Baixada Santista/Vale do Ribeira"
    },
    "14": {
        ddd: "14",
        estados: ["SP"],
        regiao: "Avaré/Bauru/Botucatu/Jaú/Lins/Marília/Ourinhos"
    },
    "15": {
        ddd: "15",
        estados: ["SP"],
        regiao: "Itapetininga/Itapeva/Sorocaba/Tatuí"
    },
    "16": {
        ddd: "16",
        estados: ["SP"],
        regiao: "Araraquara/Franca/Jaboticabal/Matão/Ribeirão Preto/São Carlos/Sertãozinho"
    },
    "17": {
        ddd: "17",
        estados: ["SP"],
        regiao: "Barretos/Bebedouro/Catanduva/Fernandópolis/São José do Rio Preto/Votuporanga"
    },
    "18": {
        ddd: "18",
        estados: ["SP"],
        regiao: "Araçatuba/Assis/Birigui/Presidente Prudente"
    },
    "19": {
        ddd: "19",
        estados: ["SP"],
        regiao: "Americana/Araras/Campinas/Indaiatuba/Limeira/Piracicaba/Rio Claro/Santa Bárbara D'Oeste/São João da Boa Vista/Sumaré"
    },
    "21": {
        ddd: "21",
        estados: ["RJ"],
        regiao: "Rio de Janeiro e Região Metropolitana/Teresópolis"
    },
    "22": {
        ddd: "22",
        estados: ["RJ"],
        regiao: "Cabo Frio/Campos dos Goytacazes/Itaperuna/Macaé/Nova Friburgo"
    },
    "24": {
        ddd: "24",
        estados: ["RJ"],
        regiao: "Angra dos Reis/Petrópolis/Volta Redonda/Piraí"
    },
    "27": {
        ddd: "27",
        estados: ["ES"],
        regiao: "Vitória e Região Metropolitana/Colatina/Linhares/Santa Maria de Jetibá"
    },
    "28": {
        ddd: "28",
        estados: ["ES"],
        regiao: "Cachoeiro de Itapemirim/Castelo/Itapemirim/Marataízes"
    },
    "31": {
        ddd: "31",
        estados: ["MG"],
        regiao: "Belo Horizonte e Região Metropolitana/Conselheiro Lafaiete/Ipatinga/Viçosa"
    },
    "32": {
        ddd: "32",
        estados: ["MG"],
        regiao: "Barbacena/Juiz de Fora/Muriaé/São João del-Rei/Ubá"
    },
    "33": {
        ddd: "33",
        estados: ["MG"],
        regiao: "Almenara/Caratinga/Governador Valadares/Manhuaçu/Teófilo Otoni"
    },
    "34": {
        ddd: "34",
        estados: ["MG"],
        regiao: "Araguari/Araxá/Patos de Minas/Uberlândia/Uberaba"
    },
    "35": {
        ddd: "35",
        estados: ["MG"],
        regiao: "Alfenas/Guaxupé/Lavras/Poços de Caldas/Pouso Alegre/Varginha"
    },
    "37": {
        ddd: "37",
        estados: ["MG"],
        regiao: "Bom Despacho/Divinópolis/Formiga/Itaúna/Pará de Minas"
    },
    "38": {
        ddd: "38",
        estados: ["MG"],
        regiao: "Curvelo/Diamantina/Montes Claros/Pirapora/Unaí"
    },
    "41": {
        ddd: "41",
        estados: ["PR"],
        regiao: "Curitiba, Região Metropolitana e Litoral do Paraná"
    },
    "42": {
        ddd: "42",
        estados: ["PR"],
        regiao: "Ponta Grossa/Guarapuava"
    },
    "43": {
        ddd: "43",
        estados: ["PR"],
        regiao: "Apucarana/Londrina"
    },
    "44": {
        ddd: "44",
        estados: ["PR"],
        regiao: "Maringá/Campo Mourão/Umuarama"
    },
    "45": {
        ddd: "45",
        estados: ["PR"],
        regiao: "Cascavel/Foz do Iguaçu"
    },
    "46": {
        ddd: "46",
        estados: ["PR"],
        regiao: "Francisco Beltrão/Pato Branco"
    },
    "47": {
        ddd: "47",
        estados: ["SC"],
        regiao: "Blumenau/Itajaí/Navegantes/Joinville/Brusque/Pomerode/Rio do Sul/Balneário Camboriú"
    },
    "48": {
        ddd: "48",
        estados: ["SC"],
        regiao: "Florianópolis e Região Metropolitana/Nova Trento/São João Batista/Criciúma"
    },
    "49": {
        ddd: "49",
        estados: ["SC"],
        regiao: "Caçador/Chapecó/Concórdia/Lages"
    },
    "51": {
        ddd: "51",
        estados: ["RS"],
        regiao: "Porto Alegre e Região Metropolitana/Santa Cruz do Sul/Litoral Norte"
    },
    "53": {
        ddd: "53",
        estados: ["RS"],
        regiao: "Pelotas/Rio Grande"
    },
    "54": {
        ddd: "54",
        estados: ["RS"],
        regiao: "Caxias do Sul/Passo Fundo"
    },
    "55": {
        ddd: "55",
        estados: ["RS"],
        regiao: "Santa Maria/Santana do Livramento/Ijuí/Uruguaiana"
    },
    "61": {
        ddd: "61",
        estados: ["DF", "GO"],
        regiao: "Abrangência em todo o Distrito Federal e alguns municípios da Região Integrada de Desenvolvimento do Distrito Federal e Entorno"
    },
    "62": {
        ddd: "62",
        estados: ["GO"],
        regiao: "Goiânia e Região Metropolitana/Anápolis/Niquelândia/Porangatu"
    },
    "63": {
        ddd: "63",
        estados: ["TO"],
        regiao: "Tocantins"
    },
    "64": {
        ddd: "64",
        estados: ["GO"],
        regiao: "Caldas Novas/Catalão/Itumbiara/Rio Verde"
    },
    "65": {
        ddd: "65",
        estados: ["MT"],
        regiao: "Cuiabá e Região Metropolitana"
    },
    "66": {
        ddd: "66",
        estados: ["MT"],
        regiao: "Rondonópolis/Sinop"
    },
    "67": {
        ddd: "67",
        estados: ["MS"],
        regiao: "Mato Grosso do Sul"
    },
    "68": {
        ddd: "68",
        estados: ["AC"],
        regiao: "Acre"
    },
    "69": {
        ddd: "69",
        estados: ["RO"],
        regiao: "Rondônia"
    },
    "71": {
        ddd: "71",
        estados: ["BA"],
        regiao: "Salvador e Região Metropolitana"
    },
    "73": {
        ddd: "73",
        estados: ["BA"],
        regiao: "Eunápolis/Ilhéus/Itabuna/Porto Seguro/Teixeira de Freitas"
    },
    "74": {
        ddd: "74",
        estados: ["BA"],
        regiao: "Irecê/Jacobina/Juazeiro/Xique-Xique"
    },
    "75": {
        ddd: "75",
        estados: ["BA"],
        regiao: "Alagoinhas/Feira de Santana/Paulo Afonso/Valença"
    },
    "77": {
        ddd: "77",
        estados: ["BA"],
        regiao: "Barreiras/Bom Jesus da Lapa/Guanambi/Vitória da Conquista"
    },
    "79": {
        ddd: "79",
        estados: ["SE"],
        regiao: "Sergipe"
    },
    "81": {
        ddd: "81",
        estados: ["PE"],
        regiao: "Recife e Região Metropolitana/Caruaru"
    },
    "82": {
        ddd: "82",
        estados: ["AL"],
        regiao: "Alagoas"
    },
    "83": {
        ddd: "83",
        estados: ["PB"],
        regiao: "Paraíba"
    },
    "84": {
        ddd: "84",
        estados: ["RN"],
        regiao: "Rio Grande do Norte"
    },
    "85": {
        ddd: "85",
        estados: ["CE"],
        regiao: "Fortaleza e Região Metropolitana"
    },
    "86": {
        ddd: "86",
        estados: ["PI"],
        regiao: "Teresina e alguns municípios da Região Integrada de Desenvolvimento da Grande Teresina/Parnaíba"
    },
    "87": {
        ddd: "87",
        estados: ["PE"],
        regiao: "Garanhuns/Petrolina/Salgueiro/Serra Talhada"
    },
    "88": {
        ddd: "88",
        estados: ["CE"],
        regiao: "Juazeiro do Norte/Sobral"
    },
    "89": {
        ddd: "89",
        estados: ["PI"],
        regiao: "Picos/Floriano"
    },
    "91": {
        ddd: "91",
        estados: ["PA"],
        regiao: "Belém e Região Metropolitana"
    },
    "92": {
        ddd: "92",
        estados: ["AM"],
        regiao: "Manaus e Região Metropolitana/Parintins"
    },
    "93": {
        ddd: "93",
        estados: ["PA"],
        regiao: "Santarém/Altamira/Itaituba"
    },
    "94": {
        ddd: "94",
        estados: ["PA"],
        regiao: "Marabá"
    },
    "95": {
        ddd: "95",
        estados: ["RR"],
        regiao: "Roraima"
    },
    "96": {
        ddd: "96",
        estados: ["AP"],
        regiao: "Amapá"
    },
    "97": {
        ddd: "97",
        estados: ["AM"],
        regiao: "Abrangência no interior do estado"
    },
    "98": {
        ddd: "98",
        estados: ["MA"],
        regiao: "São Luís e Região Metropolitana"
    },
    "99": {
        ddd: "99",
        estados: ["MA"],
        regiao: "Caxias/Codó/Imperatriz"
    },
}