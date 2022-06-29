import * as React from 'react';
import { ChartContextValue } from '../types';
export declare function ChartContextProvider<TDatum>({ value, children, }: {
    value: () => ChartContextValue<TDatum>;
    children: React.ReactNode;
}): JSX.Element;
export default function useChartContext<TDatum>(): ChartContextValue<TDatum>;
