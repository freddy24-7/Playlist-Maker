// export const extractVideoId = (url) => {
//     const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:[^\/]+\?v=|v\/|embed\/|watch\?v=))([^&\/\?]+)/);
//     return match ? match[1] : null;
// };
//
// export const convertDurationToSeconds = (duration) => {
//     // Assuming duration format is in ISO 8601 (PT#H#M#S)
//     const match = duration.match(/PT(\d*H)?(\d*M)?(\d*S)?/);
//     const hours = match[1] ? parseInt(match[1]) * 3600 : 0;
//     const minutes = match[2] ? parseInt(match[2]) * 60 : 0;
//     const seconds = match[3] ? parseInt(match[3]) : 0;
//     return hours + minutes + seconds;
// };