const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: '35f4176bc2217565c05e2df132f59c01',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
}

export default apiConfig