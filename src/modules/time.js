export const timeUntil = (date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((date - now) / 1000);

    // Define time intervals
    const secondsInMinute = 60;
    const secondsInHour = secondsInMinute * 60;
    const secondsInDay = secondsInHour * 24;
    const secondsInMonth = secondsInDay * 30; // Approximation
    const secondsInYear = secondsInDay * 365; // Approximation

    let formattedTime = "";

    if (diffInSeconds < secondsInMinute) {
        formattedTime = `${Math.ceil(diffInSeconds)}s`;
    } else if (diffInSeconds < secondsInHour) {
        const minutes = Math.ceil(diffInSeconds / secondsInMinute);
        formattedTime = `${minutes}m`;
    } else if (diffInSeconds < secondsInDay) {
        const hours = Math.floor(diffInSeconds / secondsInHour);
        const minutes = Math.ceil(
            (diffInSeconds % secondsInHour) / secondsInMinute
        );
        formattedTime = minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
    } else if (diffInSeconds < secondsInMonth) {
        const days = Math.floor(diffInSeconds / secondsInDay);
        const hours = Math.ceil((diffInSeconds % secondsInDay) / secondsInHour);
        formattedTime = hours > 0 ? `${days}d ${hours}h` : `${days}d`;
    } else if (diffInSeconds < secondsInYear) {
        const months = Math.floor(diffInSeconds / secondsInMonth);
        formattedTime = `${months}mo`;
    } else {
        const years = Math.floor(diffInSeconds / secondsInYear);
        formattedTime = `${years}y`;
    }

    return formattedTime;
};

export const timeAgo = (date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    // Define time intervals
    const secondsInMinute = 60;
    const secondsInHour = secondsInMinute * 60;
    const secondsInDay = secondsInHour * 24;
    const secondsInMonth = secondsInDay * 30; // Approximation
    const secondsInYear = secondsInDay * 365; // Approximation

    let formattedTime = "";

    if (diffInSeconds < secondsInMinute) {
        formattedTime = `${Math.floor(diffInSeconds)}s`;
    } else if (diffInSeconds < secondsInHour) {
        const minutes = Math.floor(diffInSeconds / secondsInMinute);
        formattedTime = `${minutes}m`;
    } else if (diffInSeconds < secondsInDay) {
        const hours = Math.floor(diffInSeconds / secondsInHour);
        const minutes = Math.floor(
            (diffInSeconds % secondsInHour) / secondsInMinute
        );
        formattedTime = minutes > 0 ? `${hours}h${minutes}m` : `${hours}h`;
    } else if (diffInSeconds < secondsInMonth) {
        const days = Math.floor(diffInSeconds / secondsInDay);
        const hours = Math.floor(
            (diffInSeconds % secondsInDay) / secondsInHour
        );
        formattedTime = hours > 0 ? `${days}d ${hours}h` : `${days}d`;
    } else if (diffInSeconds < secondsInYear) {
        const months = Math.floor(diffInSeconds / secondsInMonth);
        formattedTime = `${months}mo`;
    } else {
        const years = Math.floor(diffInSeconds / secondsInYear);
        formattedTime = `${years}y`;
    }

    return formattedTime;
};
