import { SERVICEURL, SERVICEKEY } from '../utility/constant';

export async function fetchData(params){
    const header = {
        ...params,
        method:'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "X-Api-Key": SERVICEKEY
        }
    }
    const data = await fetch(`${SERVICEURL}${params}`, header)
          .then(res=>res.json())
          .then(res=>{
              const {status, articles, totalResults} = res;
              if(status==='ok'){
                return {articles,totalResults};
              }
              throw new Error('Some issues');
          })
          .catch(error=>{
              throw error;
          });
    return data;
}