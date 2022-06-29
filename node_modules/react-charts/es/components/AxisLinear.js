import _extends from "@babel/runtime/helpers/esm/extends";
import React from 'react';
import { translate } from '../utils/Utils';
import useChartContext from '../utils/chartContext'; //

import useMeasure from './AxisLinear.useMeasure';
export default function AxisLinearComp(axis) {
  var _React$useState = React.useState(false),
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

  var elRef = React.useRef(null);
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
    return /*#__PURE__*/React.createElement("g", {
      key: "Axis-Group " + (isOuter ? 'outer' : 'inner'),
      className: "Axis-Group " + (isOuter ? 'outer' : 'inner'),
      style: {
        transform: isOuter ? undefined : translate(gridDimensions.left, gridDimensions.top)
      }
    }, /*#__PURE__*/React.createElement("g", {
      className: "Axis",
      style: _extends({}, isOuter ? {
        opacity: showDebugAxes ? 0.5 : 0,
        pointerEvents: 'none'
      } : {
        opacity: 1,
        pointerEvents: 'all'
      })
    }, /*#__PURE__*/React.createElement("g", {
      className: "domainAndTicks"
    }, /*#__PURE__*/React.createElement("line", {
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

      return /*#__PURE__*/React.createElement("g", {
        key: "vx-tick-" + tick + "-" + i,
        className: 'tick'
      }, !isOuter ? /*#__PURE__*/React.createElement("line", {
        x1: tick.from.x,
        y1: tick.from.y,
        x2: tick.to.x,
        y2: tick.to.y,
        stroke: dark ? 'rgba(255,255,255, .2)' : 'rgba(0,0,0, .2)'
      }) : null, /*#__PURE__*/React.createElement("text", {
        className: "tickLabel",
        style: {
          fontSize: 10,
          fill: dark ? 'rgba(255,255,255, .7)' : 'rgba(0,0,0, .7)',
          dominantBaseline: isRotated ? 'central' : axis.position === 'bottom' ? 'hanging' : axis.position === 'top' ? 'alphabetic' : 'central',
          textAnchor: isRotated ? 'end' : axis.position === 'right' ? 'start' : axis.position === 'left' ? 'end' : 'middle'
        },
        transform: "translate(" + tickLabelX + ", " + tickLabelY + ") rotate(" + (isRotated ? axis.position === 'top' ? 60 : -60 : 0) + ")"
      }, axis.formatters.scale(tick.value)));
    })), /*#__PURE__*/React.createElement("g", {
      className: "grid"
    }, ticks.map(function (tick, i) {
      var _axis$showGrid;

      return /*#__PURE__*/React.createElement("g", {
        key: "vx-tick-" + tick + "-" + i,
        className: 'tick'
      }, ((_axis$showGrid = axis.showGrid) != null ? _axis$showGrid : true) && !isOuter ? /*#__PURE__*/React.createElement("line", {
        x1: tick.from.x,
        y1: tick.from.y,
        x2: tick.gridTo.x,
        y2: tick.gridTo.y,
        stroke: dark ? 'rgba(255,255,255, .05)' : 'rgba(0,0,0, .05)'
      }) : null);
    }))));
  };

  return axis.show ? /*#__PURE__*/React.createElement("g", {
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