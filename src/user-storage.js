export const userStorage = (function storedData () {

    const getData = (key) => {
        const requestedData = JSON.parse(localStorage.getItem(key));
        return requestedData ? requestedData : [];
    }

    const addData = (key, value) => localStorage.setItem(key, JSON.stringify(value));

    return { getData, addData };
})();