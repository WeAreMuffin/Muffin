<!--
Si on a rentré un login non existant
-->
<?php include_once '../modules/functions.php'; ?>
<?php include_once './step-2-modals.php'; ?>
<aside class="visible-desktop">
    <div role="icon"><span class="icon-briefcase"></span></div>
    <div role="description">
        <a class="btn" data-toggle="modal" data-target="#modal-info"><span class="icon-info-sign"></span></a>
        
        <a class="btn" role="indicator">À jour</a>
    </div>
    <div role="add-competence">
        <h3 style="text-align: center;"><span class="icon-bulb"></span> <i>Ajouter</i></h3>
        <p>Tu peux aussi ajouter de nouvelles compétences !</p>
        <form id="form-add-competence">
            <input type="text" placeholder="Competence" id="input-nom-comp" name="nom_competence">
            <button type="submit"><span class='icon-chevron-sign-right'></span></button>
            <input type="hidden" id="form-login" name="login" value="<?php echo $_GET['login']; ?>">
            <input type="hidden" id="form-code" name="code" value="<?php echo $_GET['code']; ?>">
        </form>
    </div>
    <!--
    <div role="show-stats">
        <h3 style="text-align: center;"><span class="icon-chart-pie"></span> <i>Et les autres ?</i></h3>
        <p>Tu peux aussi voir les statistiques des résultats (anonymes)</p>
        <a class="btn">Voir</a>
    </div>
    -->
</aside>
<article data-role="grid">
    <header>
        <div role="title">
            <h1>Fabuleux !</h1>
            <p>Il ne te reste plus que à cocher tes compétences</p>
        </div>
        <div role="description-tablette" class="hidden-desktop">
            <div><span class="icon-pushpin"></span> <i>Notes</i></div>
            <div>
                <span style="color: rgb(255, 173, 0);" class='icon-star3'></span>
                <span class='icon-star'></span>
                <span class='icon-star'></span>: Débutant
            </div>
            <div>
                <span class='icon-star'></span>
                <span style="color: #D95B43;" class='icon-star3'></span>
                <span class='icon-star'></span>: Intermédiaire
            </div>
            <div>
                <span class='icon-star'></span>
                <span class='icon-star'></span>
                <span style="color: #542437;" class='icon-star3'></span>: Avancé
            </div>
            <a class="btn" role="indicator">À jour</a>
        </div>
    </header>
    <section>
        <a href="#!"></a>
        <form id="form-competences">
            <div>
            </div>
            <input type="hidden" id="form-login" name="login" value="<?php echo $_GET['login']; ?>">
            <input type="hidden" id="form-code" name="code" value="<?php echo $_GET['code']; ?>">
        </form>
        <div id="form-result"></div>
    </section>

    <script>
<?php echo generateJsFormData (); ?>

        window.toCheck = [<?php echo getCheckedRadios ($_GET['login'], $_GET['code']); ?>];
    </script>
    <script>

        $(document).ready(function()
        {
            $(".footer-container").addClass("nofix");
            NProgress.start();
            createFormCompetences();

            $("[data-submit]").each(function() {
                $(this).click(function() {
                    $('#' + $(this).attr("data-submit")).trigger('submit');
                });
            });

            initalizeForm();
            initalizeAddForm();
            addCheckHandler(window.toCheck);
            NProgress.done();
            treatResize();

        });
    </script>
</article>
