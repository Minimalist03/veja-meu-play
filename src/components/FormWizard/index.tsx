import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LeadFormData, QualificationResult } from "@/types/lead";
import { leadFormSchema } from "@/lib/validation"; // CORRIGIDO: usar arquivo existente
import { qualificar } from "@/lib/qualification";
import { enviarParaSheets } from "@/services/sheets";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
      problema: "",
      ciaAerea: "",
      dataVoo: "",
      origem: "",
      destino: "",
      tempoAtraso: "",
      tempoDevolucaoBagagem: "",
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
  
  // Calcula resultado em tempo real
  const resultado = useMemo(() => {
    if (!formData.problema || !formData.dataVoo) {
      return { score: 0, qualificado: false, motivo: "", elegibilidadeDetalhes: [] };
    }
    return qualificar(formData);
  }, [formData]);

  // Calcula progresso
  const progress = useMemo(() => {
    const steps = { personal: 25, flight: 50, diagnostic: 75, result: 100 };
    return steps[currentStep];
  }, [currentStep]);

  // Navegação entre steps
  const handleNext = async () => {
    let fieldsToValidate: (keyof LeadFormData)[] = [];

    if (currentStep === "personal") {
      fieldsToValidate = ["nome", "email", "telefone", "consentimentoLGPD"];
    } else if (currentStep === "flight") {
      fieldsToValidate = ["problema", "ciaAerea", "dataVoo", "origem", "destino"];
    }

    const isValid = await form.trigger(fieldsToValidate);

    if (isValid) {
      if (currentStep === "personal") {
        setCurrentStep("flight");
      } else if (currentStep === "flight") {
        setCurrentStep("diagnostic");
      } else if (currentStep === "diagnostic") {
        handleSubmit();
      }
    } else {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios",
        variant: "destructive",
      });
    }
  };

  const handleBack = () => {
    if (currentStep === "flight") {
      setCurrentStep("personal");
    } else if (currentStep === "diagnostic") {
      setCurrentStep("flight");
    } else if (currentStep === "result") {
      setCurrentStep("diagnostic");
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // Envia para Google Sheets
      const sheetsSent = await enviarParaSheets(formData, resultado);

      if (!sheetsSent) {
        console.warn("Falha ao enviar para Google Sheets, mas continuando...");
      }

      // Mostra resultado
      setCurrentStep("result");

      toast({
        title: "Análise concluída!",
        description: resultado.qualificado 
          ? "Seu caso parece elegível. Veja os detalhes abaixo."
          : "Análise completa. Veja o resultado abaixo.",
      });

    } catch (error) {
      console.error("Erro ao processar:", error);
      toast({
        title: "Erro ao processar",
        description: "Tente novamente ou entre em contato conosco",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Progress Bar */}
      {currentStep !== "result" && (
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-muted-foreground">
              {currentStep === "personal" && "Etapa 1 de 3"}
              {currentStep === "flight" && "Etapa 2 de 3"}
              {currentStep === "diagnostic" && "Etapa 3 de 3"}
            </span>
            
            {/* Score Preview (apenas no diagnóstico) */}
            {currentStep === "diagnostic" && formData.problema && (
              <Badge 
                variant={resultado.qualificado ? "default" : "secondary"}
                className="text-sm"
              >
                <TrendingUp className="w-4 h-4 mr-1" />
                {resultado.score} pontos
              </Badge>
            )}
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      )}

      {/* Steps */}
      <div className="mb-8">
        {currentStep === "personal" && <StepPersonalData form={form} />}
        {currentStep === "flight" && <StepFlightData form={form} />}
        {currentStep === "diagnostic" && <StepDiagnostic form={form} />}
        {currentStep === "result" && <StepResult data={formData} result={resultado} />}
      </div>

      {/* Navigation Buttons */}
      {currentStep !== "result" && (
        <div className="flex gap-4">
          {currentStep !== "personal" && (
            <Button
              variant="outline"
              onClick={handleBack}
              className="flex-1"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
          )}
          
          <Button
            onClick={handleNext}
            disabled={isSubmitting}
            className="flex-1"
          >
            {currentStep === "diagnostic" 
              ? (isSubmitting ? "Processando..." : "Ver Resultado")
              : "Continuar"
            }
            {currentStep !== "diagnostic" && <ChevronRight className="w-4 h-4 ml-2" />}
          </Button>
        </div>
      )}

      {/* Score Indicator (Diagnostic Step) */}
      {currentStep === "diagnostic" && formData.problema && (
        <div className="mt-6 p-4 rounded-lg bg-accent border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Score atual: <strong>{resultado.score} pontos</strong></p>
              <p className="text-xs text-muted-foreground mt-1">
                {resultado.qualificado 
                  ? "✅ Seu caso parece elegível"
                  : "Continue respondendo para aumentar a pontuação"
                }
              </p>
            </div>
            {resultado.valorEstimado && resultado.qualificado && (
              <div className="text-right">
                <p className="text-sm font-semibold text-primary">{resultado.valorEstimado}</p>
                <p className="text-xs text-muted-foreground">Estimativa</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
