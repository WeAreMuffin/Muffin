/*! makeforms - v0.0.3 - 2013-11-14
* https://github.com/lambda2/MakeForms
* Copyright (c) 2013 André Aubin; Licensed Apache 2 */
(function($) {
	$.fn.makeForms = function(params)
	{
		var item, i, elt, htmlItems, finalHtmlItems,
			totalSize, groupHtml, groupTemplate,
			enableList = {}, disableList = {};

		params = $.extend(
			{
				components: {},
				groupSize: 1,
				selectMinSize: 18,
				position: "before",
				templates: {}
			}, params);

		params.templates = $.extend(
			{
				item: "{{item}}",
				title: "<p>{{title}}</p>",
				group: "<div data-role='group'>{{group}}</div>",
				item_group: "<div class='item-group'>{{items}}</div>",
				label: '<label for="{{id}}">{{label}}</label>',
				radio: '<label for="{{id}}"><input type="radio" name="{{name}}"\
	id="{{id}}" value="{{value}}">{{label}}</label>',
				text: '<input type="text" name="{{name}}"\
	id="{{id}}" value="{{value}}">',
				input: '<input type="{{type}}" name="{{name}}"\
	id="{{id}}" value="{{value}}">',
				select: '<select id="{{id}}" name="{{name}}">{{options}}</select>',
				option: '<option id="{{id}}" value="{{value}}">{{label}}</option>'
			}, params.templates);

		/**
		 * Will fill a template with the given data, and return it.
		 * @param {String} template
		 * @param {Object} data
		 * @returns {String}
		 */
		var applyTemplate = function(template, data)
		{
			var code, query;

			code = template;

			for (query in data)
			{
				if (code.search("{{" + query + "}}") !== -1 && data.hasOwnProperty(query))
				{
					code = code.replace("{{" + query + "}}", data[query]);
					code = applyTemplate(code, data);
				}
			}
			return (code);
		};

		/**
		 * Will return the number of items in the givent data.
		 * @param {Object} data
		 * @returns {Number}
		 */
		var getSize = function(data)
		{
			var count, query;

			count = 0;
			for (query in data)
			{
				count = count + 1;
			}
			return (count);
		};

		/**
		 *
		 * @param {Object} data
		 * @returns {String}
		 */
		var getGoodType = function(data)
		{
			var type, size;

			if (data.hasOwnProperty("type"))
			{
				type = data.type;
			}
			else
			{
				size = getSize(data.choices);
				if (size <= 1)
				{
					type = "text";
				}
				else if (size < params.selectMinSize)
				{
					type = "radio";
				}
				else
				{
					type = "option";
				}
			}
			return (type);
		};

		var groupLoop = function(list, eltName, eltType, eltSection)
		{
			var lhtml = "", option;

			for (option in list)
			{
				var obj, itemId, labelTemplate, labelHtml, currentHtml, nt;

				if (option !== "group")
				{
					obj = list[option];

					if (obj.hasOwnProperty("type"))
					{
						nt = params.templates[obj.type];
					}
					else
					{
						nt = currentTemplate;
					}
					/**
					 * First, we will set the text of the label.
					 */
					itemId = eltName + "_" + eltSection + "_" + option;
					labelTemplate = params.templates.label;
					if (eltType !== "option" && eltType !== "radio")
					{
						labelHtml = applyTemplate(
							labelTemplate,
							{
								label: obj.label,
								id: itemId
							}
						);
					}
					else
					{
						labelHtml = "";
					}
					
					if (!obj.hasOwnProperty("value"))
					{
						obj.value = eltSection + "_" + option;
					}

					currentHtml = applyTemplate(
						nt,
						{
							name: eltName,
							id: itemId,
							value: obj.value,
							label: obj.label
						});

					if (obj.hasOwnProperty("before"))
					{
						currentHtml = obj["before"] + currentHtml;
					}
					if (obj.hasOwnProperty("after"))
					{
						currentHtml = currentHtml + obj["after"];
					}

					lhtml = lhtml + labelHtml + currentHtml;
				}
			}
			return lhtml;
		};

		var getItemsList = function(enableList, enableId)
		{
			var mitem, item;
			var tempList = [];
			for (mitem in enableList[enableId])
			{
				var val = enableList[enableId][mitem].slice(1);
				for (item in params.components[val].choices)
				{
					tempList.push("#" + val + "_" + item);
				}
				$(tempList.join(', ')).show();
			}
			return tempList;
		};
		
		var enableTriggers = function(obj, itemId)
		{
						var counter = 0;
			/* Enable triggers */
					if (obj.hasOwnProperty("enable"))
					{
						if (itemId in enableList === false)
						{
							enableList["#" + itemId] = [];
						}
						for (counter = 0; counter < obj.enable.length; counter++)
						{
							enableList["#" + itemId].push("#" + obj.enable[counter] + "");
						}
					}
					if (obj.hasOwnProperty("disable"))
					{
						if (itemId in disableList === false)
						{
							disableList["#" + itemId] = [];
						}
						for (counter = 0; counter < obj.disable.length; counter++)
						{
							disableList["#" + itemId].push("#" + obj.disable[counter]);
						}
					}
		};

		var eltLoop = function(list, eltName, eltLabel, eltType)
		{
			var isGroup = false, option;
			for (option in list)
			{
				var obj, itemId, labelTemplate, labelHtml, currentHtml, nt;

				obj = list[option];



				isGroup = obj.group;
				if (isGroup !== true)
				{
					if (obj.hasOwnProperty("type"))
					{
						nt = params.templates[obj.type];
					}
					else
					{
						nt = currentTemplate;
					}
					/**
					 * First, we will set the text of the label.
					 */
					itemId = eltName + "_" + option;
					labelTemplate = params.templates.label;
					if (eltType !== "option" && eltType !== "radio")
					{
						labelHtml = applyTemplate(
							labelTemplate,
							{
								label: obj.label,
								id: itemId
							}
						);
					}
					else
					{
						labelHtml = "";
					}

					/* Enable triggers */
					enableTriggers(obj, itemId);

					if (!obj.hasOwnProperty("value"))
					{
						obj.value = option;
					}

					currentHtml = applyTemplate(
						nt,
						{
							name: eltName,
							id: itemId,
							value: obj.value,
							label: obj.label
						});

					if (obj.hasOwnProperty("before"))
					{
						currentHtml = obj["before"] + currentHtml;
					}
					if (obj.hasOwnProperty("after"))
					{
						currentHtml = currentHtml + obj["after"];
					}

					html = html + labelHtml + currentHtml;
				}
				else if (isGroup === true)
				{
					var innerHtml = "";
					var ghtml = groupLoop(obj, eltName, eltType, option);
					innerHtml = innerHtml + ghtml;

					html = html + applyTemplate(
						params.templates.item_group,
						{items: innerHtml}
					);
				var idName = eltName + "_" + option + "_all";
					enableTriggers(obj, idName);
				}
			}
			return html;
		};

		/**
		 * Will contains the html code of each form element.
		 * @type {Array}
		 */
		htmlItems = [];
		finalHtmlItems = [];

		totalSize = getSize(params.components);

		/**
		 * We want to keep a reference on the current jQuery object.
		 */
		elt = $(this);
		i = 0;

		for (item in params.components)
		{
			var eltName, eltLabel, eltType, currentTemplate, titleHtml,
				html;

			html = "";
			titleHtml = "";
			groupTemplate = "";
			eltName = item;
			eltLabel = params.components[item].label;
			eltType = getGoodType(params.components[item]);

			currentTemplate = params.templates[eltType];

			groupTemplate = params.templates.group;

			if (params.components[item].hasOwnProperty("title"))
			{
				if (params.components[item].hasOwnProperty("beforeTitle"))
				{
					titleHtml += params.components[item].beforeTitle;
				}
				titleHtml += applyTemplate(
					params.templates.title,
					{
						title: params.components[item].title
					}
				);

				if (params.components[item].hasOwnProperty("afterTitle"))
				{
					titleHtml += params.components[item].afterTitle;
				}
				htmlItems.push(titleHtml);
			}

			i = i + 1;
			eltLoop(params.components[item].choices, eltName, eltLabel, eltType);
			if (eltType === "option")
			{
				html = applyTemplate(
					params.templates.select,
					{
						name: eltName,
						id: eltName,
						options: html
					});
			}
			htmlItems.push(html);
			html = "";

			if (params.groupSize !== 0 &&
				(i % params.groupSize === 0 || i === totalSize))
			{
				groupHtml = applyTemplate(
					groupTemplate,
					{
						group: htmlItems.join('\n')
					}
				);
				finalHtmlItems.push(groupHtml);
				if (params.groupSize > 0)
				{
					htmlItems = [];
				}
			}

		}
		if (params.groupSize === 0)
		{
			groupHtml = applyTemplate(
				groupTemplate,
				{
					group: htmlItems.join('\n')
				}
			);
			finalHtmlItems.push(groupHtml);
		}
		if (params.position === "before")
		{
			elt.html(finalHtmlItems.join('\n') + elt.html());
		}
		else if (params.position === "after")
		{
			elt.html(elt.html() + finalHtmlItems.join('\n'));
		}
		else
		{
			elt.html(finalHtmlItems.join('\n'));
		}

		var enableId, disableId, list;
		for (enableId in enableList)
		{
			list = getItemsList(enableList, enableId);
			$(list.join(', ')).parents("div[data-role='group']").hide();
			$(enableId).click(function()
			{
				$(list.join(', ')).parents("div[data-role='group']").show();
			});
		}
		for (disableId in disableList)
		{
			list = getItemsList(disableList, disableId);
			$(disableId).click(function()
			{
				$(list.join(', ')).parents("div[data-role='group']").hide();
			});
		}
		return (this);
	};
})(jQuery);
