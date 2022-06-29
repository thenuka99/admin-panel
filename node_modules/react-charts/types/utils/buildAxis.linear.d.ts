import { Axis, BuildAxisOptions, Datum, GridDimensions, Series } from '../types';
export default function buildAxisLinear<TDatum>(isPrimary: boolean, userOptions: BuildAxisOptions<TDatum>, series: Series<TDatum>[], allDatums: Datum<TDatum>[], gridDimensions: GridDimensions, width: number, height: number): Axis<TDatum>;
