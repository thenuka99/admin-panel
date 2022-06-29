import _extends from "@babel/runtime/helpers/esm/extends";
import { extent, max, median, min, range as d3Range } from 'd3-array';
import { stack, stackOffsetNone } from 'd3-shape';
import { scaleLinear, scaleLog, scaleTime, scaleUtc, scaleBand } from 'd3-scale';

function defaultAxisOptions(options) {
  var _options$elementType, _options$minTickPaddi, _options$tickLabelRot, _options$innerBandPad, _options$outerBandPad, _options$innerSeriesB, _options$outerSeriesB, _options$show, _options$stacked, _options$shouldNice;

  return _extends({}, options, {
    elementType: (_options$elementType = options.elementType) != null ? _options$elementType : 'line',
    minTickPaddingForRotation: (_options$minTickPaddi = options.minTickPaddingForRotation) != null ? _options$minTickPaddi : 10,
    tickLabelRotationDeg: (_options$tickLabelRot = options.tickLabelRotationDeg) != null ? _options$tickLabelRot : 60,
    innerBandPadding: (_options$innerBandPad = options.innerBandPadding) != null ? _options$innerBandPad : 0.5,
    outerBandPadding: (_options$outerBandPad = options.outerBandPadding) != null ? _options$outerBandPad : 0.2,
    innerSeriesBandPadding: (_options$innerSeriesB = options.innerSeriesBandPadding) != null ? _options$innerSeriesB : 0.2,
    outerSeriesBandPadding: (_options$outerSeriesB = options.outerSeriesBandPadding) != null ? _options$outerSeriesB : 0,
    show: (_options$show = options.show) != null ? _options$show : true,
    stacked: (_options$stacked = options.stacked) != null ? _options$stacked : false,
    shouldNice: (_options$shouldNice = options.shouldNice) != null ? _options$shouldNice : true
  });
}

export default function buildAxisLinear(isPrimary, userOptions, series, allDatums, gridDimensions, width, height) {
  var options = defaultAxisOptions(userOptions);

  if (!options.position) {
    throw new Error("Chart axes must have a valid 'position' property");
  }

  var isVertical = ['left', 'right'].indexOf(options.position) > -1; // Now we need to figure out the range

  var range = isVertical ? [gridDimensions.height, 0] : [0, gridDimensions.width];
  var outerRange = isVertical ? [height, 0] : [0, width]; // Give the scale a home

  return options.scaleType === 'time' || options.scaleType === 'localTime' ? buildTimeAxis(isPrimary, options, series, allDatums, isVertical, range, outerRange) : options.scaleType === 'linear' || options.scaleType === 'log' ? buildLinearAxis(isPrimary, options, series, allDatums, isVertical, range, outerRange) : options.scaleType === 'band' ? buildBandAxis(isPrimary, options, series, isVertical, range, outerRange) : function () {
    throw new Error('Invalid scale type');
  }();
}

