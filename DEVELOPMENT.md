# Guia de Desenvolvimento - LimpAção

## Visão Geral da Arquitetura

A aplicação é um **SPA (Single Page Application)** React com estado gerenciado via `useState`. Toda a lógica está concentrada no componente `LimpacaoApp` para simplicidade.

## Estrutura do Estado

```javascript
// Reports: array de objetos com informações de reportes
const [reports, setReports] = useState([...])

// Filtros: controlar visualização dos reports
const [filterUrgency, setFilterUrgency] = useState('all')
const [filterStatus, setFilterStatus] = useState('all')
const [searchTerm, setSearchTerm] = useState('')

// Modal: controlar visibilidade do formulário
const [showNewReportForm, setShowNewReportForm] = useState(false)

// Formulário: dados do novo report
const [formData, setFormData] = useState({
  title: '', location: '', description: '', urgency: 'medium'
})
```

## Fluxo de Dados

```
User Input (botões, inputs)
        ↓
setState (atualiza estado)
        ↓
filteredReports (filtra dados)
        ↓
JSX (renderiza interface)
```

## Estrutura de um Report

```javascript
{
  id: 1,                          // Identificador único
  title: 'Lixo na Praia da Armação',
  location: 'Praia da Armação, Florianópolis',
  urgency: 'high',                // 'low', 'medium', 'high'
  status: 'pending',              // 'pending', 'in-progress', 'resolved'
  date: '2024-06-28',             // YYYY-MM-DD
  image: 'https://...',           // URL da imagem
  description: 'Grande acúmulo...',
  author: 'João da Silva',
  votes: 24                       // Número de apoios
}
```

## Componentes e Seções

### 1. Header
- Logo e nome da aplicação
- Botão "Reportar Lixo" que abre o modal

### 2. Hero Stats
- 3 cards com estatísticas
- Contagem de reports totais, resolvidos e em andamento

### 3. Modal de Novo Report
- Formulário com campos de texto e select
- Validação básica (required)
- Submit adiciona novo report ao topo da lista

### 4. Filtros e Busca
- Search bar para busca por texto
- 3 selects: Urgência, Status, Ordenação
- Filtros aplicados em tempo real

### 5. Grid de Reports
- Cards responsivos (3 colunas desktop, 2 tablet, 1 mobile)
- Cada card mostra imagem, urgência, status, título, localização, descrição, autor, data e votos

### 6. Empty State
- Mensagem quando não há reports após filtro
- Botão para reportar novo lixo

### 7. Footer
- Informações do projeto
- Links de navegação
- Créditos dos coordenadores

## Configurações de Urgência e Status

```javascript
// Configuração visual por urgência
urgencyConfig = {
  high: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', label: 'Urgente' },
  medium: { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-700', label: 'Média' },
  low: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', label: 'Baixa' }
}

// Configuração visual por status
statusConfig = {
  pending: { icon: AlertCircle, bg: 'bg-slate-100', text: 'text-slate-700', label: 'Pendente' },
  'in-progress': { icon: Clock, bg: 'bg-amber-100', text: 'text-amber-700', label: 'Em andamento' },
  resolved: { icon: CheckCircle, bg: 'bg-green-100', text: 'text-green-700', label: 'Resolvido' }
}
```

## Funções Principais

### `handleSubmitReport(e)`
- Valida e processa novo report
- Cria objeto com dados do formulário
- Adiciona ao início da lista
- Limpa formulário e fecha modal

### `filteredReports`
- Filtra reports por urgência, status e texto
- Usado na renderização do grid

### `stats`
- Calcula estatísticas dos reports
- Conta totais, resolvidos e em andamento

## Tailwind CSS Customization

A aplicação usa Tailwind com cores customizadas:

```javascript
// tailwind.config.js
colors: {
  green: {
    50: '#f0fdf4',
    500: '#22c55e',   // Verde primário
    600: '#16a34a'    // Verde escuro
  }
}
```

### Classes Tailwind Importantes

- `.line-clamp-1`, `.line-clamp-2`: Trunca texto
- `.border-l-4`: Borda esquerda (indica urgência)
- `.sticky top-0`: Header fixo no topo
- `.grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3`: Responsividade

