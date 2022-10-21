
export class Song {
    id?: string;  
    name: string;
    trackName:string;
    trackNumber:string;
    trackLength:number;
    album?: string;
    albumId:string;
    albumCover:string;
    submittedBy?:string;
    collectionId?:string;
    session?:string;
    season?:string;
    largeCover?: string;
    rounds: Round;
    position:Position;
  }

  export class Round {
    roundOne: boolean;  
    roundTwo: boolean;
    roundThree: boolean;  
  }

  export class Position {
    roundOne: number;  
    roundTwo: number;
    roundThree: number;  
  }