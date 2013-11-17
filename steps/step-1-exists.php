<!--
Si on a rentré un login déja existant
-->

<aside>
    <div role="icon"><span class="icon-key"></span></div>
</aside>
<article data-content="exists">
    <header>
        <div role="title">
            <h1 id="hello-name">Re-bonjour !</h1>
            <p>Il semblerait que tu sois déjà venu !</p>
            <p><a class="btn" id="re-send-mail">M'envoyer une nouvelle phrase <span class="icon-upload2"></span></a></p>
        </div>
    </header>
    <section>
        <form id="form-passphrase">
            <input type="text" placeholder="Passphrase" id="input-passphrase" name="passphrase">
            <input type="hidden" id="input-login" value="<?php echo $_POST['login']; ?>" name="login">
            <button type="submit"><span class='icon-chevron-sign-right'></span></button>
        </form>
    </section>

    <script>
        $(document).ready(function()
        {
            
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
            
                NProgress.start();
            $.ajax({
                type: "POST",
                data: {login: $("#input-login").val().toString(), action: "getLoginJson"},
                url: "modules/code.php",
                success: function(e)
                {
                    if (e.toString() != "0")
                    {
                        e = $.parseJSON(e);
                        $("#hello-name").html("Re-bonjour " + e.prenom + " !");
                    }
                }
            });


            $("#form-passphrase").submit(function(ev)
            {
                NProgress.start();
                $("#input-passphrase + input + button").html("<span class='icon-time'></span>");
                ev.preventDefault();
                $("#form-passphrase").parent().find("p[role='status']").html("Vérification en cours <span class='rotate'></span>");
                verifierCode($("#input-passphrase").val(), $("#input-login").val());
                return false;
            });
            $("#re-send-mail").click(function() {
                NProgress.start();
                renvoyerCode($("#input-login").val());
            });
        });
    </script>
</article>
