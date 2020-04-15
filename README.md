## Configurando ambiente no Windows:

  * [Chocolatey](https://chocolatey.org/install)
  * [Node](https://chocolatey.org/packages/nodejs)
  * [Yarn](https://chocolatey.org/packages/yarn)
  * [Adonis](https://adonisjs.com/docs/4.1/installation#_installing_adonisjs)
  * [Visual Studio Code](https://code.visualstudio.com/)
  * [Insomnia](http://insomnia.rest/)
 
A instalação do Adonis no entanto, sugiro que seja feita com o comando ``yarn global add @adonisjs/cli``.

### Pode ser necessário reiniciar o PowerShell (ou cmd)
No final das contas, você deverá ver um resultado similar a esse:

![screen](https://i.ibb.co/k38SbGT/ipet-install.png)

### Sua versão do node estará mais recente que a minha, possivelmente versão 13.

## Clonando repositório e primeiros passos

```bash
git clone https://github.com/thiagovasconcellos/iPet.git
```

Navegue o PowerShell para dentro da pasta que foi clonada e digite ``code . `` para abrir o VSCode dentro do projeto.

![vscode](https://i.ibb.co/x3KcQ4f/vscode.png)

O Visual Studio Code possuí um terminal integrado, e os próximos comandos serão executados dentro desse terminal integrado:

![integrated](https://i.ibb.co/TTZ8F6f/integrated.png)

  *``yarn`` -> Esse comando irá instalar todos os pacotes necessários para o projeto funcionar
  
Para testar se o ambiente está funcionando sem problemas, digite o seguinte comando no terminal integrado: 
```bash
adonis serve --dev
```

Você deve visualizar a seguinte tela:

![adonis](https://i.ibb.co/cyhftDK/adonis-serve.png)

## Importando arquivo de rotas

Baixe o arquivo de [rotas](https://easyupload.io/kn1gto)
Senha: ipet_insomnia

Dentro do Insomnia, selecione a opção "import/export" do menu lateral:

![insomnia](https://i.ibb.co/vq3SR1R/insomnia.png)

Selecione o arquivo .json que você baixou anteriormente. Após a importação, o insomnia deve se parecer com isso:

![ipet](https://i.ibb.co/n7P4rY5/ipet.png)

### Variáveis de ambiente Insomnia
Dentro das configurações de ambiente do projeto, vem pré-configurado 3 variáveis: 

```json
{
  "base_URL": "http://localhost:3333",
  "provider_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImlhdCI6MTU4MDc0MDQxOX0.AKCQQcWXEKAqHNMbR6hiiyGkEvh4gshm5AayS8AIhmQ",
  "user_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjMsImlhdCI6MTU4MDQ4OTM5Mn0.7Uj67cfvSzWEbapkQhtiD4cNPXdQDG1yDGWTxPSKLhg"
}
```

A base_URL é o local onde seu servidor está rodando.

A aplicação é dividida em 2 níveis: Usuários e prestadores. Cada um tem seu token com suas determinadas validações através dos middlewares do Adonis. ('auth' e 'store')
Isso por que algumas rotas são exclusivas para estabelecimentos, como a rota de criação e alteração de produtos.

Portanto, ao criar um usuário pela rota "User", o boolenano "provider" determina quais pontos do sistema você poderá acessar.
 * Crie um usuário válido na rota "users"
 * Realize o login na aplicação através da rota "sessions"
Se o usuário que você criou é provedor, grave o token gerado pela rota sessions na variável "provider_token". Do contrário, salve na "user_token".

Todas as outras rotas precisam de autenticação através do Header. O arquivo que foi importado já está com os devidos cabeçalhos configurados, tudo que você precisa fazer é passar um token válido para usuários e outro para prestador.

### Database

Por padrão o projeto vem com um banco sqlite configurado.
Para alterar isso, basta alterar as diretrizes de configuração no arquivo .env da raiz.

Altere a variável DB_CONNECTION para uma das seguintes:

 * pg (Postgres)
 * mssql (Microsoft Sql Server)
 * mysql (MariaDB/MySQL)
 * oracledb (Oracle DB)
 * **sqlite3 (Sqlite)**
 
Se alterar o banco, é necessário instalar o pacote através do yarn.

`` yarn add <pg> / <mssql> / <mysql> / <oracledb> / <sqlite3>``

Após alterar o banco, é preciso rodar as Migrations e as Seeds.

`` adonis migration:run``

``adonis seed``
