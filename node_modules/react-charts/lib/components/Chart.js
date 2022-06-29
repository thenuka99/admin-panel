"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault")["default"];

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard")["default"];

exports.__esModule = true;
exports.Chart = Chart;

var _createForOfIteratorHelperLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/createForOfIteratorHelperLoose"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _d3Array = require("d3-array");

var _react = _interopRequireDefault(require("react"));

var _useGetLatest = _interopRequireDefault(require("../hooks/useGetLatest"));

var _useIsomorphicLayoutEffect = _interopRequireDefault(require("../hooks/useIsomorphicLayoutEffect"));

var _Bar = _interopRequireWildcard(require("../seriesTypes/Bar"));

var _Line = _interopRequireDefault(require("../seriesTypes/Line"));

var _Utils = require("../utils/Utils");

var _buildAxis = _interopRequireDefault(require("../utils/buildAxis.linear"));

var _chartContext = require("../utils/chartContext");

var _AxisLinear = _interopRequireDefault(require("./AxisLinear"));

var _Cursors = _interopRequireDefault(require("./Cursors"));

var _Tooltip = _interopRequireWildcard(require("./Tooltip"));

var _Voronoi = _interopRequireDefault(require("./Voronoi"));

var _excluded = ["options", "className", "style"];
//
//
var defaultColorScheme = ['#0f83ab', '#faa43a', '#fd6868', '#53cfc9', '#a2d925', '#decf3f', '#734fe9', '#cd82ad', '#006d92', '#de7c00', '#f33232', '#3f9a80', '#53c200', '#d7af00', '#4c26c9', '#d44d99'];
var defaultPadding = 5;

