export class CAF {
    constructor
      (
        public id: string,
        public seuleNonEnfant:number,
        public seuleUnEnfant:number,
        public seuleDeuxEnfant:number,
        public seuleParEnfantSupp:number,
        public coupleNonEnfant:number,
        public coupleUnEnfant:number,
        public coupleDeuxEnfant:number,
        public coupleParEnfantSupp:number,
        public date:string,
        public dateValid:string,
        public forfaitLogUnePer:number,
        public forfaitLogDeuxPer:number,
        public forfaitLogTroisPer:number
      )
    {}   
}