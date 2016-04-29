(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['config.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "	var data = "
    + ((stack1 = ((helper = (helper = helpers.data || (depth0 != null ? depth0.data : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"data","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + ";	\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "	var data = {};\r\n";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "	var schema = "
    + ((stack1 = ((helper = (helper = helpers.schema || (depth0 != null ? depth0.schema : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"schema","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + ";	\r\n";
},"7":function(container,depth0,helpers,partials,data) {
    return "	var schema = {};\r\n";
},"9":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "	var options = "
    + ((stack1 = ((helper = (helper = helpers.options || (depth0 != null ? depth0.options : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"options","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + ";\r\n\r\n	if (document.getElementsByTagName('meta').description) {\r\n		options.form = {};\r\n	} else {\r\n		options.form = {\r\n			\"buttons\": {\r\n				\"submit\": {}\r\n			},\r\n			\"toggleSubmitValidState\": false\r\n		};\r\n	}\r\n	\r\n";
},"11":function(container,depth0,helpers,partials,data) {
    return "	var options = {};\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function";

  return "$(document).ready(function() {\r\n	 /**\r\n	 * Initial data\r\n	 *\r\n	 * Fill in the JSON data that should be populated into the form.  This can be any JSON data that you'd like\r\n	 * provided that it fits the schema and options (if you provide those).\r\n	 *\r\n	 */\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.data : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "\r\n	/**\r\n	 * JSON-schema for the form\r\n	 *\r\n	 * The form schema defines the data types, validation logic and other constraints that need to be satisfied in\r\n	 * order for the form to be considered valid.\r\n	 *\r\n	 * This should follow the JSON-schema convention.\r\n	 * @see http://json-schema.org\r\n	 *\r\n	 * Full schema settings are listed here:\r\n	 * @see http://www.alpacajs.org\r\n	 *\r\n	 */\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.schema : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.program(7, data, 0),"data":data})) != null ? stack1 : "")
    + "\r\n	/**\r\n	 * Layout options for the form\r\n	 *\r\n	 * These options describe UI configuration for the controls that are rendered for the data and schema.  You can\r\n	 * tweak the layout and presentation aspects of the form in this section.\r\n	 *\r\n	 * Full options settings are listed here:\r\n	 * @see http://www.alpacajs.org\r\n	 *\r\n	 */\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.options : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.program(11, data, 0),"data":data})) != null ? stack1 : "")
    + "	\r\n	//* End Initial data\r\n\r\n	/**\r\n	 * This is an optional post render callback that Alpaca will call once the form finishes rendering.  The form\r\n	 * rendering itself is asynchronous as it may load templates or other resources for use in generating the UI.\r\n	 *\r\n	 * Once the render is completed, this callback is fired and the top-level Alpaca control is handed back.\r\n	 *\r\n	 * @param control\r\n	 */\r\n	var postRenderCallback = function(control) {\r\n		validateForm(control);\r\n		\r\n		// Custom Programming\r\n		"
    + ((stack1 = ((helper = (helper = helpers.scripts || (depth0 != null ? depth0.scripts : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"scripts","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\r\n		\r\n		$( \":input\" ).keyup(function() {\r\n			updateCamunda(control.getValue());\r\n			validateForm(control,true);\r\n		});\r\n	};\r\n	\r\n	// Call functions to init Alpaca integration with Camunda\r\n	var view = editForm(data);\r\n	initCamunda(schema, options);\r\n	\r\n	/**\r\n	 * Render the form.\r\n	 *\r\n	 * We call alpaca() with the data, schema and options to tell Alpaca to render into the selected dom element(s).\r\n	 *\r\n	 */ \r\n	$(\"#"
    + ((stack1 = ((helper = (helper = helpers.formid || (depth0 != null ? depth0.formid : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"formid","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\").alpaca({\r\n		\"dataSource\": data,\r\n		\"optionsSource\": options,\r\n		\"schemaSource\": schema,\r\n		\"viewSource\": view,\r\n		\"postRender\": postRenderCallback\r\n	});\r\n});";
},"useData":true});
})();