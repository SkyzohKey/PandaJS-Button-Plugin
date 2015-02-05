# PandaJS-Button-Plugin
## Usage

```javascript
this.btn = new game.Button({
	text: "My cool button",
	font: "MyCoolFont",
	position: { x: 10, y: 10 },
	size: { width: 200, height: 45 },
	container: game.system.stage,
	background: 0xffbd31,
	border: 0x262626,
	borderSize: 2
}, function () { console.log('Button clicked !!'); });
```
