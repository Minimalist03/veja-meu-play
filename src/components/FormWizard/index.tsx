import { useState, useMemo, useEffect } from "react"; // ← ADICIONAR useEffect
// ... outros imports

interface FormWizardProps {
  problemaPredefinido?: ProblemType; // ← ADICIONAR
}

export const FormWizard = ({ problemaPredefinido }: FormWizardProps) => { // ← MODIFICAR
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

  // ← ADICIONAR este useEffect
  useEffect(() => {
    if (problemaPredefinido) {
      form.setValue("problema", problemaPredefinido);
      // Opcional: já iniciar na etapa flight se vier com problema
      setCurrentStep("flight");
    }
  }, [problemaPredefinido, form]);

  // ... resto do código continua igual
