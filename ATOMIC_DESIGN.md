# Atomic Design - LimpAção

Este projeto segue a metodologia **Atomic Design** para organizar componentes React.

## 📊 Estrutura de Componentes

```
src/
├── atoms/              # Componentes básicos, indivisíveis
│   ├── Button.jsx      # Botão reutilizável
│   ├── Input.jsx       # Input de texto
│   ├── Badge.jsx       # Badge/tag com cores
│   ├── Select.jsx      # Select/dropdown
│   ├── Textarea.jsx    # Área de texto
│   ├── Icon.jsx        # Wrapper de ícone
│   ├── Heading.jsx     # Títulos (h1-h6)
│   ├── Text.jsx        # Parágrafo/texto
│   └── index.js        # Exportações
│
├── molecules/          # Combinações de atoms
│   ├── SearchBar.jsx   # Input + ícone
│   ├── FilterSelect.jsx # Select com label
│   ├── StatCard.jsx    # Card com estatística
│   ├── ButtonGroup.jsx # Grupo de botões
│   ├── FormField.jsx   # Input com validação
│   ├── Logo.jsx        # Logo + branding
│   ├── ReportHeader.jsx # Urgência + Status
│   ├── LocationField.jsx # Localização
│   ├── VoteSection.jsx  # Votos
│   └── index.js        # Exportações
│
├── organisms/          # Combinações complexas (molecules + atoms)
│   ├── Header.jsx      # Header da app
│   ├── StatsPanel.jsx  # Painel de estatísticas
│   ├── FilterPanel.jsx # Painel de filtros
│   ├── ReportCard.jsx  # Card de report
│   ├── Modal.jsx       # Modal genérico
│   ├── Footer.jsx      # Footer da app
│   ├── EmptyState.jsx  # Estado vazio
│   ├── NewReportForm.jsx # Formulário novo report
│   └── index.js        # Exportações
│
├── templates/          # Layouts genéricos
│   ├── MainTemplate.jsx # Template principal
│   └── index.js        # Exportações
│
├── pages/              # Páginas completas (templates + dados)
│   ├── HomePage.jsx    # Página home
│   └── index.js        # Exportações
│
├── hooks/              # Hooks customizados
│   ├── useReports.js   # Gerenciamento de reports
│   └── index.js        # Exportações
│
├── data/               # Dados mockados
│   └── mockData.js     # Reports de exemplo
│
├── config/             # Configurações
│   └── constants.js    # Constantes e mensagens
│
├── styles/             # Estilos globais
│   └── global.css      # CSS global + Tailwind
│
└── App.jsx             # App principal
```

## 🧬 Níveis do Atomic Design

### 1️⃣ ATOMS (Componentes Básicos)

Componentes simples e indivisíveis:

```jsx
<Button variant="primary" size="md" onClick={handleClick}>
  Clique aqui
</Button>

<Input 
  label="Email" 
  value={email} 
  onChange={(e) => setEmail(e.target.value)}
  placeholder="seu@email.com"
/>

<Badge variant="urgentHigh">Urgente</Badge>

<Heading level={1}>Título</Heading>

<Text size="sm" color="slate">Descrição</Text>
```

### 2️⃣ MOLECULES (Combinações de Atoms)

Combinações simples de atoms que formam unidades funcionais:

```jsx
<SearchBar 
  value={searchTerm}
  onChange={setSearchTerm}
  placeholder="Buscar..."
/>

<StatCard
  icon={BarChart3}
  value={24}
  label="Total de Reports"
/>

<ReportHeader urgency="high" status="pending" />

<LocationField location="Praia da Armação" />
```

### 3️⃣ ORGANISMS (Combinações Complexas)

Combinações de molecules e atoms que formam seções completas:

```jsx
<Header onNewReportClick={handleClick} />

<FilterPanel 
  searchTerm={search}
  onSearchChange={setSearch}
  filterUrgency={urgency}
  onUrgencyChange={setUrgency}
  filterStatus={status}
  onStatusChange={setStatus}
/>

<ReportCard report={reportData} />

<Modal 
  isOpen={open}
  onClose={handleClose}
  title="Novo Report"
  onSubmit={handleSubmit}
>
  <NewReportForm formData={data} onFormChange={handleChange} />
</Modal>
```

### 4️⃣ TEMPLATES (Layouts)

Layouts genéricos com placeholders:

```jsx
<MainTemplate onNewReportClick={handleClick}>
  {/* Conteúdo aqui */}
</MainTemplate>
```

### 5️⃣ PAGES (Páginas Completas)

Templates preenchidas com dados reais:

```jsx
<HomePage /> // Renderiza MainTemplate + conteúdo real
```

## 🔄 Fluxo de Dados

