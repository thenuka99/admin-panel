"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault")["default"];

exports.__esModule = true;
exports["default"] = Voronoi;

var _react = _interopRequireDefault(require("react"));

var _d3Delaunay = require("d3-delaunay");

var _Utils = require("../utils/Utils");

var _chartContext = _interopRequireDefault(require("../utils/chartContext"));

var _d3Shape = require("d3-shape");

var _Bar = require("../seriesTypes/Bar");

function Voronoi() {
  var _useChartContext = (0, _chartContext["default"])(),
      getOptions = _useChartContext.getOptions,
      focusedDatumState = _useChartContext.focusedDatumState,
      isInteractingState = _useChartContext.isInteractingState;

  var setFocusedDatum = focusedDatumState[1];
  var isInteracting = isInteractingState[0];

  var _getOptions = getOptions(),
      onFocusDatum = _getOptions.onFocusDatum,
      onClickDatum = _getOptions.onClickDatum,
      tooltip = _getOptions.tooltip,
      primaryCursor = _getOptions.primaryCursor,
      secondaryCursor = _getOptions.secondaryCursor,
      showVoronoi = _getOptions.showVoronoi,
      interactionMode = _getOptions.interactionMode;

  var handleFocus = _react["default"].useCallback(function (datum) {
    var _getOptions$onFocusDa, _getOptions2;

    (_getOptions$onFocusDa = (_getOptions2 = getOptions()).onFocusDatum) == null ? void 0 : _getOptions$onFocusDa.call(_getOptions2, datum);
    setFocusedDatum(datum);
  }, [getOptions, setFocusedDatum]);

  var needsVoronoi = isInteracting && (showVoronoi || onFocusDatum || onClickDatum || tooltip || primaryCursor || secondaryCursor);

  if (!needsVoronoi) {
    return null;
  }

  var props = {
    handleFocus: handleFocus
  };

  if (interactionMode === 'closest') {
    return /*#__PURE__*/_react["default"].createElement(SingleVoronoi, props);
  }

  return /*#__PURE__*/_react["default"].createElement(PrimaryVoronoi, props);
}

