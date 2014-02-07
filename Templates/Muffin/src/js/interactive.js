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

(function($) {

	window.muffin = {};

	/*
	 * ============================================================================
	 * Step-00 Connexion
	 * ============================================================================
	 */
	muffin.displaceElt = function(disap, displace)
	{
		var height = displace.offset().top - disap.offset().top;
		disap.addClass("disappear");
		displace.attr("style", "position: relative;top: -" + height + "px;");
	};

	muffin.envoyerCode = function(login)
	{
		NProgress.start();
		$.ajax({
			type: "GET",
			url: "Login/register/" + login
		}).done(function(e)
		{
			if (e.toString()[0] === "1")
			{
				NProgress.inc();
				$.get("Home/loginnew/" + login, function(data) {
					$("#input-login").attr("disabled", "disabled");
					$("#input-login + button").attr("disabled", "disabled")
						.html("<span class='icon-checkmark'></span>");
					data = $(data);
					data.addClass("loading");
					$("div[data-role='container']").append(data);
					setTimeout(function() {
						$.smoothScroll({offset: ($(window).height() / 2), scrollElement: null, scrollTarget: '#input-code'});
						NProgress.done();
						data.addClass("complete");
						muffin.displaceElt($("[data-content='login'] header"), $("[data-content='login'] form"));
						data.find("#input-passphrase").focus();
					}, 200);
				});
			}
			else if (e.toString().slice(0, 2) === "-1")
			{
				NProgress.inc();
				$.get("Home/loginExists/" + login, function(data) {
					$("#input-login").attr("disabled", "disabled");
					$("#input-login + button").attr("disabled", "disabled")
						.html("<span class='icon-checkmark'></span>");
					data = $(data);
					data.addClass("loading");
					$("div[data-role='container']").append(data);
					setTimeout(function() {

						$.smoothScroll({offset: ($(window).height() / 2), scrollElement: null, scrollTarget: '#input-code'});
						NProgress.done();
						data.addClass("complete");
						muffin.displaceElt($("[data-content='login'] header"), $("[data-content='login'] form"));
					}, 200);
				});
			}
			else if (e.toString().slice(0, 2) === "-2")
			{
				NProgress.done();
				$("[data-content='login'] div[role='title'] > p").first().html("Vous devez être un étudiant de 42");
				$("#input-login + button").html('<span style="color: #C02942;" class="icon-warning-sign"></span> <span class="icon-repeat"></span>');
			}
		});
	};


	/*
	 * ============================================================================
	 * Step-01 exists Passw
	 * ============================================================================
	 */


	muffin.changeName = function(name)
	{
		$("[data-content='login']").addClass("disappear")
			.queue("fx", function() {
				$(this).html("<h1 class='entered-login'><i>" + name + "</i></h1>").dequeue();
			}).addClass("appear");
	};

	muffin.verifierCode = function(code, login)
	{
		$.ajax({
			type: "POST",
			data: {code: code, login: login},
			url: "Login/checkCode"
		}).done(function(e)
		{
			if (e.toString()[0] === "1")
			{
				if (Muffin.redirect == undefined)
				{
					Muffin.redirect = "User/index";
				}
					$.get(Muffin.redirect,
						function(data)
						{
							$("#input-code").attr("disabled", "disabled");
							$("#input-code + button").attr("disabled", "disabled")
								.html("<span class='icon-checkmark'></span>");
							data = $(data);
							data.addClass("loading");
							$("div[data-role='container']").children().slideUp();
							$("div[data-role='container']").html(data);
							var headerToolbar = $("#main-head-toolbar");
							if (headerToolbar.children().length == 0)
							{
								headerToolbar.html('<a class="btn" data-toggle="modal" data-target="#modal-notifications" class="btn" id="notif-aera"></a><a class="btn" data-toggle="modal" data-target="#modal-params"><span class="icon-spoon"></span></a><a class="btn" role="indicator">À jour</a>');
					            console.log("Toolbar updated !");
							}
							reloadHandlers();
							NProgress.done();
							data.addClass("complete");
						});
			}
			else
			{
				$("#form-passphrase").parent().parent().find("div[role='title'] > p").first().html("Mot de passe incorrect");
				$("#input-passphrase").attr("style", "color: #C02942");
				$("#form-passphrase").find("button")
					.html('<span style="color: #C02942;" class="icon-warning-sign"></span> <span class="icon-repeat"></span> ');
			}
		});
	};

	muffin.renvoyerCode = function(login)
	{
		var button = $("#re-send-mail");
		var span = button.find("span").first();
		span.removeClass("icon-repeat").addClass("icon-time");
		$.ajax({
			type: "GET",
			url: "Login/update/" + login
		}).done(function(e)
		{

			NProgress.done();
			if (e.toString()[0] === "1")
			{
				button.html("Mail envoyé ! <span class='icon-checkmark'></span>");
			}
			else
			{
				button.html("Une erreur s'est produite <span class='icon-warning-outline'></span>");
			}
		});
	};


	/*
	 * ============================================================================
	 * Search for user data
	 * ============================================================================
	 */

	 muffin.autoSearchUser = function(name)
	{
		var max_results = 5;
		var container = $("#search_user_results");
		var field = $("#search_comp_uid");
		if(name != "" && name != undefined)
		{
			$.getJSON("Search/users/" + name, function(data)
			{
				var a, i;
				container.parent().show();
				container.empty();
			  	for (i in data) {
			  		if ( i < max_results)
			  		{
			  			console.log(i);
				  		a = $("<li><a>" + data[i] + "</a></li>");
				  		a.click(function() {
				  			field.val($(this).text());
				  			muffin.searchUSerData();
				  		});
						container.append(a);
					}
				}
			});
		}
		else
		{
			container.parent().hide();
			container.empty();
		}
	}

	muffin.searchUSerData = function()
	{
		var login = $("#search_comp_uid").val();
		var button = $("#btn_search_comp_uid");
		var span = button.find("span").first();
		var status = $("#status_search_comp_uid");
		var modal = ("#modal-explore");
		if (login)
		{
			span.removeClass("icon-uniF488").addClass("icon-clock3");
			$.ajax({
				type: "GET",
				url: "Search/user/" + login
			}).done(function(e)
			{

				NProgress.done();
				if (e.toString()[0] === "0")
				{
					span.removeClass("icon-clock3").addClass("icon-multiply");
					status.html("Il semblerait que l'uid n'existe pas, ou que ses compétences ne soient pas publiques.");
				}
				else
				{
					span.removeClass("icon-clock3").addClass("icon-uniF488");
					$(modal).modal('hide');
		  			$("#search_comp_uid").val("");
		  			muffin.autoSearchUser();
					e = $(e);
						e.addClass("loading");
						$("div[data-role='form-container']").children().slideUp();
						$("div[data-role='form-container']").html(e);
						setTimeout(function() {
							NProgress.done();
							e.addClass("complete");
							reloadHandlers();
						}, 200);
				}
			});
		}
		else
		{
			status.html("Vous devez rentrer un uid");
		}

	};


})(jQuery);
