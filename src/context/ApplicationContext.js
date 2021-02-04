import {createContext, useEffect, useReducer} from 'react';
import applicationReducer from'src/context/reducer';
import {fetchData} from 'src/utility/service';
import {TOPSTORIES, publishedAt} from "src/utility/constant"

const ApplicationState = createContext();
const ApplicationDispatch = createContext();

const ApplicationContext = ({children})=>{
    const applicationState={
        searchText:'',
        date:'',
        activeLink:TOPSTORIES,
        country:'in',
        news:{},
        loading:true,
        filter:{
            startDate: new Date(),
            endDate: new Date(),
            sortBy:publishedAt
        }
    }
    const [state, dispatch] = useReducer(applicationReducer, {...applicationState});

    const getDateFormat = params => {
        const date = new Date(params);
        const month = date.getMonth()<10 ? `0${date.getMonth()}`:date.getMonth();
        const day = date.getDate()<10 ? `0${date.getDate()}`:date.getDate();
        return `${date.getFullYear()}-${month}-${day}`
    }

    const getNews = params =>{
        dispatch({type:'getNews'})
        fetchData(`${state.activeLink}?country=${params}`)
        .then(res=>{
            dispatch({type:'updateNews', value:{...res}})
        })
        .catch(error=>{
            dispatch({type:'updateNews', value:[]})
        })
    }

    useEffect(()=>{
        getNews('in');
    },[]);

    useEffect(()=>{
        let urlParameters = Object.entries(state.filter).map(e => {
            if(typeof e[1] ==="object"){
                return `${e[0]}=${encodeURIComponent(getDateFormat(new Date(e[1])   ))}`
            }
            return `${e[0]}=${e[1]}`;
        }).join('&');
        if(state.searchText){
            urlParameters+=`&q=${encodeURIComponent(state.searchText)}`
        }
        getNews(`${state.country}&${urlParameters}`);
    },[state.country, state.searchText, state.activeLink, state.filter]);

    return (
        <ApplicationState.Provider value={state}>
            <ApplicationDispatch.Provider value={dispatch}>
                {children}
            </ApplicationDispatch.Provider>
        </ApplicationState.Provider>
    )
}

export {ApplicationContext,ApplicationDispatch, ApplicationState};