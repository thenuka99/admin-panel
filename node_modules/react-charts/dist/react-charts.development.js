(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('react-dom')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react', 'react-dom'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.ReactCharts = {}, global.React, global.ReactDOM));
}(this, (function (exports, React, ReactDOM) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
      Object.keys(e).forEach(function (k) {
        if (k !== 'default') {
          var d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: function () {
              return e[k];
            }
          });
        }
      });
    }
    n['default'] = e;
    return Object.freeze(n);
  }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
  var React__namespace = /*#__PURE__*/_interopNamespace(React);
  var ReactDOM__default = /*#__PURE__*/_interopDefaultLegacy(ReactDOM);

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _createForOfIteratorHelperLoose(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
    if (it) return (it = it.call(o)).next.bind(it);

    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;
      return function () {
        if (i >= o.length) return {
          done: true
        };
        return {
          done: false,
          value: o[i++]
        };
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  function ascending (a, b) {
    return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
  }

  function bisector (f) {
    let delta = f;
    let compare = f;

    if (f.length === 1) {
      delta = (d, x) => f(d) - x;

      compare = ascendingComparator(f);
    }

    function left(a, x, lo, hi) {
      if (lo == null) lo = 0;
      if (hi == null) hi = a.length;

      while (lo < hi) {
        const mid = lo + hi >>> 1;
        if (compare(a[mid], x) < 0) lo = mid + 1;else hi = mid;
      }

      return lo;
    }

    function right(a, x, lo, hi) {
      if (lo == null) lo = 0;
      if (hi == null) hi = a.length;

      while (lo < hi) {
        const mid = lo + hi >>> 1;
        if (compare(a[mid], x) > 0) hi = mid;else lo = mid + 1;
      }

      return lo;
    }

    function center(a, x, lo, hi) {
      if (lo == null) lo = 0;
      if (hi == null) hi = a.length;
      const i = left(a, x, lo, hi - 1);
      return i > lo && delta(a[i - 1], x) > -delta(a[i], x) ? i - 1 : i;
    }

    return {
      left,
      center,
      right
    };
  }

  function ascendingComparator(f) {
    return (d, x) => ascending(f(d), x);
  }

  function number$2 (x) {
    return x === null ? NaN : +x;
  }
  function* numbers(values, valueof) {
    if (valueof === undefined) {
      for (let value of values) {
        if (value != null && (value = +value) >= value) {
          yield value;
        }
      }
    } else {
      let index = -1;

      for (let value of values) {
        if ((value = valueof(value, ++index, values)) != null && (value = +value) >= value) {
          yield value;
        }
      }
    }
  }

  const ascendingBisect = bisector(ascending);
  const bisectRight = ascendingBisect.right;
  bisector(number$2).center;

  function extent (values, valueof) {
    let min;
    let max;

    if (valueof === undefined) {
      for (const value of values) {
        if (value != null) {
          if (min === undefined) {
            if (value >= value) min = max = value;
          } else {
            if (min > value) min = value;
            if (max < value) max = value;
          }
        }
      }
    } else {
      let index = -1;

      for (let value of values) {
        if ((value = valueof(value, ++index, values)) != null) {
          if (min === undefined) {
            if (value >= value) min = max = value;
          } else {
            if (min > value) min = value;
            if (max < value) max = value;
          }
        }
      }
    }

    return [min, max];
  }

  class InternMap extends Map {
    constructor(entries, key = keyof) {
      super();
      Object.defineProperties(this, {
        _intern: {
          value: new Map()
        },
        _key: {
          value: key
        }
      });
      if (entries != null) for (const [key, value] of entries) this.set(key, value);
    }

    get(key) {
      return super.get(intern_get(this, key));
    }

    has(key) {
      return super.has(intern_get(this, key));
    }

    set(key, value) {
      return super.set(intern_set(this, key), value);
    }

    delete(key) {
      return super.delete(intern_delete(this, key));
    }

  }

  function intern_get({
    _intern,
    _key
  }, value) {
    const key = _key(value);

    return _intern.has(key) ? _intern.get(key) : value;
  }

  function intern_set({
    _intern,
    _key
  }, value) {
    const key = _key(value);

    if (_intern.has(key)) return _intern.get(key);

    _intern.set(key, value);

    return value;
  }

  function intern_delete({
    _intern,
    _key
  }, value) {
    const key = _key(value);

    if (_intern.has(key)) {
      value = _intern.get(value);

      _intern.delete(key);
    }

    return value;
  }

  function keyof(value) {
    return value !== null && typeof value === "object" ? value.valueOf() : value;
  }

  function identity$2 (x) {
    return x;
  }

  function groups(values, ...keys) {
    return nest(values, Array.from, identity$2, keys);
  }

  function nest(values, map, reduce, keys) {
    return function regroup(values, i) {
      if (i >= keys.length) return reduce(values);
      const groups = new InternMap();
      const keyof = keys[i++];
      let index = -1;

      for (const value of values) {
        const key = keyof(value, ++index, values);
        const group = groups.get(key);
        if (group) group.push(value);else groups.set(key, [value]);
      }

      for (const [key, values] of groups) {
        groups.set(key, regroup(values, i));
      }

      return map(groups);
    }(values, 0);
  }

  function permute (source, keys) {
    return Array.from(keys, key => source[key]);
  }

  function sort(values, ...F) {
    if (typeof values[Symbol.iterator] !== "function") throw new TypeError("values is not iterable");
    values = Array.from(values);
    let [f = ascending] = F;

    if (f.length === 1 || F.length > 1) {
      const index = Uint32Array.from(values, (d, i) => i);

      if (F.length > 1) {
        F = F.map(f => values.map(f));
        index.sort((i, j) => {
          for (const f of F) {
            const c = ascending(f[i], f[j]);
            if (c) return c;
          }
        });
      } else {
        f = values.map(f);
        index.sort((i, j) => ascending(f[i], f[j]));
      }

      return permute(values, index);
    }

    return values.sort(f);
  }

  var e10 = Math.sqrt(50),
      e5 = Math.sqrt(10),
      e2 = Math.sqrt(2);
  function ticks (start, stop, count) {
    var reverse,
        i = -1,
        n,
        ticks,
        step;
    stop = +stop, start = +start, count = +count;
    if (start === stop && count > 0) return [start];
    if (reverse = stop < start) n = start, start = stop, stop = n;
    if ((step = tickIncrement(start, stop, count)) === 0 || !isFinite(step)) return [];

    if (step > 0) {
      let r0 = Math.round(start / step),
          r1 = Math.round(stop / step);
      if (r0 * step < start) ++r0;
      if (r1 * step > stop) --r1;
      ticks = new Array(n = r1 - r0 + 1);

      while (++i < n) ticks[i] = (r0 + i) * step;
    } else {
      step = -step;
      let r0 = Math.round(start * step),
          r1 = Math.round(stop * step);
      if (r0 / step < start) ++r0;
      if (r1 / step > stop) --r1;
      ticks = new Array(n = r1 - r0 + 1);

      while (++i < n) ticks[i] = (r0 + i) / step;
    }

    if (reverse) ticks.reverse();
    return ticks;
  }
  function tickIncrement(start, stop, count) {
    var step = (stop - start) / Math.max(0, count),
        power = Math.floor(Math.log(step) / Math.LN10),
        error = step / Math.pow(10, power);
    return power >= 0 ? (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1) * Math.pow(10, power) : -Math.pow(10, -power) / (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1);
  }
  function tickStep(start, stop, count) {
    var step0 = Math.abs(stop - start) / Math.max(0, count),
        step1 = Math.pow(10, Math.floor(Math.log(step0) / Math.LN10)),
        error = step0 / step1;
    if (error >= e10) step1 *= 10;else if (error >= e5) step1 *= 5;else if (error >= e2) step1 *= 2;
    return stop < start ? -step1 : step1;
  }

  function max(values, valueof) {
    let max;

    if (valueof === undefined) {
      for (const value of values) {
        if (value != null && (max < value || max === undefined && value >= value)) {
          max = value;
        }
      }
    } else {
      let index = -1;

      for (let value of values) {
        if ((value = valueof(value, ++index, values)) != null && (max < value || max === undefined && value >= value)) {
          max = value;
        }
      }
    }

    return max;
  }

  function min(values, valueof) {
    let min;

    if (valueof === undefined) {
      for (const value of values) {
        if (value != null && (min > value || min === undefined && value >= value)) {
          min = value;
        }
      }
    } else {
      let index = -1;

      for (let value of values) {
        if ((value = valueof(value, ++index, values)) != null && (min > value || min === undefined && value >= value)) {
          min = value;
        }
      }
    }

    return min;
  }

  // ISC license, Copyright 2018 Vladimir Agafonkin.

  function quickselect(array, k, left = 0, right = array.length - 1, compare = ascending) {
    while (right > left) {
      if (right - left > 600) {
        const n = right - left + 1;
        const m = k - left + 1;
        const z = Math.log(n);
        const s = 0.5 * Math.exp(2 * z / 3);
        const sd = 0.5 * Math.sqrt(z * s * (n - s) / n) * (m - n / 2 < 0 ? -1 : 1);
        const newLeft = Math.max(left, Math.floor(k - m * s / n + sd));
        const newRight = Math.min(right, Math.floor(k + (n - m) * s / n + sd));
        quickselect(array, k, newLeft, newRight, compare);
      }

      const t = array[k];
      let i = left;
      let j = right;
      swap$1(array, left, k);
      if (compare(array[right], t) > 0) swap$1(array, left, right);

      while (i < j) {
        swap$1(array, i, j), ++i, --j;

        while (compare(array[i], t) < 0) ++i;

        while (compare(array[j], t) > 0) --j;
      }

      if (compare(array[left], t) === 0) swap$1(array, left, j);else ++j, swap$1(array, j, right);
      if (j <= k) left = j + 1;
      if (k <= j) right = j - 1;
    }

    return array;
  }

  function swap$1(array, i, j) {
    const t = array[i];
    array[i] = array[j];
    array[j] = t;
  }

  function quantile(values, p, valueof) {
    values = Float64Array.from(numbers(values, valueof));
    if (!(n = values.length)) return;
    if ((p = +p) <= 0 || n < 2) return min(values);
    if (p >= 1) return max(values);
    var n,
        i = (n - 1) * p,
        i0 = Math.floor(i),
        value0 = max(quickselect(values, i0).subarray(0, i0 + 1)),
        value1 = min(values.subarray(i0 + 1));
    return value0 + (value1 - value0) * (i - i0);
  }

  function median (values, valueof) {
    return quantile(values, 0.5, valueof);
  }

  function d3Range (start, stop, step) {
    start = +start, stop = +stop, step = (n = arguments.length) < 2 ? (stop = start, start = 0, 1) : n < 3 ? 1 : +step;
    var i = -1,
        n = Math.max(0, Math.ceil((stop - start) / step)) | 0,
        range = new Array(n);

    while (++i < n) {
      range[i] = start + i * step;
    }

    return range;
  }

  function sum(values, valueof) {
    let sum = 0;

    if (valueof === undefined) {
      for (let value of values) {
        if (value = +value) {
          sum += value;
        }
      }
    } else {
      let index = -1;

      for (let value of values) {
        if (value = +valueof(value, ++index, values)) {
          sum += value;
        }
      }
    }

    return sum;
  }

  function useGetLatest(obj) {
    var ref = React__default['default'].useRef(obj);
    var getterRef = React__default['default'].useRef();
    ref.current = obj;

    if (!getterRef.current) {
      getterRef.current = function () {
        return ref.current;
      };
    }

    return getterRef.current;
  }

  var useIsomorphicLayoutEffect = typeof window !== 'undefined' ? React__default['default'].useLayoutEffect : React__default['default'].useEffect;

  function getSeriesStatus(series, focusedDatum) {
    if ((focusedDatum == null ? void 0 : focusedDatum.seriesId) === series.id) {
      return 'focused';
    }

    return 'none';
  }
  function getDatumStatus(datum, focusedDatum) {
    var _datum$tooltipGroup;

    if (datum === focusedDatum) {
      return 'focused';
    }

    if ((_datum$tooltipGroup = datum.tooltipGroup) != null && _datum$tooltipGroup.some(function (groupDatum) {
      groupDatum.seriesId === (focusedDatum == null ? void 0 : focusedDatum.seriesId) && groupDatum.index === (focusedDatum == null ? void 0 : focusedDatum.index);
    })) {
      return 'groupFocused';
    }

    return 'none';
  }
  var elementTypes = ['area', 'line', 'rectangle', 'circle'];
  function materializeStyles(style, defaults) {
    if (style === void 0) {
      style = {};
    }

    if (defaults === void 0) {
      defaults = {};
    }

    style = normalizeColor(style, defaults);

    for (var i = 0; i < elementTypes.length; i++) {
      var type = elementTypes[i];

      if (style[type] && defaults[type]) {
        style[type] = materializeStyles(style[type], defaults);
      }
    }

    return style;
  }
  function translate(x, y) {
    return "translate3d(" + Math.round(x) + "px, " + Math.round(y) + "px, 0)";
  } //

  function normalizeColor(style, defaults) {
    return _extends({}, style, {
      stroke: style.stroke || style.color || defaults.stroke || defaults.color,
      fill: style.fill || style.color || defaults.fill || defaults.color
    });
  }

  function isDefined(num) {
    return typeof num === 'number' && !Number.isNaN(num);
  }

  var chartContext = /*#__PURE__*/React__namespace.createContext(null);
  function ChartContextProvider(_ref) {
    var value = _ref.value,
        children = _ref.children;
    return /*#__PURE__*/React__namespace.createElement(chartContext.Provider, {
      value: value,
      children: children
    });
  }
  function useChartContext() {
    return React__namespace.useContext(chartContext)();
  }

  function BarComponent(_ref) {
    var primaryAxis = _ref.primaryAxis,
        secondaryAxis = _ref.secondaryAxis,
        allSeries = _ref.series;

    var _useChartContext = useChartContext(),
        getSeriesStatusStyle = _useChartContext.getSeriesStatusStyle,
        getDatumStatusStyle = _useChartContext.getDatumStatusStyle,
        focusedDatumState = _useChartContext.focusedDatumState,
        gridDimensions = _useChartContext.gridDimensions;

    var focusedDatum = focusedDatumState[0];
    var xAxis = primaryAxis.isVertical ? secondaryAxis : primaryAxis;
    var yAxis = primaryAxis.isVertical ? primaryAxis : secondaryAxis;
    return /*#__PURE__*/React__default['default'].createElement("g", {
      style: {
        transform: translate(gridDimensions.left, gridDimensions.top)
      }
    }, allSeries.map(function (series, i) {
      var style = getSeriesStatusStyle(series, focusedDatum);
      return /*#__PURE__*/React__default['default'].createElement("g", {
        key: "lines-" + i
      }, series.datums.map(function (datum, i) {
        var _getRectX, _getWidth, _getRectY, _getHeight;

        var dataStyle = getDatumStatusStyle(datum, focusedDatum);

        var _clampPxToAxis = clampPxToAxis$1((_getRectX = getRectX(datum, primaryAxis, secondaryAxis)) != null ? _getRectX : NaN, (_getWidth = getWidth(datum, primaryAxis, secondaryAxis)) != null ? _getWidth : NaN, xAxis),
            x = _clampPxToAxis[0],
            width = _clampPxToAxis[1];

        var _clampPxToAxis2 = clampPxToAxis$1((_getRectY = getRectY(datum, primaryAxis, secondaryAxis)) != null ? _getRectY : NaN, (_getHeight = getHeight(datum, primaryAxis, secondaryAxis)) != null ? _getHeight : NaN, yAxis),
            y = _clampPxToAxis2[0],
            height = _clampPxToAxis2[1];

        return /*#__PURE__*/React__default['default'].createElement("rect", {
          ref: function ref(el) {
            datum.element = el;
          },
          key: i,
          x: x,
          y: y,
          width: width,
          height: height,
          style: _extends({
            strokeWidth: 0
          }, style, style.rectangle, dataStyle, dataStyle.rectangle)
        });
      }));
    }));
  }

  function getWidth(datum, primaryAxis, secondaryAxis) {
    return primaryAxis.isVertical ? getSecondaryLength(datum, secondaryAxis) : getPrimaryLength(datum, primaryAxis, secondaryAxis);
  }

  function getHeight(datum, primaryAxis, secondaryAxis) {
    return primaryAxis.isVertical ? getPrimaryLength(datum, primaryAxis, secondaryAxis) : getSecondaryLength(datum, secondaryAxis);
  }

  function getPrimaryGroupLength(_datum, primaryAxis) {
    return Math.max(primaryAxis.primaryBandScale.bandwidth(), 1);
  }
  function getPrimaryLength(_datum, primaryAxis, secondaryAxis) {
    if (primaryAxis.axisFamily === 'band') {
      var _primaryAxis$minBandS, _primaryAxis$maxBandS;

      var bandWidth = secondaryAxis.stacked ? primaryAxis.scale.bandwidth() : primaryAxis.seriesBandScale.bandwidth();
      return Math.min(Math.max(bandWidth, (_primaryAxis$minBandS = primaryAxis.minBandSize) != null ? _primaryAxis$minBandS : 1), (_primaryAxis$maxBandS = primaryAxis.maxBandSize) != null ? _primaryAxis$maxBandS : 99999999);
    }

    return Math.max(secondaryAxis.stacked ? primaryAxis.primaryBandScale.bandwidth() : primaryAxis.seriesBandScale.bandwidth(), 1);
  }

  function getSecondaryLength(datum, secondaryAxis) {
    var secondary = [getSecondaryStart$1(datum, secondaryAxis), getSecondary$2(datum, secondaryAxis)];
    return Math.abs(secondary[1] - secondary[0]);
  }

  function getRectX(datum, primaryAxis, secondaryAxis) {
    return primaryAxis.isVertical ? getSecondaryStart$1(datum, secondaryAxis) : getPrimary$2(datum, primaryAxis, secondaryAxis);
  }

  function getRectY(datum, primaryAxis, secondaryAxis) {
    return primaryAxis.isVertical ? getPrimary$2(datum, primaryAxis, secondaryAxis) : getSecondary$2(datum, secondaryAxis);
  }

  function getPrimary$2(datum, primaryAxis, secondaryAxis) {
    var _primaryAxis$scale;

    var primary = (_primaryAxis$scale = primaryAxis.scale(datum.primaryValue)) != null ? _primaryAxis$scale : NaN;

    if (primaryAxis.axisFamily !== 'band') {
      primary -= getPrimaryGroupLength(datum, primaryAxis) / 2;
    }

    if (!secondaryAxis.stacked) {
      var _seriesBandScale;

      primary = primary + ((_seriesBandScale = primaryAxis.seriesBandScale(datum.seriesIndex)) != null ? _seriesBandScale : NaN);
    }

    return primary;
  }

  function getSecondaryStart$1(datum, secondaryAxis) {
    var _secondaryAxis$scale2;

    if (secondaryAxis.stacked) {
      var _secondaryAxis$scale, _datum$stackData$, _datum$stackData;

      return (_secondaryAxis$scale = secondaryAxis.scale((_datum$stackData$ = (_datum$stackData = datum.stackData) == null ? void 0 : _datum$stackData[0]) != null ? _datum$stackData$ : NaN)) != null ? _secondaryAxis$scale : NaN;
    }

    return (_secondaryAxis$scale2 = secondaryAxis.scale(0)) != null ? _secondaryAxis$scale2 : NaN;
  }

  function getSecondary$2(datum, secondaryAxis) {
    var _secondaryAxis$scale4;

    if (secondaryAxis.stacked) {
      var _secondaryAxis$scale3, _datum$stackData$2, _datum$stackData2;

      return (_secondaryAxis$scale3 = secondaryAxis.scale((_datum$stackData$2 = (_datum$stackData2 = datum.stackData) == null ? void 0 : _datum$stackData2[1]) != null ? _datum$stackData$2 : NaN)) != null ? _secondaryAxis$scale3 : NaN;
    }

    return (_secondaryAxis$scale4 = secondaryAxis.scale(datum.secondaryValue)) != null ? _secondaryAxis$scale4 : NaN;
  }

  function clampPxToAxis$1(startPx, lengthPx, axis) {
    var range = axis.scale.range();

    if (axis.isVertical) {
      range.reverse();
    }

    var safe = function safe(num) {
      return Math.max(range[0], Math.min(num, range[1]));
    };

    var safeStart = safe(startPx);
    var safeEnd = safe(startPx + lengthPx);
    var safeLength = safeEnd - safeStart;
    return [safeStart, safeLength];
  }

  const pi = Math.PI,
        tau$1 = 2 * pi,
        epsilon$2 = 1e-6,
        tauEpsilon = tau$1 - epsilon$2;

  function Path$1() {
    this._x0 = this._y0 = // start of current subpath
    this._x1 = this._y1 = null; // end of current subpath

    this._ = "";
  }

  function path() {
    return new Path$1();
  }

  Path$1.prototype = path.prototype = {
    constructor: Path$1,
    moveTo: function (x, y) {
      this._ += "M" + (this._x0 = this._x1 = +x) + "," + (this._y0 = this._y1 = +y);
    },
    closePath: function () {
      if (this._x1 !== null) {
        this._x1 = this._x0, this._y1 = this._y0;
        this._ += "Z";
      }
    },
    lineTo: function (x, y) {
      this._ += "L" + (this._x1 = +x) + "," + (this._y1 = +y);
    },
    quadraticCurveTo: function (x1, y1, x, y) {
      this._ += "Q" + +x1 + "," + +y1 + "," + (this._x1 = +x) + "," + (this._y1 = +y);
    },
    bezierCurveTo: function (x1, y1, x2, y2, x, y) {
      this._ += "C" + +x1 + "," + +y1 + "," + +x2 + "," + +y2 + "," + (this._x1 = +x) + "," + (this._y1 = +y);
    },
    arcTo: function (x1, y1, x2, y2, r) {
      x1 = +x1, y1 = +y1, x2 = +x2, y2 = +y2, r = +r;
      var x0 = this._x1,
          y0 = this._y1,
          x21 = x2 - x1,
          y21 = y2 - y1,
          x01 = x0 - x1,
          y01 = y0 - y1,
          l01_2 = x01 * x01 + y01 * y01; // Is the radius negative? Error.

      if (r < 0) throw new Error("negative radius: " + r); // Is this path empty? Move to (x1,y1).

      if (this._x1 === null) {
        this._ += "M" + (this._x1 = x1) + "," + (this._y1 = y1);
      } // Or, is (x1,y1) coincident with (x0,y0)? Do nothing.
      else if (!(l01_2 > epsilon$2)) ; // Or, are (x0,y0), (x1,y1) and (x2,y2) collinear?
        // Equivalently, is (x1,y1) coincident with (x2,y2)?
        // Or, is the radius zero? Line to (x1,y1).
        else if (!(Math.abs(y01 * x21 - y21 * x01) > epsilon$2) || !r) {
            this._ += "L" + (this._x1 = x1) + "," + (this._y1 = y1);
          } // Otherwise, draw an arc!
          else {
              var x20 = x2 - x0,
                  y20 = y2 - y0,
                  l21_2 = x21 * x21 + y21 * y21,
                  l20_2 = x20 * x20 + y20 * y20,
                  l21 = Math.sqrt(l21_2),
                  l01 = Math.sqrt(l01_2),
                  l = r * Math.tan((pi - Math.acos((l21_2 + l01_2 - l20_2) / (2 * l21 * l01))) / 2),
                  t01 = l / l01,
                  t21 = l / l21; // If the start tangent is not coincident with (x0,y0), line to.

              if (Math.abs(t01 - 1) > epsilon$2) {
                this._ += "L" + (x1 + t01 * x01) + "," + (y1 + t01 * y01);
              }

              this._ += "A" + r + "," + r + ",0,0," + +(y01 * x20 > x01 * y20) + "," + (this._x1 = x1 + t21 * x21) + "," + (this._y1 = y1 + t21 * y21);
            }
    },
    arc: function (x, y, r, a0, a1, ccw) {
      x = +x, y = +y, r = +r, ccw = !!ccw;
      var dx = r * Math.cos(a0),
          dy = r * Math.sin(a0),
          x0 = x + dx,
          y0 = y + dy,
          cw = 1 ^ ccw,
          da = ccw ? a0 - a1 : a1 - a0; // Is the radius negative? Error.

      if (r < 0) throw new Error("negative radius: " + r); // Is this path empty? Move to (x0,y0).

      if (this._x1 === null) {
        this._ += "M" + x0 + "," + y0;
      } // Or, is (x0,y0) not coincident with the previous point? Line to (x0,y0).
      else if (Math.abs(this._x1 - x0) > epsilon$2 || Math.abs(this._y1 - y0) > epsilon$2) {
          this._ += "L" + x0 + "," + y0;
        } // Is this arc empty? We’re done.


      if (!r) return; // Does the angle go the wrong way? Flip the direction.

      if (da < 0) da = da % tau$1 + tau$1; // Is this a complete circle? Draw two arcs to complete the circle.

      if (da > tauEpsilon) {
        this._ += "A" + r + "," + r + ",0,1," + cw + "," + (x - dx) + "," + (y - dy) + "A" + r + "," + r + ",0,1," + cw + "," + (this._x1 = x0) + "," + (this._y1 = y0);
      } // Is this arc non-empty? Draw an arc!
      else if (da > epsilon$2) {
          this._ += "A" + r + "," + r + ",0," + +(da >= pi) + "," + cw + "," + (this._x1 = x + r * Math.cos(a1)) + "," + (this._y1 = y + r * Math.sin(a1));
        }
    },
    rect: function (x, y, w, h) {
      this._ += "M" + (this._x0 = this._x1 = +x) + "," + (this._y0 = this._y1 = +y) + "h" + +w + "v" + +h + "h" + -w + "Z";
    },
    toString: function () {
      return this._;
    }
  };

  function constant$1 (x) {
    return function constant() {
      return x;
    };
  }

  function array (x) {
    return typeof x === "object" && "length" in x ? x // Array, TypedArray, NodeList, array-like
    : Array.from(x); // Map, Set, iterable, string, or anything else
  }

  function Linear(context) {
    this._context = context;
  }

  Linear.prototype = {
    areaStart: function () {
      this._line = 0;
    },
    areaEnd: function () {
      this._line = NaN;
    },
    lineStart: function () {
      this._point = 0;
    },
    lineEnd: function () {
      if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
      this._line = 1 - this._line;
    },
    point: function (x, y) {
      x = +x, y = +y;

      switch (this._point) {
        case 0:
          this._point = 1;
          this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y);
          break;

        case 1:
          this._point = 2;
        // proceed

        default:
          this._context.lineTo(x, y);

          break;
      }
    }
  };
  function curveLinear (context) {
    return new Linear(context);
  }

  function x(p) {
    return p[0];
  }
  function y(p) {
    return p[1];
  }

  function line (x$1, y$1) {
    var defined = constant$1(true),
        context = null,
        curve = curveLinear,
        output = null;
    x$1 = typeof x$1 === "function" ? x$1 : x$1 === undefined ? x : constant$1(x$1);
    y$1 = typeof y$1 === "function" ? y$1 : y$1 === undefined ? y : constant$1(y$1);

    function line(data) {
      var i,
          n = (data = array(data)).length,
          d,
          defined0 = false,
          buffer;
      if (context == null) output = curve(buffer = path());

      for (i = 0; i <= n; ++i) {
        if (!(i < n && defined(d = data[i], i, data)) === defined0) {
          if (defined0 = !defined0) output.lineStart();else output.lineEnd();
        }

        if (defined0) output.point(+x$1(d, i, data), +y$1(d, i, data));
      }

      if (buffer) return output = null, buffer + "" || null;
    }

    line.x = function (_) {
      return arguments.length ? (x$1 = typeof _ === "function" ? _ : constant$1(+_), line) : x$1;
    };

    line.y = function (_) {
      return arguments.length ? (y$1 = typeof _ === "function" ? _ : constant$1(+_), line) : y$1;
    };

    line.defined = function (_) {
      return arguments.length ? (defined = typeof _ === "function" ? _ : constant$1(!!_), line) : defined;
    };

    line.curve = function (_) {
      return arguments.length ? (curve = _, context != null && (output = curve(context)), line) : curve;
    };

    line.context = function (_) {
      return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), line) : context;
    };

    return line;
  }

  function area (x0, y0, y1) {
    var x1 = null,
        defined = constant$1(true),
        context = null,
        curve = curveLinear,
        output = null;
    x0 = typeof x0 === "function" ? x0 : x0 === undefined ? x : constant$1(+x0);
    y0 = typeof y0 === "function" ? y0 : y0 === undefined ? constant$1(0) : constant$1(+y0);
    y1 = typeof y1 === "function" ? y1 : y1 === undefined ? y : constant$1(+y1);

    function area(data) {
      var i,
          j,
          k,
          n = (data = array(data)).length,
          d,
          defined0 = false,
          buffer,
          x0z = new Array(n),
          y0z = new Array(n);
      if (context == null) output = curve(buffer = path());

      for (i = 0; i <= n; ++i) {
        if (!(i < n && defined(d = data[i], i, data)) === defined0) {
          if (defined0 = !defined0) {
            j = i;
            output.areaStart();
            output.lineStart();
          } else {
            output.lineEnd();
            output.lineStart();

            for (k = i - 1; k >= j; --k) {
              output.point(x0z[k], y0z[k]);
            }

            output.lineEnd();
            output.areaEnd();
          }
        }

        if (defined0) {
          x0z[i] = +x0(d, i, data), y0z[i] = +y0(d, i, data);
          output.point(x1 ? +x1(d, i, data) : x0z[i], y1 ? +y1(d, i, data) : y0z[i]);
        }
      }

      if (buffer) return output = null, buffer + "" || null;
    }

    function arealine() {
      return line().defined(defined).curve(curve).context(context);
    }

    area.x = function (_) {
      return arguments.length ? (x0 = typeof _ === "function" ? _ : constant$1(+_), x1 = null, area) : x0;
    };

    area.x0 = function (_) {
      return arguments.length ? (x0 = typeof _ === "function" ? _ : constant$1(+_), area) : x0;
    };

    area.x1 = function (_) {
      return arguments.length ? (x1 = _ == null ? null : typeof _ === "function" ? _ : constant$1(+_), area) : x1;
    };

    area.y = function (_) {
      return arguments.length ? (y0 = typeof _ === "function" ? _ : constant$1(+_), y1 = null, area) : y0;
    };

    area.y0 = function (_) {
      return arguments.length ? (y0 = typeof _ === "function" ? _ : constant$1(+_), area) : y0;
    };

    area.y1 = function (_) {
      return arguments.length ? (y1 = _ == null ? null : typeof _ === "function" ? _ : constant$1(+_), area) : y1;
    };

    area.lineX0 = area.lineY0 = function () {
      return arealine().x(x0).y(y0);
    };

    area.lineY1 = function () {
      return arealine().x(x0).y(y1);
    };

    area.lineX1 = function () {
      return arealine().x(x1).y(y0);
    };

    area.defined = function (_) {
      return arguments.length ? (defined = typeof _ === "function" ? _ : constant$1(!!_), area) : defined;
    };

    area.curve = function (_) {
      return arguments.length ? (curve = _, context != null && (output = curve(context)), area) : curve;
    };

    area.context = function (_) {
      return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), area) : context;
    };

    return area;
  }

  function stackOffsetNone (series, order) {
    if (!((n = series.length) > 1)) return;

    for (var i = 1, j, s0, s1 = series[order[0]], n, m = s1.length; i < n; ++i) {
      s0 = s1, s1 = series[order[i]];

      for (j = 0; j < m; ++j) {
        s1[j][1] += s1[j][0] = isNaN(s0[j][1]) ? s0[j][0] : s0[j][1];
      }
    }
  }

  function none (series) {
    var n = series.length,
        o = new Array(n);

    while (--n >= 0) o[n] = n;

    return o;
  }

  function stackValue(d, key) {
    return d[key];
  }

  function stackSeries$1(key) {
    const series = [];
    series.key = key;
    return series;
  }

  function stack () {
    var keys = constant$1([]),
        order = none,
        offset = stackOffsetNone,
        value = stackValue;

    function stack(data) {
      var sz = Array.from(keys.apply(this, arguments), stackSeries$1),
          i,
          n = sz.length,
          j = -1,
          oz;

      for (const d of data) {
        for (i = 0, ++j; i < n; ++i) {
          (sz[i][j] = [0, +value(d, sz[i].key, j, data)]).data = d;
        }
      }

      for (i = 0, oz = array(order(sz)); i < n; ++i) {
        sz[oz[i]].index = i;
      }

      offset(sz, oz);
      return sz;
    }

    stack.keys = function (_) {
      return arguments.length ? (keys = typeof _ === "function" ? _ : constant$1(Array.from(_)), stack) : keys;
    };

    stack.value = function (_) {
      return arguments.length ? (value = typeof _ === "function" ? _ : constant$1(+_), stack) : value;
    };

    stack.order = function (_) {
      return arguments.length ? (order = _ == null ? none : typeof _ === "function" ? _ : constant$1(Array.from(_)), stack) : order;
    };

    stack.offset = function (_) {
      return arguments.length ? (offset = _ == null ? stackOffsetNone : _, stack) : offset;
    };

    return stack;
  }

  // @ts-nocheck
  function sign(x) {
    return x < 0 ? -1 : 1;
  } // Calculate the slopes of the tangents (Hermite-type interpolation) based on
  // the following paper: Steffen, M. 1990. A Simple Method for Monotonic
  // Interpolation in One Dimension. Astronomy and Astrophysics, Vol. 239, NO.
  // NOV(II), P. 443, 1990.


  function slope3(that, x2, y2) {
    var h0 = that._x1 - that._x0,
        h1 = x2 - that._x1,
        s0 = (that._y1 - that._y0) / (h0 || h1 < 0 && -0),
        s1 = (y2 - that._y1) / (h1 || h0 < 0 && -0),
        p = (s0 * h1 + s1 * h0) / (h0 + h1);
    return (sign(s0) + sign(s1)) * Math.min(Math.abs(s0), Math.abs(s1), 0.5 * Math.abs(p)) || 0;
  } // Calculate a one-sided slope.


  function slope2(that, t) {
    var h = that._x1 - that._x0;
    return h ? (3 * (that._y1 - that._y0) / h - t) / 2 : t;
  } // According to https://en.wikipedia.org/wiki/Cubic_Hermite_spline#Representations
  // "you can express cubic Hermite interpolation in terms of cubic Bézier curves
  // with respect to the four values p0, p0 + m0 / 3, p1 - m1 / 3, p1".


  function _point(that, t0, t1) {
    var x0 = that._x0,
        y0 = that._y0,
        x1 = that._x1,
        y1 = that._y1,
        dx = (x1 - x0) / 3;

    that._context.bezierCurveTo(x0 + dx, y0 + dx * t0, x1 - dx, y1 - dx * t1, x1, y1);
  }

  function MonotoneX(context) {
    this._context = context;
  }

  MonotoneX.prototype = {
    areaStart: function areaStart() {
      this._line = 0;
    },
    areaEnd: function areaEnd() {
      this._line = NaN;
    },
    lineStart: function lineStart() {
      this._x0 = this._x1 = this._y0 = this._y1 = this._t0 = NaN;
      this._point = 0;
    },
    lineEnd: function lineEnd() {
      switch (this._point) {
        case 2:
          this._context.lineTo(this._x1, this._y1);

          break;

        case 3:
          _point(this, this._t0, slope2(this, this._t0));

          break;
      }

      if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
      this._line = 1 - this._line;
    },
    point: function point(x, y) {
      var t1 = NaN;
      x = +x, y = +y;
      if (x === this._x1 && y === this._y1) return; // Ignore coincident points.

      switch (this._point) {
        case 0:
          this._point = 1;
          this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y);
          break;

        case 1:
          this._point = 2;
          break;

        case 2:
          this._point = 3;

          _point(this, slope2(this, t1 = slope3(this, x, y)), t1);

          break;

        default:
          _point(this, this._t0, t1 = slope3(this, x, y));

          break;
      }
      this._x0 = this._x1, this._x1 = x;
      this._y0 = this._y1, this._y1 = y;
      this._t0 = t1;
    }
  };

  (Object.create(MonotoneX.prototype)).point = function (x, y) {
    MonotoneX.prototype.point.call(this, y, x);
  };
  var monotoneX = function monotoneX(context) {
    return new MonotoneX(context);
  };

  function Line(_ref) {
    var _secondaryAxis$curve;

    var primaryAxis = _ref.primaryAxis,
        secondaryAxis = _ref.secondaryAxis,
        allSeries = _ref.series;

    var _useChartContext = useChartContext(),
        getSeriesStatusStyle = _useChartContext.getSeriesStatusStyle,
        getDatumStatusStyle = _useChartContext.getDatumStatusStyle,
        focusedDatumState = _useChartContext.focusedDatumState,
        gridDimensions = _useChartContext.gridDimensions;

    var curve = (_secondaryAxis$curve = secondaryAxis.curve) != null ? _secondaryAxis$curve : monotoneX;
    var focusedDatum = focusedDatumState[0];
    return /*#__PURE__*/React__default['default'].createElement("g", {
      style: {
        transform: translate(gridDimensions.left, gridDimensions.top)
      }
    }, allSeries.map(function (series, i) {
      var _lineFn, _secondaryAxis$showDa;

      var style = getSeriesStatusStyle(series, focusedDatum);
      var areaPath = null;

      if (secondaryAxis.elementType === 'area') {
        var _x2 = function _x2(datum) {
          return getPrimary$1(datum, primaryAxis);
        };

        var _y1 = function _y1(datum) {
          return clampPxToAxis(getSecondaryStart(datum, secondaryAxis), secondaryAxis);
        };

        var _y2 = function _y2(datum) {
          return clampPxToAxis(getSecondary$1(datum, secondaryAxis), secondaryAxis);
        };

        var areaFn = area(_x2, _y1, _y2).curve(curve);
        areaFn.defined(function (datum) {
          return [_x2(datum), _y1(datum), _y2(datum)].every(isDefined);
        });
        areaPath = areaFn(series.datums);
      }

      var _x = function _x(datum) {
        return getPrimary$1(datum, primaryAxis);
      };

      var _y = function _y(datum) {
        return getSecondary$1(datum, secondaryAxis);
      };

      var lineFn = line(_x, _y).curve(curve);
      lineFn.defined(function (datum) {
        return [_x(datum), _y(datum)].every(isDefined);
      });
      var linePath = secondaryAxis.elementType === 'area' || secondaryAxis.elementType === 'line' ? (_lineFn = lineFn(series.datums)) != null ? _lineFn : undefined : undefined;
      var showDatumElements = (_secondaryAxis$showDa = secondaryAxis.showDatumElements) != null ? _secondaryAxis$showDa : secondaryAxis.elementType === 'bubble' || 'onFocus';
      return /*#__PURE__*/React__default['default'].createElement("g", {
        key: "lines-" + i
      }, areaPath ? /*#__PURE__*/React__default['default'].createElement("path", {
        d: areaPath,
        style: _extends({
          strokeWidth: 2,
          opacity: 0.5
        }, style, style.area)
      }) : null, linePath ? /*#__PURE__*/React__default['default'].createElement("path", {
        d: linePath,
        style: _extends({
          strokeWidth: 2
        }, style, style.line, {
          fill: 'none'
        })
      }) : null, series.datums.map(function (datum, i) {
        var _secondaryAxis$showDa2;

        var dataStyle = getDatumStatusStyle(datum, focusedDatum);
        var radius = showDatumElements === 'onFocus' ? datum === focusedDatum ? 4 : 0 : 2;
        var show = showDatumElements === 'onFocus' ? datum === focusedDatum : (_secondaryAxis$showDa2 = secondaryAxis.showDatumElements) != null ? _secondaryAxis$showDa2 : secondaryAxis.elementType === 'bubble';
        return /*#__PURE__*/React__default['default'].createElement("circle", {
          key: i,
          ref: function ref(el) {
            datum.element = el;
          },
          cx: getX$1(datum, primaryAxis, secondaryAxis) || 0,
          cy: getY$1(datum, primaryAxis, secondaryAxis) || 0,
          style: _extends({
            // @ts-ignore
            r: radius,
            transition: 'all .3s ease-out'
          }, style, style.circle, dataStyle, dataStyle.circle, !show ? {
            opacity: 0
          } : {})
        });
      }));
    }));
  }

  function getX$1(datum, primaryAxis, secondaryAxis) {
    return primaryAxis.isVertical ? getSecondary$1(datum, secondaryAxis) : getPrimary$1(datum, primaryAxis);
  }

  function getY$1(datum, primaryAxis, secondaryAxis) {
    return primaryAxis.isVertical ? getPrimary$1(datum, primaryAxis) : getSecondary$1(datum, secondaryAxis);
  }

  function getPrimary$1(datum, primaryAxis) {
    var _primaryAxis$scale;

    var primary = (_primaryAxis$scale = primaryAxis.scale(datum.primaryValue)) != null ? _primaryAxis$scale : NaN;

    if (primaryAxis.axisFamily === 'band') {
      primary += primaryAxis.scale.bandwidth() / 2;
    }

    return primary;
  }

  function getSecondary$1(datum, secondaryAxis) {
    var _secondaryAxis$scale2;

    if (secondaryAxis.stacked) {
      var _secondaryAxis$scale, _datum$stackData$, _datum$stackData;

      return (_secondaryAxis$scale = secondaryAxis.scale((_datum$stackData$ = (_datum$stackData = datum.stackData) == null ? void 0 : _datum$stackData[1]) != null ? _datum$stackData$ : NaN)) != null ? _secondaryAxis$scale : NaN;
    }

    return (_secondaryAxis$scale2 = secondaryAxis.scale(datum.secondaryValue)) != null ? _secondaryAxis$scale2 : NaN;
  }

  function getSecondaryStart(datum, secondaryAxis) {
    var _secondaryAxis$scale4;

    if (secondaryAxis.stacked) {
      var _secondaryAxis$scale3, _datum$stackData$2, _datum$stackData2;

      return (_secondaryAxis$scale3 = secondaryAxis.scale((_datum$stackData$2 = (_datum$stackData2 = datum.stackData) == null ? void 0 : _datum$stackData2[0]) != null ? _datum$stackData$2 : NaN)) != null ? _secondaryAxis$scale3 : NaN;
    }

    return (_secondaryAxis$scale4 = secondaryAxis.scale(0)) != null ? _secondaryAxis$scale4 : NaN;
  }

  function clampPxToAxis(px, axis) {
    var range = axis.scale.range();

    if (axis.isVertical) {
      range.reverse();
    }

    return Math.max(range[0], Math.min(px, range[1]));
  }

  function initRange(domain, range) {
    switch (arguments.length) {
      case 0:
        break;

      case 1:
        this.range(domain);
        break;

      default:
        this.range(range).domain(domain);
        break;
    }

    return this;
  }

  const implicit = Symbol("implicit");
  function ordinal() {
    var index = new Map(),
        domain = [],
        range = [],
        unknown = implicit;

    function scale(d) {
      var key = d + "",
          i = index.get(key);

      if (!i) {
        if (unknown !== implicit) return unknown;
        index.set(key, i = domain.push(d));
      }

      return range[(i - 1) % range.length];
    }

    scale.domain = function (_) {
      if (!arguments.length) return domain.slice();
      domain = [], index = new Map();

      for (const value of _) {
        const key = value + "";
        if (index.has(key)) continue;
        index.set(key, domain.push(value));
      }

      return scale;
    };

    scale.range = function (_) {
      return arguments.length ? (range = Array.from(_), scale) : range.slice();
    };

    scale.unknown = function (_) {
      return arguments.length ? (unknown = _, scale) : unknown;
    };

    scale.copy = function () {
      return ordinal(domain, range).unknown(unknown);
    };

    initRange.apply(scale, arguments);
    return scale;
  }

  function band() {
    var scale = ordinal().unknown(undefined),
        domain = scale.domain,
        ordinalRange = scale.range,
        r0 = 0,
        r1 = 1,
        step,
        bandwidth,
        round = false,
        paddingInner = 0,
        paddingOuter = 0,
        align = 0.5;
    delete scale.unknown;

    function rescale() {
      var n = domain().length,
          reverse = r1 < r0,
          start = reverse ? r1 : r0,
          stop = reverse ? r0 : r1;
      step = (stop - start) / Math.max(1, n - paddingInner + paddingOuter * 2);
      if (round) step = Math.floor(step);
      start += (stop - start - step * (n - paddingInner)) * align;
      bandwidth = step * (1 - paddingInner);
      if (round) start = Math.round(start), bandwidth = Math.round(bandwidth);
      var values = d3Range(n).map(function (i) {
        return start + step * i;
      });
      return ordinalRange(reverse ? values.reverse() : values);
    }

    scale.domain = function (_) {
      return arguments.length ? (domain(_), rescale()) : domain();
    };

    scale.range = function (_) {
      return arguments.length ? ([r0, r1] = _, r0 = +r0, r1 = +r1, rescale()) : [r0, r1];
    };

    scale.rangeRound = function (_) {
      return [r0, r1] = _, r0 = +r0, r1 = +r1, round = true, rescale();
    };

    scale.bandwidth = function () {
      return bandwidth;
    };

    scale.step = function () {
      return step;
    };

    scale.round = function (_) {
      return arguments.length ? (round = !!_, rescale()) : round;
    };

    scale.padding = function (_) {
      return arguments.length ? (paddingInner = Math.min(1, paddingOuter = +_), rescale()) : paddingInner;
    };

    scale.paddingInner = function (_) {
      return arguments.length ? (paddingInner = Math.min(1, _), rescale()) : paddingInner;
    };

    scale.paddingOuter = function (_) {
      return arguments.length ? (paddingOuter = +_, rescale()) : paddingOuter;
    };

    scale.align = function (_) {
      return arguments.length ? (align = Math.max(0, Math.min(1, _)), rescale()) : align;
    };

    scale.copy = function () {
      return band(domain(), [r0, r1]).round(round).paddingInner(paddingInner).paddingOuter(paddingOuter).align(align);
    };

    return initRange.apply(rescale(), arguments);
  }

  function define (constructor, factory, prototype) {
    constructor.prototype = factory.prototype = prototype;
    prototype.constructor = constructor;
  }
  function extend(parent, definition) {
    var prototype = Object.create(parent.prototype);

    for (var key in definition) prototype[key] = definition[key];

    return prototype;
  }

  function Color() {}
  var darker = 0.7;
  var brighter = 1 / darker;
  var reI = "\\s*([+-]?\\d+)\\s*",
      reN = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*",
      reP = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
      reHex = /^#([0-9a-f]{3,8})$/,
      reRgbInteger = new RegExp("^rgb\\(" + [reI, reI, reI] + "\\)$"),
      reRgbPercent = new RegExp("^rgb\\(" + [reP, reP, reP] + "\\)$"),
      reRgbaInteger = new RegExp("^rgba\\(" + [reI, reI, reI, reN] + "\\)$"),
      reRgbaPercent = new RegExp("^rgba\\(" + [reP, reP, reP, reN] + "\\)$"),
      reHslPercent = new RegExp("^hsl\\(" + [reN, reP, reP] + "\\)$"),
      reHslaPercent = new RegExp("^hsla\\(" + [reN, reP, reP, reN] + "\\)$");
  var named = {
    aliceblue: 0xf0f8ff,
    antiquewhite: 0xfaebd7,
    aqua: 0x00ffff,
    aquamarine: 0x7fffd4,
    azure: 0xf0ffff,
    beige: 0xf5f5dc,
    bisque: 0xffe4c4,
    black: 0x000000,
    blanchedalmond: 0xffebcd,
    blue: 0x0000ff,
    blueviolet: 0x8a2be2,
    brown: 0xa52a2a,
    burlywood: 0xdeb887,
    cadetblue: 0x5f9ea0,
    chartreuse: 0x7fff00,
    chocolate: 0xd2691e,
    coral: 0xff7f50,
    cornflowerblue: 0x6495ed,
    cornsilk: 0xfff8dc,
    crimson: 0xdc143c,
    cyan: 0x00ffff,
    darkblue: 0x00008b,
    darkcyan: 0x008b8b,
    darkgoldenrod: 0xb8860b,
    darkgray: 0xa9a9a9,
    darkgreen: 0x006400,
    darkgrey: 0xa9a9a9,
    darkkhaki: 0xbdb76b,
    darkmagenta: 0x8b008b,
    darkolivegreen: 0x556b2f,
    darkorange: 0xff8c00,
    darkorchid: 0x9932cc,
    darkred: 0x8b0000,
    darksalmon: 0xe9967a,
    darkseagreen: 0x8fbc8f,
    darkslateblue: 0x483d8b,
    darkslategray: 0x2f4f4f,
    darkslategrey: 0x2f4f4f,
    darkturquoise: 0x00ced1,
    darkviolet: 0x9400d3,
    deeppink: 0xff1493,
    deepskyblue: 0x00bfff,
    dimgray: 0x696969,
    dimgrey: 0x696969,
    dodgerblue: 0x1e90ff,
    firebrick: 0xb22222,
    floralwhite: 0xfffaf0,
    forestgreen: 0x228b22,
    fuchsia: 0xff00ff,
    gainsboro: 0xdcdcdc,
    ghostwhite: 0xf8f8ff,
    gold: 0xffd700,
    goldenrod: 0xdaa520,
    gray: 0x808080,
    green: 0x008000,
    greenyellow: 0xadff2f,
    grey: 0x808080,
    honeydew: 0xf0fff0,
    hotpink: 0xff69b4,
    indianred: 0xcd5c5c,
    indigo: 0x4b0082,
    ivory: 0xfffff0,
    khaki: 0xf0e68c,
    lavender: 0xe6e6fa,
    lavenderblush: 0xfff0f5,
    lawngreen: 0x7cfc00,
    lemonchiffon: 0xfffacd,
    lightblue: 0xadd8e6,
    lightcoral: 0xf08080,
    lightcyan: 0xe0ffff,
    lightgoldenrodyellow: 0xfafad2,
    lightgray: 0xd3d3d3,
    lightgreen: 0x90ee90,
    lightgrey: 0xd3d3d3,
    lightpink: 0xffb6c1,
    lightsalmon: 0xffa07a,
    lightseagreen: 0x20b2aa,
    lightskyblue: 0x87cefa,
    lightslategray: 0x778899,
    lightslategrey: 0x778899,
    lightsteelblue: 0xb0c4de,
    lightyellow: 0xffffe0,
    lime: 0x00ff00,
    limegreen: 0x32cd32,
    linen: 0xfaf0e6,
    magenta: 0xff00ff,
    maroon: 0x800000,
    mediumaquamarine: 0x66cdaa,
    mediumblue: 0x0000cd,
    mediumorchid: 0xba55d3,
    mediumpurple: 0x9370db,
    mediumseagreen: 0x3cb371,
    mediumslateblue: 0x7b68ee,
    mediumspringgreen: 0x00fa9a,
    mediumturquoise: 0x48d1cc,
    mediumvioletred: 0xc71585,
    midnightblue: 0x191970,
    mintcream: 0xf5fffa,
    mistyrose: 0xffe4e1,
    moccasin: 0xffe4b5,
    navajowhite: 0xffdead,
    navy: 0x000080,
    oldlace: 0xfdf5e6,
    olive: 0x808000,
    olivedrab: 0x6b8e23,
    orange: 0xffa500,
    orangered: 0xff4500,
    orchid: 0xda70d6,
    palegoldenrod: 0xeee8aa,
    palegreen: 0x98fb98,
    paleturquoise: 0xafeeee,
    palevioletred: 0xdb7093,
    papayawhip: 0xffefd5,
    peachpuff: 0xffdab9,
    peru: 0xcd853f,
    pink: 0xffc0cb,
    plum: 0xdda0dd,
    powderblue: 0xb0e0e6,
    purple: 0x800080,
    rebeccapurple: 0x663399,
    red: 0xff0000,
    rosybrown: 0xbc8f8f,
    royalblue: 0x4169e1,
    saddlebrown: 0x8b4513,
    salmon: 0xfa8072,
    sandybrown: 0xf4a460,
    seagreen: 0x2e8b57,
    seashell: 0xfff5ee,
    sienna: 0xa0522d,
    silver: 0xc0c0c0,
    skyblue: 0x87ceeb,
    slateblue: 0x6a5acd,
    slategray: 0x708090,
    slategrey: 0x708090,
    snow: 0xfffafa,
    springgreen: 0x00ff7f,
    steelblue: 0x4682b4,
    tan: 0xd2b48c,
    teal: 0x008080,
    thistle: 0xd8bfd8,
    tomato: 0xff6347,
    turquoise: 0x40e0d0,
    violet: 0xee82ee,
    wheat: 0xf5deb3,
    white: 0xffffff,
    whitesmoke: 0xf5f5f5,
    yellow: 0xffff00,
    yellowgreen: 0x9acd32
  };
  define(Color, color, {
    copy: function (channels) {
      return Object.assign(new this.constructor(), this, channels);
    },
    displayable: function () {
      return this.rgb().displayable();
    },
    hex: color_formatHex,
    // Deprecated! Use color.formatHex.
    formatHex: color_formatHex,
    formatHsl: color_formatHsl,
    formatRgb: color_formatRgb,
    toString: color_formatRgb
  });

  function color_formatHex() {
    return this.rgb().formatHex();
  }

  function color_formatHsl() {
    return hslConvert(this).formatHsl();
  }

  function color_formatRgb() {
    return this.rgb().formatRgb();
  }

  function color(format) {
    var m, l;
    format = (format + "").trim().toLowerCase();
    return (m = reHex.exec(format)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn(m) // #ff0000
    : l === 3 ? new Rgb(m >> 8 & 0xf | m >> 4 & 0xf0, m >> 4 & 0xf | m & 0xf0, (m & 0xf) << 4 | m & 0xf, 1) // #f00
    : l === 8 ? rgba(m >> 24 & 0xff, m >> 16 & 0xff, m >> 8 & 0xff, (m & 0xff) / 0xff) // #ff000000
    : l === 4 ? rgba(m >> 12 & 0xf | m >> 8 & 0xf0, m >> 8 & 0xf | m >> 4 & 0xf0, m >> 4 & 0xf | m & 0xf0, ((m & 0xf) << 4 | m & 0xf) / 0xff) // #f000
    : null // invalid hex
    ) : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
    : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) // rgb(100%, 0%, 0%)
    : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
    : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) // rgb(100%, 0%, 0%, 1)
    : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
    : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
    : named.hasOwnProperty(format) ? rgbn(named[format]) // eslint-disable-line no-prototype-builtins
    : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0) : null;
  }

  function rgbn(n) {
    return new Rgb(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 1);
  }

  function rgba(r, g, b, a) {
    if (a <= 0) r = g = b = NaN;
    return new Rgb(r, g, b, a);
  }

  function rgbConvert(o) {
    if (!(o instanceof Color)) o = color(o);
    if (!o) return new Rgb();
    o = o.rgb();
    return new Rgb(o.r, o.g, o.b, o.opacity);
  }
  function rgb$1(r, g, b, opacity) {
    return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
  }
  function Rgb(r, g, b, opacity) {
    this.r = +r;
    this.g = +g;
    this.b = +b;
    this.opacity = +opacity;
  }
  define(Rgb, rgb$1, extend(Color, {
    brighter: function (k) {
      k = k == null ? brighter : Math.pow(brighter, k);
      return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
    },
    darker: function (k) {
      k = k == null ? darker : Math.pow(darker, k);
      return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
    },
    rgb: function () {
      return this;
    },
    displayable: function () {
      return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
    },
    hex: rgb_formatHex,
    // Deprecated! Use color.formatHex.
    formatHex: rgb_formatHex,
    formatRgb: rgb_formatRgb,
    toString: rgb_formatRgb
  }));

  function rgb_formatHex() {
    return "#" + hex(this.r) + hex(this.g) + hex(this.b);
  }

  function rgb_formatRgb() {
    var a = this.opacity;
    a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
    return (a === 1 ? "rgb(" : "rgba(") + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.b) || 0)) + (a === 1 ? ")" : ", " + a + ")");
  }

  function hex(value) {
    value = Math.max(0, Math.min(255, Math.round(value) || 0));
    return (value < 16 ? "0" : "") + value.toString(16);
  }

  function hsla(h, s, l, a) {
    if (a <= 0) h = s = l = NaN;else if (l <= 0 || l >= 1) h = s = NaN;else if (s <= 0) h = NaN;
    return new Hsl(h, s, l, a);
  }

  function hslConvert(o) {
    if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
    if (!(o instanceof Color)) o = color(o);
    if (!o) return new Hsl();
    if (o instanceof Hsl) return o;
    o = o.rgb();
    var r = o.r / 255,
        g = o.g / 255,
        b = o.b / 255,
        min = Math.min(r, g, b),
        max = Math.max(r, g, b),
        h = NaN,
        s = max - min,
        l = (max + min) / 2;

    if (s) {
      if (r === max) h = (g - b) / s + (g < b) * 6;else if (g === max) h = (b - r) / s + 2;else h = (r - g) / s + 4;
      s /= l < 0.5 ? max + min : 2 - max - min;
      h *= 60;
    } else {
      s = l > 0 && l < 1 ? 0 : h;
    }

    return new Hsl(h, s, l, o.opacity);
  }
  function hsl(h, s, l, opacity) {
    return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
  }

  function Hsl(h, s, l, opacity) {
    this.h = +h;
    this.s = +s;
    this.l = +l;
    this.opacity = +opacity;
  }

  define(Hsl, hsl, extend(Color, {
    brighter: function (k) {
      k = k == null ? brighter : Math.pow(brighter, k);
      return new Hsl(this.h, this.s, this.l * k, this.opacity);
    },
    darker: function (k) {
      k = k == null ? darker : Math.pow(darker, k);
      return new Hsl(this.h, this.s, this.l * k, this.opacity);
    },
    rgb: function () {
      var h = this.h % 360 + (this.h < 0) * 360,
          s = isNaN(h) || isNaN(this.s) ? 0 : this.s,
          l = this.l,
          m2 = l + (l < 0.5 ? l : 1 - l) * s,
          m1 = 2 * l - m2;
      return new Rgb(hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2), hsl2rgb(h, m1, m2), hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2), this.opacity);
    },
    displayable: function () {
      return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
    },
    formatHsl: function () {
      var a = this.opacity;
      a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
      return (a === 1 ? "hsl(" : "hsla(") + (this.h || 0) + ", " + (this.s || 0) * 100 + "%, " + (this.l || 0) * 100 + "%" + (a === 1 ? ")" : ", " + a + ")");
    }
  }));
  /* From FvD 13.37, CSS Color Module Level 3 */

  function hsl2rgb(h, m1, m2) {
    return (h < 60 ? m1 + (m2 - m1) * h / 60 : h < 180 ? m2 : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60 : m1) * 255;
  }

  var constant = (x => () => x);

  function linear$1(a, d) {
    return function (t) {
      return a + t * d;
    };
  }

  function exponential(a, b, y) {
    return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function (t) {
      return Math.pow(a + t * b, y);
    };
  }
  function gamma(y) {
    return (y = +y) === 1 ? nogamma : function (a, b) {
      return b - a ? exponential(a, b, y) : constant(isNaN(a) ? b : a);
    };
  }
  function nogamma(a, b) {
    var d = b - a;
    return d ? linear$1(a, d) : constant(isNaN(a) ? b : a);
  }

  var rgb = (function rgbGamma(y) {
    var color = gamma(y);

    function rgb(start, end) {
      var r = color((start = rgb$1(start)).r, (end = rgb$1(end)).r),
          g = color(start.g, end.g),
          b = color(start.b, end.b),
          opacity = nogamma(start.opacity, end.opacity);
      return function (t) {
        start.r = r(t);
        start.g = g(t);
        start.b = b(t);
        start.opacity = opacity(t);
        return start + "";
      };
    }

    rgb.gamma = rgbGamma;
    return rgb;
  })(1);

  function numberArray (a, b) {
    if (!b) b = [];
    var n = a ? Math.min(b.length, a.length) : 0,
        c = b.slice(),
        i;
    return function (t) {
      for (i = 0; i < n; ++i) c[i] = a[i] * (1 - t) + b[i] * t;

      return c;
    };
  }
  function isNumberArray(x) {
    return ArrayBuffer.isView(x) && !(x instanceof DataView);
  }

  function genericArray(a, b) {
    var nb = b ? b.length : 0,
        na = a ? Math.min(nb, a.length) : 0,
        x = new Array(na),
        c = new Array(nb),
        i;

    for (i = 0; i < na; ++i) x[i] = interpolate(a[i], b[i]);

    for (; i < nb; ++i) c[i] = b[i];

    return function (t) {
      for (i = 0; i < na; ++i) c[i] = x[i](t);

      return c;
    };
  }

  function date$1 (a, b) {
    var d = new Date();
    return a = +a, b = +b, function (t) {
      return d.setTime(a * (1 - t) + b * t), d;
    };
  }

  function interpolateNumber (a, b) {
    return a = +a, b = +b, function (t) {
      return a * (1 - t) + b * t;
    };
  }

  function object (a, b) {
    var i = {},
        c = {},
        k;
    if (a === null || typeof a !== "object") a = {};
    if (b === null || typeof b !== "object") b = {};

    for (k in b) {
      if (k in a) {
        i[k] = interpolate(a[k], b[k]);
      } else {
        c[k] = b[k];
      }
    }

    return function (t) {
      for (k in i) c[k] = i[k](t);

      return c;
    };
  }

  var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
      reB = new RegExp(reA.source, "g");

  function zero(b) {
    return function () {
      return b;
    };
  }

  function one(b) {
    return function (t) {
      return b(t) + "";
    };
  }

  function string (a, b) {
    var bi = reA.lastIndex = reB.lastIndex = 0,
        // scan index for next number in b
    am,
        // current match in a
    bm,
        // current match in b
    bs,
        // string preceding current number in b, if any
    i = -1,
        // index in s
    s = [],
        // string constants and placeholders
    q = []; // number interpolators
    // Coerce inputs to strings.

    a = a + "", b = b + ""; // Interpolate pairs of numbers in a & b.

    while ((am = reA.exec(a)) && (bm = reB.exec(b))) {
      if ((bs = bm.index) > bi) {
        // a string precedes the next number in b
        bs = b.slice(bi, bs);
        if (s[i]) s[i] += bs; // coalesce with previous string
        else s[++i] = bs;
      }

      if ((am = am[0]) === (bm = bm[0])) {
        // numbers in a & b match
        if (s[i]) s[i] += bm; // coalesce with previous string
        else s[++i] = bm;
      } else {
        // interpolate non-matching numbers
        s[++i] = null;
        q.push({
          i: i,
          x: interpolateNumber(am, bm)
        });
      }

      bi = reB.lastIndex;
    } // Add remains of b.


    if (bi < b.length) {
      bs = b.slice(bi);
      if (s[i]) s[i] += bs; // coalesce with previous string
      else s[++i] = bs;
    } // Special optimization for only a single match.
    // Otherwise, interpolate each of the numbers and rejoin the string.


    return s.length < 2 ? q[0] ? one(q[0].x) : zero(b) : (b = q.length, function (t) {
      for (var i = 0, o; i < b; ++i) s[(o = q[i]).i] = o.x(t);

      return s.join("");
    });
  }

  function interpolate (a, b) {
    var t = typeof b,
        c;
    return b == null || t === "boolean" ? constant(b) : (t === "number" ? interpolateNumber : t === "string" ? (c = color(b)) ? (b = c, rgb) : string : b instanceof color ? rgb : b instanceof Date ? date$1 : isNumberArray(b) ? numberArray : Array.isArray(b) ? genericArray : typeof b.valueOf !== "function" && typeof b.toString !== "function" || isNaN(b) ? object : interpolateNumber)(a, b);
  }

  function interpolateRound (a, b) {
    return a = +a, b = +b, function (t) {
      return Math.round(a * (1 - t) + b * t);
    };
  }

  function constants(x) {
    return function () {
      return x;
    };
  }

  function number$1(x) {
    return +x;
  }

  var unit = [0, 1];
  function identity$1(x) {
    return x;
  }

  function normalize(a, b) {
    return (b -= a = +a) ? function (x) {
      return (x - a) / b;
    } : constants(isNaN(b) ? NaN : 0.5);
  }

  function clamper(a, b) {
    var t;
    if (a > b) t = a, a = b, b = t;
    return function (x) {
      return Math.max(a, Math.min(b, x));
    };
  } // normalize(a, b)(x) takes a domain value x in [a,b] and returns the corresponding parameter t in [0,1].
  // interpolate(a, b)(t) takes a parameter t in [0,1] and returns the corresponding range value x in [a,b].


  function bimap(domain, range, interpolate) {
    var d0 = domain[0],
        d1 = domain[1],
        r0 = range[0],
        r1 = range[1];
    if (d1 < d0) d0 = normalize(d1, d0), r0 = interpolate(r1, r0);else d0 = normalize(d0, d1), r0 = interpolate(r0, r1);
    return function (x) {
      return r0(d0(x));
    };
  }

  function polymap(domain, range, interpolate) {
    var j = Math.min(domain.length, range.length) - 1,
        d = new Array(j),
        r = new Array(j),
        i = -1; // Reverse descending domains.

    if (domain[j] < domain[0]) {
      domain = domain.slice().reverse();
      range = range.slice().reverse();
    }

    while (++i < j) {
      d[i] = normalize(domain[i], domain[i + 1]);
      r[i] = interpolate(range[i], range[i + 1]);
    }

    return function (x) {
      var i = bisectRight(domain, x, 1, j) - 1;
      return r[i](d[i](x));
    };
  }

  function copy(source, target) {
    return target.domain(source.domain()).range(source.range()).interpolate(source.interpolate()).clamp(source.clamp()).unknown(source.unknown());
  }
  function transformer() {
    var domain = unit,
        range = unit,
        interpolate$1 = interpolate,
        transform,
        untransform,
        unknown,
        clamp = identity$1,
        piecewise,
        output,
        input;

    function rescale() {
      var n = Math.min(domain.length, range.length);
      if (clamp !== identity$1) clamp = clamper(domain[0], domain[n - 1]);
      piecewise = n > 2 ? polymap : bimap;
      output = input = null;
      return scale;
    }

    function scale(x) {
      return x == null || isNaN(x = +x) ? unknown : (output || (output = piecewise(domain.map(transform), range, interpolate$1)))(transform(clamp(x)));
    }

    scale.invert = function (y) {
      return clamp(untransform((input || (input = piecewise(range, domain.map(transform), interpolateNumber)))(y)));
    };

    scale.domain = function (_) {
      return arguments.length ? (domain = Array.from(_, number$1), rescale()) : domain.slice();
    };

    scale.range = function (_) {
      return arguments.length ? (range = Array.from(_), rescale()) : range.slice();
    };

    scale.rangeRound = function (_) {
      return range = Array.from(_), interpolate$1 = interpolateRound, rescale();
    };

    scale.clamp = function (_) {
      return arguments.length ? (clamp = _ ? true : identity$1, rescale()) : clamp !== identity$1;
    };

    scale.interpolate = function (_) {
      return arguments.length ? (interpolate$1 = _, rescale()) : interpolate$1;
    };

    scale.unknown = function (_) {
      return arguments.length ? (unknown = _, scale) : unknown;
    };

    return function (t, u) {
      transform = t, untransform = u;
      return rescale();
    };
  }
  function continuous() {
    return transformer()(identity$1, identity$1);
  }

  function formatDecimal (x) {
    return Math.abs(x = Math.round(x)) >= 1e21 ? x.toLocaleString("en").replace(/,/g, "") : x.toString(10);
  } // Computes the decimal coefficient and exponent of the specified number x with
  // significant digits p, where x is positive and p is in [1, 21] or undefined.
  // For example, formatDecimalParts(1.23) returns ["123", 0].

  function formatDecimalParts(x, p) {
    if ((i = (x = p ? x.toExponential(p - 1) : x.toExponential()).indexOf("e")) < 0) return null; // NaN, ±Infinity

    var i,
        coefficient = x.slice(0, i); // The string returned by toExponential either has the form \d\.\d+e[-+]\d+
    // (e.g., 1.2e+3) or the form \de[-+]\d+ (e.g., 1e+3).

    return [coefficient.length > 1 ? coefficient[0] + coefficient.slice(2) : coefficient, +x.slice(i + 1)];
  }

  function exponent (x) {
    return x = formatDecimalParts(Math.abs(x)), x ? x[1] : NaN;
  }

  function formatGroup (grouping, thousands) {
    return function (value, width) {
      var i = value.length,
          t = [],
          j = 0,
          g = grouping[0],
          length = 0;

      while (i > 0 && g > 0) {
        if (length + g + 1 > width) g = Math.max(1, width - length);
        t.push(value.substring(i -= g, i + g));
        if ((length += g + 1) > width) break;
        g = grouping[j = (j + 1) % grouping.length];
      }

      return t.reverse().join(thousands);
    };
  }

  function formatNumerals (numerals) {
    return function (value) {
      return value.replace(/[0-9]/g, function (i) {
        return numerals[+i];
      });
    };
  }

  // [[fill]align][sign][symbol][0][width][,][.precision][~][type]
  var re = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
  function formatSpecifier(specifier) {
    if (!(match = re.exec(specifier))) throw new Error("invalid format: " + specifier);
    var match;
    return new FormatSpecifier({
      fill: match[1],
      align: match[2],
      sign: match[3],
      symbol: match[4],
      zero: match[5],
      width: match[6],
      comma: match[7],
      precision: match[8] && match[8].slice(1),
      trim: match[9],
      type: match[10]
    });
  }
  formatSpecifier.prototype = FormatSpecifier.prototype; // instanceof

  function FormatSpecifier(specifier) {
    this.fill = specifier.fill === undefined ? " " : specifier.fill + "";
    this.align = specifier.align === undefined ? ">" : specifier.align + "";
    this.sign = specifier.sign === undefined ? "-" : specifier.sign + "";
    this.symbol = specifier.symbol === undefined ? "" : specifier.symbol + "";
    this.zero = !!specifier.zero;
    this.width = specifier.width === undefined ? undefined : +specifier.width;
    this.comma = !!specifier.comma;
    this.precision = specifier.precision === undefined ? undefined : +specifier.precision;
    this.trim = !!specifier.trim;
    this.type = specifier.type === undefined ? "" : specifier.type + "";
  }

  FormatSpecifier.prototype.toString = function () {
    return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === undefined ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === undefined ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
  };

  // Trims insignificant zeros, e.g., replaces 1.2000k with 1.2k.
  function formatTrim (s) {
    out: for (var n = s.length, i = 1, i0 = -1, i1; i < n; ++i) {
      switch (s[i]) {
        case ".":
          i0 = i1 = i;
          break;

        case "0":
          if (i0 === 0) i0 = i;
          i1 = i;
          break;

        default:
          if (!+s[i]) break out;
          if (i0 > 0) i0 = 0;
          break;
      }
    }

    return i0 > 0 ? s.slice(0, i0) + s.slice(i1 + 1) : s;
  }

  var prefixExponent;
  function formatPrefixAuto (x, p) {
    var d = formatDecimalParts(x, p);
    if (!d) return x + "";
    var coefficient = d[0],
        exponent = d[1],
        i = exponent - (prefixExponent = Math.max(-8, Math.min(8, Math.floor(exponent / 3))) * 3) + 1,
        n = coefficient.length;
    return i === n ? coefficient : i > n ? coefficient + new Array(i - n + 1).join("0") : i > 0 ? coefficient.slice(0, i) + "." + coefficient.slice(i) : "0." + new Array(1 - i).join("0") + formatDecimalParts(x, Math.max(0, p + i - 1))[0]; // less than 1y!
  }

  function formatRounded (x, p) {
    var d = formatDecimalParts(x, p);
    if (!d) return x + "";
    var coefficient = d[0],
        exponent = d[1];
    return exponent < 0 ? "0." + new Array(-exponent).join("0") + coefficient : coefficient.length > exponent + 1 ? coefficient.slice(0, exponent + 1) + "." + coefficient.slice(exponent + 1) : coefficient + new Array(exponent - coefficient.length + 2).join("0");
  }

  var formatTypes = {
    "%": (x, p) => (x * 100).toFixed(p),
    "b": x => Math.round(x).toString(2),
    "c": x => x + "",
    "d": formatDecimal,
    "e": (x, p) => x.toExponential(p),
    "f": (x, p) => x.toFixed(p),
    "g": (x, p) => x.toPrecision(p),
    "o": x => Math.round(x).toString(8),
    "p": (x, p) => formatRounded(x * 100, p),
    "r": formatRounded,
    "s": formatPrefixAuto,
    "X": x => Math.round(x).toString(16).toUpperCase(),
    "x": x => Math.round(x).toString(16)
  };

  function identity (x) {
    return x;
  }

  var map = Array.prototype.map,
      prefixes = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
  function formatLocale$1 (locale) {
    var group = locale.grouping === undefined || locale.thousands === undefined ? identity : formatGroup(map.call(locale.grouping, Number), locale.thousands + ""),
        currencyPrefix = locale.currency === undefined ? "" : locale.currency[0] + "",
        currencySuffix = locale.currency === undefined ? "" : locale.currency[1] + "",
        decimal = locale.decimal === undefined ? "." : locale.decimal + "",
        numerals = locale.numerals === undefined ? identity : formatNumerals(map.call(locale.numerals, String)),
        percent = locale.percent === undefined ? "%" : locale.percent + "",
        minus = locale.minus === undefined ? "−" : locale.minus + "",
        nan = locale.nan === undefined ? "NaN" : locale.nan + "";

    function newFormat(specifier) {
      specifier = formatSpecifier(specifier);
      var fill = specifier.fill,
          align = specifier.align,
          sign = specifier.sign,
          symbol = specifier.symbol,
          zero = specifier.zero,
          width = specifier.width,
          comma = specifier.comma,
          precision = specifier.precision,
          trim = specifier.trim,
          type = specifier.type; // The "n" type is an alias for ",g".

      if (type === "n") comma = true, type = "g"; // The "" type, and any invalid type, is an alias for ".12~g".
      else if (!formatTypes[type]) precision === undefined && (precision = 12), trim = true, type = "g"; // If zero fill is specified, padding goes after sign and before digits.

      if (zero || fill === "0" && align === "=") zero = true, fill = "0", align = "="; // Compute the prefix and suffix.
      // For SI-prefix, the suffix is lazily computed.

      var prefix = symbol === "$" ? currencyPrefix : symbol === "#" && /[boxX]/.test(type) ? "0" + type.toLowerCase() : "",
          suffix = symbol === "$" ? currencySuffix : /[%p]/.test(type) ? percent : ""; // What format function should we use?
      // Is this an integer type?
      // Can this type generate exponential notation?

      var formatType = formatTypes[type],
          maybeSuffix = /[defgprs%]/.test(type); // Set the default precision if not specified,
      // or clamp the specified precision to the supported range.
      // For significant precision, it must be in [1, 21].
      // For fixed precision, it must be in [0, 20].

      precision = precision === undefined ? 6 : /[gprs]/.test(type) ? Math.max(1, Math.min(21, precision)) : Math.max(0, Math.min(20, precision));

      function format(value) {
        var valuePrefix = prefix,
            valueSuffix = suffix,
            i,
            n,
            c;

        if (type === "c") {
          valueSuffix = formatType(value) + valueSuffix;
          value = "";
        } else {
          value = +value; // Determine the sign. -0 is not less than 0, but 1 / -0 is!

          var valueNegative = value < 0 || 1 / value < 0; // Perform the initial formatting.

          value = isNaN(value) ? nan : formatType(Math.abs(value), precision); // Trim insignificant zeros.

          if (trim) value = formatTrim(value); // If a negative value rounds to zero after formatting, and no explicit positive sign is requested, hide the sign.

          if (valueNegative && +value === 0 && sign !== "+") valueNegative = false; // Compute the prefix and suffix.

          valuePrefix = (valueNegative ? sign === "(" ? sign : minus : sign === "-" || sign === "(" ? "" : sign) + valuePrefix;
          valueSuffix = (type === "s" ? prefixes[8 + prefixExponent / 3] : "") + valueSuffix + (valueNegative && sign === "(" ? ")" : ""); // Break the formatted value into the integer “value” part that can be
          // grouped, and fractional or exponential “suffix” part that is not.

          if (maybeSuffix) {
            i = -1, n = value.length;

            while (++i < n) {
              if (c = value.charCodeAt(i), 48 > c || c > 57) {
                valueSuffix = (c === 46 ? decimal + value.slice(i + 1) : value.slice(i)) + valueSuffix;
                value = value.slice(0, i);
                break;
              }
            }
          }
        } // If the fill character is not "0", grouping is applied before padding.


        if (comma && !zero) value = group(value, Infinity); // Compute the padding.

        var length = valuePrefix.length + value.length + valueSuffix.length,
            padding = length < width ? new Array(width - length + 1).join(fill) : ""; // If the fill character is "0", grouping is applied after padding.

        if (comma && zero) value = group(padding + value, padding.length ? width - valueSuffix.length : Infinity), padding = ""; // Reconstruct the final output based on the desired alignment.

        switch (align) {
          case "<":
            value = valuePrefix + value + valueSuffix + padding;
            break;

          case "=":
            value = valuePrefix + padding + value + valueSuffix;
            break;

          case "^":
            value = padding.slice(0, length = padding.length >> 1) + valuePrefix + value + valueSuffix + padding.slice(length);
            break;

          default:
            value = padding + valuePrefix + value + valueSuffix;
            break;
        }

        return numerals(value);
      }

      format.toString = function () {
        return specifier + "";
      };

      return format;
    }

    function formatPrefix(specifier, value) {
      var f = newFormat((specifier = formatSpecifier(specifier), specifier.type = "f", specifier)),
          e = Math.max(-8, Math.min(8, Math.floor(exponent(value) / 3))) * 3,
          k = Math.pow(10, -e),
          prefix = prefixes[8 + e / 3];
      return function (value) {
        return f(k * value) + prefix;
      };
    }

    return {
      format: newFormat,
      formatPrefix: formatPrefix
    };
  }

  var locale$1;
  var format;
  var formatPrefix;
  defaultLocale$1({
    thousands: ",",
    grouping: [3],
    currency: ["$", ""]
  });
  function defaultLocale$1(definition) {
    locale$1 = formatLocale$1(definition);
    format = locale$1.format;
    formatPrefix = locale$1.formatPrefix;
    return locale$1;
  }

  function precisionFixed (step) {
    return Math.max(0, -exponent(Math.abs(step)));
  }

  function precisionPrefix (step, value) {
    return Math.max(0, Math.max(-8, Math.min(8, Math.floor(exponent(value) / 3))) * 3 - exponent(Math.abs(step)));
  }

  function precisionRound (step, max) {
    step = Math.abs(step), max = Math.abs(max) - step;
    return Math.max(0, exponent(max) - exponent(step)) + 1;
  }

  function tickFormat(start, stop, count, specifier) {
    var step = tickStep(start, stop, count),
        precision;
    specifier = formatSpecifier(specifier == null ? ",f" : specifier);

    switch (specifier.type) {
      case "s":
        {
          var value = Math.max(Math.abs(start), Math.abs(stop));
          if (specifier.precision == null && !isNaN(precision = precisionPrefix(step, value))) specifier.precision = precision;
          return formatPrefix(specifier, value);
        }

      case "":
      case "e":
      case "g":
      case "p":
      case "r":
        {
          if (specifier.precision == null && !isNaN(precision = precisionRound(step, Math.max(Math.abs(start), Math.abs(stop))))) specifier.precision = precision - (specifier.type === "e");
          break;
        }

      case "f":
      case "%":
        {
          if (specifier.precision == null && !isNaN(precision = precisionFixed(step))) specifier.precision = precision - (specifier.type === "%") * 2;
          break;
        }
    }

    return format(specifier);
  }

  function linearish(scale) {
    var domain = scale.domain;

    scale.ticks = function (count) {
      var d = domain();
      return ticks(d[0], d[d.length - 1], count == null ? 10 : count);
    };

    scale.tickFormat = function (count, specifier) {
      var d = domain();
      return tickFormat(d[0], d[d.length - 1], count == null ? 10 : count, specifier);
    };

    scale.nice = function (count) {
      if (count == null) count = 10;
      var d = domain();
      var i0 = 0;
      var i1 = d.length - 1;
      var start = d[i0];
      var stop = d[i1];
      var prestep;
      var step;
      var maxIter = 10;

      if (stop < start) {
        step = start, start = stop, stop = step;
        step = i0, i0 = i1, i1 = step;
      }

      while (maxIter-- > 0) {
        step = tickIncrement(start, stop, count);

        if (step === prestep) {
          d[i0] = start;
          d[i1] = stop;
          return domain(d);
        } else if (step > 0) {
          start = Math.floor(start / step) * step;
          stop = Math.ceil(stop / step) * step;
        } else if (step < 0) {
          start = Math.ceil(start * step) / step;
          stop = Math.floor(stop * step) / step;
        } else {
          break;
        }

        prestep = step;
      }

      return scale;
    };

    return scale;
  }
  function linear() {
    var scale = continuous();

    scale.copy = function () {
      return copy(scale, linear());
    };

    initRange.apply(scale, arguments);
    return linearish(scale);
  }

  function nice(domain, interval) {
    domain = domain.slice();
    var i0 = 0,
        i1 = domain.length - 1,
        x0 = domain[i0],
        x1 = domain[i1],
        t;

    if (x1 < x0) {
      t = i0, i0 = i1, i1 = t;
      t = x0, x0 = x1, x1 = t;
    }

    domain[i0] = interval.floor(x0);
    domain[i1] = interval.ceil(x1);
    return domain;
  }

  function transformLog(x) {
    return Math.log(x);
  }

  function transformExp(x) {
    return Math.exp(x);
  }

  function transformLogn(x) {
    return -Math.log(-x);
  }

  function transformExpn(x) {
    return -Math.exp(-x);
  }

  function pow10(x) {
    return isFinite(x) ? +("1e" + x) : x < 0 ? 0 : x;
  }

  function powp(base) {
    return base === 10 ? pow10 : base === Math.E ? Math.exp : function (x) {
      return Math.pow(base, x);
    };
  }

  function logp(base) {
    return base === Math.E ? Math.log : base === 10 && Math.log10 || base === 2 && Math.log2 || (base = Math.log(base), function (x) {
      return Math.log(x) / base;
    });
  }

  function reflect(f) {
    return function (x) {
      return -f(-x);
    };
  }

  function loggish(transform) {
    var scale = transform(transformLog, transformExp),
        domain = scale.domain,
        base = 10,
        logs,
        pows;

    function rescale() {
      logs = logp(base), pows = powp(base);

      if (domain()[0] < 0) {
        logs = reflect(logs), pows = reflect(pows);
        transform(transformLogn, transformExpn);
      } else {
        transform(transformLog, transformExp);
      }

      return scale;
    }

    scale.base = function (_) {
      return arguments.length ? (base = +_, rescale()) : base;
    };

    scale.domain = function (_) {
      return arguments.length ? (domain(_), rescale()) : domain();
    };

    scale.ticks = function (count) {
      var d = domain(),
          u = d[0],
          v = d[d.length - 1],
          r;
      if (r = v < u) i = u, u = v, v = i;
      var i = logs(u),
          j = logs(v),
          p,
          k,
          t,
          n = count == null ? 10 : +count,
          z = [];

      if (!(base % 1) && j - i < n) {
        i = Math.floor(i), j = Math.ceil(j);
        if (u > 0) for (; i <= j; ++i) {
          for (k = 1, p = pows(i); k < base; ++k) {
            t = p * k;
            if (t < u) continue;
            if (t > v) break;
            z.push(t);
          }
        } else for (; i <= j; ++i) {
          for (k = base - 1, p = pows(i); k >= 1; --k) {
            t = p * k;
            if (t < u) continue;
            if (t > v) break;
            z.push(t);
          }
        }
        if (z.length * 2 < n) z = ticks(u, v, n);
      } else {
        z = ticks(i, j, Math.min(j - i, n)).map(pows);
      }

      return r ? z.reverse() : z;
    };

    scale.tickFormat = function (count, specifier) {
      if (specifier == null) specifier = base === 10 ? ".0e" : ",";
      if (typeof specifier !== "function") specifier = format(specifier);
      if (count === Infinity) return specifier;
      if (count == null) count = 10;
      var k = Math.max(1, base * count / scale.ticks().length); // TODO fast estimate?

      return function (d) {
        var i = d / pows(Math.round(logs(d)));
        if (i * base < base - 0.5) i *= base;
        return i <= k ? specifier(d) : "";
      };
    };

    scale.nice = function () {
      return domain(nice(domain(), {
        floor: function (x) {
          return pows(Math.floor(logs(x)));
        },
        ceil: function (x) {
          return pows(Math.ceil(logs(x)));
        }
      }));
    };

    return scale;
  }
  function log() {
    var scale = loggish(transformer()).domain([1, 10]);

    scale.copy = function () {
      return copy(scale, log()).base(scale.base());
    };

    initRange.apply(scale, arguments);
    return scale;
  }

  var t0 = new Date(),
      t1 = new Date();
  function newInterval(floori, offseti, count, field) {
    function interval(date) {
      return floori(date = arguments.length === 0 ? new Date() : new Date(+date)), date;
    }

    interval.floor = function (date) {
      return floori(date = new Date(+date)), date;
    };

    interval.ceil = function (date) {
      return floori(date = new Date(date - 1)), offseti(date, 1), floori(date), date;
    };

    interval.round = function (date) {
      var d0 = interval(date),
          d1 = interval.ceil(date);
      return date - d0 < d1 - date ? d0 : d1;
    };

    interval.offset = function (date, step) {
      return offseti(date = new Date(+date), step == null ? 1 : Math.floor(step)), date;
    };

    interval.range = function (start, stop, step) {
      var range = [],
          previous;
      start = interval.ceil(start);
      step = step == null ? 1 : Math.floor(step);
      if (!(start < stop) || !(step > 0)) return range; // also handles Invalid Date

      do range.push(previous = new Date(+start)), offseti(start, step), floori(start); while (previous < start && start < stop);

      return range;
    };

    interval.filter = function (test) {
      return newInterval(function (date) {
        if (date >= date) while (floori(date), !test(date)) date.setTime(date - 1);
      }, function (date, step) {
        if (date >= date) {
          if (step < 0) while (++step <= 0) {
            while (offseti(date, -1), !test(date)) {} // eslint-disable-line no-empty

          } else while (--step >= 0) {
            while (offseti(date, +1), !test(date)) {} // eslint-disable-line no-empty

          }
        }
      });
    };

    if (count) {
      interval.count = function (start, end) {
        t0.setTime(+start), t1.setTime(+end);
        floori(t0), floori(t1);
        return Math.floor(count(t0, t1));
      };

      interval.every = function (step) {
        step = Math.floor(step);
        return !isFinite(step) || !(step > 0) ? null : !(step > 1) ? interval : interval.filter(field ? function (d) {
          return field(d) % step === 0;
        } : function (d) {
          return interval.count(0, d) % step === 0;
        });
      };
    }

    return interval;
  }

  var millisecond = newInterval(function () {// noop
  }, function (date, step) {
    date.setTime(+date + step);
  }, function (start, end) {
    return end - start;
  }); // An optimized implementation for this simple case.

  millisecond.every = function (k) {
    k = Math.floor(k);
    if (!isFinite(k) || !(k > 0)) return null;
    if (!(k > 1)) return millisecond;
    return newInterval(function (date) {
      date.setTime(Math.floor(date / k) * k);
    }, function (date, step) {
      date.setTime(+date + step * k);
    }, function (start, end) {
      return (end - start) / k;
    });
  };

  const durationSecond = 1000;
  const durationMinute = durationSecond * 60;
  const durationHour = durationMinute * 60;
  const durationDay = durationHour * 24;
  const durationWeek = durationDay * 7;
  const durationMonth = durationDay * 30;
  const durationYear = durationDay * 365;

  var second = newInterval(function (date) {
    date.setTime(date - date.getMilliseconds());
  }, function (date, step) {
    date.setTime(+date + step * durationSecond);
  }, function (start, end) {
    return (end - start) / durationSecond;
  }, function (date) {
    return date.getUTCSeconds();
  });

  var minute = newInterval(function (date) {
    date.setTime(date - date.getMilliseconds() - date.getSeconds() * durationSecond);
  }, function (date, step) {
    date.setTime(+date + step * durationMinute);
  }, function (start, end) {
    return (end - start) / durationMinute;
  }, function (date) {
    return date.getMinutes();
  });

  var hour = newInterval(function (date) {
    date.setTime(date - date.getMilliseconds() - date.getSeconds() * durationSecond - date.getMinutes() * durationMinute);
  }, function (date, step) {
    date.setTime(+date + step * durationHour);
  }, function (start, end) {
    return (end - start) / durationHour;
  }, function (date) {
    return date.getHours();
  });

  var day = newInterval(date => date.setHours(0, 0, 0, 0), (date, step) => date.setDate(date.getDate() + step), (start, end) => (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * durationMinute) / durationDay, date => date.getDate() - 1);

  function weekday(i) {
    return newInterval(function (date) {
      date.setDate(date.getDate() - (date.getDay() + 7 - i) % 7);
      date.setHours(0, 0, 0, 0);
    }, function (date, step) {
      date.setDate(date.getDate() + step * 7);
    }, function (start, end) {
      return (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * durationMinute) / durationWeek;
    });
  }

  var sunday = weekday(0);
  var monday = weekday(1);
  weekday(2);
  weekday(3);
  var thursday = weekday(4);
  weekday(5);
  weekday(6);

  var month = newInterval(function (date) {
    date.setDate(1);
    date.setHours(0, 0, 0, 0);
  }, function (date, step) {
    date.setMonth(date.getMonth() + step);
  }, function (start, end) {
    return end.getMonth() - start.getMonth() + (end.getFullYear() - start.getFullYear()) * 12;
  }, function (date) {
    return date.getMonth();
  });

  var year = newInterval(function (date) {
    date.setMonth(0, 1);
    date.setHours(0, 0, 0, 0);
  }, function (date, step) {
    date.setFullYear(date.getFullYear() + step);
  }, function (start, end) {
    return end.getFullYear() - start.getFullYear();
  }, function (date) {
    return date.getFullYear();
  }); // An optimized implementation for this simple case.

  year.every = function (k) {
    return !isFinite(k = Math.floor(k)) || !(k > 0) ? null : newInterval(function (date) {
      date.setFullYear(Math.floor(date.getFullYear() / k) * k);
      date.setMonth(0, 1);
      date.setHours(0, 0, 0, 0);
    }, function (date, step) {
      date.setFullYear(date.getFullYear() + step * k);
    });
  };

  var utcMinute = newInterval(function (date) {
    date.setUTCSeconds(0, 0);
  }, function (date, step) {
    date.setTime(+date + step * durationMinute);
  }, function (start, end) {
    return (end - start) / durationMinute;
  }, function (date) {
    return date.getUTCMinutes();
  });

  var utcHour = newInterval(function (date) {
    date.setUTCMinutes(0, 0, 0);
  }, function (date, step) {
    date.setTime(+date + step * durationHour);
  }, function (start, end) {
    return (end - start) / durationHour;
  }, function (date) {
    return date.getUTCHours();
  });

  var utcDay = newInterval(function (date) {
    date.setUTCHours(0, 0, 0, 0);
  }, function (date, step) {
    date.setUTCDate(date.getUTCDate() + step);
  }, function (start, end) {
    return (end - start) / durationDay;
  }, function (date) {
    return date.getUTCDate() - 1;
  });

  function utcWeekday(i) {
    return newInterval(function (date) {
      date.setUTCDate(date.getUTCDate() - (date.getUTCDay() + 7 - i) % 7);
      date.setUTCHours(0, 0, 0, 0);
    }, function (date, step) {
      date.setUTCDate(date.getUTCDate() + step * 7);
    }, function (start, end) {
      return (end - start) / durationWeek;
    });
  }

  var utcSunday = utcWeekday(0);
  var utcMonday = utcWeekday(1);
  utcWeekday(2);
  utcWeekday(3);
  var utcThursday = utcWeekday(4);
  utcWeekday(5);
  utcWeekday(6);

  var utcMonth = newInterval(function (date) {
    date.setUTCDate(1);
    date.setUTCHours(0, 0, 0, 0);
  }, function (date, step) {
    date.setUTCMonth(date.getUTCMonth() + step);
  }, function (start, end) {
    return end.getUTCMonth() - start.getUTCMonth() + (end.getUTCFullYear() - start.getUTCFullYear()) * 12;
  }, function (date) {
    return date.getUTCMonth();
  });

  var utcYear = newInterval(function (date) {
    date.setUTCMonth(0, 1);
    date.setUTCHours(0, 0, 0, 0);
  }, function (date, step) {
    date.setUTCFullYear(date.getUTCFullYear() + step);
  }, function (start, end) {
    return end.getUTCFullYear() - start.getUTCFullYear();
  }, function (date) {
    return date.getUTCFullYear();
  }); // An optimized implementation for this simple case.

  utcYear.every = function (k) {
    return !isFinite(k = Math.floor(k)) || !(k > 0) ? null : newInterval(function (date) {
      date.setUTCFullYear(Math.floor(date.getUTCFullYear() / k) * k);
      date.setUTCMonth(0, 1);
      date.setUTCHours(0, 0, 0, 0);
    }, function (date, step) {
      date.setUTCFullYear(date.getUTCFullYear() + step * k);
    });
  };

  function ticker(year, month, week, day, hour, minute) {
    const tickIntervals = [[second, 1, durationSecond], [second, 5, 5 * durationSecond], [second, 15, 15 * durationSecond], [second, 30, 30 * durationSecond], [minute, 1, durationMinute], [minute, 5, 5 * durationMinute], [minute, 15, 15 * durationMinute], [minute, 30, 30 * durationMinute], [hour, 1, durationHour], [hour, 3, 3 * durationHour], [hour, 6, 6 * durationHour], [hour, 12, 12 * durationHour], [day, 1, durationDay], [day, 2, 2 * durationDay], [week, 1, durationWeek], [month, 1, durationMonth], [month, 3, 3 * durationMonth], [year, 1, durationYear]];

    function ticks(start, stop, count) {
      const reverse = stop < start;
      if (reverse) [start, stop] = [stop, start];
      const interval = count && typeof count.range === "function" ? count : tickInterval(start, stop, count);
      const ticks = interval ? interval.range(start, +stop + 1) : []; // inclusive stop

      return reverse ? ticks.reverse() : ticks;
    }

    function tickInterval(start, stop, count) {
      const target = Math.abs(stop - start) / count;
      const i = bisector(([,, step]) => step).right(tickIntervals, target);
      if (i === tickIntervals.length) return year.every(tickStep(start / durationYear, stop / durationYear, count));
      if (i === 0) return millisecond.every(Math.max(tickStep(start, stop, count), 1));
      const [t, step] = tickIntervals[target / tickIntervals[i - 1][2] < tickIntervals[i][2] / target ? i - 1 : i];
      return t.every(step);
    }

    return [ticks, tickInterval];
  }

  const [utcTicks, utcTickInterval] = ticker(utcYear, utcMonth, utcSunday, utcDay, utcHour, utcMinute);
  const [timeTicks, timeTickInterval] = ticker(year, month, sunday, day, hour, minute);

  function localDate(d) {
    if (0 <= d.y && d.y < 100) {
      var date = new Date(-1, d.m, d.d, d.H, d.M, d.S, d.L);
      date.setFullYear(d.y);
      return date;
    }

    return new Date(d.y, d.m, d.d, d.H, d.M, d.S, d.L);
  }

  function utcDate(d) {
    if (0 <= d.y && d.y < 100) {
      var date = new Date(Date.UTC(-1, d.m, d.d, d.H, d.M, d.S, d.L));
      date.setUTCFullYear(d.y);
      return date;
    }

    return new Date(Date.UTC(d.y, d.m, d.d, d.H, d.M, d.S, d.L));
  }

  function newDate(y, m, d) {
    return {
      y: y,
      m: m,
      d: d,
      H: 0,
      M: 0,
      S: 0,
      L: 0
    };
  }

  function formatLocale(locale) {
    var locale_dateTime = locale.dateTime,
        locale_date = locale.date,
        locale_time = locale.time,
        locale_periods = locale.periods,
        locale_weekdays = locale.days,
        locale_shortWeekdays = locale.shortDays,
        locale_months = locale.months,
        locale_shortMonths = locale.shortMonths;
    var periodRe = formatRe(locale_periods),
        periodLookup = formatLookup(locale_periods),
        weekdayRe = formatRe(locale_weekdays),
        weekdayLookup = formatLookup(locale_weekdays),
        shortWeekdayRe = formatRe(locale_shortWeekdays),
        shortWeekdayLookup = formatLookup(locale_shortWeekdays),
        monthRe = formatRe(locale_months),
        monthLookup = formatLookup(locale_months),
        shortMonthRe = formatRe(locale_shortMonths),
        shortMonthLookup = formatLookup(locale_shortMonths);
    var formats = {
      "a": formatShortWeekday,
      "A": formatWeekday,
      "b": formatShortMonth,
      "B": formatMonth,
      "c": null,
      "d": formatDayOfMonth,
      "e": formatDayOfMonth,
      "f": formatMicroseconds,
      "g": formatYearISO,
      "G": formatFullYearISO,
      "H": formatHour24,
      "I": formatHour12,
      "j": formatDayOfYear,
      "L": formatMilliseconds,
      "m": formatMonthNumber,
      "M": formatMinutes,
      "p": formatPeriod,
      "q": formatQuarter,
      "Q": formatUnixTimestamp,
      "s": formatUnixTimestampSeconds,
      "S": formatSeconds,
      "u": formatWeekdayNumberMonday,
      "U": formatWeekNumberSunday,
      "V": formatWeekNumberISO,
      "w": formatWeekdayNumberSunday,
      "W": formatWeekNumberMonday,
      "x": null,
      "X": null,
      "y": formatYear,
      "Y": formatFullYear,
      "Z": formatZone,
      "%": formatLiteralPercent
    };
    var utcFormats = {
      "a": formatUTCShortWeekday,
      "A": formatUTCWeekday,
      "b": formatUTCShortMonth,
      "B": formatUTCMonth,
      "c": null,
      "d": formatUTCDayOfMonth,
      "e": formatUTCDayOfMonth,
      "f": formatUTCMicroseconds,
      "g": formatUTCYearISO,
      "G": formatUTCFullYearISO,
      "H": formatUTCHour24,
      "I": formatUTCHour12,
      "j": formatUTCDayOfYear,
      "L": formatUTCMilliseconds,
      "m": formatUTCMonthNumber,
      "M": formatUTCMinutes,
      "p": formatUTCPeriod,
      "q": formatUTCQuarter,
      "Q": formatUnixTimestamp,
      "s": formatUnixTimestampSeconds,
      "S": formatUTCSeconds,
      "u": formatUTCWeekdayNumberMonday,
      "U": formatUTCWeekNumberSunday,
      "V": formatUTCWeekNumberISO,
      "w": formatUTCWeekdayNumberSunday,
      "W": formatUTCWeekNumberMonday,
      "x": null,
      "X": null,
      "y": formatUTCYear,
      "Y": formatUTCFullYear,
      "Z": formatUTCZone,
      "%": formatLiteralPercent
    };
    var parses = {
      "a": parseShortWeekday,
      "A": parseWeekday,
      "b": parseShortMonth,
      "B": parseMonth,
      "c": parseLocaleDateTime,
      "d": parseDayOfMonth,
      "e": parseDayOfMonth,
      "f": parseMicroseconds,
      "g": parseYear,
      "G": parseFullYear,
      "H": parseHour24,
      "I": parseHour24,
      "j": parseDayOfYear,
      "L": parseMilliseconds,
      "m": parseMonthNumber,
      "M": parseMinutes,
      "p": parsePeriod,
      "q": parseQuarter,
      "Q": parseUnixTimestamp,
      "s": parseUnixTimestampSeconds,
      "S": parseSeconds,
      "u": parseWeekdayNumberMonday,
      "U": parseWeekNumberSunday,
      "V": parseWeekNumberISO,
      "w": parseWeekdayNumberSunday,
      "W": parseWeekNumberMonday,
      "x": parseLocaleDate,
      "X": parseLocaleTime,
      "y": parseYear,
      "Y": parseFullYear,
      "Z": parseZone,
      "%": parseLiteralPercent
    }; // These recursive directive definitions must be deferred.

    formats.x = newFormat(locale_date, formats);
    formats.X = newFormat(locale_time, formats);
    formats.c = newFormat(locale_dateTime, formats);
    utcFormats.x = newFormat(locale_date, utcFormats);
    utcFormats.X = newFormat(locale_time, utcFormats);
    utcFormats.c = newFormat(locale_dateTime, utcFormats);

    function newFormat(specifier, formats) {
      return function (date) {
        var string = [],
            i = -1,
            j = 0,
            n = specifier.length,
            c,
            pad,
            format;
        if (!(date instanceof Date)) date = new Date(+date);

        while (++i < n) {
          if (specifier.charCodeAt(i) === 37) {
            string.push(specifier.slice(j, i));
            if ((pad = pads[c = specifier.charAt(++i)]) != null) c = specifier.charAt(++i);else pad = c === "e" ? " " : "0";
            if (format = formats[c]) c = format(date, pad);
            string.push(c);
            j = i + 1;
          }
        }

        string.push(specifier.slice(j, i));
        return string.join("");
      };
    }

    function newParse(specifier, Z) {
      return function (string) {
        var d = newDate(1900, undefined, 1),
            i = parseSpecifier(d, specifier, string += "", 0),
            week,
            day$1;
        if (i != string.length) return null; // If a UNIX timestamp is specified, return it.

        if ("Q" in d) return new Date(d.Q);
        if ("s" in d) return new Date(d.s * 1000 + ("L" in d ? d.L : 0)); // If this is utcParse, never use the local timezone.

        if (Z && !("Z" in d)) d.Z = 0; // The am-pm flag is 0 for AM, and 1 for PM.

        if ("p" in d) d.H = d.H % 12 + d.p * 12; // If the month was not specified, inherit from the quarter.

        if (d.m === undefined) d.m = "q" in d ? d.q : 0; // Convert day-of-week and week-of-year to day-of-year.

        if ("V" in d) {
          if (d.V < 1 || d.V > 53) return null;
          if (!("w" in d)) d.w = 1;

          if ("Z" in d) {
            week = utcDate(newDate(d.y, 0, 1)), day$1 = week.getUTCDay();
            week = day$1 > 4 || day$1 === 0 ? utcMonday.ceil(week) : utcMonday(week);
            week = utcDay.offset(week, (d.V - 1) * 7);
            d.y = week.getUTCFullYear();
            d.m = week.getUTCMonth();
            d.d = week.getUTCDate() + (d.w + 6) % 7;
          } else {
            week = localDate(newDate(d.y, 0, 1)), day$1 = week.getDay();
            week = day$1 > 4 || day$1 === 0 ? monday.ceil(week) : monday(week);
            week = day.offset(week, (d.V - 1) * 7);
            d.y = week.getFullYear();
            d.m = week.getMonth();
            d.d = week.getDate() + (d.w + 6) % 7;
          }
        } else if ("W" in d || "U" in d) {
          if (!("w" in d)) d.w = "u" in d ? d.u % 7 : "W" in d ? 1 : 0;
          day$1 = "Z" in d ? utcDate(newDate(d.y, 0, 1)).getUTCDay() : localDate(newDate(d.y, 0, 1)).getDay();
          d.m = 0;
          d.d = "W" in d ? (d.w + 6) % 7 + d.W * 7 - (day$1 + 5) % 7 : d.w + d.U * 7 - (day$1 + 6) % 7;
        } // If a time zone is specified, all fields are interpreted as UTC and then
        // offset according to the specified time zone.


        if ("Z" in d) {
          d.H += d.Z / 100 | 0;
          d.M += d.Z % 100;
          return utcDate(d);
        } // Otherwise, all fields are in local time.


        return localDate(d);
      };
    }

    function parseSpecifier(d, specifier, string, j) {
      var i = 0,
          n = specifier.length,
          m = string.length,
          c,
          parse;

      while (i < n) {
        if (j >= m) return -1;
        c = specifier.charCodeAt(i++);

        if (c === 37) {
          c = specifier.charAt(i++);
          parse = parses[c in pads ? specifier.charAt(i++) : c];
          if (!parse || (j = parse(d, string, j)) < 0) return -1;
        } else if (c != string.charCodeAt(j++)) {
          return -1;
        }
      }

      return j;
    }

    function parsePeriod(d, string, i) {
      var n = periodRe.exec(string.slice(i));
      return n ? (d.p = periodLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
    }

    function parseShortWeekday(d, string, i) {
      var n = shortWeekdayRe.exec(string.slice(i));
      return n ? (d.w = shortWeekdayLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
    }

    function parseWeekday(d, string, i) {
      var n = weekdayRe.exec(string.slice(i));
      return n ? (d.w = weekdayLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
    }

    function parseShortMonth(d, string, i) {
      var n = shortMonthRe.exec(string.slice(i));
      return n ? (d.m = shortMonthLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
    }

    function parseMonth(d, string, i) {
      var n = monthRe.exec(string.slice(i));
      return n ? (d.m = monthLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
    }

    function parseLocaleDateTime(d, string, i) {
      return parseSpecifier(d, locale_dateTime, string, i);
    }

    function parseLocaleDate(d, string, i) {
      return parseSpecifier(d, locale_date, string, i);
    }

    function parseLocaleTime(d, string, i) {
      return parseSpecifier(d, locale_time, string, i);
    }

    function formatShortWeekday(d) {
      return locale_shortWeekdays[d.getDay()];
    }

    function formatWeekday(d) {
      return locale_weekdays[d.getDay()];
    }

    function formatShortMonth(d) {
      return locale_shortMonths[d.getMonth()];
    }

    function formatMonth(d) {
      return locale_months[d.getMonth()];
    }

    function formatPeriod(d) {
      return locale_periods[+(d.getHours() >= 12)];
    }

    function formatQuarter(d) {
      return 1 + ~~(d.getMonth() / 3);
    }

    function formatUTCShortWeekday(d) {
      return locale_shortWeekdays[d.getUTCDay()];
    }

    function formatUTCWeekday(d) {
      return locale_weekdays[d.getUTCDay()];
    }

    function formatUTCShortMonth(d) {
      return locale_shortMonths[d.getUTCMonth()];
    }

    function formatUTCMonth(d) {
      return locale_months[d.getUTCMonth()];
    }

    function formatUTCPeriod(d) {
      return locale_periods[+(d.getUTCHours() >= 12)];
    }

    function formatUTCQuarter(d) {
      return 1 + ~~(d.getUTCMonth() / 3);
    }

    return {
      format: function (specifier) {
        var f = newFormat(specifier += "", formats);

        f.toString = function () {
          return specifier;
        };

        return f;
      },
      parse: function (specifier) {
        var p = newParse(specifier += "", false);

        p.toString = function () {
          return specifier;
        };

        return p;
      },
      utcFormat: function (specifier) {
        var f = newFormat(specifier += "", utcFormats);

        f.toString = function () {
          return specifier;
        };

        return f;
      },
      utcParse: function (specifier) {
        var p = newParse(specifier += "", true);

        p.toString = function () {
          return specifier;
        };

        return p;
      }
    };
  }
  var pads = {
    "-": "",
    "_": " ",
    "0": "0"
  },
      numberRe = /^\s*\d+/,
      // note: ignores next directive
  percentRe = /^%/,
      requoteRe = /[\\^$*+?|[\]().{}]/g;

  function pad(value, fill, width) {
    var sign = value < 0 ? "-" : "",
        string = (sign ? -value : value) + "",
        length = string.length;
    return sign + (length < width ? new Array(width - length + 1).join(fill) + string : string);
  }

  function requote(s) {
    return s.replace(requoteRe, "\\$&");
  }

  function formatRe(names) {
    return new RegExp("^(?:" + names.map(requote).join("|") + ")", "i");
  }

  function formatLookup(names) {
    return new Map(names.map((name, i) => [name.toLowerCase(), i]));
  }

  function parseWeekdayNumberSunday(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 1));
    return n ? (d.w = +n[0], i + n[0].length) : -1;
  }

  function parseWeekdayNumberMonday(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 1));
    return n ? (d.u = +n[0], i + n[0].length) : -1;
  }

  function parseWeekNumberSunday(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? (d.U = +n[0], i + n[0].length) : -1;
  }

  function parseWeekNumberISO(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? (d.V = +n[0], i + n[0].length) : -1;
  }

  function parseWeekNumberMonday(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? (d.W = +n[0], i + n[0].length) : -1;
  }

  function parseFullYear(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 4));
    return n ? (d.y = +n[0], i + n[0].length) : -1;
  }

  function parseYear(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? (d.y = +n[0] + (+n[0] > 68 ? 1900 : 2000), i + n[0].length) : -1;
  }

  function parseZone(d, string, i) {
    var n = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(string.slice(i, i + 6));
    return n ? (d.Z = n[1] ? 0 : -(n[2] + (n[3] || "00")), i + n[0].length) : -1;
  }

  function parseQuarter(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 1));
    return n ? (d.q = n[0] * 3 - 3, i + n[0].length) : -1;
  }

  function parseMonthNumber(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? (d.m = n[0] - 1, i + n[0].length) : -1;
  }

  function parseDayOfMonth(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? (d.d = +n[0], i + n[0].length) : -1;
  }

  function parseDayOfYear(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 3));
    return n ? (d.m = 0, d.d = +n[0], i + n[0].length) : -1;
  }

  function parseHour24(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? (d.H = +n[0], i + n[0].length) : -1;
  }

  function parseMinutes(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? (d.M = +n[0], i + n[0].length) : -1;
  }

  function parseSeconds(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? (d.S = +n[0], i + n[0].length) : -1;
  }

  function parseMilliseconds(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 3));
    return n ? (d.L = +n[0], i + n[0].length) : -1;
  }

  function parseMicroseconds(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 6));
    return n ? (d.L = Math.floor(n[0] / 1000), i + n[0].length) : -1;
  }

  function parseLiteralPercent(d, string, i) {
    var n = percentRe.exec(string.slice(i, i + 1));
    return n ? i + n[0].length : -1;
  }

  function parseUnixTimestamp(d, string, i) {
    var n = numberRe.exec(string.slice(i));
    return n ? (d.Q = +n[0], i + n[0].length) : -1;
  }

  function parseUnixTimestampSeconds(d, string, i) {
    var n = numberRe.exec(string.slice(i));
    return n ? (d.s = +n[0], i + n[0].length) : -1;
  }

  function formatDayOfMonth(d, p) {
    return pad(d.getDate(), p, 2);
  }

  function formatHour24(d, p) {
    return pad(d.getHours(), p, 2);
  }

  function formatHour12(d, p) {
    return pad(d.getHours() % 12 || 12, p, 2);
  }

  function formatDayOfYear(d, p) {
    return pad(1 + day.count(year(d), d), p, 3);
  }

  function formatMilliseconds(d, p) {
    return pad(d.getMilliseconds(), p, 3);
  }

  function formatMicroseconds(d, p) {
    return formatMilliseconds(d, p) + "000";
  }

  function formatMonthNumber(d, p) {
    return pad(d.getMonth() + 1, p, 2);
  }

  function formatMinutes(d, p) {
    return pad(d.getMinutes(), p, 2);
  }

  function formatSeconds(d, p) {
    return pad(d.getSeconds(), p, 2);
  }

  function formatWeekdayNumberMonday(d) {
    var day = d.getDay();
    return day === 0 ? 7 : day;
  }

  function formatWeekNumberSunday(d, p) {
    return pad(sunday.count(year(d) - 1, d), p, 2);
  }

  function dISO(d) {
    var day = d.getDay();
    return day >= 4 || day === 0 ? thursday(d) : thursday.ceil(d);
  }

  function formatWeekNumberISO(d, p) {
    d = dISO(d);
    return pad(thursday.count(year(d), d) + (year(d).getDay() === 4), p, 2);
  }

  function formatWeekdayNumberSunday(d) {
    return d.getDay();
  }

  function formatWeekNumberMonday(d, p) {
    return pad(monday.count(year(d) - 1, d), p, 2);
  }

  function formatYear(d, p) {
    return pad(d.getFullYear() % 100, p, 2);
  }

  function formatYearISO(d, p) {
    d = dISO(d);
    return pad(d.getFullYear() % 100, p, 2);
  }

  function formatFullYear(d, p) {
    return pad(d.getFullYear() % 10000, p, 4);
  }

  function formatFullYearISO(d, p) {
    var day = d.getDay();
    d = day >= 4 || day === 0 ? thursday(d) : thursday.ceil(d);
    return pad(d.getFullYear() % 10000, p, 4);
  }

  function formatZone(d) {
    var z = d.getTimezoneOffset();
    return (z > 0 ? "-" : (z *= -1, "+")) + pad(z / 60 | 0, "0", 2) + pad(z % 60, "0", 2);
  }

  function formatUTCDayOfMonth(d, p) {
    return pad(d.getUTCDate(), p, 2);
  }

  function formatUTCHour24(d, p) {
    return pad(d.getUTCHours(), p, 2);
  }

  function formatUTCHour12(d, p) {
    return pad(d.getUTCHours() % 12 || 12, p, 2);
  }

  function formatUTCDayOfYear(d, p) {
    return pad(1 + utcDay.count(utcYear(d), d), p, 3);
  }

  function formatUTCMilliseconds(d, p) {
    return pad(d.getUTCMilliseconds(), p, 3);
  }

  function formatUTCMicroseconds(d, p) {
    return formatUTCMilliseconds(d, p) + "000";
  }

  function formatUTCMonthNumber(d, p) {
    return pad(d.getUTCMonth() + 1, p, 2);
  }

  function formatUTCMinutes(d, p) {
    return pad(d.getUTCMinutes(), p, 2);
  }

  function formatUTCSeconds(d, p) {
    return pad(d.getUTCSeconds(), p, 2);
  }

  function formatUTCWeekdayNumberMonday(d) {
    var dow = d.getUTCDay();
    return dow === 0 ? 7 : dow;
  }

  function formatUTCWeekNumberSunday(d, p) {
    return pad(utcSunday.count(utcYear(d) - 1, d), p, 2);
  }

  function UTCdISO(d) {
    var day = d.getUTCDay();
    return day >= 4 || day === 0 ? utcThursday(d) : utcThursday.ceil(d);
  }

  function formatUTCWeekNumberISO(d, p) {
    d = UTCdISO(d);
    return pad(utcThursday.count(utcYear(d), d) + (utcYear(d).getUTCDay() === 4), p, 2);
  }

  function formatUTCWeekdayNumberSunday(d) {
    return d.getUTCDay();
  }

  function formatUTCWeekNumberMonday(d, p) {
    return pad(utcMonday.count(utcYear(d) - 1, d), p, 2);
  }

  function formatUTCYear(d, p) {
    return pad(d.getUTCFullYear() % 100, p, 2);
  }

  function formatUTCYearISO(d, p) {
    d = UTCdISO(d);
    return pad(d.getUTCFullYear() % 100, p, 2);
  }

  function formatUTCFullYear(d, p) {
    return pad(d.getUTCFullYear() % 10000, p, 4);
  }

  function formatUTCFullYearISO(d, p) {
    var day = d.getUTCDay();
    d = day >= 4 || day === 0 ? utcThursday(d) : utcThursday.ceil(d);
    return pad(d.getUTCFullYear() % 10000, p, 4);
  }

  function formatUTCZone() {
    return "+0000";
  }

  function formatLiteralPercent() {
    return "%";
  }

  function formatUnixTimestamp(d) {
    return +d;
  }

  function formatUnixTimestampSeconds(d) {
    return Math.floor(+d / 1000);
  }

  var locale;
  var timeFormat;
  var utcFormat;
  defaultLocale({
    dateTime: "%x, %X",
    date: "%-m/%-d/%Y",
    time: "%-I:%M:%S %p",
    periods: ["AM", "PM"],
    days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  });
  function defaultLocale(definition) {
    locale = formatLocale(definition);
    timeFormat = locale.format;
    utcFormat = locale.utcFormat;
    return locale;
  }

  function date(t) {
    return new Date(t);
  }

  function number(t) {
    return t instanceof Date ? +t : +new Date(+t);
  }

  function calendar(ticks, tickInterval, year, month, week, day, hour, minute, second, format) {
    var scale = continuous(),
        invert = scale.invert,
        domain = scale.domain;
    var formatMillisecond = format(".%L"),
        formatSecond = format(":%S"),
        formatMinute = format("%I:%M"),
        formatHour = format("%I %p"),
        formatDay = format("%a %d"),
        formatWeek = format("%b %d"),
        formatMonth = format("%B"),
        formatYear = format("%Y");

    function tickFormat(date) {
      return (second(date) < date ? formatMillisecond : minute(date) < date ? formatSecond : hour(date) < date ? formatMinute : day(date) < date ? formatHour : month(date) < date ? week(date) < date ? formatDay : formatWeek : year(date) < date ? formatMonth : formatYear)(date);
    }

    scale.invert = function (y) {
      return new Date(invert(y));
    };

    scale.domain = function (_) {
      return arguments.length ? domain(Array.from(_, number)) : domain().map(date);
    };

    scale.ticks = function (interval) {
      var d = domain();
      return ticks(d[0], d[d.length - 1], interval == null ? 10 : interval);
    };

    scale.tickFormat = function (count, specifier) {
      return specifier == null ? tickFormat : format(specifier);
    };

    scale.nice = function (interval) {
      var d = domain();
      if (!interval || typeof interval.range !== "function") interval = tickInterval(d[0], d[d.length - 1], interval == null ? 10 : interval);
      return interval ? domain(nice(d, interval)) : scale;
    };

    scale.copy = function () {
      return copy(scale, calendar(ticks, tickInterval, year, month, week, day, hour, minute, second, format));
    };

    return scale;
  }
  function time() {
    return initRange.apply(calendar(timeTicks, timeTickInterval, year, month, sunday, day, hour, minute, second, timeFormat).domain([new Date(2000, 0, 1), new Date(2000, 0, 2)]), arguments);
  }

  function utcTime() {
    return initRange.apply(calendar(utcTicks, utcTickInterval, utcYear, utcMonth, utcSunday, utcDay, utcHour, utcMinute, second, utcFormat).domain([Date.UTC(2000, 0, 1), Date.UTC(2000, 0, 2)]), arguments);
  }

  function defaultAxisOptions(options) {
    var _options$elementType, _options$minTickPaddi, _options$tickLabelRot, _options$innerBandPad, _options$outerBandPad, _options$innerSeriesB, _options$outerSeriesB, _options$show, _options$stacked, _options$shouldNice;

    return _extends({}, options, {
      elementType: (_options$elementType = options.elementType) != null ? _options$elementType : 'line',
      minTickPaddingForRotation: (_options$minTickPaddi = options.minTickPaddingForRotation) != null ? _options$minTickPaddi : 10,
      tickLabelRotationDeg: (_options$tickLabelRot = options.tickLabelRotationDeg) != null ? _options$tickLabelRot : 60,
      innerBandPadding: (_options$innerBandPad = options.innerBandPadding) != null ? _options$innerBandPad : 0.5,
      outerBandPadding: (_options$outerBandPad = options.outerBandPadding) != null ? _options$outerBandPad : 0.2,
      innerSeriesBandPadding: (_options$innerSeriesB = options.innerSeriesBandPadding) != null ? _options$innerSeriesB : 0.2,
      outerSeriesBandPadding: (_options$outerSeriesB = options.outerSeriesBandPadding) != null ? _options$outerSeriesB : 0,
      show: (_options$show = options.show) != null ? _options$show : true,
      stacked: (_options$stacked = options.stacked) != null ? _options$stacked : false,
      shouldNice: (_options$shouldNice = options.shouldNice) != null ? _options$shouldNice : true
    });
  }

  function buildAxisLinear(isPrimary, userOptions, series, allDatums, gridDimensions, width, height) {
    var options = defaultAxisOptions(userOptions);

    if (!options.position) {
      throw new Error("Chart axes must have a valid 'position' property");
    }

    var isVertical = ['left', 'right'].indexOf(options.position) > -1; // Now we need to figure out the range

    var range = isVertical ? [gridDimensions.height, 0] : [0, gridDimensions.width];
    var outerRange = isVertical ? [height, 0] : [0, width]; // Give the scale a home

    return options.scaleType === 'time' || options.scaleType === 'localTime' ? buildTimeAxis(isPrimary, options, series, allDatums, isVertical, range, outerRange) : options.scaleType === 'linear' || options.scaleType === 'log' ? buildLinearAxis(isPrimary, options, series, allDatums, isVertical, range, outerRange) : options.scaleType === 'band' ? buildBandAxis(isPrimary, options, series, isVertical, range, outerRange) : function () {
      throw new Error('Invalid scale type');
    }();
  }

  function buildTimeAxis(isPrimary, options, series, allDatums, isVertical, range, outerRange) {
    var scaleFn = options.scaleType === 'localTime' ? time : utcTime;
    var isInvalid = false;
    series = isPrimary ? series : series.filter(function (s) {
      return s.secondaryAxisId === options.id;
    });
    allDatums = isPrimary ? allDatums : allDatums.filter(function (d) {
      return d.secondaryAxisId === options.id;
    }); // Now set the range

    var scale = scaleFn(range);

    var _extent = extent(allDatums, function (datum) {
      var value = options.getValue(datum.originalDatum);
      datum[isPrimary ? 'primaryValue' : 'secondaryValue'] = value;
      return value;
    }),
        minValue = _extent[0],
        maxValue = _extent[1];

    var shouldNice = options.shouldNice; // see https://stackoverflow.com/a/2831422

    if (Object.prototype.toString.call(options.min) === '[object Date]') {
      minValue = min([options.min, minValue]);
      shouldNice = false;
    }

    if (Object.prototype.toString.call(options.max) === '[object Date]') {
      maxValue = max([options.max, maxValue]);
      shouldNice = false;
    }

    if (Object.prototype.toString.call(options.hardMin) === '[object Date]') {
      minValue = options.hardMin;
      shouldNice = false;
    }

    if (Object.prototype.toString.call(options.hardMax) === '[object Date]') {
      maxValue = options.hardMax;
      shouldNice = false;
    }

    if (minValue === undefined || maxValue === undefined) {
      console.info('Invalid scale min/max', {
        options: options,
        series: series,
        range: range,
        values: allDatums.map(function (d) {
          return isPrimary ? d.primaryValue : d.secondaryValue;
        })
      });
      isInvalid = true;
    } // Set the domain


    scale.domain([minValue, maxValue]);

    if (options.invert) {
      scale.domain(Array.from(scale.domain()).reverse());
    }

    if (shouldNice) {
      scale.nice();
    }

    var outerScale = scale.copy().range(outerRange); // Supplementary band scale

    var primaryBandScale = isPrimary ? buildPrimaryBandScale(options, scale, series, range) : undefined;
    var seriesBandScale = primaryBandScale ? buildSeriesBandScale(options, primaryBandScale, series) : undefined;
    var primaryBandWidth = primaryBandScale == null ? void 0 : primaryBandScale.bandwidth();

    if (options.padBandRange && primaryBandWidth) {
      var bandStart = scale.invert(0);
      var bandEnd = scale.invert(primaryBandWidth);
      var diff = bandEnd.valueOf() - bandStart.valueOf();
      scale.domain([new Date(scale.domain()[0].valueOf() - diff / 2), new Date(scale.domain()[1].valueOf() + diff / 2)]);
    }

    var defaultFormat = scale.tickFormat();
    var formatters = {};

    var scaleFormat = function scaleFormat(value) {
      var _options$formatters$s, _options$formatters;

      return (_options$formatters$s = (_options$formatters = options.formatters) == null ? void 0 : _options$formatters.scale == null ? void 0 : _options$formatters.scale(value, _extends({}, formatters, {
        scale: undefined
      }))) != null ? _options$formatters$s : defaultFormat(value);
    };

    var tooltipFormat = function tooltipFormat(value) {
      var _options$formatters$t, _options$formatters2;

      return (_options$formatters$t = (_options$formatters2 = options.formatters) == null ? void 0 : _options$formatters2.tooltip == null ? void 0 : _options$formatters2.tooltip(value, _extends({}, formatters, {
        tooltip: undefined
      }))) != null ? _options$formatters$t : scaleFormat(value);
    };

    var cursorFormat = function cursorFormat(value) {
      var _options$formatters$c, _options$formatters3;

      return (_options$formatters$c = (_options$formatters3 = options.formatters) == null ? void 0 : _options$formatters3.cursor == null ? void 0 : _options$formatters3.cursor(value, _extends({}, formatters, {
        cursor: undefined
      }))) != null ? _options$formatters$c : tooltipFormat(value);
    };

    Object.assign(formatters, {
      "default": defaultFormat,
      scale: scaleFormat,
      tooltip: tooltipFormat,
      cursor: cursorFormat
    });
    return _extends({}, options, {
      isInvalid: isInvalid,
      axisFamily: 'time',
      isVertical: isVertical,
      scale: scale,
      range: range,
      outerScale: outerScale,
      primaryBandScale: primaryBandScale,
      seriesBandScale: seriesBandScale,
      formatters: formatters
    });
  }

  function buildLinearAxis(isPrimary, options, series, allDatums, isVertical, range, outerRange) {
    var scale = options.scaleType === 'log' ? log() : linear();
    var isInvalid = false;
    series = isPrimary ? series : series.filter(function (s) {
      return s.secondaryAxisId === options.id;
    });
    allDatums = isPrimary ? allDatums : allDatums.filter(function (d) {
      return d.secondaryAxisId === options.id;
    });

    if (options.stacked) {
      stackSeries(series, options);
    }

    var _ref = options.stacked ? extent(series.map(function (s) {
      return s.datums.map(function (datum) {
        var _datum$stackData;

        var value = options.getValue(datum.originalDatum);
        datum[isPrimary ? 'primaryValue' : 'secondaryValue'] = value;
        return (_datum$stackData = datum.stackData) != null ? _datum$stackData : [];
      });
    }).flat(2)) : extent(allDatums, function (datum) {
      var value = options.getValue(datum.originalDatum);
      datum[isPrimary ? 'primaryValue' : 'secondaryValue'] = value;
      return value;
    }),
        minValue = _ref[0],
        maxValue = _ref[1];

    var shouldNice = options.shouldNice;

    if (typeof options.min === 'number') {
      minValue = min([options.min, minValue]);
      shouldNice = false;
    }

    if (typeof options.max === 'number') {
      maxValue = max([options.max, maxValue]);
      shouldNice = false;
    }

    if (typeof options.minDomainLength === 'number' && !(minValue === undefined || maxValue === undefined)) {
      var mid = median([minValue, maxValue]);
      var top = mid + options.minDomainLength / 2;
      var bottom = mid - options.minDomainLength / 2;
      maxValue = Math.max(top, maxValue);
      minValue = Math.min(bottom, minValue);
    }

    if (typeof options.hardMin === 'number') {
      minValue = options.hardMin;
      shouldNice = false;
    }

    if (typeof options.hardMax === 'number') {
      maxValue = options.hardMax;
      shouldNice = false;
    }

    if (minValue === undefined || maxValue === undefined) {
      var _minValue, _maxValue;

      isInvalid = true;
      console.info('Invalid scale min/max', {
        options: options,
        series: series,
        range: range,
        values: allDatums.map(function (d) {
          return isPrimary ? d.primaryValue : d.secondaryValue;
        })
      });
      minValue = (_minValue = minValue) != null ? _minValue : 0;
      maxValue = (_maxValue = maxValue) != null ? _maxValue : 0; // throw new Error('Invalid scale min/max'
    } // Set the domain


    scale.domain([minValue, maxValue]);

    if (options.invert) {
      scale.domain(Array.from(scale.domain()).reverse());
    }

    scale.range(range);

    if (shouldNice) {
      scale.nice();
    }

    var outerScale = scale.copy().range(outerRange);
    var primaryBandScale = isPrimary ? buildPrimaryBandScale(options, scale, series, range) : undefined;
    var seriesBandScale = primaryBandScale ? buildSeriesBandScale(options, primaryBandScale, series) : undefined;
    var defaultFormat = scale.tickFormat();
    var formatters = {};

    var scaleFormat = function scaleFormat(value) {
      var _options$formatters$s2, _options$formatters4;

      return (_options$formatters$s2 = (_options$formatters4 = options.formatters) == null ? void 0 : _options$formatters4.scale == null ? void 0 : _options$formatters4.scale(value, _extends({}, formatters, {
        scale: undefined
      }))) != null ? _options$formatters$s2 : defaultFormat(value);
    };

    var tooltipFormat = function tooltipFormat(value) {
      var _options$formatters$t2, _options$formatters5;

      return (_options$formatters$t2 = (_options$formatters5 = options.formatters) == null ? void 0 : _options$formatters5.tooltip == null ? void 0 : _options$formatters5.tooltip(value, _extends({}, formatters, {
        tooltip: undefined
      }))) != null ? _options$formatters$t2 : scaleFormat(value);
    };

    var cursorFormat = function cursorFormat(value) {
      var _options$formatters$c2, _options$formatters6;

      return (_options$formatters$c2 = (_options$formatters6 = options.formatters) == null ? void 0 : _options$formatters6.cursor == null ? void 0 : _options$formatters6.cursor(value, _extends({}, formatters, {
        cursor: undefined
      }))) != null ? _options$formatters$c2 : tooltipFormat(value);
    };

    Object.assign(formatters, {
      "default": defaultFormat,
      scale: scaleFormat,
      tooltip: tooltipFormat,
      cursor: cursorFormat
    });
    return _extends({}, options, {
      isInvalid: isInvalid,
      axisFamily: 'linear',
      isVertical: isVertical,
      scale: scale,
      range: range,
      outerScale: outerScale,
      primaryBandScale: primaryBandScale,
      seriesBandScale: seriesBandScale,
      formatters: formatters
    });
  }

  function buildBandAxis(isPrimary, options, series, isVertical, range, outerRange) {
    var _options$outerBandPad2, _options$innerBandPad2;

    series = series.filter(function (d) {
      return d.secondaryAxisId === options.id;
    });
    var isInvalid = false;
    var domain = Array.from(new Set(series.map(function (d) {
      return d.datums;
    }).flat().map(function (datum) {
      var value = options.getValue(datum.originalDatum);
      datum[isPrimary ? 'primaryValue' : 'secondaryValue'] = value;
      return value;
    })));
    var scale = band(domain, range).round(false).paddingOuter((_options$outerBandPad2 = options.outerBandPadding) != null ? _options$outerBandPad2 : 0).paddingInner((_options$innerBandPad2 = options.innerBandPadding) != null ? _options$innerBandPad2 : 0); // Invert if necessary

    if (options.invert) {
      scale.domain(Array.from(scale.domain()).reverse());
    }

    var outerScale = scale.copy().range(outerRange);
    var primaryBandScale = scale;
    var seriesBandScale = buildSeriesBandScale(options, primaryBandScale, series);

    var defaultFormat = function defaultFormat(d) {
      return d;
    };

    var formatters = {};

    var scaleFormat = function scaleFormat(value) {
      var _options$formatters$s3, _options$formatters7;

      return (_options$formatters$s3 = (_options$formatters7 = options.formatters) == null ? void 0 : _options$formatters7.scale == null ? void 0 : _options$formatters7.scale(value, _extends({}, formatters, {
        scale: undefined
      }))) != null ? _options$formatters$s3 : defaultFormat(value);
    };

    var tooltipFormat = function tooltipFormat(value) {
      var _options$formatters$t3, _options$formatters8;

      return (_options$formatters$t3 = (_options$formatters8 = options.formatters) == null ? void 0 : _options$formatters8.tooltip == null ? void 0 : _options$formatters8.tooltip(value, _extends({}, formatters, {
        tooltip: undefined
      }))) != null ? _options$formatters$t3 : scaleFormat(value);
    };

    var cursorFormat = function cursorFormat(value) {
      var _options$formatters$c3, _options$formatters9;

      return (_options$formatters$c3 = (_options$formatters9 = options.formatters) == null ? void 0 : _options$formatters9.cursor == null ? void 0 : _options$formatters9.cursor(value, _extends({}, formatters, {
        cursor: undefined
      }))) != null ? _options$formatters$c3 : tooltipFormat(value);
    };

    Object.assign(formatters, {
      "default": defaultFormat,
      scale: scaleFormat,
      tooltip: tooltipFormat,
      cursor: cursorFormat
    });
    return _extends({}, options, {
      isInvalid: isInvalid,
      axisFamily: 'band',
      isVertical: isVertical,
      scale: scale,
      range: range,
      outerScale: outerScale,
      formatters: formatters,
      primaryBandScale: primaryBandScale,
      seriesBandScale: seriesBandScale
    });
  } //


  function stackSeries(series, axisOptions) {
    var _axisOptions$stackOff;

    var seriesIndices = Object.keys(series);
    var stacker = stack().keys(seriesIndices).value(function (_, seriesIndex, index) {
      var _series$Number, _series$Number$datums;

      var originalDatum = (_series$Number = series[Number(seriesIndex)]) == null ? void 0 : (_series$Number$datums = _series$Number.datums[index]) == null ? void 0 : _series$Number$datums.originalDatum;
      var val = typeof originalDatum !== 'undefined' ? axisOptions.getValue(originalDatum) : 0;

      if (typeof val === 'undefined' || val === null) {
        return 0;
      }

      return val;
    }).offset((_axisOptions$stackOff = axisOptions.stackOffset) != null ? _axisOptions$stackOff : stackOffsetNone);
    var stacked = stacker(Array.from({
      length: series.sort(function (a, b) {
        return b.datums.length - a.datums.length;
      })[0].datums.length
    }));

    for (var sIndex = 0; sIndex < stacked.length; sIndex++) {
      var s = stacked[sIndex];

      for (var i = 0; i < s.length; i++) {
        var datum = s[i];

        if (series[sIndex].datums[i]) {
          // @ts-ignore
          datum.data = series[sIndex].datums[i];
          series[sIndex].datums[i].stackData = datum;
        }
      }
    }
  }

  function buildPrimaryBandScale(options, scale, series, range) {
    var _options$outerBandPad3, _options$innerBandPad3;

    // Find the two closest points along axis
    var impliedBandWidth = Math.max.apply(Math, range);

    for (var i = 0; i < series.length; i++) {
      var serie = series[i];

      for (var j = 0; j < serie.datums.length; j++) {
        var _d1$primaryValue;

        var d1 = serie.datums[j];
        var one = scale((_d1$primaryValue = d1.primaryValue) != null ? _d1$primaryValue : NaN);

        for (var k = 0; k < serie.datums.length; k++) {
          var _d2$primaryValue;

          var d2 = serie.datums[k];
          var two = scale((_d2$primaryValue = d2.primaryValue) != null ? _d2$primaryValue : NaN);

          if (one === two) {
            continue;
          }

          var diff = Math.abs(Math.max(one, two) - Math.min(one, two));

          if (diff < impliedBandWidth) {
            impliedBandWidth = diff;
          }
        }
      }
    }

    var bandRange = Math.max.apply(Math, range);
    var bandDomain = d3Range(bandRange / impliedBandWidth);
    var primaryBandScale = band(bandDomain, range).round(false).paddingOuter((_options$outerBandPad3 = options.outerBandPadding) != null ? _options$outerBandPad3 : 0).paddingInner((_options$innerBandPad3 = options.innerBandPadding) != null ? _options$innerBandPad3 : 0);
    return primaryBandScale;
  }

  function buildSeriesBandScale(options, primaryBandScale, series) {
    var _options$outerSeriesB2, _options$innerSeriesB2;

    var bandDomain = d3Range(series.length);
    var seriesBandScale = band(bandDomain, [0, primaryBandScale.bandwidth()]).round(false).paddingOuter((_options$outerSeriesB2 = options.outerSeriesBandPadding) != null ? _options$outerSeriesB2 : options.outerBandPadding ? options.outerBandPadding / 2 : 0).paddingInner((_options$innerSeriesB2 = options.innerSeriesBandPadding) != null ? _options$innerSeriesB2 : options.innerBandPadding ? options.innerBandPadding / 2 : 0);

    var scale = function scale(seriesIndex) {
      var _series$find;

      return seriesBandScale((_series$find = series.find(function (d) {
        return d.index === seriesIndex;
      })) == null ? void 0 : _series$find.indexPerAxis);
    };

    return Object.assign(scale, seriesBandScale);
  }

  var getElBox = function getElBox(el) {
    var rect = el.getBoundingClientRect();
    return {
      top: Math.round(rect.top),
      right: Math.round(rect.right),
      bottom: Math.round(rect.bottom),
      left: Math.round(rect.left),
      width: Math.round(rect.width),
      height: Math.round(rect.height),
      x: Math.round(rect.x),
      y: Math.round(rect.y)
    };
  };

  function useMeasure(_ref) {
    var axis = _ref.axis,
        elRef = _ref.elRef,
        gridDimensions = _ref.gridDimensions,
        setShowRotated = _ref.setShowRotated;

    var _useChartContext = useChartContext(),
        axisDimensionsState = _useChartContext.axisDimensionsState;

    var axisDimensions = axisDimensionsState[0],
        setAxisDimensions = axisDimensionsState[1];
    var axisDimension = React__default['default'].useMemo(function () {
      var _axisDimensions;

      return (_axisDimensions = axisDimensions[axis.position]) == null ? void 0 : _axisDimensions[axis.id];
    }, [axisDimensions, axis.position, axis.id]); // const isLooping = useIsLooping()

    var measureRotation = React__default['default'].useCallback(function () {
      var _widestLabel2;

      if (!elRef.current) {
        return;
      }

      var gridSize = !axis.isVertical ? gridDimensions.width : gridDimensions.height;
      var staticLabelDims = Array.from(elRef.current.querySelectorAll('.Axis-Group.outer .tickLabel')).map(function (el) {
        return getElBox(el);
      }); // Determine the largest labels on the axis

      var widestLabel;
      staticLabelDims.forEach(function (label) {
        var _widestLabel;

        var resolvedLabel = (_widestLabel = widestLabel) != null ? _widestLabel : {
          width: 0
        };

        if (label.width > 0 && label.width > resolvedLabel.width) {
          widestLabel = label;
        }
      });
      var smallestTickGap = gridSize;

      if (staticLabelDims.length > 1) {
        staticLabelDims.forEach(function (current, i) {
          var prev = staticLabelDims[i - 1];

          if (prev) {
            smallestTickGap = Math.min(smallestTickGap, axis.isVertical ? current.top - prev.top : current.left - prev.left);
          }
        });
      }

      var shouldRotate = (((_widestLabel2 = widestLabel) == null ? void 0 : _widestLabel2.width) || 0) + axis.minTickPaddingForRotation > smallestTickGap; // if (!isLooping) {
      // Rotate ticks for non-time horizontal axes

      if (!axis.isVertical) {
        setShowRotated(shouldRotate);
      } // }

    }, [elRef, axis.isVertical, axis.minTickPaddingForRotation, gridDimensions.width, gridDimensions.height, setShowRotated]);
    var measureDimensions = React__default['default'].useCallback(function () {
      if (!elRef.current) {
        if (axisDimension) {
          // If the entire axis is hidden, then we need to remove the axis dimensions
          setAxisDimensions(function (old) {
            var _old$axis$position, _extends2;

            var newAxes = _extends({}, (_old$axis$position = old[axis.position]) != null ? _old$axis$position : {});

            delete newAxes[axis.id];
            return _extends({}, old, (_extends2 = {}, _extends2[axis.position] = newAxes, _extends2));
          });
        }

        return;
      }

      var newDimensions = {
        width: 0,
        height: 0,
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0
      };
      var currentEl = elRef.current;
      var axisEl = currentEl.querySelector(".Axis-Group.inner .domainAndTicks");
      var domainEl = currentEl.querySelector(".Axis-Group.inner .domain");

      if (!axisEl || !domainEl) {
        return;
      }

      var axisDims = getElBox(axisEl);
      var domainDims = getElBox(domainEl);

      if (!axisDims || !domainDims) {
        return;
      } // Axis overflow measurements


      if (!axis.isVertical) {
        newDimensions.paddingLeft = Math.round(Math.max(0, domainDims.left - (axisDims == null ? void 0 : axisDims.left)));
        newDimensions.paddingRight = Math.round(Math.max(0, (axisDims == null ? void 0 : axisDims.right) - domainDims.right));
        newDimensions.height = axisDims == null ? void 0 : axisDims.height;
      } else {
        newDimensions.paddingTop = Math.round(Math.max(0, domainDims.top - (axisDims == null ? void 0 : axisDims.top)));
        newDimensions.paddingBottom = Math.round(Math.max(0, (axisDims == null ? void 0 : axisDims.bottom) - domainDims.bottom));
        newDimensions.width = axisDims == null ? void 0 : axisDims.width;
      } // Only update the axisDimensions if something has changed


      if ( // !isLooping &&
      !axisDimensions || !axisDimension || Object.keys(newDimensions).some(function (key) {
        // @ts-ignore
        return newDimensions[key] !== axisDimension[key];
      })) {
        setAxisDimensions(function (old) {
          var _old$axis$position2, _extends3, _extends4;

          return _extends({}, old, (_extends4 = {}, _extends4[axis.position] = _extends({}, (_old$axis$position2 = old[axis.position]) != null ? _old$axis$position2 : {}, (_extends3 = {}, _extends3[axis.id] = newDimensions, _extends3)), _extends4));
        });
      }
    }, [axis.id, axis.isVertical, axis.position, axisDimension, axisDimensions, elRef, setAxisDimensions]); // Measure after if needed

    useIsomorphicLayoutEffect(function () {
      // setTimeout(() => {
      window.requestAnimationFrame(function () {
        measureRotation();
        measureDimensions();
      });
    }, [measureRotation]); // useIsomorphicLayoutEffect(() => {
    //   // setTimeout(() => {
    //   window.requestAnimationFrame(() => {
    //   })
    // }, [measureRotation])
  }

  function AxisLinearComp(axis) {
    var _React$useState = React__default['default'].useState(false),
        showRotated = _React$useState[0],
        setShowRotated = _React$useState[1];

    var _useChartContext = useChartContext(),
        getOptions = _useChartContext.getOptions,
        gridDimensions = _useChartContext.gridDimensions,
        width = _useChartContext.width,
        height = _useChartContext.height;

    var _getOptions = getOptions(),
        dark = _getOptions.dark,
        showDebugAxes = _getOptions.showDebugAxes;

    var elRef = React__default['default'].useRef(null);
    useMeasure({
      axis: axis,
      elRef: elRef,
      gridDimensions: gridDimensions,
      showRotated: showRotated,
      setShowRotated: setShowRotated
    });

    var renderAxis = function renderAxis(isOuter) {
      var isRotated = !isOuter && showRotated;
      var scale = isOuter ? axis.outerScale : axis.scale;

      var _scale$range = scale.range(),
          rangeStart = _scale$range[0],
          rangeEnd = _scale$range[1];

      var getTicks = function getTicks() {
        var anyAxis = axis;

        if (anyAxis.outerScale.ticks) {
          if (typeof anyAxis.tickCount === 'number') {
            return anyAxis.outerScale.ticks(anyAxis.tickCount);
          }

          var autoSpacing = anyAxis.isVertical ? 40 : 80;
          var range = anyAxis.outerScale.range();
          var num = Math.abs(range[1] - range[0]) / autoSpacing;
          return anyAxis.outerScale.ticks(num);
        }

        return anyAxis.outerScale.domain();
      };

      var resolvedHeight = isOuter ? height : gridDimensions.height;
      var resolvedWidth = isOuter ? width : gridDimensions.width;

      var _ref = axis.position === 'left' ? [{
        x: 0,
        y: rangeStart
      }, {
        x: 0,
        y: rangeEnd
      }] : axis.position === 'right' ? [{
        x: resolvedWidth,
        y: rangeStart
      }, {
        x: resolvedWidth,
        y: rangeEnd
      }] : axis.position === 'top' ? [{
        x: rangeStart,
        y: 0
      }, {
        x: rangeEnd,
        y: 0
      }] : [{
        x: rangeStart,
        y: resolvedHeight
      }, {
        x: rangeEnd,
        y: resolvedHeight
      }],
          lineFrom = _ref[0],
          lineTo = _ref[1];

      var ticks = getTicks().map(function (tick) {
        var px = getTickPx(scale, tick);

        var _ref2 = axis.position === 'left' ? [{
          x: 0,
          y: px
        }, {
          x: -8,
          y: px
        }, {
          x: resolvedWidth,
          y: px
        }] : axis.position === 'right' ? [{
          x: resolvedWidth,
          y: px
        }, {
          x: resolvedWidth + 8,
          y: px
        }, {
          x: 0,
          y: px
        }] : axis.position === 'top' ? [{
          x: px,
          y: 0
        }, {
          x: px,
          y: -8
        }, {
          x: px,
          y: resolvedHeight
        }] : [{
          x: px,
          y: resolvedHeight
        }, {
          x: px,
          y: resolvedHeight + 8
        }, {
          x: px,
          y: 0
        }],
            from = _ref2[0],
            to = _ref2[1],
            gridTo = _ref2[2];

        return {
          value: tick,
          from: from,
          to: to,
          gridTo: gridTo
        };
      });
      return /*#__PURE__*/React__default['default'].createElement("g", {
        key: "Axis-Group " + (isOuter ? 'outer' : 'inner'),
        className: "Axis-Group " + (isOuter ? 'outer' : 'inner'),
        style: {
          transform: isOuter ? undefined : translate(gridDimensions.left, gridDimensions.top)
        }
      }, /*#__PURE__*/React__default['default'].createElement("g", {
        className: "Axis",
        style: _extends({}, isOuter ? {
          opacity: showDebugAxes ? 0.5 : 0,
          pointerEvents: 'none'
        } : {
          opacity: 1,
          pointerEvents: 'all'
        })
      }, /*#__PURE__*/React__default['default'].createElement("g", {
        className: "domainAndTicks"
      }, /*#__PURE__*/React__default['default'].createElement("line", {
        className: "domain",
        x1: lineFrom.x,
        y1: lineFrom.y,
        x2: lineTo.x,
        y2: lineTo.y,
        stroke: dark ? 'rgba(255,255,255, .2)' : 'rgba(0,0,0, .2)'
      }), ticks.map(function (tick, i) {
        var _tick$to = tick.to,
            tickLabelX = _tick$to.x,
            tickLabelY = _tick$to.y;

        if (axis.position === 'top') {
          tickLabelY -= 5;
        } else if (axis.position === 'bottom') {
          tickLabelY += 5;
        } else if (axis.position === 'left') {
          tickLabelX -= 5;
        } else if (axis.position === 'right') {
          tickLabelX += 5;
        }

        return /*#__PURE__*/React__default['default'].createElement("g", {
          key: "vx-tick-" + tick + "-" + i,
          className: 'tick'
        }, !isOuter ? /*#__PURE__*/React__default['default'].createElement("line", {
          x1: tick.from.x,
          y1: tick.from.y,
          x2: tick.to.x,
          y2: tick.to.y,
          stroke: dark ? 'rgba(255,255,255, .2)' : 'rgba(0,0,0, .2)'
        }) : null, /*#__PURE__*/React__default['default'].createElement("text", {
          className: "tickLabel",
          style: {
            fontSize: 10,
            fill: dark ? 'rgba(255,255,255, .7)' : 'rgba(0,0,0, .7)',
            dominantBaseline: isRotated ? 'central' : axis.position === 'bottom' ? 'hanging' : axis.position === 'top' ? 'alphabetic' : 'central',
            textAnchor: isRotated ? 'end' : axis.position === 'right' ? 'start' : axis.position === 'left' ? 'end' : 'middle'
          },
          transform: "translate(" + tickLabelX + ", " + tickLabelY + ") rotate(" + (isRotated ? axis.position === 'top' ? 60 : -60 : 0) + ")"
        }, axis.formatters.scale(tick.value)));
      })), /*#__PURE__*/React__default['default'].createElement("g", {
        className: "grid"
      }, ticks.map(function (tick, i) {
        var _axis$showGrid;

        return /*#__PURE__*/React__default['default'].createElement("g", {
          key: "vx-tick-" + tick + "-" + i,
          className: 'tick'
        }, ((_axis$showGrid = axis.showGrid) != null ? _axis$showGrid : true) && !isOuter ? /*#__PURE__*/React__default['default'].createElement("line", {
          x1: tick.from.x,
          y1: tick.from.y,
          x2: tick.gridTo.x,
          y2: tick.gridTo.y,
          stroke: dark ? 'rgba(255,255,255, .05)' : 'rgba(0,0,0, .05)'
        }) : null);
      }))));
    };

    return axis.show ? /*#__PURE__*/React__default['default'].createElement("g", {
      ref: elRef
    }, renderAxis(false), renderAxis(true)) : null;
  }

  function getTickPx(scale, value) {
    var _scale;

    var px = (_scale = scale(value)) != null ? _scale : NaN; // @ts-ignore

    if (scale.bandwidth) {
      // @ts-ignore
      return px + scale.bandwidth() / 2;
    }

    return px;
  }

  function usePrevious(val) {
    var ref = React__default['default'].useRef();
    useIsomorphicLayoutEffect(function () {
      ref.current = val;
    }, [val]);
    return ref.current;
  }

  function useLatestWhen(obj, when) {
    if (when === void 0) {
      when = true;
    }

    var ref = React__default['default'].useRef(when ? obj : null);

    if (when) {
      ref.current = obj;
    }

    return ref.current;
  }

  function usePortalElement() {
    var _React$useState = React__namespace.useState(),
        portalEl = _React$useState[0],
        setPortalEl = _React$useState[1];

    useIsomorphicLayoutEffect(function () {
      if (!portalEl) {
        var element = document.getElementById('react-charts-portal');

        if (!element) {
          element = document.createElement('div');
          element.setAttribute('id', 'react-charts-portal');
          Object.assign(element.style, {
            pointerEvents: 'none',
            position: 'fixed',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            'z-index': 99999999999
          });
          document.body.append(element);
        }

        setPortalEl(element);
      }
    });
    return portalEl;
  }

  var props = ["bottom", "height", "left", "right", "top", "width"];

  var rectChanged = function rectChanged(a, b) {
    if (a === void 0) {
      a = {};
    }

    if (b === void 0) {
      b = {};
    }

    return props.some(function (prop) {
      return a[prop] !== b[prop];
    });
  };

  var observedNodes = /*#__PURE__*/new Map();
  var rafId;

  var run = function run() {
    var changedStates = [];
    observedNodes.forEach(function (state, node) {
      var newRect = node.getBoundingClientRect();

      if (rectChanged(newRect, state.rect)) {
        state.rect = newRect;
        changedStates.push(state);
      }
    });
    changedStates.forEach(function (state) {
      state.callbacks.forEach(function (cb) {
        return cb(state.rect);
      });
    });
    rafId = window.requestAnimationFrame(run);
  };

  function observeRect(node, cb) {
    return {
      observe: function observe() {
        var wasEmpty = observedNodes.size === 0;

        if (observedNodes.has(node)) {
          observedNodes.get(node).callbacks.push(cb);
        } else {
          observedNodes.set(node, {
            rect: undefined,
            hasRectChanged: false,
            callbacks: [cb]
          });
        }

        if (wasEmpty) run();
      },
      unobserve: function unobserve() {
        var state = observedNodes.get(node);

        if (state) {
          // Remove the callback
          var index = state.callbacks.indexOf(cb);
          if (index >= 0) state.callbacks.splice(index, 1); // Remove the node reference

          if (!state.callbacks.length) observedNodes["delete"](node); // Stop the loop

          if (!observedNodes.size) cancelAnimationFrame(rafId);
        }
      }
    };
  }

  function useRect(node, enabled) {
    var _React$useState = React__default['default'].useState(node),
        element = _React$useState[0],
        setElement = _React$useState[1];

    var _React$useState2 = React__default['default'].useState({
      width: 0,
      height: 0
    }),
        rect = _React$useState2[0],
        setRect = _React$useState2[1];

    var rectRef = React__default['default'].useRef(rect);
    rectRef.current = rect;
    useIsomorphicLayoutEffect(function () {
      if (node !== element) {
        setElement(node);
      }
    });
    useIsomorphicLayoutEffect(function () {
      if (enabled && element) {
        setRect(element.getBoundingClientRect());
      }
    }, [element, enabled]);
    React__default['default'].useEffect(function () {
      if (!element || !enabled) {
        return;
      }

      var observer = observeRect(element, function (newRect) {
        setRect(newRect);
      });
      observer.observe();
      return function () {
        observer.unobserve();
      };
    }, [element, enabled]); // const resolvedRect = React.useMemo(() => {
    //   if (!element || !(element as Element).tagName) {
    //     return rect
    //   }
    //   const styles = window.getComputedStyle(element as Element)
    //   return {
    //     x: rect.x,
    //     y: rect.y,
    //     width:
    //       rect.width -
    //       parseInt(styles.borderLeftWidth) -
    //       parseInt(styles.borderRightWidth),
    //     height:
    //       rect.height -
    //       parseInt(styles.borderTopWidth) -
    //       parseInt(styles.borderBottomWidth),
    //     top: rect.top,
    //     right: rect.right,
    //     bottom: rect.bottom,
    //     left: rect.left,
    //   }
    // }, [element, rect])

    return rect;
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _construct(Parent, args, Class) {
    if (_isNativeReflectConstruct()) {
      _construct = Reflect.construct;
    } else {
      _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) _setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }

    return _construct.apply(null, arguments);
  }

  // Super fast physics simulations for JavaScript
  // Copyright 2014 Ralph Thomas
  // Licensed under the Apache License, Version 2.0
  // https://github.com/iamralpht/gravitas.js
  // Adapted to TypeScript and customized by Tanner Linsley (@tannerlinsley)
  var epsilon$1 = 0.001;

  function almostEqual(a, b) {
    if (Number.isNaN(a) && Number.isNaN(b)) {
      return true;
    }

    return a > b - epsilon$1 && a < b + epsilon$1;
  }

  function almostZero(a) {
    return almostEqual(a, 0);
  }

  var Spring = /*#__PURE__*/function () {
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

  function useSpring(value, config, cb, immediate, debug) {
    var springRef = React__default['default'].useRef(_construct(Spring, [value].concat(config)));
    var getValue = useGetLatest(value);

    var _useRaf = useRaf(function () {
      cb(springRef.current.x());
      return springRef.current.done();
    }),
        startRaf = _useRaf[0],
        stopRaf = _useRaf[1]; // Immediate


    React__default['default'].useEffect(function () {
      if (immediate) {
        springRef.current.snap(getValue());
        startRaf();
        return;
      }

      springRef.current.setEnd(value);
      startRaf();
    }, [debug, getValue, immediate, startRaf, stopRaf, value]);
    React__default['default'].useEffect(function () {
      return function () {
        stopRaf();
      };
    }, [stopRaf]);
    return springRef.current;
  }
  function useRaf(callback) {
    var raf = React__default['default'].useRef(null);
    var rafCallback = React__default['default'].useRef(callback);
    rafCallback.current = callback;
    var tick = React__default['default'].useCallback(function () {
      if (rafCallback.current()) return;
      raf.current = requestAnimationFrame(tick);
    }, []);
    return [React__default['default'].useMemo(function () {
      return tick;
    }, [tick]), React__default['default'].useMemo(function () {
      return function () {
        return raf.current && cancelAnimationFrame(raf.current);
      };
    }, [])];
  }

  //
  var getLineBackgroundColor = function getLineBackgroundColor(dark, bandWidth) {
    return dark ? "rgba(255,255,255," + (bandWidth > 4 ? 0.15 : 0.3) + ")" : "rgba(0, 26, 39, " + (bandWidth > 4 ? 0.15 : 0.3) + ")";
  };

  var getBackgroundColor$1 = function getBackgroundColor(dark) {
    return dark ? 'rgba(255,255,255,.9)' : 'rgba(0, 26, 39, 0.9)';
  };

  function defaultCursor(options) {
    var _options$show, _options$showLine, _options$showLabel;

    return _extends({}, options, {
      show: (_options$show = options.show) != null ? _options$show : true,
      showLine: (_options$showLine = options.showLine) != null ? _options$showLine : true,
      showLabel: (_options$showLabel = options.showLabel) != null ? _options$showLabel : true
    });
  }

  function Cursors() {
    var _getOptions$primaryCu, _getOptions$secondary;

    var _useChartContext = useChartContext(),
        getOptions = _useChartContext.getOptions;

    var primaryOptions = (_getOptions$primaryCu = getOptions().primaryCursor) != null ? _getOptions$primaryCu : true;
    var secondaryOptions = (_getOptions$secondary = getOptions().secondaryCursor) != null ? _getOptions$secondary : true;
    var resolvedPrimaryOptions = React__default['default'].useMemo(function () {
      return defaultCursor(!primaryOptions ? {
        show: false
      } : typeof primaryOptions === 'boolean' ? {} : primaryOptions);
    }, [primaryOptions]);
    var resolvedSecondaryOptions = React__default['default'].useMemo(function () {
      return defaultCursor(!secondaryOptions ? {
        show: false
      } : typeof secondaryOptions === 'boolean' ? {} : secondaryOptions);
    }, [secondaryOptions]);
    return /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null, /*#__PURE__*/React__default['default'].createElement(Cursor, {
      primary: true,
      options: resolvedPrimaryOptions
    }), /*#__PURE__*/React__default['default'].createElement(Cursor, {
      options: resolvedSecondaryOptions
    }));
  }

  function Cursor(props) {
    var _secondaryAxes$find, _props$options$value, _ref, _ref2, _ref3, _ref4, _getOptions$dark;

    var _useChartContext2 = useChartContext(),
        getOptions = _useChartContext2.getOptions,
        svgRef = _useChartContext2.svgRef,
        gridDimensions = _useChartContext2.gridDimensions,
        focusedDatumState = _useChartContext2.focusedDatumState,
        primaryAxis = _useChartContext2.primaryAxis,
        secondaryAxes = _useChartContext2.secondaryAxes;

    var getTooltipOptions = useGetLatest(props.options);
    var focusedDatum = focusedDatumState[0];
    var latestFocusedDatum = useLatestWhen(focusedDatum, !!focusedDatum);
    var secondaryAxis = (_secondaryAxes$find = secondaryAxes.find(function (d) {
      return d.id === (latestFocusedDatum == null ? void 0 : latestFocusedDatum.secondaryAxisId);
    })) != null ? _secondaryAxes$find : secondaryAxes[0];
    var axis = props.primary ? primaryAxis : secondaryAxis;
    var siblingAxis = props.primary ? secondaryAxis : primaryAxis;

    var resolveValue = function resolveValue(d) {
      var _d$stackData;

      return d ? axis.stacked ? (_d$stackData = d.stackData) == null ? void 0 : _d$stackData[1] : props.primary ? d.primaryValue : d.secondaryValue : undefined;
    };

    var datumValue = resolveValue(focusedDatum);
    React__default['default'].useEffect(function () {
      var _getTooltipOptions;

      (_getTooltipOptions = getTooltipOptions()) == null ? void 0 : _getTooltipOptions.onChange == null ? void 0 : _getTooltipOptions.onChange(datumValue);
    }, [getTooltipOptions, datumValue]);
    var value = (_props$options$value = props.options.value) != null ? _props$options$value : datumValue;
    var latestPropsValue = useLatestWhen(props.options.value, props.options.value != null);
    var latestDatumValue = useLatestWhen(resolveValue(latestFocusedDatum), resolveValue(latestFocusedDatum) != null);
    var latestValue = latestPropsValue != null ? latestPropsValue : latestDatumValue; // Get the sibling range

    var siblingRange = siblingAxis.scale.range();
    var x;
    var y;
    var x1;
    var x2;
    var y1;
    var y2;
    var alignPctX;
    var alignPctY;
    var bandWidth = axis.axisFamily === 'band' ? axis.scale.bandwidth() : 1;
    var show = typeof value !== 'undefined' && !Number.isNaN(value);
    var px = axis.scale(value); // Vertical alignment

    if (axis.isVertical) {
      var _y, _y2;

      y = px;
      y1 = ((_y = y) != null ? _y : 0) - 1;
      y2 = ((_y2 = y) != null ? _y2 : 0) + bandWidth;

      if (axis.position === 'left') {
        x1 = siblingRange[0];
        x2 = siblingRange[1];
      } else {
        x1 = siblingRange[1];
        x2 = siblingRange[0];
      }
    } else {
      var _x, _x2;

      x = px;
      x1 = ((_x = x) != null ? _x : 0) - 1;
      x2 = ((_x2 = x) != null ? _x2 : 0) + bandWidth;

      if (axis.position === 'top') {
        y1 = siblingRange[0];
        y2 = siblingRange[1];
      } else {
        y1 = siblingRange[1];
        y2 = siblingRange[0];
      }
    }

    var lineStartX = Math.min(x1, x2);
    var lineStartY = Math.min(y1, y2);
    var lineEndX = Math.max(x1, x2);
    var lineEndY = Math.max(y1, y2);
    var lineHeight = Math.max(lineEndY - lineStartY, 0);
    var lineWidth = Math.max(lineEndX - lineStartX, 0);
    var bubbleX;
    var bubbleY; // Bubble placement

    if (axis.isVertical) {
      if (axis.position === 'left') {
        bubbleX = lineStartX;
      } else {
        bubbleX = lineEndX;
      }

      bubbleY = lineStartY + lineHeight / 2;
    } else {
      if (axis.position === 'top') {
        bubbleY = lineStartY;
      } else {
        bubbleY = lineEndY;
      }

      bubbleX = lineStartX + lineWidth / 2;
    } // Bubble anchoring


    if (axis.isVertical) {
      alignPctY = -50;

      if (axis.position === 'left') {
        alignPctX = -100;
      } else {
        alignPctX = 0;
      }
    } else {
      alignPctX = -50;

      if (axis.position === 'top') {
        alignPctY = -100;
      } else {
        alignPctY = 0;
      }
    }

    var formattedValue = axis.formatters.cursor(latestValue);
    var svgRect = useRect(svgRef.current, show);
    var lineRef = React__default['default'].useRef(null);
    var bubbleRef = React__default['default'].useRef(null);
    var latestLineStartX = useLatestWhen(lineStartX, px != null);
    var latestLineStartY = useLatestWhen(lineStartY, px != null);
    var latestBubbleX = useLatestWhen(bubbleX, px != null);
    var latestBubbleY = useLatestWhen(bubbleY, px != null);
    var previousTruePx = usePrevious(px);
    var immediate = previousTruePx == null && px !== null;
    lineStartX = (_ref = px != null ? lineStartX : latestLineStartX) != null ? _ref : NaN;
    lineStartY = (_ref2 = px != null ? lineStartY : latestLineStartY) != null ? _ref2 : NaN;
    bubbleX = (_ref3 = px != null ? bubbleX : latestBubbleX) != null ? _ref3 : NaN;
    bubbleY = (_ref4 = px != null ? bubbleY : latestBubbleY) != null ? _ref4 : NaN;
    var lineXSpring = useSpring(lineStartX, [1, 210, 20], function () {
      if (lineRef.current) {
        lineRef.current.style.transform = "translate(" + lineXSpring.x() + "px, " + lineYSpring.x() + "px)";
      }
    }, immediate);
    var lineYSpring = useSpring(lineStartY, [1, 210, 20], function () {
      if (lineRef.current) {
        lineRef.current.style.transform = "translate(" + lineXSpring.x() + "px, " + lineYSpring.x() + "px)";
      }
    }, immediate);
    var bubbleXSpring = useSpring(bubbleX, [1, 210, 20], function () {
      if (bubbleRef.current) {
        bubbleRef.current.style.transform = "translate(" + bubbleXSpring.x() + "px, " + bubbleYSpring.x() + "px)";
      }
    }, immediate);
    var bubbleYSpring = useSpring(bubbleY, [1, 210, 20], function () {
      if (bubbleRef.current) {
        bubbleRef.current.style.transform = "translate(" + bubbleXSpring.x() + "px, " + bubbleYSpring.x() + "px)";
      }
    }, immediate);
    var portalEl = usePortalElement();
    return portalEl ? /*#__PURE__*/ReactDOM__default['default'].createPortal( /*#__PURE__*/React__default['default'].createElement("div", {
      style: {
        fontFamily: 'sans-serif',
        pointerEvents: 'none',
        position: 'absolute',
        top: 0,
        left: 0,
        transform: translate(svgRect.left + gridDimensions.left, svgRect.top + gridDimensions.top),
        opacity: show ? 1 : 0,
        transition: 'opacity .3s ease'
      },
      className: "Cursor"
    }, props.options.showLine ? /*#__PURE__*/React__default['default'].createElement("div", {
      ref: lineRef,
      style: {
        width: lineWidth + "px",
        height: lineHeight + "px",
        position: 'absolute',
        top: 0,
        left: 0,
        background: getLineBackgroundColor((_getOptions$dark = getOptions().dark) != null ? _getOptions$dark : false, bandWidth)
      }
    }) : null, props.options.showLabel ? /*#__PURE__*/React__default['default'].createElement("div", {
      ref: bubbleRef,
      style: {
        position: 'absolute',
        top: 0,
        left: 0
      }
    }, /*#__PURE__*/React__default['default'].createElement("div", {
      style: {
        padding: '5px',
        fontSize: '10px',
        background: getBackgroundColor$1(getOptions().dark),
        color: getBackgroundColor$1(!getOptions().dark),
        borderRadius: '3px',
        position: 'relative',
        transform: "translate3d(" + alignPctX + "%, " + alignPctY + "%, 0)",
        whiteSpace: 'nowrap'
      }
    }, formattedValue)) : null), portalEl) : null;
  }

  //

  // These are the keys used internally to look up and measure
  // different sides of a bounding box within another
  var sideSchemas = {
    left: {
      side: 'left',
      startKey: 'left',
      lengthKey: 'width',
      crossStartKey: 'top',
      crossLengthKey: 'height',
      fromEnd: false
    },
    right: {
      side: 'right',
      startKey: 'left',
      lengthKey: 'width',
      crossStartKey: 'top',
      crossLengthKey: 'height',
      fromEnd: true
    },
    top: {
      side: 'top',
      startKey: 'top',
      lengthKey: 'height',
      crossStartKey: 'left',
      crossLengthKey: 'width',
      fromEnd: false
    },
    bottom: {
      side: 'bottom',
      startKey: 'top',
      lengthKey: 'height',
      crossStartKey: 'left',
      crossLengthKey: 'width',
      fromEnd: true
    }
  }; // This is the final Tootlip component. It's a render prop
  // that lets you attach handlers to elements, and render a tooltip
  // anchored to them in relation to the parent portal container (either the only
  // one defined or the one referenced by Id).

  function useAnchor(options) {
    var portalDims = useRect(options.portalEl, options.show);
    var anchorDims = useRect(options.anchorEl, options.show);
    var tooltipDims = useRect(options.tooltipEl, options.show);
    var sides = React__default['default'].useMemo(function () {
      var preSides = Array.isArray(options.side) ? options.side : [options.side];
      return preSides.map(function (alignStr) {
        var _ref = alignStr.split(' '),
            side = _ref[0],
            _ref$ = _ref[1],
            align = _ref$ === void 0 ? 'center' : _ref$;

        var incompatibleSide = !['top', 'right', 'bottom', 'left'].find(function (d) {
          return side === d;
        });

        if (incompatibleSide) {
          throw new Error("react-sticker: \"" + side + "\" is not a valid side! Must be one of ['top', 'right', 'bottom', 'left'].");
        }

        var incompatibleAlign = !['center', 'start', 'end', 'top', 'right', 'bottom', 'left'].find(function (d) {
          return align === d;
        });

        if (incompatibleAlign) {
          throw new Error("react-sticker: \"" + align + "\" is not a valid side-alignment! Must be one of ['center', 'start', 'end', 'top', 'right', 'bottom', 'left'].");
        }

        return [side, align];
      }); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(options.side)]); // IF we have all of the dimensions needed to calculate
    // fits, then calculate the fit

    var ready = portalDims && tooltipDims && anchorDims;
    var fit = React__default['default'].useMemo(function () {
      return ready && options.show ? fitOnBestSide({
        portalDims: portalDims,
        tooltipDims: tooltipDims,
        anchorDims: anchorDims,
        sides: sides,
        useLargest: options.useLargest
      }) : null;
    }, [anchorDims, options.show, options.useLargest, portalDims, ready, sides, tooltipDims]);
    return {
      fit: fit,
      style: _extends({
        position: 'absolute',
        visibility: ready ? 'visible' : 'hidden'
      }, fit == null ? void 0 : fit.style)
    };
  } // This function selects the best side for the tooltip by using
  // the ranked fits.

  function fitOnBestSide(_ref2) {
    var portalDims = _ref2.portalDims,
        tooltipDims = _ref2.tooltipDims,
        anchorDims = _ref2.anchorDims,
        sides = _ref2.sides,
        useLargest = _ref2.useLargest;
    var fits = sides.map(function (_ref3) {
      var side = _ref3[0],
          align = _ref3[1];
      return measureFit(_extends({}, sideSchemas[side], {
        align: align,
        portalDims: portalDims,
        tooltipDims: tooltipDims,
        anchorDims: anchorDims
      }));
    });

    if (useLargest) {
      fits.sort(function (a, b) {
        return b.fitRatio - a.fitRatio;
      });
      return fits[0];
    }

    return fits.find(function (fit) {
      return fit.fitRatio >= 1;
    }) || fits[0];
  } // This function takes a side and bunch of calculated dimensions from
  // the portal, tooltip and target. Then it returns
  // the percentage fit and the style to achieve this specific fit


  function measureFit(_ref4) {
    var _style;

    var side = _ref4.side,
        align = _ref4.align,
        startKey = _ref4.startKey,
        lengthKey = _ref4.lengthKey,
        crossStartKey = _ref4.crossStartKey,
        crossLengthKey = _ref4.crossLengthKey,
        fromEnd = _ref4.fromEnd,
        portalDims = _ref4.portalDims,
        tooltipDims = _ref4.tooltipDims,
        anchorDims = _ref4.anchorDims;
    var parentStart = portalDims[startKey];
    var parentLength = portalDims[lengthKey];
    var crossParentStart = portalDims[crossStartKey];
    var crossParentLength = portalDims[crossLengthKey];
    var anchorStart = anchorDims[startKey] - portalDims[startKey];
    var anchorLength = anchorDims[lengthKey];
    var crossAnchorStart = anchorDims[crossStartKey];
    var crossAnchorLength = anchorDims[crossLengthKey];
    var crossAnchorWidth = anchorDims[crossLengthKey];
    var targetLength = tooltipDims[lengthKey];
    var crossTargetLength = tooltipDims[crossLengthKey];
    var targetStart;
    var fitRatio;

    if (!fromEnd) {
      targetStart = anchorStart - targetLength;
      fitRatio = Math.min(anchorStart / targetLength);
    } else {
      targetStart = anchorStart + anchorLength;
      fitRatio = (parentLength - (anchorStart + anchorLength)) / targetLength;
    }

    targetStart = Math.max(parentStart, Math.min(targetStart, parentLength));
    var crossTargetStart;

    if (startKey === 'left') {
      if (align === 'top') {
        align = 'start';
      } else if (align === 'bottom') {
        align = 'end';
      }
    } else {
      if (align === 'left') {
        align = 'start';
      } else if (align === 'right') {
        align = 'end';
      }
    }

    if (!['start', 'center', 'end'].includes(align)) {
      align = 'center';
    }

    if (align === 'start') {
      crossTargetStart = crossAnchorStart;
    } else if (align === 'end') {
      crossTargetStart = crossAnchorStart + crossAnchorWidth - crossTargetLength;
    } else {
      crossTargetStart = crossAnchorStart + crossAnchorLength / 2 - crossTargetLength / 2;
    }

    crossTargetStart = Math.max(crossParentStart, Math.min(crossTargetStart, crossParentLength - crossTargetLength));
    return {
      side: side,
      align: align,
      startKey: startKey,
      lengthKey: lengthKey,
      crossStartKey: crossStartKey,
      crossLengthKey: crossLengthKey,
      fromEnd: fromEnd,
      portalDims: portalDims,
      tooltipDims: tooltipDims,
      anchorDims: anchorDims,
      fitRatio: fitRatio,
      style: (_style = {}, _style[startKey] = targetStart, _style[crossStartKey] = crossTargetStart, _style)
    };
  }

  //
  //
  var showCount = 10;
  var triangleSize = 7;

  var getBackgroundColor = function getBackgroundColor(dark) {
    return dark ? 'rgba(255,255,255,.9)' : 'rgba(0, 26, 39, 0.9)';
  };

  function tooltipRenderer(props) {
    return /*#__PURE__*/React__default['default'].createElement(TooltipRenderer, props);
  }

  function TooltipRenderer(props) {
    var _props$focusedDatum$t, _props$focusedDatum, _focusedDatum$tooltip;

    var latestFit = useLatestWhen(props.anchor.fit, !!props.anchor.fit);

    if (!props.focusedDatum) {
      return null;
    }

    var primaryAxis = props.primaryAxis,
        secondaryAxis = props.secondaryAxis,
        getDatumStyle = props.getDatumStyle,
        focusedDatum = props.focusedDatum,
        secondaryAxes = props.secondaryAxes;

    var _props$getOptions = props.getOptions(),
        tooltip = _props$getOptions.tooltip,
        dark = _props$getOptions.dark;

    var groupDatums = (_props$focusedDatum$t = (_props$focusedDatum = props.focusedDatum) == null ? void 0 : _props$focusedDatum.tooltipGroup) != null ? _props$focusedDatum$t : [];
    var resolvedShowCount = showCount ;
    var length = groupDatums.length; // Get the focused series' index

    var activeIndex = groupDatums.findIndex(function (d) {
      return d === focusedDatum;
    }); // Get the start by going back half of the showCount

    var start = activeIndex > -1 ? activeIndex - resolvedShowCount / 2 : 0; // Make sure it's at least 0

    start = Math.max(start, 0); // Use the start and add the showCount to get the end

    var end = activeIndex > -1 ? start + resolvedShowCount : length; // Don't let the end go passed the length

    end = Math.min(end, length); // Double check we aren't clipping the start

    start = Math.max(end - resolvedShowCount, 0); // Slice the datums by start and end

    var visibleSortedGroupDatums = groupDatums.slice(start, end); // Detect if we have previous items

    var hasPrevious = start > 0; // Or next items

    var hasNext = end < length;
    var finalAlign = (latestFit == null ? void 0 : latestFit.side) + "-" + (latestFit == null ? void 0 : latestFit.align);
    var arrowPosition;
    var triangleStyles;

    if (!arrowPosition) {
      if (finalAlign === 'left-center') {
        arrowPosition = 'right';
      } else if (finalAlign === 'right-center') {
        arrowPosition = 'left';
      } else if (finalAlign === 'top-center') {
        arrowPosition = 'bottom';
      } else if (finalAlign === 'bottom-center') {
        arrowPosition = 'top';
      } else if (finalAlign === 'right-start') {
        arrowPosition = 'bottomLeft';
      } else if (finalAlign === 'right-end') {
        arrowPosition = 'topLeft';
      } else if (finalAlign === 'left-start') {
        arrowPosition = 'bottomRight';
      } else if (finalAlign === 'left-end') {
        arrowPosition = 'topRight';
      }
    }

    var backgroundColor = getBackgroundColor(dark);

    if (arrowPosition === 'bottom') {
      triangleStyles = {
        top: '100%',
        left: '50%',
        transform: 'translate3d(-50%, 0%, 0)',
        borderLeft: triangleSize * 0.8 + "px solid transparent",
        borderRight: triangleSize * 0.8 + "px solid transparent",
        borderTop: triangleSize + "px solid " + backgroundColor
      };
    } else if (arrowPosition === 'top') {
      triangleStyles = {
        top: '0%',
        left: '50%',
        transform: 'translate3d(-50%, -100%, 0)',
        borderLeft: triangleSize * 0.8 + "px solid transparent",
        borderRight: triangleSize * 0.8 + "px solid transparent",
        borderBottom: triangleSize + "px solid " + backgroundColor
      };
    } else if (arrowPosition === 'right') {
      triangleStyles = {
        top: '50%',
        left: '100%',
        transform: 'translate3d(0%, -50%, 0)',
        borderTop: triangleSize * 0.8 + "px solid transparent",
        borderBottom: triangleSize * 0.8 + "px solid transparent",
        borderLeft: triangleSize + "px solid " + backgroundColor
      };
    } else if (arrowPosition === 'left') {
      triangleStyles = {
        top: '50%',
        left: '0%',
        transform: 'translate3d(-100%, -50%, 0)',
        borderTop: triangleSize * 0.8 + "px solid transparent",
        borderBottom: triangleSize * 0.8 + "px solid transparent",
        borderRight: triangleSize + "px solid " + backgroundColor
      };
    } else if (arrowPosition === 'topRight') {
      triangleStyles = {
        top: '0%',
        left: '100%',
        transform: 'translate3d(-50%, -50%, 0) rotate(-45deg)',
        borderTop: triangleSize * 0.8 + "px solid transparent",
        borderBottom: triangleSize * 0.8 + "px solid transparent",
        borderLeft: triangleSize * 2 + "px solid " + backgroundColor
      };
    } else if (arrowPosition === 'bottomRight') {
      triangleStyles = {
        top: '100%',
        left: '100%',
        transform: 'translate3d(-50%, -50%, 0) rotate(45deg)',
        borderTop: triangleSize * 0.8 + "px solid transparent",
        borderBottom: triangleSize * 0.8 + "px solid transparent",
        borderLeft: triangleSize * 2 + "px solid " + backgroundColor
      };
    } else if (arrowPosition === 'topLeft') {
      triangleStyles = {
        top: '0%',
        left: '0%',
        transform: 'translate3d(-50%, -50%, 0) rotate(45deg)',
        borderTop: triangleSize * 0.8 + "px solid transparent",
        borderBottom: triangleSize * 0.8 + "px solid transparent",
        borderRight: triangleSize * 2 + "px solid " + backgroundColor
      };
    } else if (arrowPosition === 'bottomLeft') {
      triangleStyles = {
        top: '100%',
        left: '0%',
        transform: 'translate3d(-50%, -50%, 0) rotate(-45deg)',
        borderTop: triangleSize * 0.8 + "px solid transparent",
        borderBottom: triangleSize * 0.8 + "px solid transparent",
        borderRight: triangleSize * 2 + "px solid " + backgroundColor
      };
    } else {
      triangleStyles = {
        opacity: 0
      };
    }

    return /*#__PURE__*/React__default['default'].createElement("div", {
      style: {
        position: 'relative',
        fontSize: '10px',
        padding: '5px',
        background: getBackgroundColor(dark),
        color: dark ? 'black' : 'white',
        borderRadius: '3px'
      }
    }, /*#__PURE__*/React__default['default'].createElement("div", {
      style: _extends({
        position: 'absolute',
        width: 0,
        height: 0
      }, triangleStyles)
    }), /*#__PURE__*/React__default['default'].createElement("div", null, /*#__PURE__*/React__default['default'].createElement("div", {
      style: {
        marginBottom: '3px',
        textAlign: 'center'
      }
    }, tooltip.groupingMode === 'series' ? /*#__PURE__*/React__default['default'].createElement("strong", null, focusedDatum.seriesLabel) : tooltip.groupingMode === 'secondary' ? /*#__PURE__*/React__default['default'].createElement("strong", null, secondaryAxis.formatters.tooltip(focusedDatum.secondaryValue)) : /*#__PURE__*/React__default['default'].createElement("strong", null, primaryAxis.formatters.tooltip(focusedDatum.primaryValue))), /*#__PURE__*/React__default['default'].createElement("table", {
      style: {
        whiteSpace: 'nowrap'
      }
    }, /*#__PURE__*/React__default['default'].createElement("tbody", null, hasPrevious ? /*#__PURE__*/React__default['default'].createElement("tr", {
      style: {
        opacity: 0.8
      }
    }, /*#__PURE__*/React__default['default'].createElement("td", null), /*#__PURE__*/React__default['default'].createElement("td", null, "..."), /*#__PURE__*/React__default['default'].createElement("td", null)) : null, visibleSortedGroupDatums.map(function (sortedDatum, i) {
      var active = sortedDatum === focusedDatum;
      var datumSecondaryAxis = secondaryAxes.find(function (d) {
        return d.id === sortedDatum.secondaryAxisId;
      });
      return /*#__PURE__*/React__default['default'].createElement("tr", {
        key: i,
        style: {
          opacity: active ? 1 : 0.8,
          fontWeight: active ? 'bold' : undefined
        }
      }, /*#__PURE__*/React__default['default'].createElement("td", {
        style: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }
      }, /*#__PURE__*/React__default['default'].createElement("svg", {
        width: "14",
        height: "14"
      }, /*#__PURE__*/React__default['default'].createElement("circle", {
        cx: "7",
        cy: "7",
        r: "5",
        style: _extends({}, getDatumStyle(sortedDatum), {
          stroke: dark ? 'black' : 'white',
          strokeWidth: active ? 2 : 1
        })
      }))), tooltip.groupingMode === 'series' ? /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null, /*#__PURE__*/React__default['default'].createElement("td", null, primaryAxis.formatters.tooltip(sortedDatum.primaryValue), ": \xA0"), /*#__PURE__*/React__default['default'].createElement("td", {
        style: {
          textAlign: 'right'
        }
      }, datumSecondaryAxis.formatters.tooltip(sortedDatum.secondaryValue))) : tooltip.groupingMode === 'secondary' ? /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null, /*#__PURE__*/React__default['default'].createElement("td", null, sortedDatum.seriesLabel, ": \xA0"), /*#__PURE__*/React__default['default'].createElement("td", {
        style: {
          textAlign: 'right'
        }
      }, primaryAxis.formatters.tooltip(sortedDatum.primaryValue))) : /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null, /*#__PURE__*/React__default['default'].createElement("td", null, sortedDatum.seriesLabel, ": \xA0"), /*#__PURE__*/React__default['default'].createElement("td", {
        style: {
          textAlign: 'right'
        }
      }, datumSecondaryAxis.formatters.tooltip(sortedDatum.secondaryValue))));
    }), hasNext ? /*#__PURE__*/React__default['default'].createElement("tr", {
      style: {
        opacity: 0.8
      }
    }, /*#__PURE__*/React__default['default'].createElement("td", null), /*#__PURE__*/React__default['default'].createElement("td", null, "..."), /*#__PURE__*/React__default['default'].createElement("td", null)) : null, ((_focusedDatum$tooltip = focusedDatum.tooltipGroup) != null ? _focusedDatum$tooltip : []).length > 1 ? props.secondaryAxes.filter(function (d) {
      return d.stacked;
    }).map(function (secondaryAxis, i) {
      var _secondaryAxis$id, _focusedDatum$tooltip2;

      return /*#__PURE__*/React__default['default'].createElement("tr", {
        key: secondaryAxis.id + "_" + i
      }, /*#__PURE__*/React__default['default'].createElement("td", {
        style: {
          paddingTop: '5px'
        }
      }, /*#__PURE__*/React__default['default'].createElement("div", {
        style: {
          width: '12px',
          height: '12px',
          backgroundColor: dark ? 'rgba(0, 26, 39, 0.3)' : 'rgba(255,255,255,.2)',
          borderRadius: '50px'
        }
      })), /*#__PURE__*/React__default['default'].createElement("td", {
        style: {
          paddingTop: '5px'
        }
      }, props.secondaryAxes.length > 1 ? (_secondaryAxis$id = secondaryAxis.id) != null ? _secondaryAxis$id : "Axis " + (i + 1) + " " : '', "Total: \xA0"), /*#__PURE__*/React__default['default'].createElement("td", {
        style: {
          paddingTop: '5px'
        }
      }, secondaryAxis.formatters.scale(sum((_focusedDatum$tooltip2 = focusedDatum.tooltipGroup) != null ? _focusedDatum$tooltip2 : [], function (d) {
        return d.secondaryValue;
      }))));
    }) : null))));
  }

  var _excluded$1 = ["visibility"];

  function defaultTooltip(options) {
    var _options$align, _options$alignPriorit, _options$padding, _options$arrowPadding, _options$render;

    if (options === void 0) {
      options = {};
    }

    if (options === true) {
      options = {
        show: true
      };
    } else if (options === false) {
      options = {
        show: false
      };
    }

    return _extends({
      show: true
    }, options, {
      align: (_options$align = options.align) != null ? _options$align : 'auto',
      alignPriority: (_options$alignPriorit = options.alignPriority) != null ? _options$alignPriorit : ['right', 'topRight', 'bottomRight', 'left', 'topLeft', 'bottomLeft', 'top', 'bottom'],
      padding: (_options$padding = options.padding) != null ? _options$padding : 5,
      arrowPadding: (_options$arrowPadding = options.arrowPadding) != null ? _options$arrowPadding : 7,
      // anchor: options.anchor ?? 'closest',
      render: (_options$render = options.render) != null ? _options$render : tooltipRenderer
    });
  }
  function Tooltip() {
    var _secondaryAxes$find, _useLatestWhen;

    var _useChartContext = useChartContext(),
        focusedDatumState = _useChartContext.focusedDatumState,
        getOptions = _useChartContext.getOptions,
        primaryAxis = _useChartContext.primaryAxis,
        secondaryAxes = _useChartContext.secondaryAxes,
        getDatumStatusStyle = _useChartContext.getDatumStatusStyle,
        svgRef = _useChartContext.svgRef;

    var focusedDatum = focusedDatumState[0];
    var latestFocusedDatum = useLatestWhen(focusedDatum, !!focusedDatum);
    var secondaryAxis = (_secondaryAxes$find = secondaryAxes.find(function (d) {
      return d.id === (latestFocusedDatum == null ? void 0 : latestFocusedDatum.secondaryAxisId);
    })) != null ? _secondaryAxes$find : secondaryAxes[0];
    var portalEl = usePortalElement();

    var _React$useState = React__default['default'].useState(),
        tooltipEl = _React$useState[0],
        setTooltipEl = _React$useState[1];

    var svgRect = useRect(svgRef.current, !!(focusedDatum != null && focusedDatum.element));
    var anchorEl = React__default['default'].useMemo(function () {
      var _latestFocusedDatum$e, _latestFocusedDatum$e2, _anchorRect$left, _anchorRect$top, _anchorRect$width, _anchorRect$height;

      var anchorRect = (_latestFocusedDatum$e = latestFocusedDatum == null ? void 0 : (_latestFocusedDatum$e2 = latestFocusedDatum.element) == null ? void 0 : _latestFocusedDatum$e2.getBoundingClientRect()) != null ? _latestFocusedDatum$e : null;

      if (!anchorRect) {
        return null;
      }

      if (!svgRect) return;
      var translateX = (_anchorRect$left = anchorRect.left) != null ? _anchorRect$left : 0;
      var translateY = (_anchorRect$top = anchorRect.top) != null ? _anchorRect$top : 0;
      var width = (_anchorRect$width = anchorRect.width) != null ? _anchorRect$width : 0;
      var height = (_anchorRect$height = anchorRect.height) != null ? _anchorRect$height : 0;
      var box = {
        x: translateY,
        y: translateX,
        top: translateY,
        left: translateX,
        bottom: translateY + width,
        right: translateX + height,
        width: width,
        height: height,
        toJSON: function toJSON() {
          return {};
        }
      };

      box.toJSON = function () {
        return box;
      };

      return {
        getBoundingClientRect: function getBoundingClientRect() {
          return box;
        }
      };
    }, [latestFocusedDatum == null ? void 0 : latestFocusedDatum.element, svgRect]);
    var anchor = useAnchor({
      show: !!focusedDatum,
      portalEl: portalEl,
      anchorEl: anchorEl,
      tooltipEl: tooltipEl,
      side: ['right', 'left', 'top', 'bottom']
    });
    var previousAnchor = usePrevious(anchor);
    var latestStableAnchor = (_useLatestWhen = useLatestWhen(anchor, !!anchor.fit)) != null ? _useLatestWhen : anchor;

    var _latestStableAnchor$s = latestStableAnchor.style;
        _latestStableAnchor$s.visibility;
        var anchorStyle = _objectWithoutPropertiesLoose(_latestStableAnchor$s, _excluded$1);

    var tooltipRef = React__default['default'].useRef(null);
    var immediate = Number.isNaN(previousAnchor == null ? void 0 : previousAnchor.style.left);
    var tooltipXSpring = useSpring(anchorStyle.left || 0, [1, 210, 30], function () {
      if (tooltipRef.current) {
        tooltipRef.current.style.transform = "translate(" + tooltipXSpring.x() + "px, " + tooltipYSpring.x() + "px)";
      }
    }, immediate);
    var tooltipYSpring = useSpring(anchorStyle.top || 0, [1, 210, 30], function () {
      if (tooltipRef.current) {
        tooltipRef.current.style.transform = "translate(" + tooltipXSpring.x() + "px, " + tooltipYSpring.x() + "px)";
      }
    }, immediate); // const springProps = useSpring({
    //   ...anchorStyle,
    //   left: anchorStyle.left || 0,
    //   top: anchorStyle.top || 0,
    //   config: { mass: 1, tension: 210, friction: 30 },
    //   immediate: key => {
    //     if (['left', 'top'].includes(key)) {
    //       return Number.isNaN(previousAnchor?.style.left)
    //     }
    //     return false
    //   },
    // })

    var show = getOptions().tooltip.show;
    var latestFit = useLatestWhen(anchor.fit, !!anchor.fit);
    return show && portalEl ? /*#__PURE__*/ReactDOM__default['default'].createPortal( /*#__PURE__*/React__default['default'].createElement("div", {
      ref: tooltipRef,
      style: {
        position: anchorStyle.position,
        opacity: !!focusedDatum ? 1 : 0,
        transition: 'opacity .3s ease'
      }
    }, /*#__PURE__*/React__default['default'].createElement("div", {
      ref: function ref(el) {
        return setTooltipEl(el);
      },
      style: _extends({
        fontFamily: 'sans-serif'
      }, (latestFit == null ? void 0 : latestFit.startKey) === 'left' ? {
        padding: '0 10px'
      } : {
        padding: '10px 0'
      })
    }, getOptions().tooltip.render({
      getOptions: getOptions,
      focusedDatum: latestFocusedDatum,
      primaryAxis: primaryAxis,
      secondaryAxes: secondaryAxes,
      secondaryAxis: secondaryAxis,
      getDatumStyle: function getDatumStyle(datum) {
        return getDatumStatusStyle(datum, focusedDatum);
      },
      anchor: anchor
    }))), portalEl) : null;
  }

  const EPSILON = Math.pow(2, -52);
  const EDGE_STACK = new Uint32Array(512);
  class Delaunator {
    static from(points, getX = defaultGetX, getY = defaultGetY) {
      const n = points.length;
      const coords = new Float64Array(n * 2);

      for (let i = 0; i < n; i++) {
        const p = points[i];
        coords[2 * i] = getX(p);
        coords[2 * i + 1] = getY(p);
      }

      return new Delaunator(coords);
    }

    constructor(coords) {
      const n = coords.length >> 1;
      if (n > 0 && typeof coords[0] !== 'number') throw new Error('Expected coords to contain numbers.');
      this.coords = coords; // arrays that will store the triangulation graph

      const maxTriangles = Math.max(2 * n - 5, 0);
      this._triangles = new Uint32Array(maxTriangles * 3);
      this._halfedges = new Int32Array(maxTriangles * 3); // temporary arrays for tracking the edges of the advancing convex hull

      this._hashSize = Math.ceil(Math.sqrt(n));
      this._hullPrev = new Uint32Array(n); // edge to prev edge

      this._hullNext = new Uint32Array(n); // edge to next edge

      this._hullTri = new Uint32Array(n); // edge to adjacent triangle

      this._hullHash = new Int32Array(this._hashSize).fill(-1); // angular edge hash
      // temporary arrays for sorting points

      this._ids = new Uint32Array(n);
      this._dists = new Float64Array(n);
      this.update();
    }

    update() {
      const {
        coords,
        _hullPrev: hullPrev,
        _hullNext: hullNext,
        _hullTri: hullTri,
        _hullHash: hullHash
      } = this;
      const n = coords.length >> 1; // populate an array of point indices; calculate input data bbox

      let minX = Infinity;
      let minY = Infinity;
      let maxX = -Infinity;
      let maxY = -Infinity;

      for (let i = 0; i < n; i++) {
        const x = coords[2 * i];
        const y = coords[2 * i + 1];
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
        this._ids[i] = i;
      }

      const cx = (minX + maxX) / 2;
      const cy = (minY + maxY) / 2;
      let minDist = Infinity;
      let i0, i1, i2; // pick a seed point close to the center

      for (let i = 0; i < n; i++) {
        const d = dist(cx, cy, coords[2 * i], coords[2 * i + 1]);

        if (d < minDist) {
          i0 = i;
          minDist = d;
        }
      }

      const i0x = coords[2 * i0];
      const i0y = coords[2 * i0 + 1];
      minDist = Infinity; // find the point closest to the seed

      for (let i = 0; i < n; i++) {
        if (i === i0) continue;
        const d = dist(i0x, i0y, coords[2 * i], coords[2 * i + 1]);

        if (d < minDist && d > 0) {
          i1 = i;
          minDist = d;
        }
      }

      let i1x = coords[2 * i1];
      let i1y = coords[2 * i1 + 1];
      let minRadius = Infinity; // find the third point which forms the smallest circumcircle with the first two

      for (let i = 0; i < n; i++) {
        if (i === i0 || i === i1) continue;
        const r = circumradius(i0x, i0y, i1x, i1y, coords[2 * i], coords[2 * i + 1]);

        if (r < minRadius) {
          i2 = i;
          minRadius = r;
        }
      }

      let i2x = coords[2 * i2];
      let i2y = coords[2 * i2 + 1];

      if (minRadius === Infinity) {
        // order collinear points by dx (or dy if all x are identical)
        // and return the list as a hull
        for (let i = 0; i < n; i++) {
          this._dists[i] = coords[2 * i] - coords[0] || coords[2 * i + 1] - coords[1];
        }

        quicksort(this._ids, this._dists, 0, n - 1);
        const hull = new Uint32Array(n);
        let j = 0;

        for (let i = 0, d0 = -Infinity; i < n; i++) {
          const id = this._ids[i];

          if (this._dists[id] > d0) {
            hull[j++] = id;
            d0 = this._dists[id];
          }
        }

        this.hull = hull.subarray(0, j);
        this.triangles = new Uint32Array(0);
        this.halfedges = new Uint32Array(0);
        return;
      } // swap the order of the seed points for counter-clockwise orientation


      if (orient(i0x, i0y, i1x, i1y, i2x, i2y)) {
        const i = i1;
        const x = i1x;
        const y = i1y;
        i1 = i2;
        i1x = i2x;
        i1y = i2y;
        i2 = i;
        i2x = x;
        i2y = y;
      }

      const center = circumcenter(i0x, i0y, i1x, i1y, i2x, i2y);
      this._cx = center.x;
      this._cy = center.y;

      for (let i = 0; i < n; i++) {
        this._dists[i] = dist(coords[2 * i], coords[2 * i + 1], center.x, center.y);
      } // sort the points by distance from the seed triangle circumcenter


      quicksort(this._ids, this._dists, 0, n - 1); // set up the seed triangle as the starting hull

      this._hullStart = i0;
      let hullSize = 3;
      hullNext[i0] = hullPrev[i2] = i1;
      hullNext[i1] = hullPrev[i0] = i2;
      hullNext[i2] = hullPrev[i1] = i0;
      hullTri[i0] = 0;
      hullTri[i1] = 1;
      hullTri[i2] = 2;
      hullHash.fill(-1);
      hullHash[this._hashKey(i0x, i0y)] = i0;
      hullHash[this._hashKey(i1x, i1y)] = i1;
      hullHash[this._hashKey(i2x, i2y)] = i2;
      this.trianglesLen = 0;

      this._addTriangle(i0, i1, i2, -1, -1, -1);

      for (let k = 0, xp, yp; k < this._ids.length; k++) {
        const i = this._ids[k];
        const x = coords[2 * i];
        const y = coords[2 * i + 1]; // skip near-duplicate points

        if (k > 0 && Math.abs(x - xp) <= EPSILON && Math.abs(y - yp) <= EPSILON) continue;
        xp = x;
        yp = y; // skip seed triangle points

        if (i === i0 || i === i1 || i === i2) continue; // find a visible edge on the convex hull using edge hash

        let start = 0;

        for (let j = 0, key = this._hashKey(x, y); j < this._hashSize; j++) {
          start = hullHash[(key + j) % this._hashSize];
          if (start !== -1 && start !== hullNext[start]) break;
        }

        start = hullPrev[start];
        let e = start,
            q;

        while (q = hullNext[e], !orient(x, y, coords[2 * e], coords[2 * e + 1], coords[2 * q], coords[2 * q + 1])) {
          e = q;

          if (e === start) {
            e = -1;
            break;
          }
        }

        if (e === -1) continue; // likely a near-duplicate point; skip it
        // add the first triangle from the point

        let t = this._addTriangle(e, i, hullNext[e], -1, -1, hullTri[e]); // recursively flip triangles from the point until they satisfy the Delaunay condition


        hullTri[i] = this._legalize(t + 2);
        hullTri[e] = t; // keep track of boundary triangles on the hull

        hullSize++; // walk forward through the hull, adding more triangles and flipping recursively

        let n = hullNext[e];

        while (q = hullNext[n], orient(x, y, coords[2 * n], coords[2 * n + 1], coords[2 * q], coords[2 * q + 1])) {
          t = this._addTriangle(n, i, q, hullTri[i], -1, hullTri[n]);
          hullTri[i] = this._legalize(t + 2);
          hullNext[n] = n; // mark as removed

          hullSize--;
          n = q;
        } // walk backward from the other side, adding more triangles and flipping


        if (e === start) {
          while (q = hullPrev[e], orient(x, y, coords[2 * q], coords[2 * q + 1], coords[2 * e], coords[2 * e + 1])) {
            t = this._addTriangle(q, i, e, -1, hullTri[e], hullTri[q]);

            this._legalize(t + 2);

            hullTri[q] = t;
            hullNext[e] = e; // mark as removed

            hullSize--;
            e = q;
          }
        } // update the hull indices


        this._hullStart = hullPrev[i] = e;
        hullNext[e] = hullPrev[n] = i;
        hullNext[i] = n; // save the two new edges in the hash table

        hullHash[this._hashKey(x, y)] = i;
        hullHash[this._hashKey(coords[2 * e], coords[2 * e + 1])] = e;
      }

      this.hull = new Uint32Array(hullSize);

      for (let i = 0, e = this._hullStart; i < hullSize; i++) {
        this.hull[i] = e;
        e = hullNext[e];
      } // trim typed triangle mesh arrays


      this.triangles = this._triangles.subarray(0, this.trianglesLen);
      this.halfedges = this._halfedges.subarray(0, this.trianglesLen);
    }

    _hashKey(x, y) {
      return Math.floor(pseudoAngle(x - this._cx, y - this._cy) * this._hashSize) % this._hashSize;
    }

    _legalize(a) {
      const {
        _triangles: triangles,
        _halfedges: halfedges,
        coords
      } = this;
      let i = 0;
      let ar = 0; // recursion eliminated with a fixed-size stack

      while (true) {
        const b = halfedges[a];
        /* if the pair of triangles doesn't satisfy the Delaunay condition
         * (p1 is inside the circumcircle of [p0, pl, pr]), flip them,
         * then do the same check/flip recursively for the new pair of triangles
         *
         *           pl                    pl
         *          /||\                  /  \
         *       al/ || \bl            al/    \a
         *        /  ||  \              /      \
         *       /  a||b  \    flip    /___ar___\
         *     p0\   ||   /p1   =>   p0\---bl---/p1
         *        \  ||  /              \      /
         *       ar\ || /br             b\    /br
         *          \||/                  \  /
         *           pr                    pr
         */

        const a0 = a - a % 3;
        ar = a0 + (a + 2) % 3;

        if (b === -1) {
          // convex hull edge
          if (i === 0) break;
          a = EDGE_STACK[--i];
          continue;
        }

        const b0 = b - b % 3;
        const al = a0 + (a + 1) % 3;
        const bl = b0 + (b + 2) % 3;
        const p0 = triangles[ar];
        const pr = triangles[a];
        const pl = triangles[al];
        const p1 = triangles[bl];
        const illegal = inCircle(coords[2 * p0], coords[2 * p0 + 1], coords[2 * pr], coords[2 * pr + 1], coords[2 * pl], coords[2 * pl + 1], coords[2 * p1], coords[2 * p1 + 1]);

        if (illegal) {
          triangles[a] = p1;
          triangles[b] = p0;
          const hbl = halfedges[bl]; // edge swapped on the other side of the hull (rare); fix the halfedge reference

          if (hbl === -1) {
            let e = this._hullStart;

            do {
              if (this._hullTri[e] === bl) {
                this._hullTri[e] = a;
                break;
              }

              e = this._hullPrev[e];
            } while (e !== this._hullStart);
          }

          this._link(a, hbl);

          this._link(b, halfedges[ar]);

          this._link(ar, bl);

          const br = b0 + (b + 1) % 3; // don't worry about hitting the cap: it can only happen on extremely degenerate input

          if (i < EDGE_STACK.length) {
            EDGE_STACK[i++] = br;
          }
        } else {
          if (i === 0) break;
          a = EDGE_STACK[--i];
        }
      }

      return ar;
    }

    _link(a, b) {
      this._halfedges[a] = b;
      if (b !== -1) this._halfedges[b] = a;
    } // add a new triangle given vertex indices and adjacent half-edge ids


    _addTriangle(i0, i1, i2, a, b, c) {
      const t = this.trianglesLen;
      this._triangles[t] = i0;
      this._triangles[t + 1] = i1;
      this._triangles[t + 2] = i2;

      this._link(t, a);

      this._link(t + 1, b);

      this._link(t + 2, c);

      this.trianglesLen += 3;
      return t;
    }

  } // monotonically increases with real angle, but doesn't need expensive trigonometry

  function pseudoAngle(dx, dy) {
    const p = dx / (Math.abs(dx) + Math.abs(dy));
    return (dy > 0 ? 3 - p : 1 + p) / 4; // [0..1]
  }

  function dist(ax, ay, bx, by) {
    const dx = ax - bx;
    const dy = ay - by;
    return dx * dx + dy * dy;
  } // return 2d orientation sign if we're confident in it through J. Shewchuk's error bound check


  function orientIfSure(px, py, rx, ry, qx, qy) {
    const l = (ry - py) * (qx - px);
    const r = (rx - px) * (qy - py);
    return Math.abs(l - r) >= 3.3306690738754716e-16 * Math.abs(l + r) ? l - r : 0;
  } // a more robust orientation test that's stable in a given triangle (to fix robustness issues)


  function orient(rx, ry, qx, qy, px, py) {
    const sign = orientIfSure(px, py, rx, ry, qx, qy) || orientIfSure(rx, ry, qx, qy, px, py) || orientIfSure(qx, qy, px, py, rx, ry);
    return sign < 0;
  }

  function inCircle(ax, ay, bx, by, cx, cy, px, py) {
    const dx = ax - px;
    const dy = ay - py;
    const ex = bx - px;
    const ey = by - py;
    const fx = cx - px;
    const fy = cy - py;
    const ap = dx * dx + dy * dy;
    const bp = ex * ex + ey * ey;
    const cp = fx * fx + fy * fy;
    return dx * (ey * cp - bp * fy) - dy * (ex * cp - bp * fx) + ap * (ex * fy - ey * fx) < 0;
  }

  function circumradius(ax, ay, bx, by, cx, cy) {
    const dx = bx - ax;
    const dy = by - ay;
    const ex = cx - ax;
    const ey = cy - ay;
    const bl = dx * dx + dy * dy;
    const cl = ex * ex + ey * ey;
    const d = 0.5 / (dx * ey - dy * ex);
    const x = (ey * bl - dy * cl) * d;
    const y = (dx * cl - ex * bl) * d;
    return x * x + y * y;
  }

  function circumcenter(ax, ay, bx, by, cx, cy) {
    const dx = bx - ax;
    const dy = by - ay;
    const ex = cx - ax;
    const ey = cy - ay;
    const bl = dx * dx + dy * dy;
    const cl = ex * ex + ey * ey;
    const d = 0.5 / (dx * ey - dy * ex);
    const x = ax + (ey * bl - dy * cl) * d;
    const y = ay + (dx * cl - ex * bl) * d;
    return {
      x,
      y
    };
  }

  function quicksort(ids, dists, left, right) {
    if (right - left <= 20) {
      for (let i = left + 1; i <= right; i++) {
        const temp = ids[i];
        const tempDist = dists[temp];
        let j = i - 1;

        while (j >= left && dists[ids[j]] > tempDist) ids[j + 1] = ids[j--];

        ids[j + 1] = temp;
      }
    } else {
      const median = left + right >> 1;
      let i = left + 1;
      let j = right;
      swap(ids, median, i);
      if (dists[ids[left]] > dists[ids[right]]) swap(ids, left, right);
      if (dists[ids[i]] > dists[ids[right]]) swap(ids, i, right);
      if (dists[ids[left]] > dists[ids[i]]) swap(ids, left, i);
      const temp = ids[i];
      const tempDist = dists[temp];

      while (true) {
        do i++; while (dists[ids[i]] < tempDist);

        do j--; while (dists[ids[j]] > tempDist);

        if (j < i) break;
        swap(ids, i, j);
      }

      ids[left + 1] = ids[j];
      ids[j] = temp;

      if (right - i + 1 >= j - left) {
        quicksort(ids, dists, i, right);
        quicksort(ids, dists, left, j - 1);
      } else {
        quicksort(ids, dists, left, j - 1);
        quicksort(ids, dists, i, right);
      }
    }
  }

  function swap(arr, i, j) {
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }

  function defaultGetX(p) {
    return p[0];
  }

  function defaultGetY(p) {
    return p[1];
  }

  const epsilon = 1e-6;
  class Path {
    constructor() {
      this._x0 = this._y0 = // start of current subpath
      this._x1 = this._y1 = null; // end of current subpath

      this._ = "";
    }

    moveTo(x, y) {
      this._ += `M${this._x0 = this._x1 = +x},${this._y0 = this._y1 = +y}`;
    }

    closePath() {
      if (this._x1 !== null) {
        this._x1 = this._x0, this._y1 = this._y0;
        this._ += "Z";
      }
    }

    lineTo(x, y) {
      this._ += `L${this._x1 = +x},${this._y1 = +y}`;
    }

    arc(x, y, r) {
      x = +x, y = +y, r = +r;
      const x0 = x + r;
      const y0 = y;
      if (r < 0) throw new Error("negative radius");
      if (this._x1 === null) this._ += `M${x0},${y0}`;else if (Math.abs(this._x1 - x0) > epsilon || Math.abs(this._y1 - y0) > epsilon) this._ += "L" + x0 + "," + y0;
      if (!r) return;
      this._ += `A${r},${r},0,1,1,${x - r},${y}A${r},${r},0,1,1,${this._x1 = x0},${this._y1 = y0}`;
    }

    rect(x, y, w, h) {
      this._ += `M${this._x0 = this._x1 = +x},${this._y0 = this._y1 = +y}h${+w}v${+h}h${-w}Z`;
    }

    value() {
      return this._ || null;
    }

  }

  class Polygon {
    constructor() {
      this._ = [];
    }

    moveTo(x, y) {
      this._.push([x, y]);
    }

    closePath() {
      this._.push(this._[0].slice());
    }

    lineTo(x, y) {
      this._.push([x, y]);
    }

    value() {
      return this._.length ? this._ : null;
    }

  }

  class Voronoi$1 {
    constructor(delaunay, [xmin, ymin, xmax, ymax] = [0, 0, 960, 500]) {
      if (!((xmax = +xmax) >= (xmin = +xmin)) || !((ymax = +ymax) >= (ymin = +ymin))) throw new Error("invalid bounds");
      this.delaunay = delaunay;
      this._circumcenters = new Float64Array(delaunay.points.length * 2);
      this.vectors = new Float64Array(delaunay.points.length * 2);
      this.xmax = xmax, this.xmin = xmin;
      this.ymax = ymax, this.ymin = ymin;

      this._init();
    }

    update() {
      this.delaunay.update();

      this._init();

      return this;
    }

    _init() {
      const {
        delaunay: {
          points,
          hull,
          triangles
        },
        vectors
      } = this; // Compute circumcenters.

      const circumcenters = this.circumcenters = this._circumcenters.subarray(0, triangles.length / 3 * 2);

      for (let i = 0, j = 0, n = triangles.length, x, y; i < n; i += 3, j += 2) {
        const t1 = triangles[i] * 2;
        const t2 = triangles[i + 1] * 2;
        const t3 = triangles[i + 2] * 2;
        const x1 = points[t1];
        const y1 = points[t1 + 1];
        const x2 = points[t2];
        const y2 = points[t2 + 1];
        const x3 = points[t3];
        const y3 = points[t3 + 1];
        const dx = x2 - x1;
        const dy = y2 - y1;
        const ex = x3 - x1;
        const ey = y3 - y1;
        const bl = dx * dx + dy * dy;
        const cl = ex * ex + ey * ey;
        const ab = (dx * ey - dy * ex) * 2;

        if (!ab) {
          // degenerate case (collinear diagram)
          x = (x1 + x3) / 2 - 1e8 * ey;
          y = (y1 + y3) / 2 + 1e8 * ex;
        } else if (Math.abs(ab) < 1e-8) {
          // almost equal points (degenerate triangle)
          x = (x1 + x3) / 2;
          y = (y1 + y3) / 2;
        } else {
          const d = 1 / ab;
          x = x1 + (ey * bl - dy * cl) * d;
          y = y1 + (dx * cl - ex * bl) * d;
        }

        circumcenters[j] = x;
        circumcenters[j + 1] = y;
      } // Compute exterior cell rays.


      let h = hull[hull.length - 1];
      let p0,
          p1 = h * 4;
      let x0,
          x1 = points[2 * h];
      let y0,
          y1 = points[2 * h + 1];
      vectors.fill(0);

      for (let i = 0; i < hull.length; ++i) {
        h = hull[i];
        p0 = p1, x0 = x1, y0 = y1;
        p1 = h * 4, x1 = points[2 * h], y1 = points[2 * h + 1];
        vectors[p0 + 2] = vectors[p1] = y0 - y1;
        vectors[p0 + 3] = vectors[p1 + 1] = x1 - x0;
      }
    }

    render(context) {
      const buffer = context == null ? context = new Path() : undefined;
      const {
        delaunay: {
          halfedges,
          inedges,
          hull
        },
        circumcenters,
        vectors
      } = this;
      if (hull.length <= 1) return null;

      for (let i = 0, n = halfedges.length; i < n; ++i) {
        const j = halfedges[i];
        if (j < i) continue;
        const ti = Math.floor(i / 3) * 2;
        const tj = Math.floor(j / 3) * 2;
        const xi = circumcenters[ti];
        const yi = circumcenters[ti + 1];
        const xj = circumcenters[tj];
        const yj = circumcenters[tj + 1];

        this._renderSegment(xi, yi, xj, yj, context);
      }

      let h0,
          h1 = hull[hull.length - 1];

      for (let i = 0; i < hull.length; ++i) {
        h0 = h1, h1 = hull[i];
        const t = Math.floor(inedges[h1] / 3) * 2;
        const x = circumcenters[t];
        const y = circumcenters[t + 1];
        const v = h0 * 4;

        const p = this._project(x, y, vectors[v + 2], vectors[v + 3]);

        if (p) this._renderSegment(x, y, p[0], p[1], context);
      }

      return buffer && buffer.value();
    }

    renderBounds(context) {
      const buffer = context == null ? context = new Path() : undefined;
      context.rect(this.xmin, this.ymin, this.xmax - this.xmin, this.ymax - this.ymin);
      return buffer && buffer.value();
    }

    renderCell(i, context) {
      const buffer = context == null ? context = new Path() : undefined;

      const points = this._clip(i);

      if (points === null || !points.length) return;
      context.moveTo(points[0], points[1]);
      let n = points.length;

      while (points[0] === points[n - 2] && points[1] === points[n - 1] && n > 1) n -= 2;

      for (let i = 2; i < n; i += 2) {
        if (points[i] !== points[i - 2] || points[i + 1] !== points[i - 1]) context.lineTo(points[i], points[i + 1]);
      }

      context.closePath();
      return buffer && buffer.value();
    }

    *cellPolygons() {
      const {
        delaunay: {
          points
        }
      } = this;

      for (let i = 0, n = points.length / 2; i < n; ++i) {
        const cell = this.cellPolygon(i);
        if (cell) cell.index = i, yield cell;
      }
    }

    cellPolygon(i) {
      const polygon = new Polygon();
      this.renderCell(i, polygon);
      return polygon.value();
    }

    _renderSegment(x0, y0, x1, y1, context) {
      let S;

      const c0 = this._regioncode(x0, y0);

      const c1 = this._regioncode(x1, y1);

      if (c0 === 0 && c1 === 0) {
        context.moveTo(x0, y0);
        context.lineTo(x1, y1);
      } else if (S = this._clipSegment(x0, y0, x1, y1, c0, c1)) {
        context.moveTo(S[0], S[1]);
        context.lineTo(S[2], S[3]);
      }
    }

    contains(i, x, y) {
      if ((x = +x, x !== x) || (y = +y, y !== y)) return false;
      return this.delaunay._step(i, x, y) === i;
    }

    *neighbors(i) {
      const ci = this._clip(i);

      if (ci) for (const j of this.delaunay.neighbors(i)) {
        const cj = this._clip(j); // find the common edge


        if (cj) loop: for (let ai = 0, li = ci.length; ai < li; ai += 2) {
          for (let aj = 0, lj = cj.length; aj < lj; aj += 2) {
            if (ci[ai] == cj[aj] && ci[ai + 1] == cj[aj + 1] && ci[(ai + 2) % li] == cj[(aj + lj - 2) % lj] && ci[(ai + 3) % li] == cj[(aj + lj - 1) % lj]) {
              yield j;
              break loop;
            }
          }
        }
      }
    }

    _cell(i) {
      const {
        circumcenters,
        delaunay: {
          inedges,
          halfedges,
          triangles
        }
      } = this;
      const e0 = inedges[i];
      if (e0 === -1) return null; // coincident point

      const points = [];
      let e = e0;

      do {
        const t = Math.floor(e / 3);
        points.push(circumcenters[t * 2], circumcenters[t * 2 + 1]);
        e = e % 3 === 2 ? e - 2 : e + 1;
        if (triangles[e] !== i) break; // bad triangulation

        e = halfedges[e];
      } while (e !== e0 && e !== -1);

      return points;
    }

    _clip(i) {
      // degenerate case (1 valid point: return the box)
      if (i === 0 && this.delaunay.hull.length === 1) {
        return [this.xmax, this.ymin, this.xmax, this.ymax, this.xmin, this.ymax, this.xmin, this.ymin];
      }

      const points = this._cell(i);

      if (points === null) return null;
      const {
        vectors: V
      } = this;
      const v = i * 4;
      return V[v] || V[v + 1] ? this._clipInfinite(i, points, V[v], V[v + 1], V[v + 2], V[v + 3]) : this._clipFinite(i, points);
    }

    _clipFinite(i, points) {
      const n = points.length;
      let P = null;
      let x0,
          y0,
          x1 = points[n - 2],
          y1 = points[n - 1];

      let c0,
          c1 = this._regioncode(x1, y1);

      let e0, e1;

      for (let j = 0; j < n; j += 2) {
        x0 = x1, y0 = y1, x1 = points[j], y1 = points[j + 1];
        c0 = c1, c1 = this._regioncode(x1, y1);

        if (c0 === 0 && c1 === 0) {
          e0 = e1, e1 = 0;
          if (P) P.push(x1, y1);else P = [x1, y1];
        } else {
          let S, sx0, sy0, sx1, sy1;

          if (c0 === 0) {
            if ((S = this._clipSegment(x0, y0, x1, y1, c0, c1)) === null) continue;
            [sx0, sy0, sx1, sy1] = S;
          } else {
            if ((S = this._clipSegment(x1, y1, x0, y0, c1, c0)) === null) continue;
            [sx1, sy1, sx0, sy0] = S;
            e0 = e1, e1 = this._edgecode(sx0, sy0);
            if (e0 && e1) this._edge(i, e0, e1, P, P.length);
            if (P) P.push(sx0, sy0);else P = [sx0, sy0];
          }

          e0 = e1, e1 = this._edgecode(sx1, sy1);
          if (e0 && e1) this._edge(i, e0, e1, P, P.length);
          if (P) P.push(sx1, sy1);else P = [sx1, sy1];
        }
      }

      if (P) {
        e0 = e1, e1 = this._edgecode(P[0], P[1]);
        if (e0 && e1) this._edge(i, e0, e1, P, P.length);
      } else if (this.contains(i, (this.xmin + this.xmax) / 2, (this.ymin + this.ymax) / 2)) {
        return [this.xmax, this.ymin, this.xmax, this.ymax, this.xmin, this.ymax, this.xmin, this.ymin];
      }

      return P;
    }

    _clipSegment(x0, y0, x1, y1, c0, c1) {
      while (true) {
        if (c0 === 0 && c1 === 0) return [x0, y0, x1, y1];
        if (c0 & c1) return null;
        let x,
            y,
            c = c0 || c1;
        if (c & 0b1000) x = x0 + (x1 - x0) * (this.ymax - y0) / (y1 - y0), y = this.ymax;else if (c & 0b0100) x = x0 + (x1 - x0) * (this.ymin - y0) / (y1 - y0), y = this.ymin;else if (c & 0b0010) y = y0 + (y1 - y0) * (this.xmax - x0) / (x1 - x0), x = this.xmax;else y = y0 + (y1 - y0) * (this.xmin - x0) / (x1 - x0), x = this.xmin;
        if (c0) x0 = x, y0 = y, c0 = this._regioncode(x0, y0);else x1 = x, y1 = y, c1 = this._regioncode(x1, y1);
      }
    }

    _clipInfinite(i, points, vx0, vy0, vxn, vyn) {
      let P = Array.from(points),
          p;
      if (p = this._project(P[0], P[1], vx0, vy0)) P.unshift(p[0], p[1]);
      if (p = this._project(P[P.length - 2], P[P.length - 1], vxn, vyn)) P.push(p[0], p[1]);

      if (P = this._clipFinite(i, P)) {
        for (let j = 0, n = P.length, c0, c1 = this._edgecode(P[n - 2], P[n - 1]); j < n; j += 2) {
          c0 = c1, c1 = this._edgecode(P[j], P[j + 1]);
          if (c0 && c1) j = this._edge(i, c0, c1, P, j), n = P.length;
        }
      } else if (this.contains(i, (this.xmin + this.xmax) / 2, (this.ymin + this.ymax) / 2)) {
        P = [this.xmin, this.ymin, this.xmax, this.ymin, this.xmax, this.ymax, this.xmin, this.ymax];
      }

      return P;
    }

    _edge(i, e0, e1, P, j) {
      while (e0 !== e1) {
        let x, y;

        switch (e0) {
          case 0b0101:
            e0 = 0b0100;
            continue;
          // top-left

          case 0b0100:
            e0 = 0b0110, x = this.xmax, y = this.ymin;
            break;
          // top

          case 0b0110:
            e0 = 0b0010;
            continue;
          // top-right

          case 0b0010:
            e0 = 0b1010, x = this.xmax, y = this.ymax;
            break;
          // right

          case 0b1010:
            e0 = 0b1000;
            continue;
          // bottom-right

          case 0b1000:
            e0 = 0b1001, x = this.xmin, y = this.ymax;
            break;
          // bottom

          case 0b1001:
            e0 = 0b0001;
            continue;
          // bottom-left

          case 0b0001:
            e0 = 0b0101, x = this.xmin, y = this.ymin;
            break;
          // left
        }

        if ((P[j] !== x || P[j + 1] !== y) && this.contains(i, x, y)) {
          P.splice(j, 0, x, y), j += 2;
        }
      }

      if (P.length > 4) {
        for (let i = 0; i < P.length; i += 2) {
          const j = (i + 2) % P.length,
                k = (i + 4) % P.length;
          if (P[i] === P[j] && P[j] === P[k] || P[i + 1] === P[j + 1] && P[j + 1] === P[k + 1]) P.splice(j, 2), i -= 2;
        }
      }

      return j;
    }

    _project(x0, y0, vx, vy) {
      let t = Infinity,
          c,
          x,
          y;

      if (vy < 0) {
        // top
        if (y0 <= this.ymin) return null;
        if ((c = (this.ymin - y0) / vy) < t) y = this.ymin, x = x0 + (t = c) * vx;
      } else if (vy > 0) {
        // bottom
        if (y0 >= this.ymax) return null;
        if ((c = (this.ymax - y0) / vy) < t) y = this.ymax, x = x0 + (t = c) * vx;
      }

      if (vx > 0) {
        // right
        if (x0 >= this.xmax) return null;
        if ((c = (this.xmax - x0) / vx) < t) x = this.xmax, y = y0 + (t = c) * vy;
      } else if (vx < 0) {
        // left
        if (x0 <= this.xmin) return null;
        if ((c = (this.xmin - x0) / vx) < t) x = this.xmin, y = y0 + (t = c) * vy;
      }

      return [x, y];
    }

    _edgecode(x, y) {
      return (x === this.xmin ? 0b0001 : x === this.xmax ? 0b0010 : 0b0000) | (y === this.ymin ? 0b0100 : y === this.ymax ? 0b1000 : 0b0000);
    }

    _regioncode(x, y) {
      return (x < this.xmin ? 0b0001 : x > this.xmax ? 0b0010 : 0b0000) | (y < this.ymin ? 0b0100 : y > this.ymax ? 0b1000 : 0b0000);
    }

  }

  const tau = 2 * Math.PI,
        pow = Math.pow;

  function pointX(p) {
    return p[0];
  }

  function pointY(p) {
    return p[1];
  } // A triangulation is collinear if all its triangles have a non-null area


  function collinear(d) {
    const {
      triangles,
      coords
    } = d;

    for (let i = 0; i < triangles.length; i += 3) {
      const a = 2 * triangles[i],
            b = 2 * triangles[i + 1],
            c = 2 * triangles[i + 2],
            cross = (coords[c] - coords[a]) * (coords[b + 1] - coords[a + 1]) - (coords[b] - coords[a]) * (coords[c + 1] - coords[a + 1]);
      if (cross > 1e-10) return false;
    }

    return true;
  }

  function jitter(x, y, r) {
    return [x + Math.sin(x + y) * r, y + Math.cos(x - y) * r];
  }

  class Delaunay {
    static from(points, fx = pointX, fy = pointY, that) {
      return new Delaunay("length" in points ? flatArray(points, fx, fy, that) : Float64Array.from(flatIterable(points, fx, fy, that)));
    }

    constructor(points) {
      this._delaunator = new Delaunator(points);
      this.inedges = new Int32Array(points.length / 2);
      this._hullIndex = new Int32Array(points.length / 2);
      this.points = this._delaunator.coords;

      this._init();
    }

    update() {
      this._delaunator.update();

      this._init();

      return this;
    }

    _init() {
      const d = this._delaunator,
            points = this.points; // check for collinear

      if (d.hull && d.hull.length > 2 && collinear(d)) {
        this.collinear = Int32Array.from({
          length: points.length / 2
        }, (_, i) => i).sort((i, j) => points[2 * i] - points[2 * j] || points[2 * i + 1] - points[2 * j + 1]); // for exact neighbors

        const e = this.collinear[0],
              f = this.collinear[this.collinear.length - 1],
              bounds = [points[2 * e], points[2 * e + 1], points[2 * f], points[2 * f + 1]],
              r = 1e-8 * Math.hypot(bounds[3] - bounds[1], bounds[2] - bounds[0]);

        for (let i = 0, n = points.length / 2; i < n; ++i) {
          const p = jitter(points[2 * i], points[2 * i + 1], r);
          points[2 * i] = p[0];
          points[2 * i + 1] = p[1];
        }

        this._delaunator = new Delaunator(points);
      } else {
        delete this.collinear;
      }

      const halfedges = this.halfedges = this._delaunator.halfedges;
      const hull = this.hull = this._delaunator.hull;
      const triangles = this.triangles = this._delaunator.triangles;
      const inedges = this.inedges.fill(-1);

      const hullIndex = this._hullIndex.fill(-1); // Compute an index from each point to an (arbitrary) incoming halfedge
      // Used to give the first neighbor of each point; for this reason,
      // on the hull we give priority to exterior halfedges


      for (let e = 0, n = halfedges.length; e < n; ++e) {
        const p = triangles[e % 3 === 2 ? e - 2 : e + 1];
        if (halfedges[e] === -1 || inedges[p] === -1) inedges[p] = e;
      }

      for (let i = 0, n = hull.length; i < n; ++i) {
        hullIndex[hull[i]] = i;
      } // degenerate case: 1 or 2 (distinct) points


      if (hull.length <= 2 && hull.length > 0) {
        this.triangles = new Int32Array(3).fill(-1);
        this.halfedges = new Int32Array(3).fill(-1);
        this.triangles[0] = hull[0];
        this.triangles[1] = hull[1];
        this.triangles[2] = hull[1];
        inedges[hull[0]] = 1;
        if (hull.length === 2) inedges[hull[1]] = 0;
      }
    }

    voronoi(bounds) {
      return new Voronoi$1(this, bounds);
    }

    *neighbors(i) {
      const {
        inedges,
        hull,
        _hullIndex,
        halfedges,
        triangles,
        collinear
      } = this; // degenerate case with several collinear points

      if (collinear) {
        const l = collinear.indexOf(i);
        if (l > 0) yield collinear[l - 1];
        if (l < collinear.length - 1) yield collinear[l + 1];
        return;
      }

      const e0 = inedges[i];
      if (e0 === -1) return; // coincident point

      let e = e0,
          p0 = -1;

      do {
        yield p0 = triangles[e];
        e = e % 3 === 2 ? e - 2 : e + 1;
        if (triangles[e] !== i) return; // bad triangulation

        e = halfedges[e];

        if (e === -1) {
          const p = hull[(_hullIndex[i] + 1) % hull.length];
          if (p !== p0) yield p;
          return;
        }
      } while (e !== e0);
    }

    find(x, y, i = 0) {
      if ((x = +x, x !== x) || (y = +y, y !== y)) return -1;
      const i0 = i;
      let c;

      while ((c = this._step(i, x, y)) >= 0 && c !== i && c !== i0) i = c;

      return c;
    }

    _step(i, x, y) {
      const {
        inedges,
        hull,
        _hullIndex,
        halfedges,
        triangles,
        points
      } = this;
      if (inedges[i] === -1 || !points.length) return (i + 1) % (points.length >> 1);
      let c = i;
      let dc = pow(x - points[i * 2], 2) + pow(y - points[i * 2 + 1], 2);
      const e0 = inedges[i];
      let e = e0;

      do {
        let t = triangles[e];
        const dt = pow(x - points[t * 2], 2) + pow(y - points[t * 2 + 1], 2);
        if (dt < dc) dc = dt, c = t;
        e = e % 3 === 2 ? e - 2 : e + 1;
        if (triangles[e] !== i) break; // bad triangulation

        e = halfedges[e];

        if (e === -1) {
          e = hull[(_hullIndex[i] + 1) % hull.length];

          if (e !== t) {
            if (pow(x - points[e * 2], 2) + pow(y - points[e * 2 + 1], 2) < dc) return e;
          }

          break;
        }
      } while (e !== e0);

      return c;
    }

    render(context) {
      const buffer = context == null ? context = new Path() : undefined;
      const {
        points,
        halfedges,
        triangles
      } = this;

      for (let i = 0, n = halfedges.length; i < n; ++i) {
        const j = halfedges[i];
        if (j < i) continue;
        const ti = triangles[i] * 2;
        const tj = triangles[j] * 2;
        context.moveTo(points[ti], points[ti + 1]);
        context.lineTo(points[tj], points[tj + 1]);
      }

      this.renderHull(context);
      return buffer && buffer.value();
    }

    renderPoints(context, r = 2) {
      const buffer = context == null ? context = new Path() : undefined;
      const {
        points
      } = this;

      for (let i = 0, n = points.length; i < n; i += 2) {
        const x = points[i],
              y = points[i + 1];
        context.moveTo(x + r, y);
        context.arc(x, y, r, 0, tau);
      }

      return buffer && buffer.value();
    }

    renderHull(context) {
      const buffer = context == null ? context = new Path() : undefined;
      const {
        hull,
        points
      } = this;
      const h = hull[0] * 2,
            n = hull.length;
      context.moveTo(points[h], points[h + 1]);

      for (let i = 1; i < n; ++i) {
        const h = 2 * hull[i];
        context.lineTo(points[h], points[h + 1]);
      }

      context.closePath();
      return buffer && buffer.value();
    }

    hullPolygon() {
      const polygon = new Polygon();
      this.renderHull(polygon);
      return polygon.value();
    }

    renderTriangle(i, context) {
      const buffer = context == null ? context = new Path() : undefined;
      const {
        points,
        triangles
      } = this;
      const t0 = triangles[i *= 3] * 2;
      const t1 = triangles[i + 1] * 2;
      const t2 = triangles[i + 2] * 2;
      context.moveTo(points[t0], points[t0 + 1]);
      context.lineTo(points[t1], points[t1 + 1]);
      context.lineTo(points[t2], points[t2 + 1]);
      context.closePath();
      return buffer && buffer.value();
    }

    *trianglePolygons() {
      const {
        triangles
      } = this;

      for (let i = 0, n = triangles.length / 3; i < n; ++i) {
        yield this.trianglePolygon(i);
      }
    }

    trianglePolygon(i) {
      const polygon = new Polygon();
      this.renderTriangle(i, polygon);
      return polygon.value();
    }

  }

  function flatArray(points, fx, fy, that) {
    const n = points.length;
    const array = new Float64Array(n * 2);

    for (let i = 0; i < n; ++i) {
      const p = points[i];
      array[i * 2] = fx.call(that, p, i, points);
      array[i * 2 + 1] = fy.call(that, p, i, points);
    }

    return array;
  }

  function* flatIterable(points, fx, fy, that) {
    let i = 0;

    for (const p of points) {
      yield fx.call(that, p, i, points);
      yield fy.call(that, p, i, points);
      ++i;
    }
  }

  function Voronoi() {
    var _useChartContext = useChartContext(),
        getOptions = _useChartContext.getOptions,
        focusedDatumState = _useChartContext.focusedDatumState,
        isInteractingState = _useChartContext.isInteractingState;

    var setFocusedDatum = focusedDatumState[1];
    var isInteracting = isInteractingState[0];

    var _getOptions = getOptions(),
        onFocusDatum = _getOptions.onFocusDatum,
        onClickDatum = _getOptions.onClickDatum,
        tooltip = _getOptions.tooltip,
        primaryCursor = _getOptions.primaryCursor,
        secondaryCursor = _getOptions.secondaryCursor,
        showVoronoi = _getOptions.showVoronoi,
        interactionMode = _getOptions.interactionMode;

    var handleFocus = React__default['default'].useCallback(function (datum) {
      var _getOptions$onFocusDa, _getOptions2;

      (_getOptions$onFocusDa = (_getOptions2 = getOptions()).onFocusDatum) == null ? void 0 : _getOptions$onFocusDa.call(_getOptions2, datum);
      setFocusedDatum(datum);
    }, [getOptions, setFocusedDatum]);
    var needsVoronoi = isInteracting && (showVoronoi || onFocusDatum || onClickDatum || tooltip || primaryCursor || secondaryCursor);

    if (!needsVoronoi) {
      return null;
    }

    var props = {
      handleFocus: handleFocus
    };

    if (interactionMode === 'closest') {
      return /*#__PURE__*/React__default['default'].createElement(SingleVoronoi, props);
    }

    return /*#__PURE__*/React__default['default'].createElement(PrimaryVoronoi, props);
  }

  function PrimaryVoronoi(_ref) {
    var handleFocus = _ref.handleFocus;

    var _useChartContext2 = useChartContext(),
        primaryAxis = _useChartContext2.primaryAxis,
        secondaryAxes = _useChartContext2.secondaryAxes,
        getOptions = _useChartContext2.getOptions,
        gridDimensions = _useChartContext2.gridDimensions,
        datumsByInteractionGroup = _useChartContext2.datumsByInteractionGroup;

    var stackedVoronoi = secondaryAxes.length === 1 && secondaryAxes[0].stacked;
    var useBarPx = secondaryAxes.every(function (d) {
      return d.elementType === 'bar' && !d.stacked;
    });
    return React__default['default'].useMemo(function () {
      var preColumns = Array.from(datumsByInteractionGroup.entries()).map(function (_ref2) {
        _ref2[0];
            var datums = _ref2[1];
        return datums;
      }).filter(function (datums) {
        var datum = datums[0];

        if (!datum) {
          return;
        }

        var primaryValue = datum.primaryValue;
        return primaryValue !== 'undefined' && primaryValue !== null;
      }).sort(function (a, b) {
        var aAxis = secondaryAxes.find(function (d) {
          return d.id === a[0].secondaryAxisId;
        });
        var bAxis = secondaryAxes.find(function (d) {
          return d.id === b[0].secondaryAxisId;
        });
        var aPx = getPrimary(a[0], primaryAxis, aAxis, useBarPx);
        var bPx = getPrimary(b[0], primaryAxis, bAxis, useBarPx);
        return aPx - bPx;
      });

      if (primaryAxis.isVertical) {
        preColumns.reverse();
      }

      var columns = preColumns.map(function (datums, i, all) {
        var _primaryAxis$scale$ra;

        var datum = datums[0];
        var prev = all[i - 1];
        var next = all[i + 1];
        var secondaryAxis = secondaryAxes.find(function (d) {
          return d.id === datum.secondaryAxisId;
        });
        var primaryPx = getPrimary(datum, primaryAxis, secondaryAxis, useBarPx);
        var range = (_primaryAxis$scale$ra = primaryAxis == null ? void 0 : primaryAxis.scale.range()) != null ? _primaryAxis$scale$ra : [0, 0];
        var primaryStart = range[0],
            primaryEnd = range[1];

        if (prev) {
          var _secondaryAxis = secondaryAxes.find(function (d) {
            return d.id === prev[0].secondaryAxisId;
          });

          var prevPx = getPrimary(prev[0], primaryAxis, _secondaryAxis, useBarPx);
          primaryStart = primaryPx - (primaryPx - prevPx) / 2;
        }

        if (next) {
          var _secondaryAxis2 = secondaryAxes.find(function (d) {
            return d.id === next[0].secondaryAxisId;
          });

          var nextPx = getPrimary(next[0], primaryAxis, _secondaryAxis2, useBarPx);
          primaryEnd = primaryPx + (nextPx - primaryPx) / 2;
        }

        return {
          primaryStart: primaryStart,
          primaryEnd: primaryEnd,
          primaryPx: primaryPx,
          datumBoundaries: datums.filter(function (datum) {
            var secondaryValue = datum.secondaryValue;
            return typeof secondaryValue !== 'undefined' && secondaryValue !== null;
          }).map(function (datum, i, all) {
            var _secondaryAxis$scale3, _datum$stackData3, _secondaryAxis$scale$2;

            var prev = all[i - 1];
            var next = all[i + 1];
            var secondaryAxis = secondaryAxes.find(function (d) {
              return d.id === datum.secondaryAxisId;
            });

            if (stackedVoronoi) {
              var _secondaryAxis$scale$, _datum$stackData, _datum$stackData2;

              var _range = (_secondaryAxis$scale$ = secondaryAxis == null ? void 0 : secondaryAxis.scale.range()) != null ? _secondaryAxis$scale$ : [0, 0];

              var stackData = [(_datum$stackData = datum.stackData) == null ? void 0 : _datum$stackData[0], (_datum$stackData2 = datum.stackData) == null ? void 0 : _datum$stackData2[1]];

              if (secondaryAxis != null && secondaryAxis.isVertical) {
                _range.reverse();

                stackData.reverse();
              }

              var _secondaryStart = _range[0],
                  _secondaryEnd = _range[1];

              if (prev) {
                var _secondaryAxis$scale, _stackData$;

                _secondaryStart = (_secondaryAxis$scale = secondaryAxis == null ? void 0 : secondaryAxis.scale((_stackData$ = stackData[0]) != null ? _stackData$ : NaN)) != null ? _secondaryAxis$scale : NaN;
              }

              if (next) {
                var _secondaryAxis$scale2, _stackData$2;

                _secondaryEnd = (_secondaryAxis$scale2 = secondaryAxis == null ? void 0 : secondaryAxis.scale((_stackData$2 = stackData[1]) != null ? _stackData$2 : NaN)) != null ? _secondaryAxis$scale2 : NaN;
              }

              return {
                secondaryStart: _secondaryStart,
                secondaryEnd: _secondaryEnd,
                datum: datum
              };
            }

            var value = (_secondaryAxis$scale3 = secondaryAxis == null ? void 0 : secondaryAxis.scale(secondaryAxis.stacked ? (_datum$stackData3 = datum.stackData) == null ? void 0 : _datum$stackData3[1] : datum.secondaryValue)) != null ? _secondaryAxis$scale3 : NaN;
            var range = (_secondaryAxis$scale$2 = secondaryAxis == null ? void 0 : secondaryAxis.scale.range()) != null ? _secondaryAxis$scale$2 : [0, 0];

            if (secondaryAxis != null && secondaryAxis.isVertical) {
              range.reverse();
            }

            var secondaryStart = range[0],
                secondaryEnd = range[1];

            if (prev) {
              var _prevAxis$scale, _prev$stackData;

              var prevAxis = secondaryAxes.find(function (d) {
                return d.id === (prev == null ? void 0 : prev.secondaryAxisId);
              });
              var prevValue = (_prevAxis$scale = prevAxis == null ? void 0 : prevAxis.scale(prevAxis.stacked ? (_prev$stackData = prev.stackData) == null ? void 0 : _prev$stackData[1] : prev.secondaryValue)) != null ? _prevAxis$scale : NaN;
              secondaryStart = value - (value - prevValue) / 2;
            }

            if (next) {
              var _nextAxis$scale, _next$stackData;

              var nextAxis = secondaryAxes.find(function (d) {
                return d.id === (next == null ? void 0 : next.secondaryAxisId);
              });
              var nextValue = (_nextAxis$scale = nextAxis == null ? void 0 : nextAxis.scale(nextAxis.stacked ? (_next$stackData = next.stackData) == null ? void 0 : _next$stackData[1] : next.secondaryValue)) != null ? _nextAxis$scale : NaN;
              secondaryEnd = value + (nextValue - value) / 2;
            }

            return {
              secondaryStart: secondaryStart,
              secondaryEnd: secondaryEnd,
              datum: datum
            };
          })
        };
      });
      return /*#__PURE__*/React__default['default'].createElement("g", {
        onMouseLeave: function onMouseLeave() {
          return handleFocus(null);
        },
        style: {
          transform: translate(gridDimensions.left, gridDimensions.top)
        }
      }, columns.map(function (column, i) {
        return /*#__PURE__*/React__default['default'].createElement("g", {
          key: column.primaryPx + "_" + i
        }, column.datumBoundaries.map(function (datumBoundary, i) {
          var x1 = !primaryAxis.isVertical ? column.primaryStart : datumBoundary.secondaryStart;
          var x2 = !primaryAxis.isVertical ? column.primaryEnd : datumBoundary.secondaryEnd;
          var y1 = !primaryAxis.isVertical ? datumBoundary.secondaryStart : column.primaryStart;
          var y2 = !primaryAxis.isVertical ? datumBoundary.secondaryEnd : column.primaryEnd;
          var x = Math.min(x1, x2);
          var y = Math.min(y1, y2);
          var xEnd = Math.max(x1, x2);
          var yEnd = Math.max(y1, y2);
          var height = Math.max(yEnd - y, 0);
          var width = Math.max(xEnd - x, 0);
          return /*#__PURE__*/React__default['default'].createElement("rect", {
            key: i,
            x: x,
            y: y,
            width: width,
            height: height,
            className: 'action-voronoi',
            onMouseEnter: function onMouseEnter() {
              return handleFocus(datumBoundary.datum);
            },
            style: {
              fill: getOptions().dark ? '#ffffff33' : 'rgba(0,0,0,0.2)',
              strokeWidth: 1,
              stroke: getOptions().dark ? 'white' : 'black',
              opacity: getOptions().showVoronoi ? 1 : 0
            }
          });
        }));
      }));
    }, [datumsByInteractionGroup, primaryAxis, gridDimensions.left, gridDimensions.top, secondaryAxes, useBarPx, stackedVoronoi, handleFocus, getOptions]);
  }

  var delaunayLineFn = line();

  function SingleVoronoi(_ref3) {
    var handleFocus = _ref3.handleFocus;

    var _useChartContext3 = useChartContext(),
        primaryAxis = _useChartContext3.primaryAxis,
        series = _useChartContext3.series,
        secondaryAxes = _useChartContext3.secondaryAxes,
        getOptions = _useChartContext3.getOptions,
        gridDimensions = _useChartContext3.gridDimensions;

    var polygons = null;
    var voronoiData = [];
    var useBarPx = secondaryAxes.every(function (d) {
      return d.elementType === 'bar' && !d.stacked;
    });
    series.forEach(function (serie) {
      serie.datums.filter(function (datum) {
        var primaryValue = datum.primaryValue;
        var secondaryValue = datum.secondaryValue;
        return primaryValue !== 'undefined' && primaryValue !== null && secondaryValue !== 'undefined' && secondaryValue !== null;
      }).forEach(function (datum) {
        var secondaryAxis = secondaryAxes.find(function (d) {
          return d.id === datum.secondaryAxisId;
        });
        var x = getX(datum, primaryAxis, secondaryAxis, useBarPx);
        var y = getY(datum, primaryAxis, secondaryAxis, useBarPx);

        if (typeof x !== 'number' || typeof y !== 'number' || Number.isNaN(y) || Number.isNaN(x)) {
          return;
        }

        voronoiData.push({
          x: x,
          y: y,
          datum: datum
        });
      });
    });
    var delaunay = Delaunay.from(voronoiData, function (d) {
      return Math.max(d.x, 0);
    }, function (d) {
      return Math.max(d.y, 0);
    });
    var voronoi = delaunay.voronoi([0, 0, gridDimensions.width, gridDimensions.height]);
    polygons = voronoi.cellPolygons();
    polygons = Array.from(polygons);
    return /*#__PURE__*/React__default['default'].createElement("g", {
      onMouseLeave: function onMouseLeave() {
        return handleFocus(null);
      },
      style: {
        transform: translate(gridDimensions.left, gridDimensions.top)
      }
    }, polygons.map(function (points, i) {
      var index = points.index;
      var datum = voronoiData[index].datum;
      var path = delaunayLineFn(points) || undefined;
      return /*#__PURE__*/React__default['default'].createElement("path", {
        key: i,
        d: path,
        className: 'action-voronoi',
        onMouseEnter: function onMouseEnter() {
          return handleFocus(datum);
        },
        style: {
          fill: getOptions().dark ? '#ffffff33' : 'rgba(0,0,0,0.2)',
          strokeWidth: 1,
          stroke: getOptions().dark ? 'white' : 'black',
          opacity: getOptions().showVoronoi ? 1 : 0
        }
      });
    }));
  }

  function getX(datum, primaryAxis, secondaryAxis, useBarPx) {
    return primaryAxis.isVertical ? getSecondary(datum, secondaryAxis) : getPrimary(datum, primaryAxis, secondaryAxis, useBarPx);
  }

  function getY(datum, primaryAxis, secondaryAxis, useBarPx) {
    return primaryAxis.isVertical ? getPrimary(datum, primaryAxis, secondaryAxis, useBarPx) : getSecondary(datum, secondaryAxis);
  }

  function getPrimary(datum, primaryAxis, secondaryAxis, useBarPx) {
    var _primaryAxis$scale;

    var primary = (_primaryAxis$scale = primaryAxis.scale(datum.primaryValue)) != null ? _primaryAxis$scale : NaN;

    if (useBarPx && secondaryAxis.elementType === 'bar') {
      if (!secondaryAxis.stacked) {
        var _ref4;

        primary += (_ref4 = primaryAxis.seriesBandScale(datum.seriesIndex)) != null ? _ref4 : NaN;
        primary += getPrimaryLength(datum, primaryAxis, secondaryAxis) / 2;
      } else {
        primary += getPrimaryGroupLength(datum, primaryAxis) / 2;
      }
    }

    return primary;
  }

  function getSecondary(datum, secondaryAxis) {
    var _secondaryAxis$scale5;

    if (secondaryAxis.stacked) {
      var _secondaryAxis$scale4, _datum$stackData$, _datum$stackData4;

      return (_secondaryAxis$scale4 = secondaryAxis.scale((_datum$stackData$ = (_datum$stackData4 = datum.stackData) == null ? void 0 : _datum$stackData4[1]) != null ? _datum$stackData$ : NaN)) != null ? _secondaryAxis$scale4 : NaN;
    }

    return (_secondaryAxis$scale5 = secondaryAxis.scale(datum.secondaryValue)) != null ? _secondaryAxis$scale5 : NaN;
  }

  var _excluded = ["options", "className", "style"];
  //

  var defaultColorScheme = ['#0f83ab', '#faa43a', '#fd6868', '#53cfc9', '#a2d925', '#decf3f', '#734fe9', '#cd82ad', '#006d92', '#de7c00', '#f33232', '#3f9a80', '#53c200', '#d7af00', '#4c26c9', '#d44d99'];
  var defaultPadding = 5;

  function defaultChartOptions(options) {
    var _options$initialWidth, _options$initialHeigh, _options$getSeriesOrd, _options$interactionM, _options$showVoronoi, _options$defaultColor, _options$useIntersect, _options$intersection, _options$primaryCurso, _options$secondaryCur, _options$padding;

    return _extends({}, options, {
      initialWidth: (_options$initialWidth = options.initialWidth) != null ? _options$initialWidth : 300,
      initialHeight: (_options$initialHeigh = options.initialHeight) != null ? _options$initialHeigh : 200,
      getSeriesOrder: (_options$getSeriesOrd = options.getSeriesOrder) != null ? _options$getSeriesOrd : function (series) {
        return series;
      },
      interactionMode: (_options$interactionM = options.interactionMode) != null ? _options$interactionM : 'primary',
      showVoronoi: (_options$showVoronoi = options.showVoronoi) != null ? _options$showVoronoi : false,
      defaultColors: (_options$defaultColor = options.defaultColors) != null ? _options$defaultColor : defaultColorScheme,
      useIntersectionObserver: (_options$useIntersect = options.useIntersectionObserver) != null ? _options$useIntersect : true,
      intersectionObserverRootMargin: (_options$intersection = options.intersectionObserverRootMargin) != null ? _options$intersection : '1000px',
      primaryCursor: (_options$primaryCurso = options.primaryCursor) != null ? _options$primaryCurso : true,
      secondaryCursor: (_options$secondaryCur = options.secondaryCursor) != null ? _options$secondaryCur : true,
      padding: (_options$padding = options.padding) != null ? _options$padding : defaultPadding
    });
  }

  function Chart(_ref) {
    var userOptions = _ref.options,
        className = _ref.className,
        _ref$style = _ref.style,
        style = _ref$style === void 0 ? {} : _ref$style,
        rest = _objectWithoutPropertiesLoose(_ref, _excluded);

    var options = defaultChartOptions(userOptions);

    var _React$useState = React__default['default'].useState(null),
        chartElement = _React$useState[0],
        setContainerElement = _React$useState[1];

    var containerEl = chartElement == null ? void 0 : chartElement.parentElement;
    var nearestScrollableParent = React__default['default'].useMemo(function () {
      var run = function run(el) {
        if (!el) {
          return null;
        }

        var grandParent = el.parentElement;

        if (!grandParent) {
          return null;
        }

        if (grandParent.scrollHeight > grandParent.clientHeight) {
          var _window$getComputedSt = window.getComputedStyle(grandParent),
              overflow = _window$getComputedSt.overflow;

          if (overflow.includes('scroll') || overflow.includes('auto')) {
            return grandParent;
          }
        }

        return run(grandParent);
      };

      return run(containerEl);
    }, [containerEl]);

    var _React$useState2 = React__default['default'].useState({
      width: options.initialWidth,
      height: options.initialHeight
    }),
        _React$useState2$ = _React$useState2[0],
        width = _React$useState2$.width,
        height = _React$useState2$.height,
        setDims = _React$useState2[1];

    useIsomorphicLayoutEffect(function () {
      if (containerEl) {
        var computed = window.getComputedStyle(containerEl);

        if (!['relative', 'absolute', 'fixed'].includes(computed.position)) {
          containerEl.style.position = 'relative';
        }
      }
    }, [containerEl]);
    React__default['default'].useEffect(function () {
      if (!containerEl) {
        return;
      }

      var observer = new ResizeObserver(function () {
        var rect = containerEl == null ? void 0 : containerEl.getBoundingClientRect();
        var styles = window.getComputedStyle(containerEl);

        if (rect) {
          setDims({
            width: rect.width - parseInt(styles.borderLeftWidth) - parseInt(styles.borderRightWidth),
            height: rect.height - parseInt(styles.borderTopWidth) - parseInt(styles.borderBottomWidth)
          });
        }
      });
      observer.observe(containerEl);
      return function () {
        observer.unobserve(containerEl);
      };
    }, [containerEl]);

    var _React$useState3 = React__default['default'].useState(true),
        isIntersecting = _React$useState3[0],
        setIsIntersecting = _React$useState3[1];

    React__default['default'].useEffect(function () {
      if (!containerEl || !options.useIntersectionObserver) return;
      var observer = new IntersectionObserver(function (entries) {
        for (var _iterator = _createForOfIteratorHelperLoose(entries), _step; !(_step = _iterator()).done;) {
          var entry = _step.value;

          if (entry.isIntersecting) {
            setIsIntersecting(true);
          } else {
            setIsIntersecting(false);
          }
        }
      }, {
        root: nearestScrollableParent,
        rootMargin: options.intersectionObserverRootMargin
      });
      observer.observe(containerEl);
      return function () {
        observer.unobserve(containerEl);
      };
    }, [containerEl, nearestScrollableParent, options.intersectionObserverRootMargin, options.useIntersectionObserver]);
    return /*#__PURE__*/React__default['default'].createElement("div", _extends({
      ref: setContainerElement
    }, rest, {
      className: "ReactChart " + (className || ''),
      style: _extends({
        fontFamily: 'sans-serif'
      }, style, {
        position: 'absolute',
        width: width,
        height: height
      })
    }), isIntersecting ? /*#__PURE__*/React__default['default'].createElement(ChartInner, {
      options: options,
      width: width,
      height: height
    }) : null);
  }

  function ChartInner(_ref2) {
    var _options2, _options$renderSVG;

    var options = _ref2.options,
        width = _ref2.width,
        height = _ref2.height;

    if (!options.primaryAxis) {
      throw new Error('A primaryAxis is required');
    }

    if (!options.secondaryAxes.length) {
      throw new Error('At least one secondaryAxis is required');
    }

    var primaryAxisOptions = React__default['default'].useMemo(function () {
      var firstValue = getFirstDefinedValue(options.primaryAxis, options.data);
      var axisOptions = axisOptionsWithScaleType(options.primaryAxis, firstValue);
      return _extends({
        position: 'bottom'
      }, axisOptions);
    }, [options.data, options.primaryAxis]);
    var secondaryAxesOptions = React__default['default'].useMemo(function () {
      return options.secondaryAxes.map(function (secondaryAxis, i) {
        var firstValue = getFirstDefinedValue(secondaryAxis, options.data);
        var axisOptions = axisOptionsWithScaleType(secondaryAxis, firstValue);

        if (!axisOptions.elementType) {
          if (primaryAxisOptions.scaleType === 'band') {
            axisOptions.elementType = 'bar';
          } else if (axisOptions.stacked) {
            axisOptions.elementType = 'area';
          }
        }

        if (typeof axisOptions.stacked === 'undefined' && axisOptions.elementType && ['area'].includes(axisOptions.elementType)) {
          axisOptions.stacked = true;
        }

        return _extends({
          position: !i ? 'left' : 'right'
        }, axisOptions);
      });
    }, [options.data, options.secondaryAxes, primaryAxisOptions]); // Resolve Tooltip Option

    var tooltipOptions = React__default['default'].useMemo(function () {
      var _options, _tooltipOptions$group;

      var tooltipOptions = defaultTooltip((_options = options) == null ? void 0 : _options.tooltip);
      tooltipOptions.groupingMode = (_tooltipOptions$group = tooltipOptions.groupingMode) != null ? _tooltipOptions$group : function () {
        if (options.interactionMode === 'closest') {
          return 'single';
        }

        return 'primary';
      }();
      return tooltipOptions;
    }, [options.interactionMode, (_options2 = options) == null ? void 0 : _options2.tooltip]);
    options = _extends({}, options, {
      tooltip: tooltipOptions
    }); //

    var svgRef = React__default['default'].useRef(null);
    var getOptions = useGetLatest(_extends({}, options, {
      tooltip: tooltipOptions
    }));
    var axisDimensionsState = React__default['default'].useState({
      left: {},
      right: {},
      top: {},
      bottom: {}
    });
    var axisDimensions = axisDimensionsState[0];
    var isInteractingState = React__default['default'].useState(false);
    var isInteracting = isInteractingState[0];
    var focusedDatumState = React__default['default'].useState(null);
    var focusedDatum = focusedDatumState[0]; // useAtom<Datum<TDatum> | null>(focusedDatumAtom)

    var gridDimensions = React__default['default'].useMemo(function () {
      var _options$padding$left, _options$padding$righ, _options$padding$bott, _options$padding$top;

      var padding = {
        left: typeof options.padding === 'object' ? (_options$padding$left = options.padding.left) != null ? _options$padding$left : defaultPadding : options.padding,
        right: typeof options.padding === 'object' ? (_options$padding$righ = options.padding.right) != null ? _options$padding$righ : defaultPadding : options.padding,
        bottom: typeof options.padding === 'object' ? (_options$padding$bott = options.padding.bottom) != null ? _options$padding$bott : defaultPadding : options.padding,
        top: typeof options.padding === 'object' ? (_options$padding$top = options.padding.top) != null ? _options$padding$top : defaultPadding : options.padding
      };
      var left = padding.left + Math.max(sum(Object.values(axisDimensions.left), function (d) {
        return d.width;
      }), sum(Object.values(axisDimensions.top), function (d) {
        return d.paddingLeft;
      }), sum(Object.values(axisDimensions.bottom), function (d) {
        return d.paddingLeft;
      }));
      var top = padding.top + Math.max(sum(Object.values(axisDimensions.top), function (d) {
        return d.height;
      }), sum(Object.values(axisDimensions.left), function (d) {
        return d.paddingTop;
      }), sum(Object.values(axisDimensions.right), function (d) {
        return d.paddingTop;
      }));
      var right = padding.right + Math.max(sum(Object.values(axisDimensions.right), function (d) {
        return d.width;
      }), sum(Object.values(axisDimensions.top), function (d) {
        return d.paddingRight;
      }), sum(Object.values(axisDimensions.bottom), function (d) {
        return d.paddingRight;
      }));
      var bottom = padding.bottom + Math.max(sum(Object.values(axisDimensions.bottom), function (d) {
        return d.height;
      }), sum(Object.values(axisDimensions.left), function (d) {
        return d.paddingBottom;
      }), sum(Object.values(axisDimensions.right), function (d) {
        return d.paddingBottom;
      }));
      var gridWidth = Math.max(0, width - left - right);
      var gridHeight = Math.max(0, height - top - bottom);
      return {
        left: left,
        top: top,
        right: right,
        bottom: bottom,
        width: gridWidth,
        height: gridHeight
      };
    }, [options.padding, axisDimensions.left, axisDimensions.top, axisDimensions.bottom, axisDimensions.right, width, height]);
    var series = React__default['default'].useMemo(function () {
      var series = [];
      var indicesByAxisId = {};

      for (var seriesIndex = 0; seriesIndex < options.data.length; seriesIndex++) {
        var _originalSeries$id, _originalSeries$label, _indicesByAxisId$;

        var originalSeries = options.data[seriesIndex];
        var seriesId = (_originalSeries$id = originalSeries.id) != null ? _originalSeries$id : seriesIndex + '';
        var seriesLabel = (_originalSeries$label = originalSeries.label) != null ? _originalSeries$label : "Series " + (seriesIndex + 1);
        var secondaryAxisId = originalSeries.secondaryAxisId;
        var originalDatums = originalSeries.data;
        var datums = [];
        indicesByAxisId["" + secondaryAxisId] = (_indicesByAxisId$ = indicesByAxisId["" + secondaryAxisId]) != null ? _indicesByAxisId$ : 0;
        var seriesIndexPerAxis = indicesByAxisId["" + secondaryAxisId];
        indicesByAxisId["" + secondaryAxisId]++;

        for (var datumIndex = 0; datumIndex < originalDatums.length; datumIndex++) {
          var originalDatum = originalDatums[datumIndex];
          datums[datumIndex] = {
            originalSeries: originalSeries,
            seriesIndex: seriesIndex,
            seriesIndexPerAxis: seriesIndexPerAxis,
            seriesId: seriesId,
            seriesLabel: seriesLabel,
            secondaryAxisId: secondaryAxisId,
            index: datumIndex,
            originalDatum: originalDatum
          };
        }

        series[seriesIndex] = {
          originalSeries: originalSeries,
          index: seriesIndex,
          id: seriesId,
          label: seriesLabel,
          indexPerAxis: seriesIndexPerAxis,
          secondaryAxisId: secondaryAxisId,
          datums: datums
        };
      }

      return series;
    }, [options.data]);
    var allDatums = React__default['default'].useMemo(function () {
      return series.map(function (s) {
        return s.datums;
      }).flat(2);
    }, [series]);
    var primaryAxis = React__default['default'].useMemo(function () {
      return buildAxisLinear(true, primaryAxisOptions, series, allDatums, gridDimensions, width, height);
    }, [allDatums, gridDimensions, height, primaryAxisOptions, series, width]);
    var secondaryAxes = React__default['default'].useMemo(function () {
      return secondaryAxesOptions.map(function (secondaryAxis) {
        return buildAxisLinear(false, secondaryAxis, series, allDatums, gridDimensions, width, height);
      });
    }, [allDatums, gridDimensions, height, secondaryAxesOptions, series, width]);

    var _React$useMemo = React__default['default'].useMemo(function () {
      if (!isInteracting) {
        return [new Map(), new Map()];
      }

      var datumsByInteractionGroup = new Map();
      var datumsByTooltipGroup = new Map();
      var allBarAndNotStacked = secondaryAxes.every(function (d) {
        return d.elementType === 'bar' && !d.stacked;
      });

      var getInteractionPrimary = function getInteractionPrimary(datum) {
        if (allBarAndNotStacked) {
          var secondaryAxis = secondaryAxes.find(function (d) {
            return d.id === datum.secondaryAxisId;
          });

          if (secondaryAxis.elementType === 'bar' && !secondaryAxis.stacked) {
            return getPrimary$2(datum, primaryAxis, secondaryAxis);
          }
        }

        return datum.primaryValue;
      };

      var getInteractionKey = function getInteractionKey(datum) {
        return "" + getInteractionPrimary(datum);
      };

      var getTooltipKey = function getTooltipKey(datum) {
        return "" + datum.primaryValue;
      };

      if (options.interactionMode === 'closest') {
        getInteractionKey = function getInteractionKey(datum) {
          return getInteractionPrimary(datum) + "_" + datum.secondaryValue;
        };
      }

      if (tooltipOptions.groupingMode === 'single') {
        getTooltipKey = function getTooltipKey(datum) {
          return datum.primaryValue + "_" + datum.secondaryValue;
        };
      } else if (tooltipOptions.groupingMode === 'secondary') {
        getTooltipKey = function getTooltipKey(datum) {
          return "" + datum.secondaryValue;
        };
      } else if (tooltipOptions.groupingMode === 'series') {
        getTooltipKey = function getTooltipKey(datum) {
          return "" + datum.seriesIndex;
        };
      }

      allDatums.forEach(function (datum) {
        var interactionKey = getInteractionKey(datum);
        var tooltipKey = getTooltipKey(datum);

        if (!datumsByInteractionGroup.has(interactionKey)) {
          datumsByInteractionGroup.set(interactionKey, []);
        }

        if (!datumsByTooltipGroup.has(tooltipKey)) {
          datumsByTooltipGroup.set(tooltipKey, []);
        }

        datumsByInteractionGroup.get(interactionKey).push(datum);
        datumsByTooltipGroup.get(tooltipKey).push(datum);
      });
      datumsByInteractionGroup.forEach(function (value, key) {
        datumsByInteractionGroup.set(key, sortDatumsBySecondaryPx(value, secondaryAxes));
      });
      datumsByTooltipGroup.forEach(function (value, key) {
        datumsByTooltipGroup.set(key, sortDatumsBySecondaryPx(value, secondaryAxes));
      });
      allDatums.forEach(function (datum) {
        var interactionKey = getInteractionKey(datum);
        var tooltipKey = getTooltipKey(datum);
        datum.interactiveGroup = datumsByInteractionGroup.get(interactionKey);
        datum.tooltipGroup = datumsByTooltipGroup.get(tooltipKey);
      });
      return [datumsByInteractionGroup, datumsByTooltipGroup];
    }, [isInteracting, allDatums, options.interactionMode, primaryAxis, secondaryAxes, tooltipOptions.groupingMode]),
        datumsByInteractionGroup = _React$useMemo[0],
        datumsByTooltipGroup = _React$useMemo[1];

    var getSeriesStatusStyle = React__default['default'].useCallback(function (series, focusedDatum) {
      var _getOptions$getSeries, _getOptions$getSeries2, _getOptions;

      var base = {
        color: getOptions().defaultColors[series.index % getOptions().defaultColors.length]
      };
      var status = getSeriesStatus(series, focusedDatum);
      var statusStyles = (_getOptions$getSeries = (_getOptions$getSeries2 = (_getOptions = getOptions()).getSeriesStyle) == null ? void 0 : _getOptions$getSeries2.call(_getOptions, series, status)) != null ? _getOptions$getSeries : {};
      series.style = materializeStyles(statusStyles, base);
      return series.style;
    }, [getOptions]);
    var getDatumStatusStyle = React__default['default'].useCallback(function (datum, focusedDatum) {
      var _series$datum$seriesI, _getOptions$getDatumS, _getOptions$getDatumS2, _getOptions2;

      var base = _extends({}, (_series$datum$seriesI = series[datum.seriesIndex]) == null ? void 0 : _series$datum$seriesI.style, {
        color: getOptions().defaultColors[datum.seriesIndex % getOptions().defaultColors.length]
      });

      var status = getDatumStatus(datum, focusedDatum);
      var statusStyles = (_getOptions$getDatumS = (_getOptions$getDatumS2 = (_getOptions2 = getOptions()).getDatumStyle) == null ? void 0 : _getOptions$getDatumS2.call(_getOptions2, datum, status)) != null ? _getOptions$getDatumS : {};
      datum.style = materializeStyles(statusStyles, base);
      return datum.style;
    }, [getOptions, series]); // Reverse the stack order for proper z-indexing

    var orderedSeries = React__default['default'].useMemo(function () {
      var reversedSeries = [].concat(series).reverse();
      return getOptions().getSeriesOrder(reversedSeries);
    }, [getOptions, series]);
    useIsomorphicLayoutEffect(function () {
      if (svgRef.current && svgRef.current.parentElement && !svgRef.current.parentElement.style.position) {
        svgRef.current.parentElement.style.position = 'relative';
      }
    });
    var contextValue = {
      getOptions: getOptions,
      gridDimensions: gridDimensions,
      primaryAxis: primaryAxis,
      secondaryAxes: secondaryAxes,
      series: series,
      orderedSeries: orderedSeries,
      datumsByInteractionGroup: datumsByInteractionGroup,
      datumsByTooltipGroup: datumsByTooltipGroup,
      width: width,
      height: height,
      getSeriesStatusStyle: getSeriesStatusStyle,
      getDatumStatusStyle: getDatumStatusStyle,
      axisDimensionsState: axisDimensionsState,
      focusedDatumState: focusedDatumState,
      svgRef: svgRef,
      isInteractingState: isInteractingState
    };
    var seriesByAxisId = React__default['default'].useMemo(function () {
      return sort(groups(orderedSeries, function (d) {
        return d.secondaryAxisId;
      }), function (_ref3) {
        var key = _ref3[0];
        return secondaryAxes.findIndex(function (axis) {
          return axis.id === key;
        });
      });
    }, [orderedSeries, secondaryAxes]); // eslint-disable-next-line react-hooks/exhaustive-deps

    var getSeriesInfo = function getSeriesInfo() {
      return {
        primaryAxis: primaryAxis,
        secondaryAxes: secondaryAxes,
        seriesByAxisId: seriesByAxisId
      };
    };

    var getMemoizedSeriesInfo = React__default['default'].useCallback(function () {
      return {
        primaryAxis: primaryAxis,
        secondaryAxes: secondaryAxes,
        seriesByAxisId: seriesByAxisId
      };
    }, [primaryAxis, secondaryAxes, seriesByAxisId]);

    if (options.memoizeSeries) {
      getSeriesInfo = getMemoizedSeriesInfo;
    }

    var seriesEl = React__default['default'].useMemo(function () {
      var _getSeriesInfo = getSeriesInfo(),
          primaryAxis = _getSeriesInfo.primaryAxis,
          secondaryAxes = _getSeriesInfo.secondaryAxes,
          seriesByAxisId = _getSeriesInfo.seriesByAxisId;

      return seriesByAxisId.map(function (_ref4) {
        var axisId = _ref4[0],
            series = _ref4[1];
        var secondaryAxis = secondaryAxes.find(function (d) {
          return d.id === axisId;
        });

        if (!secondaryAxis) {
          return null;
        }

        var elementType = secondaryAxis.elementType;

        var Component = function () {
          if (elementType === 'line' || elementType === 'bubble' || elementType === 'area') {
            return Line;
          }

          if (elementType === 'bar') {
            return BarComponent;
          }

          throw new Error('Invalid elementType');
        }();

        if (primaryAxis.isInvalid || secondaryAxis.isInvalid) {
          return null;
        }

        return /*#__PURE__*/React__default['default'].createElement(Component, {
          key: axisId != null ? axisId : '__default__',
          primaryAxis: primaryAxis,
          secondaryAxis: secondaryAxis,
          series: series
        });
      });
    }, [getSeriesInfo]);
    return /*#__PURE__*/React__default['default'].createElement(ChartContextProvider, {
      value: useGetLatest(contextValue)
    }, /*#__PURE__*/React__default['default'].createElement("div", null, /*#__PURE__*/React__default['default'].createElement("svg", {
      ref: svgRef,
      style: {
        width: width,
        height: height,
        overflow: options.brush ? 'hidden' : 'visible'
      },
      onClick: function onClick(e) {
        return options.onClickDatum == null ? void 0 : options.onClickDatum(focusedDatum, e);
      },
      onMouseEnter: function onMouseEnter() {
        isInteractingState[1](true);
      },
      onMouseLeave: function onMouseLeave() {
        isInteractingState[1](false);
      }
    }, /*#__PURE__*/React__default['default'].createElement("g", {
      className: "axes"
    }, [primaryAxis].concat(secondaryAxes).map(function (axis) {
      return /*#__PURE__*/React__default['default'].createElement(AxisLinearComp, _extends({
        key: [axis.position, axis.id].join('')
      }, axis));
    })), /*#__PURE__*/React__default['default'].createElement("g", {
      className: "Series",
      style: {
        pointerEvents: 'none'
      }
    }, seriesEl), /*#__PURE__*/React__default['default'].createElement(Voronoi, null), (_options$renderSVG = options.renderSVG == null ? void 0 : options.renderSVG()) != null ? _options$renderSVG : null), /*#__PURE__*/React__default['default'].createElement(Cursors, null), /*#__PURE__*/React__default['default'].createElement(Tooltip, null)));
  }

  function getFirstDefinedValue(options, data) {
    var firstDefinedValue;
    data.some(function (serie) {
      return serie.data.some(function (originalDatum) {
        var value = options.getValue(originalDatum);

        if (value !== null && typeof value !== 'undefined') {
          firstDefinedValue = value;
          return true;
        }
      });
    });
    return firstDefinedValue;
  }

  function axisOptionsWithScaleType(options, firstValue) {
    var scaleType = options.scaleType;

    if (!options.scaleType) {
      if (typeof firstValue === 'number') {
        scaleType = 'linear';
      } else if (typeof (firstValue == null ? void 0 : firstValue.getMonth) === 'function') {
        scaleType = 'time';
      } else if (typeof firstValue === 'string' || typeof firstValue === 'boolean') {
        scaleType = 'band';
      } else {
        throw new Error('Invalid scale type: Unable to infer type from data');
      }
    }

    return _extends({}, options, {
      scaleType: scaleType
    });
  }

  function sortDatumsBySecondaryPx(datums, secondaryAxes) {
    return [].concat(datums).sort(function (a, b) {
      var _aAxis$scale, _a$stackData, _bAxis$scale, _b$stackData;

      var aAxis = secondaryAxes.find(function (d) {
        return d.id === a.secondaryAxisId;
      });
      var bAxis = secondaryAxes.find(function (d) {
        return d.id === b.secondaryAxisId;
      });
      var aPx = (_aAxis$scale = aAxis == null ? void 0 : aAxis.scale(aAxis.stacked ? (_a$stackData = a.stackData) == null ? void 0 : _a$stackData[1] : a.secondaryValue)) != null ? _aAxis$scale : NaN;
      var bPx = (_bAxis$scale = bAxis == null ? void 0 : bAxis.scale(bAxis.stacked ? (_b$stackData = b.stackData) == null ? void 0 : _b$stackData[1] : b.secondaryValue)) != null ? _bAxis$scale : NaN;
      return aPx - bPx;
    });
  }

  exports.Chart = Chart;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=react-charts.development.js.map
