(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['camunda.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "<form role=\"form\" id=\"form_"
    + ((stack1 = ((helper = (helper = helpers.formid || (depth0 != null ? depth0.formid : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"formid","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\" name=\"formBuilder\">\r\n  <script cam-script type=\"text/form-script\">\r\n"
    + ((stack1 = container.invokePartial(partials.config,depth0,{"name":"config","data":data,"indent":"\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "  </script>\r\n</form>";
},"usePartial":true,"useData":true});
})();