function buildTimeAxis(isPrimary, options, series, allDatums, isVertical, range, outerRange) {
  var scaleFn = options.scaleType === 'localTime' ? scaleTime : scaleUtc;
  var isInvalid = false;
  series = isPrimary ? series : series.filter(function (s) {
    return s.secondaryAxisId === options.id;
  });
  allDatums = isPrimary ? allDatums : allDatums.filter(function (d) {
    return d.secondaryAxisId === options.id;
  }); // Now set the range

  var scale = scaleFn(range);

  var _extent = extent(allDatums, function (datum) {
    var value = options.getValue(datum.originalDatum);
    datum[isPrimary ? 'primaryValue' : 'secondaryValue'] = value;
    return value;
  }),
      minValue = _extent[0],
      maxValue = _extent[1];

  var shouldNice = options.shouldNice; // see https://stackoverflow.com/a/2831422

  if (Object.prototype.toString.call(options.min) === '[object Date]') {
    minValue = min([options.min, minValue]);
    shouldNice = false;
  }

  if (Object.prototype.toString.call(options.max) === '[object Date]') {
    maxValue = max([options.max, maxValue]);
    shouldNice = false;
  }

  if (Object.prototype.toString.call(options.hardMin) === '[object Date]') {
    minValue = options.hardMin;
    shouldNice = false;
  }

  if (Object.prototype.toString.call(options.hardMax) === '[object Date]') {
    maxValue = options.hardMax;
    shouldNice = false;
  }

  if (minValue === undefined || maxValue === undefined) {
    console.info('Invalid scale min/max', {
      options: options,
      series: series,
      range: range,
      values: allDatums.map(function (d) {
        return isPrimary ? d.primaryValue : d.secondaryValue;
      })
    });
    isInvalid = true;
  } // Set the domain


  scale.domain([minValue, maxValue]);

  if (options.invert) {
    scale.domain(Array.from(scale.domain()).reverse());
  }

  if (shouldNice) {
    scale.nice();
  }

  var outerScale = scale.copy().range(outerRange); // Supplementary band scale

  var primaryBandScale = isPrimary ? buildPrimaryBandScale(options, scale, series, range) : undefined;
  var seriesBandScale = primaryBandScale ? buildSeriesBandScale(options, primaryBandScale, series) : undefined;
  var primaryBandWidth = primaryBandScale == null ? void 0 : primaryBandScale.bandwidth();

  if (options.padBandRange && primaryBandWidth) {
    var bandStart = scale.invert(0);
    var bandEnd = scale.invert(primaryBandWidth);
    var diff = bandEnd.valueOf() - bandStart.valueOf();
    scale.domain([new Date(scale.domain()[0].valueOf() - diff / 2), new Date(scale.domain()[1].valueOf() + diff / 2)]);
  }

  var defaultFormat = scale.tickFormat();
  var formatters = {};

  var scaleFormat = function scaleFormat(value) {
    var _options$formatters$s, _options$formatters;

    return (_options$formatters$s = (_options$formatters = options.formatters) == null ? void 0 : _options$formatters.scale == null ? void 0 : _options$formatters.scale(value, _extends({}, formatters, {
      scale: undefined
    }))) != null ? _options$formatters$s : defaultFormat(value);
  };

  var tooltipFormat = function tooltipFormat(value) {
    var _options$formatters$t, _options$formatters2;

    return (_options$formatters$t = (_options$formatters2 = options.formatters) == null ? void 0 : _options$formatters2.tooltip == null ? void 0 : _options$formatters2.tooltip(value, _extends({}, formatters, {
      tooltip: undefined
    }))) != null ? _options$formatters$t : scaleFormat(value);
  };

  var cursorFormat = function cursorFormat(value) {
    var _options$formatters$c, _options$formatters3;

    return (_options$formatters$c = (_options$formatters3 = options.formatters) == null ? void 0 : _options$formatters3.cursor == null ? void 0 : _options$formatters3.cursor(value, _extends({}, formatters, {
      cursor: undefined
    }))) != null ? _options$formatters$c : tooltipFormat(value);
  };

  Object.assign(formatters, {
    "default": defaultFormat,
    scale: scaleFormat,
    tooltip: tooltipFormat,
    cursor: cursorFormat
  });
  return _extends({}, options, {
    isInvalid: isInvalid,
    axisFamily: 'time',
    isVertical: isVertical,
    scale: scale,
    range: range,
    outerScale: outerScale,
    primaryBandScale: primaryBandScale,
    seriesBandScale: seriesBandScale,
    formatters: formatters
  });
}

