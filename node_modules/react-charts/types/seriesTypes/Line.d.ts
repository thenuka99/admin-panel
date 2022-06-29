import { Axis, Series } from '../types';
export default function Line<TDatum>({ primaryAxis, secondaryAxis, series: allSeries, }: {
    primaryAxis: Axis<TDatum>;
    secondaryAxis: Axis<TDatum>;
    series: Series<TDatum>[];
}): JSX.Element;
