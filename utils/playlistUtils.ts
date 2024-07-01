// playlistUtils.ts
export const shuffle = (array: any[]) => {
    let currentIndex = array.length;
    while (currentIndex !== 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
};

export const initializeSongLists = (setSongList: React.Dispatch<React.SetStateAction<any[]>>, setShuffledList: React.Dispatch<React.SetStateAction<any[]>>, shuffleFunc: (array: any[]) => any[]) => {
    const storedSongs = localStorage.getItem('songList');
    const storedShuffledList = localStorage.getItem('shuffledList');

    if (storedSongs) {
        const parsedList = JSON.parse(storedSongs);
        setSongList(parsedList);
        const shuffledState = storedShuffledList ? JSON.parse(storedShuffledList) : shuffleFunc([...parsedList]);
        setShuffledList(shuffledState);
    }
};
