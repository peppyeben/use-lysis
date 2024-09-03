function formatDate(date) {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    return `${day}/${month}`;
}

export const groupNames = (data) => {
    const groupedData = {};

    data.forEach((item) => {
        // Convert the timestamp from microseconds to milliseconds
        const date = new Date(item.timestamp / 1000);
        const formattedDate = formatDate(date);

        // Initialize the count for this date if it doesn't exist
        if (!groupedData[formattedDate]) {
            groupedData[formattedDate] = 0;
        }

        // Increment the count of names registered on this date
        groupedData[formattedDate] += 1;
    });

    // Convert the grouped data object into an array of objects
    const result = Object.keys(groupedData).map((date) => ({
        date: date,
        namesRegistered: groupedData[date],
    }));

    return result.slice(0, 10);
};
