# 📸 ERP Fotógrafa — Sistema de Gestão para Estúdio Fotográfico

Sistema ERP completo e profissional para gestão de estúdio fotográfico. Desenvolvido com arquitetura escalável, pronto para uso local e preparado para futura migração para SaaS.

## 🚀 Stack Tecnológico

| Camada | Tecnologia |
|--------|-----------|
| **Backend** | Node.js + Express |
| **ORM** | Prisma |
| **Banco de Dados** | PostgreSQL |
| **Frontend** | React + Vite + Tailwind CSS |
| **PWA** | Vite PWA Plugin |
| **Autenticação** | JWT + bcryptjs |
| **PDF** | PDFKit |
| **Logs** | Winston |
| **Validação** | Joi |

## 📋 Módulos do Sistema

| Módulo | Funcionalidades |
|--------|----------------|
| **Clientes** | CRUD completo, histórico de compras, endereço |
| **Produtos/Serviços** | Catálogo, preços, custo, cálculo de margem |
| **Vendas** | Multi-itens, descontos, múltiplas formas de pagamento |
| **Parcelas** | Controle de vencimentos, notificações, pagamento |
| **Financeiro** | Receitas, despesas, fluxo de caixa, relatórios |
| **Agenda** | Calendário de ensaios, tipos de sessão, status |
| **Contratos** | Geração automática, assinatura, PDF |
| **Estoque** | Movimentações, ajustes, alertas de estoque mínimo |
| **Dashboard** | KPIs, gráficos, top clientes/produtos |
| **Relatórios** | Vendas, clientes, lucratividade, exportação CSV |

## 📁 Estrutura do Projeto

```
SISTEMA-FOTOGRAFIAS/
├── backend/
│   ├── src/
│   │   ├── controllers/    # Camada HTTP
│   │   ├── services/       # Regras de negócio
│   │   ├── repositories/   # Acesso a dados
│   │   ├── middlewares/    # Auth, erros, validação
│   │   ├── routes/         # Definição de rotas
│   │   ├── utils/          # Logger, PDF, helpers
│   │   ├── app.js          # Configuração Express
│   │   └── server.js       # Ponto de entrada
│   └── prisma/
│       ├── schema.prisma   # Modelo de dados
│       └── seed.js         # Dados iniciais
├── frontend/
│   └── src/
│       ├── components/     # Componentes reutilizáveis
│       ├── pages/          # Telas do sistema
│       ├── services/       # Chamadas de API
│       ├── context/        # Estado global
│       └── utils/          # Formatação, helpers
├── scripts/
│   ├── setup.js            # Cria estrutura em D:
│   ├── deploy.js           # Build + deploy
│   ├── backup.js           # Backup PostgreSQL
│   ├── install-service.js  # Serviço Windows
│   ├── setup-postgres.sql  # Setup banco de dados
│   ├── setup-firewall.bat  # Configurar firewall
│   └── start.bat           # Iniciar sistema
└── INSTRUCOES.md           # Guia completo de instalação
```

## ⚡ Início Rápido

```bash
# 1. Setup inicial (cria pastas em D:)
node scripts/setup.js

# 2. Configure D:\erp-fotografa\app\.env

# 3. Build e deploy
node scripts/deploy.js

# 4. Executar migrations
cd D:\erp-fotografa\app\backend
npx prisma migrate deploy
node prisma/seed.js

# 5. Iniciar
node src/server.js
```

**Acesse:** http://localhost:3000
**Login inicial:** admin@estudio.com / Admin@123

## 📱 PWA (Android)

1. Abra `http://SEU_IP:3000` no Chrome Android
2. Menu → "Adicionar à tela inicial"
3. Pronto! Funciona como app nativo

## 🗄️ Estrutura do Banco de Dados

```
users → autenticação
clients → clientes
categories → categorias de produtos/despesas
products → produtos e serviços
sales → vendas
sale_items → itens de cada venda
installments → parcelas
transactions → movimentos financeiros
expenses → despesas cadastradas
agenda_events → eventos da agenda
contracts → contratos
stock_movements → histórico de estoque
```

## 🔐 Segurança

- Autenticação JWT com expiração configurável
- Senhas criptografadas com bcryptjs (salt 10)
- Rate limiting por IP
- Helmet.js para headers HTTP seguros
- Soft delete em todos os registros
- Validação com Joi em todas as rotas
- Sanitização de inputs

## 📈 Preparado para SaaS

Estrutura pronta para adicionar multi-tenancy:
- Arquitetura limpa em camadas
- JWT compatível com claims de tenant
- Repositories desacoplados
- API RESTful versionável

---

**Versão:** 1.0.0
**Plataforma:** Windows Local + PWA Android
