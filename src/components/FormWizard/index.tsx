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
import { Form } from "@/components/ui/form"; // <-- 1. IMPORTAR O PROVEDOR DE FORMULÁRIO

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
      // ...outros valores padrão
    },
  });

  const formData = form.watch();
  
  const resultado = useMemo(() => qualificar(formData), [formData]);

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
      else if (currentStep === "diagnostic") handleSubmit();
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
    // A lógica de submit permanece a mesma
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* 2. ENVOLVER TODO O FORMULÁRIO COM O PROVEDOR <Form> */}
      <Form {...form}>
        {currentStep !== "result" && (
          <div className="mb-8">
            {/* Barra de progresso... */}
          </div>
        )}

        <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
          {currentStep === "personal" && <StepPersonalData form={form} />}
          {currentStep === "flight" && <StepFlightData form={form} />}
          {currentStep === "diagnostic" && <StepDiagnostic form={form} />}
          {currentStep === "result" && <StepResult data={formData} result={resultado} />}

          {currentStep !== "result" && (
            <div className="flex gap-4">
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
