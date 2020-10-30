# App

Things you may want to cover:

* Ruby version

  2.7.0 (uso do rvm é recomendado)

* System dependencies

  Este projeto possui jobs assincronos gerenciado pelo sidekiq, para a execução dele em ambiente de dev criar uma instancia no docker é a forma mais rápida de inicializar a execução para isso basta executar o comando `docker run -d --name csv -p 6379:6379 redis:latest` já tendo o docker instalado na máquina local

* Configuration

executar `bin/setup` para instalar todas as dependencias necessárias, isso também irá rodar as migrations em um banco de dados sqlite3, por isso não é necessário fazer mais nada para inicializar o banco de dados, contanto que se rode a aplicação em um sistema unix-like

* How to run the test suite
  
 Para executar os testes, basta rodar rspec, no ambiente de testes o redis **não** é necessário, todos os jobs serão executados de forma sincrona nele
  
* Services (job queues, cache servers, search engines, etc.)

Para inicializar a aplicação em ambiente de desenvolvimento são necessários dois comandos, `bundle exec sidekiq -q development_default` e `rails s`, com isso já será possível ver a execução em localhost:3000 no seu browser

* Validação de CSV

Os csvs enviados são validados usando REGEX, essa abordagem traz um ganho de performance de até 10x, nos worst cases, quando comparado a execução de uma validação com qualquer ferramenta de parse de arquivos CSV, além de poder ser feita enquanto o arquivo ainda está registrado como temporário na aplicação, evitando assim que os dados enviados sejam persistidos de maneira desnecessária na memória caso a aplicação seja executada em produção

* Jobs assincronos

Arquivos CSV sendo processados de maneira sincrona, após um determinado ponto podem causar instabilidades na aplicação, caso um arquivo de 2GB fosse enviado por um usuario a aplicação demoraria tempo demais entre a requisição e a resposta, causando uma experiencia ruim para o usuário, colocando em jobs assincronos o processamento, a aplicação se torna mais resistente a falhas além de mais escalavel e com a opção de tentativas repetidas em caso de alguma falha
