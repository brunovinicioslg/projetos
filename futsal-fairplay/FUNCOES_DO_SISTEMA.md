# Funções do Sistema — Futsal FairPlay

Documentação completa de todas as funções, interfaces e tipos exportados pelo sistema.

**Arquivo principal:** `src/lib/api.ts`
**Banco de dados:** Supabase (PostgreSQL + RLS)
**Última atualização:** 2026-03-14

---

## Índice

1. [Jogadores](#1-jogadores)
2. [Peladas (Sistema Legado)](#2-peladas-sistema-legado)
3. [Rankings e Estatísticas](#3-rankings-e-estatísticas)
4. [Campeonatos](#4-campeonatos)
5. [Partidas Rápidas](#5-partidas-rápidas)
6. [Partidas Amistosas](#6-partidas-amistosas)
7. [Financeiro (Caixa)](#7-financeiro-caixa)
8. [Dashboard Público (Stats)](#8-dashboard-público-stats)
9. [Moderadores e Grupos](#9-moderadores-e-grupos)
10. [Relatórios](#10-relatórios)
11. [Páginas do App](#11-páginas-do-app)
12. [SQL / RPCs no Supabase](#12-sql--rpcs-no-supabase)

---

## 1. Jogadores

### Interface `DbJogador`
```ts
{
  id: string
  user_id: string
  name: string
  nickname: string | null
  skill_level: number        // 1–10
  position: string           // 'Goleiro' | 'Universal' | etc.
  phone: string | null
  active: boolean
  created_at: string
  updated_at: string
}
```

### Funções

| Função | Descrição |
|--------|-----------|
| `fetchJogadores(ownerUserId?)` | Lista todos os jogadores ativos do owner |
| `createJogador(jogador)` | Cria novo jogador |
| `updateJogador(id, updates)` | Atualiza dados do jogador |
| `deleteJogador(id)` | Remove jogador |
| `fetchJogadoresByUserId(userId)` | Lista jogadores de um user_id específico |
| `fetchJogadorByToken(token)` | Busca jogador pelo token de autoatualização |
| `updateJogadorDadosByToken(token, dados)` | Jogador atualiza seus próprios dados via token |
| `toggleColetaJogador(jogadorId, ativar, tokenAtual)` | Ativa/desativa coleta de dados do jogador |

---

## 2. Peladas (Sistema Legado)

> Sistema de peladas com times, rodadas e gols. Mantido para compatibilidade.

### Interfaces

| Interface | Descrição |
|-----------|-----------|
| `DbPelada` | Pelada (sessão de jogo) |
| `DbPeladaJogador` | Associação jogador ↔ pelada |
| `DbPeladaTime` | Time dentro de uma pelada |
| `DbPeladaTimeJogador` | Jogador dentro de um time |
| `DbRodada` | Rodada de jogo |
| `DbRodadaGol` | Gol registrado em uma rodada |
| `DbPeladaConvite` | Convite para confirmação de presença |
| `DbPeladaConfirmacao` | Confirmação de presença de um jogador |

### Funções

| Função | Descrição |
|--------|-----------|
| `fetchPeladas(ownerUserId?)` | Lista peladas do owner |
| `createPelada(pelada)` | Cria nova pelada |
| `updatePelada(id, updates)` | Atualiza pelada |
| `fetchPeladaJogadores(peladaId)` | Lista jogadores de uma pelada |
| `upsertPeladaJogadores(items)` | Insere/atualiza múltiplos jogadores de pelada |
| `updatePeladaJogador(id, updates)` | Atualiza um jogador específico da pelada |
| `fetchPeladaTimes(peladaId)` | Lista times de uma pelada |
| `createPeladaTime(time)` | Cria novo time |
| `fetchTimeJogadores(timeId)` | Lista jogadores de um time |
| `fetchAllTimeJogadores(timeIds)` | Lista jogadores de múltiplos times |
| `setTimeJogadores(timeId, jogadorIds)` | Define jogadores de um time (substitui todos) |
| `moveJogadorToTime(jogadorId, fromTimeId, toTimeId)` | Move jogador entre times |
| `removeJogadorFromTime(jogadorId, timeId)` | Remove jogador de um time |
| `fetchRodadas(peladaId)` | Lista rodadas de uma pelada |
| `createRodada(rodada)` | Cria nova rodada |
| `updateRodada(id, updates)` | Atualiza rodada |
| `fetchRodadaGols(rodadaId)` | Lista gols de uma rodada |
| `fetchAllRodadaGols(rodadaIds)` | Lista gols de múltiplas rodadas |
| `createRodadaGol(gol)` | Registra gol em uma rodada |
| `deleteRodadaGol(id)` | Remove gol |
| `createConvite(convite)` | Cria convite de presença (WhatsApp) |
| `fetchConviteByCode(codigo)` | Busca convite pelo código |
| `fetchConvitesByUser()` | Lista convites do usuário logado |
| `fetchConfirmacoes(conviteId)` | Lista confirmações de um convite |
| `createConfirmacao(conf)` | Confirma presença (jogador ou externo) |
| `fetchAllPlayerStatsFromPeladas(jogadores)` | Calcula estatísticas completas de todos os jogadores nas peladas |
| `fetchMonthlyStats(jogadores, year, month)` | Estatísticas mensais por jogador |

---

## 3. Rankings e Estatísticas

### Interface `PlayerRankingStat`
```ts
{
  jogador: DbJogador
  totalConvites: number       // partidas rápidas convidado
  totalPresencas: number      // presenças confirmadas (rápidas)
  totalFaltas: number         // faltas (rápidas)
  golsRapidas: number         // gols em partidas rápidas
  golsCamp: number            // gols em campeonatos
  golsAmistosa: number        // gols em amistosas
  totalGols: number           // soma de todos os gols
  totalVitorias: number       // vitórias em rodadas
  totalPartidasCamp: number   // partidas de campeonato disputadas
  presencasAmistosa: number   // presenças confirmadas em amistosas
  convitesAmistosa: number    // amistosas que foi convidado
  mediaGols: number           // média de gols por partida
  presencaPct: number         // % de presença (rápidas)
}
```

### Funções

| Função | Descrição |
|--------|-----------|
| `fetchPlayerRankingStats(ownerUserId, jogadores)` | Ranking completo (geral) de todos os jogadores |
| `fetchMonthlyPlayerRankingStats(ownerUserId, jogadores, year, month)` | Ranking mensal por jogador |

> **Nota:** Internamente usa `_fetchAmistosaRankingData(ownerUserId, startDate?, endDate?)` e `_buildPlayerStats(...)` como helpers privados.

---

## 4. Campeonatos

### Interfaces

| Interface | Descrição |
|-----------|-----------|
| `DbCampeonato` | Campeonato (torneio completo) |
| `DbCampeonatoTime` | Time participante do campeonato |
| `DbCampeonatoTimeJogador` | Jogador dentro de um time de campeonato |
| `DbCampeonatoPartida` | Partida individual do campeonato |
| `DbCampeonatoGol` | Gol registrado em partida de campeonato |
| `DbCampeonatoCartao` | Cartão (amarelo/vermelho) em partida de campeonato |

### Funções — Campeonato

| Função | Descrição |
|--------|-----------|
| `fetchCampeonatos(ownerUserId?)` | Lista campeonatos do owner |
| `fetchCampeonato(id)` | Busca campeonato por ID |
| `createCampeonato(camp)` | Cria novo campeonato |
| `updateCampeonato(id, updates)` | Atualiza campeonato |
| `deleteCampeonato(id)` | Remove campeonato e todos os dados associados |

### Funções — Times

| Função | Descrição |
|--------|-----------|
| `fetchCampeonatoTimes(campeonatoId)` | Lista times de um campeonato |
| `createCampeonatoTime(time)` | Cria time no campeonato |
| `updateCampeonatoTime(id, updates)` | Atualiza time |
| `deleteCampeonatoTime(id)` | Remove time |
| `fetchCampeonatoTimeJogadores(timeId)` | Lista jogadores de um time |
| `fetchAllCampeonatoTimeJogadores(timeIds)` | Lista jogadores de múltiplos times |
| `addJogadorToTime(timeId, jogadorId)` | Adiciona jogador ao time |
| `removeJogadorFromCampeonatoTime(timeId, jogadorId)` | Remove jogador do time |

### Funções — Partidas

| Função | Descrição |
|--------|-----------|
| `fetchCampeonatoPartidas(campeonatoId)` | Lista partidas do campeonato |
| `fetchCampeonatoPartida(id)` | Busca partida por ID |
| `createCampeonatoPartida(partida)` | Cria nova partida |
| `updateCampeonatoPartida(id, updates)` | Atualiza placar/status da partida |
| `deleteCampeonatoPartida(id)` | Remove partida |

### Funções — Gols e Cartões

| Função | Descrição |
|--------|-----------|
| `fetchCampeonatoGols(partidaId)` | Lista gols de uma partida |
| `createCampeonatoGol(gol)` | Registra gol |
| `deleteCampeonatoGol(id)` | Remove gol |
| `fetchCampeonatoCartoes(partidaId)` | Lista cartões de uma partida |
| `createCampeonatoCartao(cartao)` | Registra cartão amarelo/vermelho |
| `deleteCampeonatoCartao(id)` | Remove cartão |

---

## 5. Partidas Rápidas

> Partidas avulsas com convite de presença e link de gols via WhatsApp.

### Interfaces

| Interface | Descrição |
|-----------|-----------|
| `DbPartidaRapida` | Partida rápida (avulsa) |
| `DbPartidaRapidaJogador` | Jogador associado à partida |
| `DbPartidaRapidaPresenca` | Registro de presença por jogador |
| `DbPartidaRapidaVotoHistorico` | Histórico de votos de presença |
| `DbPartidaRapidaGolPendente` | Gol registrado pelo jogador (aguarda aprovação admin) |

### Funções

| Função | Descrição |
|--------|-----------|
| `fetchPartidasRapidas(ownerUserId?)` | Lista partidas rápidas do owner |
| `fetchPartidaRapida(id)` | Busca partida por ID |
| `fetchPartidaRapidaByCodigoPresenca(codigo)` | Busca partida pelo código de presença (link público) |
| `fetchPartidaRapidaByCodigoGols(codigo)` | Busca partida pelo código de gols (link público) |
| `createPartidaRapida(partida)` | Cria nova partida rápida (gera códigos automaticamente) |
| `updatePartidaRapida(id, updates)` | Atualiza dados da partida |
| `deletePartidaRapida(id)` | Remove partida |
| `fetchPartidaRapidaJogadores(partidaId)` | Lista jogadores da partida |
| `addJogadorToPartidaRapida(partidaId, jogadorId)` | Adiciona jogador à partida |
| `removeJogadorFromPartidaRapida(partidaId, jogadorId)` | Remove jogador da partida |
| `setPartidaRapidaJogadores(partidaId, jogadorIds)` | Define lista de jogadores (substitui todos) |
| `fetchPartidaRapidaPresencas(partidaId)` | Lista presenças da partida |
| `upsertVotoPresenca(...)` | Jogador vota se vai ou não à partida (via link) |
| `marcarAusentesAutomatico(partidaId)` | Marca como ausente jogadores que não votaram |
| `updatePresencaFinal(...)` | Admin confirma presença final de um jogador |
| `fetchVotoHistorico(partidaId, jogadorId)` | Busca histórico de votos de um jogador |
| `fetchGolsPendentes(partidaId)` | Lista gols pendentes de aprovação |
| `createGolPendente(partidaId, jogadorId, quantidade)` | Jogador registra gol via link público |
| `updateGolPendenteStatus(id, status)` | Admin aprova ou rejeita gol pendente |
| `deleteGolPendente(id)` | Remove gol pendente |
| `fetchJogadoresByPartidaRapida(partidaId)` | Lista jogadores com dados completos |

---

## 6. Partidas Amistosas

> Jogo único contra um adversário externo. Admin seleciona os jogadores da lista.
> Compartilhamento de gols via WhatsApp (sem link de presença — admin marca manualmente).

### Interfaces

| Interface | Descrição |
|-----------|-----------|
| `DbPartidaAmistosa` | Partida amistosa |
| `DbPartidaAmistosaJogador` | Jogador selecionado para a amistosa (com campo `compareceu`) |
| `DbPartidaAmistosaGol` | Gol registrado na amistosa (com status de aprovação) |

```ts
// DbPartidaAmistosa
{
  id, user_id, data, hora, local
  adversario: string          // nome do adversário
  status: 'agendada' | 'em_andamento' | 'finalizada'
  gols_nos: number
  gols_adversario: number
  codigo_presenca: string     // gerado automaticamente
  codigo_gols: string         // gerado automaticamente (link compartilhável)
  created_at
}

// DbPartidaAmistosaJogador
{ id, partida_id, jogador_id, compareceu: boolean | null }

// DbPartidaAmistosaGol
{ id, partida_id, jogador_id, quantidade, status: 'pendente' | 'aprovado' | 'rejeitado', created_at }
```

### Funções

| Função | Descrição |
|--------|-----------|
| `fetchPartidasAmistosas(ownerUserId?)` | Lista amistosas do owner |
| `createPartidaAmistosa(amistosa)` | Cria nova amistosa |
| `updatePartidaAmistosa(id, updates)` | Atualiza placar/status |
| `deletePartidaAmistosa(id)` | Remove amistosa |
| `fetchPartidaAmistosaByCodigoPresenca(codigo)` | Busca amistosa pelo código de presença |
| `fetchPartidaAmistosaJogadores(partidaId)` | Lista jogadores da amistosa |
| `upsertPartidaAmistosaJogador(item)` | Insere/atualiza jogador na amistosa |
| `fetchPartidaAmistosaGols(partidaId)` | Lista gols da amistosa |
| `upsertPartidaAmistosaGol(item)` | Insere/atualiza gol |
| `updatePartidaAmistosaGol(id, updates)` | Atualiza status do gol (aprovado/rejeitado) |
| `fetchAmistosaByCodigoGols(codigo)` | Busca amistosa pelo código de gols (link público) — via RPC |
| `fetchJogadoresByPartidaAmistosa(partidaId)` | Lista jogadores com dados completos — via RPC |
| `createAmistosaGolPendente(partidaId, jogadorId, quantidade)` | Jogador registra gol via link público — via RPC |

---

## 7. Financeiro (Caixa)

> Controle de mensalidades bimestral. Goleiros são automaticamente isentos.
> Inclui despesas com upload de comprovantes.

### Interfaces

```ts
// DbPagamentoPeriodo
{
  id, user_id
  nome: string                  // ex: "Jan-Fev 2026"
  data_inicio: string
  data_fim: string
  saldo_inicial: number
  valor_mensalidade: number     // valor padrão por jogador
  status: 'ativo' | 'fechado'
  responsavel_nome: string | null
  created_at
}

// DbPagamentoJogador
{
  id, periodo_id, jogador_id
  isento: boolean               // true para goleiros
  valor_devido: number
  valor_pago: number
  data_pagamento: string | null
  recebido_por: string | null
  observacao: string | null
  status: 'pendente' | 'pago' | 'isento' | 'parcial'
}

// DbPagamentoDespesa
{
  id, periodo_id
  descricao: string
  valor: number
  data: string | null
  documento_url: string | null  // URL pública no Supabase Storage
  created_at
}
```

### Funções

| Função | Descrição |
|--------|-----------|
| `fetchPagamentoPeriodos(ownerUserId?)` | Lista períodos financeiros do owner |
| `createPagamentoPeriodo(periodo)` | Cria novo período |
| `updatePagamentoPeriodo(id, updates)` | Atualiza período (nome, saldo, status) |
| `fetchPagamentoJogadores(periodoId)` | Lista jogadores/status de pagamento do período |
| `upsertPagamentoJogador(item)` | Insere/atualiza jogador no período |
| `marcarPagamento(id, valorPago, valorDevido, recebidoPor, observacao?, dataPagamento?)` | Registra pagamento recebido |
| `cancelarPagamento(id)` | Cancela pagamento (volta para pendente) |
| `fetchPagamentoDespesas(periodoId)` | Lista despesas do período |
| `createPagamentoDespesa(despesa)` | Registra nova despesa |
| `deletePagamentoDespesa(id)` | Remove despesa |
| `getSaldoPeriodo(periodoId)` | Calcula saldo atual (saldo_inicial + pagamentos − despesas) |
| `uploadDocumentoFinanceiro(file)` | Faz upload de comprovante no Supabase Storage, retorna URL |
| `initializePeriodoJogadores(periodoId, jogadores, valorMensalidade)` | Inicializa todos os jogadores ativos no período — goleiros são automaticamente marcados como isentos |

> **Regra:** Saldo = `saldo_inicial + SUM(valor_pago dos não-isentos) − SUM(despesas)`

---

## 8. Dashboard Público (Stats)

> Página pública acessível via token único. Sem autenticação.

### Interfaces

```ts
export interface PublicStatsJogador {
  id, name, nickname
  presencas: number
  faltas: number
  gols: number              // total (todas as modalidades)
  gols_rapidas: number
  gols_amistosa: number
  gols_camp: number
  presencas_amistosa: number
}

export interface PublicStatsDespesa {
  id, descricao, valor, data
  documento_url: string | null   // link para download do comprovante
}

export interface PublicStatsPagador {
  jogador_id, name, nickname
  status: 'pendente' | 'parcial' | 'pago' | 'isento'
  valor_devido: number
  valor_pago: number
  isento: boolean
  data_pagamento: string | null
}

export interface PublicStats {
  total_partidas: number
  saldo_caixa: number | null
  periodo_nome: string | null
  despesas: PublicStatsDespesa[]
  pagadores: PublicStatsPagador[]
  jogadores: PublicStatsJogador[]
}
```

### Funções

| Função | Descrição |
|--------|-----------|
| `fetchStatsToken(ownerUserId)` | Busca token de stats do owner (ou via RPC se moderador) |
| `generateStatsToken(ownerUserId)` | Gera/regenera token de stats |
| `fetchPublicStatsByToken(token)` | Busca estatísticas completas pelo token — chamada sem auth |

### Abas do Dashboard Público (`/stats/:token`)

| Aba | Conteúdo |
|-----|----------|
| ⚡ Rápidas | Artilheiros (`gols_rapidas`) + Ranking de presença |
| ⚔️ Amistosos | Artilheiros (`gols_amistosa`) + Ranking de presença (`presencas_amistosa`) |
| 🏅 Camp. | Artilheiros (`gols_camp`) |
| ❌ Faltas | Ranking de faltas |
| 💰 Caixa | Saldo do período ativo + lista de pagamentos (com Goleiro — Isento) + despesas (com download de comprovante) |

---

## 9. Moderadores e Grupos

> Um owner pode autorizar moderadores a gerenciar seus dados.

### Interfaces

```ts
// DbModerador
{
  id, owner_user_id, moderator_user_id
  email: string
  status: 'ativo' | 'inativo'
  created_at
}

// DbGroup
{
  owner_user_id: string
  owner_email: string
}
```

### Funções

| Função | Descrição |
|--------|-----------|
| `fetchModeradoresByOwner()` | Lista moderadores do owner logado |
| `addModerador(ownerUserId, email)` | Convida moderador pelo e-mail |
| `removeModerador(id)` | Remove moderador |
| `fetchMyGroups()` | Lista grupos que o usuário logado modera |

> **Contexto:** `AuthContext` mantém `effectiveUserId` (owner real) e `currentOwnerId` (owner gerenciado). Em modo moderador, todas as queries usam `effectiveUserId` do owner.

---

## 10. Relatórios

| Função | Descrição |
|--------|-----------|
| `fetchRelatorioFaltasMensal(year, month)` | Relatório de faltas do mês (para WhatsApp) |
| `fetchRelatorioFaltasPeriodo(startDate, endDate)` | Relatório de faltas em um período |
| `fetchRelatorioPartidaRapida(partidaId)` | Relatório completo de uma partida rápida |
| `fetchRelatorioCampeonato(campeonatoId)` | Relatório completo do campeonato (classificação + artilheiros + cartões) |

---

## 11. Páginas do App

### Rotas (`src/App.tsx`)

| Rota | Página | Descrição |
|------|--------|-----------|
| `/` | `Index` | Dashboard principal com atalhos |
| `/players` | `Players` | Lista e gerência de jogadores |
| `/rankings` | `Rankings` | Rankings por modalidade (Rápidas / Camp. / Amistosas / Geral / Mês) |
| `/relatorios` | `Relatorios` | Relatórios por partida, mensal ou período |
| `/campeonatos` | `Campeonatos` | Lista de campeonatos |
| `/campeonato/:id` | `CampeonatoDetalhe` | Detalhe do campeonato (times, partidas, classificação) |
| `/campeonato/:id/partida/:partidaId` | `PartidaCampeonatoDetalhe` | Placar + gols + cartões da partida |
| `/partidas-rapidas` | `PartidasRapidas` | Lista de partidas rápidas |
| `/partida-rapida/:id` | `PartidaRapidaDetalhe` | Detalhe (presença, gols, aprovações) |
| `/partida-amistosa` | `PartidasAmistosas` | Lista de amistosas |
| `/partida-amistosa/nova` | `NovaPartidaAmistosa` | Formulário de criação |
| `/partida-amistosa/:id` | `PartidaAmistosaDetalhe` | Detalhe (presença manual, gols, aprovações) |
| `/financeiro` | `Financeiro` | Lista de períodos de pagamento |
| `/financeiro/:periodoId` | `FinanceiroPeriodo` | Detalhe do período (pagamentos, despesas, resumo) |
| `/configuracoes` | `Configuracoes` | Token de stats, moderadores, dados do perfil |

### Rotas Públicas (sem autenticação)

| Rota | Página | Descrição |
|------|--------|-----------|
| `/stats/:token` | `StatsPublica` | Dashboard público com estatísticas e caixa |
| `/presenca-rapida/:codigo` | `PresencaRapida` | Jogador confirma presença em partida rápida |
| `/gols/:codigo` | `LancarGols` | Jogador registra gols via link |

---

## 12. SQL / RPCs no Supabase

Todas as RPCs estão definidas em `supabase_migrations.sql`.

### RPCs de Acesso Público (sem auth)

| RPC | Parâmetros | Descrição |
|-----|-----------|-----------|
| `get_public_stats_by_token(p_token)` | TEXT | Retorna todas as stats públicas: jogadores, pagamentos, despesas, saldo |
| `get_amistosa_by_codigo_gols(p_codigo)` | TEXT | Busca amistosa pelo código de gols |
| `get_jogadores_publicos_by_amistosa(p_partida_id)` | UUID | Lista jogadores de uma amistosa (para página de gols pública) |
| `create_amistosa_gol_pendente(p_partida_id, p_jogador_id, p_quantidade)` | UUID, UUID, INT | Registra gol pendente via link público |

### RPCs Autenticadas

| RPC | Parâmetros | Descrição |
|-----|-----------|-----------|
| `manage_stats_token_for_owner(p_owner_id, p_generate)` | UUID, BOOL | Gera ou busca token de stats do owner (suporta moderador) |
| `get_saldo_periodo(p_periodo_id)` | UUID | Calcula saldo do período financeiro |

### Tabelas Principais

| Tabela | Descrição |
|--------|-----------|
| `jogadores` | Cadastro de jogadores |
| `campeonatos` | Campeonatos |
| `campeonato_times` | Times de campeonato |
| `campeonato_time_jogadores` | Jogadores nos times |
| `campeonato_partidas` | Partidas de campeonato |
| `campeonato_gols` | Gols de campeonato |
| `campeonato_cartoes` | Cartões de campeonato |
| `partidas_rapidas` | Partidas rápidas |
| `partida_rapida_presencas` | Presenças nas partidas rápidas |
| `partida_rapida_gols_pendentes` | Gols pendentes de aprovação |
| `partidas_amistosas` | Partidas amistosas |
| `partidas_amistosas_jogadores` | Jogadores nas amistosas |
| `partidas_amistosas_gols` | Gols nas amistosas |
| `pagamento_periodos` | Períodos de pagamento (bimestral) |
| `pagamento_jogadores` | Status de pagamento por jogador |
| `pagamento_despesas` | Despesas do período |
| `profiles` | Perfis de usuário (inclui `stats_token`) |
| `app_moderadores` | Relação owner ↔ moderador |

### Políticas de Segurança (RLS)

Todas as tabelas têm Row Level Security ativado. As políticas seguem o padrão:
- **Owner:** `auth.uid() = user_id`
- **Moderador:** `EXISTS (SELECT 1 FROM app_moderadores WHERE owner_user_id = user_id AND moderator_user_id = auth.uid() AND status = 'ativo')`
- **Público:** `true` (apenas SELECT, via código/token único)
- **RPCs `SECURITY DEFINER`:** validam `auth.uid()` internamente antes de operar

---

*Gerado automaticamente em 2026-03-14*
