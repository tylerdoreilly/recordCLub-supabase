export class Session {
    id?: string;
    sessions?:Sessions[];
    title: string;
    week:number;
    season: Season;
    theme: string;
    bracketeer?:string;
    startDate: string;
    endDate: string;
    meetupDate: string;
    meetupTime: string; 
  }
  
  export class Sessions {
    sessionId?: string;
    title?: string;
    week?: number;
    season?:Season[];
  }

  export class Season {
    title: string;
    id: string;
  }

  // export class Sessions {
  //   id?: string;
  //   title: string;
  //   week:number;
  //   season: Season;
  //   theme: string;
  //   bracketeer?:string;
  //   startDate: string;
  //   endDate: string;
  //   meetupDate: string;
  //   meetupTime: string; 
  // }
  