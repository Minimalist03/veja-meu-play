import { z } from "zod";

const phoneBR = /^(\(?\d{2}\)?[\s-]?)?(\d{4,5}[\s-]?\d{4})$/;

export const leadFormSchema = z.object({
  nome: z
    .string()
    .min(3, "Nome deve ter no mínimo 3 caracteres")
    .max(100, "Nome muito longo")
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Nome deve conter apenas letras"),

  email: z
    .string()
    .email("Email inválido")
    .min(5, "Email muito curto"),

  // CORRIGIDO AQUI
  whatsapp: z
    .string()
    .regex(phoneBR, "Telefone inválido. Use formato: (11) 99999-9999")
    .transform((val) => val.replace(/\D/g, "")),

  consentimento: z
    .boolean()
    .refine((val) => val === true, {
      message: "É necessário concordar com os termos da LGPD",
    }),
  // FIM DA CORREÇÃO

  problema: z.enum(["cancelamento", "atraso", "bagagem_extraviada", "overbooking"], {
    errorMap: () => ({ message: "Selecione o tipo de problema" }),
  }),

  ciaAerea: z.enum(
    ["Azul", "Latam", "Gol", "Voepass", "American Airlines", "Air France", "Iberia", "TAP"],
    {
      errorMap: () => ({ message: "Selecione a companhia aérea" }),
    }
  ),

  dataVoo: z
    .string()
    .min(1, "Data do voo é obrigatória")
    .refine(
      (date) => {
        const vooDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return vooDate <= today;
      },
      { message: "Data do voo não pode ser futura" }
    )
    .refine(
      (date) => {
        const vooDate = new Date(date);
        const fiveYearsAgo = new Date();
        fiveYearsAgo.setFullYear(fiveYearsAgo.getFullYear() - 5);
        return vooDate >= fiveYearsAgo;
      },
      { message: "Voo deve ter ocorrido nos últimos 5 anos" }
    ),

  origem: z
    .string()
    .min(2, "Origem deve ter no mínimo 2 caracteres")
    .max(100, "Origem muito longa"),

  destino: z
    .string()
    .min(2, "Destino deve ter no mínimo 2 caracteres")
    .max(100, "Destino muito longo"),

  tempoAtraso: z.enum(["menos_4h", "mais_4h", "mais_6h", "mais_8h", ""]).optional(),
  novoVooDisponibilizado: z.boolean().optional(),
  perdeuConexao: z.boolean().optional(),
  perdeuCompromisso: z.boolean().optional(),
  alimentacaoFornecida: z.boolean().optional(),
  hotelFornecido: z.boolean().optional(),
  transporteFornecido: z.boolean().optional(),

  tempoDevolucaoBagagem: z.enum(["menos_24h", "mais_24h", ""]).optional(),
  itensEssenciais: z.boolean().optional(),
  precisouComprar: z.boolean().optional(),
  despesasExtras: z.boolean().optional(),
})
.superRefine((data, ctx) => {
  if (["cancelamento", "atraso", "overbooking"].includes(data.problema)) {
    if (!data.tempoAtraso || data.tempoAtraso === "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Informe quanto tempo depois você chegou ao destino",
        path: ["tempoAtraso"],
      });
    }
  }

  if (data.problema === "bagagem_extraviada") {
    if (!data.tempoDevolucaoBagagem || data.tempoDevolucaoBagagem === "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Informe quando a bagagem foi devolvida",
        path: ["tempoDevolucaoBagagem"],
      });
    }
  }
});
