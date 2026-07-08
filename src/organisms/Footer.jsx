import React from 'react';
import { Text, Heading } from '../atoms';
import { Logo } from '../molecules';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-16 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <Logo size="sm" className="mb-4" />
            <Text size="sm">Lutando por uma Florianópolis mais limpa</Text>
          </div>

          <div>
            <Heading level={5} className="text-white mb-3">Projeto</Heading>
            <ul className="space-y-2 text-sm">
              <li><button id="about-btn" className="hover:text-green-400 transition-colors">Sobre</button></li>
              <li><a href="#" className="hover:text-green-400 transition-colors">Como funciona</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors">Contato</a></li>
            </ul>
          </div>

          <div>
            <Heading level={5} className="text-white mb-3">Comunidade</Heading>
            <Text size="sm" className="mb-3">
              Coordenadores: Lucas Cinigalia e Glauberty Ribeiro
            </Text>
            <Text size="xs" color="light">
              © 2024 LimpAção. Todos os direitos reservados.
            </Text>
          </div>
        </div>
      </div>
    </footer>
  );
}
