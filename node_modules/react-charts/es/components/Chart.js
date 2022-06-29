import _createForOfIteratorHelperLoose from "@babel/runtime/helpers/esm/createForOfIteratorHelperLoose";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["options", "className", "style"];
import { groups, sort, sum } from 'd3-array';
import React from 'react';
import useGetLatest from '../hooks/useGetLatest';
import useIsomorphicLayoutEffect from '../hooks/useIsomorphicLayoutEffect';
import Bar, { getPrimary } from '../seriesTypes/Bar';
import Line from '../seriesTypes/Line'; //

import { materializeStyles, getSeriesStatus, getDatumStatus } from '../utils/Utils';
import buildAxisLinear from '../utils/buildAxis.linear';
import { ChartContextProvider } from '../utils/chartContext';
import AxisLinear from './AxisLinear'; // import Brush from './Brush'

import Cursors from './Cursors';
import Tooltip, { defaultTooltip } from './Tooltip';
import Voronoi from './Voronoi'; //
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

export function Chart(_ref) {
  var userOptions = _ref.options,
      className = _ref.className,
      _ref$style = _ref.style,
      style = _ref$style === void 0 ? {} : _ref$style,
      rest = _objectWithoutPropertiesLoose(_ref, _excluded);

  var options = defaultChartOptions(userOptions);

  var _React$useState = React.useState(null),
      chartElement = _React$useState[0],
      setContainerElement = _React$useState[1];

  var containerEl = chartElement == null ? void 0 : chartElement.parentElement;
  var nearestScrollableParent = React.useMemo(function () {
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

  var _React$useState2 = React.useState({
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
  React.useEffect(function () {
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

  var _React$useState3 = React.useState(true),
      isIntersecting = _React$useState3[0],
      setIsIntersecting = _React$useState3[1];

  React.useEffect(function () {
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
  return /*#__PURE__*/React.createElement("div", _extends({
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
  }), isIntersecting ? /*#__PURE__*/React.createElement(ChartInner, {
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

  var primaryAxisOptions = React.useMemo(function () {
    var firstValue = getFirstDefinedValue(options.primaryAxis, options.data);
    var axisOptions = axisOptionsWithScaleType(options.primaryAxis, firstValue);
    return _extends({
      position: 'bottom'
    }, axisOptions);
  }, [options.data, options.primaryAxis]);
  var secondaryAxesOptions = React.useMemo(function () {
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

  var tooltipOptions = React.useMemo(function () {
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

  var svgRef = React.useRef(null);
  var getOptions = useGetLatest(_extends({}, options, {
    tooltip: tooltipOptions
  }));
  var axisDimensionsState = React.useState({
    left: {},
    right: {},
    top: {},
    bottom: {}
  });
  var axisDimensions = axisDimensionsState[0];
  var isInteractingState = React.useState(false);
  var isInteracting = isInteractingState[0];
  var focusedDatumState = React.useState(null);
  var focusedDatum = focusedDatumState[0]; // useAtom<Datum<TDatum> | null>(focusedDatumAtom)

  var gridDimensions = React.useMemo(function () {
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
  var series = React.useMemo(function () {
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
  var allDatums = React.useMemo(function () {
    return series.map(function (s) {
      return s.datums;
    }).flat(2);
  }, [series]);
  var primaryAxis = React.useMemo(function () {
    return buildAxisLinear(true, primaryAxisOptions, series, allDatums, gridDimensions, width, height);
  }, [allDatums, gridDimensions, height, primaryAxisOptions, series, width]);
  var secondaryAxes = React.useMemo(function () {
    return secondaryAxesOptions.map(function (secondaryAxis) {
      return buildAxisLinear(false, secondaryAxis, series, allDatums, gridDimensions, width, height);
    });
  }, [allDatums, gridDimensions, height, secondaryAxesOptions, series, width]);

  var _React$useMemo = React.useMemo(function () {
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
          return getPrimary(datum, primaryAxis, secondaryAxis);
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

  var getSeriesStatusStyle = React.useCallback(function (series, focusedDatum) {
    var _getOptions$getSeries, _getOptions$getSeries2, _getOptions;

    var base = {
      color: getOptions().defaultColors[series.index % getOptions().defaultColors.length]
    };
    var status = getSeriesStatus(series, focusedDatum);
    var statusStyles = (_getOptions$getSeries = (_getOptions$getSeries2 = (_getOptions = getOptions()).getSeriesStyle) == null ? void 0 : _getOptions$getSeries2.call(_getOptions, series, status)) != null ? _getOptions$getSeries : {};
    series.style = materializeStyles(statusStyles, base);
    return series.style;
  }, [getOptions]);
  var getDatumStatusStyle = React.useCallback(function (datum, focusedDatum) {
    var _series$datum$seriesI, _getOptions$getDatumS, _getOptions$getDatumS2, _getOptions2;

    var base = _extends({}, (_series$datum$seriesI = series[datum.seriesIndex]) == null ? void 0 : _series$datum$seriesI.style, {
      color: getOptions().defaultColors[datum.seriesIndex % getOptions().defaultColors.length]
    });

    var status = getDatumStatus(datum, focusedDatum);
    var statusStyles = (_getOptions$getDatumS = (_getOptions$getDatumS2 = (_getOptions2 = getOptions()).getDatumStyle) == null ? void 0 : _getOptions$getDatumS2.call(_getOptions2, datum, status)) != null ? _getOptions$getDatumS : {};
    datum.style = materializeStyles(statusStyles, base);
    return datum.style;
  }, [getOptions, series]); // Reverse the stack order for proper z-indexing

  var orderedSeries = React.useMemo(function () {
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
  var seriesByAxisId = React.useMemo(function () {
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

  var getMemoizedSeriesInfo = React.useCallback(function () {
    return {
      primaryAxis: primaryAxis,
      secondaryAxes: secondaryAxes,
      seriesByAxisId: seriesByAxisId
    };
  }, [primaryAxis, secondaryAxes, seriesByAxisId]);

  if (options.memoizeSeries) {
    getSeriesInfo = getMemoizedSeriesInfo;
  }

  var seriesEl = React.useMemo(function () {
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
          return Bar;
        }

        throw new Error('Invalid elementType');
      }();

      if (primaryAxis.isInvalid || secondaryAxis.isInvalid) {
        return null;
      }

      return /*#__PURE__*/React.createElement(Component, {
        key: axisId != null ? axisId : '__default__',
        primaryAxis: primaryAxis,
        secondaryAxis: secondaryAxis,
        series: series
      });
    });
  }, [getSeriesInfo]);
  return /*#__PURE__*/React.createElement(ChartContextProvider, {
    value: useGetLatest(contextValue)
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("svg", {
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
  }, /*#__PURE__*/React.createElement("g", {
    className: "axes"
  }, [primaryAxis].concat(secondaryAxes).map(function (axis) {
    return /*#__PURE__*/React.createElement(AxisLinear, _extends({
      key: [axis.position, axis.id].join('')
    }, axis));
  })), /*#__PURE__*/React.createElement("g", {
    className: "Series",
    style: {
      pointerEvents: 'none'
    }
  }, seriesEl), /*#__PURE__*/React.createElement(Voronoi, null), (_options$renderSVG = options.renderSVG == null ? void 0 : options.renderSVG()) != null ? _options$renderSVG : null), /*#__PURE__*/React.createElement(Cursors, null), /*#__PURE__*/React.createElement(Tooltip, null)));
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