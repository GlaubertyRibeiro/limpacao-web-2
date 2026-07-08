import { Button, Input, Badge, Heading, Text } from './atoms';

# Guia de Importações - Atomic Design LimpAção

Este documento mostra como importar componentes entre as diferentes camadas.

## 📋 Regra Principal

**SEMPRE importe de baixo para cima na hierarquia:**

```
Pages
  ↑ importa de
Templates
  ↑ importa de
Organisms
  ↑ importa de
Molecules
  ↑ importa de
Atoms
```

---

## ✅ Importações Válidas

### Em um Atom (❌ Não pode importar de ninguém)
```jsx
// atoms/Button.jsx
export function Button({ children, ...props }) {
  return <button {...props}>{children}</button>;
}
```

### Em uma Molecule (Só de Atoms)
```jsx
// molecules/SearchBar.jsx
import { Search } from 'lucide-react';
import { Input } from '../atoms';  // ✅ OK

export function SearchBar({ value, onChange }) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-3" />
      <Input value={value} onChange={onChange} />
    </div>
  );
}
```

### Em um Organism (De Molecules + Atoms)
```jsx
// organisms/Header.jsx
import { Button } from '../atoms';        // ✅ OK
import { Logo } from '../molecules';      // ✅ OK

export function Header({ onNewReportClick }) {
  return (
    <header>
      <Logo />
      <Button onClick={onNewReportClick}>Novo Report</Button>
    </header>
  );
}
```

### Em um Template (De Organisms + Molecules + Atoms)
```jsx
// templates/MainTemplate.jsx
import { Header, Footer } from '../organisms';  // ✅ OK
import { Button } from '../atoms';              // ✅ OK (mas use via Organism)

export function MainTemplate({ children, onNewReportClick }) {
  return (
    <div>
      <Header onNewReportClick={onNewReportClick} />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
```

### Em uma Page (De Tudo)
```jsx
// pages/HomePage.jsx
import { MainTemplate } from '../templates';      // ✅ OK
import { ReportCard, FilterPanel } from '../organisms'; // ✅ OK
import { useReports } from '../hooks';             // ✅ OK

export function HomePage() {
  const { filteredReports, stats } = useReports();
  
  return (
    <MainTemplate>
      <FilterPanel {...} />
      <div>
        {filteredReports.map(report => (
          <ReportCard key={report.id} report={report} />
        ))}
      </div>
    </MainTemplate>
  );
}
```

---

## ❌ Importações Inválidas

### ❌ Atom importando de qualquer coisa
```jsx
// atoms/Button.jsx
import { SearchBar } from '../molecules';  // ❌ NÃO!
```

### ❌ Molecule importando de Organism
```jsx
// molecules/Logo.jsx
import { Header } from '../organisms';  // ❌ NÃO!
```

### ❌ Organism importando de Template/Page
```jsx
// organisms/ReportCard.jsx
import { MainTemplate } from '../templates';  // ❌ NÃO!
```

### ❌ Page importando diretamente de Atom (deve usar via Organism)
```jsx
// pages/HomePage.jsx
import { Button } from '../atoms';  // ❌ NÃO! Use através de Organism
```

---

## 🔄 Exemplos de Fluxo Correto

### Exemplo 1: Novo Report Form

```
Formulário de Novo Report
└── atoms/Heading (título)
└── organisms/NewReportForm
    ├── molecules/FormField
    │   └── atoms/Input
    ├── atoms/Textarea
    └── atoms/Select
└── atoms/Button (enviar)
```

**Importar em HomePage:**
```jsx
import { Modal, NewReportForm } from '../organisms';

<Modal onSubmit={handleSubmit}>
  <NewReportForm formData={data} onFormChange={handleChange} />
</Modal>
```

### Exemplo 2: Card de Report

```
Report Card
└── organisms/ReportCard
    ├── molecules/ReportHeader
    │   ├── atoms/Badge (urgência)
    │   └── atoms/Badge (status)
    ├── molecules/LocationField
    │   ├── atoms/Icon
    │   └── atoms/Text
    └── molecules/VoteSection
        └── atoms/Text
```

**Importar em HomePage:**
```jsx
import { ReportCard } from '../organisms';

{filteredReports.map(report => (
  <ReportCard key={report.id} report={report} />
))}
```

