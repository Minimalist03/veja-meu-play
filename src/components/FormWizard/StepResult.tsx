import { LeadFormData, QualificationResult } from "@/types/lead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, MessageCircle, TrendingUp } from "lucide-react";
import { buildWhatsAppURL } from "@/lib/qualification";

interface StepResultProps {
  data: LeadFormData;
  result: QualificationResult;
}

export const StepResult = ({ data, result }: StepResultProps) => {
  const handleWhatsAppClick = () => {
    const url = buildWhatsAppURL(data, result);
    window.open(url, "_blank");
  };

  return (
    <Card className="border-2 shadow-elegant">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4">
          {result.qualificado ? (
            <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <CheckCircle2 className="h-12 w-12 text-primary" />
            </div>
          ) : (
            <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center mx-auto">
              <XCircle className="h-12 w-12 text-muted-foreground" />
            </div>
          )}
        </div>
        <CardTitle className="text-3xl">
          {result.qualificado ? "Caso Elegível! ✅" : "Caso Não Elegível"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Score */}
        <div className="bg-accent rounded-xl p-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Pontuação do Caso</span>
          </div>
          <div className="text-5xl font-bold text-primary mb-1">{result.score}</div>
          <div className="text-sm text-muted-foreground">
            {result.qualificado ? "Acima do mínimo (60 pontos)" : "Abaixo do mínimo (60 pontos)"}
          </div>
        </div>

        {/* Mensagem */}
        <div className={`rounded-xl p-6 ${result.qualificado ? "bg-primary/5 border border-primary/20" : "bg-muted"}`}>
          <p className="text-center text-lg">
            {result.qualificado ? (
              <>
                <strong>Ótima notícia!</strong> Baseado nas informações fornecidas, seu caso tem forte elegibilidade para indenização. 
                Nossa equipe pode analisar seus documentos e iniciar gratuitamente a triagem jurídica.
              </>
            ) : (
              <>
                Com base nas suas respostas, no momento seu caso não atende aos critérios mínimos estabelecidos pelo escritório. 
                Se obtiver novos comprovantes ou houver mudanças na situação, você pode reenviar mais tarde.
              </>
            )}
          </p>
        </div>

        {/* Detalhes da elegibilidade */}
        {result.elegibilidadeDetalhes.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Fatores Considerados:</h3>
            <ul className="space-y-2">
              {result.elegibilidadeDetalhes.map((detalhe, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>{detalhe}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* CTA */}
        {result.qualificado && (
          <div className="pt-4">
            <Button 
              size="lg" 
              className="w-full font-bold py-6 text-lg"
              onClick={handleWhatsAppClick}
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Falar com a Advogada no WhatsApp
            </Button>
            <p className="text-xs text-center text-muted-foreground mt-3">
              Atendimento 100% online • Análise gratuita • Resposta em até 24h
            </p>
          </div>
        )}

        {!result.qualificado && (
          <div className="text-center pt-4">
            <p className="text-sm text-muted-foreground">
              Caso tenha dúvidas ou novos documentos, você pode entrar em contato conosco.
            </p>
            <Button variant="outline" size="lg" className="mt-4" onClick={handleWhatsAppClick}>
              <MessageCircle className="mr-2 h-5 w-5" />
              Entrar em Contato
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
