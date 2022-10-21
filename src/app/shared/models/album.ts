
export class Album {
    id?: string;  
    randomizedId?:number;
    name: string;
    album?: string;
    albumId:string;
    albumCover:string;
    submittedBy?:string;
    collectionId?:string;
    session?:string;
    season?:string;
    largeCover?: string;
    releaseDate?: string;
    country?: string;
    copyright?: string;
    genreTags?: GenreTags[];
    trackCount?: number;
    trackList?: Tracklist[];
    scores?: Scores[];
    scoreAverage?:number;
  }

  export class Scores {
    displayName: string;
    memberId:string;
    score:number;
  }

  export class GenreTags {
    name: string;
  }

  export class Tracklist{
    artistId:number;
    kind:string;
    trackId:number;
    trackName: string; 
    trackNumber: number;
    trackPrice: number;
    trackTimeMillis:number; 
    trackViewUrl: string;
    wrapperType: string;
    previewUrl: string;
    discCount: number; 
    discNumber: number; 
  }