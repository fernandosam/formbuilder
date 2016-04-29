(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['locate.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "\r\nvar Alpaca = $.alpaca;\r\n\r\n	Alpaca.registerView ({\r\n		\"id\": \"base\",\r\n		\"messages\": {\r\n			\"pt_BR\": {\r\n				required: \"Este campo é obrigatório\",\r\n				invalid: \"Este campo é inválido\",\r\n				months: [\"Janeiro\", \"Fevereiro\", \"Março\", \"Abril\", \"Maio\", \"Junho\", \"Julho\", \"Agosto\", \"Setembro\", \"Outubro\", \"Novembro\", \"Dezembro\"],\r\n				timeUnits: {\r\n					SECOND: \"segundos\",\r\n					MINUTE: \"minutos\",\r\n					HOUR: \"horas\",\r\n					DAY: \"dias\",\r\n					MONTH: \"meses\",\r\n					YEAR: \"anos\"\r\n				},\r\n				\"notOptional\": \"Este campo não é opcional.\",\r\n				\"disallowValue\": \"{0} são valores proibidas.\",\r\n				\"invalidValueOfEnum\": \"Este campo deve ter um dos seguintes valores: {0}. [{1}]\",\r\n				\"notEnoughItems\": \"O número mínimo de elementos é {0}\",\r\n				\"tooManyItems\": \"O número máximo de elementos é {0}\",\r\n				\"valueNotUnique\": \"Os valores não são únicos\",\r\n				\"notAnArray\": \"Este valor não é uma lista\",\r\n				\"invalidDate\": \"Esta data não tem o formato {0}\",\r\n				\"invalidEmail\": \"Endereço de email inválida, ex: info@cloudcms.com\",\r\n				\"stringNotAnInteger\": \"Este valor não é um número inteiro.\",\r\n				\"invalidIPv4\": \"Endereço IPv4 inválida, ex: 192.168.0.1\",\r\n				\"stringValueTooSmall\": \"O valor mínimo para este campo é {0}\",\r\n				\"stringValueTooLarge\": \"O valor máximo para este campo é {0}\",\r\n				\"stringValueTooSmallExclusive\": \"O valor deste campo deve ser maior que {0}\",\r\n				\"stringValueTooLargeExclusive\": \"O valor deste campo deve ser menor que {0}\",\r\n				\"stringDivisibleBy\": \"O valor deve ser divisível por {0}\",\r\n				\"stringNotANumber\": \"Este valor não é um número.\",\r\n				\"invalidPassword\": \"Senha inválida\",\r\n				\"invalidPhone\": \"Número de telefone inválido, ex: (123) 456-9999\",\r\n				\"invalidPattern\": \"Este campo deve ter o padrão {0}\",\r\n				\"stringTooShort\": \"Este campo deve incluir pelo menos {0} caracteres\",\r\n				\"stringTooLong\": \"Este campo pode incluir no máximo {0} caracteres\"\r\n			}\r\n		}\r\n	});\r\n	\r\n	$.alpaca.setDefaultLocale(\"pt_BR\");\r\n";
},"useData":true});
})();