# Backend do Projeto Agenda

Este é o backend do projeto Agenda, que é construído usando Adonis.js e PostgreSQL como banco de dados.

## Configuração do Banco de Dados

1. Instale o PostgreSQL na sua máquina, se ainda não estiver instalado.
2. Crie um banco de dados com o nome que desejar, sugestao `backendAgenda`.
3. Crie um arquivo `.env` na raiz do projeto com as  informações que serao transmitidas a voce pelo Gestor do Projeto. 

Certifique-se de substituir no arquivo .env`SENHA_DO_BANCO` pela senha que você definiu para o banco de dados e `NOME_DA_PAGINA` pelo nome correto do banco de dados:


## Instalação e Execução

Siga os seguintes passos para configurar e executar o projeto:

1. Execute o comando `npm i` para instalar as dependências do projeto.
2. Instale o Adonis CLI globalmente com o comando `npm install -g @adonisjs/cli`.
3. Instale o pacote `@adonisjs/mail` com o comando `npm install @adonisjs/mail`.
4. Execute as migrações do banco de dados com o comando `adonis migration:run`.
5. Execute as sementes do banco de dados com o comando `adonis seed`.
6. Inicie o servidor de desenvolvimento com o comando `adonis serve --dev`.

Certifique-se de que todas as etapas acima foram concluídas com sucesso antes de começar a usar o backend do projeto Agenda.

## Documentação



