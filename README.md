This tool uses [AlpacaJS](https://github.com/gitana/alpaca) to build functional prototypes and integrate them with [Camunda](https://github.com/camunda/camunda-bpm-platform).

# Customizações da Plataforma Camunda

Os ajustes foram realizados na plataforma Camunda na versão 7.4.

Documentação Oficial: https://docs.camunda.org/manual/7.4/

# Configuração do Idioma Português

A plataforma Camunda está disponível no idioma português (pt_BR), mas precisa ser configurada para a inclusão do idioma.

	Instruções:
		1. Copiar o arquivo de idioma pt_BR.json (3.1) para a pasta de idiomas (1.5).
		2. Incluir no arquivo de configuração (1.2) o seguinte código:
	
```
	"locales": {
	  "availableLocales": ["pt_BR","en"],
	  "fallbackLocale": "pt_BR"
	},
```

# Inclusão de Bibliotecas Javascript

	Instruções:
		1. Copiar as bibliotecas javascript (2) para a pasta scripts (1.1). Obs: retirar a versão do nome da biblioteca.
		2. Copiar estilos (2) para a pasta styles (1.4).
		2. Incluir no arquivo de configuração (1.2) o seguinte código:

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
	  3.  Incluir no arquivo inicial da lista de tarefas (1.3) o seguinte código (incluir na região destinada aos estilos da página).
	 
```
	  <link type="text/css" href="$APP_ROOT/app/tasklist/styles/alpaca.min.css" rel="stylesheet" />
```

# Form Builder
	
	1. Fazer download do arquivo .zip
	2. Abrir no navegador o arquivo form-builder.html
	

# Dependências

Arquivos e Pastas:
	1. Arquivo de Configuração
		1.1. Pasta scripts: camunda-bpm-tomcat-7.4.0\server\apache-tomcat-8.0.24\webapps\camunda\app\tasklist\scripts\
		1.2. Arquivo de configuração: camunda-bpm-tomcat-7.4.0\server\apache-tomcat-8.0.24\webapps\camunda\app\tasklist\scripts\config.js
		1.3. Página inicial da lista de tarefas: camunda-bpm-tomcat-7.4.0\server\apache-tomcat-8.0.24\webapps\camunda\app\tasklist\index.html
		1.4. Pasta styles: camunda-bpm-tomcat-7.4.0\server\apache-tomcat-8.0.24\webapps\camunda\app\tasklist\styles\
		1.5. Pasta de idiomas: camunda-bpm-tomcat-7.4.0\server\apache-tomcat-8.0.24\webapps\camunda\app\tasklist\locales\
	3. Traduções da Plataforma
		3.1. https://github.com/camunda/camunda-tasklist-translations/tree/master/locales
	2. Bibliotecas Javascript
		2.1. bootstrap:
			https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js
			Ver Utilizada: 3.3.2
		2.2. handlebars:
			http://builds.handlebarsjs.com.s3.amazonaws.com/handlebars-v4.0.5.js
			Ver Utilizada: 4.0.5
		2.3. alpacaJS
			http://code.cloudcms.com/alpaca/1.5.17/bootstrap/alpaca.min.js
			Ver Utilizada: 1.5.17
	3. Estilos
		3.1. alpacaJS
			http://code.cloudcms.com/alpaca/1.5.17/bootstrap/alpaca.min.css
			Ver Utilizada: 1.5.17
