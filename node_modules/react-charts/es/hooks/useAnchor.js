import _extends from "@babel/runtime/helpers/esm/extends";
import React from 'react';
import useRect from './useRect'; //
//

// These are the keys used internally to look up and measure
// different sides of a bounding box within another
var sideSchemas = {
  left: {
    side: 'left',
    startKey: 'left',
    lengthKey: 'width',
    crossStartKey: 'top',
    crossLengthKey: 'height',
    fromEnd: false
  },
  right: {
    side: 'right',
    startKey: 'left',
    lengthKey: 'width',
    crossStartKey: 'top',
    crossLengthKey: 'height',
    fromEnd: true
  },
  top: {
    side: 'top',
    startKey: 'top',
    lengthKey: 'height',
    crossStartKey: 'left',
    crossLengthKey: 'width',
    fromEnd: false
  },
  bottom: {
    side: 'bottom',
    startKey: 'top',
    lengthKey: 'height',
    crossStartKey: 'left',
    crossLengthKey: 'width',
    fromEnd: true
  }
}; // This is the final Tootlip component. It's a render prop
// that lets you attach handlers to elements, and render a tooltip
// anchored to them in relation to the parent portal container (either the only
// one defined or the one referenced by Id).

export function useAnchor(options) {
  var portalDims = useRect(options.portalEl, options.show);
  var anchorDims = useRect(options.anchorEl, options.show);
  var tooltipDims = useRect(options.tooltipEl, options.show);
  var sides = React.useMemo(function () {
    var preSides = Array.isArray(options.side) ? options.side : [options.side];
    return preSides.map(function (alignStr) {
      var _ref = alignStr.split(' '),
          side = _ref[0],
          _ref$ = _ref[1],
          align = _ref$ === void 0 ? 'center' : _ref$;

      var incompatibleSide = !['top', 'right', 'bottom', 'left'].find(function (d) {
        return side === d;
      });

      if (incompatibleSide) {
        throw new Error("react-sticker: \"" + side + "\" is not a valid side! Must be one of ['top', 'right', 'bottom', 'left'].");
      }

      var incompatibleAlign = !['center', 'start', 'end', 'top', 'right', 'bottom', 'left'].find(function (d) {
        return align === d;
      });

      if (incompatibleAlign) {
        throw new Error("react-sticker: \"" + align + "\" is not a valid side-alignment! Must be one of ['center', 'start', 'end', 'top', 'right', 'bottom', 'left'].");
      }

      return [side, align];
    }); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(options.side)]); // IF we have all of the dimensions needed to calculate
  // fits, then calculate the fit

  var ready = portalDims && tooltipDims && anchorDims;
  var fit = React.useMemo(function () {
    return ready && options.show ? fitOnBestSide({
      portalDims: portalDims,
      tooltipDims: tooltipDims,
      anchorDims: anchorDims,
      sides: sides,
      useLargest: options.useLargest
    }) : null;
  }, [anchorDims, options.show, options.useLargest, portalDims, ready, sides, tooltipDims]);
  return {
    fit: fit,
    style: _extends({
      position: 'absolute',
      visibility: ready ? 'visible' : 'hidden'
    }, fit == null ? void 0 : fit.style)
  };
} // This function selects the best side for the tooltip by using
// the ranked fits.

function fitOnBestSide(_ref2) {
  var portalDims = _ref2.portalDims,
      tooltipDims = _ref2.tooltipDims,
      anchorDims = _ref2.anchorDims,
      sides = _ref2.sides,
      useLargest = _ref2.useLargest;
  var fits = sides.map(function (_ref3) {
    var side = _ref3[0],
        align = _ref3[1];
    return measureFit(_extends({}, sideSchemas[side], {
      align: align,
      portalDims: portalDims,
      tooltipDims: tooltipDims,
      anchorDims: anchorDims
    }));
  });

  if (useLargest) {
    fits.sort(function (a, b) {
      return b.fitRatio - a.fitRatio;
    });
    return fits[0];
  }

  return fits.find(function (fit) {
    return fit.fitRatio >= 1;
  }) || fits[0];
} // This function takes a side and bunch of calculated dimensions from
// the portal, tooltip and target. Then it returns
// the percentage fit and the style to achieve this specific fit


function measureFit(_ref4) {
  var _style;

  var side = _ref4.side,
      align = _ref4.align,
      startKey = _ref4.startKey,
      lengthKey = _ref4.lengthKey,
      crossStartKey = _ref4.crossStartKey,
      crossLengthKey = _ref4.crossLengthKey,
      fromEnd = _ref4.fromEnd,
      portalDims = _ref4.portalDims,
      tooltipDims = _ref4.tooltipDims,
      anchorDims = _ref4.anchorDims;
  var parentStart = portalDims[startKey];
  var parentLength = portalDims[lengthKey];
  var crossParentStart = portalDims[crossStartKey];
  var crossParentLength = portalDims[crossLengthKey];
  var anchorStart = anchorDims[startKey] - portalDims[startKey];
  var anchorLength = anchorDims[lengthKey];
  var crossAnchorStart = anchorDims[crossStartKey];
  var crossAnchorLength = anchorDims[crossLengthKey];
  var crossAnchorWidth = anchorDims[crossLengthKey];
  var targetLength = tooltipDims[lengthKey];
  var crossTargetLength = tooltipDims[crossLengthKey];
  var targetStart;
  var fitRatio;

  if (!fromEnd) {
    targetStart = anchorStart - targetLength;
    fitRatio = Math.min(anchorStart / targetLength);
  } else {
    targetStart = anchorStart + anchorLength;
    fitRatio = (parentLength - (anchorStart + anchorLength)) / targetLength;
  }

  targetStart = Math.max(parentStart, Math.min(targetStart, parentLength));
  var crossTargetStart;

  if (startKey === 'left') {
    if (align === 'top') {
      align = 'start';
    } else if (align === 'bottom') {
      align = 'end';
    }
  } else {
    if (align === 'left') {
      align = 'start';
    } else if (align === 'right') {
      align = 'end';
    }
  }

  if (!['start', 'center', 'end'].includes(align)) {
    align = 'center';
  }

  if (align === 'start') {
    crossTargetStart = crossAnchorStart;
  } else if (align === 'end') {
    crossTargetStart = crossAnchorStart + crossAnchorWidth - crossTargetLength;
  } else {
    crossTargetStart = crossAnchorStart + crossAnchorLength / 2 - crossTargetLength / 2;
  }

  crossTargetStart = Math.max(crossParentStart, Math.min(crossTargetStart, crossParentLength - crossTargetLength));
  return {
    side: side,
    align: align,
    startKey: startKey,
    lengthKey: lengthKey,
    crossStartKey: crossStartKey,
    crossLengthKey: crossLengthKey,
    fromEnd: fromEnd,
    portalDims: portalDims,
    tooltipDims: tooltipDims,
    anchorDims: anchorDims,
    fitRatio: fitRatio,
    style: (_style = {}, _style[startKey] = targetStart, _style[crossStartKey] = crossTargetStart, _style)
  };
}