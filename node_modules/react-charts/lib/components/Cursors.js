"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault")["default"];

exports.__esModule = true;
exports["default"] = Cursors;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _usePrevious = _interopRequireDefault(require("../hooks/usePrevious"));

var _useLatestWhen = _interopRequireDefault(require("../hooks/useLatestWhen"));

var _usePortalElement = _interopRequireDefault(require("../hooks/usePortalElement"));

var _Utils = require("../utils/Utils");

var _chartContext = _interopRequireDefault(require("../utils/chartContext"));

var _useRect = _interopRequireDefault(require("../hooks/useRect"));

var _useSpring = require("../hooks/useSpring");

var _useGetLatest = _interopRequireDefault(require("../hooks/useGetLatest"));

//
//
var getLineBackgroundColor = function getLineBackgroundColor(dark, bandWidth) {
  return dark ? "rgba(255,255,255," + (bandWidth > 4 ? 0.15 : 0.3) + ")" : "rgba(0, 26, 39, " + (bandWidth > 4 ? 0.15 : 0.3) + ")";
};

var getBackgroundColor = function getBackgroundColor(dark) {
  return dark ? 'rgba(255,255,255,.9)' : 'rgba(0, 26, 39, 0.9)';
};

function defaultCursor(options) {
  var _options$show, _options$showLine, _options$showLabel;

  return (0, _extends2["default"])({}, options, {
    show: (_options$show = options.show) != null ? _options$show : true,
    showLine: (_options$showLine = options.showLine) != null ? _options$showLine : true,
    showLabel: (_options$showLabel = options.showLabel) != null ? _options$showLabel : true
  });
}

function Cursors() {
  var _getOptions$primaryCu, _getOptions$secondary;

  var _useChartContext = (0, _chartContext["default"])(),
      getOptions = _useChartContext.getOptions;

  var primaryOptions = (_getOptions$primaryCu = getOptions().primaryCursor) != null ? _getOptions$primaryCu : true;
  var secondaryOptions = (_getOptions$secondary = getOptions().secondaryCursor) != null ? _getOptions$secondary : true;

  var resolvedPrimaryOptions = _react["default"].useMemo(function () {
    return defaultCursor(!primaryOptions ? {
      show: false
    } : typeof primaryOptions === 'boolean' ? {} : primaryOptions);
  }, [primaryOptions]);

  var resolvedSecondaryOptions = _react["default"].useMemo(function () {
    return defaultCursor(!secondaryOptions ? {
      show: false
    } : typeof secondaryOptions === 'boolean' ? {} : secondaryOptions);
  }, [secondaryOptions]);

  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(Cursor, {
    primary: true,
    options: resolvedPrimaryOptions
  }), /*#__PURE__*/_react["default"].createElement(Cursor, {
    options: resolvedSecondaryOptions
  }));
}

