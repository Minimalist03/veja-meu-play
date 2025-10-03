import { UseFormReturn } from "react-hook-form";
import { LeadFormData, DelayTime, BaggageDelay } from "@/types/lead";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface StepDiagnosticProps {
  form: UseFormReturn<LeadFormData>;
}

export const StepDiagnostic = ({ form }: StepDiagnosticProps) => {
  const { setValue, watch } = form;
  const problema = watch("problema");

  const isBagagem = problema === "bagagem_extraviada";
  const isVooProblema = ["cancelamento", "atraso", "overbooking"].includes(problema);

  return (
    <Card className="border-2 shadow-elegant">
      <CardHeader>
        <CardTitle className="text-2xl">Diagnóstico do Caso</CardTitle>
        <CardDescription>
          Responda as perguntas abaixo para avaliarmos a elegibilidade do seu caso.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {isBagagem && (
          <>
            <div className="space-y-3">
              <Label className="text-base font-semibold">A bagagem foi devolvida quanto tempo depois da chegada? *</Label>
              <RadioGroup
                value={watch("tempoDevolucaoBagagem")}
                onValueChange={(value) => setValue("tempoDevolucaoBagagem", value as BaggageDelay)}
              >
                <div className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-accent cursor-pointer">
                  <RadioGroupItem value="menos_24h" id="menos_24h" />
                  <Label htmlFor="menos_24h" className="cursor-pointer flex-1">Menos de 24 horas</Label>
                </div>
                <div className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-accent cursor-pointer">
                  <RadioGroupItem value="mais_24h" id="mais_24h" />
                  <Label htmlFor="mais_24h" className="cursor-pointer flex-1">Mais de 24 horas</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-3">
              <Label className="text-base font-semibold">Dentro da bagagem havia itens essenciais?</Label>
              <p className="text-sm text-muted-foreground">Higiene pessoal, roupas íntimas ou medicamentos</p>
              <RadioGroup
                value={watch("itensEssenciais")?.toString()}
                onValueChange={(value) => setValue("itensEssenciais", value === "true")}
              >
                <div className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-accent cursor-pointer">
                  <RadioGroupItem value="true" id="essenciais_sim" />
                  <Label htmlFor="essenciais_sim" className="cursor-pointer flex-1">Sim</Label>
                </div>
                <div className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-accent cursor-pointer">
                  <RadioGroupItem value="false" id="essenciais_nao" />
                  <Label htmlFor="essenciais_nao" className="cursor-pointer flex-1">Não</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-3">
              <Label className="text-base font-semibold">Você precisou comprar itens enquanto a bagagem estava extraviada?</Label>
              <RadioGroup
                value={watch("precisouComprar")?.toString()}
                onValueChange={(value) => setValue("precisouComprar", value === "true")}
              >
                <div className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-accent cursor-pointer">
                  <RadioGroupItem value="true" id="comprar_sim" />
                  <Label htmlFor="comprar_sim" className="cursor-pointer flex-1">Sim</Label>
                </div>
                <div className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-accent cursor-pointer">
                  <RadioGroupItem value="false" id="comprar_nao" />
                  <Label htmlFor="comprar_nao" className="cursor-pointer flex-1">Não</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-3">
              <Label className="text-base font-semibold">Teve despesas extras com compras e/ou transporte?</Label>
              <RadioGroup
                value={watch("despesasExtras")?.toString()}
                onValueChange={(value) => setValue("despesasExtras", value === "true")}
              >
                <div className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-accent cursor-pointer">
                  <RadioGroupItem value="true" id="despesas_sim" />
                  <Label htmlFor="despesas_sim" className="cursor-pointer flex-1">Sim</Label>
                </div>
                <div className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-accent cursor-pointer">
                  <RadioGroupItem value="false" id="despesas_nao" />
                  <Label htmlFor="despesas_nao" className="cursor-pointer flex-1">Não</Label>
                </div>
              </RadioGroup>
            </div>
          </>
        )}

        {isVooProblema && (
          <>
            <Alert className="border-primary/20 bg-primary/5">
              <AlertCircle className="h-4 w-4 text-primary" />
              <AlertDescription className="text-sm">
                <strong>Importante:</strong> Atrasos inferiores a 4 horas não geram direito à indenização segundo a legislação brasileira.
              </AlertDescription>
            </Alert>

            <div className="space-y-3">
              <Label className="text-base font-semibold">Quanto tempo depois você chegou ao destino? *</Label>
              <RadioGroup
                value={watch("tempoAtraso")}
                onValueChange={(value) => setValue("tempoAtraso", value as DelayTime)}
              >
                <div className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-accent cursor-pointer">
                  <RadioGroupItem value="menos_4h" id="menos_4h_delay" />
                  <Label htmlFor="menos_4h_delay" className="cursor-pointer flex-1">Menos de 4 horas</Label>
                </div>
                <div className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-accent cursor-pointer">
                  <RadioGroupItem value="mais_4h" id="mais_4h" />
                  <Label htmlFor="mais_4h" className="cursor-pointer flex-1">Mais de 4 horas</Label>
                </div>
                <div className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-accent cursor-pointer">
                  <RadioGroupItem value="mais_6h" id="mais_6h" />
                  <Label htmlFor="mais_6h" className="cursor-pointer flex-1">Mais de 6 horas</Label>
                </div>
                <div className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-accent cursor-pointer">
                  <RadioGroupItem value="mais_8h" id="mais_8h" />
                  <Label htmlFor="mais_8h" className="cursor-pointer flex-1">Mais de 8 horas</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-3">
              <Label className="text-base font-semibold">A companhia disponibilizou novo voo?</Label>
              <RadioGroup
                value={watch("novoVooDisponibilizado")?.toString()}
                onValueChange={(value) => setValue("novoVooDisponibilizado", value === "true")}
              >
                <div className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-accent cursor-pointer">
                  <RadioGroupItem value="true" id="novo_voo_sim" />
                  <Label htmlFor="novo_voo_sim" className="cursor-pointer flex-1">Sim</Label>
                </div>
                <div className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-accent cursor-pointer">
                  <RadioGroupItem value="false" id="novo_voo_nao" />
                  <Label htmlFor="novo_voo_nao" className="cursor-pointer flex-1">Não</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-3">
              <Label className="text-base font-semibold">Perdeu algum voo de conexão?</Label>
              <RadioGroup
                value={watch("perdeuConexao")?.toString()}
                onValueChange={(value) => setValue("perdeuConexao", value === "true")}
              >
                <div className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-accent cursor-pointer">
                  <RadioGroupItem value="true" id="conexao_sim" />
                  <Label htmlFor="conexao_sim" className="cursor-pointer flex-1">Sim</Label>
                </div>
                <div className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-accent cursor-pointer">
                  <RadioGroupItem value="false" id="conexao_nao" />
                  <Label htmlFor="conexao_nao" className="cursor-pointer flex-1">Não</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-3">
              <Label className="text-base font-semibold">Perdeu ou se atrasou para algum compromisso?</Label>
              <RadioGroup
                value={watch("perdeuCompromisso")?.toString()}
                onValueChange={(value) => setValue("perdeuCompromisso", value === "true")}
              >
                <div className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-accent cursor-pointer">
                  <RadioGroupItem value="true" id="compromisso_sim" />
                  <Label htmlFor="compromisso_sim" className="cursor-pointer flex-1">Sim</Label>
                </div>
                <div className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-accent cursor-pointer">
                  <RadioGroupItem value="false" id="compromisso_nao" />
                  <Label htmlFor="compromisso_nao" className="cursor-pointer flex-1">Não</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-4 pt-4 border-t">
              <Label className="text-base font-semibold">A companhia forneceu assistência?</Label>
              
              <div className="space-y-3">
                <Label className="text-sm">Alimentação</Label>
                <RadioGroup
                  value={watch("alimentacaoFornecida")?.toString()}
                  onValueChange={(value) => setValue("alimentacaoFornecida", value === "true")}
                >
                  <div className="flex items-center space-x-2 p-2 rounded-lg border hover:bg-accent cursor-pointer">
                    <RadioGroupItem value="true" id="alim_sim" />
                    <Label htmlFor="alim_sim" className="cursor-pointer flex-1">Sim</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-2 rounded-lg border hover:bg-accent cursor-pointer">
                    <RadioGroupItem value="false" id="alim_nao" />
                    <Label htmlFor="alim_nao" className="cursor-pointer flex-1">Não</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <Label className="text-sm">Hotel/Hospedagem</Label>
                <RadioGroup
                  value={watch("hotelFornecido")?.toString()}
                  onValueChange={(value) => setValue("hotelFornecido", value === "true")}
                >
                  <div className="flex items-center space-x-2 p-2 rounded-lg border hover:bg-accent cursor-pointer">
                    <RadioGroupItem value="true" id="hotel_sim" />
                    <Label htmlFor="hotel_sim" className="cursor-pointer flex-1">Sim</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-2 rounded-lg border hover:bg-accent cursor-pointer">
                    <RadioGroupItem value="false" id="hotel_nao" />
                    <Label htmlFor="hotel_nao" className="cursor-pointer flex-1">Não</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <Label className="text-sm">Transporte</Label>
                <RadioGroup
                  value={watch("transporteFornecido")?.toString()}
                  onValueChange={(value) => setValue("transporteFornecido", value === "true")}
                >
                  <div className="flex items-center space-x-2 p-2 rounded-lg border hover:bg-accent cursor-pointer">
                    <RadioGroupItem value="true" id="transp_sim" />
                    <Label htmlFor="transp_sim" className="cursor-pointer flex-1">Sim</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-2 rounded-lg border hover:bg-accent cursor-pointer">
                    <RadioGroupItem value="false" id="transp_nao" />
                    <Label htmlFor="transp_nao" className="cursor-pointer flex-1">Não</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};