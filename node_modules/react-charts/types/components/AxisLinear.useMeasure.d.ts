import { MutableRefObject } from 'react';
import { Axis, GridDimensions } from '../types';
export default function useMeasure<TDatum>({ axis, elRef, gridDimensions, setShowRotated, }: {
    axis: Axis<TDatum>;
    elRef: MutableRefObject<SVGGElement | null>;
    gridDimensions: GridDimensions;
    showRotated: boolean;
    setShowRotated: (value: boolean) => void;
}): void;
