# Guia de Instalação — ACE/CDL Lagoa Grande
**Sistema de Gestão v1.1 — Instalação em Servidor Windows**

---

## Índice

1. [Requisitos mínimos do servidor](#1-requisitos-mínimos-do-servidor)
2. [Instalar o Node.js](#2-instalar-o-nodejs)
3. [Instalar o PostgreSQL](#3-instalar-o-postgresql)
4. [Preparar os arquivos do sistema](#4-preparar-os-arquivos-do-sistema)
5. [Executar o instalador automático](#5-executar-o-instalador-automático)
6. [Verificar se tudo funcionou](#6-verificar-se-tudo-funcionou)
7. [Acessar o sistema](#7-acessar-o-sistema)
8. [Configurações pós-instalação](#8-configurações-pós-instalação)
9. [Solução de problemas comuns](#9-solução-de-problemas-comuns)
10. [Desinstalar o sistema](#10-desinstalar-o-sistema)

---

## 1. Requisitos mínimos do servidor

| Item | Mínimo | Recomendado |
|---|---|---|
| Sistema operacional | Windows 10 / Windows Server 2019 | Windows 11 / Server 2022 |
| RAM | 4 GB | 8 GB |
| Espaço em disco | 5 GB livres em C:\ | 20 GB |
| Processador | 2 núcleos | 4 núcleos |
| Rede | Acesso à internet durante a instalação | — |

> **Importante:** O computador deve ficar ligado sempre que o sistema for usado. Ele age como servidor local.

---

## 2. Instalar o Node.js

O Node.js é a plataforma que executa o sistema.

### Passo a passo:

1. Abra o navegador e acesse: **https://nodejs.org**
2. Clique no botão **"20.x.x LTS"** (versão recomendada)
3. Baixe o instalador `.msi` para Windows
4. Execute o instalador baixado:
   - Clique em **Next** em todas as telas
   - Mantenha todas as opções padrão
   - Na tela **"Tools for Native Modules"**: marque a caixa **"Automatically install the necessary tools"**
   - Clique em **Install**
5. Aguarde a instalação concluir e clique em **Finish**
6. Reinicie o computador se solicitado

### Verificar se foi instalado corretamente:

1. Pressione `Windows + R`, digite `cmd` e pressione Enter
2. No prompt, digite:
   ```
   node --version
   ```
3. Deve aparecer algo como: `v20.17.0`
4. Digite também:
   ```
   npm --version
   ```
5. Deve aparecer algo como: `10.8.2`

> Se aparecer `não é reconhecido como comando`, reinicie o computador e tente novamente.

---

## 3. Instalar o PostgreSQL

O PostgreSQL é o banco de dados que armazena todos os dados do sistema.

### Passo a passo:

1. Acesse: **https://www.postgresql.org/download/windows/**
2. Clique em **"Download the installer"**
3. Na tabela, escolha a versão mais recente (ex: **17.x**) para **Windows x86-64**
4. Clique no link de download
5. Execute o instalador baixado:

   **Tela 1 — Installation Directory:** deixe o padrão (`C:\Program Files\PostgreSQL\17`) → **Next**

   **Tela 2 — Select Components:** marque apenas:
   - ✅ PostgreSQL Server
   - ✅ Command Line Tools

   Desmarque: pgAdmin 4, Stack Builder (opcional, não obrigatório) → **Next**

   **Tela 3 — Data Directory:** deixe o padrão → **Next**

   **Tela 4 — Password:**
   > ⚠️ **ANOTE ESTA SENHA!** Ela será pedida pelo instalador do sistema.

   Digite uma senha para o superusuário **postgres** (ex: `postgres2024`) → **Next**

   **Tela 5 — Port:** deixe `5432` → **Next**

   **Tela 6 — Locale:** deixe `Default locale` → **Next**

   **Tela 7 — Pre Installation Summary:** clique em **Next**

   **Tela 8 — Instalando:** aguarde (pode levar alguns minutos)

   **Tela 9 — Completing:** **desmarque** "Stack Builder" → **Finish**

### Verificar se foi instalado:

1. Pressione `Windows + R`, digite `services.msc` e pressione Enter
2. Procure o serviço **"postgresql-x64-17"** (ou similar)
3. Deve estar com **Status: Em Execução** e **Tipo de Inicialização: Automático**

> Se não estiver em execução: clique com botão direito → **Iniciar**

---

## 4. Preparar os arquivos do sistema

Você precisa copiar os arquivos do sistema para o novo servidor.

### Opção A — Via pendrive ou HD externo (recomendado):

1. No computador atual, localize a pasta do sistema:
   ```
   C:\Users\bruno\OneDrive\Área de Trabalho\SISTEMA ACE\
   ```
2. Copie **toda a pasta** para um pendrive ou HD externo
3. No servidor novo, cole a pasta em local de fácil acesso, por exemplo:
   ```
   C:\Temp\SISTEMA ACE\
   ```

### Opção B — Via rede local:

1. No computador atual, compartilhe a pasta do sistema
2. No servidor, acesse pelo caminho de rede `\\NomeComputador\SISTEMACE`
3. Copie para `C:\Temp\SISTEMA ACE\`

### Opção C — Via Google Drive / OneDrive:

1. Faça upload da pasta para o Google Drive ou OneDrive
2. No servidor, faça login e baixe a pasta
3. Extraia/copie para `C:\Temp\SISTEMA ACE\`

---

## 5. Executar o instalador automático

> ⚠️ **O instalador deve ser executado com privilégios de Administrador.**

### Passo a passo:

1. Abra o **Explorador de Arquivos** e navegue até a pasta copiada:
   ```
   C:\Temp\SISTEMA ACE\
   ```

2. Localize o arquivo **`INSTALAR.ps1`**

3. Clique com o **botão direito** sobre ele

4. Clique em **"Executar com PowerShell"**

   > Se aparecer a mensagem *"O Windows não pode executar scripts do PowerShell"*:
   > 1. Abra o menu Iniciar
   > 2. Digite `PowerShell`
   > 3. Clique com **botão direito** no Windows PowerShell → **"Executar como Administrador"**
   > 4. Cole o comando abaixo e pressione Enter:
   >    ```powershell
   >    Set-ExecutionPolicy RemoteSigned -Scope LocalMachine -Force
   >    ```
   > 5. Feche o PowerShell e tente executar o `INSTALAR.ps1` novamente

5. Se aparecer a janela **"Controle de Conta de Usuário (UAC)"**, clique em **Sim**

6. O instalador abrirá uma janela preta com o título **"Instalador ACE/CDL Lagoa Grande"**

### O que o instalador vai pedir:

**Pergunta 1:** Senha do usuário 'postgres' do PostgreSQL
```
Senha do 'postgres': ****
```
→ Digite a senha que você definiu no passo 3 (instalação do PostgreSQL)

**Pergunta 2:** Porta do PostgreSQL
```
Porta do PostgreSQL [Enter = 5432]:
```
→ Pressione **Enter** (para usar a porta padrão 5432)

### O que acontece durante a instalação:

O instalador exibirá o progresso de cada etapa:

```
==> Verificando Node.js...
    [OK]  Node.js v20.17.0

==> Verificando espaco em disco...
    [OK]  15.3 GB livres em C:\ — suficiente

==> Localizando PostgreSQL...
    [OK]  PostgreSQL encontrado em: C:\Program Files\PostgreSQL\17\bin

==> Configurando banco de dados PostgreSQL...
    [OK]  Usuario 'bruno' configurado
    [OK]  Banco 'sistema_ace' criado
    [OK]  Conexao testada com sucesso

==> Copiando arquivos para C:\SistemaACE...
    Copiando backend... OK
    Copiando frontend... OK

==> Instalando dependencias...
...
==> Configurando banco de dados (migrations e seed)...
    [OK]  Usuario admin criado: cdllagoagrande@gmail.com

==> Iniciando servicos com PM2...
    [OK]  Servicos iniciados

==> Configurando inicio automatico no boot...
    [OK]  Tarefa 'ACE-CDL-Startup' criada no Task Scheduler

==> Configurando Firewall do Windows...
    [OK]  Porta 3000/TCP liberada
    [OK]  Porta 8080/TCP liberada
```

> ⏱ **Tempo estimado:** de 5 a 15 minutos dependendo da velocidade da internet e do computador.

### Ao final:

O instalador exibirá:
```
╔══════════════════════════════════════════════════════════════╗
║            INSTALACAO CONCLUIDA COM SUCESSO!                 ║
╚══════════════════════════════════════════════════════════════╝

  ACESSO AO SISTEMA:
  ► http://localhost:8080
  ► http://IP-DO-SERVIDOR:8080

  CREDENCIAIS DO ADMIN:
  ► E-mail : cdllagoagrande@gmail.com
  ► Senha  : bruno1766
```

Pressione **Enter** para fechar.

---

## 6. Verificar se tudo funcionou

### Teste 1 — Abrir o sistema no navegador:

1. Abra o **Google Chrome** ou **Microsoft Edge**
2. Digite na barra de endereço:
   ```
   http://localhost:8080
   ```
3. Deve aparecer a tela de login do **ACE/CDL Lagoa Grande**

### Teste 2 — Fazer login:

1. Digite o e-mail: `cdllagoagrande@gmail.com`
2. Digite a senha: `bruno1766`
3. Clique em **Entrar**
4. Deve aparecer o **Dashboard** do sistema

### Teste 3 — Verificar se os processos estão rodando:

1. Abra o **Prompt de Comando** (`Windows + R` → `cmd`)
2. Digite:
   ```
   pm2 status
   ```
3. Deve aparecer uma tabela com dois processos em verde:
   ```
   ┌────┬──────────────┬─────────┬────────┬──────────┐
   │ id │ name         │ status  │ cpu    │ mem      │
   ├────┼──────────────┼─────────┼────────┼──────────┤
   │ 0  │ ace-backend  │ online  │ 0%     │ 80 MB    │
   │ 1  │ ace-frontend │ online  │ 0%     │ 20 MB    │
   └────┴──────────────┴─────────┴────────┴──────────┘
   ```

### Teste 4 — Verificar o início automático:

1. **Reinicie o computador** (Iniciar → Reiniciar)
2. Aguarde o Windows carregar completamente (~1 minuto)
3. Abra o navegador e acesse `http://localhost:8080`
4. O sistema deve carregar automaticamente, sem necessidade de abrir nada manualmente

---

## 7. Acessar o sistema

### Da mesma máquina onde foi instalado:
```
http://localhost:8080
```

### De outro computador na mesma rede (ex: de um notebook):

1. No servidor, descubra o IP da máquina:
   - Pressione `Windows + R`, digite `cmd`, pressione Enter
   - Digite: `ipconfig`
   - Anote o **Endereço IPv4** (ex: `192.168.1.100`)

2. No outro computador, abra o navegador e acesse:
   ```
   http://192.168.1.100:8080
   ```

> **Dica:** Para facilitar, salve o endereço como favorito no navegador de cada computador que for usar o sistema.

---

## 8. Configurações pós-instalação

### 8.1 — Configurar o diretório de backup

Por padrão, os backups são salvos em `C:\SistemaACE\backups\`. Recomendamos mudar para um HD externo ou pasta de rede:

1. Acesse o sistema: `http://localhost:8080`
2. Faça login com `cdllagoagrande@gmail.com` / `bruno1766`
3. No menu lateral, clique em **Backup**
4. Na seção **Configurações de Backup**, clique em **Alterar**
5. Digite o caminho desejado, por exemplo:
   - HD externo: `D:\Backups\ACE`
   - Pasta de rede: `\\servidor-nas\backups\ace`
6. Clique em **Salvar**

### 8.2 — Fazer o primeiro backup

1. No menu lateral, clique em **Backup**
2. Clique em **Gerar Backup Agora**
3. O arquivo será salvo no diretório configurado E baixado para o seu computador
4. Guarde o arquivo em local seguro

### 8.3 — Alterar a senha do administrador (recomendado)

1. Acesse o sistema
2. No menu lateral, clique em **Configurações**
3. Vá em **Alterar Senha**
4. Digite a senha atual (`bruno1766`) e a nova senha desejada

### 8.4 — Configurar os dados da associação

1. No menu lateral, clique em **Configurações**
2. Preencha os dados: Nome, CNPJ, endereço, telefone
3. Faça upload do logotipo (aparece nos PDFs e relatórios)
4. Clique em **Salvar**

### 8.5 — Cadastrar os bancos e contas

1. No menu lateral, clique em **Bancos**
2. Cadastre as contas bancárias da associação (Corrente, Poupança, etc.)
3. Cadastre também uma conta do tipo **Caixa** para controle do dinheiro físico

---

## 9. Solução de problemas comuns

### ❌ "O sistema não abre no navegador"

**Causa:** Os serviços podem não estar rodando.

**Solução:**
1. Abra o Explorador de Arquivos e vá em `C:\SistemaACE\`
2. Dê duplo clique em **INICIAR.bat**
3. Aguarde alguns segundos e tente acessar `http://localhost:8080` novamente

---

### ❌ "Tela branca ou erro ao fazer login"

**Causa:** O backend (API) não está respondendo.

**Solução:**
1. Abra o **Prompt de Comando** e execute:
   ```
   pm2 logs ace-backend --lines 50
   ```
2. Procure por mensagens de erro em vermelho
3. Se aparecer erro de banco de dados: verifique se o PostgreSQL está rodando (ver passo 3)

---

### ❌ "Erro de conexão com o banco de dados"

**Causa:** O serviço do PostgreSQL parou.

**Solução:**
1. Pressione `Windows + R`, digite `services.msc`, pressione Enter
2. Localize **postgresql-x64-17** (ou similar)
3. Clique com botão direito → **Iniciar**
4. Depois execute `INICIAR.bat` em `C:\SistemaACE\`

---

### ❌ "O instalador exibiu ERRO FATAL"

**Causa 1 — Senha errada do postgres:**
- Execute o instalador novamente e informe a senha correta

**Causa 2 — PostgreSQL não está rodando:**
- Abra `services.msc` e inicie o serviço PostgreSQL
- Execute o instalador novamente

**Causa 3 — Sem acesso à internet:**
- O instalador precisa baixar dependências do npm
- Verifique a conexão e execute novamente

**Causa 4 — Política de execução de scripts bloqueada:**
- Abra o PowerShell como Administrador e execute:
  ```powershell
  Set-ExecutionPolicy RemoteSigned -Scope LocalMachine -Force
  ```
- Tente executar o instalador novamente

---

### ❌ "O sistema não inicia automaticamente após reiniciar"

**Causa:** A tarefa do Task Scheduler pode não ter sido criada.

**Solução:**
1. Pressione `Windows + R`, digite `taskschd.msc`, pressione Enter
2. No painel esquerdo, clique em **Biblioteca do Agendador de Tarefas**
3. Procure a tarefa **"ACE-CDL-Startup"**
4. Se não existir, abra o PowerShell como Administrador e execute:
   ```powershell
   schtasks /Create /TN "ACE-CDL-Startup" /TR "C:\SistemaACE\iniciar-servicos.bat" /SC ONSTART /DELAY 0000:15 /RU SYSTEM /F
   ```
5. Reinicie e teste

---

### ❌ "Acesso negado ao acessar de outro computador"

**Causa:** O firewall pode estar bloqueando as portas.

**Solução:**
1. Abra o PowerShell como Administrador
2. Execute:
   ```powershell
   netsh advfirewall firewall add rule name="ACE-Backend" dir=in action=allow protocol=TCP localport=3000 profile=any
   netsh advfirewall firewall add rule name="ACE-Frontend" dir=in action=allow protocol=TCP localport=8080 profile=any
   ```

---

### ❌ "Esqueci a senha do administrador"

**Solução:**
1. Abra o **Prompt de Comando** na pasta do backend:
   ```
   cd C:\SistemaACE\backend
   ```
2. Execute (substitua `NOVA_SENHA` pela senha desejada):
   ```
   node -e "const {PrismaClient}=require('@prisma/client');const bcrypt=require('bcrypt');const p=new PrismaClient();bcrypt.hash('NOVA_SENHA',12).then(h=>p.user.update({where:{email:'cdllagoagrande@gmail.com'},data:{password:h}})).then(()=>console.log('Senha alterada!')).finally(()=>p.$disconnect());"
   ```

---

## 10. Desinstalar o sistema

Caso precise remover o sistema completamente:

1. Abra o **Prompt de Comando** como Administrador

2. Pare e remova os serviços PM2:
   ```
   pm2 stop all
   pm2 delete all
   ```

3. Remova a tarefa do Task Scheduler:
   ```
   schtasks /Delete /TN "ACE-CDL-Startup" /F
   ```

4. Remova as regras do firewall:
   ```
   netsh advfirewall firewall delete rule name="ACE-Backend-API"
   netsh advfirewall firewall delete rule name="ACE-Frontend-Web"
   ```

5. Exclua a pasta do sistema:
   ```
   rmdir /S /Q C:\SistemaACE
   ```

6. Para remover o banco de dados (⚠️ **apaga todos os dados!**):
   - Abra o **pgAdmin** ou o **psql** como postgres
   - Execute:
     ```sql
     DROP DATABASE sistema_ace;
     DROP USER bruno;
     ```

> O Node.js e o PostgreSQL **não são desinstalados** automaticamente — use o "Adicionar ou Remover Programas" do Windows se quiser removê-los.

---

## Resumo rápido

```
1. Instale Node.js 20 LTS          → https://nodejs.org
2. Instale PostgreSQL 17           → https://postgresql.org/download/windows
3. Copie a pasta "SISTEMA ACE" para o servidor
4. Clique com botão direito em INSTALAR.ps1 → Executar com PowerShell
5. Informe a senha do postgres quando solicitado
6. Aguarde 5-15 minutos
7. Acesse: http://localhost:8080
8. Login: cdllagoagrande@gmail.com / bruno1766
```

---

*Documento gerado em 2026 — ACE/CDL Lagoa Grande v1.1*
