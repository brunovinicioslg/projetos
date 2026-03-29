# Guia do Usuário – ACE/CDL Lagoa Grande
**Associação de Comerciantes de Lagoa Grande**

---

## Sumário

1. [Acesso ao Sistema](#1-acesso-ao-sistema)
2. [Dashboard](#2-dashboard)
3. [Associados](#3-associados)
4. [Financeiro](#4-financeiro)
5. [Eventos](#5-eventos)
6. [Produtos](#6-produtos)
7. [Bancos](#7-bancos)
8. [Vendas Avulsas (POS)](#8-vendas-avulsas-pos)
9. [Caixa](#9-caixa)
10. [Relatórios](#10-relatórios)
11. [Usuários](#11-usuários)
12. [Configurações](#12-configurações)
13. [Backup & Restauração](#13-backup--restauração)
14. [Perfis de Acesso](#14-perfis-de-acesso)

---

## 1. Acesso ao Sistema

1. Abra o navegador e acesse o endereço do sistema (ex: `http://seuservidor.com.br`).
2. Na tela de login, informe:
   - **E-mail:** `cdllagoagrande@gmail.com`
   - **Senha:** `bruno1766`
3. Clique em **Entrar**.

> **Dica:** Use o ícone de olho no campo de senha para visualizar o que está digitando.

---

## 2. Dashboard

O dashboard é a tela inicial e apresenta um resumo completo do sistema:

- **Associados Ativos** – total de associados com status ativo.
- **Inadimplentes** – quantidade de cobranças vencidas e valor total em atraso. Clique para ir ao relatório de inadimplência.
- **Aguardando Valor** – cobranças com valor variável ainda não definido.
- **Receita do Mês** – total de pagamentos recebidos no mês atual.
- **Próximos Eventos** – eventos programados para os próximos 30 dias.
- **Saldo Total em Bancos** – posição consolidada de todas as contas. Clique para ver os extratos.
- **Gráfico de Receita** – evolução dos últimos 6 meses.
- **Maiores Inadimplentes** – lista dos associados com maior dívida.

> **Aviso de Backup:** Se o backup não foi realizado hoje, um alerta laranja aparece no topo. Clique em **Fazer Backup** para não perder dados.

---

## 3. Associados

### Cadastrar novo associado
1. Acesse **Associados** no menu lateral.
2. Clique em **+ Novo Associado**.
3. Preencha os dados: Nome*, CPF, E-mail, Telefone, Empresa, Endereço, Contribuição.
4. Clique em **Salvar**.

### Editar associado
- Clique no ícone de lápis (✏) na linha do associado desejado.
- Altere os campos e clique em **Salvar**.

### Inativar associado
- Clique no ícone de lápis e desmarque o campo **Ativo**.
- O associado deixará de aparecer nos filtros ativos.

### Gerar cobranças mensais
1. Clique no botão **⚡ Gerar Cobranças do Mês**.
2. Confirme a geração. O sistema cria uma cobrança para cada associado ativo com contribuição configurada.

> As cobranças são geradas automaticamente todo dia 1° via cron job, mas o botão permite gerar manualmente a qualquer momento.

---

## 4. Financeiro

### Visualizar cobranças
- Acesse **Financeiro** no menu.
- Use os filtros: **Status** (Pendente / Pago / Vencido), **Tipo**, e **busca por nome**.

### Baixar pagamento individual
1. Clique em **💰 Baixar** na linha da cobrança.
2. Informe: Data de pagamento, Valor, Forma de pagamento, Banco.
3. Clique em **Confirmar Pagamento**.

### Baixa em lote
1. Marque as caixas de seleção das cobranças desejadas.
2. Clique em **Baixa em Lote**.
3. Informe Data, Forma de pagamento e Banco (aplicados a todos os selecionados).
4. Confirme.

### Criar cobrança manual
1. Clique em **+ Nova Cobrança**.
2. Selecione o associado, informe descrição, valor (ou deixe vazio para variável), vencimento e tipo.
3. Clique em **Salvar**.

### Editar cobrança
- Clique no ícone de lápis para alterar descrição, valor ou vencimento de uma cobrança pendente.

---

## 5. Eventos

### Criar evento
1. Acesse **Eventos** no menu.
2. Clique em **+ Novo Evento**.
3. Preencha: Nome*, Data*, Local, Descrição, Valor de inscrição, Máximo de vagas, Slug (para inscrições online).
4. Clique em **Salvar**.

### Gerenciar inscrições
1. Clique no ícone de pessoas (👥) no evento desejado.
2. A lista de inscritos é exibida com status de pagamento.

### Registrar pagamento de inscrição
1. Na lista de inscritos, clique em **💳 Registrar Pagamento**.
2. Informe: Forma de pagamento, Banco, Valor pago.
3. Para **boleto parcelado**: informe o número de parcelas e as datas de vencimento de cada uma.
4. Clique em **Confirmar**.

### Gerenciar parcelas
- Se a inscrição tiver parcelas, clique em **📋 Parcelas** para ver o status de cada uma.
- Clique em **Pagar** em cada parcela para registrar o recebimento.
- Você pode fazer upload do boleto PDF por parcela.

### Adicionar inscrito manualmente
- Na lista de inscritos, clique em **+ Inscrever** e selecione o associado.

### Gerar lista de presença (PDF)
- Clique em **📄 Lista de Presença** no evento para baixar o PDF no formato A4 paisagem com campo de assinatura.

---

## 6. Produtos

### Cadastrar produto
1. Acesse **Produtos** no menu.
2. Clique em **+ Novo Produto**.
3. Informe: Nome*, Valor*, Estoque (opcional), Descrição.
4. Clique em **Salvar**.

### Editar / Inativar produto
- Clique no lápis para editar.
- Desmarque **Ativo** para inativar sem excluir.

> O estoque é decrementado automaticamente quando uma venda avulsa é realizada.

---

## 7. Bancos

### Cadastrar conta bancária
1. Acesse **Bancos** no menu.
2. Clique em **+ Nova Conta**.
3. Informe: Nome da conta*, Tipo (Corrente / Poupança / Investimento / Caixa), Agência, Conta, Saldo Inicial.
4. Clique em **Salvar**.

> **Tipo Caixa:** Use este tipo para representar o dinheiro físico em caixa. É a conta usada para vendas em dinheiro e sangrias.

### Extrato por banco
- Na página de Bancos, clique em **Ver Extrato** para acessar o relatório de movimentações do banco.
- Ou acesse **Relatórios → Extrato por Banco**.

---

## 8. Vendas Avulsas (POS)

### Realizar uma venda
1. Acesse **Vendas** no menu.
2. No painel superior, busque um produto pelo nome ou digite uma descrição livre.
3. Clique no produto para adicioná-lo ao carrinho (a quantidade é incrementada automaticamente se já estiver no carrinho).
4. Ajuste quantidades ou valores diretamente na tabela de itens.
5. Selecione o cliente (associado ou nome livre).
6. Selecione a **Forma de pagamento** e o **Banco/Caixa**.
7. Clique em **Finalizar Venda**.

### Cancelar venda
- No histórico (parte inferior da tela), clique em **Cancelar** na venda desejada.
- O estoque dos produtos é restaurado.

---

## 9. Caixa

### Visualizar saldo e movimentos
1. Acesse **Caixa** no menu.
2. Selecione qual caixa deseja visualizar (bancos do tipo CAIXA).
3. Use os filtros de período (Hoje / Este mês / Intervalo).
4. O painel mostra: Saldo atual, Entradas, Saídas, Sangrias.
5. A tabela de movimentos lista todas as transações (cobranças, vendas, despesas, sangrias).

### Fazer sangria (transferência para banco)
1. Clique em **Fazer Sangria**.
2. Informe: Valor*, Banco de destino*, Descrição.
3. Clique em **Confirmar Sangria**.

> A sangria debita do caixa e credita na conta bancária de destino, ambos os extratos são atualizados.

---

## 10. Relatórios

### Inadimplência
- Aba **Inadimplência**: lista de cobranças vencidas com filtros por período.
- Exportar em **CSV** ou **PDF**.

### Associados
- Aba **Associados**: situação financeira de cada associado.
- Filtro por contribuição, status de pagamento.

### Eventos
- Aba **Eventos**: resumo de inscrições e receita por evento.

### Vendas Avulsas
- Aba **Vendas Avulsas**: total vendido, ticket médio, vendas por forma de pagamento.
- Filtro por período, exportar CSV ou PDF.

### Extrato por Banco
- Aba **Extrato por Banco**: selecione o banco e o período.
- Exibe: Saldo anterior, movimentos (entradas e saídas), Saldo final.
- Exportar em **CSV** ou **PDF** para conciliação bancária.

---

## 11. Usuários

### Criar novo usuário
1. Acesse **Usuários** no menu.
2. Clique em **+ Novo Usuário**.
3. Informe: Nome*, E-mail*, Senha, Perfil (Admin / Financeiro / Associado / Visitante).
4. Opcionalmente, vincule o usuário a um associado cadastrado.
5. Clique em **Salvar**.

### Editar / Inativar usuário
- Clique no lápis para editar dados ou perfil.
- Para inativar, clique no ícone de bloqueio.

---

## 12. Configurações

### Dados da associação
- Nome da associação, CNPJ, endereço, telefone, e-mail.
- Esses dados aparecem nos PDFs e relatórios.

### Logo
- Faça upload do logotipo da associação (aparece nos PDFs).

### Alterar senha
- Informe a senha atual e a nova senha duas vezes.
- Clique em **Salvar**.

---

## 13. Backup & Restauração

### Por que fazer backup?
O backup salva **todos os dados** do sistema (associados, cobranças, eventos, vendas, etc.) em um arquivo JSON que pode ser usado para restaurar o sistema em caso de problemas.

### Fazer backup manual
1. Acesse **Backup** no menu lateral.
2. Clique em **Gerar Backup Agora**.
3. O arquivo `.json` será baixado automaticamente para o seu computador.
4. Salve o arquivo em local seguro (HD externo, Google Drive, pen drive, etc.).

> Um aviso laranja aparece no **Dashboard** sempre que o backup não foi feito no dia atual.

### Frequência recomendada
- **Diariamente**, antes de encerrar o sistema.
- Antes de qualquer importação ou restauração.

### Restaurar backup
1. Acesse **Backup** no menu.
2. Na seção **Restaurar Backup**, clique em "Selecionar arquivo" e escolha o arquivo `.json`.
3. Clique em **Continuar com a restauração**.
4. Leia o aviso e clique em **Sim, restaurar agora**.
5. Aguarde a conclusão (pode levar alguns segundos dependendo do volume de dados).

> **ATENÇÃO:** A restauração apaga **todos os dados atuais** e substitui pelos dados do backup. Esta ação é irreversível.

---

## 14. Perfis de Acesso

| Perfil | Acesso |
|---|---|
| **ADMIN** | Acesso total ao sistema |
| **FINANCEIRO** | Financeiro, Eventos, Vendas, Caixa, Relatórios |
| **ASSOCIADO** | Apenas "Minha Área" (dados e cobranças próprias) |
| **VISITANTE** | Visualização básica |

### Área do Associado
- O associado acessa pelo link `/associado` com seu e-mail e senha.
- Visualiza suas cobranças, histórico de pagamentos e dados cadastrais.
- Pode atualizar seus dados de contato.

---

## Dúvidas ou Problemas?

Entre em contato com o administrador do sistema ou com a empresa responsável pelo suporte técnico.
