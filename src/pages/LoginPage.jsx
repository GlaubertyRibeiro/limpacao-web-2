import React, { useState } from 'react';
import { Button, Input, Heading } from '../atoms';
import { Logo } from '../molecules';

export function LoginPage({ onLogin }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateLogin = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = 'Email é obrigatório';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email inválido';
    if (!formData.password) newErrors.password = 'Senha é obrigatória';
    return newErrors;
  };

  const validateRegister = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Nome é obrigatório';
    if (!formData.email.trim()) newErrors.email = 'Email é obrigatório';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email inválido';
    if (!formData.password) newErrors.password = 'Senha é obrigatória';
    else if (formData.password.length < 6) newErrors.password = 'Senha deve ter pelo menos 6 caracteres';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'As senhas não coincidem';
    return newErrors;
  };

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
    if (errors[key]) setErrors({ ...errors, [key]: '' });
  };

  const handleSubmit = async () => {
    const newErrors = isRegistering ? validateRegister() : validateLogin();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    const API = import.meta.env.VITE_API_URL || 'http://localhost:3001';

    try {
      if (isRegistering) {
        const resp = await fetch(`${API}/api/usuarios`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nome: formData.name, email: formData.email, senha: formData.password }),
        });
        if (!resp.ok) {
          const err = await resp.json();
          setErrors({ email: err.erro || 'Erro no cadastro' });
          setLoading(false);
          return;
        }
      }

      // Login via API
      const loginResp = await fetch(`${API}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, senha: formData.password }),
      });

      if (!loginResp.ok) {
        const err = await loginResp.json();
        setErrors({ email: err.erro || 'E-mail ou senha incorretos' });
        setLoading(false);
        return;
      }

      const usuario = await loginResp.json();
      const userData = { name: usuario.nome || usuario.name, email: usuario.email, id: usuario.id };
      localStorage.setItem('limpaocao_currentUser', JSON.stringify(userData));
      setLoading(false);
      onLogin(userData);
    } catch (e) {
      setErrors({ email: 'Erro de conexão' });
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsRegistering(!isRegistering);
    setErrors({});
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-br from-emerald-500 to-green-600 text-white p-4 rounded-2xl shadow-lg">
              <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L4 6v6c0 5.5 3.4 10.7 8 12 4.6-1.3 8-6.5 8-12V6l-8-4z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
            </div>
          </div>
          <Logo size="lg" className="justify-center" />
          <p className="text-slate-500 mt-2">Plataforma colaborativa de reportes ambientais</p>
        </div>

        <div className="bg-white rounded-[1.5rem] shadow-xl border border-slate-200 p-8">
          <Heading level={2} className="text-center mb-6">
            {isRegistering ? 'Criar conta' : 'Entrar'}
          </Heading>

          <div className="space-y-4">
            {isRegistering && (
              <Input
                label="Nome"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="Seu nome completo"
                error={errors.name}
              />
            )}

            <Input
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="seu@email.com"
              error={errors.email}
            />

            <Input
              label="Senha"
              type="password"
              value={formData.password}
              onChange={(e) => handleChange('password', e.target.value)}
              placeholder="••••••••"
              error={errors.password}
            />

            {isRegistering && (
              <Input
                label="Confirmar senha"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => handleChange('confirmPassword', e.target.value)}
                placeholder="••••••••"
                error={errors.confirmPassword}
              />
            )}
          </div>

          <div className="mt-6 space-y-3">
            <Button variant="primary" size="lg" className="w-full" onClick={handleSubmit} disabled={loading}>
              {loading ? 'Aguarde...' : isRegistering ? 'Cadastrar' : 'Entrar'}
            </Button>

            <button
              type="button"
              onClick={toggleMode}
              className="w-full text-sm text-slate-500 hover:text-emerald-600 transition-colors"
            >
              {isRegistering ? 'Já tem conta? Entrar' : 'Não tem conta? Cadastre-se'}
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-slate-400 mt-6">
          © 2024 LimpAção — Lute por uma Florianópolis mais limpa
        </p>
      </div>
    </div>
  );
}