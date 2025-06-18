#!/usr/bin/env node

import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import path from 'path';

console.log('🔧 Iniciando build estático para Netlify...');

try {
  // Instalar dependências do client
  console.log('📦 Instalando dependências do client...');
  execSync('cd client && npm install', { stdio: 'inherit' });

  // Fazer build do Vite
  console.log('⚡ Executando build do Vite...');
  execSync('cd client && npx vite build', { stdio: 'inherit' });

  console.log('✅ Build concluído com sucesso!');
  console.log('📁 Arquivos gerados em: dist/public');

} catch (error) {
  console.error('❌ Erro durante o build:', error.message);
  process.exit(1);
}