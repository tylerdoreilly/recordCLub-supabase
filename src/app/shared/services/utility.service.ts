import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  // Album Data Utilities

  getAlbumCover(res:any, size:string):void{
    const albumCovers = res.album.image;
    const lgImg = albumCovers.find(imgs => imgs.size == size);
    return lgImg["#text"];
  }

  getAlbumLength(tracklist:any):string{
    const trackTimes = [];
    tracklist.forEach(song =>{         
      trackTimes.push(song.trackTimeMillis);         
    });
    const albumLength = trackTimes.reduce((partialSum, a) => partialSum + a, 0);
    const formatLength = this.timeConversion(albumLength)
   return formatLength
  }

  getTracklist(albumInfo:any){
    return albumInfo.results.slice(1);
  }

  formatAlbumTitle(albumTitle){
    return albumTitle.replace(/ \([\s\S]*?\)/g, '');
  }

  // General Utilities

  splitText(text) {
    var paragraph     = "",
        paragraphs    = [],
        sentenceRegex = /[^\.!\?]+([\.!\?]+|\s*$)/g,
        sentences     = String(text).match(sentenceRegex),
        chunkSize = 400;
    // console.log(sentences)
    sentences.forEach(function createParagraphs (sentence, index) {
        paragraph += sentence;

        if (paragraph.length >= chunkSize || index === sentences.length - 1) {
            paragraphs.push(paragraph);
            paragraph = "";
        }
    });

    return paragraphs.length === 0 ? [text] : paragraphs;
  }

  timeConversion(duration: number) {
    const portions: string[] = [];
  
    const msInHour = 1000 * 60 * 60;
    const hours = Math.trunc(duration / msInHour);
    if (hours > 0) {
      portions.push(hours + 'h');
      duration = duration - (hours * msInHour);
    }
  
    const msInMinute = 1000 * 60;
    const minutes = Math.trunc(duration / msInMinute);
    if (minutes > 0) {
      portions.push(minutes + 'min');
      duration = duration - (minutes * msInMinute);
    }
  
    const seconds = Math.trunc(duration / 1000);
    if (seconds > 0) {
      portions.push(seconds + 'sec');
    }
  
    return portions.join(' ');
  }
}


