import { LeadFormData, QualificationResult, SheetsPayload } from "@/types/lead";

/**
 * ENVIAR DADOS PARA GOOGLE SHEETS
 * 
 * Pré-requisitos:
 * 1. Criar planilha no Google Sheets
 * 2. Criar Apps Script (código abaixo)
 * 3. Publicar como Web App
 * 4. Copiar URL e colocar no .env como VITE_APPS_SCRIPT_URL
 */

// Captura UTM parameters da URL
const getUTMParams = () => {
  const params = new URLSearchParams(window.location.search);
  return {
    utmSource: params.get('utm_source') || '',
    utmMedium: params.get('utm_medium') || '',
    utmCampaign: params.get('utm_campaign') || ''
  };
};

export const enviarParaSheets = async (
  data: LeadFormData,
  result: QualificationResult
): Promise<boolean> => {
  try {
    const utm = getUTMParams();
    
    const payload: SheetsPayload = {
      ...data,
      timestamp: new Date().toISOString(),
      score: result.score,
      qualificado: result.qualificado,
      valorEstimado: result.valorEstimado || 'R$ 0',
      userAgent: navigator.userAgent,
      ...utm
    };

    // URL do Apps Script (configurar no .env)
    const scriptURL = import.meta.env.VITE_APPS_SCRIPT_URL;
    
    if (!scriptURL) {
      console.error('VITE_APPS_SCRIPT_URL não configurada');
      return false;
    }

    const response = await fetch(scriptURL, {
      method: 'POST',
      mode: 'no-cors', // Apps Script requer no-cors
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    // No-cors sempre retorna opaque response, assumir sucesso
    console.log('Dados enviados com sucesso para Google Sheets');
    return true;

  } catch (error) {
    console.error('Erro ao enviar para Google Sheets:', error);
    return false;
  }
};

/**
 * CÓDIGO DO GOOGLE APPS SCRIPT
 * 
 * 1. Abra sua planilha Google Sheets
 * 2. Extensões > Apps Script
 * 3. Cole o código abaixo:
 * 
 * ```javascript
 * function doPost(e) {
 *   try {
 *     const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Leads_Voos');
 *     
 *     if (!sheet) {
 *       return ContentService.createTextOutput(JSON.stringify({
 *         success: false,
 *         error: 'Aba "Leads_Voos" não encontrada'
 *       })).setMimeType(ContentService.MimeType.JSON);
 *     }
 *     
 *     const data = JSON.parse(e.postData.contents);
 *     
 *     // Criar cabeçalhos se não existirem
 *     if (sheet.getLastRow() === 0) {
 *       sheet.appendRow([
 *         'Timestamp',
 *         'Nome',
 *         'Email',
 *         'Telefone',
 *         'Problema',
 *         'Cia Aérea',
 *         'Data Voo',
 *         'Origem',
 *         'Destino',
 *         'Tempo Atraso',
 *         'Perdeu Conexão',
 *         'Perdeu Compromisso',
 *         'Alimentação Fornecida',
 *         'Hotel Fornecido',
 *         'Transporte Fornecido',
 *         'Tempo Devolução Bagagem',
 *         'Itens Essenciais',
 *         'Precisou Comprar',
 *         'Despesas Extras',
 *         'Score',
 *         'Qualificado',
 *         'Valor Estimado',
 *         'UTM Source',
 *         'UTM Medium',
 *         'UTM Campaign',
 *         'User Agent'
 *       ]);
 *     }
 *     
 *     // Adicionar linha com dados
 *     sheet.appendRow([
 *       new Date(data.timestamp),
 *       data.nome,
 *       data.email,
 *       data.telefone,
 *       data.problema,
 *       data.ciaAerea,
 *       data.dataVoo,
 *       data.origem,
 *       data.destino,
 *       data.tempoAtraso || '',
 *       data.perdeuConexao ? 'Sim' : 'Não',
 *       data.perdeuCompromisso ? 'Sim' : 'Não',
 *       data.alimentacaoFornecida ? 'Sim' : 'Não',
 *       data.hotelFornecido ? 'Sim' : 'Não',
 *       data.transporteFornecido ? 'Sim' : 'Não',
 *       data.tempoDevolucaoBagagem || '',
 *       data.itensEssenciais ? 'Sim' : 'Não',
 *       data.precisouComprar ? 'Sim' : 'Não',
 *       data.despesasExtras ? 'Sim' : 'Não',
 *       data.score,
 *       data.qualificado ? 'SIM' : 'NÃO',
 *       data.valorEstimado,
 *       data.utmSource || '',
 *       data.utmMedium || '',
 *       data.utmCampaign || '',
 *       data.userAgent || ''
 *     ]);
 *     
 *     // Se qualificado, enviar notificação (opcional)
 *     if (data.qualificado && data.score >= 70) {
 *       // Adicione aqui integração com Slack, Email, etc
 *       // MailApp.sendEmail(...);
 *     }
 *     
 *     return ContentService.createTextOutput(JSON.stringify({
 *       success: true
 *     })).setMimeType(ContentService.MimeType.JSON);
 *     
 *   } catch (error) {
 *     return ContentService.createTextOutput(JSON.stringify({
 *       success: false,
 *       error: error.toString()
 *     })).setMimeType(ContentService.MimeType.JSON);
 *   }
 * }
 * 
 * function doGet() {
 *   return ContentService.createTextOutput('API Ativa');
 * }
 * ```
 * 
 * 4. Implantar > Nova implantação
 * 5. Tipo: Aplicativo da Web
 * 6. Executar como: Eu
 * 7. Acesso: Qualquer pessoa
 * 8. Copiar URL e adicionar ao .env
 */
