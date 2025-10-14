import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LeadFormData, QualificationResult } from "@/types/lead";
import { leadFormSchema } from "@/lib/validation";
import { qualificar } from "@/lib/qualification";
import { enviarParaSheets } from "@/services/sheets";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Form } from "@/components/ui/form";

import { StepPersonalData } from "./StepPersonalData";
import { StepFlightData } from "./StepFlightData";
import { StepDiagnostic } from "./StepDiagnostic";
import { StepResult } from "./StepResult";

type Step = "personal" | "flight" | "diagnostic" | "result";

export const FormWizard = () => {
  const [currentStep, setCurrentStep] = useState<Step>("personal");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      nome: "",
      email: "",
      telefone: "",
      consentimentoLGPD: false,
      problema: undefined, // Usar undefined para placeholders de Select
      ciaAerea: undefined, // Usar undefined para placeholders de Select
      dataVoo: "",
      origem: "",
      destino: "",
      tempoAtraso: undefined,
      tempoDevolucaoBagagem: undefined,
      perdeuConexao: false,
      perdeuCompromisso: false,
      alimentacaoFornecida: false,
      hotelFornecido: false,
      transporteFornecido: false,
      itensEssenciais: false,
      precisouComprar: false,
      despesasExtras: false,
    },
  });

  const formData = form.watch();

  const resultado = useMemo(() => {
    if (!formData.problema || !formData.dataVoo) {
      return { score: 0, qualificado: false, motivo: "", elegibilidadeDetalhes: [] };
    }
    return qualificar(formData);
  }, [formData]);

  const progress = useMemo(() => {
    const steps = { personal: 25, flight: 50, diagnostic: 75, result: 100 };
    return steps[currentStep];
  }, [currentStep]);

  const handleNext = async () => {
    let fieldsToValidate: (keyof LeadFormData)[] = [];

    if (currentStep === "personal") {
      fieldsToValidate = ["nome", "email", "telefone", "consentimentoLGPD"];
    } else if (currentStep === "flight") {
      fieldsToValidate = ["problema", "ciaAerea", "dataVoo", "origem", "destino"];
    }

    const isValid = await form.trigger(fieldsToValidate);

    if (isValid) {
      if (currentStep === "personal") setCurrentStep("flight");
      else if (currentStep === "flight") setCurrentStep("diagnostic");
      else if (currentStep === "diagnostic") await handleSubmit();
    } else {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
    }
  };

  const handleBack = () => {
    if (currentStep === "flight") setCurrentStep("personal");
    else if (currentStep === "diagnostic") setCurrentStep("flight");
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const finalResult = qualificar(form.getValues());
      const sheetsSent = await enviarParaSheets(form.getValues(), finalResult);

      if (!sheetsSent) {
        console.warn("Falha ao enviar para Google Sheets, mas continuando...");
      }
      
      setCurrentStep("result");

      toast({
        title: "Análise concluída!",
        description: finalResult.qualificado 
          ? "Seu caso parece elegível. Veja os detalhes abaixo."
          : "Análise completa. Veja o resultado abaixo.",
      });
    } catch (error) {
      console.error("Erro ao processar:", error);
      toast({
        title: "Erro ao processar",
        description: "Tente novamente ou entre em contato conosco.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Form {...form}>
        {currentStep !== "result" && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium text-muted-foreground">
                {currentStep === "personal" && "Etapa 1 de 3"}
                {currentStep === "flight" && "Etapa 2 de 3"}
                {currentStep === "diagnostic" && "Etapa 3 de 3"}
              </span>
              {currentStep === "diagnostic" && formData.problema && (
                <Badge variant={resultado.qualificado ? "default" : "secondary"} className="text-sm">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  {resultado.score} pontos
                </Badge>
              )}
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
          {currentStep === "personal" && <StepPersonalData form={form} />}
          {currentStep === "flight" && <StepFlightData form={form} />}
          {currentStep === "diagnostic" && <StepDiagnostic form={form} />}
          {currentStep === "result" && <StepResult data={formData} result={resultado} />}

          {currentStep !== "result" && (
            <div className="flex gap-4 pt-8">
              {currentStep !== "personal" && (
                <Button variant="outline" onClick={handleBack} className="flex-1">
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Voltar
                </Button>
              )}
              <Button onClick={handleNext} disabled={isSubmitting} className="flex-1">
                {currentStep === "diagnostic" ? (isSubmitting ? "Processando..." : "Ver Resultado") : "Continuar"}
                {currentStep !== "diagnostic" && <ChevronRight className="w-4 h-4 ml-2" />}
              </Button>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
};
