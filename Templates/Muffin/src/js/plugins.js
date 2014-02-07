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



window.Muffin = {};

function goToUrl(url, elt)
{

	var highlightMenu = function(hash)
	{
		var e = $('ul[role="side-menu"] li a[data-load-target^="' + hash + '"]');
		if (e.length)
		{
			$('ul[role="side-menu"] li').removeClass("active");
			e.parent().addClass("active");
		}
	};

	var ha = url.split("/");
	if (ha.length > 2)
	{
		ha = ha.splice(-2);
	}
	ha = ha.join("/");
	if (ha)
	{
		highlightMenu(ha);
	}


	$("div[data-role='form-container']").children().addClass("loading");
	if (elt != undefined)
	{
		if (elt === "expanded" || elt.attr("data-expand") != undefined)
		{
			Muffin.expandContainer();
		}
		else
		{
			Muffin.reduceContainer();
		}
	}
	$.get(url, function(data) {
			data = $(data);
			data.addClass("loading");
			$("div[data-role='form-container']").html(data);
			NProgress.done();
			setTimeout(function()
			{
				data.addClass("complete");
				treatResize();
				window.location.hash = "/" + url;
			}, 100);
	});

}
Muffin.goToUrl = goToUrl;

/* -----------------------------------------------------------------------------------
  |                         	     HASH FUNCTIONS                                  |
   ----------------------------------------------------------------------------------- */

/* World isn't ready yet

Muffin.href = {};

// Current url
Muffin.href.url = "";

Muffin.href.go = function(url)
{
	if (Muffin.href.url != url)
	{
        Muffin.href.url = url;
        Muffin.goToUrl(url, ((url.search("Drafts") > 0) ? "expanded" : undefined));
		if (url.search("Drafts") <= 0)
		{
			Muffin.reduceContainer();

	}
	e}lse
	{
		console.log("url didn't change !");
	}
}

Muffin.href.locationHashChanged = function()
{
    if (location.hash != "" && location.hash != undefined)
    {
        var url = location.hash;
        Muffin.href.go(url.slice(2));
    }
}
*/

/* -----------------------------------------------------------------------------------
  |                         	     CORE FUNCTIONS                                  |
   ----------------------------------------------------------------------------------- */


function bindAjaxEvents()
{
	$('[data-load-target]').unbind("click");
	$('[data-load-target]').each(function()
	{
		var urlToGo = $(this).attr("data-load-target");
		$(this).click(function()
		{
			console.log("GOTO => (oldhash : " + window.location.hash + ") --> (#/" + urlToGo + ")");
			if(history.pushState)
			{
			    history.pushState(null, null, "#/" + urlToGo);
			    goToUrl(urlToGo, $(this));
			}
			else
			{
				window.location.hash = "#/" + urlToGo;
			}
		});
	});
}
Muffin.bindAjaxEvents = bindAjaxEvents;

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
Muffin.addCheckHandler = addCheckHandler;

// pre-submit callback
function showRequest(formData, jqForm, options) {
	NProgress.start();
	$('a[role="indicator"]').html("<span class='icon-hourglass'></span> Enregistrement...");
    //var queryString = $.param(formData);
    return true;
}
Muffin.showRequest = showRequest;

// post-submit callback
function showResponse(responseText, statusText, xhr, $form) {
	NProgress.done();
	$('a[role="indicator"]').html("<span class='icon-checkmark2'></span> Enregistré.");
}
Muffin.showResponse = showResponse;

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
		return false;
	});
	addClearItems();

};
Muffin.initalizeForm = initalizeForm;

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
	$.smoothScroll({offset: ($(window).height() / 2), scrollElement: null, scrollTarget: a});
	NProgress.done();
	a.addClass("complete").removeClass("preparing");
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
	    // !!! Important !!!
	    // always return false to prevent standard browser submit and page navigation
	    return false;
	});
};
Muffin.initalizeAddForm = initalizeAddForm;

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
Muffin.initializePanelMenu = initializePanelMenu;

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
Muffin.initializeHelpMenu = initializeHelpMenu;

