import { Axis, Datum, Series } from '../types';
export default function BarComponent<TDatum>({ primaryAxis, secondaryAxis, series: allSeries, }: {
    primaryAxis: Axis<TDatum>;
    secondaryAxis: Axis<TDatum>;
    series: Series<TDatum>[];
}): JSX.Element;
export declare function getPrimaryGroupLength<TDatum>(_datum: Datum<TDatum>, primaryAxis: Axis<TDatum>): number;
export declare function getPrimaryLength<TDatum>(_datum: Datum<TDatum>, primaryAxis: Axis<TDatum>, secondaryAxis: Axis<TDatum>): number;
export declare function getPrimary<TDatum>(datum: Datum<TDatum>, primaryAxis: Axis<TDatum>, secondaryAxis: Axis<TDatum>): number;
