(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['config.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "	var data = "
    + ((stack1 = ((helper = (helper = helpers.data || (depth0 != null ? depth0.data : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"data","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + ";	\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "	var data = {};\n";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "	var schema = "
    + ((stack1 = ((helper = (helper = helpers.schema || (depth0 != null ? depth0.schema : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"schema","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + ";	\n";
},"7":function(container,depth0,helpers,partials,data) {
    return "	var schema = {};\n";
},"9":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "	var options = "
    + ((stack1 = ((helper = (helper = helpers.options || (depth0 != null ? depth0.options : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"options","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + ";\n\n	if (document.getElementsByTagName('meta').description) {\n		options.form = {};\n	} else {\n		options.form = {\n			\"buttons\": {\n				\"submit\": {}\n			},\n			\"toggleSubmitValidState\": false\n		};\n	}\n	\n";
},"11":function(container,depth0,helpers,partials,data) {
    return "	var options = {};\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {};

  return "$(document).ready(function() {\n	 /**\n	 * Initial data\n	 *\n	 * Fill in the JSON data that should be populated into the form.  This can be any JSON data that you'd like\n	 * provided that it fits the schema and options (if you provide those).\n	 *\n	 */\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.data : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "\n	/**\n	 * JSON-schema for the form\n	 *\n	 * The form schema defines the data types, validation logic and other constraints that need to be satisfied in\n	 * order for the form to be considered valid.\n	 *\n	 * This should follow the JSON-schema convention.\n	 * @see http://json-schema.org\n	 *\n	 * Full schema settings are listed here:\n	 * @see http://www.alpacajs.org\n	 *\n	 */\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.schema : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.program(7, data, 0),"data":data})) != null ? stack1 : "")
    + "\n	/**\n	 * Layout options for the form\n	 *\n	 * These options describe UI configuration for the controls that are rendered for the data and schema.  You can\n	 * tweak the layout and presentation aspects of the form in this section.\n	 *\n	 * Full options settings are listed here:\n	 * @see http://www.alpacajs.org\n	 *\n	 */\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.options : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.program(11, data, 0),"data":data})) != null ? stack1 : "")
    + "	\n	//* End Initial data\n\n	/**\n	 * This is an optional post render callback that Alpaca will call once the form finishes rendering.  The form\n	 * rendering itself is asynchronous as it may load templates or other resources for use in generating the UI.\n	 *\n	 * Once the render is completed, this callback is fired and the top-level Alpaca control is handed back.\n	 *\n	 * @param control\n	 */\n	var postRenderCallback = function(control) {\n		validateForm(control);\n		\n		// Custom Programming\n		"
    + ((stack1 = ((helper = (helper = helpers.scripts || (depth0 != null ? depth0.scripts : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"scripts","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n		\n		$( \":input\" ).keyup(function() {\n			updateCamunda(control.getValue());\n			validateForm(control,true);\n		});\n	};\n	\n	// Call functions to init Alpaca integration with Camunda\n	var view = editForm(data);\n	initCamunda(schema, options);\n	\n	/**\n	 * Render the form.\n	 *\n	 * We call alpaca() with the data, schema and options to tell Alpaca to render into the selected dom element(s).\n	 *\n	 */ \n	$(\"#form\").alpaca({\n		\"dataSource\": data,\n		\"optionsSource\": options,\n		\"schemaSource\": schema,\n		\"viewSource\": view,\n		\"postRender\": postRenderCallback\n	});\n});";
},"useData":true});
})();