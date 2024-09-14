import { useQuery } from "@tanstack/react-query";


export const FetchData =(queryName:string,url:string)=>{
   
       const { isPending, data } = useQuery({
              queryKey: [queryName],
              queryFn: () =>
                fetch(url).then((res) =>
                  res.json(),
                ),
            })

            return [isPending,data]
                
}



         