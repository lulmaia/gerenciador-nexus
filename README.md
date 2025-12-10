# 🎉 GERENCIADOR DE FERIADOS

Sistema completo para gerenciar feriados e datas importantes com integração automática de feriados nacionais brasileiros.

## 📋 Pré-requisitos

- **Node.js** (versão 16+) - [Download aqui](https://nodejs.org/)

## 🗄️ Banco de Dados

Utiliza SQLite - criado automaticamente ao rodar o backend.

**Vantagens do SQLite**:
- ✅ Não precisa instalar servidor de banco
- ✅ Arquivo único e portável  
- ✅ Zero configuração
- ✅ Perfeito para desenvolvimento

## 🚀 Como Rodar

### Backend:
```bash
cd backend
npm install
npm run init-db
npm run dev
```

### Frontend:
```bash
cd frontend
npm install
npm run dev
```

### Acesse: http://localhost:3000

## ✨ Funcionalidades

### 🎌 Feriados Automáticos
- **Integração Brasil API**: Carrega feriados nacionais automaticamente
- **Cache local**: Armazena feriados no SQLite para performance
- **Visual diferenciado**: Cor vermelha (#e63946) com ícone 🎌
- **Tooltip informativo**: Detalhes ao passar o mouse
- **Navegação por ano**: Carrega feriados automaticamente ao mudar ano

### 📅 Gerenciamento de Eventos
- Visualizar calendário com feriados e eventos
- Adicionar/editar/excluir eventos personalizados
- Buscar eventos por data
- Interface responsiva e intuitiva

### 🎨 Interface Visual
- **Feriados**: Cor vermelha com ícone 🎌
- **Eventos**: Cor azul padrão
- **Legenda**: Diferenciação visual clara
- **Responsivo**: Funciona em desktop e mobile

## 🔧 Comandos Úteis

### Backend:
```bash
npm run dev              # Desenvolvimento
npm run init-db          # Criar banco com dados de exemplo
npm run clear-db         # Limpar banco
npm run migrate-holidays # Migrar tabela de feriados (se necessário)
```

### Frontend:
```bash
npm run dev   # Desenvolvimento
npm run build # Build produção
```

### SQLite:
```bash
# Visualizar banco
sqlite3 backend/events.db

# Ver todos os eventos
SELECT * FROM events;

# Ver todos os feriados
SELECT * FROM holidays ORDER BY date;

# Sair
.quit
```

## 🏗️ Estrutura do Projeto

```
DATAS/
├── backend/                    # API Node.js + SQLite
│   ├── config/
│   │   └── database.js        # Conexão SQLite
│   ├── controllers/
│   │   ├── eventController.js # Lógica dos eventos
│   │   └── holidayController.js # Lógica dos feriados
│   ├── routes/
│   │   ├── eventRoutes.js     # Rotas de eventos
│   │   └── holidayRoutes.js   # Rotas de feriados
│   ├── migrations/
│   │   └── add-holidays-table.js # Migração feriados
│   ├── .env                   # Configurações
│   ├── init-db.js            # Script inicialização
│   ├── events.db             # Banco SQLite
│   ├── package.json          # Dependências
│   └── server.js             # Servidor principal
│
└── frontend/                  # Interface React
    ├── src/
    │   ├── components/
    │   │   ├── EventCalendar.jsx    # Calendário principal
    │   │   ├── EventForm.jsx        # Formulário eventos
    │   │   ├── EventList.jsx        # Lista de eventos
    │   │   └── EventModal.jsx       # Modal detalhes
    │   ├── services/
    │   │   ├── api.js              # Conexão API eventos
    │   │   └── holidayApi.js       # Conexão API feriados
    │   ├── App.jsx                 # Componente principal
    │   └── main.jsx                # Entrada aplicação
    ├── package.json               # Dependências
    └── vite.config.js            # Configuração Vite
```

## 🔌 API Endpoints

### Eventos
```bash
GET    /api/events           # Listar todos os eventos
POST   /api/events           # Criar novo evento
PUT    /api/events/:id       # Atualizar evento
DELETE /api/events/:id       # Excluir evento
```

### Feriados
```bash
GET    /api/holidays/:year   # Listar feriados do ano
```

**Exemplo resposta feriados:**
```json
[
  {
    "id": 1,
    "date": "2024-01-01",
    "name": "Confraternização Universal",
    "type": "national",
    "year": 2024,
    "created_at": "2024-01-01 10:00:00"
  }
]
```

## 🐛 Solução de Problemas

### ❌ Erro SQLite
**Problema**: Não consegue criar arquivo do banco
**Solução**: Verifique permissões da pasta

### ❌ API não funciona  
**Problema**: Frontend não acessa backend
**Soluções**:
- Verifique se backend está na porta 3001
- Teste: http://localhost:3001/api/events

### ❌ Module not found
**Problema**: Dependências não instaladas
**Solução**: Execute `npm install` nas pastas backend e frontend

### ❌ Feriados não aparecem
**Soluções**:
1. Verifique se backend está rodando
2. Teste API: http://localhost:3001/api/holidays/2024
3. Verifique console do navegador
4. Brasil API pode estar fora do ar (cache local continua funcionando)

## 🎯 Testando a Aplicação

1. **Abra**: http://localhost:3000
2. **Você verá**:
   - Calendário com feriados (vermelho) e eventos (azul)
   - Lista de eventos na lateral
   - Legenda explicativa

3. **Teste as funcionalidades**:
   - Clique em uma data para criar evento
   - Clique em um evento para ver detalhes
   - Use botões Editar/Excluir
   - Navegue entre meses/anos
   - Observe feriados carregando automaticamente

## 🔐 Configurações de Produção

Para ambiente de produção, considere:

1. **Variáveis de ambiente** seguras
2. **Validação** adicional nos dados  
3. **HTTPS** para conexões seguras
4. **Backup** regular do banco
5. **Rate limiting** nas APIs
6. **Logs** estruturados

## 🎨 Customização

### Alterar cores dos feriados
Edite `frontend/src/components/EventCalendar.jsx`:
```javascript
const backgroundColor = isHoliday ? '#sua-cor-aqui' : (event.resource.color || '#3174ad');
```

### Alterar ícone dos feriados
```javascript
title: `🎊 ${holiday.name}`, // Substitua 🎌 por outro ícone
```

## 📊 Banco de Dados - Estrutura

### Tabela events
```sql
CREATE TABLE events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  date TEXT NOT NULL,
  time TEXT,
  location TEXT,
  color TEXT DEFAULT '#3174ad',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Tabela holidays  
```sql
CREATE TABLE holidays (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  date TEXT NOT NULL,
  name TEXT NOT NULL,
  type TEXT,
  year INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(date)
);
```

## 🆘 Precisa de Ajuda?

1. **Verifique os logs** nos terminais
2. **Teste cada parte** separadamente  
3. **Confirme as portas**: Backend (3001) e Frontend (3000)
4. **Reinicie os serviços** se necessário
5. **Limpe o cache** do navegador se houver problemas visuais

---

## 🎉 Pronto!

Seu sistema de gerenciamento de feriados está funcionando com:
- ✅ Feriados brasileiros automáticos
- ✅ Eventos personalizados  
- ✅ Interface visual intuitiva
- ✅ Cache local para performance
- ✅ API REST completa

**Desenvolvido com**: Node.js, Express, SQLite, React, Vite e Brasil API