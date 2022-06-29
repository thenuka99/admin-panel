import _extends from "@babel/runtime/helpers/esm/extends";
import { area, line } from 'd3-shape';
import React from 'react';
import { isDefined, translate } from '../utils/Utils';
import useChartContext from '../utils/chartContext'; //

import { monotoneX } from '../utils/curveMonotone';
export default function Line(_ref) {
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
  return /*#__PURE__*/React.createElement("g", {
    style: {
      transform: translate(gridDimensions.left, gridDimensions.top)
    }
  }, allSeries.map(function (series, i) {
    var _lineFn, _secondaryAxis$showDa;

    var style = getSeriesStatusStyle(series, focusedDatum);
    var areaPath = null;

    if (secondaryAxis.elementType === 'area') {
      var _x2 = function _x2(datum) {
        return getPrimary(datum, primaryAxis);
      };

      var _y1 = function _y1(datum) {
        return clampPxToAxis(getSecondaryStart(datum, secondaryAxis), secondaryAxis);
      };

      var _y2 = function _y2(datum) {
        return clampPxToAxis(getSecondary(datum, secondaryAxis), secondaryAxis);
      };

      var areaFn = area(_x2, _y1, _y2).curve(curve);
      areaFn.defined(function (datum) {
        return [_x2(datum), _y1(datum), _y2(datum)].every(isDefined);
      });
      areaPath = areaFn(series.datums);
    }

    var _x = function _x(datum) {
      return getPrimary(datum, primaryAxis);
    };

    var _y = function _y(datum) {
      return getSecondary(datum, secondaryAxis);
    };

    var lineFn = line(_x, _y).curve(curve);
    lineFn.defined(function (datum) {
      return [_x(datum), _y(datum)].every(isDefined);
    });
    var linePath = secondaryAxis.elementType === 'area' || secondaryAxis.elementType === 'line' ? (_lineFn = lineFn(series.datums)) != null ? _lineFn : undefined : undefined;
    var showDatumElements = (_secondaryAxis$showDa = secondaryAxis.showDatumElements) != null ? _secondaryAxis$showDa : secondaryAxis.elementType === 'bubble' || 'onFocus';
    return /*#__PURE__*/React.createElement("g", {
      key: "lines-" + i
    }, areaPath ? /*#__PURE__*/React.createElement("path", {
      d: areaPath,
      style: _extends({
        strokeWidth: 2,
        opacity: 0.5
      }, style, style.area)
    }) : null, linePath ? /*#__PURE__*/React.createElement("path", {
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
      return /*#__PURE__*/React.createElement("circle", {
        key: i,
        ref: function ref(el) {
          datum.element = el;
        },
        cx: getX(datum, primaryAxis, secondaryAxis) || 0,
        cy: getY(datum, primaryAxis, secondaryAxis) || 0,
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

function getX(datum, primaryAxis, secondaryAxis) {
  return primaryAxis.isVertical ? getSecondary(datum, secondaryAxis) : getPrimary(datum, primaryAxis);
}

function getY(datum, primaryAxis, secondaryAxis) {
  return primaryAxis.isVertical ? getPrimary(datum, primaryAxis) : getSecondary(datum, secondaryAxis);
}

function getPrimary(datum, primaryAxis) {
  var _primaryAxis$scale;

  var primary = (_primaryAxis$scale = primaryAxis.scale(datum.primaryValue)) != null ? _primaryAxis$scale : NaN;

  if (primaryAxis.axisFamily === 'band') {
    primary += primaryAxis.scale.bandwidth() / 2;
  }

  return primary;
}

function getSecondary(datum, secondaryAxis) {
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