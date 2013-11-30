


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

function bindAjaxEvents()
{
	$('[data-load-target]').each(function()
	{
		var urlToGo = $(this).attr("data-load-target");
		$(this).click(function()
		{
			$.get(urlToGo,
					function(data) {
						data = $(data);
						data.addClass("loading");
						$("div[data-role='form-container']").children().slideUp();
						$("div[data-role='form-container']").html(data);
						setTimeout(function() {
							NProgress.done();
							data.addClass("complete");
							reloadHandlers();
						}, 200);
					});
		})
	});
}

function addCheckHandler(toCheck)
{
	$("div[data-role='form-container'] form .radio input, div[data-role='form-container'] form input[type='checkbox']").change(function() {
		console.log("change");
		$(this).parents("form").trigger("submit");
	});

	// Mise à jour des champs
	for (elt in toCheck)
	{
		$("input#" + toCheck[elt]).attr("checked", "checked");
	}
}
;

// pre-submit callback 
function showRequest(formData, jqForm, options) {
	NProgress.start();
	$('a[role="indicator"]').html("<span class='icon-hourglass'></span> Enregistrement...");
	//var queryString = $.param(formData);
	return true;
}

// post-submit callback 
function showResponse(responseText, statusText, xhr, $form) {
	NProgress.done();
	$('a[role="indicator"]').html("<span class='icon-checkmark2'></span> Enregistré.");
}

var initalizeForm = function() {
	window.ioptions = {
		target: '#form-result', // target element(s) to be updated with server response 
		beforeSubmit: showRequest, // pre-submit callback 
		success: showResponse, // post-submit callback 
		url: "User/updatecompetence",
		type: "post"       // 'get' or 'post', override for form's 'method' attribute 
	};

	$('div[data-role="form-container"] form').submit(function() {
		// inside event callbacks 'this' is the DOM element so we first 
		// wrap it in a jQuery object and then invoke ajaxSubmit 
		$(this).ajaxSubmit(window.ioptions);

		// !!! Important !!! 
		// always return false to prevent standard browser submit and page navigation 
		return false;
	});
	addClearItems();

};

// pre-submit callback 
function showAddRequest(formData, jqForm, options) {
	NProgress.start();
	$('a[role="indicator"]').html("<span class='icon-hourglass'></span> Ajout...");
	$("#input-nom-comp + button").html("<span class='icon-time'></span>");
	//var queryString = $.param(formData);
	return true;
}

// post-submit callback 
function showAddResponse(responseText, statusText, xhr, $form) {
	$('a[role="indicator"]').html("<span class='icon-checkmark2'></span> Ajouté.");
	$("#input-nom-comp + button").html("<span class='icon-chevron-right'></span>");
	console.log("responseText:", responseText);
	console.log("statusText:", statusText);
	var a = $(responseText);
	a.addClass("preparing");
	$("div[data-role='form-container']").append(a);
	addCheckHandler(window.toCheck);
	a.submit(function() {$(this).ajaxSubmit(window.ioptions);return false;});
	addClearItems()
	setTimeout(function() {
		$.smoothScroll({ offset: ($(window).height()/2), scrollElement: null, scrollTarget: a });
		NProgress.done();
		a.addClass("complete").removeClass("preparing");
	}, 1000);
}

var initalizeAddForm = function() {
	var options = {
		target: '#form-result', // target element(s) to be updated with server response 
		beforeSubmit: showAddRequest, // pre-submit callback 
		success: showAddResponse, // post-submit callback 
		url: "User/addcompetence",
		type: "post"        // 'get' or 'post', override for form's 'method' attribute 
	};

	$('#form-add-competence').submit(function() {
		// inside event callbacks 'this' is the DOM element so we first 
		// wrap it in a jQuery object and then invoke ajaxSubmit 
		console.log("initialized");
		$(this).ajaxSubmit(options);

		// !!! Important !!! 
		// always return false to prevent standard browser submit and page navigation 
		return false;
	});
};

var addClearItems = function()
{
	/**
	 * On met les icones de supression, teach & learn
	 */
	$('div[data-role="form-container"] fieldset').each(function() {
		var fieldset = $(this);
		var radioElt = fieldset.find(".radio input").first();
		if (fieldset.find(".clear-all").length == 0)
		{
			fieldset.append("<a class='clear-all' data-items='"
				+ radioElt.attr("name")
				+ "'><span class='icon-multiply'></span></a>");
		}
	});
	
	/**
	 * On bind le clic sur les boutons de supression à une requete ajax
	 * pour supprimer le niveau
	 */
	$("div[data-role='form-container'] form fieldset a.clear-all").click(function() {
		var item = $(this);
		var concerned = item.parent().find(".radio input[name='niveau']");
		$.ajax({
			url: "User/deletecompetence",
			type: 'POST',
			data: {
				id_competence: item.parent().parent().find("input[name='id_competence']").val(),
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
	console.log("form competences");
	$("#form-competences div").makeForms({
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

var treatResize = function()
{
	if ($("div[data-role='container']").height() >= $(window).height())
	{
		$(".footer-container").addClass("nofix");
	}
	else
	{
		$(".footer-container").removeClass("nofix");
	}
};

var reloadHandlers = function()
{
	NProgress.configure({showSpinner: false});
	$("a").smoothScroll();

	treatResize();
	$(window).resize(treatResize);
	bindAjaxEvents();
};

window.createFormCompetences = createFormCompetences;

