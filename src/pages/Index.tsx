import { useRef } from "react";
import { Hero } from "@/components/Hero";
import { FormWizard } from "@/components/FormWizard";

const Index = () => {
  const formRef = useRef<HTMLDivElement>(null);

  const handleStartClick = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Hero onStartClick={handleStartClick} />
      
      <div ref={formRef} id="formulario" className="bg-gradient-to-b from-background to-accent/20">
        <FormWizard />
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
