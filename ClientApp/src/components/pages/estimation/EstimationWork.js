import React from 'react';
import { getYouTubeUrl } from '../../../helper/IframeHelper'

export function EstimationWork(){
    return (<iframe src={getYouTubeUrl("https://www.youtube.com/watch?v=Csa3jiebPF0&pp=sAQA")} height='690' width='1230'/>)
}


