export type day = {
  date: string
  date_epoch: number
  day: {
    maxtemp_c: number
    mintemp_c: number
    avgtemp_c: number
    condition: {
      text: string
      icon: string
    };
  };
};

export type generatedUrl ={
       urlQuery:string
       urlAddress:string
}