```
HomePage (Page)
  ├── useReports Hook (Lógica)
  ├── MainTemplate (Template)
  │   ├── Header (Organism)
  │   ├── StatsPanel (Organism)
  │   │   └── StatCard (Molecule)
  │   │       ├── Heading (Atom)
  │   │       ├── Text (Atom)
  │   │       └── Icon (Atom)
  │   ├── FilterPanel (Organism)
  │   │   ├── SearchBar (Molecule)
  │   │   │   └── Input (Atom)
  │   │   └── FilterSelect (Molecule)
  │   │       └── Select (Atom)
  │   ├── ReportCard (Organism)
  │   │   ├── ReportHeader (Molecule)
  │   │   ├── Heading (Atom)
  │   │   ├── LocationField (Molecule)
  │   │   └── VoteSection (Molecule)
  │   ├── Modal (Organism)
  │   │   └── NewReportForm (Organism)
  │   │       ├── FormField (Molecule)
  │   │       ├── Textarea (Atom)
  │   │       └── Select (Atom)
  │   └── Footer (Organism)
```

## 💻 Como Usar

### Importar Componentes

```jsx
// Atoms
import { Button, Input, Badge, Heading, Text } from '../atoms';

// Molecules
import { SearchBar, Logo, ReportHeader } from '../molecules';

// Organisms
import { Header, Modal, ReportCard } from '../organisms';

// Templates
import { MainTemplate } from '../templates';

// Pages
import { HomePage } from '../pages';

// Hooks
import { useReports } from '../hooks';
```

### Criar um Novo Atom

```jsx
// src/atoms/MyAtom.jsx
export function MyAtom({ children, variant = 'primary', className = '' }) {
  const variantStyles = {
    primary: 'bg-blue-500',
    secondary: 'bg-gray-500',
  };

  return (
    <div className={`${variantStyles[variant]} ${className}`}>
      {children}
    </div>
  );
}

// Adicionar ao src/atoms/index.js
export { MyAtom } from './MyAtom';
```

### Criar uma Nova Molecule

```jsx
// src/molecules/MyMolecule.jsx
import { Input, Button } from '../atoms';

export function MyMolecule({ onSubmit }) {
  const [value, setValue] = useState('');
  
  return (
    <div>
      <Input value={value} onChange={(e) => setValue(e.target.value)} />
      <Button onClick={() => onSubmit(value)}>Enviar</Button>
    </div>
  );
}

// Adicionar ao src/molecules/index.js
export { MyMolecule } from './MyMolecule';
```

### Criar um Novo Organism

```jsx
// src/organisms/MyOrganism.jsx
import { MyMolecule } from '../molecules';
import { Heading } from '../atoms';

export function MyOrganism() {
  return (
    <section>
      <Heading level={2}>Meu Organism</Heading>
      <MyMolecule onSubmit={handleSubmit} />
    </section>
  );
}

// Adicionar ao src/organisms/index.js
export { MyOrganism } from './MyOrganism';
```

## 📋 Componentes Disponíveis

### Atoms (8)
- Button
- Input
- Badge
- Select
- Textarea
- Icon
- Heading
- Text

### Molecules (9)
- SearchBar
- FilterSelect
- StatCard
- ButtonGroup
- FormField
- Logo
- ReportHeader
- LocationField
- VoteSection

### Organisms (8)
- Header
- StatsPanel
- FilterPanel
- ReportCard
- Modal
- Footer
- EmptyState
- NewReportForm

### Templates (1)
- MainTemplate

### Pages (1)
- HomePage

### Hooks (1)
- useReports

## 🎯 Princípios Atomic Design

1. **Reutilização**: Componentes pequenos podem ser combinados de diversas formas
2. **Consistência**: Uma source of truth para cada tipo de componente
3. **Manutenibilidade**: Fácil encontrar e modificar componentes
4. **Escalabilidade**: Fácil adicionar novos componentes seguindo o padrão
5. **Testabilidade**: Componentes isolados e testáveis

## 🔧 Boas Práticas

### Do's ✅
- Use atoms para criar molecules
- Use molecules para criar organisms
- Mantenha components focados em uma única responsabilidade
- Exporte componentes no arquivo index.js do diretório
- Use Tailwind para styling
- Documente props e comportamento

### Don'ts ❌
- Não misture lógica de negócio em atoms
- Não importe de molecules em atoms
- Não use styled-components junto com Tailwind
- Não crie componentes muito complexos (refatore em múltiplos)
- Não esqueça de adicionar ao index.js

## 📚 Recursos

- [Atomic Design by Brad Frost](https://atomicdesign.bradfrost.com/)
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Lucide Icons](https://lucide.dev)

---

**Versão**: 1.0.0  
**Última atualização**: Junho 2024