function PrimaryVoronoi(_ref) {
  var handleFocus = _ref.handleFocus;

  var _useChartContext2 = (0, _chartContext["default"])(),
      primaryAxis = _useChartContext2.primaryAxis,
      secondaryAxes = _useChartContext2.secondaryAxes,
      getOptions = _useChartContext2.getOptions,
      gridDimensions = _useChartContext2.gridDimensions,
      datumsByInteractionGroup = _useChartContext2.datumsByInteractionGroup;

  var stackedVoronoi = secondaryAxes.length === 1 && secondaryAxes[0].stacked;
  var useBarPx = secondaryAxes.every(function (d) {
    return d.elementType === 'bar' && !d.stacked;
  });
  return _react["default"].useMemo(function () {
    var preColumns = Array.from(datumsByInteractionGroup.entries()).map(function (_ref2) {
      var _ = _ref2[0],
          datums = _ref2[1];
      return datums;
    }).filter(function (datums) {
      var datum = datums[0];

      if (!datum) {
        return;
      }

      var primaryValue = datum.primaryValue;
      return primaryValue !== 'undefined' && primaryValue !== null;
    }).sort(function (a, b) {
      var aAxis = secondaryAxes.find(function (d) {
        return d.id === a[0].secondaryAxisId;
      });
      var bAxis = secondaryAxes.find(function (d) {
        return d.id === b[0].secondaryAxisId;
      });
      var aPx = getPrimary(a[0], primaryAxis, aAxis, useBarPx);
      var bPx = getPrimary(b[0], primaryAxis, bAxis, useBarPx);
      return aPx - bPx;
    });

    if (primaryAxis.isVertical) {
      preColumns.reverse();
    }

    var columns = preColumns.map(function (datums, i, all) {
      var _primaryAxis$scale$ra;

      var datum = datums[0];
      var prev = all[i - 1];
      var next = all[i + 1];
      var secondaryAxis = secondaryAxes.find(function (d) {
        return d.id === datum.secondaryAxisId;
      });
      var primaryPx = getPrimary(datum, primaryAxis, secondaryAxis, useBarPx);
      var range = (_primaryAxis$scale$ra = primaryAxis == null ? void 0 : primaryAxis.scale.range()) != null ? _primaryAxis$scale$ra : [0, 0];
      var primaryStart = range[0],
          primaryEnd = range[1];

      if (prev) {
        var _secondaryAxis = secondaryAxes.find(function (d) {
          return d.id === prev[0].secondaryAxisId;
        });

        var prevPx = getPrimary(prev[0], primaryAxis, _secondaryAxis, useBarPx);
        primaryStart = primaryPx - (primaryPx - prevPx) / 2;
      }

      if (next) {
        var _secondaryAxis2 = secondaryAxes.find(function (d) {
          return d.id === next[0].secondaryAxisId;
        });

        var nextPx = getPrimary(next[0], primaryAxis, _secondaryAxis2, useBarPx);
        primaryEnd = primaryPx + (nextPx - primaryPx) / 2;
      }

      return {
        primaryStart: primaryStart,
        primaryEnd: primaryEnd,
        primaryPx: primaryPx,
        datumBoundaries: datums.filter(function (datum) {
          var secondaryValue = datum.secondaryValue;
          return typeof secondaryValue !== 'undefined' && secondaryValue !== null;
        }).map(function (datum, i, all) {
          var _secondaryAxis$scale3, _datum$stackData3, _secondaryAxis$scale$2;

          var prev = all[i - 1];
          var next = all[i + 1];
          var secondaryAxis = secondaryAxes.find(function (d) {
            return d.id === datum.secondaryAxisId;
          });

          if (stackedVoronoi) {
            var _secondaryAxis$scale$, _datum$stackData, _datum$stackData2;

            var _range = (_secondaryAxis$scale$ = secondaryAxis == null ? void 0 : secondaryAxis.scale.range()) != null ? _secondaryAxis$scale$ : [0, 0];

            var stackData = [(_datum$stackData = datum.stackData) == null ? void 0 : _datum$stackData[0], (_datum$stackData2 = datum.stackData) == null ? void 0 : _datum$stackData2[1]];

            if (secondaryAxis != null && secondaryAxis.isVertical) {
              _range.reverse();

              stackData.reverse();
            }

            var _secondaryStart = _range[0],
                _secondaryEnd = _range[1];

            if (prev) {
              var _secondaryAxis$scale, _stackData$;

              _secondaryStart = (_secondaryAxis$scale = secondaryAxis == null ? void 0 : secondaryAxis.scale((_stackData$ = stackData[0]) != null ? _stackData$ : NaN)) != null ? _secondaryAxis$scale : NaN;
            }

            if (next) {
              var _secondaryAxis$scale2, _stackData$2;

              _secondaryEnd = (_secondaryAxis$scale2 = secondaryAxis == null ? void 0 : secondaryAxis.scale((_stackData$2 = stackData[1]) != null ? _stackData$2 : NaN)) != null ? _secondaryAxis$scale2 : NaN;
            }

            return {
              secondaryStart: _secondaryStart,
              secondaryEnd: _secondaryEnd,
              datum: datum
            };
          }

          var value = (_secondaryAxis$scale3 = secondaryAxis == null ? void 0 : secondaryAxis.scale(secondaryAxis.stacked ? (_datum$stackData3 = datum.stackData) == null ? void 0 : _datum$stackData3[1] : datum.secondaryValue)) != null ? _secondaryAxis$scale3 : NaN;
          var range = (_secondaryAxis$scale$2 = secondaryAxis == null ? void 0 : secondaryAxis.scale.range()) != null ? _secondaryAxis$scale$2 : [0, 0];

          if (secondaryAxis != null && secondaryAxis.isVertical) {
            range.reverse();
          }

          var secondaryStart = range[0],
              secondaryEnd = range[1];

          if (prev) {
            var _prevAxis$scale, _prev$stackData;

            var prevAxis = secondaryAxes.find(function (d) {
              return d.id === (prev == null ? void 0 : prev.secondaryAxisId);
            });
            var prevValue = (_prevAxis$scale = prevAxis == null ? void 0 : prevAxis.scale(prevAxis.stacked ? (_prev$stackData = prev.stackData) == null ? void 0 : _prev$stackData[1] : prev.secondaryValue)) != null ? _prevAxis$scale : NaN;
            secondaryStart = value - (value - prevValue) / 2;
          }

          if (next) {
            var _nextAxis$scale, _next$stackData;

            var nextAxis = secondaryAxes.find(function (d) {
              return d.id === (next == null ? void 0 : next.secondaryAxisId);
            });
            var nextValue = (_nextAxis$scale = nextAxis == null ? void 0 : nextAxis.scale(nextAxis.stacked ? (_next$stackData = next.stackData) == null ? void 0 : _next$stackData[1] : next.secondaryValue)) != null ? _nextAxis$scale : NaN;
            secondaryEnd = value + (nextValue - value) / 2;
          }

          return {
            secondaryStart: secondaryStart,
            secondaryEnd: secondaryEnd,
            datum: datum
          };
        })
      };
    });
    return /*#__PURE__*/_react["default"].createElement("g", {
      onMouseLeave: function onMouseLeave() {
        return handleFocus(null);
      },
      style: {
        transform: (0, _Utils.translate)(gridDimensions.left, gridDimensions.top)
      }
    }, columns.map(function (column, i) {
      return /*#__PURE__*/_react["default"].createElement("g", {
        key: column.primaryPx + "_" + i
      }, column.datumBoundaries.map(function (datumBoundary, i) {
        var x1 = !primaryAxis.isVertical ? column.primaryStart : datumBoundary.secondaryStart;
        var x2 = !primaryAxis.isVertical ? column.primaryEnd : datumBoundary.secondaryEnd;
        var y1 = !primaryAxis.isVertical ? datumBoundary.secondaryStart : column.primaryStart;
        var y2 = !primaryAxis.isVertical ? datumBoundary.secondaryEnd : column.primaryEnd;
        var x = Math.min(x1, x2);
        var y = Math.min(y1, y2);
        var xEnd = Math.max(x1, x2);
        var yEnd = Math.max(y1, y2);
        var height = Math.max(yEnd - y, 0);
        var width = Math.max(xEnd - x, 0);
        return /*#__PURE__*/_react["default"].createElement("rect", {
          key: i,
          x: x,
          y: y,
          width: width,
          height: height,
          className: 'action-voronoi',
          onMouseEnter: function onMouseEnter() {
            return handleFocus(datumBoundary.datum);
          },
          style: {
            fill: getOptions().dark ? '#ffffff33' : 'rgba(0,0,0,0.2)',
            strokeWidth: 1,
            stroke: getOptions().dark ? 'white' : 'black',
            opacity: getOptions().showVoronoi ? 1 : 0
          }
        });
      }));
    }));
  }, [datumsByInteractionGroup, primaryAxis, gridDimensions.left, gridDimensions.top, secondaryAxes, useBarPx, stackedVoronoi, handleFocus, getOptions]);
}

