(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['index.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return " <html>\r\n	<head>\r\n		<meta charset=\"UTF-8\">\r\n		<link type=\"text/css\" rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css\" /> \r\n		<link type=\"text/css\" href=\"https://code.cloudcms.com/alpaca/1.5.17/bootstrap/alpaca.min.css\" rel=\"stylesheet\" /> \r\n		<script type=\"text/javascript\" src=\"https://code.jquery.com/jquery-1.11.1.min.js\"></script>\r\n		<script type=\"text/javascript\" src=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js\"></script>\r\n		<script type=\"text/javascript\" src=\"https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.0.0/handlebars.js\"></script>\r\n		<script type=\"text/javascript\" src=\"https://code.cloudcms.com/alpaca/1.5.17/bootstrap/alpaca.min.js\"></script>\r\n		<script type=\"text/javascript\" src=\"./scripts/locate.js\"></script>\r\n		<script type=\"text/javascript\" src=\"./scripts/config.js\"></script>\r\n		<script type=\"text/javascript\" src=\"./scripts/custom.js\"></script>\r\n	</head>\r\n	<body>\r\n  \r\n   <div role=\"form\" id=\""
    + ((stack1 = ((helper = (helper = helpers.formid || (depth0 != null ? depth0.formid : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"formid","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\" name=\"formBuilder\"></div>\r\n\r\n  </body> \r\n</html>";
},"useData":true});
})();