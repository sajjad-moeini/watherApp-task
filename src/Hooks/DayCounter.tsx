
type Func =(e:string)=>string

export const DayCounter:Func= (selectedDay:string)=>{
       const date = new Date(selectedDay); 
const dayOfWeek = date.toLocaleString('en-US', { weekday: 'long' }); 

return dayOfWeek.slice(0,3)
}