## Ícones Lucide React

A aplicação usa ícones do Lucide:
- `MapPin` - Localização
- `AlertCircle` - Status pendente
- `CheckCircle` - Status resolvido
- `Clock` - Status em andamento
- `Plus` - Novo report
- `Filter` - Filtros
- `Search` - Busca

## Como Estender a Aplicação

### 1. Adicionar novo filtro

```javascript
// Adicionar estado
const [newFilter, setNewFilter] = useState('all')

// Adicionar na filtragem
const filteredReports = reports.filter((report) => {
  const matchesNew = newFilter === 'all' || report.property === newFilter
  return matchesUrgency && matchesStatus && matchesSearch && matchesNew
})

// Adicionar select no UI
<select value={newFilter} onChange={(e) => setNewFilter(e.target.value)}>
  <option value="all">Todos</option>
  <option value="value1">Valor 1</option>
</select>
```

### 2. Adicionar votação no report

```javascript
// No card, adicionar botão
<button onClick={() => upvoteReport(report.id)}>
  👍 {report.votes}
</button>

// Função para atualizar
const upvoteReport = (id) => {
  setReports(reports.map(r => 
    r.id === id ? {...r, votes: r.votes + 1} : r
  ))
}
```

### 3. Integrar com API Real

```javascript
// Substituir dados mockados
useEffect(() => {
  fetch('/api/reports')
    .then(res => res.json())
    .then(data => setReports(data))
}, [])

// Enviar novo report
const handleSubmitReport = async (e) => {
  e.preventDefault()
  const response = await fetch('/api/reports', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  })
  const newReport = await response.json()
  setReports([newReport, ...reports])
  // ... resto do código
}
```

### 4. Adicionar autenticação

```javascript
// Verificar se usuário está logado
const [user, setUser] = useState(null)

// Mostrar nome do usuário ao reportar
<input 
  value={formData.author} 
  placeholder={user?.name || 'Seu nome'}
/>
```

### 5. Integrar com mapa

```javascript
// Usar biblioteca como Leaflet ou Mapbox
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

// Adicionar seção de mapa
<MapContainer center={[-27.5969, -48.5496]} zoom={12}>
  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
  {reports.map(report => (
    <Marker key={report.id} position={[lat, lng]}>
      <Popup>{report.title}</Popup>
    </Marker>
  ))}
</MapContainer>
```

## Performance e Otimizações

### Otimizações Atuais
- CSS crítico inline no head
- Imagens com lazy loading (adicionar `loading="lazy"`)
- Estado mínimo necessário

### Próximas Otimizações
- Usar `useCallback` para funções
- Usar `useMemo` para filteredReports
- Dividir em componentes menores
- Paginação para listas grandes
- Virtual scrolling se houver muitos reports

## Testing

Para adicionar testes com Vitest:

```bash
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom
```

Exemplo de teste:
```javascript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import LimpacaoApp from './index'

describe('LimpacaoApp', () => {
  it('renderiza o header', () => {
    render(<LimpacaoApp />)
    expect(screen.getByText('LimpAção')).toBeInTheDocument()
  })
})
```

## Troubleshooting

### Tailwind não está aplicando estilos
- Verificar se `index.css` é importado em `main.jsx`
- Verificar `content` em `tailwind.config.js`

### Componente não renderiza após mudar estado
- Certificar que está usando `setReport(newValue)` e não `report = newValue`
- Checar se o componente pai está passando props corretamente

### Filtros não funcionam
- Verificar se a chave do report corresponde ao filtro
- Usar console.log para debugar `filteredReports`

## Build e Deploy

### Local
```bash
npm run build
npm run preview
```

### Vercel (recomendado para React)
```bash
npm install -g vercel
vercel
```

### GitHub Pages
Adicionar ao `vite.config.js`:
```javascript
export default defineConfig({
  base: '/limpacao/',
  ...
})
```

## Recursos Úteis

- [React Docs](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vite Docs](https://vitejs.dev)
- [Lucide Icons](https://lucide.dev)

---

**Última atualização**: Junho 2024
**Versão**: 0.1.0
