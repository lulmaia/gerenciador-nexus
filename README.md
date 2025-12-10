# 📅 GERENCIADOR DE DATAS - Guia Completo

Um gerenciador de datas da "Masuñi" pela "Masuñi"

## 📋 Pré-requisitos

Antes de começar, você precisa ter instalado:

- **Node.js** (versão 16 ou superior) - [Download aqui](https://nodejs.org/)
- **Git** (opcional) - [Download aqui](https://git-scm.com/)

## 🗄️ Configuração do Banco de Dados (SQLite)

**Vantagens do SQLite**:
- ✅ Não precisa instalar servidor de banco
- ✅ Arquivo único e portável
- ✅ Zero configuração
- ✅ Perfeito para desenvolvimento

O banco SQLite será criado automaticamente quando você rodar o backend!

### Comandos do Banco:

```bash
# Criar banco com dados de exemplo
npm run init-db

# Limpar banco (apagar tudo)
npm run clear-db

# Migrar banco existente (adicionar campos de localização)
npm run migrate-location

# Limpar e recriar
npm run clear-db && npm run init-db
```

## 🚀 Como Rodar o Projeto

### Passo 1: Instalar Dependências do Backend

Abra o terminal na pasta `backend`:

```bash
cd backend
npm install
```

### Passo 2: Criar Banco com Dados de Exemplo

```bash
npm run init-db
```

✅ Isso criará o arquivo `events.db` com 5 eventos de exemplo.

### Passo 3: Iniciar o Backend

```bash
npm run dev
```

✅ **Sucesso**: Você deve ver "Servidor rodando na porta 3001" e "Conectado ao SQLite"

⚠️ **Mantenha este terminal aberto!**

### Passo 4: Instalar Dependências do Frontend

Abra **OUTRO terminal** (deixe o backend rodando) na pasta `frontend`:

```bash
cd frontend
npm install
```

### Passo 5: Iniciar o Frontend

```bash
npm run dev
```

✅ **Sucesso**: Você deve ver "Local: http://localhost:3000"

### Passo 6: Abrir no Navegador

Acesse: **http://localhost:3000**

🎉 **Pronto!** O sistema está funcionando!

## 🚀 Testando a Aplicação

1. **Abra seu navegador** em: http://localhost:3000
2. **Você deve ver**:
   - Calendário na esquerda
   - Lista de eventos na direita
   - Eventos de exemplo (se inseriu no banco)

### Testando as Funcionalidades:

1. **Adicionar Evento**: Clique em "Adicionar Evento"
2. **Clicar no Calendário**: Clique em uma data para criar evento
3. **Ver Detalhes**: Clique em um evento no calendário
4. **Editar**: Use o botão "Editar" na lista ou no modal
5. **Excluir**: Use o botão "Excluir"

## 🔧 Solução de Problemas

### ❌ Erro: "SQLITE_CANTOPEN"

**Problema**: Não consegue criar arquivo do banco

**Soluções**:
1. Verifique permissões da pasta
2. Execute como administrador se necessário

### ❌ Erro: "Cannot GET /api/events"

**Problema**: Frontend não consegue acessar o backend

**Soluções**:
1. Verifique se o backend está rodando na porta 3001
2. Acesse http://localhost:3001 - deve mostrar "API de Eventos funcionando!"

### ❌ Erro: "Module not found"

**Problema**: Dependências não instaladas

**Solução**:
```bash
# No backend
cd backend
npm install

# No frontend  
cd frontend
npm install
```

## 📁 Estrutura do Projeto

```
DATAS/
├── backend/                 # Servidor Node.js
│   ├── config/
│   │   └── database.js     # Conexão SQLite
│   ├── controllers/
│   │   └── eventController.js  # Lógica dos eventos
│   ├── routes/
│   │   └── eventRoutes.js  # Rotas da API
│   ├── .env               # Configurações
│   ├── init-db.js         # Script de inicialização
│   ├── events.db          # Banco SQLite (criado automaticamente)
│   ├── package.json       # Dependências
│   └── server.js          # Servidor principal
│
└── frontend/               # Interface React
    ├── src/
    │   ├── components/     # Componentes React
    │   ├── services/       # Conexão com API
    │   ├── App.jsx        # Componente principal
    │   └── main.jsx       # Entrada da aplicação
    ├── package.json       # Dependências
    └── vite.config.js     # Configuração Vite
```

## 🎯 Comandos Úteis

### Backend:
```bash
npm run init-db          # Criar banco com dados de exemplo
npm run clear-db         # Limpar banco (apagar tudo)
npm run migrate-location # Migrar banco existente (adicionar localização)
npm run dev              # Iniciar em modo desenvolvimento
npm start                # Iniciar em modo produção
```

### Frontend:
```bash
npm run dev    # Iniciar desenvolvimento
npm run build  # Gerar build de produção
```

### SQLite:
```bash
# Visualizar banco (instale sqlite3 se necessário)
sqlite3 backend/events.db

# Comandos SQLite
.tables          # Ver tabelas
.schema events   # Ver estrutura da tabela
SELECT * FROM events;  # Ver todos os eventos
.quit            # Sair
```

## 🔐 Configurações de Segurança

Para produção, considere:

1. **Variáveis de ambiente** mais seguras
2. **Validação** adicional nos dados
3. **HTTPS** para conexões seguras
4. **Backup** regular do banco de dados

---

## 🆘 Precisa de Ajuda?

1. **Verifique os logs** no terminal
2. **Teste cada parte** separadamente
3. **Confirme as portas**: Backend (3001) e Frontend (3000)
4. **Reinicie os serviços** se necessário

**Pronto!** Seu sistema de eventos está funcionando! 🎉