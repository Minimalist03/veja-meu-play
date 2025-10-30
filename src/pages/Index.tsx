import { useRef, useState } from "react";
import { Hero } from "@/components/Hero";
import { FormWizard } from "@/components/FormWizard";
import { ProblemType } from "@/types/lead"; // ← ADICIONAR

const Index = () => {
  const formRef = useRef<HTMLDivElement>(null);
  const [problemaSelecionado, setProblemaSelecionado] = useState<ProblemType | undefined>(undefined); // ← ADICIONAR

  const handleStartClick = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // ← ADICIONAR esta função
  const handleProblemClick = (problema: ProblemType) => {
    setProblemaSelecionado(problema);
    // Pequeno delay para garantir que o estado foi atualizado
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-background">
      <Hero 
        onStartClick={handleStartClick} 
        onProblemClick={handleProblemClick} // ← ADICIONAR
      />
      
      <div ref={formRef} id="formulario" className="bg-gradient-to-b from-background to-accent/20">
        <FormWizard problemaPredefinido={problemaSelecionado} /> {/* ← MODIFICAR */}
      </div>

      <footer className="border-t py-8 px-4 text-center text-sm text-muted-foreground">
        <p>© 2025 Direito do Passageiro. Todos os direitos reservados.</p>
        <p className="mt-2">
          <a href="#" className="text-primary hover:underline">Política de Privacidade</a>
          {" • "}
          <a href="#" className="text-primary hover:underline">Termos de Uso</a>
        </p>
      </footer>
    </div>
  );
};

export default Index;
