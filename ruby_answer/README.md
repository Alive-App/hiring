# README

* Esta aplicação, consiste no resultado do desafio proposto para o processo seletivo de analista BackEnd da Alive App.

* O Projeto foi desenvolvido com o framework Ruby on Rails e com o banco de dados postgresql.

* Para inicialização do projeto, rodar os seguintes comandos: 

** bundle install
** rake db:create
** rake db:migrate

* O projeto consiste no upload, normalização e visualização de um arquivo CSV.

* O upload de celulares pode ser feito através do link disponível na página inicial ou 
  pela rota /phones/upload/ .

* Caso a importação tenha erros, o usuário será redirecionado para uma página com a listagem
dos errors, caso contrário ele será redirecionado para a página principal, onde poderá visualizar
os dados importados.

* O arquivo csv deve obedecer o formato padrão. Um arquivo de exemplo está disponível na raiz
  do projeto com o nome phones.csv

* Os testes foram realizados com a ferramenta Rspec e devem ser executados através do comando rspec.

