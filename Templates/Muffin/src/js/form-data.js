/*
 * Ce fichier va contenir toutes les données relatives au formulaire.
 */


var niveaux = function(enable) {
	var n;
	if (enable === null || enable === undefined
		|| enable === "")
	{
		n = {low: {label: ""}, med: {label: ""}, high: {label: ""}};
	}
	else
	{
		n = {
			low: {enable: enable, label: ""},
			med: {enable: enable, label: ""},
			high: {enable: enable, label: ""}
		};
	}
	return n;
};
