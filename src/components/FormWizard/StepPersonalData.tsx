import { UseFormReturn } from "react-hook-form";
import { LeadFormData } from "@/types/lead";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface StepPersonalDataProps {
  form: UseFormReturn<LeadFormData>;
}

export const StepPersonalData = ({ form }: StepPersonalDataProps) => {
  const { register, formState: { errors }, setValue, watch } = form;
  const consentimento = watch("consentimentoLGPD");

  return (
    <Card className="border-2 shadow-elegant">
      <CardHeader>
        <CardTitle className="text-2xl">Dados Pessoais</CardTitle>
        <CardDescription>
          Precisamos de algumas informações básicas para iniciar a análise do seu caso.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="nome">Nome Completo *</Label>
          <Input
            id="nome"
            {...register("nome")}
            placeholder="Digite seu nome completo"
            className={errors.nome ? "border-destructive" : ""}
          />
          {errors.nome && (
            <p className="text-sm text-destructive">{errors.nome.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">E-mail *</Label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            placeholder="seu@email.com"
            className={errors.email ? "border-destructive" : ""}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="telefone">WhatsApp *</Label>
          <Input
            id="telefone"
            {...register("telefone")}
            placeholder="(11) 99999-9999"
            className={errors.telefone ? "border-destructive" : ""}
          />
          {errors.telefone && (
            <p className="text-sm text-destructive">{errors.telefone.message}</p>
          )}
          <p className="text-xs text-muted-foreground">
            Usaremos este número para enviar o resultado da análise
          </p>
        </div>

        <div className="bg-accent/50 rounded-lg p-4 space-y-4">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="consentimentoLGPD"
              checked={consentimento}
              onCheckedChange={(checked) => setValue("consentimentoLGPD", checked as boolean)}
              className="mt-1"
            />
            <div className="space-y-1">
              <Label htmlFor="consentimentoLGPD" className="text-sm font-normal cursor-pointer">
                Concordo com o tratamento dos meus dados pessoais para análise do caso e eventual contato jurídico, conforme a{" "}
                <a href="#" className="text-primary underline hover:text-primary-glow">
                  Política de Privacidade
                </a>
                {" "}e a LGPD. *
              </Label>
            </div>
          </div>
          {errors.consentimentoLGPD && (
            <p className="text-sm text-destructive">{errors.consentimentoLGPD.message}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};