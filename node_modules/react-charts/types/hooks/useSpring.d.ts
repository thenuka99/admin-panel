import { Spring } from '../utils/spring';
export declare function useSpring(value: number, config: [number, number, number], cb: (x: number) => void, immediate?: boolean, debug?: boolean): Spring;
export declare function useRaf(callback: () => any): (() => void)[];
