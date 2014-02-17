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

 	muffin.drawAnimations = function()
 	{
 		function tts(e, x, y)
 		{
 			return (e.transform().localMatrix.translate(x, y).toTransformString());
 		}

 		function popTasses()
 		{
 			setTimeout(function(){
 				Snap.select("#tasse_fond").animate({
 					transform: tts(Snap.select("#tasse_fond"), -15, 0)
 				}, 2000, mina.backout);
 				Snap.select("#tasse_fond").animate({
 					opacity: 0.10
 				}, 200);
 			}, 500);

 			setTimeout(function(){
 				Snap.select("#tasse_droite").animate({
 					transform: tts(Snap.select("#tasse_droite"), 25, 0)
 				}, 2000, mina.backout);
 				Snap.select("#tasse_droite").animate({
 					opacity: 0.12
 				}, 200);
 			}, 1000);

 			setTimeout(function()
 			{
 				var logo = Snap.select("#muffin_text");
 				logo.animate({
 					opacity: 1,
 					transform: tts(logo, 0, -70)
 				}, 1000, mina.bounce);
 				Snap.select("#tasse_gauche").animate({opacity: 0.12}, 200);
 				Snap.select("#tasse_gauche").animate({
 					transform: tts(Snap.select("#tasse_gauche"), -25, 0)
 				}, 2000, mina.backout);
 			}, 1500);
 		}

 		function popBubbles()
 		{
 			setTimeout(function(){ Snap.select("#bulle_haut").animate({opacity: 0.10}, 500);}, 500);
 			setTimeout(function(){ Snap.select("#bulle_bas").animate({opacity: 0.10}, 500);}, 1000);
 			setTimeout(function(){ Snap.select("#bulle_coeur").animate({opacity: 0.10}, 500);}, 1500);
 		}

 		var s = Snap(".col-left .simple-row");
 		Snap.load("Templates/Muffin/img/cups.svg", function (f) {
 			f.select("#tasse_droite").attr({opacity: 0});
 			f.select("#bulle_coeur").attr({opacity: 0});
 			f.select("#bulle_haut").attr({opacity: 0});
 			f.select("#bulle_bas").attr({opacity: 0});
 			f.select("#tasse_gauche").attr({opacity: 0});
 			f.select("#tasse_fond").attr({opacity: 0});
 			f.select("#muffin_text").attr({opacity: 0});
 			popTasses();
 			popBubbles();
 			s.append(f);
 		});
 	}


 	muffin.bindLoginEvents = function()
 	{


 		$("#input-login").focus();
 		muffin.drawAnimations();
 		$("#input-login").keyup(function(ev)
 		{
 			$.ajax({
 				type: "POST",
 				url: "Login/checkLogin/",
 				data: {"login": $("#input-login").val()}
 			}).done(function(e)
 			{
 				$(".form-group.error").removeClass("error");
 				if (e == "1")
 				{
 					$("#input-login").parent().addClass("success");
 				}
 				else
 				{
 					$("#input-login").parent().removeClass("success");
 				}
 			});
 		});

 		[].slice.call( document.querySelectorAll( 'button.progress-button' ) ).forEach( function( bttn )
 		{
 			new ProgressButton( bttn,
 			{
 				callback : function( instance )
 				{
 					var progress = 0,
 					interval = setInterval( function() {
 						progress = Math.min( progress + Math.random() * 0.1, 1 );
 						instance._setProgress( progress );

 						if( progress === 1 ) {
 							instance._stop(0);
 							clearInterval( interval );
 						}
 					}, 400 );
 					$.ajax({
 						type: "POST",
 						url: "Login/tryToLogIn/",
 						data: {
 							"login": $("#input-login").val(),
 							"passphrase": $("#input-passphrase").val(),
 							"pass42": $("#input-pass42").val()
 						}
 					}).done(function(e)
 					{
 						clearInterval( interval );
 						console.log("result : ", e);
 						if (e == "1")
 						{
 							instance._stop(1);
 							$.ajax({
 								type: "GET",
 								url: "User/index" /*@TODO: MANAGE REDIRECT */
 							}).done(function(e)
 							{
 								$("div[data-role='container']").fadeOut(100, function()
 								{
 									$(this).html($(e));
 									$(this).fadeIn(100);
					                $(".header-container").show();
					                $(".footer-container").show();
 								});
 							});

 						}
 						else
 						{
 							var elt = undefined;
 							switch (e)
 							{
 								case "0":
 								elt = $("#input-login").parent();
 								break;
 								case "-1":
 								elt = $("#input-pass42").parent();
 								break;
 								case "-2":
 								elt = $("#input-passphrase").parent();
 								break;
 								default:
 								elt = $("#input-login").parent();
 								break;
 							}
 							instance._stop(0);
 							$(".form-group.error").removeClass("error");
 							elt.removeClass("success").addClass("error");
 						}
 					});
 				}
 			});
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