var initializeDraftsMenu = function()
{
	$("#drafts-panel > li[data-index]").hide();
	$("#drafts-panel > li[data-index='1']").show();
	$("#drafts-menu > li[data-index-toggle]").click(function()
	{
		var index = $(this).attr("data-index-toggle");
		$("#drafts-menu > li[data-index-toggle]").removeClass("active");
		$(this).addClass("active");
		$("#drafts-panel > li[data-index!='" + index + "']").hide();
		$("#drafts-panel > li[data-index='" + index + "']").show();
		treatResize();
	});
};
Muffin.initializeDraftsMenu = initializeDraftsMenu;

var expandContainer = function()
{
	$("[data-role='container']").addClass("expanded");
};
Muffin.expandContainer = expandContainer;

var reduceContainer = function()
{
	$("[data-role='container']").removeClass("expanded");
};
Muffin.reduceContainer = reduceContainer;

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
};
Muffin.queryUserStatus = queryUserStatus;

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
Muffin.markLastNotificationAsRead = markLastNotificationAsRead;

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
Muffin.checkNotifications = checkNotifications;

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
Muffin.notifications = notifications;

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
Muffin.addClearItems = addClearItems;

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
Muffin.treatResize = treatResize;

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
 	Muffin.updateSemaphore = false
 };
Muffin.afterUserUpdate = afterUserUpdate;

Muffin.updateSemaphore = false;

var initFormComportement = function()
{
 	$('#form_search_uid').submit(function(e) {
 		e.stopImmediatePropagation();
 		window.muffin.searchUSerData();
 		return false;
 	});

 	$('#form_params').submit(function(e) {

 		e.stopImmediatePropagation();
 		if (Muffin.updateSemaphore == false)
 		{
 			Muffin.updateSemaphore = true;
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
		}
		return false;
	});
};
Muffin.initFormComportement = initFormComportement;

var mainHeadLink = function()
{
	$("header > h1.title").click(function()
	{
		goToUrl("User/home");
	});
}
Muffin.mainHeadLink = mainHeadLink;



var reloadHandlers = function()
{
	NProgress.configure({showSpinner: false});
	$("a").smoothScroll();
	treatResize();
	$(window).resize(treatResize);
	bindAjaxEvents();
    initalizeAddForm();
	initFormComportement();
	initializePanelMenu();
	initializeHelpMenu();
	notifications();
	mainHeadLink();


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
			top: 100,
			bottom: function() {
				return (this.bottom = $('.footer-container').outerHeight(true));
			}
		}
	});

};
Muffin.reloadHandlers = reloadHandlers;

 	/* -----------------------------------------------------------------------------------
 	  |                           ANIMATIONS FOR POPPING PIES !                           |
 	   ----------------------------------------------------------------------------------- */

Muffin.drawPop = function(arrhey)
{
	var e = arrhey;

	var unpop = function()
	{
		elt = e.pop();
		if (elt != undefined)
		{
			elt = $(elt).get(0);
			$(elt).addClass("complete");
			setTimeout(unpop, 100);
		}
	}
	setTimeout(unpop, 400);
}

Muffin.escapeLeft = function(arrhey, callback)
{
	var e = arrhey;

	var unpop = function()
	{
		elt = e.pop();
		if (elt != undefined)
		{
			elt = $(elt).get(0);
			$(elt).addClass("escape-left");
			setTimeout(unpop, 100);
		}
		else
		{
			callback();
		}
	}
	unpop();
}

 	/* -----------------------------------------------------------------------------------
 	  |                           CHARTS SPECIFIC FUNCTIONS                               |
 	   ----------------------------------------------------------------------------------- */

Muffin.charts = {};
Muffin.charts.prepareLegend = function(leg, gdata)
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

Muffin.charts.drawTopTen = function(data, max)
{
	var gdata = data;

	if (max % 5 != 0)
	{
		max = max + 5 - (max % 5);
	}

	var ctx = $("#chart-top-users").get(0).getContext("2d");

	new Chart(ctx).Bar(data, {
	 	scaleOverlay : true,

		//Boolean - If we want to override with a hard coded scale
		scaleOverride : true,

		//** Required if scaleOverride is true **
		//Number - The number of steps in a hard coded scale
		scaleSteps : 5,
		//Number - The value jump in the hard coded scale
		scaleStepWidth : max / 5,
		//Number - The scale starting value
		scaleStartValue : 0,
	});
}

