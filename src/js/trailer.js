import * as basicLightbox from 'basiclightbox';

export function onCreateTrailer(el) {
    const trailerButton = el;
  
    trailerButton.forEach(el =>
        el.addEventListener('click', e => {
            onOpenModalForTrailer(e.target.dataset.id);
        }),
    );
  
    function onOpenModalForTrailer(id) {
        const API_KEY = '7f0b5ab01080cb0bb4b9db0d9bc41efa';
        const URL = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`;
        fetch(URL)
            .then(res => res.json())
            .then(data => {
                const filmId = data.results[0].key;
                const iframeTemplate = `
                    <iframe 
                        width="640"
                        height="360"
                        src='https://www.youtube.com/embed/${filmId}'frameborder="0" 
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
                    </iframe>
                `;
                const instance = basicLightbox.create(iframeTemplate);
                instance.show();
            })
            .catch(() => {
                const iframeError = `
                <img 
                width="640" 
                height="360" 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnF3GbWi_Rj-We09kgAsNLaKA0bN9iRk6RRg&usqp=CAU" 
                alt="404">
                  `
                const instance = basicLightbox.create(iframeError);
  
                instance.show();
            });
    }
  }
  