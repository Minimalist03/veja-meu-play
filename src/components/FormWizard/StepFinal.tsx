import { UseFormReturn } from "react-hook-form";
import { LeadFormData } from "@/types/lead";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FormField, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle2, Plane, User, Mail, Phone, MapPin, Calendar } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface StepFinalProps {
  form: UseFormReturn<LeadFormData>;
  data: LeadFormData;
}

// Mapeamento dos problemas para labels legíveis
const problemLabels: Record<string, string> = {
  cancelamento: "Voo Cancelado",
  atraso: "Atraso de Voo",
  bagagem_extraviada: "Bagagem Extraviada",
  overbooking: "Overbooking"
};

export const StepFinal = ({ form, data }: StepFinalProps) => {
  return (
    <Card className="border-2 shadow-elegant">
      <CardHeader>
        <CardTitle className="text-2xl">Confirme seus dados</CardTitle>
        <CardDescription>
          Revise as informações antes de finalizar sua solicitação.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Resumo dos Dados */}
        <div className="space-y-4">
          {/* Dados Pessoais */}
          <div className="bg-accent/20 rounded-lg p-4">
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Dados Pessoais
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Nome:</span>
                <span>{data.nome}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">E-mail:</span>
                <span>{data.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">WhatsApp:</span>
                <span>{data.telefone}</span>
              </div>
            </div>
          </div>

          {/* Dados do Voo */}
          <div className="bg-accent/20 rounded-lg p-4">
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <Plane className="h-5 w-5 text-primary" />
              Dados do Voo
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Problema:</span>
                <span>{problemLabels[data.problema as string] || data.problema}</span>
              </div>
              <div className="flex items-center gap-2">
                <Plane className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Companhia:</span>
                <span>{data.ciaAerea === "Outra" ? data.outraCompanhia : data.ciaAerea}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Data do Voo:</span>
                <span>{new Date(data.dataVoo + "T00:00:00").toLocaleDateString("pt-BR")}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Rota:</span>
                <span>{data.origem} → {data.destino}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Alert Informativo */}
        <Alert className="border-primary/20 bg-primary/5">
          <CheckCircle2 className="h-4 w-4 text-primary" />
          <AlertDescription>
            <strong>Próximo passo:</strong> Nossa equipe analisará seu caso em até 24 horas e entrará em contato pelo WhatsApp informado.
          </AlertDescription>
        </Alert>

        {/* LGPD Checkbox */}
        <FormField
          control={form.control}
          name="consentimentoLGPD"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border-2 border-primary/20 bg-accent/10 p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  id="consentimentoLGPD"
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel htmlFor="consentimentoLGPD" className="font-sans text-sm text-foreground cursor-pointer">
                  Concordo com o tratamento dos meus dados pessoais para análise do caso e eventual contato jurídico, conforme a{' '}
                  <a href="#" className="text-primary hover:underline font-semibold">Política de Privacidade</a> e a LGPD. *
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        {/* Texto final */}
        <p className="text-xs text-center text-muted-foreground">
          Ao clicar em "Ver Resultado", você aceita nossos termos e condições.
        </p>
      </CardContent>
    </Card>
  );
};
