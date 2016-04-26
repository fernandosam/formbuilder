This tool uses [AlpacaJS](https://github.com/gitana/alpaca) to build functional prototypes and integrate them with [Camunda](https://github.com/camunda/camunda-bpm-platform).

# Dependências do Projeto

Para possibilitar a integração do FormBuilder com a plataforma [Camunda 7.4](https://docs.camunda.org/manual/7.4/), é necessário 

1. Arquivo de Configuração
   * Pasta scripts: 
   * Arquivo de configuração: 
   * Página inicial da lista de tarefas: 
   * Pasta styles: 
2. Bibliotecas Javascript

3. Estilos
   * alpacaJS: http://code.cloudcms.com/alpaca/1.5.17/bootstrap/alpaca.min.css (versão: 1.5.17).

```CAMUNDA_TOMCAT = \camunda-bpm-tomcat-7.4.0\server\apache-tomcat-8.0.24\```

# Configuração do Idioma Português

A plataforma Camunda está disponível no idioma português (pt_BR), mas precisa ser configurada para a inclusão do idioma. Para isso, realize os seguintes passos:

1. Copiar o arquivo de idioma pt_BR.json para a pasta de idiomas.
   * pt_BR.json: ```https://github.com/camunda/camunda-tasklist-translations/tree/master/locales```
   * Pasta de idiomas: ```CAMUNDA_TOMCAT\webapps\camunda\app\tasklist\locales\```
	
2. Incluir no arquivo de configuração (```CAMUNDA_TOMCAT\webapps\camunda\app\tasklist\scripts\config.js```) o seguinte código:

```
"locales": {
  "availableLocales": ["pt_BR","en"],
  "fallbackLocale": "pt_BR"
},
```

# Inclusão de Bibliotecas Javascript

Realize os seguintes passos para incluir as bibliotecas javascript na plataforma Camunda.

1. Copiar as seguintes bibliotecas javascript para a pasta de scripts (```CAMUNDA_TOMCAT\webapps\camunda\app\tasklist\scripts\```). Obs: retirar a versão do nome da biblioteca ao realizar a cópia.
   * Bootstrap:	https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js (versão: 3.3.2).
   * Handlebars: http://builds.handlebarsjs.com.s3.amazonaws.com/handlebars-v4.0.5.js (versão: 4.0.5).
   * AlpacaJS: http://code.cloudcms.com/alpaca/1.5.17/bootstrap/alpaca.min.js (versão: 1.5.17).

2. Copiar os guias de estilos para a pasta styles (```camunda-bpm-tomcat-7.4.0\server\apache-tomcat-8.0.24\webapps\camunda\app\tasklist\styles\```).
3. Incluir no arquivo de configuração (```CAMUNDA_TOMCAT\webapps\camunda\app\tasklist\scripts\config.js```) o seguinte código:

```		
   customScripts: {
	 // AngularJS module names
	 ngDeps: ['ui.bootstrap'],
	 // RequireJS configuration for a complete configuration documentation see:
	 // http://requirejs.org/docs/api.html#config
	 deps: ['handlebars','alpaca','bootstrap','alpaca-camunda'],
	 paths: {
	   // if you have a folder called `custom-ui` (in the `scripts` folder)
	   // with a file called `scripts.js` in it and defining the `custom-ui` AMD module
	   'handlebars': 'custom-ui/handlebars',
	   'alpaca': 'custom-ui/alpaca',
	   'bootstrap': 'custom-ui/bootstrap',
	   'alpaca-camunda': 'custom-ui/alpaca-camunda',
	 }
   }
```
4.  Incluir no arquivo inicial da lista de tarefas (```CAMUNDA_TOMCAT\webapps\camunda\app\tasklist\index.html```) o seguinte código (obs: incluir na região destinada aos guias de estilos da página).
	 
```
	  <link type="text/css" href="$APP_ROOT/app/tasklist/styles/alpaca.min.css" rel="stylesheet" />
```

# Form Builder
	
1. Fazer download do arquivo .zip
2. Abrir no navegador o arquivo form-builder.html
	

