import { Datum, DatumFocusStatus, DatumStyles, Series, SeriesFocusStatus, SeriesStyles } from '../types';
export declare function getSeriesStatus<TDatum>(series: Series<TDatum>, focusedDatum: Datum<TDatum> | null): SeriesFocusStatus;
export declare function getDatumStatus<TDatum>(datum: Datum<TDatum>, focusedDatum: Datum<TDatum> | null): DatumFocusStatus;
export declare function materializeStyles(style?: SeriesStyles | DatumStyles, defaults?: SeriesStyles | DatumStyles): SeriesStyles | DatumStyles;
export declare function translate(x: number, y: number): string;
export declare function isDefined(num: number): boolean;
