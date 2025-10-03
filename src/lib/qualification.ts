import { LeadFormData, QualificationResult } from "@/types/lead";

// Função para calcular meses entre datas
export const diffInMonths = (a: Date, b: Date): number => {
  return Math.abs((a.getFullYear() - b.getFullYear()) * 12 + (a.getMonth() - b.getMonth()));
};

// Verifica se está dentro do prazo (60 meses = 5 anos)
export const dentroDoPrazo = (dataStr?: string): boolean => {
  if (!dataStr) return false;
  const meses = diffInMonths(new Date(dataStr), new Date());
  return meses <= 60;
};

// Calcula estimativa de valor baseado no score
const calcularValorEstimado = (score: number): string => {
  if (score < 60) return "R$ 0";
  
  // Valores baseados nos documentos da advogada (R$ 3k - R$ 10k)
  if (score >= 90) return "R$ 7.000 - R$ 10.000";
  if (score >= 80) return "R$ 5.500 - R$ 8.500";
  if (score >= 70) return "R$ 4.000 - R$ 6.500";
  return "R$ 3.000 - R$ 5.000";
};

/**
 * LÓGICA DE QUALIFICAÇÃO
 * Baseada nos documentos fornecidos pela advogada
 * Threshold: 60 pontos mínimos
 */
export const qualificar = (data: LeadFormData): QualificationResult => {
  let score = 0;
  const detalhes: string[] = [];

  // ========================================
  // VALIDAÇÃO 1: PRAZO LEGAL (5 ANOS)
  // ========================================
  if (!dentroDoPrazo(data.dataVoo)) {
    return {
      score: 0,
      qualificado: false,
      motivo: "Voo ocorreu há mais de 5 anos (prazo prescricional expirado)",
      elegibilidadeDetalhes: ["O prazo legal para reclamar direitos é de 5 anos a partir da data do voo"]
    };
  }

  // ========================================
  // CENÁRIO 1: BAGAGEM EXTRAVIADA
  // ========================================
  if (data.problema === "bagagem_extraviada") {
    // CRITÉRIO ELIMINATÓRIO: Bagagem < 24h
    if (data.tempoDevolucaoBagagem === "menos_24h") {
      return {
        score: 0,
        qualificado: false,
        motivo: "Devolução em menos de 24 horas não gera direito à indenização",
        elegibilidadeDetalhes: [
          "A legislação estabelece que apenas atrasos superiores a 24 horas na devolução geram compensação"
        ]
      };
    }

    // Bagagem após 24h
    if (data.tempoDevolucaoBagagem === "mais_24h") {
      score += 35;
      detalhes.push("Atraso superior a 24h na devolução da bagagem");
    }

    // Itens essenciais
    if (data.itensEssenciais) {
      score += 15;
      detalhes.push("Bagagem continha itens essenciais (higiene, roupas íntimas, medicamentos)");
    }

    // Necessidade de comprar itens
    if (data.precisouComprar) {
      score += 10;
      detalhes.push("Necessidade de comprar itens de primeira necessidade");
    }

    // Despesas extras
    if (data.despesasExtras) {
      score += 10;
      detalhes.push("Despesas extras com transporte/compras");
    }
  }
  
  // ========================================
  // CENÁRIO 2: VOO (CANCELAMENTO/ATRASO/OVERBOOKING)
  // ========================================
  else {
    // CRITÉRIO ELIMINATÓRIO: Atraso < 4h
    if (data.tempoAtraso === "menos_4h") {
      return {
        score: 0,
        qualificado: false,
        motivo: "Atraso inferior a 4 horas não gera direito à indenização",
        elegibilidadeDetalhes: [
          "Segundo regulamentação da ANAC, apenas atrasos superiores a 4 horas geram direito à compensação"
        ]
      };
    }

    // Pontuação por tipo de problema
    if (data.problema === "cancelamento") {
      score += 40;
      detalhes.push("Voo cancelado pela companhia aérea");
    }
    
    if (data.problema === "overbooking") {
      score += 40;
      detalhes.push("Overbooking (venda excessiva de passagens)");
    }
    
    if (data.problema === "atraso") {
      score += 35;
      detalhes.push("Atraso de voo");
    }

    // Pontuação por tempo de atraso
    if (data.tempoAtraso === "mais_4h") {
      score += 10;
      detalhes.push("Chegada com mais de 4 horas de atraso");
    } else if (data.tempoAtraso === "mais_6h") {
      score += 15;
      detalhes.push("Chegada com mais de 6 horas de atraso");
    } else if (data.tempoAtraso === "mais_8h") {
      score += 20;
      detalhes.push("Chegada com mais de 8 horas de atraso");
    }

    // Perda de compromisso (importante)
    if (data.perdeuCompromisso) {
      score += 15;
      detalhes.push("Perda de compromisso importante");
    }

    // Perda de conexão
    if (data.perdeuConexao) {
      score += 15;
      detalhes.push("Perda de voo de conexão");
    }

    // Assistência NÃO fornecida (cada item adiciona pontos)
    const assistenciasNegadas: string[] = [];
    
    if (!data.alimentacaoFornecida) {
      score += 10;
      assistenciasNegadas.push("alimentação");
    }
    
    if (!data.hotelFornecido) {
      score += 10;
      assistenciasNegadas.push("hospedagem");
    }
    
    if (!data.transporteFornecido) {
      score += 5;
      assistenciasNegadas.push("transporte");
    }

    if (assistenciasNegadas.length > 0) {
      detalhes.push(`Assistência não fornecida: ${assistenciasNegadas.join(", ")}`);
    }
  }

  // ========================================
  // RESULTADO FINAL
  // ========================================
  const qualificado = score >= 60;
  const valorEstimado = calcularValorEstimado(score);

  return {
    score,
    qualificado,
    motivo: qualificado 
      ? `Caso elegível! Estimativa: ${valorEstimado}` 
      : "Pontuação abaixo do mínimo (60 pontos) baseada nos critérios informados",
    elegibilidadeDetalhes: detalhes,
    valorEstimado
  };
};

/**
 * CONSTRÓI URL DO WHATSAPP
 * Substitua o número pelo WhatsApp real da advogada
 */
export const buildWhatsAppURL = (data: LeadFormData, result: QualificationResult): string => {
  const problemaTexto = {
    cancelamento: "Cancelamento de voo",
    atraso: "Atraso de voo",
    bagagem_extraviada: "Bagagem extraviada",
    overbooking: "Overbooking (preterição de embarque)",
  }[data.problema] || data.problema;

  const mensagem = `Olá! Acabei de fazer o pré-diagnóstico na landing page.

*Dados do caso:*
• Problema: ${problemaTexto}
• Companhia: ${data.ciaAerea}
• Rota: ${data.origem} → ${data.destino}
• Data: ${new Date(data.dataVoo).toLocaleDateString("pt-BR")}

*Resultado:*
• Pontuação: ${result.score} pontos
• Status: ${result.qualificado ? "✅ Elegível" : "⚠️ Requer análise"}
${result.valorEstimado ? `• Estimativa: ${result.valorEstimado}` : ""}

Gostaria de conversar sobre meu caso.`;

  // ⚠️ SUBSTITUA PELO NÚMERO REAL DA ADVOGADA
  const whatsappNumber = "5511987654321";
  
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(mensagem)}`;
};
