export type ProblemType = "cancelamento" | "atraso" | "bagagem_extraviada" | "overbooking";

export type Airline = "Azul" | "Latam" | "Gol" | "Voepass" | "American Airlines" | "Air France" | "Iberia" | "TAP";

export type DelayTime = "menos_4h" | "mais_4h" | "mais_6h" | "mais_8h";

export type BaggageDelay = "menos_24h" | "mais_24h";

export interface LeadFormData {
  // Dados pessoais
  nome: string;
  telefone: string;
  email: string;
  
  // Dados do voo
  ciaAerea: Airline | "";
  problema: ProblemType | "";
  dataVoo: string;
  origem: string;
  destino: string;
  
  // Perguntas comuns (cancelamento, atraso, overbooking)
  novoVooDisponibilizado?: boolean;
  perdeuConexao?: boolean;
  tempoAtraso?: DelayTime | "";
  perdeuCompromisso?: boolean;
  alimentacaoFornecida?: boolean;
  hotelFornecido?: boolean;
  transporteFornecido?: boolean;
  
  // Perguntas específicas de bagagem
  tempoDevolucaoBagagem?: BaggageDelay | "";
  itensEssenciais?: boolean;
  precisouComprar?: boolean;
  despesasExtras?: boolean;
  
  // LGPD
  consentimentoLGPD: boolean;
}

export interface QualificationResult {
  score: number;
  qualificado: boolean;
  motivo: string;
  elegibilidadeDetalhes: string[];
}