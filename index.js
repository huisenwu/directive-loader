var loaderUtils = require("loader-utils");
var changeCase = require('change-case');

module.exports = function(source) {
	if(this.cacheable) {
		this.cacheable();
	}

	var query = loaderUtils.parseQuery(this.query);
	var prefix = query.prefix || '';
	console.log('prefix test: ' + prefix);

	var conf = JSON.parse(source);

	var keys = Object.keys(conf);

	var amdPre = "define(['external/react','external/angular','external/ngReact'], function(React,angular) {";
	var angularPre = "angular.module('"+ prefix + "Application', ['react'])";
	var body = keys.map(function(key) {
		return ".value('"+ key + "', " + key + ").directive(" + prefix + key + ", ['reactDirective', function(reactDirective) {return reactDirective('" + key + "', []);}])";
	}).join(".");
	var angularPost = ";";
	var amdPost = "});";
	return amdPre + angularPre + body + angularPost + amdPost;
};
