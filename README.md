# dev.finance
Projeto maratona-1 discover da RocketSeat (dev.finance) + implementação do back-end e banco de dados sqlite.

<div align="center">
  <img src="https://user-images.githubusercontent.com/65607009/159952808-4d5f7739-38a4-4dc8-818f-1654cd28c617.png" width="700"/>
</div>

## description
- A aplicação é um organizador de finanças. Assim, ela pode adicionar novas transações, as quais contém descrição, valor e data, na sua tabela e atualizar, em tempo real, 3 cards que apresentam o total dos valores de entrada (valores positivos/ganhos), o total dos valores de saída (valores negativos/perdas) e o total do balanço (entradas - saídas).
  

## functionalities
  - Recebe as informações do banco de dados.
  - cadastra novas informações no banco de dados através de um modal.
  - Deleta informações do banco de dados através de um botão na célula de uma transação.
  - Renderiza em tela as informações recebidas em células na tabela de transações.
  - Renderiza o balanço nos cards em tempo real.
  
## How to use
  - Ao clicar no botão "+ Nova transação" um modal será aberto.
  - Dentro do modal é possivel passar 3 informações para a sua transação, descrição, valor e data.
  - O valor e a data são informações obrigatórias para cadastrar uma nova transação.
  - O botão "cancelar" fecha o modal.
  - o botão "salvar" cadastra as informações passadas no banco de dados e renderiza a transação na tabela.
  - Para excluir uma transação basta clicar no simbolo de - vermelho na própria célula da transação.

## How to run in your computer
  - rode um git clone
  - execute "npm install" para baixar as dependências do node
  - execute "yarn init-db" para inicializar o banco de dados sqlite na sua maquina
  - execute "yarn dev" para iniciar o servidor
  - acesse o browser e entre na porta "http://localhost:4000"
