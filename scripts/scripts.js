var obj = {
	initialize: function() {
		this.drawBackground();

		this.windowResizeListener();
		this.konamiCodeListener();
		this.mouseMoveListener();
	},

	// keep track of which event listeners are turned on
	resize_background: false,

	colors: {
		white: '#FFFFFF',

		// blues
		lightskyblue: '#D9F3FD',
		skyblue: '#7FD6F7',
		lightseablue: '#52C8F5',
		medseablue: '#3093D8',
		darkseablue: '#1A74C4',

		// greens
		yellow_green: '#FFF97D',
		yellow_green_brown: '#CDBF64',
		brown: '#937822',
		brown_green: '#5A6F2F',
		light_pine_green: '#57876F',
		dark_pine_green: '#2D6449',

		// multi 1
		light_blue: '#62C5DD',
		light_purple: '#6B76B3',
		light_med_purple: '#5C5B93',
		dark_med_purple: '#604777',
		dark_purple: '#33272E',
		light_orange: '#F89873',
		lighter_orange: '#FCC87D',
		light_yellow: '#FFF985',
		salmon: '#F46A6C',

		// warmth
		lighter_yellow: '#FFF985',
		brighter_yellow: '#FFF645',
		light_orange2: '#F9A043',
		salmon_orange: '#F36242',
		pink: '#EF2840',

		// multi 2
		dark_purple2: '#3F3066',
		indigo: '#325376',
		tealish: '#296D82',
		// use light_orange
		lighter_orange2: '#FCC87C',
		light_yellow2: '#FFFBCA',

		// purples
		// darkest to lightest
		p0_purple: '#2F60B5',
		p1_purple: '#8B4DAC',
		p2_purple: '#486BBD',
		p3_purple: '#766DBE',
		p4_purple: '#98A7DC',
		p5_purple: '#AEB2E0'
	},

	colorSchemes: function() {
		return [
			[ // blues
				this.colors.white,
				this.colors.lightskyblue,
				this.colors.skyblue,
				this.colors.lightseablue,
				this.colors.medseablue,
				this.colors.darkseablue
			],
			[ // greens
				this.colors.white,
				this.colors.yellow_green,
				this.colors.yellow_green_brown,
				this.colors.brown,
				this.colors.brown_green,
				this.colors.light_pine_green,
				this.colors.dark_pine_green
			],
			[ // multi 1
				this.colors.white,
				this.colors.light_blue,
				this.colors.light_purple,
				this.colors.light_med_purple,
				this.colors.dark_med_purple,
				this.colors.dark_purple,
				this.colors.light_orange,
				this.colors.lighter_orange,
				this.colors.light_yellow,
				this.colors.salmon
			],
			[ // warmth
				this.colors.white,
				this.colors.lighter_yellow,
				this.colors.brighter_yellow,
				this.colors.light_orange2,
				this.colors.salmon_orange,
				this.colors.pink
			],
			[ // multi 2
				this.colors.white,
				this.colors.dark_purple2,
				this.colors.indigo,
				this.colors.tealish,
				this.colors.light_orange,
				this.colors.lighter_orange2,
				this.colors.light_yellow2
			],
			[ // purples
				this.colors.p0_purple,
				this.colors.p1_purple,
				this.colors.p2_purple,
				this.colors.p3_purple,
				this.colors.p4_purple,
				this.colors.p5_purple
			]
		];
	},
	activeColorScheme: 0,

	// event listener functions
	konamiCodeActive: false,
	konamiCodeListener: function() {
		if ( window.addEventListener ) {
			var kkeys = [], konami = "38,38,40,40,37,39,37,39,66,65";
			window.addEventListener("keydown", function(e){
				kkeys.push( e.keyCode );
				if ( kkeys.toString().indexOf( konami ) >= 0 && !obj.konamiCodeActive) {
					obj.konamiCodeActive = true;
					obj.raveMode();
				}
			}, true);
		}
	},
	windowResizeListener: function() {
		$(window).on('resize', function() {
			$(this).trigger('resize.background');
		});
	},
	mouseMoveListener: function() {
		$(window).mousemove(_.throttle(function(event) {
			obj.backgroundMouseFanciness(event.pageX, event.pageY);
		}));
	},

	// utility functions...
	randomInteger: function(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	},
	getQuotient: function(dividend, divisor) {
		return Math.floor(dividend/divisor);
	},

	// shapes
	triangle1: function(ctx, rectangle_size, x, y) {
		ctx.beginPath();
		ctx.moveTo((rectangle_size.width * x), (rectangle_size.height * y));
		ctx.lineTo((rectangle_size.width * x) + rectangle_size.width, (rectangle_size.height * y));
		ctx.lineTo((rectangle_size.width * x), (rectangle_size.height * y) + rectangle_size.height);
		ctx.lineTo((rectangle_size.width * x), (rectangle_size.height * y));
		ctx.fill();
		ctx.closePath();
	},
	triangle2: function(ctx, rectangle_size, x, y) {
		ctx.beginPath();
		ctx.moveTo((rectangle_size.width * x) + rectangle_size.width, (rectangle_size.height * y));
		ctx.lineTo((rectangle_size.width * x) + rectangle_size.width, (rectangle_size.height * y) + rectangle_size.height);
		ctx.lineTo((rectangle_size.width * x), (rectangle_size.height * y) + rectangle_size.height);
		ctx.lineTo((rectangle_size.width * x) + rectangle_size.width, (rectangle_size.height * y));
		ctx.fill();
		ctx.closePath();
	},
	triangle3: function(ctx, rectangle_size, x, y) {
		ctx.beginPath();
		ctx.moveTo((rectangle_size.width * x), (rectangle_size.height * y));
		ctx.lineTo((rectangle_size.width * x) + rectangle_size.width, (rectangle_size.height * y));
		ctx.lineTo((rectangle_size.width * x) + rectangle_size.width, (rectangle_size.height * y) + rectangle_size.height);
		ctx.lineTo((rectangle_size.width * x), (rectangle_size.height * y));
		ctx.fill();
		ctx.closePath();
	},
	triangle4: function(ctx, rectangle_size, x, y) {
		ctx.beginPath();
		ctx.moveTo((rectangle_size.width * x), (rectangle_size.height * y));
		ctx.lineTo((rectangle_size.width * x) + rectangle_size.width, (rectangle_size.height * y) + rectangle_size.height);
		ctx.lineTo((rectangle_size.width * x), (rectangle_size.height * y) + rectangle_size.height);
		ctx.lineTo((rectangle_size.width * x), (rectangle_size.height * y));
		ctx.fill();
		ctx.closePath();
	},

	backgroundCanvas: {},
	backgroundRectangle: {
		size: {
			width: 20,
			height: 20
		}
	},
	drawBackground: function() {
		// which color scheme to use?
		var colorSchemes = this.colorSchemes();
		var colors = colorSchemes[this.activeColorScheme];

		// get the canvas element
		var canvas = $('#background');
		this.backgroundCanvas = canvas;

		if (!this.raveModeActive)
			canvas.fadeTo(2000, 0.25);

		// do stuff with the canvas element
		if (canvas[0].getContext) {
			var ctx = canvas[0].getContext('2d');
			ctx.canvas.width  = window.innerWidth;
			ctx.canvas.height = window.innerHeight;

			var rectangle_size = this.backgroundRectangle.size;

			// find out how many rectangles to draw
			var rectangles_x = (ctx.canvas.width / rectangle_size.width);
			var rectangles_y = (ctx.canvas.height / rectangle_size.height);

			for (y = 0; y < rectangles_y; y++) {
				//ctx.rotate((2+y)*Math.PI/180);
				for (x = 0; x < rectangles_x; x++) {
					// draw two triangles...

					// which color should we use?
					ctx.fillStyle = colors[this.randomInteger(0, (colors.length - 1))];

					// triangle 1
					if ((x % 2 == 0 && y % 2 == 0) || (x % 2 == 1 && y % 2 == 1)) {
						// use triangle 1
						this.triangle1(ctx, rectangle_size, x, y);
					} else {
						// use triangle 3
						this.triangle3(ctx, rectangle_size, x, y);
					}

					// pick another color
					ctx.fillStyle = colors[this.randomInteger(0, (colors.length - 1))];

					// triangle 2
					if ((x % 2 == 0 && y % 2 == 0) || (x % 2 == 1 && y % 2 == 1)) {
						// use triangle 2
						this.triangle2(ctx, rectangle_size, x, y);
					} else {
						// use triangle 4
						this.triangle4(ctx, rectangle_size, x, y);
					}
				}
			}

			// redraw when the window is resized
			if (!this.resize_background) {
				this.resize_background = true;
				$(window).on('resize.background', _.throttle(function() {
					ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
					obj.drawBackground();
				}, 100));
			}
		}

	},

	backgroundMouseFancinessX: 0,
	backgroundMouseFancinessY: 0,
	backgroundMouseFanciness: function(pageX, pageY) {
		var existing_foregrounds = $('canvas.foreground');

		// limit the length of the trail
		var max_trail_length = 100;
		if (existing_foregrounds.length > max_trail_length)
			existing_foregrounds.first().remove();

		var rectangle_size = this.backgroundRectangle.size;

		// value of x is 1 rectangle wide, value of y is 1 rectangle tall
		var x = this.getQuotient(pageX, rectangle_size.width);
		var y = this.getQuotient(pageY, rectangle_size.height);

		// if we're in the same rectangle, don't draw a new one!
		if (x == this.backgroundMouseFancinessX && y == this.backgroundMouseFancinessY)
			return

		this.backgroundMouseFancinessX = x;
		this.backgroundMouseFancinessY = y;

		// make a new canvas
		var canvas = $('<canvas class="foreground">');

		if (existing_foregrounds.length) {
			canvas.insertAfter(existing_foregrounds.last());
		} else {
			canvas.insertAfter(this.backgroundCanvas);
		}

		canvas.fadeOut(500, function() {
			canvas.remove();
		});

		if (canvas[0].getContext) {

			var ctx = canvas[0].getContext('2d');
			ctx.canvas.width  = rectangle_size.width;
			ctx.canvas.height = rectangle_size.height;

			// position the canvas
			canvas.css({
				left: rectangle_size.width * x,
				top: rectangle_size.height * y
			});

			// which color scheme to use?
			var colorSchemes = this.colorSchemes();
			var colors = colorSchemes[obj.randomInteger(0, (colorSchemes.length - 1))];

			// which color should we use?
			ctx.fillStyle = colors[this.randomInteger(0, (colors.length - 1))];

			// triangle 1
			if ((x % 2 == 0 && y % 2 == 0) || (x % 2 == 1 && y % 2 == 1)) {
				// use triangle 1
				this.triangle1(ctx, rectangle_size, 0, 0);
			} else {
				// use triangle 3
				this.triangle3(ctx, rectangle_size, 0, 0);
			}

			// pick another color
			ctx.fillStyle = colors[this.randomInteger(0, (colors.length - 1))];

			// triangle 2
			if ((x % 2 == 0 && y % 2 == 0) || (x % 2 == 1 && y % 2 == 1)) {
				// use triangle 2
				this.triangle2(ctx, rectangle_size, 0, 0);
			} else {
				// use triangle 4
				this.triangle4(ctx, rectangle_size, 0, 0);
			}

		}
	},

	// let's get this party started!
	raveModeActive: false,
	raveMode: function() {
		this.raveModeActive = true;
		this.backgroundCanvas.fadeTo(2000, 1);
		var rave = function() {
			window.setTimeout(function() {
				var colorSchemes = obj.colorSchemes();
				obj.activeColorScheme = obj.randomInteger(0, (colorSchemes.length - 1));
				obj.drawBackground();
				rave();
			}, 250);
		};
		rave();
	}
};
$(function() {
	obj.initialize();
});