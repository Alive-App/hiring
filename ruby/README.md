# Background

Um novo cliente contratou a Alive para desenvolver uma loja virtual especializada na venda de aparelhos de telefonia celular. Para criar o inventário inicial da loja, com todos os telefones disponíveis, o estoque e seus preços, enviou arquivos CSV com os dados a incluir. Informou também que periodicamente precisará atualizar o inventário com planilhas idênticas.

Para facilitar esse processo, é necessário criar uma interface para upload desses arquivos, e uma segunda interface que permita que a pessoa avalie o inventário da loja, mostrando aparelhos, valores e quantidades, assim como dando a possibilidade de aplicar alguns filtros.

# Requisitos

1. O usuário fará upload de um arquivo .csv no formato fornecido em `input_valid` através de um formulário;
2. Os dados contidos no arquivo serão normalizados e salvos em um banco de dados relacional;
3. O usuário será redirecionado para a página com o inventário, que indicará o sucesso ou falha da importação (preferencialmente com o motivo, no caso de falha);
4. O usuário poderá visualizar os dados importados e buscá-los por fabricante, modelo e modalidade de venda (pré- ou pós-pago).

# Observações:

- A aplicação deve ser feita usando ferramentas do universo Ruby (Rails, Sinatra, Roda, Cuba, Hanami, etc);
- Não é necessário se preocupar com autenticação;
- Aspectos estéticos não são primordiais;
- A aplicação deverá ter testes automatizados.

# Procedimento para entrega do teste:

1. Faça o fork desse projeto no github;
2. Codifique a aplicação nesse fork;
3. Escreva um README explicando como rodar sua aplicação e os testes. Dê o máximo de detalhes;
4. Abra um pull request quando estiver pronto.

# Tecnologias utilizadas:

- Ruby 3.0.0p0
- Rails 6.1.1
- Banco de dados Postgresql

# Gems mais utilizadas:
- gem 'pg'
- gem 'rspec-rails'
- gem 'ransack'

# Iniciar o projeto

**Requisitos necessario para iniciar o projeto**

- Ter instalado Ruby na versão 3.0.0 ou superior, Rails na versão 6.1.1 ou superior e o uso do banco de dados Postgresql

**Clonando o projeto**

- Execute o comando  `git clone https://github.com/arissonb/hiring`

**Execução do projeto**

- Entre no projeto e depois entre no repositorio ruby/alive_store
- Execute o comando `bundle install` para instalar todas as gems
- Depois rode o comando `rails db:create db:migrate` para criar o banco de dados e as tabelas
- E por ultimo execute o comando `rails s` para subir a aplicação

