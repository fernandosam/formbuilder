(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['camunda.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function";

  return "<form cam-form role=\"form\" id=\""
    + ((stack1 = ((helper = (helper = helpers.formid || (depth0 != null ? depth0.formid : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"formid","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\" data-alpaca-form-id=\""
    + ((stack1 = ((helper = (helper = helpers.formid || (depth0 != null ? depth0.formid : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"formid","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\" name=\"formBuilder\">\r\n	<script cam-script type=\"text/form-script\">\r\n		var schema = "
    + ((stack1 = ((helper = (helper = helpers.schema || (depth0 != null ? depth0.schema : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"schema","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + ";\r\n		\r\n		var variableManager = camForm.variableManager;\r\n\r\n		// create variable as element\r\n		var el = document.createElement(\"input\");\r\n		el.setAttribute(\"id\", \"json_value\");\r\n		el.setAttribute(\"type\", \"hidden\");\r\n		el.setAttribute(\"value\", \"\");\r\n		$("
    + ((stack1 = ((helper = (helper = helpers.formid || (depth0 != null ? depth0.formid : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"formid","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + ").prepend(el);\r\n\r\n		camForm.on('form-loaded', function() {\r\n			variableManager.createVariable({\r\n				name: schema.title,\r\n				type: 'json'\r\n			});\r\n		});\r\n\r\n		camForm.on('submit', function(evt) {\r\n			var fieldValue = $('#json_value').val();\r\n			\r\n			if (fieldValue){\r\n				variableManager.variableValue(schema.title, JSON.parse(fieldValue));\r\n				console.log(variableManager.variables);\r\n			}\r\n		});\r\n  </script>\r\n</form>\r\n\r\n<script cam-script type=\"text/javascript\">\r\n"
    + ((stack1 = container.invokePartial(partials.config,depth0,{"name":"config","data":data,"indent":"\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "</script>\r\n";
},"usePartial":true,"useData":true});
})();