Muffin.charts.drawInscrits = function(data)
{
	var gdata = data;

	var showLegend = function()
	{
		var leg = $(".stats-inscrits-legend");
		leg.addClass("complete").removeClass("loading");
		$(".stats-big-number.loading").addClass("complete").removeClass("loading");
	};

	Muffin.charts.prepareLegend($(".stats-inscrits-legend"), gdata);
	var ctx = $("#chart-inscrits").get(0).getContext("2d");

	new Chart(ctx).Doughnut(data,
		{
			segmentStrokeColor: "#F7E4BE",
			animationEasing : "easeOutBounce"
		});
	showLegend();
}

 	/* -----------------------------------------------------------------------------------
 	  |                           TAKE A TOUR FUNCTIONS                                  |
 	   ----------------------------------------------------------------------------------- */

Muffin.tour = {};


Muffin.tour.me = function()
{
    $('#me-tour-content').joyride(
    {
		autoStart : true,
		modal:true,
		expose: true
    });
};

Muffin.tour.home = function()
{
    $('#home-tour-content').joyride(
    {
		autoStart : true,
		modal:true,
		expose: true
    });
};

/* -----------------------------------------------------------------------------------
  |                         	     DRAFT FUNCTIONS                                  |
   ----------------------------------------------------------------------------------- */

Muffin.draft = {};

Muffin.draft.keycount = 0;
Muffin.draft.saveInterval = 20;


Muffin.draft.save = function()
{
	$("[role='indicator']").html("Enregistrement...");
	if ($("#draft-aera").val() != "")
	{
		var title = $("#aera > header > h1").html();
		var text = $("#draft-aera").val();

		if ($("#aera").attr("data-draft-id") == undefined)
		{
			$.ajax({
				type: "POST",
				url: "Drafts/new_draft",
				data: {titre: title, texte: text},
				success: function(e){
					console.log("Succes new !", e);
					if (e > 0)
					{
						$("#aera").attr("data-draft-id", e);
					}
				}
			});
		}
		else
		{
			var id = $("#aera").attr("data-draft-id");

			$.ajax({
				type: "POST",
				url: "Drafts/update",
				data: {titre: title, texte: text, id: id},
				success: function(e){
					$("[role='indicator']")
						.html("<span class='icon-checkmark2'></span> Enregistré");
					console.log("Succes update !", e);
				}
			});
		}
	}
};

Muffin.draft.load = function(id)
{
	if (id != undefined && id > 0)
	{
		$.ajax({
			type: "POST",
			url: "Drafts/get",
				dataType: "json",
			data: {id: id},
			success: function(e){
				var title = _.unescape(e.draft_name);
				var text = _.unescape(e.draft_content);
				$("#aera").attr("data-draft-id", e.draft_id);
				$("#aera > header > h1").html(title);
				$("#draft-aera").val(text);
				var element = $(".triple-toggle input");
				element.each(function()
				{
					var eltId = $(this).attr("id");
					document.getElementById(eltId).checked = false;
				});
				element.each(function()
				{
					if ($(this).attr("value") == e.public || $(this).val() == e.public)
					{
						var eltId = $(this).attr("id");
						document.getElementById(eltId).checked = true;
    					$(".visibility-label").html($(this).attr("title"));
					}
				});
				Muffin.draft.render();
			}
		});
	}
};

Muffin.draft.delete = function(id, elt)
{
	if (id != undefined && id > 0)
	{
		$.ajax({
			type: "POST",
			url: "Drafts/delete",
			data: {id: id},
			success: function(e){
				if (elt)
				{
					$(elt).remove();
				}
			}
		});
	}
};

Muffin.draft.read = function(id)
{
	$("div[data-role='form-container']").children().addClass("loading");
	if (id != undefined && id > 0)
	{
		$.ajax({
			type: "POST",
			url: "Drafts/read",
			data: {id: id},
			success: function(e)
			{

				if(history.pushState)
				{
				    history.pushState(null, null, "#/Drafts/read/" + id);
				    //goToUrl("Drafts/read/" + id, "expanded");
				}
				else
				{
					//window.location.hash = "#/Drafts/read/" + id;
				}

				data = $(e);
				data.addClass("loading");
				$(".read-list li").addClass("loading").hide();
				$("[data-role='form-container']").html(data);
				NProgress.done();
				data.addClass("complete");
				/*var ctnt = _.unescape($("#draft-read-content").html());
			    var mkd = marked(ctnt);
				$("#draft-read-content").html(mkd);
			    Prism.highlightAll();*/
				data.addClass("complete");
				treatResize();

			}
		});
	}
};

