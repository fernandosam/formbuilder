This tool uses [AlpacaJS](https://github.com/gitana/alpaca) to build functional prototypes and integrate them with [Camunda](https://github.com/camunda/camunda-bpm-platform).

```CAMUNDA_TOMCAT = \camunda-bpm-tomcat-7.4.0\server\apache-tomcat-8.0.24\```

# Language Setting Portuguese (to keep English, skip this step)

The Camunda platform is available in the Portuguese language (pt_BR), but must be configured to include the language. To do this, perform the following steps:

1. Copy the pt_BR.json language file to the language folder.
   * pt_BR.json: ```https://github.com/camunda/camunda-tasklist-translations/tree/master/locales```
   * Pasta de idiomas: ```CAMUNDA_TOMCAT\webapps\camunda\app\tasklist\locales\```
	
2. Include in config file (```CAMUNDA_TOMCAT\webapps\camunda\app\tasklist\scripts\config.js```) this code:

```json
"locales": {
  "availableLocales": ["pt_BR","en"],
  "fallbackLocale": "pt_BR"
},
```

# Javascript Libraries

Perform the following steps to include the javascript libraries on the platform Camunda.

1. Copy the following javascript libraries to the scripts folder (```CAMUNDA_TOMCAT\webapps\camunda\app\tasklist\scripts\```). Note: Remove the version of the library name when copying.
   * Bootstrap:	https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js (version: 3.3.2).
   * Handlebars: http://builds.handlebarsjs.com.s3.amazonaws.com/handlebars-v4.0.5.js (version: 4.0.5).
   * AlpacaJS: http://code.cloudcms.com/alpaca/1.5.17/bootstrap/alpaca.min.js (version: 1.5.17).

2. Copy the css to the styles folder (```camunda-bpm-tomcat-7.4.0\server\apache-tomcat-8.0.24\webapps\camunda\app\tasklist\styles\```).
   * alpacaJS: http://code.cloudcms.com/alpaca/1.5.17/bootstrap/alpaca.min.css (version: 1.5.17).

3. Include in config file (```CAMUNDA_TOMCAT\webapps\camunda\app\tasklist\scripts\config.js```) the following code:

```javascript		
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
4.  Include in the tasklist (index file) (```CAMUNDA_TOMCAT\webapps\camunda\app\tasklist\index.html```) the following code (note: include in the region destined to the style guides of the page).
	 
```html
	  <link type="text/css" href="$APP_ROOT/app/tasklist/styles/alpaca.min.css" rel="stylesheet" />
```

# Form Builder

1. Download the .zip file (or clone this project).
2. Open the ```form-builder.html``` file in the browser.
