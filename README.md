#README

###Aplicação foi desenvolvida em rails 5.2.4 e Ruby 2.7.2

#####Para rodar a aplicação faz necessario a instalação do docker e seguir os passos abaixo:

#####Usando Docker & docker-compose

Todos comandos abaixo devem ser executados na raiz do projeto

Construindo a image do projeto com o comando build:
<br>
docker-compose build

Configurando o banco de dados:
<br>
docker-compose run --rm app rails db:setup

Para dar inicio a aplicação:
<br>
docker-compose up

Para abrir a aplicação utilizando o nevagador de preferencia:
<br>
Utilizando linux ou MacOS -> 0.0.0.0:3000
<br>
Utilizando Windows -> localhost:3000

<img src="https://camo.githubusercontent.com/15087e3d1ad946bb181457a1f21d22e93faa3860fdb679da7a39395d87053391/68747470733a2f2f6d656d6567656e657261746f722e6e65742f696d672f696e7374616e6365732f38323333383133382e6a7067"/>

####Executando os testes:

Para executar o teste é necessario executar o seguinte comando na raiz do projeto:
<br>
docker-compose run --rm app rake test


