# Gerênciador de Tabela - Campeonato de futebol

Tabela do campeonato de futebol desenvolvida em Typescript que usa o Sequelize para se conectar com um banco de dados MySQL para gerenciar times, partidas e usuários.

## Ações disponibilizadas: 

- **Autenticação e Autorização**: Os usuários logados podem adicionar e atualizar o progresso das partidas. 
- **Filtros**: Os usuários podem visualizar todas as correspondências ou filtrar se estão em andamento ou não, visualizar o placar completo ou filtre por origem da equipe (casa ou fora).

## Habilidades e Bibliotecas que contém neste projeto: 

Neste projeto pude práticar e aprimorar meus conhecimentos em:

- **Autenticação e Autorização** com **JWT** via token.
- **TypeScript** como dependência de desenvolvimento.
- **Docker** como forma de virtualizar aplicações no conceito de “containers”.
- **NodeJS** como um interpretador de JavaScript fora do ambiente do navegador web.
- **MySQL** para gerenciamento de banco de dados .
- **Testes de integração** com  **Mocha**, **Chai** para garantir a qualidade do código e testar possíveis interações do usuário.
- **Arquitetura MSC** arquitetura relacionada a organização do sistema.
- **OOP com SOLID** programação orientada a objetos ultilizando os principios do SOLID.
---


## Instalando e executando a aplicação

Após clonar o repositório navegue até a sua pasta e instale as dependências do projeto.

```
cd tabela-campeonato-brasileiro
npm install
```
Execute o aplicativo com o Docker (as configurações de composição foram desenvolvidas pela equipe do Trybe)

```
cd app
docker-compose up -d
```

Execute o aplicativo front-end depois de executar o Docker
O front-end foi desenvolvido pela equipe da Trybe

```
cd frontend
npm start
```
No navegador acessar a rota

```
localhost://3000/
```

***Rodar testes no back-end***

Você precisa estar dentro da pasta **app/backend**

```
npm run test
```

***Para rodar a cobertura dos teste de integração***


```
npm run test:coverage
```

<!-- ## Layout:

![](./src/asserts/layout.png) -->