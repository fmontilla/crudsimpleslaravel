crudsimpleslaravel

CRUD simples desenvolvido em Laravel 5.8 + Vue.js.

Ao rodar esse projeto, será possível gerenciar dados de Médico, manipulando dados como nome, CRM, telefone e especialidades. A estrutura da API foi desenvolvida camadas para se tratar melhor os dados, onde o Controller só recebe os dados e envia para uma classe de Service para tomar as decisões. Na Service é feito o envio dos dados para realizar Validação em suas devidas classes de Validações, enviado dados para classes de Repository para se interagir com banco de dados, e após tudo ser salvo no banco de dados, é devolvido para a interface através da API a resposta de sucesso, ou os dados solicitados caso seja uma requisição do tipo GET.

Para rodar esse projeto, é necessário ter instalado:

    Git;
    Composer;
    PHP 7.1 >;
    Node;
    Mysql;

Instalação

    git clone git@github.com:fmontilla/crudsimpleslaravel.git
    Entrar na pasta do projeto via terminal e dar permissão 777 para a pasta storage
    Entrar na pasta do projeto via terminal e rodar o comando composer install
    Configurar no arquivo .env os dados de conexão ao banco de dados
    Rodar no terminal o comando php artisan migrate --seed
    Rodar no terminal o comando yarn install ou npm install
    Rodar no terminal o comando npm run dev ou yarn watch
    Rodar o comando php artisan serve para iniciar o servidor da aplicação ou configurar a aplicação para rodar encima de outro servidor, por exemplo nginx, xampp, wamp, etc
