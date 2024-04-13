export enum SortOrder {
    Ascending,
    Descending,
    Unordered,
}

export const sorted = <T,>(items: T[], compFunc: (a: T, b: T) => number, order: SortOrder) => {
    switch (order) {
        case SortOrder.Ascending:
            return [...items].sort(compFunc);
        case SortOrder.Descending:
            return [...items].sort((a, b) => -compFunc(a, b));
        default:
            return [...items];
    }
}