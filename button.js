game.module(
	'plugins.button'
)
.body(function() {
	
game.Button = game.Class.extend({
	text: "Button",
	font: "Arial",
	position: { x: 0, y: 0 },
	size: { width: 100, height: 40 },
	background: 0x000000,
	border: 0xffffff,
	borderSize: 3,
	container: null,
	scale: false,

	sprite: null,
    texts: null,
	callback: null,

	init: function(settings, callback) {
		this.text = settings.text;
		this.font = settings.font;
		this.position = settings.position;
		this.size = settings.size;
		this.background = settings.background;
		this.border = settings.border;
		this.borderSize = settings.borderSize;
		this.container  = settings.container;
		this.callback 	= callback;
		this.scale		= settings.scale;

		this.sprite = new game.Graphics();
		this.sprite.beginFill(this.border);
		this.sprite.drawRect(0, 0, this.size.width, this.size.height);

		this.sprite.beginFill(this.background);
		this.sprite.drawRect(0 + this.borderSize, 0 + this.borderSize, this.size.width - this.borderSize * 2, this.size.height - this.borderSize * 2);

		this.sprite.position.set(this.position.x, this.position.y);

		this.sprite.interactive = true;
		this.sprite.buttonMode  = true;

        this.offset = new game.Point();

		this.sprite.mousedown   = this.onClick.bind(this);
		this.sprite.mouseup	= this.onRelease.bind(this);
		this.sprite.mouseover	= this.onHover.bind(this);
		this.sprite.mouseout	= this.onLeave.bind(this);

		// Text
		this.texts = new game.BitmapText(this.text, { font: this.font });
		this.texts.position.set(this.position.x + this.size.width / 2 - this.texts.textWidth / 2, this.position.y + this.size.height / 2 - this.texts.textHeight / 2);

		this.container.addChild(this.sprite);
		this.container.addChild(this.texts);
		return this.sprite;
	},

	onClick: function(event)
	{
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
		if (this.scale)
		{
			game.scene.current = null;
			this.sprite.scale.set(1.0, 1.0);
			this.texts.scale.set(1.0, 1.0);
		}
	},

	onHover: function()
	{
		this.sprite.alpha = 0.9;
	},

	onLeave: function()
	{
		this.sprite.alpha = 1;
	}
});

});
