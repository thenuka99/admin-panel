import React from 'react';
import { ResolvedTooltipOptions, TooltipOptions } from '../types';
export declare function defaultTooltip<TDatum>(options?: boolean | TooltipOptions<TDatum>): ResolvedTooltipOptions<TDatum>;
export default function Tooltip<TDatum>(): React.ReactPortal | null;
