

export const formatMatter = (matter) => {
    return "- " + matter
}

export const formatMinutesDate = (date) => {
    return String(date.year) + "/" + String(date.month).padStart(2, '0') + "/" + String(date.day).padStart(2, '0')
}

export const SortByStartDateTime = (data, descending) => {
    return (data.sort((a, b) => {
        const adt = formatMinutesDate(a.startDateTime)
        const bdt = formatMinutesDate(b.startDateTime)
            if (descending) {
                if (adt < bdt) return 1;
                if (adt > bdt) return -1;
                return 0;
            }
            else{
               if (adt > bdt) return 1;
               if (adt < bdt) return -1;
               return 0;
            }
        })
    )
}