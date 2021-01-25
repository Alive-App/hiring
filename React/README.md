# Buscador de ações

Este é um projeto de desavio da Alive
O objetivo desta Web Application é

- buscar ações
- visualizar dados das ações
- Preço atual;
- Preço histórico;
- Preço atual em comparação a outras ações;
- Projeção de ganhos com compra em data específica.

### Atenção



Antes de tudo
Este projeto utiliza a API da AlphaVantage para obter os dados das ações.

Esta permite a utilização de uma chave gratuíta que pode realizar até 5 consultas por minuto e 500 por dia.

A aplicação lida com esse tipo de limitação de uma forma simples para o entendimento do usuário.
Visando melhorar a experiencia do usuário, sempre que uma ação é visualizada, seus dados são salvos localmente,
permitindo que o usuário visualize mais facilmente os dados que foram baixados anteriormente.

## Demonstração

<!-- O app pode ser visualizado neste [link] -->

Na tela inicial você terá acesso as suas ações favoritadas o menu no topo contendo o botão de pesquisa.
Inicialmente você não terá nenhuma ação favoritada, então toque no botão de pesquisa para buscar suas ações
<img src="https://i.ibb.co/6ybryNB/portfolio.png"/>

Um modal de pesquisa será exibido
<img src="https://i.ibb.co/7QJdKtj/pesquisa.png"/>

Após selecionar uma ação, você será direcionado para a tela de detalhes das ações.
Nesta tela você tem os detalhes da ação como preço, baixa, alta, porcentagem e diferença em relação ao fechamento anterior
<img src="https://i.ibb.co/mXCJM8q/header.png"/>

logo abaixo você verá um gráfico onde é possível visualizar os dados do histórico de preços de acordo com o período selecionado
<img src="https://i.ibb.co/C8vLGg9/grafico.png"/>
Na projeção de ganhos o usuário digita a quantidade de ações, a data inicial e final, assim o site trará a previsão de ganho.
<img src="https://i.ibb.co/qFGmGnY/ganho.png"/>
Para realizar uma comparação, o usuário deve adicionar ações, assim será exibido um gráfico contendo a ação atual e as selecionadas para a comparação.
<img src="https://i.ibb.co/VH5M824/comparacao.png"/>

## Configuração

Para rodar o projeto, basta clonar este repósitório com o `git clone`
rodar o comando `npm i` ou `yarn`
e por fim rodar `npm start` ou `yarn start` e aguardar o projeto abrir no browser

## Teste
Basta rodar o comando ```yarn test```
os testes foram feitos utilizando jest e enzyme
não foi possível completar todos os testes a tempo, então fiz apenas o necessário...
