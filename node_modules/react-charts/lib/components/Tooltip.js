"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault")["default"];

exports.__esModule = true;
exports.defaultTooltip = defaultTooltip;
exports["default"] = Tooltip;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _useAnchor = require("../hooks/useAnchor");

var _useLatestWhen2 = _interopRequireDefault(require("../hooks/useLatestWhen"));

var _usePortalElement = _interopRequireDefault(require("../hooks/usePortalElement"));

var _usePrevious = _interopRequireDefault(require("../hooks/usePrevious"));

var _chartContext = _interopRequireDefault(require("../utils/chartContext"));

var _TooltipRenderer = _interopRequireDefault(require("./TooltipRenderer"));

var _useRect = _interopRequireDefault(require("../hooks/useRect"));

var _useSpring = require("../hooks/useSpring");

var _excluded = ["visibility"];

//
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

  return (0, _extends2["default"])({
    show: true
  }, options, {
    align: (_options$align = options.align) != null ? _options$align : 'auto',
    alignPriority: (_options$alignPriorit = options.alignPriority) != null ? _options$alignPriorit : ['right', 'topRight', 'bottomRight', 'left', 'topLeft', 'bottomLeft', 'top', 'bottom'],
    padding: (_options$padding = options.padding) != null ? _options$padding : 5,
    arrowPadding: (_options$arrowPadding = options.arrowPadding) != null ? _options$arrowPadding : 7,
    // anchor: options.anchor ?? 'closest',
    render: (_options$render = options.render) != null ? _options$render : _TooltipRenderer["default"]
  });
}

function Tooltip() {
  var _secondaryAxes$find, _useLatestWhen;

  var _useChartContext = (0, _chartContext["default"])(),
      focusedDatumState = _useChartContext.focusedDatumState,
      getOptions = _useChartContext.getOptions,
      primaryAxis = _useChartContext.primaryAxis,
      secondaryAxes = _useChartContext.secondaryAxes,
      getDatumStatusStyle = _useChartContext.getDatumStatusStyle,
      svgRef = _useChartContext.svgRef;

  var focusedDatum = focusedDatumState[0];
  var latestFocusedDatum = (0, _useLatestWhen2["default"])(focusedDatum, !!focusedDatum);
  var secondaryAxis = (_secondaryAxes$find = secondaryAxes.find(function (d) {
    return d.id === (latestFocusedDatum == null ? void 0 : latestFocusedDatum.secondaryAxisId);
  })) != null ? _secondaryAxes$find : secondaryAxes[0];
  var portalEl = (0, _usePortalElement["default"])();

  var _React$useState = _react["default"].useState(),
      tooltipEl = _React$useState[0],
      setTooltipEl = _React$useState[1];

  var svgRect = (0, _useRect["default"])(svgRef.current, !!(focusedDatum != null && focusedDatum.element));

  var anchorEl = _react["default"].useMemo(function () {
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

  var anchor = (0, _useAnchor.useAnchor)({
    show: !!focusedDatum,
    portalEl: portalEl,
    anchorEl: anchorEl,
    tooltipEl: tooltipEl,
    side: ['right', 'left', 'top', 'bottom']
  });
  var previousAnchor = (0, _usePrevious["default"])(anchor);
  var latestStableAnchor = (_useLatestWhen = (0, _useLatestWhen2["default"])(anchor, !!anchor.fit)) != null ? _useLatestWhen : anchor;
  var _latestStableAnchor$s = latestStableAnchor.style,
      visibility = _latestStableAnchor$s.visibility,
      anchorStyle = (0, _objectWithoutPropertiesLoose2["default"])(_latestStableAnchor$s, _excluded);

  var tooltipRef = _react["default"].useRef(null);

  var immediate = Number.isNaN(previousAnchor == null ? void 0 : previousAnchor.style.left);
  var tooltipXSpring = (0, _useSpring.useSpring)(anchorStyle.left || 0, [1, 210, 30], function () {
    if (tooltipRef.current) {
      tooltipRef.current.style.transform = "translate(" + tooltipXSpring.x() + "px, " + tooltipYSpring.x() + "px)";
    }
  }, immediate);
  var tooltipYSpring = (0, _useSpring.useSpring)(anchorStyle.top || 0, [1, 210, 30], function () {
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
  var latestFit = (0, _useLatestWhen2["default"])(anchor.fit, !!anchor.fit);
  return show && portalEl ? /*#__PURE__*/_reactDom["default"].createPortal( /*#__PURE__*/_react["default"].createElement("div", {
    ref: tooltipRef,
    style: {
      position: anchorStyle.position,
      opacity: !!focusedDatum ? 1 : 0,
      transition: 'opacity .3s ease'
    }
  }, /*#__PURE__*/_react["default"].createElement("div", {
    ref: function ref(el) {
      return setTooltipEl(el);
    },
    style: (0, _extends2["default"])({
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