import {formatDate} from "./format";

export const SortByStartDateTime = (data, descending) => {
    return (data.sort((a, b) => {
            const adt = formatDate(a.startDateTime)
            const bdt = formatDate(b.startDateTime)
            if (descending) {
                if (adt < bdt) return 1;
                if (adt > bdt) return -1;
                return 0;
            } else {
                if (adt > bdt) return 1;
                if (adt < bdt) return -1;
                return 0;
            }
        })
    )
}