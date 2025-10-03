import { Button } from "@/components/ui/button";
import { Plane, Scale, CheckCircle2 } from "lucide-react";

interface HeroProps {
  onStartClick: () => void;
}

export const Hero = ({ onStartClick }: HeroProps) => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary-glow to-primary px-4 py-20">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, white 2%, transparent 0%), 
                           radial-gradient(circle at 75px 75px, white 2%, transparent 0%)`,
          backgroundSize: '100px 100px'
        }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-2 mb-8 animate-fade-in">
          <CheckCircle2 className="h-4 w-4 text-secondary" />
          <span className="text-sm font-medium text-white">+1.200 passageiros atendidos • 4.9/5 no Google</span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Seu Voo Atrasou,<br />
          Foi Cancelado ou<br />
          <span className="text-secondary">Sua Bagagem Extraviou?</span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-white/90 mb-4 max-w-3xl mx-auto">
          Você pode ter direito a uma indenização de <strong className="text-secondary">R$ 3.000 a R$ 10.000</strong>
        </p>

        <p className="text-lg text-white/80 mb-12 max-w-2xl mx-auto">
          Descubra em 60 segundos se seu caso é elegível. Responda nosso diagnóstico rápido e gratuito.
        </p>

        {/* CTA Button */}
        <Button 
          size="lg" 
          onClick={onStartClick}
          className="bg-secondary text-primary hover:bg-secondary/90 text-lg px-12 py-7 rounded-full font-bold shadow-2xl hover:shadow-secondary/50 transition-all duration-300 hover:scale-105"
        >
          <Scale className="mr-2 h-6 w-6" />
          Verificar Meu Caso Gratuitamente
        </Button>

        {/* Social Proof */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-white/70 text-sm">
          <div className="flex items-center gap-2">
            <Plane className="h-5 w-5 text-secondary" />
            <span>Especialistas em Direito Aeronáutico</span>
          </div>
          <div className="flex items-center gap-2">
            <Scale className="h-5 w-5 text-secondary" />
            <span>OAB Regularizada</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-secondary" />
            <span>100% Online e Seguro</span>
          </div>
        </div>
      </div>
    </section>
  );
};