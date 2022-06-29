import _extends from "@babel/runtime/helpers/esm/extends";
import React from 'react';
import useIsomorphicLayoutEffect from '../hooks/useIsomorphicLayoutEffect';
import useChartContext from '../utils/chartContext';

var getElBox = function getElBox(el) {
  var rect = el.getBoundingClientRect();
  return {
    top: Math.round(rect.top),
    right: Math.round(rect.right),
    bottom: Math.round(rect.bottom),
    left: Math.round(rect.left),
    width: Math.round(rect.width),
    height: Math.round(rect.height),
    x: Math.round(rect.x),
    y: Math.round(rect.y)
  };
};

export default function useMeasure(_ref) {
  var axis = _ref.axis,
      elRef = _ref.elRef,
      gridDimensions = _ref.gridDimensions,
      setShowRotated = _ref.setShowRotated;

  var _useChartContext = useChartContext(),
      axisDimensionsState = _useChartContext.axisDimensionsState;

  var axisDimensions = axisDimensionsState[0],
      setAxisDimensions = axisDimensionsState[1];
  var axisDimension = React.useMemo(function () {
    var _axisDimensions;

    return (_axisDimensions = axisDimensions[axis.position]) == null ? void 0 : _axisDimensions[axis.id];
  }, [axisDimensions, axis.position, axis.id]); // const isLooping = useIsLooping()

  var measureRotation = React.useCallback(function () {
    var _widestLabel2;

    if (!elRef.current) {
      return;
    }

    var gridSize = !axis.isVertical ? gridDimensions.width : gridDimensions.height;
    var staticLabelDims = Array.from(elRef.current.querySelectorAll('.Axis-Group.outer .tickLabel')).map(function (el) {
      return getElBox(el);
    }); // Determine the largest labels on the axis

    var widestLabel;
    staticLabelDims.forEach(function (label) {
      var _widestLabel;

      var resolvedLabel = (_widestLabel = widestLabel) != null ? _widestLabel : {
        width: 0
      };

      if (label.width > 0 && label.width > resolvedLabel.width) {
        widestLabel = label;
      }
    });
    var smallestTickGap = gridSize;

    if (staticLabelDims.length > 1) {
      staticLabelDims.forEach(function (current, i) {
        var prev = staticLabelDims[i - 1];

        if (prev) {
          smallestTickGap = Math.min(smallestTickGap, axis.isVertical ? current.top - prev.top : current.left - prev.left);
        }
      });
    }

    var shouldRotate = (((_widestLabel2 = widestLabel) == null ? void 0 : _widestLabel2.width) || 0) + axis.minTickPaddingForRotation > smallestTickGap; // if (!isLooping) {
    // Rotate ticks for non-time horizontal axes

    if (!axis.isVertical) {
      setShowRotated(shouldRotate);
    } // }

  }, [elRef, axis.isVertical, axis.minTickPaddingForRotation, gridDimensions.width, gridDimensions.height, setShowRotated]);
  var measureDimensions = React.useCallback(function () {
    if (!elRef.current) {
      if (axisDimension) {
        // If the entire axis is hidden, then we need to remove the axis dimensions
        setAxisDimensions(function (old) {
          var _old$axis$position, _extends2;

          var newAxes = _extends({}, (_old$axis$position = old[axis.position]) != null ? _old$axis$position : {});

          delete newAxes[axis.id];
          return _extends({}, old, (_extends2 = {}, _extends2[axis.position] = newAxes, _extends2));
        });
      }

      return;
    }

    var newDimensions = {
      width: 0,
      height: 0,
      paddingTop: 0,
      paddingBottom: 0,
      paddingLeft: 0,
      paddingRight: 0
    };
    var currentEl = elRef.current;
    var axisEl = currentEl.querySelector(".Axis-Group.inner .domainAndTicks");
    var domainEl = currentEl.querySelector(".Axis-Group.inner .domain");

    if (!axisEl || !domainEl) {
      return;
    }

    var axisDims = getElBox(axisEl);
    var domainDims = getElBox(domainEl);

    if (!axisDims || !domainDims) {
      return;
    } // Axis overflow measurements


    if (!axis.isVertical) {
      newDimensions.paddingLeft = Math.round(Math.max(0, domainDims.left - (axisDims == null ? void 0 : axisDims.left)));
      newDimensions.paddingRight = Math.round(Math.max(0, (axisDims == null ? void 0 : axisDims.right) - domainDims.right));
      newDimensions.height = axisDims == null ? void 0 : axisDims.height;
    } else {
      newDimensions.paddingTop = Math.round(Math.max(0, domainDims.top - (axisDims == null ? void 0 : axisDims.top)));
      newDimensions.paddingBottom = Math.round(Math.max(0, (axisDims == null ? void 0 : axisDims.bottom) - domainDims.bottom));
      newDimensions.width = axisDims == null ? void 0 : axisDims.width;
    } // Only update the axisDimensions if something has changed


    if ( // !isLooping &&
    !axisDimensions || !axisDimension || Object.keys(newDimensions).some(function (key) {
      // @ts-ignore
      return newDimensions[key] !== axisDimension[key];
    })) {
      setAxisDimensions(function (old) {
        var _old$axis$position2, _extends3, _extends4;

        return _extends({}, old, (_extends4 = {}, _extends4[axis.position] = _extends({}, (_old$axis$position2 = old[axis.position]) != null ? _old$axis$position2 : {}, (_extends3 = {}, _extends3[axis.id] = newDimensions, _extends3)), _extends4));
      });
    }
  }, [axis.id, axis.isVertical, axis.position, axisDimension, axisDimensions, elRef, setAxisDimensions]); // Measure after if needed

  useIsomorphicLayoutEffect(function () {
    // setTimeout(() => {
    window.requestAnimationFrame(function () {
      measureRotation();
      measureDimensions();
    });
  }, [measureRotation]); // useIsomorphicLayoutEffect(() => {
  //   // setTimeout(() => {
  //   window.requestAnimationFrame(() => {
  //   })
  // }, [measureRotation])
}