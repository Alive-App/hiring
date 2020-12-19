# Technical Alive Test

## Instruções

Os pré-requisitos para rodar o projeto são:
- `ruby` versão 2.7.1
- `rails` versão 6.1.0
- `bundler`

### Instalando as dependências

Rode o comando abaixo para instalar as dependências:

```
bundle install
```

### Rodando o projeto

Se for a primeira vez que estiver executando o projeto, crie seu próprio `.env` baseado no `.env.sample` e substitua com suas variáveis de ambiente:

```
cp .env.sample .env
```

Crie o banco:
    
```
bin/rake db:create
```

Rode as *migrations*:

```
bin/rake db:migrate
```

Para rodar a aplicação execute o seguinte comando:

```
bin/rails server
```

### Testes
Os testes são realizados utilizando o `Minitest`.

Para executar os testes, rode o comando abaixo:
```
bin/rails test
```

### Melhorias

Diversas melhorias podem ser aplicadas, como por exemplo, realizar o processamento da importação em um *background job*, e salvar em uma tabela o resultado da importação para o usuário saber o resultado.
