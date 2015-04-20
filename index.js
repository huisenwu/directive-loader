var loaderUtils = require("loader-utils");

module.exports = function(source) {
	if(this.cacheable) {
		this.cacheable();
	}

	var query = loaderUtils.parseQuery(this.query);
	var prefix = query.prefix || '';
	var angular = query.angular || '';
	var react = query.react || '';
	var ngReact = query.ngReact || '';

	console.log('prefix test: ' + prefix);
	console.log('angular test: ' + angular);
	console.log('react test: ' + react);
	console.log('ngReact test: ' + ngReact);

	var conf = JSON.parse(source);
	var keys = Object.keys(conf);
	var deps = keys.map(function(key) {
		return "'" + conf[key] + "'";
	}).join(",");

	console.log('keys test: ' + keys);
	console.log('deps test: ' + deps);

	var directives = keys.map(function(key) {
		return ".value('"+ key + "', " + key + ").directive('" + prefix + key + "', ['reactDirective', function(reactDirective) {return reactDirective('" + key + "', []);}])";
	}).join("");

	return "define(["+ deps +",'" + react + "','"+ angular +"','"+ ngReact +"'], function("+ keys +",React,angular) {" + "angular.module('"+ prefix + "Application', ['react'])" + directives + ";" + "});";
};
