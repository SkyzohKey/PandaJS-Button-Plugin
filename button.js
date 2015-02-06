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

	sprite: null,
 	texts: null,
	callback: null,

	init: function(settings, callback) {
		// Use var in settings, if not declared use default values.
		this.text 	= settings.text || this.text;
		this.font 	= settings.font || this.font;
		this.position 	= settings.position || this.position;
		this.size 	= settings.size || this.size;
		this.background = settings.background || this.background;
		this.border 	= settings.border || this.border;
		this.borderSize = settings.borderSize || this.borderSize;
		this.container  = settings.container;
		this.callback 	= callback;
		this.scale	= settings.scale || this.scale;

		//-> Button.
		// Declare the base of our button.
		this.sprite = new game.Graphics();
		
		// Draw the border.
		this.sprite.beginFill(this.border);
		this.sprite.drawRect((-this.size.width / 2), (-this.size.height / 2), this.size.width, this.size.height);
		
		// Draw the button.
		this.sprite.beginFill(this.background);
		this.sprite.drawRect((-this.size.width / 2) + this.borderSize, (-this.size.height / 2) + this.borderSize, this.size.width - this.borderSize * 2, this.size.height - this.borderSize * 2);

		this.sprite.position.set(this.position.x - (-this.size.width / 2), this.position.y - (-this.size.height / 2));
		this.sprite.interactive = true;
		this.sprite.buttonMode  = true;

        	this.offset = new game.Point();

		this.sprite.mousedown   = this.onClick.bind(this);
		this.sprite.mouseup	= this.onRelease.bind(this);
		this.sprite.mouseover	= this.onHover.bind(this);
		this.sprite.mouseout	= this.onLeave.bind(this);

		//-> Text
		this.texts = new game.Text(this.text, { font: this.font.size + "px " + this.font.family, fill: this.font.color });
		this.texts.position.set(this.position.x + this.size.width / 2, this.position.y + this.size.height / 2);
		this.texts.anchor.set(0.5, 0.5);

		// Add our objects to the specified container.
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
