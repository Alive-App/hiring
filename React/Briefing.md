# Background

Uma corretora de ações está desenvolvendo um sistema para permitir que pequenos investidores possam tomar decisões melhores sobre seu portfólio. Uma das funcionalidades importantes é a de verificar o desempenho de uma ação em cinco cenários:

   - Preço atual;
   - Preço histórico;
   - Preço atual em comparação a outras ações;
   - Projeção de ganhos com compra em data específica.
   
Para isso, a equipe de software da empresa optou por desenvolver um WebAPP que dará visibilidade aos dados. Sua missão para este teste é implementar este WebAPP

# Requisitos técnicos da solução

Sua solução deverá ter testes automatizados.

Para obter as informações das ações utilize a Alpha Vantage (https://www.alphavantage.co). Se você encontrar alguma biblioteca para tal, você está autorizado a utilizar.

O tratamento de erros não será explicitado nos endpoints. O candidato ou candidata poderá inferir casos que poderão gerar erros ou duplicidades nos dados, e tratá-los de acordo. A ausência de tratamento não desqualifica a proposta; a presença, no entanto, contará pontos a favor.

## Projeção de ganhos

A ideia é implementar algo simples, sem preocupações com dividendos, taxas administrativas ou outras incumbências que afetariam o montante total. Em sendo assim, pressuponha que a compradora investiu seu dinheiro numa determinada quantidade de ações de uma empresa em alguma data no passado, e que deseja saber quanto teria ganhado ou perdido caso o fizesse.

# Como enviar sua proposta

- Crie um fork deste repositório;
- Implemente sua solução, fazendo commits da maneira que faria em um projeto profissional;
- Substitua este README com um específico para sua aplicação, indicando como rodá-la, e como executar os testes (fique à vontade para inserir mais detalhes técnicos, caso deseje);
- Abra um pull request para este repositório.

# Detalhamento

## WebAPP

O importante nesta parte do desafio é que saibamos como você lida com os componentes que formam as técnicas contemporâneas de desenvolvimento client-side, no que tange processamento de assets, separação de responsabilidades, minificação, armazenamento local, etc. Por isso, estética não é primordial.

As funcionalidades esperadas são:

- Incluir ações no portifólio;
- Ver situação atual das ações (último preço e data e hora da atualização);
- Ver histórico de preços de uma ação, podendo delimitar datas de início e fim;
- Fazer projeção de ganhos de uma ação, determinando o número de ações compradas e a data de compra no passado.

Se você não tiver ideia de como organizar essas funcionalidades, não há problema nenhum em se inspirar no Google Finance ou fazer uma arquitetura master-detail simples.


https://www.alphavantage.co