### Exemplo 3: Header

```
Header
└── organisms/Header
    ├── molecules/Logo
    │   ├── atoms/Heading
    │   └── atoms/Text
    └── atoms/Button (novo report)
```

**Importar em MainTemplate:**
```jsx
import { Header } from '../organisms';
import { Logo } from '../molecules';

<Header onNewReportClick={onNewReportClick} />
```

---

## 📊 Mapa de Importações Completo

```
HomePage (Page)
├── MainTemplate
│   ├── Header (Organism)
│   │   ├── Logo (Molecule)
│   │   │   ├── Heading (Atom)
│   │   │   ├── Text (Atom)
│   │   │   └── Icon (Atom)
│   │   └── Button (Atom)
│   ├── StatsPanel (Organism)
│   │   ├── StatCard (Molecule) x3
│   │   │   ├── Heading (Atom)
│   │   │   ├── Text (Atom)
│   │   │   └── Icon (Atom)
│   ├── FilterPanel (Organism)
│   │   ├── SearchBar (Molecule)
│   │   │   ├── Input (Atom)
│   │   │   └── Icon (Atom - lucide)
│   │   └── FilterSelect (Molecule) x3
│   │       └── Select (Atom)
│   ├── ReportCard (Organism) x6
│   │   ├── ReportHeader (Molecule)
│   │   │   └── Badge (Atom) x2
│   │   ├── Heading (Atom)
│   │   ├── LocationField (Molecule)
│   │   │   ├── Icon (Atom)
│   │   │   └── Text (Atom)
│   │   ├── Text (Atom)
│   │   └── VoteSection (Molecule)
│   │       └── Text (Atom)
│   ├── Modal (Organism)
│   │   └── NewReportForm (Organism)
│   │       ├── FormField (Molecule) x3
│   │       │   └── Input (Atom)
│   │       └── Select (Atom)
│   └── Footer (Organism)
│       ├── Logo (Molecule)
│       ├── Heading (Atom)
│       └── Text (Atom)
│
└── useReports (Hook)
    └── mockData (Data)
```

---

## 🆕 Criar Novo Componente

### Checklist ao criar novo componente

1. **Decida qual camada:**
   - Atom: Componente simples, sem dependências
   - Molecule: Combinação de atoms
   - Organism: Seção da página, combina molecules
   - Template: Layout genérico
   - Page: Página inteira

2. **Crie o arquivo:**
   ```
   src/{camada}/NovoComponente.jsx
   ```

3. **Importe apenas o necessário:**
   - Atoms importam de nenhum lugar
   - Molecules importam de atoms
   - Organisms importam de molecules/atoms
   - etc...

4. **Exporte no index.js:**
   ```js
   // src/{camada}/index.js
   export { NovoComponente } from './NovoComponente';
   ```

5. **Use em um componente da camada acima**

---

## 🎯 Dicas

✅ **Use o padrão index.js** para facilitar importações:
```jsx
// ❌ Ruim
import { Button } from '../atoms/Button.jsx';

// ✅ Bom
import { Button } from '../atoms';
```

✅ **Agrupe imports por camada:**
```jsx
// Ordem: Atoms, Molecules, Organisms, Templates, Pages, Hooks, Data
import { Button, Input } from '../atoms';
import { Logo } from '../molecules';
import { Header, Modal } from '../organisms';
import { MainTemplate } from '../templates';
import { useReports } from '../hooks';
```

✅ **Faça comentários quando a importação é menos óbvia:**
```jsx
import { ReportCard } from '../organisms'; // Usa molecules/Hooks internamente
```

❌ **Nunca importe "para cima":**
```jsx
// Ninguém deve fazer isto!
import { HomePage } from '../pages'; // Em um Atom? NÃO!
```

---

## 📈 Verificação de Estrutura

Para verificar se sua estrutura está correta, pergunte-se:

1. ✅ Atoms importam de Atoms?
2. ✅ Molecules importam apenas de Atoms?
3. ✅ Organisms importam apenas de Molecules/Atoms?
4. ✅ Templates importam apenas de Organisms?
5. ✅ Pages importam de Tudo (correto)?

Se todas forem "✅ Sim", sua estrutura está correta!

---

**Leia também:** [ATOMIC_DESIGN.md](./ATOMIC_DESIGN.md)
