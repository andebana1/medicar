# Frontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.1.3.


Siga os passos abaixo para configurar o frontend da Medicar.

  - ``npm install -g @angular/cli@10.1.3`` para instalar exatamente a mesma versão utilizada no desenvolvimento do projeto.

  - Dentro do diretório frontend, execute o comando ``npm install`` e aguarde até que todas as dependências sejam instaladas.
  - No arquivo ``/src/environments/environments.ts``. Nesse arquivo, altere os campos "client_id" e "client_secret" para os que foram gerados ao criar a aplicação no setup do backend. Se não sabe o que são essas chaves, volte ao READEME do backend.
  - Os demais valores não precisam ser alterados, a não ser que a porta que esteja executando o Django seja diferente, se for esse o caso, altere o valor na variável ``API``, após ``http://localhost:``. Feito isso, o app já pode ser testado. Execute ``ng serve`` e começe a usar a aplicação.
