import React from 'react';

export function getYouTubeUrl(url){
    return url && url.replace("youtu.be/","www.youtube.com/watch?v=").replace('watch?v=', 'embed/').split('&')[0]+'?rel=0&modestbranding=1&showinfo=0&iv_load_policy=3'; //
}