function buildLinearAxis(isPrimary, options, series, allDatums, isVertical, range, outerRange) {
  var scale = options.scaleType === 'log' ? scaleLog() : scaleLinear();
  var isInvalid = false;
  series = isPrimary ? series : series.filter(function (s) {
    return s.secondaryAxisId === options.id;
  });
  allDatums = isPrimary ? allDatums : allDatums.filter(function (d) {
    return d.secondaryAxisId === options.id;
  });

  if (options.stacked) {
    stackSeries(series, options);
  }

  var _ref = options.stacked ? extent(series.map(function (s) {
    return s.datums.map(function (datum) {
      var _datum$stackData;

      var value = options.getValue(datum.originalDatum);
      datum[isPrimary ? 'primaryValue' : 'secondaryValue'] = value;
      return (_datum$stackData = datum.stackData) != null ? _datum$stackData : [];
    });
  }).flat(2)) : extent(allDatums, function (datum) {
    var value = options.getValue(datum.originalDatum);
    datum[isPrimary ? 'primaryValue' : 'secondaryValue'] = value;
    return value;
  }),
      minValue = _ref[0],
      maxValue = _ref[1];

  var shouldNice = options.shouldNice;

  if (typeof options.min === 'number') {
    minValue = min([options.min, minValue]);
    shouldNice = false;
  }

  if (typeof options.max === 'number') {
    maxValue = max([options.max, maxValue]);
    shouldNice = false;
  }

  if (typeof options.minDomainLength === 'number' && !(minValue === undefined || maxValue === undefined)) {
    var mid = median([minValue, maxValue]);
    var top = mid + options.minDomainLength / 2;
    var bottom = mid - options.minDomainLength / 2;
    maxValue = Math.max(top, maxValue);
    minValue = Math.min(bottom, minValue);
  }

  if (typeof options.hardMin === 'number') {
    minValue = options.hardMin;
    shouldNice = false;
  }

  if (typeof options.hardMax === 'number') {
    maxValue = options.hardMax;
    shouldNice = false;
  }

  if (minValue === undefined || maxValue === undefined) {
    var _minValue, _maxValue;

    isInvalid = true;
    console.info('Invalid scale min/max', {
      options: options,
      series: series,
      range: range,
      values: allDatums.map(function (d) {
        return isPrimary ? d.primaryValue : d.secondaryValue;
      })
    });
    minValue = (_minValue = minValue) != null ? _minValue : 0;
    maxValue = (_maxValue = maxValue) != null ? _maxValue : 0; // throw new Error('Invalid scale min/max'
  } // Set the domain


  scale.domain([minValue, maxValue]);

  if (options.invert) {
    scale.domain(Array.from(scale.domain()).reverse());
  }

  scale.range(range);

  if (shouldNice) {
    scale.nice();
  }

  var outerScale = scale.copy().range(outerRange);
  var primaryBandScale = isPrimary ? buildPrimaryBandScale(options, scale, series, range) : undefined;
  var seriesBandScale = primaryBandScale ? buildSeriesBandScale(options, primaryBandScale, series) : undefined;
  var defaultFormat = scale.tickFormat();
  var formatters = {};

  var scaleFormat = function scaleFormat(value) {
    var _options$formatters$s2, _options$formatters4;

    return (_options$formatters$s2 = (_options$formatters4 = options.formatters) == null ? void 0 : _options$formatters4.scale == null ? void 0 : _options$formatters4.scale(value, _extends({}, formatters, {
      scale: undefined
    }))) != null ? _options$formatters$s2 : defaultFormat(value);
  };

  var tooltipFormat = function tooltipFormat(value) {
    var _options$formatters$t2, _options$formatters5;

    return (_options$formatters$t2 = (_options$formatters5 = options.formatters) == null ? void 0 : _options$formatters5.tooltip == null ? void 0 : _options$formatters5.tooltip(value, _extends({}, formatters, {
      tooltip: undefined
    }))) != null ? _options$formatters$t2 : scaleFormat(value);
  };

  var cursorFormat = function cursorFormat(value) {
    var _options$formatters$c2, _options$formatters6;

    return (_options$formatters$c2 = (_options$formatters6 = options.formatters) == null ? void 0 : _options$formatters6.cursor == null ? void 0 : _options$formatters6.cursor(value, _extends({}, formatters, {
      cursor: undefined
    }))) != null ? _options$formatters$c2 : tooltipFormat(value);
  };

  Object.assign(formatters, {
    "default": defaultFormat,
    scale: scaleFormat,
    tooltip: tooltipFormat,
    cursor: cursorFormat
  });
  return _extends({}, options, {
    isInvalid: isInvalid,
    axisFamily: 'linear',
    isVertical: isVertical,
    scale: scale,
    range: range,
    outerScale: outerScale,
    primaryBandScale: primaryBandScale,
    seriesBandScale: seriesBandScale,
    formatters: formatters
  });
}

function buildBandAxis(isPrimary, options, series, isVertical, range, outerRange) {
  var _options$outerBandPad2, _options$innerBandPad2;

  series = series.filter(function (d) {
    return d.secondaryAxisId === options.id;
  });
  var isInvalid = false;
  var domain = Array.from(new Set(series.map(function (d) {
    return d.datums;
  }).flat().map(function (datum) {
    var value = options.getValue(datum.originalDatum);
    datum[isPrimary ? 'primaryValue' : 'secondaryValue'] = value;
    return value;
  })));
  var scale = scaleBand(domain, range).round(false).paddingOuter((_options$outerBandPad2 = options.outerBandPadding) != null ? _options$outerBandPad2 : 0).paddingInner((_options$innerBandPad2 = options.innerBandPadding) != null ? _options$innerBandPad2 : 0); // Invert if necessary

  if (options.invert) {
    scale.domain(Array.from(scale.domain()).reverse());
  }

  var outerScale = scale.copy().range(outerRange);
  var primaryBandScale = scale;
  var seriesBandScale = buildSeriesBandScale(options, primaryBandScale, series);

  var defaultFormat = function defaultFormat(d) {
    return d;
  };

  var formatters = {};

  var scaleFormat = function scaleFormat(value) {
    var _options$formatters$s3, _options$formatters7;

    return (_options$formatters$s3 = (_options$formatters7 = options.formatters) == null ? void 0 : _options$formatters7.scale == null ? void 0 : _options$formatters7.scale(value, _extends({}, formatters, {
      scale: undefined
    }))) != null ? _options$formatters$s3 : defaultFormat(value);
  };

  var tooltipFormat = function tooltipFormat(value) {
    var _options$formatters$t3, _options$formatters8;

    return (_options$formatters$t3 = (_options$formatters8 = options.formatters) == null ? void 0 : _options$formatters8.tooltip == null ? void 0 : _options$formatters8.tooltip(value, _extends({}, formatters, {
      tooltip: undefined
    }))) != null ? _options$formatters$t3 : scaleFormat(value);
  };

  var cursorFormat = function cursorFormat(value) {
    var _options$formatters$c3, _options$formatters9;

    return (_options$formatters$c3 = (_options$formatters9 = options.formatters) == null ? void 0 : _options$formatters9.cursor == null ? void 0 : _options$formatters9.cursor(value, _extends({}, formatters, {
      cursor: undefined
    }))) != null ? _options$formatters$c3 : tooltipFormat(value);
  };

  Object.assign(formatters, {
    "default": defaultFormat,
    scale: scaleFormat,
    tooltip: tooltipFormat,
    cursor: cursorFormat
  });
  return _extends({}, options, {
    isInvalid: isInvalid,
    axisFamily: 'band',
    isVertical: isVertical,
    scale: scale,
    range: range,
    outerScale: outerScale,
    formatters: formatters,
    primaryBandScale: primaryBandScale,
    seriesBandScale: seriesBandScale
  });
} //


