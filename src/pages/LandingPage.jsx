import React from 'react';
import { Button } from '../atoms';

export function LandingPage() {
  const images = [
    // Mutirão / coleta de lixo - Busca orientada no Unsplash
    'https://source.unsplash.com/1400x900/?trash,cleanup,volunteers',
    'https://source.unsplash.com/1400x900/?beach,cleanup,trash',
    'https://source.unsplash.com/1400x900/?community,cleanup,volunteers',
    'https://source.unsplash.com/1400x900/?recycling,cleanup'
  ];

  const placeholders = [
    `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='1400' height='900'><rect width='100%' height='100%' fill='%23ecfdf5'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='36' fill='%23206a3b'>Mutirão de Limpeza</text></svg>`)}`,
    `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='1400' height='900'><rect width='100%' height='100%' fill='%23f0f9ff'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='36' fill='%23004561'>Coleta na Praia</text></svg>`)}`,
    `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='1400' height='900'><rect width='100%' height='100%' fill='%23fff7ed'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='36' fill='%233a2700'>Voluntários</text></svg>`)}`,
    `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='1400' height='900'><rect width='100%' height='100%' fill='%23f0fdf4'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='36' fill='%230f5132'>Reciclagem Comunitária</text></svg>`)}`,
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
              Juntos por uma Florianópolis mais limpa
            </h1>
            <p className="text-lg text-slate-600 mb-6">
              Conheça os projetos e ações que fazemos para recolher resíduos, conscientizar a população e revitalizar nossas praias e áreas verdes.
            </p>
            <div className="flex gap-4">
              <Button variant="primary" size="lg">Participe de um mutirão</Button>
              <Button variant="secondary" size="lg">Saiba mais</Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {images.map((src, idx) => (
              <div key={src} className="overflow-hidden rounded-2xl shadow-lg">
                <img
                  loading="lazy"
                  src={src}
                  alt={`Projeto ${idx + 1}`}
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = placeholders[idx]; }}
                  className="w-full h-48 object-cover transform hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Nossos projetos recentes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <article className="glass-panel p-5">
              <h3 className="font-semibold text-lg mb-2">Mutirão Praia Limpa</h3>
              <p className="text-sm text-slate-600">Reunimos voluntários para a limpeza de praias e coleta seletiva de resíduos.</p>
            </article>

            <article className="glass-panel p-5">
              <h3 className="font-semibold text-lg mb-2">Educação Ambiental</h3>
              <p className="text-sm text-slate-600">Ações educativas em escolas e comunidades sobre descarte correto.</p>
            </article>

            <article className="glass-panel p-5">
              <h3 className="font-semibold text-lg mb-2">Reciclagem Comunitária</h3>
              <p className="text-sm text-slate-600">Parcerias com cooperativas locais para destinação dos materiais coletados.</p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LandingPage;
