import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plane, Scale, CheckCircle2, Award, TrendingUp, Clock } from "lucide-react";

interface HeroProps {
  onStartClick: () => void;
}

export const Hero = ({ onStartClick }: HeroProps) => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary-glow to-primary px-4 py-16 md:py-20">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, white 2%, transparent 0%), 
                           radial-gradient(circle at 75px 75px, white 2%, transparent 0%)`,
          backgroundSize: '100px 100px'
        }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <div className="text-center mb-12 md:mb-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 md:px-6 py-2 mb-6 md:mb-8 animate-fade-in">
            <CheckCircle2 className="h-4 w-4 text-secondary flex-shrink-0" />
            <span className="text-xs md:text-sm font-medium text-white">+1.247 passageiros atendidos • 4.9/5 no Google</span>
          </div>

          {/* Headline - Ajustado para mobile */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 md:mb-6 leading-tight px-2">
            Seu Voo Atrasou,<br />
            Foi Cancelado ou<br />
            <span className="text-secondary">Sua Bagagem Extraviou?</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-3 md:mb-4 max-w-3xl mx-auto px-4">
            Você pode ter direito a uma indenização de <strong className="text-secondary whitespace-nowrap">R$ 3.000 a R$ 10.000</strong>
          </p>

          <p className="text-base md:text-lg text-white/80 mb-8 md:mb-12 max-w-2xl mx-auto px-4">
            Descubra em 60 segundos se seu caso é elegível. Responda nosso diagnóstico rápido e gratuito.
          </p>

          {/* CTA Button */}
          <Button 
            size="lg" 
            onClick={onStartClick}
            className="bg-secondary text-primary hover:bg-secondary/90 text-base md:text-lg px-8 md:px-12 py-6 md:py-7 rounded-full font-bold shadow-2xl hover:shadow-secondary/50 transition-all duration-300 hover:scale-105 w-full sm:w-auto"
          >
            <Scale className="mr-2 h-5 w-5 md:h-6 md:w-6 flex-shrink-0" />
            <span className="whitespace-normal sm:whitespace-nowrap">Verificar Meu Caso Gratuitamente</span>
          </Button>

          {/* Trust badges */}
          <div className="mt-6 md:mt-8 flex flex-wrap items-center justify-center gap-4 md:gap-6 text-white/80 text-xs md:text-sm px-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-secondary flex-shrink-0" />
              <span>Sem custos iniciais</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-secondary flex-shrink-0" />
              <span>Só paga se ganhar</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-secondary flex-shrink-0" />
              <span>100% online e seguro</span>
            </div>
          </div>
        </div>

        {/* Stats Cards - Responsivo */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12 px-4">
          <Card className="bg-white/10 backdrop-blur-md border-white/20 p-4 md:p-6 hover:bg-white/15 transition-all">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="p-2 md:p-3 bg-secondary/20 rounded-xl flex-shrink-0">
                <TrendingUp className="h-6 w-6 md:h-8 md:w-8 text-secondary" />
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-white">95%</p>
                <p className="text-xs md:text-sm text-white/70">Taxa de sucesso</p>
              </div>
            </div>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20 p-4 md:p-6 hover:bg-white/15 transition-all">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="p-2 md:p-3 bg-secondary/20 rounded-xl flex-shrink-0">
                <Clock className="h-6 w-6 md:h-8 md:w-8 text-secondary" />
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-white">45 dias</p>
                <p className="text-xs md:text-sm text-white/70">Tempo médio</p>
              </div>
            </div>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20 p-4 md:p-6 hover:bg-white/15 transition-all">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="p-2 md:p-3 bg-secondary/20 rounded-xl flex-shrink-0">
                <Award className="h-6 w-6 md:h-8 md:w-8 text-secondary" />
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-white">R$ 6.200</p>
                <p className="text-xs md:text-sm text-white/70">Indenização média</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Tipos de casos atendidos - Grid responsivo */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 px-4">
          {[
            { icon: "✈️", title: "Voo Cancelado", desc: "Sem aviso prévio" },
            { icon: "⏰", title: "Atraso +4h", desc: "Chegada atrasada" },
            { icon: "🧳", title: "Bagagem", desc: "Extraviada ou danificada" },
            { icon: "🚫", title: "Overbooking", desc: "Não pôde embarcar" }
          ].map((item, i) => (
            <Card 
              key={i}
              className="bg-white/5 backdrop-blur-sm border-white/10 p-3 md:p-4 text-center hover:bg-white/10 hover:border-secondary/50 transition-all group"
            >
              <div className="text-3xl md:text-4xl mb-2 group-hover:scale-110 transition-transform">{item.icon}</div>
              <h3 className="text-white font-semibold text-sm md:text-base mb-1">{item.title}</h3>
              <p className="text-white/60 text-xs md:text-sm">{item.desc}</p>
            </Card>
          ))}
        </div>

        {/* Social Proof final */}
        <div className="mt-8 md:mt-12 flex flex-wrap items-center justify-center gap-4 md:gap-8 text-white/70 text-xs md:text-sm px-4">
          <div className="flex items-center gap-2">
            <Plane className="h-4 w-4 md:h-5 md:w-5 text-secondary flex-shrink-0" />
            <span>Especialistas em Direito Aeronáutico</span>
          </div>
          <div className="flex items-center gap-2">
            <Scale className="h-4 w-4 md:h-5 md:w-5 text-secondary flex-shrink-0" />
            <span>OAB/SP 123.456</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-secondary flex-shrink-0" />
            <span>Conformidade LGPD</span>
          </div>
        </div>
      </div>
    </section>
  );
};