function defaultChartOptions(options) {
  var _options$initialWidth, _options$initialHeigh, _options$getSeriesOrd, _options$interactionM, _options$showVoronoi, _options$defaultColor, _options$useIntersect, _options$intersection, _options$primaryCurso, _options$secondaryCur, _options$padding;

  return (0, _extends2["default"])({}, options, {
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
      rest = (0, _objectWithoutPropertiesLoose2["default"])(_ref, _excluded);
  var options = defaultChartOptions(userOptions);

  var _React$useState = _react["default"].useState(null),
      chartElement = _React$useState[0],
      setContainerElement = _React$useState[1];

  var containerEl = chartElement == null ? void 0 : chartElement.parentElement;

  var nearestScrollableParent = _react["default"].useMemo(function () {
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

  var _React$useState2 = _react["default"].useState({
    width: options.initialWidth,
    height: options.initialHeight
  }),
      _React$useState2$ = _React$useState2[0],
      width = _React$useState2$.width,
      height = _React$useState2$.height,
      setDims = _React$useState2[1];

  (0, _useIsomorphicLayoutEffect["default"])(function () {
    if (containerEl) {
      var computed = window.getComputedStyle(containerEl);

      if (!['relative', 'absolute', 'fixed'].includes(computed.position)) {
        containerEl.style.position = 'relative';
      }
    }
  }, [containerEl]);

  _react["default"].useEffect(function () {
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

  var _React$useState3 = _react["default"].useState(true),
      isIntersecting = _React$useState3[0],
      setIsIntersecting = _React$useState3[1];

  _react["default"].useEffect(function () {
    if (!containerEl || !options.useIntersectionObserver) return;
    var observer = new IntersectionObserver(function (entries) {
      for (var _iterator = (0, _createForOfIteratorHelperLoose2["default"])(entries), _step; !(_step = _iterator()).done;) {
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

  return /*#__PURE__*/_react["default"].createElement("div", (0, _extends2["default"])({
    ref: setContainerElement
  }, rest, {
    className: "ReactChart " + (className || ''),
    style: (0, _extends2["default"])({
      fontFamily: 'sans-serif'
    }, style, {
      position: 'absolute',
      width: width,
      height: height
    })
  }), isIntersecting ? /*#__PURE__*/_react["default"].createElement(ChartInner, {
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

  var primaryAxisOptions = _react["default"].useMemo(function () {
    var firstValue = getFirstDefinedValue(options.primaryAxis, options.data);
    var axisOptions = axisOptionsWithScaleType(options.primaryAxis, firstValue);
    return (0, _extends2["default"])({
      position: 'bottom'
    }, axisOptions);
  }, [options.data, options.primaryAxis]);

  var secondaryAxesOptions = _react["default"].useMemo(function () {
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

      return (0, _extends2["default"])({
        position: !i ? 'left' : 'right'
      }, axisOptions);
    });
  }, [options.data, options.secondaryAxes, primaryAxisOptions]); // Resolve Tooltip Option


  var tooltipOptions = _react["default"].useMemo(function () {
    var _options, _tooltipOptions$group;

    var tooltipOptions = (0, _Tooltip.defaultTooltip)((_options = options) == null ? void 0 : _options.tooltip);
    tooltipOptions.groupingMode = (_tooltipOptions$group = tooltipOptions.groupingMode) != null ? _tooltipOptions$group : function () {
      if (options.interactionMode === 'closest') {
        return 'single';
      }

      return 'primary';
    }();
    return tooltipOptions;
  }, [options.interactionMode, (_options2 = options) == null ? void 0 : _options2.tooltip]);

  options = (0, _extends2["default"])({}, options, {
    tooltip: tooltipOptions
  }); //

  var svgRef = _react["default"].useRef(null);

  var getOptions = (0, _useGetLatest["default"])((0, _extends2["default"])({}, options, {
    tooltip: tooltipOptions
  }));

  var axisDimensionsState = _react["default"].useState({
    left: {},
    right: {},
    top: {},
    bottom: {}
  });

  var axisDimensions = axisDimensionsState[0];

  var isInteractingState = _react["default"].useState(false);

  var isInteracting = isInteractingState[0];

  var focusedDatumState = _react["default"].useState(null);

  var focusedDatum = focusedDatumState[0]; // useAtom<Datum<TDatum> | null>(focusedDatumAtom)

  var gridDimensions = _react["default"].useMemo(function () {
    var _options$padding$left, _options$padding$righ, _options$padding$bott, _options$padding$top;

    var padding = {
      left: typeof options.padding === 'object' ? (_options$padding$left = options.padding.left) != null ? _options$padding$left : defaultPadding : options.padding,
      right: typeof options.padding === 'object' ? (_options$padding$righ = options.padding.right) != null ? _options$padding$righ : defaultPadding : options.padding,
      bottom: typeof options.padding === 'object' ? (_options$padding$bott = options.padding.bottom) != null ? _options$padding$bott : defaultPadding : options.padding,
      top: typeof options.padding === 'object' ? (_options$padding$top = options.padding.top) != null ? _options$padding$top : defaultPadding : options.padding
    };
    var left = padding.left + Math.max((0, _d3Array.sum)(Object.values(axisDimensions.left), function (d) {
      return d.width;
    }), (0, _d3Array.sum)(Object.values(axisDimensions.top), function (d) {
      return d.paddingLeft;
    }), (0, _d3Array.sum)(Object.values(axisDimensions.bottom), function (d) {
      return d.paddingLeft;
    }));
    var top = padding.top + Math.max((0, _d3Array.sum)(Object.values(axisDimensions.top), function (d) {
      return d.height;
    }), (0, _d3Array.sum)(Object.values(axisDimensions.left), function (d) {
      return d.paddingTop;
    }), (0, _d3Array.sum)(Object.values(axisDimensions.right), function (d) {
      return d.paddingTop;
    }));
    var right = padding.right + Math.max((0, _d3Array.sum)(Object.values(axisDimensions.right), function (d) {
      return d.width;
    }), (0, _d3Array.sum)(Object.values(axisDimensions.top), function (d) {
      return d.paddingRight;
    }), (0, _d3Array.sum)(Object.values(axisDimensions.bottom), function (d) {
      return d.paddingRight;
    }));
    var bottom = padding.bottom + Math.max((0, _d3Array.sum)(Object.values(axisDimensions.bottom), function (d) {
      return d.height;
    }), (0, _d3Array.sum)(Object.values(axisDimensions.left), function (d) {
      return d.paddingBottom;
    }), (0, _d3Array.sum)(Object.values(axisDimensions.right), function (d) {
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

  var series = _react["default"].useMemo(function () {
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

  var allDatums = _react["default"].useMemo(function () {
    return series.map(function (s) {
      return s.datums;
    }).flat(2);
  }, [series]);

  var primaryAxis = _react["default"].useMemo(function () {
    return (0, _buildAxis["default"])(true, primaryAxisOptions, series, allDatums, gridDimensions, width, height);
  }, [allDatums, gridDimensions, height, primaryAxisOptions, series, width]);

  var secondaryAxes = _react["default"].useMemo(function () {
    return secondaryAxesOptions.map(function (secondaryAxis) {
      return (0, _buildAxis["default"])(false, secondaryAxis, series, allDatums, gridDimensions, width, height);
    });
  }, [allDatums, gridDimensions, height, secondaryAxesOptions, series, width]);

  var _React$useMemo = _react["default"].useMemo(function () {
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
          return (0, _Bar.getPrimary)(datum, primaryAxis, secondaryAxis);
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

  var getSeriesStatusStyle = _react["default"].useCallback(function (series, focusedDatum) {
    var _getOptions$getSeries, _getOptions$getSeries2, _getOptions;

    var base = {
      color: getOptions().defaultColors[series.index % getOptions().defaultColors.length]
    };
    var status = (0, _Utils.getSeriesStatus)(series, focusedDatum);
    var statusStyles = (_getOptions$getSeries = (_getOptions$getSeries2 = (_getOptions = getOptions()).getSeriesStyle) == null ? void 0 : _getOptions$getSeries2.call(_getOptions, series, status)) != null ? _getOptions$getSeries : {};
    series.style = (0, _Utils.materializeStyles)(statusStyles, base);
    return series.style;
  }, [getOptions]);

  var getDatumStatusStyle = _react["default"].useCallback(function (datum, focusedDatum) {
    var _series$datum$seriesI, _getOptions$getDatumS, _getOptions$getDatumS2, _getOptions2;

    var base = (0, _extends2["default"])({}, (_series$datum$seriesI = series[datum.seriesIndex]) == null ? void 0 : _series$datum$seriesI.style, {
      color: getOptions().defaultColors[datum.seriesIndex % getOptions().defaultColors.length]
    });
    var status = (0, _Utils.getDatumStatus)(datum, focusedDatum);
    var statusStyles = (_getOptions$getDatumS = (_getOptions$getDatumS2 = (_getOptions2 = getOptions()).getDatumStyle) == null ? void 0 : _getOptions$getDatumS2.call(_getOptions2, datum, status)) != null ? _getOptions$getDatumS : {};
    datum.style = (0, _Utils.materializeStyles)(statusStyles, base);
    return datum.style;
  }, [getOptions, series]); // Reverse the stack order for proper z-indexing


  var orderedSeries = _react["default"].useMemo(function () {
    var reversedSeries = [].concat(series).reverse();
    return getOptions().getSeriesOrder(reversedSeries);
  }, [getOptions, series]);

  (0, _useIsomorphicLayoutEffect["default"])(function () {
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

  var seriesByAxisId = _react["default"].useMemo(function () {
    return (0, _d3Array.sort)((0, _d3Array.groups)(orderedSeries, function (d) {
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

  var getMemoizedSeriesInfo = _react["default"].useCallback(function () {
    return {
      primaryAxis: primaryAxis,
      secondaryAxes: secondaryAxes,
      seriesByAxisId: seriesByAxisId
    };
  }, [primaryAxis, secondaryAxes, seriesByAxisId]);

  if (options.memoizeSeries) {
    getSeriesInfo = getMemoizedSeriesInfo;
  }

  var seriesEl = _react["default"].useMemo(function () {
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
          return _Line["default"];
        }

        if (elementType === 'bar') {
          return _Bar["default"];
        }

        throw new Error('Invalid elementType');
      }();

      if (primaryAxis.isInvalid || secondaryAxis.isInvalid) {
        return null;
      }

      return /*#__PURE__*/_react["default"].createElement(Component, {
        key: axisId != null ? axisId : '__default__',
        primaryAxis: primaryAxis,
        secondaryAxis: secondaryAxis,
        series: series
      });
    });
  }, [getSeriesInfo]);

  return /*#__PURE__*/_react["default"].createElement(_chartContext.ChartContextProvider, {
    value: (0, _useGetLatest["default"])(contextValue)
  }, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("svg", {
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
  }, /*#__PURE__*/_react["default"].createElement("g", {
    className: "axes"
  }, [primaryAxis].concat(secondaryAxes).map(function (axis) {
    return /*#__PURE__*/_react["default"].createElement(_AxisLinear["default"], (0, _extends2["default"])({
      key: [axis.position, axis.id].join('')
    }, axis));
  })), /*#__PURE__*/_react["default"].createElement("g", {
    className: "Series",
    style: {
      pointerEvents: 'none'
    }
  }, seriesEl), /*#__PURE__*/_react["default"].createElement(_Voronoi["default"], null), (_options$renderSVG = options.renderSVG == null ? void 0 : options.renderSVG()) != null ? _options$renderSVG : null), /*#__PURE__*/_react["default"].createElement(_Cursors["default"], null), /*#__PURE__*/_react["default"].createElement(_Tooltip["default"], null)));
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

  return (0, _extends2["default"])({}, options, {
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