function formatDate(date) {
    return date.toISOString().split("T")[0];
}

export const groupSales = (data) => {
    const groupedData = {};

    data.forEach((item) => {
        const date = new Date(item.timestamp / 1000);
        const formattedDate = formatDate(date);

        if (!groupedData[formattedDate]) {
            groupedData[formattedDate] = 0;
        }

        groupedData[formattedDate] += parseFloat(item.salePrice) / 1e18;
    });

    const result = Object.keys(groupedData).map((date) => ({
        date: date,
        totalSalesPrice: Number(groupedData[date]).toFixed(2),
    }));

    return result.slice(0, 10);
};
