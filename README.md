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