Muffin.draft.changeVisibility = function(id)
{
	var element = $(".triple-toggle input[type='radio']:checked");
	if (id != undefined && id > 0)
	{
		$.ajax({
			type: "POST",
			url: "Drafts/visibility",
				dataType: "json",
			data: {id: id, new_v: element.val()},
			success: function(e){
				if (e.success == undefined)
				{
					console.log("error chvisibility");
				}
			}
		});
	}
};

Muffin.draft.render = function(mk)
{
	if (mk == undefined)
	{
    	mk = $("#marked-aera");
	}
    var dr = $("#draft-aera");
    var ct = $("#aera");
    var ctnt = _.unescape($(dr).val());
    var mkd = marked(ctnt);
    mk.html(mkd);
    Prism.highlightAll();
	treatResize();
};

Muffin.draft.watch = function()
{
	Muffin.draft.render();
    $("#draft-aera").keyup(function()
    {

    	Muffin.draft.keycount ++;
    	if (Muffin.draft.keycount >= Muffin.draft.saveInterval)
    	{
    		Muffin.draft.keycount = 0;
  			Muffin.draft.save();
    	}
    	Muffin.draft.render();

    });

    $("#draft-aera").change(function()
  	{
  		Muffin.draft.save();
  	});
};

Muffin.draft.init = function()
{
    var dr = $("#draft-aera");
    var mk = $("#marked-aera");
    var ct = $("#aera");

    var p = document.getElementById("draft-access--private");
    if (p)
	{
		p.checked = true;
	}

	$("[data-draft-load]").click(function(e)
	{
		var elt = $(this);
		var draft_id = $(this).attr("data-draft-id");
		if (draft_id)
		{
			if(history.pushState)
			{
			    history.pushState(null, null, "#/Drafts/create");
			    goToUrl("Drafts/create", "expanded");
			}
			else
			{
				window.location.hash = "#/Drafts/create";
			}
			Muffin.draft.load(draft_id);
			e.stopImmediatePropagation();
		}
	});

    $(".drafter-article h1[role='title']").mouseout(function()
    {
        if ($(this).html() != "Sans titre")
        {
            $(this).removeClass("unedited");
        }
    });

    $('[data-action="preview"]').click(function()
    {
        dr.hide();
        mk.show();
        $('[data-action="edit"]').show();
        $('[data-action="preview"]').hide();
    });

    $('[data-action="edit"]').click(function()
    {
        dr.show();
        mk.hide();
        $('[data-action="edit"]').hide();
        $('[data-action="preview"]').show();
    });

    $('[data-action="save"]').click(function()
    {
        Muffin.draft.save();
    });

    $(".triple-toggle input[type='radio']").change(function()
    {
		var id = $("#aera").attr("data-draft-id");
    	var element = $(".triple-toggle input[type='radio']:checked");
    	$(".visibility-label").html(element.attr("title"));
        Muffin.draft.changeVisibility(id);
    });

    $(".raw-date").each(function()
    {
	    var globalLang = moment();
	    moment.lang('fr');

        $(this).html( moment( $(this).attr("data-date") ).fromNow() );
    });

    $(".btn-draft-read[data-id]").click(function()
    {
    	var elt = $(this);
		var _id = elt.attr("data-id");
		Muffin.draft.read(_id);
    });

    $(".btn-draft-delete").click(function()
    {
    	var elt = $(this);
    	var li = elt.parent();
		var _id = elt.attr("data-id");
		Muffin.draft.delete(_id, li);
    });

    $("li[id^='draft-element-']").click(function()
    {
    	var elt = $(this);
		var _id = elt.attr("data-id");

		Muffin.draft.read(_id);
		/*
    	console.log("li click");
    	var elt = $(this);
    	var list = [];
    	$("li[id^='draft-element-']").each(function()
    	{
    		list.push("#" + $(this).attr("id"));
    	}).promise().done(function()
    	{
			console.log("list = ", list);
			var fct = function()
			{
				var _id = elt.attr("data-id");
    			Muffin.draft.read(_id);
			};
			Muffin.escapeLeft(list, fct);
    	});
		*/
    });

    mk.hide();
    mk.focus();
    mk.trigger('click');
    mk.select();
	treatResize();
}
