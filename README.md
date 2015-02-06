# PandaJS-Button-Plugin

A simple Button plugin to make fast buttons over **PandaJS**.

## Screenshot
![Example](http://i.imgur.com/PbXDHLk.png)

## Usage

```javascript
this.btn = new game.Button({
	container: game.system.stage, // This is the only one required field.
	text: "My cool button",
	font: { family: 'Arial', size: 12, color: "#262626"},
	scale: false, // If true, the button scale on click.
	position: { x: 10, y: 10 },
	size: { width: 200, height: 45 },
	background: 0xffbd31,
	border: 0x262626,
	borderSize: 2
}, function () { 
	console.log('Button clicked !!');
});
```
