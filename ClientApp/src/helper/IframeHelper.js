import React from 'react';

export function getYouTubeUrl(url){
    if(url&&url.includes('youtu')){

        return url.replace("youtu.be/","www.youtube.com/watch?v=").replace('watch?v=', 'embed/').split('&')[0]+'?rel=0&modestbranding=1&showinfo=0&iv_load_policy=3';
    } 
    else if (url&&url.includes('vimeo')){
        return url.split('?')[0] + '?title=0&amp;byline=0&amp;portrait=0';
    }
    
}