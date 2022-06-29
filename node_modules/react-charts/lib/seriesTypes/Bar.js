"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault")["default"];

exports.__esModule = true;
exports["default"] = BarComponent;
exports.getPrimaryGroupLength = getPrimaryGroupLength;
exports.getPrimaryLength = getPrimaryLength;
exports.getPrimary = getPrimary;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _Utils = require("../utils/Utils");

var _chartContext = _interopRequireDefault(require("../utils/chartContext"));

//
function BarComponent(_ref) {
  var primaryAxis = _ref.primaryAxis,
      secondaryAxis = _ref.secondaryAxis,
      allSeries = _ref.series;

  var _useChartContext = (0, _chartContext["default"])(),
      getSeriesStatusStyle = _useChartContext.getSeriesStatusStyle,
      getDatumStatusStyle = _useChartContext.getDatumStatusStyle,
      focusedDatumState = _useChartContext.focusedDatumState,
      gridDimensions = _useChartContext.gridDimensions;

  var focusedDatum = focusedDatumState[0];
  var xAxis = primaryAxis.isVertical ? secondaryAxis : primaryAxis;
  var yAxis = primaryAxis.isVertical ? primaryAxis : secondaryAxis;
  return /*#__PURE__*/_react["default"].createElement("g", {
    style: {
      transform: (0, _Utils.translate)(gridDimensions.left, gridDimensions.top)
    }
  }, allSeries.map(function (series, i) {
    var style = getSeriesStatusStyle(series, focusedDatum);
    return /*#__PURE__*/_react["default"].createElement("g", {
      key: "lines-" + i
    }, series.datums.map(function (datum, i) {
      var _getRectX, _getWidth, _getRectY, _getHeight;

      var dataStyle = getDatumStatusStyle(datum, focusedDatum);

      var _clampPxToAxis = clampPxToAxis((_getRectX = getRectX(datum, primaryAxis, secondaryAxis)) != null ? _getRectX : NaN, (_getWidth = getWidth(datum, primaryAxis, secondaryAxis)) != null ? _getWidth : NaN, xAxis),
          x = _clampPxToAxis[0],
          width = _clampPxToAxis[1];

      var _clampPxToAxis2 = clampPxToAxis((_getRectY = getRectY(datum, primaryAxis, secondaryAxis)) != null ? _getRectY : NaN, (_getHeight = getHeight(datum, primaryAxis, secondaryAxis)) != null ? _getHeight : NaN, yAxis),
          y = _clampPxToAxis2[0],
          height = _clampPxToAxis2[1];

      return /*#__PURE__*/_react["default"].createElement("rect", {
        ref: function ref(el) {
          datum.element = el;
        },
        key: i,
        x: x,
        y: y,
        width: width,
        height: height,
        style: (0, _extends2["default"])({
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
  var secondary = [getSecondaryStart(datum, secondaryAxis), getSecondary(datum, secondaryAxis)];
  return Math.abs(secondary[1] - secondary[0]);
}

function getRectX(datum, primaryAxis, secondaryAxis) {
  return primaryAxis.isVertical ? getSecondaryStart(datum, secondaryAxis) : getPrimary(datum, primaryAxis, secondaryAxis);
}

function getRectY(datum, primaryAxis, secondaryAxis) {
  return primaryAxis.isVertical ? getPrimary(datum, primaryAxis, secondaryAxis) : getSecondary(datum, secondaryAxis);
}

function getPrimary(datum, primaryAxis, secondaryAxis) {
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

function getSecondaryStart(datum, secondaryAxis) {
  var _secondaryAxis$scale2;

  if (secondaryAxis.stacked) {
    var _secondaryAxis$scale, _datum$stackData$, _datum$stackData;

    return (_secondaryAxis$scale = secondaryAxis.scale((_datum$stackData$ = (_datum$stackData = datum.stackData) == null ? void 0 : _datum$stackData[0]) != null ? _datum$stackData$ : NaN)) != null ? _secondaryAxis$scale : NaN;
  }

  return (_secondaryAxis$scale2 = secondaryAxis.scale(0)) != null ? _secondaryAxis$scale2 : NaN;
}

function getSecondary(datum, secondaryAxis) {
  var _secondaryAxis$scale4;

  if (secondaryAxis.stacked) {
    var _secondaryAxis$scale3, _datum$stackData$2, _datum$stackData2;

    return (_secondaryAxis$scale3 = secondaryAxis.scale((_datum$stackData$2 = (_datum$stackData2 = datum.stackData) == null ? void 0 : _datum$stackData2[1]) != null ? _datum$stackData$2 : NaN)) != null ? _secondaryAxis$scale3 : NaN;
  }

  return (_secondaryAxis$scale4 = secondaryAxis.scale(datum.secondaryValue)) != null ? _secondaryAxis$scale4 : NaN;
}

function clampPxToAxis(startPx, lengthPx, axis) {
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