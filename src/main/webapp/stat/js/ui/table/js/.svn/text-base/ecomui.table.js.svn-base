var ecomui = ecomui || {};

// IE 6 背景图片缓存
try {
	document.execCommand("BackgroundImageCache", false, true);
} catch(e){}

(function() {
	var lib = baidu, 
		core = ecui, 
		dom = core.dom, 
		ui = core.ui,
		util = core.util,
		inherits = util.inherits,
		copy = util.copy,
		toNumber = util.toNumber,
		get = core.get,
		query = core.query,
		setStyles = lib.dom.setStyles,
		getPosition = dom.getPosition,
		calcHeightRevise = core.calcHeightRevise,
		
		DOCUMENT = document,
		UI_TABLE = ui.LockedTable,
		UI_TABLE_CLASS = UI_TABLE.prototype,
		UI_CONTROL = ui.Control,
		ECOM_TABLE_CLASS;

	ecomui.Table = ui.EcomTable = function(el, params) {
		/*
		 * 计算表格宽度
		 */
		var tbEl = el.getElementsByTagName("table")[0];
		if (!tbEl.style.width) {
			var colEls = tbEl.rows[0].cells;
			var tbOldWidth = tbEl.offsetWidth;
			var tbWidth = 0;

			for (var i = 0, len = colEls.length; i < len; i++) {
				var o = colEls[i].style.width;
				tbWidth += (o !== undefined) ? 
								(/px$/.test(o) ? parseInt(o, 10) : tbOldWidth * (parseFloat(o) / 100)) :
								130;
			}
			tbEl.style.width = Math.max(el.offsetWidth * 0.99, tbWidth) + "px";
		}

		//隐藏待渲染的表格, 在vm里定义visibility=hidden
		//渲染表格
		UI_TABLE.call(this, el, params);

		//显示渲染好的表格
		this.getOuter().style.visibility = "visible";
		
		//记录表格索引
		this._nTbId = params.tbid;
		
		//是否有选择整列表按钮
		this._bCustom = params.custom;
		
		var colToggler, verticalBar, showOpColumn, colCount;

		showOpColumn = params.rightLock;

		//如果有操作列
		if (showOpColumn) {
			//初始操作列是展开的
			this._bOpColumnUnfolded = true;
			
			var base = this.getBase(); 
			
			//记住操作列和前一列
			//TODO 倒数第二列不能作为部件, 因为不是表格不可缺少的
			//在使用时取一下
			//colCount = this._aCol.length - 1;
			//this._uOpColumn = this.getCol(colCount);

			//收缩按钮
			var el = DOCUMENT.createElement("div");
			el.className = "ec-col-toggler";
			base.appendChild(el);
			colToggler = this._uColToggler 
				= core.$fastCreate(
					UI_CONTROL,
					el,	
					this,
					{}
				);

			//竖条
			var el = DOCUMENT.createElement("div");
			el.innerHTML = "<div></div>";
			el.className = "ec-v-toggler";
			base.appendChild(el);
			verticalBar = this._uVerticalBar 
				= core.$fastCreate(
					UI_CONTROL,
					el,
					this,
					{}
				);
			verticalBar.hide();

			//如果有纵向滚动条, 调整收缩按钮的位置
			//FIXME 此时VScroll总是有的
			var vScroll = this.$getSection("VScroll");
			colToggler.getOuter().style.right = 2 +
				((vScroll && vScroll.isShow()) ? vScroll.getWidth() : 0) + "px";
			//绑定事件
			colToggler.onclick = colTogglerClick;
			verticalBar.onclick = vBarClick;
			verticalBar.show = vBarShow;

		}

		//浮动表头
		if (params.floatthead) {
			var self = this;
			self._bFloatThead = true;
			lib.event.on(window, "scroll", function() {
				floatThead(self);
			});	
		}
		
		
	};

	ECOM_TABLE_CLASS = inherits(ui.EcomTable, UI_TABLE);

	/*
	 * 此处获得操作列
	 */
	ECOM_TABLE_CLASS.$init = function () {
		UI_TABLE_CLASS.$init.call(this);
		if (this._nRightLock) {
			this._uOpColumn = this.getCol(this._aCol.length - 1);
		}
		
		//整列表选择按钮
		if(this._bCustom) {
			var customBtn = core.get("cbCtnr_" + this._nTbId);
			customBtn && initCustomBtn(customBtn, this);
		}
	};

	/**
	 * 展开/收起按钮点击
	 * @private
	 */
	function colTogglerClick() {
		//this为按钮
		var table = this.getParent(),
			vBar = table.$getSection("VerticalBar");

		if (table._bOpColumnUnfolded) {
			//收起操作列
			foldOpColumn(table);
			vBar.show();
			this.alterClass("o");
		} else {
			//展开操作列
			unfoldOpColumn(table);
			vBar.hide();
			this.alterClass("o", true);
		}
	}

	/**
	 * 竖条点击
	 * @private
	 */
	function vBarClick() {
		//this 为竖条
		var table = this.getParent();

		//展开操作列
		unfoldOpColumn(table);
		
		this.hide();
	}

	/**
	 * 收起操作列
	 * @private
	 */
	function foldOpColumn(table) {
		var tableWidth = table.getWidth(), 
			tableBodyWidth = table.getBody().offsetWidth;

		table._uOpColumn.hide();

		//设置倒数第二列的宽度
		var col = table.getCol(table.getCols().length - 2);
		col.setSize(col.getWidth() + table._uOpColumn.getWidth());

		table._bOpColumnUnfolded = false;
	};

	/**
	 * 展开操作列
	 * @private
	 */
	function unfoldOpColumn(table) {
		var prevCol = getSndLastCol(table);

		//恢复倒数第二列恢复原来的宽度
		var col = table.getCol(table.getCols().length - 2);
		col.setSize(col.getWidth() - table._uOpColumn.getWidth());

		table._uOpColumn.show();

		
		table._bOpColumnUnfolded = true;
	};

	/**
	 * 获得倒数第二列
	 * @private
	 */
	function getSndLastCol(table) {
		var colCount = table._aCol.length - 1, 
			ret;
		while (colCount--) {
			ret = table.getCol(colCount);	
			if (ret.isShow()) { 
				break;
			}
		}
		return ret; 
	}

	/**
	 * 展开/收缩操作列时设置表格宽度
	 * @private
	 */
	function setTableWidth(table, tableWidth, tableBodyWidth) {
		var oldWidth = table._nOldWidth = table.getWidth();
		if (tableWidth > tableBodyWidth) {
			table.setSize(oldWidth + table)
		}
	}

	/**
	 * 显示竖条
	 * @private
	 */
	function vBarShow() {
		UI_CONTROL.prototype.show.call(this);
		setVBarPosition(this);
		setVBarHeight(this);
	}
	
	/**
	 * 设置竖条定位
	 * @private
	 */
	function setVBarPosition(vBar) {
		var table = vBar.getParent(),
			vBarWidth = vBar.getWidth(),
			vs = table.$getSection("VScroll"),
			style = table.getBase().style,
			contentWidth = table.getWidth() 
				- (toNumber(style.borderLeftWidth) + toNumber(style.borderRightWidth));
			
		vBar.getOuter().style.left = contentWidth - vBarWidth 
			- ((vs && vs.isShow()) ? vs.getWidth() : 0)
			+ "px";
	}


	/**
	 * 在竖条显示时设置其高度
	 * @private
	 */ 
	function setVBarHeight(vBar) {
		var table = vBar.getParent(),
			hs = table.$getSection("HScroll"),
			th = table.$getSection("Head"),
			hscrValue;

		if (hs && hs.isShow()) {//存在水平滚动条
			hs.setValue(hs.getTotal());
			hscrValue = hs.isShow() ? hs.getHeight() : 0;
		}
		else {
			hscrValue = 0;
		}

		//TODO -2 用 sumStyle算边框值
		vBar.setSize(0, table.getHeight() - th.getHeight() - 2 - hscrValue);
		var style = vBar.getOuter().style;
		style.bottom = hscrValue + "px";
	}

	/**
	 * 表头随浏览器滚动条锁定
	 * @private
	 */
	function floatThead(t) {
		var	headEl = t._uHead.getOuter(),
			lockedHeadEl = t._uLockedHead.getOuter(),
			lockedMainEl = t._uLockedMain.getOuter();
		
		if (t._uColToggler) {
			var colTogglerEl = t._uColToggler.getOuter();
		}

		var outer = t.getOuter();

		var scrollTop = DOCUMENT.body.scrollTop || DOCUMENT.documentElement.scrollTop,
			pos = getPosition(outer),
			top = pos.top + 1,
			left = pos.left;

		var headHeight = headEl.offsetHeight + calcHeightRevise(headEl),
			tbHeightDelta = t.getHeight() - headHeight,
			relativeTop = scrollTop - top;

		var floatStyles = {
			position: "absolute",
			top: relativeTop + "px",
			zIndex: 999
		};
		
		if (scrollTop 
				&& relativeTop > 0 
				&& relativeTop < tbHeightDelta) 
		{
			setStyles(headEl, floatStyles);
			setStyles(lockedHeadEl, floatStyles);
			setStyles(lockedMainEl, {top: headHeight + "px"});

			//TODO 此处性能优化
			//ecui 1.1.0 fix
			setStyles(lockedHeadEl, {width: lockedHeadEl.getElementsByTagName("table")[0].style.width});

			if (colTogglerEl) {
				setStyles(colTogglerEl, {top: 2 + relativeTop + "px", zIndex: 999});
			}
		}
		
		else {
			setStyles(headEl, {top: 0, zIndex:0});
			setStyles(lockedHeadEl, {position: "static", zIndex:0});
			setStyles(lockedMainEl, {top: ""});

			if (colTogglerEl) {
				setStyles(colTogglerEl, {top: "", zIndex:0});
			}
		}
	};
	
	/**
	 * 初始化整列表选择按钮
	 */
	function initCustomBtn(customBtn, table) {
		var tbId = table._nTbId;
		
		var	popup = core.get("cbPop_" + tbId),
			popupItems = core.query({"parent": popup}),
			popupItemsLen = popupItems.length;
			
		var	cbCurList = core.get("cball_" + tbId),
			cbWholeList = core.get("cbsall_" + tbId),
			cbCurInferiors = cbCurList.getInferiors();
		
		DOCUMENT.body.appendChild(popup.getOuter());
		
		customBtn.onclick = function() {
			var containerOuter = this.getOuter();
				containerPos = getPosition(containerOuter);

			popup.setPosition(
				containerPos.left + this.getBodyWidth(), 
				containerPos.top
			);

			popup.show();
		};
		
		cbWholeList.onclick = (function() {
			var checked = false;
			return function(){
				var i = cbCurInferiors.length,
					msg = [
						"已选择整列表, 子项目不能取消选择",
						"已取消选择整列表"
					];
				
				var msgBox = table.setMsg((!checked) ? msg[0] : msg[1]);
					
				msgBox.parentNode.parentNode.style.visibility = "visible";
				
				var hcbsall = lib.dom.g("hcbsall_" + tbId);
				while (i--) {
					cbCurInferiors[i].setChecked(!checked);
					cbCurList.setEnabled(checked);
					cbCurInferiors[i].setEnabled(checked);
					hcbsall.value = checked ? 0 : 1;	
				}

				checked = !checked;
			}
		})();

		while (popupItemsLen--) {
			popupItems[popupItemsLen].onclick = function() {
				var cb = core.query({"parent":this})[0];
				cb.click();
			};
		}	
	}
	
	/**
	 * 改写$resize方法
	 */
	ECOM_TABLE_CLASS.$resize = function () {
		UI_TABLE_CLASS.$resize.call(this);
		
		//如果存在竖条并且竖条显示, 重设其高度
		var vBar = this._uVerticalBar;
		if (vBar && vBar.isShow()) {
			setVBarHeight(vBar);
			setVBarPosition(vBar);
		}

		//修正浮动表头的位置
		if (this._bFloatThead) {
			floatThead(this);
		}
	};

	/**
	 * 找出table中被选中行
	 * @public
	 *
	 * @return {Array} 被选中行
	 */
	ECOM_TABLE_CLASS.getChecked = function() {
		var ret = [];
		try {
			var col = this.getCol(0), 
				cbs = core.get("cball_" + this._nTbId),
				cbs = (cbs instanceof core.ui.Checkbox) ? cbs : core.query({"parent": cbs})[0],
				cbs = cbs.getInferiors(),
				i = cbs.length;
	
			while (i--) {
			    if (cbs[i].isChecked()) {
			        ret.push(cbs[i].getParent());
			    }
			 }
		} catch (e) {}
		return ret;
	};

	/**
	 * 找出table中被选中行个数
	 * @public
	 *
	 * @return {Number} 被选中行的个数
	 */ 
	ECOM_TABLE_CLASS.getCheckedCount = function() {
		return this.getChecked().length;
	};	
	
	/**
	 * 设置消息
	 * @public
	 * 
	 * @return {HTMLElement} 消息div元素
	 */
	ECOM_TABLE_CLASS.setMsg = function(msg) {
		var msgBox = lib.dom.g("tbMsg_" + this._nTbId);
		dom.setText(msgBox, msg);
		return msgBox;
	};
})();