var delaunayLineFn = (0, _d3Shape.line)();

function SingleVoronoi(_ref3) {
  var handleFocus = _ref3.handleFocus;

  var _useChartContext3 = (0, _chartContext["default"])(),
      primaryAxis = _useChartContext3.primaryAxis,
      series = _useChartContext3.series,
      secondaryAxes = _useChartContext3.secondaryAxes,
      getOptions = _useChartContext3.getOptions,
      gridDimensions = _useChartContext3.gridDimensions;

  var polygons = null;
  var voronoiData = [];
  var useBarPx = secondaryAxes.every(function (d) {
    return d.elementType === 'bar' && !d.stacked;
  });
  series.forEach(function (serie) {
    serie.datums.filter(function (datum) {
      var primaryValue = datum.primaryValue;
      var secondaryValue = datum.secondaryValue;
      return primaryValue !== 'undefined' && primaryValue !== null && secondaryValue !== 'undefined' && secondaryValue !== null;
    }).forEach(function (datum) {
      var secondaryAxis = secondaryAxes.find(function (d) {
        return d.id === datum.secondaryAxisId;
      });
      var x = getX(datum, primaryAxis, secondaryAxis, useBarPx);
      var y = getY(datum, primaryAxis, secondaryAxis, useBarPx);

      if (typeof x !== 'number' || typeof y !== 'number' || Number.isNaN(y) || Number.isNaN(x)) {
        return;
      }

      voronoiData.push({
        x: x,
        y: y,
        datum: datum
      });
    });
  });

  var delaunay = _d3Delaunay.Delaunay.from(voronoiData, function (d) {
    return Math.max(d.x, 0);
  }, function (d) {
    return Math.max(d.y, 0);
  });

  var voronoi = delaunay.voronoi([0, 0, gridDimensions.width, gridDimensions.height]);
  polygons = voronoi.cellPolygons();
  polygons = Array.from(polygons);
  return /*#__PURE__*/_react["default"].createElement("g", {
    onMouseLeave: function onMouseLeave() {
      return handleFocus(null);
    },
    style: {
      transform: (0, _Utils.translate)(gridDimensions.left, gridDimensions.top)
    }
  }, polygons.map(function (points, i) {
    var index = points.index;
    var datum = voronoiData[index].datum;
    var path = delaunayLineFn(points) || undefined;
    return /*#__PURE__*/_react["default"].createElement("path", {
      key: i,
      d: path,
      className: 'action-voronoi',
      onMouseEnter: function onMouseEnter() {
        return handleFocus(datum);
      },
      style: {
        fill: getOptions().dark ? '#ffffff33' : 'rgba(0,0,0,0.2)',
        strokeWidth: 1,
        stroke: getOptions().dark ? 'white' : 'black',
        opacity: getOptions().showVoronoi ? 1 : 0
      }
    });
  }));
}

