import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plane, Scale, CheckCircle2, Award, TrendingUp, Clock } from "lucide-react";

interface HeroProps {
  onStartClick: () => void;
}

export const Hero = ({ onStartClick }: HeroProps) => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-background px-4 py-16 md:py-20">
      {/* Background overlay - gradiente suave */}
      <div className="absolute inset-0 bg-gradient-to-br from-beige-light/20 via-background to-beige-medium/10" />

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <div className="text-center mb-12 md:mb-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-surface backdrop-blur-sm border border-beige-medium rounded-full px-4 md:px-6 py-2 mb-6 md:mb-8 animate-fade-in shadow-sm">
            <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0" />
            <span className="text-xs md:text-sm font-medium text-text-secondary">+1.247 passageiros atendidos • 4.9/5 no Google</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-text-primary mb-4 md:mb-6 leading-tight px-2 font-heading">
            Seu Voo Atrasou,<br />
            Foi Cancelado ou<br />
            <span className="text-primary">Sua Bagagem Extraviou?</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl md:text-2xl text-text-secondary mb-3 md:mb-4 max-w-3xl mx-auto px-4">
            Você pode ter direito a uma indenização de <strong className="text-primary whitespace-nowrap">R$ 3.000 a R$ 10.000</strong>
          </p>

          <p className="text-base md:text-lg text-text-muted mb-8 md:mb-12 max-w-2xl mx-auto px-4">
            Descubra em 60 segundos se seu caso é elegível. Responda nosso diagnóstico rápido e gratuito.
          </p>

          {/* CTA Button */}
          <Button
            size="lg"
            onClick={onStartClick}
            className="mx-auto block bg-primary text-primary-foreground hover:bg-primary-hover text-base md:text-lg px-8 md:px-12 py-6 md:py-7 rounded-full font-bold shadow-glow transition-all duration-300 hover:scale-105 hover:shadow-lg w-full sm:w-auto"
          >
            <Scale className="mr-2 h-5 w-5 md:h-6 md:w-6 flex-shrink-0" />
            <span className="whitespace-normal sm:whitespace-nowrap">Verificar Meu Caso Gratuitamente</span>
          </Button>

          {/* Trust badges */}
          <div className="mt-6 md:mt-8 flex flex-wrap items-center justify-center gap-4 md:gap-6 text-text-muted text-xs md:text-sm px-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-success flex-shrink-0" />
              <span>Sem custos iniciais</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-success flex-shrink-0" />
              <span>Só paga se ganhar</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-success flex-shrink-0" />
              <span>100% online e seguro</span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12 px-4">
          {[
            { icon: <TrendingUp className="h-6 w-6 md:h-8 md:w-8 text-primary" />, value: "95%", label: "Taxa de sucesso" },
            { icon: <Clock className="h-6 w-6 md:h-8 md:w-8 text-info" />, value: "45 dias", label: "Tempo médio" },
            { icon: <Award className="h-6 w-6 md:h-8 md:w-8 text-warning" />, value: "R$ 6.200", label: "Indenização média" },
          ].map((item, i) => (
            <Card
              key={i}
              className="bg-surface backdrop-blur-sm border border-beige-light p-4 md:p-6 hover:bg-surface-elevated hover:border-primary/40 hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center gap-3 md:gap-4">
                <div className="p-2 md:p-3 bg-accent/40 rounded-xl flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <p className="text-2xl md:text-3xl font-bold text-text-primary font-heading">{item.value}</p>
                  <p className="text-xs md:text-sm text-text-secondary">{item.label}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Case types */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 px-4">
          {[
            { icon: "✈️", title: "Voo Cancelado", desc: "Sem aviso prévio" },
            { icon: "⏰", title: "Atraso +4h", desc: "Chegada atrasada" },
            { icon: "🧳", title: "Bagagem", desc: "Extraviada ou danificada" },
            { icon: "🚫", title: "Overbooking", desc: "Não pôde embarcar" },
          ].map((item, i) => (
            <Card
              key={i}
              className="bg-surface backdrop-blur-sm border border-beige-light p-3 md:p-4 text-center hover:bg-surface-elevated hover:border-primary/50 hover:shadow-md transition-all duration-300 group cursor-pointer"
            >
              <div className="text-3xl md:text-4xl mb-2 group-hover:scale-110 transition-transform">{item.icon}</div>
              <h3 className="font-semibold text-sm md:text-base mb-1 text-text-primary">{item.title}</h3>
              <p className="text-xs md:text-sm text-text-muted">{item.desc}</p>
            </Card>
          ))}
        </div>

        {/* Social Proof */}
        <div className="mt-8 md:mt-12 flex flex-wrap items-center justify-center gap-4 md:gap-8 text-text-muted text-xs md:text-sm px-4">
          <div className="flex items-center gap-2">
            <Plane className="h-4 w-4 md:h-5 md:w-5 text-primary" />
            <span>Especialistas em Direito Aeronáutico</span>
          </div>
          <div className="flex items-center gap-2">
            <Scale className="h-4 w-4 md:h-5 md:w-5 text-primary" />
            <span>OAB/SP 123.456</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-success" />
            <span>Conformidade LGPD</span>
          </div>
        </div>
      </div>
    </section>
  );
};