/*
 * 排序
 */	
var defaultSort = (function() {
    // 屏蔽二次点击标志
    var dbClickFlag = false;

    return function() {
        if (!dbClickFlag) {
	        window.sortClick(this.getBase().getAttribute('sort'));
            dbClickFlag = true;
        }
        else {
            ecTable.showModal("正在排序, 请稍候...");
        }
    }
})();

/**
 * 为兼容以前版本加的补丁
 */
var ecTable = {
	getChecked: function(table) {
		return ecomui.Table.prototype.getChecked.call(table, table);
	},
	getCheckedCount: function(table) {
		return ecomui.Table.prototype.getCheckedCount.call(table, table);			 
	}
};

ecui.getChildren = function(control) {
	return ecui.query({parent:control});
};	

/**
 * 整体遮罩, 用于屏蔽二次点击
 */
var ecTable = ecTable || {};

ecTable.showModalTip = function(text) {
    var modalCtrl = baidu.dom.g("ecTableModalTip");
        modalCtrl = modalCtrl && modalCtrl.getControl(); 

    // 创建提示信息窗体
    if (!modalCtrl) {
        modalCtrl = document.createElement("div");
        modalCtrl.id = "ecTableModalTip"
        modalCtrl.className = "ectable-modal-tip";
        modalCtrl.style.visibility = "hidden";
        modalCtrl.innerHTML = [
            '<label>提示</label>',
            '<div class="ectable-modal-tip-cont" id="ecTableModalCont"></div>'
        ].join("");
        document.body.appendChild(modalCtrl);

        modalCtrl = ecui.$fastCreate(
            ecui.ui.Form, 
            modalCtrl, 
            null, 
            {hide:true}
        );
    }

    // 给窗体设置文字并显示
    var contEl = modalCtrl.getBody().getElementsByTagName("div")[0];
    ecui.dom.setText(contEl, text);
    modalCtrl.getOuter().style.zIndex = 32768;


    // 窗体居中 
    var viewWidth = baidu.page.getViewWidth(),
        viewHeight = baidu.page.getViewHeight(),
        width = modalCtrl.getWidth(),
        height = modalCtrl.getHeight();

    baidu.setStyles(modalCtrl.getOuter(), {
        position: "absolute",
        left: Math.max(viewWidth - width, 0) / 2,
        top: Math.max(viewHeight - height, 0) / 2
    });

    modalCtrl.getOuter().style.visibility = "";
    ecui.mask(0.03);

    // 五秒没反应显示刷新链接
    setTimeout(function() {
        contEl.innerHTML = '好像没响应? 请<a href="#" onclick="location.reload(true)">刷新</a>';
    }, 5000);
      
};

