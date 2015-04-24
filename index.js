var loaderUtils = require("loader-utils");
var _ = require('lodash');

module.exports = function(source) {
	if(this.cacheable) this.cacheable();

	var query = loaderUtils.parseQuery(this.query);
	var prefix = query.prefix;

	var templates = {
		component: "<%=key%>:{Componenet:<%=key%>,render:function(props, target) {React.render(React.createElement(<%=key%>, props), target);},registerDirective: function(app, name) {app.value('<%=key%>Component', Test).directive('<%=prefix%>'+name, ['reactDirective', function(reactDirective) {return reactDirective('<%=key%>Component');}]);}}",
		amd: "define([<%=values%>,'<%=react%>'], function(<%=keys%>,React) {return {<%=comps%>};});"
	};

	var conf = _.mapValues(JSON.parse(source), function(value) {
		return "'" + value + "'";
	});

	var keys = _.keys(conf);

	var comp = _.template(templates.component);
	var comps = _.map(keys, function(key) {
		return comp({key: key, prefix: query.prefix});
	});

	console.log(comps);

	var amd = _.template(templates.amd);

	var result = amd({values: _.values(conf), react: query.react, keys: keys, comps: comps});

	console.log(result);

	return result;
};
