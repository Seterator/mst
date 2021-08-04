import React from 'react';

export function getYouTubeUrl(url){
    return url.replace('watch?v=', 'embed/').split('&')[0];
}