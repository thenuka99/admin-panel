"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault")["default"];

exports.__esModule = true;
exports.getSeriesStatus = getSeriesStatus;
exports.getDatumStatus = getDatumStatus;
exports.materializeStyles = materializeStyles;
exports.translate = translate;
exports.isDefined = isDefined;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

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
  return (0, _extends2["default"])({}, style, {
    stroke: style.stroke || style.color || defaults.stroke || defaults.color,
    fill: style.fill || style.color || defaults.fill || defaults.color
  });
}

function isDefined(num) {
  return typeof num === 'number' && !Number.isNaN(num);
}