import { LeadFormData, QualificationResult } from "@/types/lead";

// Função para calcular meses entre datas
export const diffInMonths = (a: Date, b: Date): number => {
  return Math.abs((a.getFullYear() - b.getFullYear()) * 12 + (a.getMonth() - b.getMonth()));
};

// Verifica se está dentro do prazo (60 meses)
export const dentroDoPrazo = (dataStr?: string): boolean => {
  if (!dataStr) return false;
  const meses = diffInMonths(new Date(dataStr), new Date());
  return meses <= 60;
};

// Lógica de qualificação baseada nos documentos fornecidos
export const qualificar = (data: LeadFormData): QualificationResult => {
  let score = 0;
  const detalhes: string[] = [];
  let desqualificado = false;
  let motivoDesqualificacao = "";

  // Verifica prazo
  if (!dentroDoPrazo(data.dataVoo)) {
    return {
      score: 0,
      qualificado: false,
      motivo: "Voo ocorreu há mais de 5 anos (fora do prazo legal)",
      elegibilidadeDetalhes: [],
    };
  }

  // BAGAGEM EXTRAVIADA
  if (data.problema === "bagagem_extraviada") {
    // Desqualifica se bagagem voltou em menos de 24h
    if (data.tempoDevolucaoBagagem === "menos_24h") {
      return {
        score: 0,
        qualificado: false,
        motivo: "Bagagem devolvida em menos de 24 horas não gera indenização",
        elegibilidadeDetalhes: [],
      };
    }

    if (data.tempoDevolucaoBagagem === "mais_24h") {
      score += 40;
      detalhes.push("Bagagem extraviada por mais de 24 horas (+40 pontos)");
    }

    if (data.itensEssenciais) {
      score += 20;
      detalhes.push("Itens essenciais na bagagem (higiene, roupas íntimas, medicamentos) (+20 pontos)");
    }

    if (data.precisouComprar) {
      score += 15;
      detalhes.push("Necessidade de comprar itens de primeira necessidade (+15 pontos)");
    }

    if (data.despesasExtras) {
      score += 10;
      detalhes.push("Despesas extras com transporte/compras (+10 pontos)");
    }
  }
  
  // CANCELAMENTO, ATRASO, OVERBOOKING
  else {
    // REGRA CRÍTICA: Descarta se atraso < 4h
    if (data.tempoAtraso === "menos_4h") {
      return {
        score: 0,
        qualificado: false,
        motivo: "Atraso inferior a 4 horas não gera direito à indenização",
        elegibilidadeDetalhes: [],
      };
    }

    // Pontos base por tempo de atraso
    if (data.tempoAtraso === "mais_4h") {
      score += 30;
      detalhes.push("Atraso de mais de 4 horas (+30 pontos)");
    } else if (data.tempoAtraso === "mais_6h") {
      score += 35;
      detalhes.push("Atraso de mais de 6 horas (+35 pontos)");
    } else if (data.tempoAtraso === "mais_8h") {
      score += 40;
      detalhes.push("Atraso de mais de 8 horas (+40 pontos)");
    }

    // Pontos por tipo de problema
    if (data.problema === "overbooking") {
      score += 15;
      detalhes.push("Overbooking (venda excessiva de passagens) (+15 pontos)");
    }

    if (data.problema === "cancelamento") {
      score += 10;
      detalhes.push("Voo cancelado pela companhia (+10 pontos)");
    }

    // Perda de compromisso (critério importante)
    if (data.perdeuCompromisso) {
      score += 20;
      detalhes.push("Perda de compromisso comprovável (+20 pontos)");
    }

    // Perda de conexão
    if (data.perdeuConexao) {
      score += 15;
      detalhes.push("Perda de voo de conexão (+15 pontos)");
    }

    // Assistência não fornecida (cada item soma pontos)
    const assistenciaNaoFornecida = [];
    
    if (!data.alimentacaoFornecida) {
      score += 10;
      assistenciaNaoFornecida.push("alimentação");
    }
    
    if (!data.hotelFornecido) {
      score += 10;
      assistenciaNaoFornecida.push("hospedagem");
    }
    
    if (!data.transporteFornecido) {
      score += 10;
      assistenciaNaoFornecida.push("transporte");
    }

    if (assistenciaNaoFornecida.length > 0) {
      detalhes.push(`Assistência não fornecida: ${assistenciaNaoFornecida.join(", ")} (+${assistenciaNaoFornecida.length * 10} pontos)`);
    }
  }

  // Define se qualificado (threshold: 60 pontos)
  const qualificado = score >= 60;

  return {
    score,
    qualificado,
    motivo: qualificado 
      ? "Caso elegível para análise jurídica" 
      : "Pontuação insuficiente baseada nos critérios informados",
    elegibilidadeDetalhes: detalhes,
  };
};

// Constrói URL do WhatsApp
export const buildWhatsAppURL = (data: LeadFormData, result: QualificationResult): string => {
  const problemaTexto = {
    cancelamento: "Cancelamento",
    atraso: "Atraso de voo",
    bagagem_extraviada: "Bagagem extraviada",
    overbooking: "Overbooking",
  }[data.problema] || data.problema;

  const mensagem = `Olá! Fiz o pré-diagnóstico na landing page.

*Dados do caso:*
Problema: ${problemaTexto}
Companhia: ${data.ciaAerea}
Rota: ${data.origem} → ${data.destino}
Data: ${new Date(data.dataVoo).toLocaleDateString("pt-BR")}
Pontuação: ${result.score} pontos

Gostaria de conversar sobre meu caso.`;

  // SUBSTITUA PELO NÚMERO REAL DA ADVOGADA
  const whatsappNumber = "5511999999999";
  
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(mensagem)}`;
};