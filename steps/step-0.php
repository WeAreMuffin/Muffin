<!--
Ce fichier va contenir la première étape du questionnaire, c'est à dire la prise
du login de l'étudiant, l'envoi d'un code à ce dernier et la vérification de ce
code.
-->

<article data-content="home">
    <header>
        <div role="home-title">
            <h3>Ce petit site a pour objectif de <span>recueillir</span> un maximum d'informations concernant les <span>compétences</span> de chacun,
                et de les mettre à disposition pour faciliter les <span>échanges</span>, le <span>partage</span> et les <span>petits boulots</span>.</h3>
        </div>
    </header>
</article>
<aside>
    <div role="icon">
        <span class="icon-info"></span>
    </div>
</aside>
<article data-content="login">
    <header class="tra">
        <div role="title">
            <h1>Tout d'abord, qui est-tu ?</h1>
            <p>Entre ton uid pour t'identifier</p>
        </div>
    </header>
    <section class="tra">
        <form id="form-login">
            <input type="text" placeholder="Uid" id="input-login" name="login">
            <button type="submit"><span class='icon-chevron-sign-right'></span></button>
        </form>
    </section>

    <script>
        $(document).ready(function()
        {

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
                                $.smoothScroll({ offset: ($(window).height()/2), scrollElement: null, scrollTarget: '#input-code' });
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
                                
                                $.smoothScroll({ offset: ($(window).height()/2), scrollElement: null, scrollTarget: '#input-code' });
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



            $("#form-login").submit(function(ev)
            {
                $("#input-login + button").html("<span class='icon-time'></span>");
                ev.preventDefault();
                console.log("Submit !");
                envoyerCode($("#input-login").val());
                return false;
            });
        });
    </script>
</article>
