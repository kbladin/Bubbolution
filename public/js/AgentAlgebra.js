Agent.prototype.vectorTo = function (pos) {
	return {
		x: pos.x-this.x,
		y: pos.y-this.y,	
	};
}

Agent.prototype.dist2To = function (pos) {
	var v = this.vectorTo(pos);
	return v.x*v.x + v.y*v.y;
}

/*
	Returns the angle in the interval [-PI, PI]
*/
Agent.prototype.angleTo = function(pos) {
	var v = this.vectorTo(pos);
	return Math.atan2(v.y, v.x);
};

Agent.prototype.angleDiff = function (pos) {
	var a = this.angleTo(pos);
	var aDiff = a - this.angle;
	if(aDiff < -Math.PI){
		aDiff += 2*Math.PI;
	}
	else if (Math.PI < aDiff){
		aDiff -= 2*Math.PI;
	}
	return aDiff;
}