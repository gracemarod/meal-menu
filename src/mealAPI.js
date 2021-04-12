
export const apiCall = async (link) => {
    const data = await fetch(link);
    return data.json();
}
