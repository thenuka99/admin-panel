export declare class Spring {
    private _m;
    private _k;
    private _c;
    private _solution;
    private _startTime;
    endPosition: number;
    constructor(init: number, mass: number, springConstant: number, damping: number);
    x(dt?: number): number;
    private dx;
    setEnd(x: number): void;
    snap(x: number): void;
    done(): boolean;
    private _solve;
}
