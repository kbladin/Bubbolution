var Utils = {

	createGrid: function (w, h, value) {
		var grid = new Array(w);
		for (var i = 0; i < w; i++) {
			grid[i] = new Array(h);
			for (var j = 0; j < h; j++) {
				grid[i][j] = typeof value === 'function' ? value(i, j) : value;
			}
		}
		return grid;
	},

	// x: x-position to test
	// y: y-position to test
	// cx: x-position of center of rectangle 
	// cy: y-position of center of rectangle
	// w: width of rectangle   
	// h: height of rectangle 
	insideRect: function (x, y, cx, cy, w, h) {
		return (Math.abs(x - cx) <= w / 2) && (Math.abs(y - cy) <= h / 2);
	},

};