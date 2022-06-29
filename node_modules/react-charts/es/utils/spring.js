// Super fast physics simulations for JavaScript
// Copyright 2014 Ralph Thomas
// Licensed under the Apache License, Version 2.0
// https://github.com/iamralpht/gravitas.js
// Adapted to TypeScript and customized by Tanner Linsley (@tannerlinsley)
var epsilon = 0.001;

function almostEqual(a, b) {
  if (Number.isNaN(a) && Number.isNaN(b)) {
    return true;
  }

  return a > b - epsilon && a < b + epsilon;
}

function almostZero(a) {
  return almostEqual(a, 0);
}

export var Spring = /*#__PURE__*/function () {
  function Spring(init, mass, springConstant, damping) {
    this._m = mass;
    this._k = springConstant;
    this._c = damping;
    this._solution = null;
    this.endPosition = init;
    this._startTime = 0;
  }

  var _proto = Spring.prototype;

  _proto.x = function x(dt) {
    if (dt === undefined) {
      dt = (new Date().getTime() - this._startTime) / 1000.0;
    }

    return this._solution ? this.endPosition + this._solution.x(dt) : this.endPosition;
  };

  _proto.dx = function dx(dt) {
    if (dt === undefined) {
      dt = (new Date().getTime() - this._startTime) / 1000.0;
    }

    return this._solution ? this._solution.dx(dt) : 0;
  };

  _proto.setEnd = function setEnd(x) {
    var t = new Date().getTime();
    var velocity = 0;
    var position = this.endPosition;

    if (this._solution) {
      // Don't whack incoming velocity.
      if (almostZero(velocity)) velocity = this._solution.dx((t - this._startTime) / 1000.0);
      position = this._solution.x((t - this._startTime) / 1000.0);
      if (almostZero(velocity)) velocity = 0;
      if (almostZero(position)) position = 0;
      position += this.endPosition;
    }

    if (this._solution && almostZero(position - x) && almostZero(velocity)) {
      return;
    }

    this.endPosition = x;
    this._solution = this._solve(position - this.endPosition, velocity);
    this._startTime = t;
  };

  _proto.snap = function snap(x) {
    this._startTime = new Date().getTime();
    this.endPosition = x;
    this._solution = {
      x: function x() {
        return 0;
      },
      dx: function dx() {
        return 0;
      }
    };
  };

  _proto.done = function done() {
    return almostEqual(this.x(), this.endPosition) && almostZero(this.dx());
  } // reconfigure(mass: number, springConstant: number, damping: number) {
  //   this._m = mass
  //   this._k = springConstant
  //   this._c = damping
  //   if (this.done()) {
  //     return
  //   }
  //   this._solution = this._solve(this.x() - this.endPosition, this.dx())
  //   this._startTime = new Date().getTime()
  // }
  // springConstant() {
  //   return this._k
  // }
  // damping() {
  //   return this._c
  // }
  ;

  _proto._solve = function _solve(initial, velocity) {
    var c = this._c;
    var m = this._m;
    var k = this._k; // Solve the quadratic equation; root = (-c +/- sqrt(c^2 - 4mk)) / 2m.

    var cmk = c * c - 4 * m * k;

    if (cmk === 0) {
      // The spring is critically damped.
      // x = (c1 + c2*t) * e ^(-c/2m)*t
      var r = -c / (2 * m);
      var c1 = initial;
      var c2 = velocity / (r * initial);
      return {
        x: function x(t) {
          return (c1 + c2 * t) * Math.pow(Math.E, r * t);
        },
        dx: function dx(t) {
          var pow = Math.pow(Math.E, r * t);
          return r * (c1 + c2 * t) * pow + c2 * pow;
        }
      };
    } else if (cmk > 0) {
      // The spring is overdamped; no bounces.
      // x = c1*e^(r1*t) + c2*e^(r2t)
      // Need to find r1 and r2, the roots, then solve c1 and c2.
      var r1 = (-c - Math.sqrt(cmk)) / (2 * m);
      var r2 = (-c + Math.sqrt(cmk)) / (2 * m);

      var _c = (velocity - r1 * initial) / (r2 - r1);

      var _c2 = initial - _c;

      return {
        x: function x(t) {
          return _c2 * Math.pow(Math.E, r1 * t) + _c * Math.pow(Math.E, r2 * t);
        },
        dx: function dx(t) {
          return _c2 * r1 * Math.pow(Math.E, r1 * t) + _c * r2 * Math.pow(Math.E, r2 * t);
        }
      };
    } else {
      // The spring is underdamped, it has imaginary roots.
      // r = -(c / 2*m) +- w*i
      // w = sqrt(4mk - c^2) / 2m
      // x = (e^-(c/2m)t) * (c1 * cos(wt) + c2 * sin(wt))
      var w = Math.sqrt(4 * m * k - c * c) / (2 * m);

      var _r = -(c / 2 * m);

      var _c3 = initial;

      var _c4 = (velocity - _r * initial) / w;

      return {
        x: function x(t) {
          return Math.pow(Math.E, _r * t) * (_c3 * Math.cos(w * t) + _c4 * Math.sin(w * t));
        },
        dx: function dx(t) {
          var power = Math.pow(Math.E, _r * t);
          var cos = Math.cos(w * t);
          var sin = Math.sin(w * t);
          return power * (_c4 * w * cos - _c3 * w * sin) + _r * power * (_c4 * sin + _c3 * cos);
        }
      };
    }
  };

  return Spring;
}();