import { ComponentPropsWithoutRef } from 'react';
import { ChartOptions } from '../types';
export declare function Chart<TDatum>({ options: userOptions, className, style, ...rest }: ComponentPropsWithoutRef<'div'> & {
    options: ChartOptions<TDatum>;
}): JSX.Element;