function getX(datum, primaryAxis, secondaryAxis, useBarPx) {
  return primaryAxis.isVertical ? getSecondary(datum, secondaryAxis) : getPrimary(datum, primaryAxis, secondaryAxis, useBarPx);
}

function getY(datum, primaryAxis, secondaryAxis, useBarPx) {
  return primaryAxis.isVertical ? getPrimary(datum, primaryAxis, secondaryAxis, useBarPx) : getSecondary(datum, secondaryAxis);
}

function getPrimary(datum, primaryAxis, secondaryAxis, useBarPx) {
  var _primaryAxis$scale;

  var primary = (_primaryAxis$scale = primaryAxis.scale(datum.primaryValue)) != null ? _primaryAxis$scale : NaN;

  if (useBarPx && secondaryAxis.elementType === 'bar') {
    if (!secondaryAxis.stacked) {
      var _ref4;

      primary += (_ref4 = primaryAxis.seriesBandScale(datum.seriesIndex)) != null ? _ref4 : NaN;
      primary += (0, _Bar.getPrimaryLength)(datum, primaryAxis, secondaryAxis) / 2;
    } else {
      primary += (0, _Bar.getPrimaryGroupLength)(datum, primaryAxis) / 2;
    }
  }

  return primary;
}

function getSecondary(datum, secondaryAxis) {
  var _secondaryAxis$scale5;

  if (secondaryAxis.stacked) {
    var _secondaryAxis$scale4, _datum$stackData$, _datum$stackData4;

    return (_secondaryAxis$scale4 = secondaryAxis.scale((_datum$stackData$ = (_datum$stackData4 = datum.stackData) == null ? void 0 : _datum$stackData4[1]) != null ? _datum$stackData$ : NaN)) != null ? _secondaryAxis$scale4 : NaN;
  }

  return (_secondaryAxis$scale5 = secondaryAxis.scale(datum.secondaryValue)) != null ? _secondaryAxis$scale5 : NaN;
}