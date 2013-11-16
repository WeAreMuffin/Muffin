<!--
Si on a rentré un login non existant
-->
<?php include_once '../modules/functions.php'; ?>
<aside>
    <div role="icon"><span class="icon-briefcase"></span></div>
    <div role="description">
        <h3 style="text-align: center;"><span class="icon-pushpin"></span> <i>Notes</i></h3>
        <p>
            <span style="color: rgb(255, 173, 0);" class='icon-star3'></span>
            <span class='icon-star'></span>
            <span class='icon-star'></span>: Débutant
        </p>
        <p>
            <span class='icon-star'></span>
            <span style="color: #D95B43;" class='icon-star3'></span>
            <span class='icon-star'></span>: Intermédiaire
        </p>
        <p>
            <span class='icon-star'></span>
            <span class='icon-star'></span>
            <span style="color: #542437;" class='icon-star3'></span>: Avancé
        </p>
        <a class="btn" role="indicator">À jour</a>
    </div>
</aside>
<article>
    <header>
        <div role="title">
            <h1>Fabuleux !</h1>
            <p>Il ne te reste plus que à cocher tes compétences</p>
        </div>
    </header>
    <section>
        <form id="form-competences">
            <input type="hidden" id="form-login" name="login" value="<?php echo $_GET['login']; ?>">
            <input type="hidden" id="form-code" name="code" value="<?php echo $_GET['code']; ?>">
        </form>
        <div id="form-result"></div>
    </section>

        <script>
            <?php echo generateJsFormData(); ?>
                
            var toCheck = [<?php echo getCheckedRadios($_GET['login'], $_GET['code']); ?>];
        </script>
    <script>

        $(document).ready(function()
        {
            createFormCompetences();
/*
            $("[data-submit]").each(function(){
                $(this).click(function(){
                    $('#' + $(this).attr("data-submit")).trigger('submit');
                });
            });
            */
           
            initalizeForm();
            
           $(".radio input").change(function(){
               console.log("change !");
               $("#form-competences").trigger('submit');
           });
           
           // Mise à jour des champs
           for (elt in toCheck)
           {
               $("input#" + toCheck[elt]).attr("checked","checked");
           }
        });
    </script>
</article>
