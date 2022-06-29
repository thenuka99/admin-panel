import { CSSProperties } from 'react';
import { useAnchor } from '../hooks/useAnchor';
import { Axis, Datum, ResolvedChartOptions } from '../types';
export declare type TooltipRendererProps<TDatum> = {
    focusedDatum: Datum<TDatum> | null;
    getOptions: () => ResolvedChartOptions<TDatum>;
    primaryAxis: Axis<TDatum>;
    secondaryAxes: Axis<TDatum>[];
    secondaryAxis: Axis<TDatum>;
    getDatumStyle: (datum: Datum<TDatum>) => CSSProperties;
    anchor: ReturnType<typeof useAnchor>;
};
export default function tooltipRenderer<TDatum>(props: TooltipRendererProps<TDatum>): JSX.Element;
