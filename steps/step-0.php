<!--
Ce fichier va contenir la primère étape du questionnaire, c'est à dire la prise
du login de l'étudiant, l'envoi d'un code à ce dernier et la vérification de ce
code.
-->

<aside>
    <div role="icon">
        <span class="icon-info"></span>
    </div>
</aside>
<article>
    <header>
        <div role="title">
            <h1>Tout d'abord, qui est-tu ?</h1>
            <p>Entre ton uid pour t'identifier</p>
        </div>
    </header>
    <section>
        <form id="form-login">
            <input type="text" placeholder="Uid" id="input-login" name="login">
            <button type="submit"><span class='icon-chevron-sign-right'></span></button>
        </form>
    </section>

    <script>
        $(document).ready(function()
        {
            var envoyerCode = function(login)
            {
                $.ajax({
                    type: "POST",
                    data: {login: login, action: "register"},
                    url: "modules/code.php"
                }).done(function(e)
                {
                    if (e.toString()[0] === "1")
                    {
                        console.log("L'enregistrement de " + login + " a réussi !");
                        $.get("steps/step-1-new.php", function(data) {
                            $("#input-login").attr("disabled", "disabled");
                            $("#input-login + button").attr("disabled", "disabled")
                                .html("<span class='icon-checkmark'></span>");
                            var data = $(data);
                            data.addClass("loading");
                            $("div[data-role='container']").append(data);
                            setTimeout(function() {
                                data.addClass("complete");
                            }, 200);
                        });
                    }
                    else if(e.toString().slice(0,2) === "-1")
                    {
                        console.log(login + " existe déja");
                        $.get("steps/step-1-exists.php", function(data) {
                            $("#input-login").attr("disabled", "disabled");
                            $("#input-login + button").attr("disabled", "disabled")
                                .html("<span class='icon-checkmark'></span>");
                            var data = $(data);
                            data.addClass("loading");
                            $("div[data-role='container']").append(data);
                            setTimeout(function() {
                                data.addClass("complete");
                            }, 200);
                        });
                    }
                    console.log("Done !", e);
                });
            };

            $("#form-login").submit(function(ev)
            {
                ev.preventDefault();
                console.log("Submit !");
                envoyerCode($("#input-login").val());
                return false;
            });
        });
    </script>
</article>
