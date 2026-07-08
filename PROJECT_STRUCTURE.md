# Estrutura do Projeto LimpAção com Atomic Design

## 📁 Estrutura Completa

```
limpacao/
│
├── src/                          # 🎯 Código fonte principal
│   ├── atoms/                    # ⚛️ Componentes básicos indivisíveis
│   │   ├── Button.jsx            # Botão reutilizável (primary, secondary, ghost, danger)
│   │   ├── Input.jsx             # Input de texto com validação
│   │   ├── Badge.jsx             # Badge/tag com variações de cor
│   │   ├── Select.jsx            # Select/dropdown com label
│   │   ├── Textarea.jsx          # Área de texto com label
│   │   ├── Icon.jsx              # Wrapper para ícones Lucide
│   │   ├── Heading.jsx           # Títulos (h1-h6)
│   │   ├── Text.jsx              # Parágrafo/texto genérico
│   │   └── index.js              # Exportações dos atoms
│   │
│   ├── molecules/                # 🧬 Combinações simples de atoms
│   │   ├── SearchBar.jsx         # Input com ícone de busca
│   │   ├── FilterSelect.jsx      # Select para filtros
│   │   ├── StatCard.jsx          # Card com estatística (ícone + valor + label)
│   │   ├── ButtonGroup.jsx       # Grupo de botões (horizontal/vertical)
│   │   ├── FormField.jsx         # Input com label e validação
│   │   ├── Logo.jsx              # Logo + branding da app
│   │   ├── ReportHeader.jsx      # Urgência + Status badges
│   │   ├── LocationField.jsx     # Ícone mapa + localização
│   │   ├── VoteSection.jsx       # Votos + contador
│   │   └── index.js              # Exportações das molecules
│   │
│   ├── organisms/                # 🧪 Combinações complexas (molecules + atoms)
│   │   ├── Header.jsx            # Header com logo e botão novo report
│   │   ├── StatsPanel.jsx        # Painel com 3 stat cards
│   │   ├── FilterPanel.jsx       # Search bar + 3 selects de filtro
│   │   ├── ReportCard.jsx        # Card completo de um report
│   │   ├── Modal.jsx             # Modal genérico reutilizável
│   │   ├── Footer.jsx            # Footer com links e info
│   │   ├── EmptyState.jsx        # Estado vazio com mensagem
│   │   ├── NewReportForm.jsx     # Formulário de novo report
│   │   └── index.js              # Exportações dos organisms
│   │
│   ├── templates/                # 📐 Layouts genéricos com placeholders
│   │   ├── MainTemplate.jsx      # Template principal (Header + Main + Footer)
│   │   └── index.js              # Exportações dos templates
│   │
│   ├── pages/                    # 📄 Páginas completas (templates + dados)
│   │   ├── HomePage.jsx          # Página home (composição final)
│   │   └── index.js              # Exportações das páginas
│   │
│   ├── hooks/                    # 🎣 Hooks customizados
│   │   ├── useReports.js         # Hook para gerenciar reports (estado + lógica)
│   │   └── index.js              # Exportações dos hooks
│   │
│   ├── data/                     # 📊 Dados e mocks
│   │   └── mockData.js           # 6 reports de exemplo
│   │
│   ├── config/                   # ⚙️ Configurações
│   │   └── constants.js          # Constantes, textos e validações
│   │
│   ├── styles/                   # 🎨 Estilos
│   │   └── global.css            # Tailwind + estilos customizados
│   │
│   └── App.jsx                   # App principal (importa HomePage)
│
├── main.jsx                      # Entry point (React DOM render)
├── index.html                    # HTML base
│
├── vite.config.js                # Config Vite
├── tailwind.config.js            # Config Tailwind
├── postcss.config.js             # Config PostCSS
├── package.json                  # Dependencies
├── .gitignore                    # Git ignore
│
├── README.md                     # Guia geral do projeto
├── QUICKSTART.md                 # Guia rápido de setup
├── DEVELOPMENT.md                # Guia de desenvolvimento
├── ATOMIC_DESIGN.md              # Documentação Atomic Design ⭐
├── PROJECT_STRUCTURE.md          # Este arquivo
│
└── components-example.jsx        # Exemplos de componentes (arquivo antigo)
```

## 🔄 Fluxo de Imports

Você deve importar **sempre de baixo para cima** na hierarquia:

```
Pages
  ↑ (importa)
Templates
  ↑ (importa)
Organisms
  ↑ (importa)
Molecules
  ↑ (importa)
Atoms
```

### ✅ Correto

```jsx
// Page importa de Organisms
import { Header, Footer, ReportCard } from '../organisms';

// Organism importa de Molecules
import { Logo, StatCard } from '../molecules';

// Molecule importa de Atoms
import { Button, Text } from '../atoms';
```

### ❌ Incorreto

```jsx
// ❌ Atom importando de Molecule
// import { Logo } from '../molecules'; (NO ATOM!)

// ❌ Molecule importando de Organism
// import { Header } from '../organisms'; (NO MOLECULE!)

// ❌ Page importando de Atom diretamente (use Organism/Molecule)
// import { Button } from '../atoms'; (NÃO, use ButtonGroup ou Organism)
```

