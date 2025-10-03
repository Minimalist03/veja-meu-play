import { UseFormReturn } from "react-hook-form";
import { LeadFormData, Airline, ProblemType } from "@/types/lead";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface StepFlightDataProps {
  form: UseFormReturn<LeadFormData>;
}

const airlines: Airline[] = ["Azul", "Latam", "Gol", "Voepass", "American Airlines", "Air France", "Iberia", "TAP"];

const problems: { value: ProblemType; label: string }[] = [
  { value: "cancelamento", label: "Voo Cancelado" },
  { value: "atraso", label: "Atraso de Voo" },
  { value: "bagagem_extraviada", label: "Bagagem Extraviada" },
  { value: "overbooking", label: "Overbooking (Preterição de Embarque)" },
];

export const StepFlightData = ({ form }: StepFlightDataProps) => {
  const { register, formState: { errors }, setValue, watch } = form;

  return (
    <Card className="border-2 shadow-elegant">
      <CardHeader>
        <CardTitle className="text-2xl">Dados do Voo</CardTitle>
        <CardDescription>
          Informe os detalhes do voo que teve problemas.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="problema">Qual foi o problema? *</Label>
          <Select 
            value={watch("problema")} 
            onValueChange={(value) => setValue("problema", value as ProblemType)}
          >
            <SelectTrigger className={errors.problema ? "border-destructive" : ""}>
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

        <div className="space-y-2">
          <Label htmlFor="ciaAerea">Companhia Aérea *</Label>
          <Select 
            value={watch("ciaAerea")} 
            onValueChange={(value) => setValue("ciaAerea", value as Airline)}
          >
            <SelectTrigger className={errors.ciaAerea ? "border-destructive" : ""}>
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="dataVoo">Data do Voo *</Label>
            <Input
              id="dataVoo"
              type="date"
              {...register("dataVoo")}
              max={new Date().toISOString().split('T')[0]}
              className={errors.dataVoo ? "border-destructive" : ""}
            />
            {errors.dataVoo && (
              <p className="text-sm text-destructive">{errors.dataVoo.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="origem">Origem *</Label>
            <Input
              id="origem"
              {...register("origem")}
              placeholder="Ex: São Paulo (GRU)"
              className={errors.origem ? "border-destructive" : ""}
            />
            {errors.origem && (
              <p className="text-sm text-destructive">{errors.origem.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="destino">Destino *</Label>
            <Input
              id="destino"
              {...register("destino")}
              placeholder="Ex: Rio de Janeiro (GIG)"
              className={errors.destino ? "border-destructive" : ""}
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