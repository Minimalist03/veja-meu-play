import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LeadFormData, QualificationResult } from "@/types/lead";
import { leadSchema } from "@/lib/validation";
import { qualificar } from "@/lib/qualification";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ProgressBar";
import { StepPersonalData } from "./StepPersonalData";
import { StepFlightData } from "./StepFlightData";
import { StepDiagnostic } from "./StepDiagnostic";
import { StepResult } from "./StepResult";
import { ChevronLeft, ChevronRight, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Step = 1 | 2 | 3 | 4;

export const FormWizard = () => {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [result, setResult] = useState<QualificationResult | null>(null);
  const { toast } = useToast();

  const form = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      nome: "",
      telefone: "",
      email: "",
      ciaAerea: "",
      problema: "",
      dataVoo: "",
      origem: "",
      destino: "",
      consentimentoLGPD: false,
      novoVooDisponibilizado: false,
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

  // Calcula score em tempo real
  const liveResult = useMemo(() => {
    if (currentStep >= 3 && formData.problema && formData.dataVoo) {
      return qualificar(formData);
    }
    return null;
  }, [formData, currentStep]);

  const progress = (currentStep / 4) * 100;

  const validateStep = async (step: Step): Promise<boolean> => {
    let fieldsToValidate: (keyof LeadFormData)[] = [];

    if (step === 1) {
      fieldsToValidate = ["nome", "telefone", "email", "consentimentoLGPD"];
    } else if (step === 2) {
      fieldsToValidate = ["ciaAerea", "problema", "dataVoo", "origem", "destino"];
    }

    const isValid = await form.trigger(fieldsToValidate);
    return isValid;
  };

  const handleNext = async () => {
    const isValid = await validateStep(currentStep);
    
    if (!isValid) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios antes de continuar.",
        variant: "destructive",
      });
      return;
    }

    if (currentStep < 4) {
      setCurrentStep((prev) => (prev + 1) as Step);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1 && currentStep < 4) {
      setCurrentStep((prev) => (prev - 1) as Step);
    }
  };

  const handleSubmit = form.handleSubmit(async (data) => {
    const finalResult = qualificar(data);
    setResult(finalResult);
    setCurrentStep(4);

    // Aqui você enviaria os dados para o Google Sheets via Apps Script
    // postToSheets({ ...data, ...finalResult, utm: getUTMs() })

    toast({
      title: "Análise concluída!",
      description: finalResult.qualificado 
        ? "Seu caso é elegível. Veja o resultado abaixo." 
        : "Análise finalizada. Veja os detalhes abaixo.",
    });
  });

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-12">
      {currentStep < 4 && (
        <div className="mb-8">
          <ProgressBar value={progress} />
          {liveResult && currentStep === 3 && (
            <div className="mt-4 text-center">
              <p className="text-sm text-muted-foreground">
                Pontuação atual: <strong className="text-primary text-lg">{liveResult.score}</strong>
                {liveResult.qualificado ? (
                  <span className="ml-2 text-primary">✅ Elegível</span>
                ) : (
                  <span className="ml-2 text-muted-foreground">⏳ Em avaliação</span>
                )}
              </p>
            </div>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {currentStep === 1 && <StepPersonalData form={form} />}
        {currentStep === 2 && <StepFlightData form={form} />}
        {currentStep === 3 && <StepDiagnostic form={form} />}
        {currentStep === 4 && result && <StepResult data={formData} result={result} />}

        {currentStep < 4 && (
          <div className="flex justify-between gap-4">
            {currentStep > 1 ? (
              <Button type="button" variant="outline" onClick={handlePrevious} className="w-32">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Voltar
              </Button>
            ) : (
              <div />
            )}

            {currentStep < 3 ? (
              <Button type="button" onClick={handleNext} className="w-32 ml-auto">
                Próximo
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button type="submit" className="w-48 ml-auto bg-primary hover:bg-primary-glow">
                <Send className="mr-2 h-4 w-4" />
                Finalizar Análise
              </Button>
            )}
          </div>
        )}
      </form>
    </div>
  );
};