## 📊 Tamanho Dos Componentes

### Atoms (Pequenos)
- Arquivo: ~50-100 linhas
- Responsabilidade: 1 tipo de UI
- Props: 3-5 props simples
- Exemplo: Button, Input, Badge

### Molecules (Médios)
- Arquivo: ~80-150 linhas
- Responsabilidade: 1 funcionalidade simples
- Props: 5-10 props
- Exemplo: SearchBar, FormField, Logo

### Organisms (Grandes)
- Arquivo: ~150-300 linhas
- Responsabilidade: 1 seção da página
- Props: 10+ props
- Exemplo: Header, FilterPanel, Modal

### Templates (Muito Grandes)
- Arquivo: ~100-200 linhas
- Responsabilidade: Layout genérico
- Props: Layout slots
- Exemplo: MainTemplate

### Pages (Muito Grandes)
- Arquivo: ~200-400 linhas
- Responsabilidade: 1 página completa
- Props: Nenhuma (routing)
- Exemplo: HomePage

## 📈 Adicionando Novos Componentes

### 1. Novo Atom

```
1. Criar src/atoms/NewAtom.jsx
2. Adicionar export em src/atoms/index.js
3. Usar em Molecules
```

### 2. Nova Molecule

```
1. Criar src/molecules/NewMolecule.jsx (importa Atoms)
2. Adicionar export em src/molecules/index.js
3. Usar em Organisms
```

### 3. Novo Organism

```
1. Criar src/organisms/NewOrganism.jsx (importa Molecules + Atoms)
2. Adicionar export em src/organisms/index.js
3. Usar em Templates/Pages
```

### 4. Nova Page

```
1. Criar src/pages/NewPage.jsx (importa Organisms/Templates)
2. Adicionar export em src/pages/index.js
3. Adicionar rota em App.jsx ou routing library
```

## 🎯 Exemplo: Criar um Card de Usuário

### 1. Atoms necessários ✅ (Já existem)
- Text (para nome)
- Badge (para status)
- Icon (para avatar)

### 2. Criar nova Molecule

```jsx
// src/molecules/UserCard.jsx
import { Text, Badge } from '../atoms';

export function UserCard({ name, status, avatar }) {
  return (
    <div>
      <img src={avatar} alt={name} />
      <Text weight="bold">{name}</Text>
      <Badge>{status}</Badge>
    </div>
  );
}
```

### 3. Exportar em molecules/index.js

```js
export { UserCard } from './UserCard';
```

### 4. Usar em um Organism

```jsx
// src/organisms/UserList.jsx
import { UserCard } from '../molecules';

export function UserList({ users }) {
  return (
    <div>
      {users.map(user => (
        <UserCard key={user.id} {...user} />
      ))}
    </div>
  );
}
```

## 🔧 Configurações Por Camada

### Atoms
- Props: valores primitivos ou simples
- Estilos: Tailwind classes
- Responsabilidade: render puro

### Molecules
- Props: atoms props + state functions
- Estilos: Tailwind classes
- Responsabilidade: composição + UI simples

### Organisms
- Props: molecules props + event handlers
- Estilos: layout com grid/flex
- Responsabilidade: seção da página

### Templates
- Props: slot components (children)
- Estilos: layout da página
- Responsabilidade: estrutura genérica

### Pages
- Props: nenhuma (ou routing params)
- Estilos: integração
- Responsabilidade: lógica + dados

## 📱 Responsividade

Todos os componentes suportam responsividade via Tailwind:

```jsx
// No Tailwind (que já está configurado)
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {/* Responsivo automático */}
</div>
```

## 🧪 Testabilidade

Cada camada é testável:

```jsx
// Test Atoms
<Button variant="primary" />

// Test Molecules (combina atoms)
<SearchBar value="" onChange={() => {}} />

// Test Organisms (combina molecules)
<Header onNewReportClick={() => {}} />

// Test Pages (tudo junto)
<HomePage />
```

## 📊 Métricas

| Camada | Quantidade | Total LOC |
|--------|-----------|----------|
| Atoms | 8 | ~600 |
| Molecules | 9 | ~800 |
| Organisms | 8 | ~1,200 |
| Templates | 1 | ~150 |
| Pages | 1 | ~250 |
| Hooks | 1 | ~100 |
| **Total** | **28** | **~3,100** |

## 🚀 Próximos Passos

1. ✅ Entender a estrutura Atomic Design
2. ✅ Navegar pelos componentes
3. ✅ Modificar componentes existentes
4. ✅ Criar novos componentes seguindo o padrão
5. ✅ Integrar com API real (backend)
6. ✅ Adicionar testes automatizados
7. ✅ Deploy em produção

---

**Documentação**: [ATOMIC_DESIGN.md](./ATOMIC_DESIGN.md)  
**Quick Start**: [QUICKSTART.md](./QUICKSTART.md)  
**README**: [README.md](./README.md)
