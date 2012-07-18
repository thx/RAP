/**
 * ecui补丁, 修复各种兼容性问题
 */

(function() {
	/**
     * 适配器
     */
	var core = ecui, // {{{
        ui = core.ui,
        util = core.util,
        lib = baidu,

        WINDOW = window,
        DOCUMENT = document,

        indexOf = core.array.indexOf,
        createDom = core.dom.create,
        createSWF = util.createSWF,
        inherits = util.inherits,
        blank = util.blank,
        parse = util.parse,
        stringify = util.stringify,
        each = lib.array.each,
        ieVersion = core.browser.ie,

        Timer = core.Timer,

        UI_CONTROL = ui.Control,
        UI_CONTROL_CLASS = UI_CONTROL.prototype; //}}}

	/**
     * 本地储存恢复表单修复
     * @fix desc: createDom接口改变
     */
	ui.Storage.prototype.restore = function(storageId, curForm) { //{{{
		var data = parse(this.getMovie().restore(storageId.substring(3)));

		if (data.form) {

			var o = data.name,
			elements = data.elements,
			i = 0,
			form = curForm || DOCUMENT[o];

			if (!form) {
				form = createDom('', '', 'form');
				DOCUMENT.body.appendChild(form);
				form.setAttribute('name', o);
				form.setAttribute('action', data.action);
				form.setAttribute('method', data.method),
				form.setAttribute('target', data.target);
			}

			main: for (; data = elements[i++];) {
				var name = data.name,
				type = data.type,
				value = data.value,
				el = form[name],
				j = el ? el.length: 0;

				if (type == 'radio' || type == 'checkbox') {
					if (j) {
						for (; j--;) {
							o = el[j];
							if (o.value == value && o.type == type) {
								o.checked = true;
								continue main;
							}
						}
					}
					else if (el.value == value && el.type == type) {
						el.checked = true;
						continue;
					}
				}
				else {
					if (j) {
						for (; j--;) {
							o = el[j];
							if (o.id == data.id && o.type == type) {
								el = o;
								break;
							}
						}
					}
					else if (el && el.type != type) {
						el = null;
					}

					if (el) {
						if (type != 'select-multiple') {
							el.value = value;
						}
						else {
							for (j = 0; o = el.options[j++];) {
								if (indexOf(data.values, o.value) >= 0) {
									o.selected = true;
								}
							}
						}
						continue;
					}
				}

				if (type != 'select-multiple') { (el = createDom('', '', 'input')).type = 'hidden';
					el.setAttribute("name", name);
					el.value = value;
					form.appendChild(el);
				}
				else {
					for (o = data.values, j = o.length; j--;) { (el = createDom('', '', 'input')).type = 'hidden';
					    el.setAttribute("name", name);
						el.value = o[j];
						form.appendChild(el);
					}
				}
			}
		} else {
			form = data.data;
		}

		return form;
	}; // }}}     

	/**
     * mask
     * @fix desc: ie 6下隐藏所有select
     */
	(function() { //{{{
		var stdMask = core.mask;

		function canSetVisible(item) {
			var obj = item;
			while (obj && obj.nodeName.toLowerCase() != 'body') {
				if (obj.style.visibility == 'hidden') {
					return false;
				}
				obj = obj.parentNode;
			}
			return true
		}

		function beforeMask(opacity) {
			var area = baidu.dom.g('wrapper') || document.body,
			sels = area.getElementsByTagName('select');;
			if ('number' != typeof opacity) {
				each(sels, function(item, index) {
					if (item.getAttribute('maskhide') == 'true') {
						item.style.visibility = 'visible';
						item.removeAttribute('maskhide');
					}
				});
			}
			else {
				each(sels, function(item, index) {
					if (canSetVisible(item)) {
						item.style.visibility = 'hidden';
						item.setAttribute('maskhide', 'true');
					}
				});
			}
		}

		core.mask = function(opacity, zIndex) {
			if (ieVersion <= 6) {
				beforeMask(opacity);
			}
			stdMask.call(core, opacity, zIndex);
		};
	})(); //}}}
})();

/* vim:set fdm=marker: */

