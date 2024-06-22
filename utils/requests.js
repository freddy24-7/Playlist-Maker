// const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || '';
//
// // Fetch all videos
// async function fetchVideos() {
//     if (!apiDomain) {
//         return null;
//     }
//     const timestamp = new Date().getTime();
//     const url = `${apiDomain}/videos?_=${timestamp}`;
//     try {
//         const res = await fetch(url);
//         if (!res.ok) {
//             throw new Error('Failed to fetch data');
//         }
//         return res.json();
//     } catch (error) {
//         console.log(error);
//         return [];
//     }
// }
//
// // Fetch single video
// async function fetchVideo(id) {
//     if (!apiDomain) {
//         return null;
//     }
//     try {
//         const res = await fetch(`${apiDomain}/videos/${id}`);
//         if (!res.ok) {
//             throw new Error('Failed to fetch data');
//         }
//         return res.json();
//     } catch (error) {
//         console.log(error);
//         return null;
//     }
// }
//
//
//
// export { fetchVideos, fetchVideo };
