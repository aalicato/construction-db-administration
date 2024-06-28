const columnFormatter = (columns, columnTypes) => {
    let type = "#";
    console.log("types", columnTypes, columns.length, columns)
    for (i = 0; i < columns.length; i++) {
        type = columnTypes[i];
        if (type === "#") {
            continue;
        } else if (type === "c") {
            columns[i] = `CONCAT('$', ${columns[i]})`;
        } else if (type === "d") {
            columns[i] = `DATE_FORMAT(${columns[i]}, '%m-%d-%Y')`;
        }
    }
    return columns.join(", ")
};

module.exports = columnFormatter;