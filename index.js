module.exports = function(source) {
	if(this.cacheable) {
		this.cacheable();
	}

	var wrap = function(array) {
		array.map(function(item) {
			return "'" + item + "'";
		}).join(",");
	};

	var conf = JSON.parse(source);
	var amdPre = conf.amd.api + "([" + wrap(conf.amd.dependencies) + "], function(" + conf.amd.parameters + ") {";
	var angularPre = "angular.module('"+ conf.angular.module + "', [" + wrap(conf.angular.dependencies) + "])";
	var templates = conf.templates.map(function(template) {
		return ".value('"+ template + "', " + tempalte + ").directive('" + template.toLowerCase() + "', function(reactDirective) {return reactDirective('" + template + "', []);})";
	}).join(".");
	var angularPost = ";";
	var amdPost = "});";
	return amdPre + angularPre + templates + angularPost + amdPost;
};
