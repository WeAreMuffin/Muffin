/* 
 * Copyright 2013 lambda2.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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

function goToUrl(url)
{
	$.get(url,
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

}

function bindAjaxEvents()
{
	$('[data-load-target]').each(function()
	{
		var urlToGo = $(this).attr("data-load-target");
		$(this).click(function()
		{
			goToUrl(urlToGo);
		});
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
	var ctn = $("div[data-role='form-container'] > ul.items-panels");
	var type = $("#form-add-competence .radio-group input:checked").val();
	if (type == "1")
		type = "3";
	else if (type == "3")
		type = "1";
	console.log("type = " + type);
	ctn.find("li[data-index='"+type+"']").append(a);
	addCheckHandler(window.toCheck);
	a.submit(function() {
		$(this).ajaxSubmit(window.ioptions);
		return false;
	});
	addClearItems();
	setTimeout(function() {
		$.smoothScroll({offset: ($(window).height() / 2), scrollElement: null, scrollTarget: a});
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
	var e = document.getElementById('form-add-competence');
	if (e.checkValidity())
	{
		$(this).ajaxSubmit(options);
	}
	else
	{

	}
    // !!! Important !!! 
    // always return false to prevent standard browser submit and page navigation 
    return false;
});
};

var initializePanelMenu = function()
{
	$("#panel-menu > li[data-index-toggle]").click(function()
	{
		var index = $(this).attr("data-index-toggle");
		$("#panel-menu > li[data-index-toggle]").removeClass("active");
		$(this).addClass("active");
		$(".items-panels > li[data-index!='" + index + "']").hide();
		$(".items-panels > li[data-index='" + index + "']").show();
		treatResize();
	});
};

var initializeHelpMenu = function()
{
	$("#exchange-panel > li[data-index]").hide();
	$("#exchange-panel > li[data-index='1']").show();
	$("#exchange-menu > li[data-index-toggle]").click(function()
	{
		var index = $(this).attr("data-index-toggle");
		$("#exchange-menu > li[data-index-toggle]").removeClass("active");
		$(this).addClass("active");
		$("#exchange-panel > li[data-index!='" + index + "']").hide();
		$("#exchange-panel > li[data-index='" + index + "']").show();
		treatResize();
	});
	$("#load-expired-nhelp--button").click(function()
	{
		var b = $(this);
		b.html("Chargement...");
		$.get("Echanges/oldneed", function(e)
		{
			$("#exchange-panel li[data-index='2'] ul[data-role='liste-competences']").append(e);
			b.hide();
			/* queryUserStatus(); */
		});
	});
	$("#load-expired-help--button").click(function()
	{
		var b = $(this);
		b.html("Chargement...");
		$.get("Echanges/oldhelp", function(e)
		{
			$("#exchange-panel li[data-index='1'] ul[data-role='liste-competences']").append(e);
			b.hide();
			/* queryUserStatus(); */
		});
	});
};

var queryUserStatus = function()
{
	$("[data-locate]").click(function()
	{
		$("[role='indicator']").html("Recuperation des postes...");
		var ct = $(this);
		ct.addClass("loading")
		var login = $(this).attr("data-login");
		$.ajax({
			url: "User/getstatus",
			type: 'POST',
			data: { login : login },
			dataType: "json"
		}).done(function(e)
		{
			if (e.error == undefined)
			{
				ct.attr("style", "");
				ct.addClass("online");
				ct.removeClass("offline");
				ct.html(e.last_host.replace(".42.fr", ""));
			}
			else
			{
				ct.removeClass("online");
				ct.addClass("offline");
			}
		});
		ct.removeClass("loading");
		$("[role='indicator']").html("A jour");
	});
}

var markLastNotificationAsRead = function()
{
	$.get("Notification/readLastNew", function(e)
	{
		if(e !== "0")
			console.log("Notification lue.");
		else
			console.log("Aucune nouvelle notification a lire...");
		window.intervalHandler = setInterval(notifications,10000);
	});
}

var checkNotifications = function()
{
	var n = $("#notif-aera");
	$.get("Notification/getCount", function(e)
	{
		if(e !== "0")
		{
			n.addClass("new");
			$.get("Notification/getLastNew", function(k)
			{
				window.clearInterval(window.intervalHandler);
				if (k != undefined && k.length > 0)
				{
					var not = new Notify('Muffin', {
						body: k,
						tag: k,
						notifyClose: markLastNotificationAsRead,
						notifyClick: markLastNotificationAsRead
					});
					if (not.needsPermission())
					{
						not.requestPermission();
					}
					not.show();
				}
			});
		}
		n.html("<span class='icon-elipse'></span><span class='not-num'>" + e + "</span>");
	});
}

