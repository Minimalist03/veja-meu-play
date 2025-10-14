import { UseFormReturn } from "react-hook-form";
import { LeadFormData } from "@/types/lead";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { FormField, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

interface StepPersonalDataProps {
  form: UseFormReturn<LeadFormData>; // Mantemos o 'form' por enquanto para os campos de Input
}

export const StepPersonalData = ({ form }: StepPersonalDataProps) => {
  const { register, formState: { errors } } = form;

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
          {/* Campo Nome */}
          <div className="space-y-1">
            <Label htmlFor="nome" className="font-sans text-foreground">Nome Completo *</Label>
            <Input id="nome" placeholder="Digite seu nome completo" {...register("nome")} />
            <p className="text-sm font-medium text-destructive">{errors.nome?.message}</p>
          </div>

          {/* Campo Email */}
          <div className="space-y-1">
            <Label htmlFor="email" className="font-sans text-foreground">E-mail *</Label>
            <Input id="email" type="email" placeholder="seu@email.com" {...register("email")} />
            <p className="text-sm font-medium text-destructive">{errors.email?.message}</p>
          </div>

          {/* Campo Telefone */}
          <div className="space-y-1">
            <Label htmlFor="telefone" className="font-sans text-foreground">WhatsApp *</Label>
            <Input id="telefone" placeholder="(11) 99999-9999" {...register("telefone")} />
            <p className="text-sm font-medium text-destructive">{errors.telefone?.message}</p>
          </div>
        </div>

        {/* Campo Consentimento (Usando FormField) */}
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
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};
