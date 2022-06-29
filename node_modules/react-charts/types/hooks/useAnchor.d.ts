import { HasBoundingClientRect } from './useRect';
declare type AlignMode = 'center' | 'start' | 'end' | 'top' | 'right' | 'bottom' | 'left';
declare type Side = 'left' | 'right' | 'top' | 'bottom';
declare type SideOption = Side | `${Side} ${AlignMode}`;
declare type StartKey = 'left' | 'top';
declare type LengthKey = 'width' | 'height';
declare type Dims = {
    left: number;
    top: number;
    right: number;
    bottom: number;
    width: number;
    height: number;
};
export declare function useAnchor(options: {
    show: boolean;
    useLargest?: boolean;
    side: SideOption | SideOption[];
    portalEl: HasBoundingClientRect | null | undefined;
    anchorEl: HasBoundingClientRect | null | undefined;
    tooltipEl: HasBoundingClientRect | null | undefined;
}): {
    fit: {
        side: Side;
        align: AlignMode;
        startKey: StartKey;
        lengthKey: LengthKey;
        crossStartKey: StartKey;
        crossLengthKey: LengthKey;
        fromEnd: boolean;
        portalDims: Dims;
        tooltipDims: Dims;
        anchorDims: Dims;
        fitRatio: number;
        style: Record<StartKey, number>;
    } | null;
    style: {
        top?: number | undefined;
        left?: number | undefined;
        position: "absolute";
        visibility: "visible" | "hidden";
    };
};
export {};
