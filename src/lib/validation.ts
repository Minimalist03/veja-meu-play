import { z } from "zod";

// Regex para telefone brasileiro (com ou sem 9º dígito, com/sem formatação)
const phoneBR = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;

export const leadSchema = z.object({
  // Dados pessoais
  nome: z.string()
    .trim()
    .min(3, "Nome deve ter pelo menos 3 caracteres")
    .max(100, "Nome muito longo"),
  
  telefone: z.string()
    .trim()
    .regex(phoneBR, "Telefone inválido. Use formato: (11) 99999-9999"),
  
  email: z.string()
    .trim()
    .email("E-mail inválido")
    .max(255, "E-mail muito longo"),
  
  // Dados do voo
  ciaAerea: z.enum(["Azul", "Latam", "Gol", "Voepass", "American Airlines", "Air France", "Iberia", "TAP"], {
    errorMap: () => ({ message: "Selecione uma companhia aérea" }),
  }),
  
  problema: z.enum(["cancelamento", "atraso", "bagagem_extraviada", "overbooking"], {
    errorMap: () => ({ message: "Selecione o tipo de problema" }),
  }),
  
  dataVoo: z.string()
    .min(10, "Data do voo obrigatória")
    .refine((date) => {
      const vooDate = new Date(date);
      const today = new Date();
      return vooDate <= today;
    }, "Data do voo não pode ser futura"),
  
  origem: z.string()
    .trim()
    .min(2, "Origem obrigatória")
    .max(100, "Origem muito longa"),
  
  destino: z.string()
    .trim()
    .min(2, "Destino obrigatório")
    .max(100, "Destino muito longo"),
  
  // Perguntas condicionais (opcionais, validadas no componente)
  novoVooDisponibilizado: z.boolean().optional(),
  perdeuConexao: z.boolean().optional(),
  tempoAtraso: z.enum(["menos_4h", "mais_4h", "mais_6h", "mais_8h"]).optional(),
  perdeuCompromisso: z.boolean().optional(),
  alimentacaoFornecida: z.boolean().optional(),
  hotelFornecido: z.boolean().optional(),
  transporteFornecido: z.boolean().optional(),
  
  tempoDevolucaoBagagem: z.enum(["menos_24h", "mais_24h"]).optional(),
  itensEssenciais: z.boolean().optional(),
  precisouComprar: z.boolean().optional(),
  despesasExtras: z.boolean().optional(),
  
  // LGPD
  consentimentoLGPD: z.literal(true, {
    errorMap: () => ({ message: "Você precisa consentir com o tratamento de dados" }),
  }),
});