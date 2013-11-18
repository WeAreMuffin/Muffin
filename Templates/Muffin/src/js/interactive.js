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

/*
 * ============================================================================
 * Step-00 Connexion
 * ============================================================================
 */
var displaceElt = function(disap, displace)
{
	var height = displace.offset().top - disap.offset().top;
	disap.addClass("disappear");
	displace.attr("style", "position: relative;top: -" + height + "px;");
};

var envoyerCode = function(login)
{
	NProgress.start();
	$.ajax({
		type: "POST",
		data: {login: login, action: "register"},
		url: "modules/code.php"
	}).done(function(e)
	{
		if (e.toString()[0] === "1")
		{
			NProgress.inc();
			$.get("steps/step-1-new.php", function(data) {
				$("#input-login").attr("disabled", "disabled");
				$("#input-login + button").attr("disabled", "disabled")
					.html("<span class='icon-checkmark'></span>");
				var data = $(data);
				data.addClass("loading");
				$("div[data-role='container']").append(data);
				setTimeout(function() {
					$.smoothScroll({offset: ($(window).height() / 2), scrollElement: null, scrollTarget: '#input-code'});
					NProgress.done();
					data.addClass("complete");
					displaceElt($("[data-content='login'] header"), $("[data-content='login'] form"));
				}, 200);
			});
		}
		else if (e.toString().slice(0, 2) === "-1")
		{
			NProgress.inc();
			$.get("steps/step-1-exists.php", function(data) {
				$("#input-login").attr("disabled", "disabled");
				$("#input-login + button").attr("disabled", "disabled")
					.html("<span class='icon-checkmark'></span>");
				var data = $(data);
				data.addClass("loading");
				$("div[data-role='container']").append(data);
				setTimeout(function() {

					$.smoothScroll({offset: ($(window).height() / 2), scrollElement: null, scrollTarget: '#input-code'});
					NProgress.done();
					data.addClass("complete");
					displaceElt($("[data-content='login'] header"), $("[data-content='login'] form"));
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


 var changeName = function(name)
            {
                $("[data-content='login']").addClass("disappear")
                    .queue("fx",function(){
                        $(this).html("<h1 class='entered-login'><i>" + name + "</i></h1>").dequeue();
                    }).addClass("appear");
            };
            
            var verifierCode = function(code, login)
            {
                $.ajax({
                    type: "POST",
                    data: {
                        code: code,
                        login: login,
                        action: "checkCode"
                    },
                    url: "modules/code.php"
                }).done(function(e)
                {
                    if (e.toString()[0] === "1")
                    {
                        {
                            $.get("steps/step-2.php", {code: code, login: login},
                            function(data) {
                                $("#input-code").attr("disabled", "disabled");
                                $("#input-code + button").attr("disabled", "disabled")
                                    .html("<span class='icon-checkmark'></span>");
                                var data = $(data);
                                data.addClass("loading");
                                $("div[data-role='container']").children().slideUp();
                                $("div[data-role='container']").html(data);
                                setTimeout(function() {
                                    NProgress.done();
                                    data.addClass("complete");
                                }, 200);
                            });
                        }
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

            var renvoyerCode = function(login)
            {
                var button = $("#re-send-mail");
                var span = button.find("span").first();
                span.removeClass("icon-repeat").addClass("icon-time");
                $.ajax({
                    type: "POST",
                    data: {login: login, action: "update"},
                    url: "modules/code.php"
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
 * Step-01 new Passw
 * ============================================================================
 */
