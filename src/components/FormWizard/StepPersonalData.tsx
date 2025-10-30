import { UseFormReturn } from "react-hook-form";
import { LeadFormData } from "@/types/lead";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface StepPersonalDataProps {
  form: UseFormReturn<LeadFormData>;
}

export const StepPersonalData = ({ form }: StepPersonalDataProps) => {
  const { register, formState: { errors } } = form;

  return (
    <Card className="bg-surface shadow-lg rounded-lg p-8">
      <CardHeader>
        <CardTitle className="font-serif text-2xl text-foreground mb-1">Dados Pessoais</CardTitle>
        <CardDescription className="font-sans text-base text-muted-foreground">
          Ótimo! Agora precisamos de seus dados para continuar com a análise.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="nome" className="font-sans text-foreground">Nome Completo *</Label>
            <Input id="nome" placeholder="Digite seu nome completo" {...register("nome")} />
            {errors.nome && <p className="text-sm font-medium text-destructive pt-1">{errors.nome.message}</p>}
          </div>

          <div className="space-y-1">
            <Label htmlFor="email" className="font-sans text-foreground">E-mail *</Label>
            <Input id="email" type="email" placeholder="seu@email.com" {...register("email")} />
            {errors.email && <p className="text-sm font-medium text-destructive pt-1">{errors.email.message}</p>}
          </div>

          <div className="space-y-1">
            <Label htmlFor="telefone" className="font-sans text-foreground">WhatsApp *</Label>
            <Input id="telefone" placeholder="(11) 99999-9999" {...register("telefone")} />
            {errors.telefone && <p className="text-sm font-medium text-destructive pt-1">{errors.telefone.message}</p>}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
