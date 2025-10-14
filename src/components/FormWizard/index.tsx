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
      telefone: "", // CORRIGIDO
      consentimentoLGPD: false, // CORRIGIDO
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
      fieldsToValidate = ["nome", "email", "telefone", "consentimentoLGPD"]; // CORRIGIDO
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

  // ... (o resto do arquivo permanece o mesmo)
};
