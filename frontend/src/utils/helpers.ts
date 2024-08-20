export const formatDate = (date: string) => {
    const newDate = new Date(Number(date));

    return newDate.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}