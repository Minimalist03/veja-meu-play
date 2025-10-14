import { UseFormReturn } from "react-hook-form";
import { LeadFormData } from "@/types/lead";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { FormField, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form"; // 1. Importar componentes de formulário

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
            {errors.nome && <p className="text-sm text-destructive mt-1">{errors.nome.message}</p>}
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
            {errors.email && <p className="text-sm text-destructive mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <Label htmlFor="telefone" className="font-sans text-foreground mb-1 block">WhatsApp *</Label>
            <Input
              id="telefone"
              placeholder="(11) 99999-9999"
              {...register("telefone")}
              className={`w-full bg-offwhite border border-border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-accent ${
                errors.telefone ? "border-destructive" : ""
              }`}
            />
            {errors.telefone && <p className="text-sm text-destructive mt-1">{errors.telefone.message}</p>}
          </div>
        </div>

        {/* 2. CORREÇÃO DA ESTRUTURA DO CHECKBOX */}
        <FormField
          control={form.control}
          name="consentimentoLGPD"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border bg-accent/20 p-4">
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
                  <a href="#" className="text-primary hover:underline">Política de Privacidade</a> e a LGPD. *
                </FormLabel>
              </div>
            </FormItem>
          )}
        />
        {/* A mensagem de erro agora é tratada pelo FormField */}
        {errors.consentimentoLGPD && (
            <p className="text-sm text-destructive mt-2">{errors.consentimentoLGPD.message}</p>
        )}
      </CardContent>
    </Card>
  );
};
