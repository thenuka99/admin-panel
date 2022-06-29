"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault")["default"];

exports.__esModule = true;
exports["default"] = tooltipRenderer;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _d3Array = require("d3-array");

var _react = _interopRequireDefault(require("react"));

var _useLatestWhen = _interopRequireDefault(require("../hooks/useLatestWhen"));

//
//
var showCount = 10;
var triangleSize = 7;

var getBackgroundColor = function getBackgroundColor(dark) {
  return dark ? 'rgba(255,255,255,.9)' : 'rgba(0, 26, 39, 0.9)';
};

function tooltipRenderer(props) {
  return /*#__PURE__*/_react["default"].createElement(TooltipRenderer, props);
}

function TooltipRenderer(props) {
  var _props$focusedDatum$t, _props$focusedDatum, _focusedDatum$tooltip;

  var latestFit = (0, _useLatestWhen["default"])(props.anchor.fit, !!props.anchor.fit);

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
  var resolvedShowCount = showCount % 2 === 0 ? showCount : showCount + 1;
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

  return /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      position: 'relative',
      fontSize: '10px',
      padding: '5px',
      background: getBackgroundColor(dark),
      color: dark ? 'black' : 'white',
      borderRadius: '3px'
    }
  }, /*#__PURE__*/_react["default"].createElement("div", {
    style: (0, _extends2["default"])({
      position: 'absolute',
      width: 0,
      height: 0
    }, triangleStyles)
  }), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      marginBottom: '3px',
      textAlign: 'center'
    }
  }, tooltip.groupingMode === 'series' ? /*#__PURE__*/_react["default"].createElement("strong", null, focusedDatum.seriesLabel) : tooltip.groupingMode === 'secondary' ? /*#__PURE__*/_react["default"].createElement("strong", null, secondaryAxis.formatters.tooltip(focusedDatum.secondaryValue)) : /*#__PURE__*/_react["default"].createElement("strong", null, primaryAxis.formatters.tooltip(focusedDatum.primaryValue))), /*#__PURE__*/_react["default"].createElement("table", {
    style: {
      whiteSpace: 'nowrap'
    }
  }, /*#__PURE__*/_react["default"].createElement("tbody", null, hasPrevious ? /*#__PURE__*/_react["default"].createElement("tr", {
    style: {
      opacity: 0.8
    }
  }, /*#__PURE__*/_react["default"].createElement("td", null), /*#__PURE__*/_react["default"].createElement("td", null, "..."), /*#__PURE__*/_react["default"].createElement("td", null)) : null, visibleSortedGroupDatums.map(function (sortedDatum, i) {
    var active = sortedDatum === focusedDatum;
    var datumSecondaryAxis = secondaryAxes.find(function (d) {
      return d.id === sortedDatum.secondaryAxisId;
    });
    return /*#__PURE__*/_react["default"].createElement("tr", {
      key: i,
      style: {
        opacity: active ? 1 : 0.8,
        fontWeight: active ? 'bold' : undefined
      }
    }, /*#__PURE__*/_react["default"].createElement("td", {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }, /*#__PURE__*/_react["default"].createElement("svg", {
      width: "14",
      height: "14"
    }, /*#__PURE__*/_react["default"].createElement("circle", {
      cx: "7",
      cy: "7",
      r: "5",
      style: (0, _extends2["default"])({}, getDatumStyle(sortedDatum), {
        stroke: dark ? 'black' : 'white',
        strokeWidth: active ? 2 : 1
      })
    }))), tooltip.groupingMode === 'series' ? /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("td", null, primaryAxis.formatters.tooltip(sortedDatum.primaryValue), ": \xA0"), /*#__PURE__*/_react["default"].createElement("td", {
      style: {
        textAlign: 'right'
      }
    }, datumSecondaryAxis.formatters.tooltip(sortedDatum.secondaryValue))) : tooltip.groupingMode === 'secondary' ? /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("td", null, sortedDatum.seriesLabel, ": \xA0"), /*#__PURE__*/_react["default"].createElement("td", {
      style: {
        textAlign: 'right'
      }
    }, primaryAxis.formatters.tooltip(sortedDatum.primaryValue))) : /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("td", null, sortedDatum.seriesLabel, ": \xA0"), /*#__PURE__*/_react["default"].createElement("td", {
      style: {
        textAlign: 'right'
      }
    }, datumSecondaryAxis.formatters.tooltip(sortedDatum.secondaryValue))));
  }), hasNext ? /*#__PURE__*/_react["default"].createElement("tr", {
    style: {
      opacity: 0.8
    }
  }, /*#__PURE__*/_react["default"].createElement("td", null), /*#__PURE__*/_react["default"].createElement("td", null, "..."), /*#__PURE__*/_react["default"].createElement("td", null)) : null, ((_focusedDatum$tooltip = focusedDatum.tooltipGroup) != null ? _focusedDatum$tooltip : []).length > 1 ? props.secondaryAxes.filter(function (d) {
    return d.stacked;
  }).map(function (secondaryAxis, i) {
    var _secondaryAxis$id, _focusedDatum$tooltip2;

    return /*#__PURE__*/_react["default"].createElement("tr", {
      key: secondaryAxis.id + "_" + i
    }, /*#__PURE__*/_react["default"].createElement("td", {
      style: {
        paddingTop: '5px'
      }
    }, /*#__PURE__*/_react["default"].createElement("div", {
      style: {
        width: '12px',
        height: '12px',
        backgroundColor: dark ? 'rgba(0, 26, 39, 0.3)' : 'rgba(255,255,255,.2)',
        borderRadius: '50px'
      }
    })), /*#__PURE__*/_react["default"].createElement("td", {
      style: {
        paddingTop: '5px'
      }
    }, props.secondaryAxes.length > 1 ? (_secondaryAxis$id = secondaryAxis.id) != null ? _secondaryAxis$id : "Axis " + (i + 1) + " " : '', "Total: \xA0"), /*#__PURE__*/_react["default"].createElement("td", {
      style: {
        paddingTop: '5px'
      }
    }, secondaryAxis.formatters.scale((0, _d3Array.sum)((_focusedDatum$tooltip2 = focusedDatum.tooltipGroup) != null ? _focusedDatum$tooltip2 : [], function (d) {
      return d.secondaryValue;
    }))));
  }) : null))));
}