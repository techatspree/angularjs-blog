joInput = function(data, type) {
	this.type = type;

	joControl.apply(this, arguments);
};

joInput.extend(joControl, {
	tagName: "input",
	type: "text",

	setData: function(data) {
		if (data !== this.data) {
			this.data = data;

			if (typeof this.container.value !== "undefined")
				this.container.value = data;
			else
				this.container.innerHTML = data;

			this.changeEvent.fire(this.data);
		}

		return this;
	},

	getData: function() {
		if (typeof this.container.value !== "undefined")
			return this.container.value;
		else
			return this.container.innerHTML;
	},

	enable: function() {
		this.container.setAttribute("tabindex", "1");
		return joControl.prototype.enable.call(this);
	},

	disable: function() {
		this.container.removeAttribute("tabindex");
		return joControl.prototype.disable.call(this);
	},

	createContainer: function() {
		var o = joDOM.create(this);

		if (!o)
			return;

		o.setAttribute("type", this.type);
		o.setAttribute("tabindex", "1");
		o.contentEditable = this.enabled;

		return o;
	},

	setEvents: function() {
		if (!this.container)
			return;

		joControl.prototype.setEvents.call(this);
		joEvent.on(this.container, "keydown", this.onKeyDown, this);

/*
		this.container.addEventListener('touchmove', function(e) {
		    e.preventDefault();
			joEvent.stop(e);
		}, false);
*/
	},

	onKeyDown: function(e) {
		if (e.keyCode == 13) {
			e.preventDefault();
			joEvent.stop(e);
		}
		return false;
	},

	draw: function() {
		if (this.container.value)
			this.value = this.data;
		else
			this.innerHTML = this.value;
	},

	onMouseDown: function(e) {
		joEvent.stop(e);
		this.focus();
	},

	storeData: function() {
		this.data = this.getData();
		if (this.dataSource)
			this.dataSource.set(this.value);
	}
});










joControl = function(data, value) {
	this.selectEvent = new joSubject(this);
	this.enabled = true;
	this.value = null;

	if (typeof value !== "undefined" && value !== null) {
		if (value instanceof joDataSource)
			this.setValueSource(value);
		else
			this.value = value;
	}

	if (typeof data !== "undefined" && data instanceof joDataSource) {
		// we want to bind directly to some data
		joView.call(this);
		this.setDataSource(data);
	}
	else {
		joView.apply(this, arguments);
	}
};
joControl.extend(joView, {
	tagName: "jocontrol",

	setEvents: function() {
		// not sure what we want to do here, want to use
		// gesture system, but that's not defined
		joEvent.capture(this.container, "click", this.onMouseDown, this);
		joEvent.on(this.container, "blur", this.onBlur, this);
		joEvent.on(this.container, "focus", this.onFocus, this);
	},

	onMouseDown: function(e) {
		this.select(e);
	},

	select: function(e) {
		if (e)
			joEvent.stop(e);

		if(this.enabled) {
			this.selectEvent.fire(this.data);
		}

		return this;
	},

	enable: function() {
		joDOM.removeCSSClass(this.container, 'disabled');
		this.container.contentEditable = true;
		this.enabled = true;

		return this;
	},

	disable: function() {
		joDOM.addCSSClass(this.container, 'disabled');
		this.container.contentEditable = false;
		this.enabled = false;

		return this;
	},

	setReadOnly: function(value) {
		if (typeof value === 'undefined' || value)
			this.container.setAttribute('readonly', '1');
		else
			this.container.removeAttribute('readonly');

		return this;
	},

	onFocus: function(e) {
		joEvent.stop(e);

		if (this.enabled)
			joFocus.set(this);
	},

	onBlur: function(e) {
		this.data = (this.container.value) ? this.container.value : this.container.innerHTML;
		joEvent.stop(e);

		if (this.enabled) {
			this.blur();

			this.changeEvent.fire(this.data);
		}
	},

	focus: function(e) {
		if (!this.enabled)
			return;

		joDOM.addCSSClass(this.container, 'focus');

		if (!e)
			this.container.focus();

		return this;
	},

	setValue: function(value) {
		this.value = value;
		this.changeEvent.fire(value);

		return this;
	},

	getValue: function() {
		return this.value;
	},

	blur: function() {
		joDOM.removeCSSClass(this.container, 'focus');

		return this;
	},

	setDataSource: function(source) {
		this.dataSource = source;
		source.changeEvent.subscribe(this.setData, this);

		var data = source.getData();
		this.setData((data !== 'undefined') ? data : null);
		this.changeEvent.subscribe(source.setData, source);

		return this;
	},

	setValueSource: function(source) {
		this.valueSource = source;
		source.changeEvent.subscribe(this.setValue, this);

		var value = source.getData();
		this.setValue((value !== 'undefined') ? value : null);
		this.selectEvent.subscribe(source.setData, source);

		return this;
	}
});