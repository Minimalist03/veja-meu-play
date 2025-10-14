import { UseFormReturn } from "react-hook-form";
import { LeadFormData } from "@/types/lead";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

interface StepPersonalDataProps {
  form: UseFormReturn<LeadFormData>;
}

export const StepPersonalData = ({ form }: StepPersonalDataProps) => {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <Card className="bg-surface shadow-lg rounded-lg p-8">
      <CardHeader>
        <CardTitle className="font-serif text-2xl text-foreground mb-1">Dados Pessoais</CardTitle>
        <CardDescription className="font-sans text-base text-muted-foreground">
          Precisamos de algumas informações básicas para iniciar a análise do seu caso.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="nome" className="font-sans text-foreground mb-1 block">Nome Completo *</Label>
            <Input
              id="nome"
              placeholder="Digite seu nome completo"
              {...register("nome")}
              className={`w-full bg-offwhite border border-border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-accent ${
                errors.nome ? "border-destructive" : ""
              }`}
            />
            {errors.nome && <p className="text-sm text-destructive">{errors.nome.message}</p>}
          </div>

          <div>
            <Label htmlFor="email" className="font-sans text-foreground mb-1 block">E-mail *</Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              {...register("email")}
              className={`w-full bg-offwhite border border-border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-accent ${
                errors.email ? "border-destructive" : ""
              }`}
            />
            {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
          </div>

          <div>
            <Label htmlFor="telefone" className="font-sans text-foreground mb-1 block">WhatsApp *</Label>
            <Input
              id="telefone"
              placeholder="(11) 99999-9999"
              {...register("telefone")} // CORRIGIDO
              className={`w-full bg-offwhite border border-border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-accent ${
                errors.telefone ? "border-destructive" : "" // CORRIGIDO
              }`}
            />
            {errors.telefone && <p className="text-sm text-destructive">{errors.telefone.message}</p>}
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-start space-x-2 bg-accent/20 p-4 rounded-md">
            <Checkbox
              id="consentimentoLGPD"
              {...register("consentimentoLGPD")} // CORRIGIDO
              className="mt-1"
            />
            <div className="grid gap-1.5 leading-none">
              <Label
                htmlFor="consentimentoLGPD"
                className="font-sans text-sm text-foreground"
              >
                Concordo com o tratamento dos meus dados pessoais para análise do caso e eventual contato jurídico, conforme a{' '}
                <a href="#" className="text-primary hover:underline">Política de Privacidade</a> e a LGPD. *
              </Label>
            </div>
          </div>
          {errors.consentimentoLGPD && ( // CORRIGIDO
            <p className="text-sm text-destructive mt-1">{errors.consentimentoLGPD.message}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
