import { UseFormReturn } from "react-hook-form";
import { LeadFormData, Airline, ProblemType } from "@/types/lead";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface StepFlightDataProps {
  form: UseFormReturn<LeadFormData>;
}

const airlines: Airline[] = [
  "Azul",
  "Latam",
  "Gol",
  "Voepass",
  "American Airlines",
  "Air France",
  "Iberia",
  "TAP",
  "Outra", // ← JÁ ADICIONADO
];

const problems: { value: ProblemType; label: string }[] = [
  { value: "cancelamento", label: "Voo Cancelado" },
  { value: "atraso", label: "Atraso de Voo (>4h)" },
  { value: "bagagem_extraviada", label: "Bagagem Extraviada" },
  { value: "overbooking", label: "Overbooking" },
];

export const StepFlightData = ({ form }: StepFlightDataProps) => {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = form;

  return (
    <Card className="bg-surface shadow-lg rounded-lg p-6">
      <CardHeader>
        <CardTitle className="font-serif text-2xl text-foreground mb-1">
          Dados do Voo
        </CardTitle>
        <CardDescription className="font-sans text-base text-muted-foreground">
          Informe os detalhes do voo que teve problemas.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Problema */}
        <div className="space-y-2">
          <Label htmlFor="problema" className="font-sans text-foreground">
            Qual foi o problema? *
          </Label>
          <Select
            value={watch("problema")}
            onValueChange={(value) => setValue("problema", value as ProblemType)}
          >
            <SelectTrigger
              className={`w-full bg-offwhite border border-border px-3 py-2 rounded-md focus:ring-2 focus:ring-accent ${
                errors.problema ? "border-destructive" : ""
              }`}
            >
              <SelectValue placeholder="Selecione o tipo de problema" />
            </SelectTrigger>
            <SelectContent>
              {problems.map((problem) => (
                <SelectItem key={problem.value} value={problem.value}>
                  {problem.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.problema && (
            <p className="text-sm text-destructive">{errors.problema.message}</p>
          )}
        </div>

        {/* Companhia */}
        <div className="space-y-2">
          <Label htmlFor="ciaAerea" className="font-sans text-foreground">
            Companhia Aérea *
          </Label>
          <Select
            value={watch("ciaAerea")}
            onValueChange={(value) => setValue("ciaAerea", value as Airline)}
          >
            <SelectTrigger
              className={`w-full bg-offwhite border border-border px-3 py-2 rounded-md focus:ring-2 focus:ring-accent ${
                errors.ciaAerea ? "border-destructive" : ""
              }`}
            >
              <SelectValue placeholder="Selecione a companhia aérea" />
            </SelectTrigger>
            <SelectContent>
              {airlines.map((airline) => (
                <SelectItem key={airline} value={airline}>
                  {airline}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.ciaAerea && (
            <p className="text-sm text-destructive">{errors.ciaAerea.message}</p>
          )}
          
          {/* Campo condicional para "Outra" companhia ← ADICIONADO */}
          {watch("ciaAerea") === "Outra" && (
            <div className="space-y-2 animate-in fade-in-50 slide-in-from-top-2 duration-300">
              <Input
                id="outraCompanhia"
                {...register("outraCompanhia")}
                placeholder="Digite o nome da companhia aérea"
                autoFocus
                className={`w-full bg-offwhite border border-border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-accent ${
                  errors.outraCompanhia ? "border-destructive" : ""
                }`}
              />
              <p className="text-xs text-muted-foreground">Ex: Emirates, Qatar Airways, etc.</p>
              {errors.outraCompanhia && (
                <p className="text-sm text-destructive">{errors.outraCompanhia.message}</p>
              )}
            </div>
          )}
        </div>

        {/* Datas e locais */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="dataVoo" className="font-sans text-foreground">
              Data do Voo *
            </Label>
            <Input
              id="dataVoo"
              type="date"
              {...register("dataVoo")}
              max={new Date().toISOString().split("T")[0]}
              className={`w-full bg-offwhite border border-border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-accent ${
                errors.dataVoo ? "border-destructive" : ""
              }`}
            />
            {errors.dataVoo && (
              <p className="text-sm text-destructive">{errors.dataVoo.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="origem" className="font-sans text-foreground">
              Origem *
            </Label>
            <Input
              id="origem"
              {...register("origem")}
              placeholder="Ex: São Paulo (GRU)"
              className={`w-full bg-offwhite border border-border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-accent ${
                errors.origem ? "border-destructive" : ""
              }`}
            />
            {errors.origem && (
              <p className="text-sm text-destructive">{errors.origem.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="destino" className="font-sans text-foreground">
              Destino *
            </Label>
            <Input
              id="destino"
              {...register("destino")}
              placeholder="Ex: Rio de Janeiro (GIG)"
              className={`w-full bg-offwhite border border-border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-accent ${
                errors.destino ? "border-destructive" : ""
              }`}
            />
            {errors.destino && (
              <p className="text-sm text-destructive">{errors.destino.message}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
