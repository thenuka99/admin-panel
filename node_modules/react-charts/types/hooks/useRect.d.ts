export declare type HasBoundingClientRect = {
    getBoundingClientRect: () => DOMRect;
};
export default function useRect(node: HasBoundingClientRect | null | undefined, enabled: boolean): DOMRect;
