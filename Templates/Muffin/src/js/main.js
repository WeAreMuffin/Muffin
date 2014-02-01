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
 *
 * This file is part of the moon framework.
 *
 * (c) 2013 Lambdaweb - www.lambdaweb.fr
 *
 *
 * @author lambda2
 */


function locationHashChanged() {
    if (location.hash != "" && location.hash != undefined)
    {
        var url = location.hash;
        console.log("onhashchange(event) => " + url);
        Muffin.goToUrl(url.slice(2), ((url.search("Drafts") > 0) ? "expanded" : undefined));
		if (url.search("Drafts") <= 0)
		{
			Muffin.reduceContainer();
		}
    }
}


$(document).ready(function()
{
	initalizeForm();
	reloadHandlers();
	/*$.bind("ajaxComplete", function() {
		reloadHandlers();
	});*/

	window.onhashchange = locationHashChanged;
	window.clearInterval(window.intervalHandler);
	window.intervalHandler = setInterval(notifications,5000);
	/**
	 * Json calls to Github Api
	 * @type @exp;$@call;getJSON
	 */
	$.getJSON("https://api.github.com/repos/lambda2/Muffin/tags", function(dataT)
	{
		var lastSha = dataT[0].commit.sha;
		$.getJSON("https://api.github.com/repos/lambda2/Muffin/commits/" + lastSha, function(dataC)
		{
			var lastCommit = dataC;
			var cDate = lastCommit.commit.committer.date.slice(0, 10);
			var cAdd = lastCommit.stats.additions;
			var cDel = lastCommit.stats.deletions;
			var cStats = "<span class='icon-flow-tree'></span> <span class='git-add'>+" + cAdd + "</span>  <span class='git-del'>-" + cDel + "</span>";
			$("div[role='git-info']").html("<p>\n\
				<a href='https://github.com/lambda2/Muffin'><span class='icon-github'></span>\n\
				v" + dataT[0].name + " datant du " + cDate + "  ─  " + cStats + "</a> </p>");
		});
	});
});
