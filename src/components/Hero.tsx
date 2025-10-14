import { ArrowRight, CheckCircle2, Zap } from 'lucide-react';
import { useState } from 'react';

export default function HeroSection() {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 via-white to-amber-50 overflow-hidden relative">
      {/* Animated Background Blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute -bottom-32 left-20 w-80 h-80 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '4s' }}></div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
        
        {/* Trust Badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-teal-200 bg-white/60 backdrop-blur-sm shadow-sm hover:shadow-md transition-all">
            <CheckCircle2 className="w-4 h-4 text-teal-600" />
            <span className="text-sm font-semibold text-teal-700">
              +1.247 passageiros atendidos • 4.9/5 ⭐
            </span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center space-y-6 mb-12">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 leading-tight">
            Seu Voo Atrasou,
            <br />
            Foi Cancelado ou
            <br />
            <span className="bg-gradient-to-r from-teal-600 to-amber-500 bg-clip-text text-transparent">
              Sua Bagagem Extraviou?
            </span>
          </h1>

          <p className="text-xl sm:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-light">
            Você pode ter direito a uma indenização de
            <br />
            <span className="font-bold text-2xl sm:text-3xl text-amber-600">
              R$ 3.000 a R$ 10.000
            </span>
          </p>

          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Descubra em 60 segundos se seu caso é elegível. Diagnóstico rápido e gratuito.
          </p>
        </div>

        {/* Primary CTA Button - Enhanced */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className="group relative px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-teal-600 to-teal-500 text-white font-bold text-lg rounded-xl overflow-hidden shadow-2xl hover:shadow-[0_20px_60px_rgba(13,148,136,0.4)] transition-all duration-300 hover:-translate-y-1 active:translate-y-0"
          >
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 group-hover:translate-x-full transition-all duration-700" style={{ transform: isHovering ? 'translateX(100%)' : 'translateX(-100%)' }}></div>

            {/* Content */}
            <div className="relative flex items-center gap-3 justify-center">
              <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              <span>Verificar Direitos Agora</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </div>

            {/* Bottom accent */}
            <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transition-opacity"></div>
          </button>

          {/* Secondary CTA */}
          <button className="px-6 sm:px-8 py-4 sm:py-5 border-2 border-teal-300 text-teal-700 font-bold text-lg rounded-xl hover:bg-teal-50 transition-all duration-300 hover:border-teal-400">
            Saiba Mais
          </button>
        </div>

        {/* Trust Signals */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="backdrop-blur-sm bg-white/70 border border-white/80 rounded-xl p-5 text-center hover:shadow-lg hover:-translate-y-1 transition-all">
            <div className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent mb-2">
              0%
            </div>
            <p className="text-sm font-semibold text-slate-700">Sem Custos Iniciais</p>
          </div>

          <div className="backdrop-blur-sm bg-white/70 border border-white/80 rounded-xl p-5 text-center hover:shadow-lg hover:-translate-y-1 transition-all">
            <div className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-2">
              R$ 42M+
            </div>
            <p className="text-sm font-semibold text-slate-700">Recuperados para Clientes</p>
          </div>

          <div className="backdrop-blur-sm bg-white/70 border border-white/80 rounded-xl p-5 text-center hover:shadow-lg hover:-translate-y-1 transition-all">
            <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
              60s
            </div>
            <p className="text-sm font-semibold text-slate-700">Análise Rápida e Gratuita</p>
          </div>
        </div>

        {/* Security Badge */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm font-semibold text-slate-600">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            <span>100% Online e Seguro</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            <span>Sem Risco de Perda</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            <span>Atendimento Especializado</span>
          </div>
        </div>
      </div>
    </div>
  );
}
