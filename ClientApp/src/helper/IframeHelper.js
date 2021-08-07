import React from 'react';

export function getYouTubeUrl(url){
    return url && url.replace('watch?v=', 'embed/').split('&')[0]+'?fs=0&modestbranding=1&showinfo=0&iv_load_policy=3'; //
}