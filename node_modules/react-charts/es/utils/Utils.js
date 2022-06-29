import _extends from "@babel/runtime/helpers/esm/extends";
export function getSeriesStatus(series, focusedDatum) {
  if ((focusedDatum == null ? void 0 : focusedDatum.seriesId) === series.id) {
    return 'focused';
  }

  return 'none';
}
export function getDatumStatus(datum, focusedDatum) {
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
export function materializeStyles(style, defaults) {
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
export function translate(x, y) {
  return "translate3d(" + Math.round(x) + "px, " + Math.round(y) + "px, 0)";
} //

function normalizeColor(style, defaults) {
  return _extends({}, style, {
    stroke: style.stroke || style.color || defaults.stroke || defaults.color,
    fill: style.fill || style.color || defaults.fill || defaults.color
  });
}

export function isDefined(num) {
  return typeof num === 'number' && !Number.isNaN(num);
}