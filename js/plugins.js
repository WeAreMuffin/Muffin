


// Avoid `console` errors in browsers that lack a console.
(function() {
	var method;
	var noop = function() {
	};
	var methods = [
		'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
		'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
		'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
		'timeStamp', 'trace', 'warn'
	];
	var length = methods.length;
	var console = (window.console = window.console || {});

	while (length--) {
		method = methods[length];

		// Only stub undefined methods.
		if (!console[method]) {
			console[method] = noop;
		}
	}
}());

// pre-submit callback 
function showRequest(formData, jqForm, options) {
	// formData is an array; here we use $.param to convert it to a string to display it 
	// but the form plugin does this for you automatically when it submits the data 
	var queryString = $.param(formData);

	// jqForm is a jQuery object encapsulating the form element.  To access the 
	// DOM element for the form do this: 
	// var formElement = jqForm[0]; 

	alert('About to submit: \n\n' + queryString);

	// here we could return false to prevent the form from being submitted; 
	// returning anything other than false will allow the form submit to continue 
	return true;
}

// post-submit callback 
function showResponse(responseText, statusText, xhr, $form) {
	// for normal html responses, the first argument to the success callback 
	// is the XMLHttpRequest object's responseText property 

	// if the ajaxForm method was passed an Options Object with the dataType 
	// property set to 'xml' then the first argument to the success callback 
	// is the XMLHttpRequest object's responseXML property 

	// if the ajaxForm method was passed an Options Object with the dataType 
	// property set to 'json' then the first argument to the success callback 
	// is the json data object returned by the server 

	alert('status: ' + statusText + '\n\nresponseText: \n' + responseText +
		'\n\nThe output div should have already been updated with the responseText.');
}

var initalizeForm = function() {
	var options = {
		target: '#form-result', // target element(s) to be updated with server response 
		beforeSubmit: showRequest, // pre-submit callback 
		success: showResponse, // post-submit callback 
		url: "modules/updatecompetence.php",
		type: "post"        // 'get' or 'post', override for form's 'method' attribute 
			//dataType:  null        // 'xml', 'script', or 'json' (expected server response type) 
			//clearForm: true        // clear all form fields after successful submit 
			//resetForm: true        // reset the form after successful submit 

			// $.ajax options can be used here too, for example: 
			//timeout:   3000 
	};

	$('#form-competences').submit(function() {
		// inside event callbacks 'this' is the DOM element so we first 
		// wrap it in a jQuery object and then invoke ajaxSubmit 
		$(this).ajaxSubmit(options);

		// !!! Important !!! 
		// always return false to prevent standard browser submit and page navigation 
		return false;
	});
	addClearItems();
};

var addClearItems = function()
{
	$('#form-competences fieldset').each(function() {
		var fieldset = $(this);
		var radioElt = fieldset.find(".radio input").first();
		if (fieldset.find(".clear-all").length == 0)
		{
			fieldset.append("<a class='clear-all' data-items='"
				+ radioElt.attr("name")
				+ "'><span class='icon-remove-circle'></span></a>");
		}
	});
	$("#form-competences fieldset a.clear-all").click(function() {
		var item = $(this);
		var concerned = item.parent().find("input[name='" + item.attr("data-items") + "']");
		$.ajax({
			url: "modules/deletecompetence.php",
			type: 'POST',
			data: {
				login: $("#form-login").val(),
				code: $("#form-code").val(),
				comp: item.attr("data-items")
			}
		}).done(function(data) {
			concerned.each(function() {
				if ($(this).is(":checked"))
				{
					$(this).removeAttr("checked");
				}
			});
		});
	});
};

var createFormCompetences = function()
{
	$("#form-competences").makeForms({
		components: window.items,
		groupSize: 1,
		templates:
			{
				title: "<h4>{{title}}</h4>",
				group: '<fieldset>{{group}}</fieldset>',
				label: '<label for="{{id}}">{{label}}</label>',
				radio: '<div class="radio"><input type="radio" name="{{name}}"\
	id="{{id}}" value="{{value}}">{{label}}<label for="{{id}}"></label></div>',
				input: '<input class="form-control" type="{{type}}" name="{{name}}"\
	id="{{id}}" value="{{value}}">',
				text: '<input class="form-control" type="text" name="{{name}}"\
	id="{{id}}" value="{{value}}">',
				select: '<select class="form-control" id="{{id}}" name="{{name}}">\n\
	<option id="{{id}}" value="">Aucun</option>{{options}}</select>',
				option: '<option id="{{id}}" value="{{value}}">{{label}}</option>'
			}
	});
	/*$("div.radio input + label").click(function()
	 {
	 console.log("ok");
	 var elt = $(this).parent().children("input");
	 if(elt.is(":checked"))
	 {
	 elt.prop('checked', false);
	 }
	 });*/
};

window.createFormCompetences = createFormCompetences;