function Cursor(props) {
  var _secondaryAxes$find, _props$options$value, _ref, _ref2, _ref3, _ref4, _getOptions$dark;

  var _useChartContext2 = (0, _chartContext["default"])(),
      getOptions = _useChartContext2.getOptions,
      svgRef = _useChartContext2.svgRef,
      gridDimensions = _useChartContext2.gridDimensions,
      focusedDatumState = _useChartContext2.focusedDatumState,
      primaryAxis = _useChartContext2.primaryAxis,
      secondaryAxes = _useChartContext2.secondaryAxes;

  var getTooltipOptions = (0, _useGetLatest["default"])(props.options);
  var focusedDatum = focusedDatumState[0];
  var latestFocusedDatum = (0, _useLatestWhen["default"])(focusedDatum, !!focusedDatum);
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

  _react["default"].useEffect(function () {
    var _getTooltipOptions;

    (_getTooltipOptions = getTooltipOptions()) == null ? void 0 : _getTooltipOptions.onChange == null ? void 0 : _getTooltipOptions.onChange(datumValue);
  }, [getTooltipOptions, datumValue]);

  var value = (_props$options$value = props.options.value) != null ? _props$options$value : datumValue;
  var latestPropsValue = (0, _useLatestWhen["default"])(props.options.value, props.options.value != null);
  var latestDatumValue = (0, _useLatestWhen["default"])(resolveValue(latestFocusedDatum), resolveValue(latestFocusedDatum) != null);
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
  var svgRect = (0, _useRect["default"])(svgRef.current, show);

  var lineRef = _react["default"].useRef(null);

  var bubbleRef = _react["default"].useRef(null);

  var latestLineStartX = (0, _useLatestWhen["default"])(lineStartX, px != null);
  var latestLineStartY = (0, _useLatestWhen["default"])(lineStartY, px != null);
  var latestBubbleX = (0, _useLatestWhen["default"])(bubbleX, px != null);
  var latestBubbleY = (0, _useLatestWhen["default"])(bubbleY, px != null);
  var previousTruePx = (0, _usePrevious["default"])(px);
  var immediate = previousTruePx == null && px !== null;
  lineStartX = (_ref = px != null ? lineStartX : latestLineStartX) != null ? _ref : NaN;
  lineStartY = (_ref2 = px != null ? lineStartY : latestLineStartY) != null ? _ref2 : NaN;
  bubbleX = (_ref3 = px != null ? bubbleX : latestBubbleX) != null ? _ref3 : NaN;
  bubbleY = (_ref4 = px != null ? bubbleY : latestBubbleY) != null ? _ref4 : NaN;
  var lineXSpring = (0, _useSpring.useSpring)(lineStartX, [1, 210, 20], function () {
    if (lineRef.current) {
      lineRef.current.style.transform = "translate(" + lineXSpring.x() + "px, " + lineYSpring.x() + "px)";
    }
  }, immediate);
  var lineYSpring = (0, _useSpring.useSpring)(lineStartY, [1, 210, 20], function () {
    if (lineRef.current) {
      lineRef.current.style.transform = "translate(" + lineXSpring.x() + "px, " + lineYSpring.x() + "px)";
    }
  }, immediate);
  var bubbleXSpring = (0, _useSpring.useSpring)(bubbleX, [1, 210, 20], function () {
    if (bubbleRef.current) {
      bubbleRef.current.style.transform = "translate(" + bubbleXSpring.x() + "px, " + bubbleYSpring.x() + "px)";
    }
  }, immediate);
  var bubbleYSpring = (0, _useSpring.useSpring)(bubbleY, [1, 210, 20], function () {
    if (bubbleRef.current) {
      bubbleRef.current.style.transform = "translate(" + bubbleXSpring.x() + "px, " + bubbleYSpring.x() + "px)";
    }
  }, immediate);
  var portalEl = (0, _usePortalElement["default"])();
  return portalEl ? /*#__PURE__*/_reactDom["default"].createPortal( /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      fontFamily: 'sans-serif',
      pointerEvents: 'none',
      position: 'absolute',
      top: 0,
      left: 0,
      transform: (0, _Utils.translate)(svgRect.left + gridDimensions.left, svgRect.top + gridDimensions.top),
      opacity: show ? 1 : 0,
      transition: 'opacity .3s ease'
    },
    className: "Cursor"
  }, props.options.showLine ? /*#__PURE__*/_react["default"].createElement("div", {
    ref: lineRef,
    style: {
      width: lineWidth + "px",
      height: lineHeight + "px",
      position: 'absolute',
      top: 0,
      left: 0,
      background: getLineBackgroundColor((_getOptions$dark = getOptions().dark) != null ? _getOptions$dark : false, bandWidth)
    }
  }) : null, props.options.showLabel ? /*#__PURE__*/_react["default"].createElement("div", {
    ref: bubbleRef,
    style: {
      position: 'absolute',
      top: 0,
      left: 0
    }
  }, /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      padding: '5px',
      fontSize: '10px',
      background: getBackgroundColor(getOptions().dark),
      color: getBackgroundColor(!getOptions().dark),
      borderRadius: '3px',
      position: 'relative',
      transform: "translate3d(" + alignPctX + "%, " + alignPctY + "%, 0)",
      whiteSpace: 'nowrap'
    }
  }, formattedValue)) : null), portalEl) : null;
}