var notifications = function()
{
	checkNotifications(); 
	var n = $("#notif-aera");
	n.click(function()
	{
		$.get("Notification/get", function(e){
			$("#modal-notifications .modal-body")
			.html(e);
			n.removeClass("new");
		});
	});
}

var addClearItems = function()
{
    /**
     * On met les icones de supression, teach & learn
     */
     $('div[data-role="form-container"] fieldset').each(function() {
     	var fieldset = $(this);
     	var radioElt = fieldset.find(".radio input").first();
     	if (fieldset.find(".clear-all").length === 0)
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

 var afterUserUpdate = function(responseText, statusText, xhr, $form) {
 	console.log("after");
 	if (responseText[0] == "1")
 	{
 		$('a[role="indicator"]').html("<span class='icon-checkmark2'></span> Paramètres mis à jour");
 		$("#status_public_icon").removeClass("icon-clock3").addClass("icon-checkmark2");
 		$('#modal-params').modal('hide');
 	}
 	else
 	{
 		$("#status_public_icon").removeClass("icon-clock3").addClass("icon-multiply");
 		$("#status_update_uid").html(responseText);
 	}
 };

 var initFormComportement = function()
 {
 	$('#form_search_uid').submit(function(e) {
 		e.stopImmediatePropagation();
 		window.muffin.searchUSerData();
 		return false;
 	});

 	$('#form_params').submit(function() {

 		var options = {
	    target: '#form-result', // target element(s) to be updated with server response 
	    beforeSubmit: function() {
	    	$("#status_public_icon").removeClass("icon-uniF488")
	    	.removeClass("icon-multiply")
	    	.removeClass("icon-checkmark2")
	    	.addClass("icon-clock3");
	}, // pre-submit callback 
	success: afterUserUpdate, // post-submit callback 
	url: "User/update",
	type: "post"        // 'get' or 'post', override for form's 'method' attribute 
};

console.log("update");
$(this).ajaxSubmit(options);

return false;
});
 };

 var mainHeadLink = function()
 {
 	$("header > h1.title").click(function()
 	{
 		goToUrl("User/me");
 	});
 }



 var reloadHandlers = function()
 {
 	NProgress.configure({showSpinner: false});
 	$("a").smoothScroll();
 	treatResize();
 	$(window).resize(treatResize);
 	bindAjaxEvents();
 	initFormComportement();
 	initializePanelMenu();
 	initializeHelpMenu();
 	notifications();
 	mainHeadLink();

 	window.clearInterval(window.intervalHandler);
 	window.intervalHandler = setInterval(notifications,5000);

 	try
 	{
 		queryUserStatus();
 	}
 	catch(e)
 	{
 		;
 	}

 	$("[data-toggle='tooltip']").tooltip(
 	{
 		container: "body",
 		placement: "auto bottom"
 	});

 	$('aside.side-menu > ul').affix(
 	{
 		offset: {
 			top: 231,
 			bottom: function() {
 				return (this.bottom = $('.footer-container').outerHeight(true));
 			}
 		}
 	});

 };

 	/* -----------------------------------------------------------------------------------
 	  |                           CHARTS SPECIFIC FUNCTIONS                               |
 	   ----------------------------------------------------------------------------------- */

var prepareLegend = function(leg, gdata)
{
	leg.html("");
	for (var i = 0; i < gdata.length; i++)
	{
		leg.append(
			'<p><span style="color: ' 
				+ gdata[i].color + ';" class="icon-uniF52F"></span> <b>' 
				+ gdata[i].value + ' </b> ' + gdata[i].legend + '</p>');
	};
};

var drawCharts = function(data)
{
	var gdata = data;


	var showLegend = function()
	{
		var leg = $(".stats-inscrits-legend");
		leg.addClass("complete").removeClass("loading");
	};

	prepareLegend($(".stats-inscrits-legend"), gdata);
	var ctx = $("#chart-inscrits").get(0).getContext("2d");
	
	new Chart(ctx).Doughnut(data,
		{
			segmentStrokeColor: "#F7E4BE",
			animationEasing : "easeOutBounce",
			onAnimationComplete: showLegend
		});
}