function stackSeries(series, axisOptions) {
  var _axisOptions$stackOff;

  var seriesIndices = Object.keys(series);
  var stacker = stack().keys(seriesIndices).value(function (_, seriesIndex, index) {
    var _series$Number, _series$Number$datums;

    var originalDatum = (_series$Number = series[Number(seriesIndex)]) == null ? void 0 : (_series$Number$datums = _series$Number.datums[index]) == null ? void 0 : _series$Number$datums.originalDatum;
    var val = typeof originalDatum !== 'undefined' ? axisOptions.getValue(originalDatum) : 0;

    if (typeof val === 'undefined' || val === null) {
      return 0;
    }

    return val;
  }).offset((_axisOptions$stackOff = axisOptions.stackOffset) != null ? _axisOptions$stackOff : stackOffsetNone);
  var stacked = stacker(Array.from({
    length: series.sort(function (a, b) {
      return b.datums.length - a.datums.length;
    })[0].datums.length
  }));

  for (var sIndex = 0; sIndex < stacked.length; sIndex++) {
    var s = stacked[sIndex];

    for (var i = 0; i < s.length; i++) {
      var datum = s[i];

      if (series[sIndex].datums[i]) {
        // @ts-ignore
        datum.data = series[sIndex].datums[i];
        series[sIndex].datums[i].stackData = datum;
      }
    }
  }
}

function buildPrimaryBandScale(options, scale, series, range) {
  var _options$outerBandPad3, _options$innerBandPad3;

  // Find the two closest points along axis
  var impliedBandWidth = Math.max.apply(Math, range);

  for (var i = 0; i < series.length; i++) {
    var serie = series[i];

    for (var j = 0; j < serie.datums.length; j++) {
      var _d1$primaryValue;

      var d1 = serie.datums[j];
      var one = scale((_d1$primaryValue = d1.primaryValue) != null ? _d1$primaryValue : NaN);

      for (var k = 0; k < serie.datums.length; k++) {
        var _d2$primaryValue;

        var d2 = serie.datums[k];
        var two = scale((_d2$primaryValue = d2.primaryValue) != null ? _d2$primaryValue : NaN);

        if (one === two) {
          continue;
        }

        var diff = Math.abs(Math.max(one, two) - Math.min(one, two));

        if (diff < impliedBandWidth) {
          impliedBandWidth = diff;
        }
      }
    }
  }

  var bandRange = Math.max.apply(Math, range);
  var bandDomain = d3Range(bandRange / impliedBandWidth);
  var primaryBandScale = scaleBand(bandDomain, range).round(false).paddingOuter((_options$outerBandPad3 = options.outerBandPadding) != null ? _options$outerBandPad3 : 0).paddingInner((_options$innerBandPad3 = options.innerBandPadding) != null ? _options$innerBandPad3 : 0);
  return primaryBandScale;
}

function buildSeriesBandScale(options, primaryBandScale, series) {
  var _options$outerSeriesB2, _options$innerSeriesB2;

  var bandDomain = d3Range(series.length);
  var seriesBandScale = scaleBand(bandDomain, [0, primaryBandScale.bandwidth()]).round(false).paddingOuter((_options$outerSeriesB2 = options.outerSeriesBandPadding) != null ? _options$outerSeriesB2 : options.outerBandPadding ? options.outerBandPadding / 2 : 0).paddingInner((_options$innerSeriesB2 = options.innerSeriesBandPadding) != null ? _options$innerSeriesB2 : options.innerBandPadding ? options.innerBandPadding / 2 : 0);

  var scale = function scale(seriesIndex) {
    var _series$find;

    return seriesBandScale((_series$find = series.find(function (d) {
      return d.index === seriesIndex;
    })) == null ? void 0 : _series$find.indexPerAxis);
  };

  return Object.assign(scale, seriesBandScale);
}