import { useState, useMemo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LeadFormData, QualificationResult, ProblemType } from "@/types/lead";
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
import { StepFinal } from "./StepFinal";
import { StepResult } from "./StepResult";

type Step = "flight" | "diagnostic" | "personal" | "final" | "result";

interface FormWizardProps {
  problemaPredefinido?: ProblemType;
}

export const FormWizard = ({ problemaPredefinido }: FormWizardProps = {}) => {
  const [currentStep, setCurrentStep] = useState<Step>("flight");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      nome: "",
      email: "",
      telefone: "",
      consentimentoLGPD: false,
      problema: undefined,
      ciaAerea: undefined,
      outraCompanhia: "",
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

  // Pré-selecionar problema quando vier do Hero
  // MAS NÃO muda de etapa - continua na etapa "flight"
  useEffect(() => {
    if (problemaPredefinido) {
      form.setValue("problema", problemaPredefinido);
    }
  }, [problemaPredefinido, form]);

  const formData = form.watch();

  const resultado = useMemo(() => {
    if (!formData.problema || !formData.dataVoo) {
      return { score: 0, qualificado: false, motivo: "", elegibilidadeDetalhes: [] };
    }
    return qualificar(formData);
  }, [formData]);

  const progress = useMemo(() => {
    const steps = { 
      flight: 20,      // Etapa 1 de 5
      diagnostic: 40,  // Etapa 2 de 5
      personal: 60,    // Etapa 3 de 5
      final: 80,       // Etapa 4 de 5
      result: 100      // Etapa 5 de 5
    };
    return steps[currentStep];
  }, [currentStep]);

  const handleNext = async () => {
    let fieldsToValidate: (keyof LeadFormData)[] = [];

    // NOVA ORDEM DE VALIDAÇÕES
    if (currentStep === "flight") {
      fieldsToValidate = ["problema", "ciaAerea", "dataVoo", "origem", "destino"];
      
      // Se selecionou "Outra", validar também outraCompanhia
      if (form.getValues("ciaAerea") === "Outra") {
        fieldsToValidate.push("outraCompanhia");
      }
    } else if (currentStep === "diagnostic") {
      // Não valida campos aqui, apenas avança
      // As validações condicionais do diagnostic são opcionais
    } else if (currentStep === "personal") {
      fieldsToValidate = ["nome", "email", "telefone"];
    } else if (currentStep === "final") {
      // Validar LGPD manualmente
      if (!form.getValues("consentimentoLGPD")) {
        toast({
          title: "Consentimento necessário",
          description: "Por favor, aceite os termos da LGPD para continuar.",
          variant: "destructive",
        });
        return;
      }
    }

    const isValid = currentStep === "diagnostic" || await form.trigger(fieldsToValidate);

    if (isValid) {
      if (currentStep === "flight") setCurrentStep("diagnostic");
      else if (currentStep === "diagnostic") setCurrentStep("personal");
      else if (currentStep === "personal") setCurrentStep("final");
      else if (currentStep === "final") await handleSubmit();
    } else {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
    }
  };

  const handleBack = () => {
    if (currentStep === "diagnostic") setCurrentStep("flight");
    else if (currentStep === "personal") setCurrentStep("diagnostic");
    else if (currentStep === "final") setCurrentStep("personal");
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
                {currentStep === "flight" && "Etapa 1 de 4"}
                {currentStep === "diagnostic" && "Etapa 2 de 4"}
                {currentStep === "personal" && "Etapa 3 de 4"}
                {currentStep === "final" && "Etapa 4 de 4"}
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
          {currentStep === "flight" && <StepFlightData form={form} />}
          {currentStep === "diagnostic" && <StepDiagnostic form={form} />}
          {currentStep === "personal" && <StepPersonalData form={form} />}
          {currentStep === "final" && <StepFinal form={form} data={formData} />}
          {currentStep === "result" && <StepResult data={formData} result={resultado} />}

          {currentStep !== "result" && (
            <div className="flex gap-4 pt-8">
              {currentStep !== "flight" && (
                <Button variant="outline" onClick={handleBack} className="flex-1">
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Voltar
                </Button>
              )}
              <Button onClick={handleNext} disabled={isSubmitting} className="flex-1">
                {currentStep === "final" ? (isSubmitting ? "Processando..." : "Ver Resultado") : "Continuar"}
                {currentStep !== "final" && <ChevronRight className="w-4 h-4 ml-2" />}
              </Button>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
};
