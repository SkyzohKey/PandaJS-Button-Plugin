game.module(
	'plugins.button'
)
.body(function() {
	
game.Button = game.Class.extend({
	text: 'Button',
	font: { family: 'Verdana', size: 14, color: '#222222' },
	position: { x: 0, y: 0 },
	size: { width: 100, height: 40 },
	background: 0x000000,
	border: 0xffffff,
	borderSize: 3,
	container: null,
	scale: false,
	enabled: true,

	sprite: null,
    	texts: null,
	callback: null,

	init: function(settings, callback) {

		// Check for empty settings.
		settings = settings ? settings : {};

		this.text 	= settings.text || this.text;
		this.font 	= settings.font || this.font;
		this.position 	= settings.position || this.position;
		this.size 	= settings.size || this.size;
		this.background	= settings.background || this.background;
		this.border 	= settings.border || this.border;
		this.borderSize	= settings.borderSize || this.borderSize;
		this.container	= settings.container;
		this.callback	= callback;
		this.scale	= settings.scale || this.scale;
		this.enabled	= settings.enabled || this.enabled;

		this.render(); // Render function.

		// Return an object which contains both text and sprite.
		var object = { sprite: this.sprite, text: this.texts };
		return object;
	},

	render: function()
	{
		this.sprite = new game.Graphics();

		this.sprite.beginFill(this.border);
		this.sprite.drawRect((-this.size.width / 2), (-this.size.height / 2), this.size.width, this.size.height);

		this.sprite.beginFill(this.background);
		this.sprite.drawRect((-this.size.width / 2) + this.borderSize, (-this.size.height / 2) + this.borderSize, this.size.width - this.borderSize * 2, this.size.height - this.borderSize * 2);

		this.sprite.position.set(this.position.x - (-this.size.width / 2), this.position.y - (-this.size.height / 2));

		this.offset = new game.Point();

		if (this.enabled)
		{
			this.sprite.interactive	= true;
			this.sprite.buttonMode	= true;

			this.sprite.mousedown	= this.onClick.bind(this);
			this.sprite.mouseup	= this.onRelease.bind(this);
			this.sprite.mouseover	= this.onHover.bind(this);
			this.sprite.mouseout	= this.onLeave.bind(this);
		}
		else
		{
			this.sprite.interactive	= false;
			this.sprite.buttonMode	= false;
		}

		// Text
		this.texts = new game.Text(this.text, { font: this.font.size + "px " + this.font.family, fill: this.font.color });
		this.texts.position.set(this.position.x + this.size.width / 2, this.position.y + this.size.height / 2);
		this.texts.anchor.set(0.5, 0.5);

		this.container.addChild(this.sprite);
		this.container.addChild(this.texts);
	},

	setText: function(text)
	{
		this.texts.setText(text);
		this.texts.remove();
		this.texts.addTo(this.container);
	},

	enable: function()
	{
		this.enabled = true;
		this.sprite.alpha = 1;
		this.render();

		this.sprite.remove();
		this.sprite.addTo(this.container);
		this.texts.remove();
		this.texts.addTo(this.container);
	},

	disable: function()
	{
		this.enabled = false;
		this.sprite.alpha = .7;
		this.render();

		this.sprite.remove();
		this.sprite.addTo(this.container);
		this.texts.remove();
		this.texts.addTo(this.container);
	},

	onClick: function(event)
	{
		if (!this.enabled)
			return;

		if (this.scale)
		{
			game.scene.current = this;
			this.offset.x = this.sprite.position.x - event.global.x;
			this.offset.y = this.sprite.position.y - event.global.y;
				
			this.sprite.scale.set(1.1, 1.1);
			this.texts.scale.set(1.1, 1.1);

			// Place sprite and text to top of container
			this.sprite.remove();
			this.sprite.addTo(this.container);
			this.texts.remove();
			this.texts.addTo(this.container);
		}

		this.callback();
	},

	onRelease: function()
	{
		if (!this.enabled)
			return;

		if (this.scale)
		{
			game.scene.current = null;
			this.sprite.scale.set(1.0, 1.0);
			this.texts.scale.set(1.0, 1.0);
		}
	},

	onHover: function()
	{
		if (!this.enabled)
			return;

		this.sprite.alpha = 0.9;
	},

	onLeave: function()
	{
		if (!this.enabled)
			return;
		
		this.sprite.alpha = 1;
	}
});

});
