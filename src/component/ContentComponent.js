import { useContext, useState } from 'react';
import {ApplicationState, ApplicationDispatch} from 'src/context/ApplicationContext';
import FilterComponent from 'src/component/FilterComponent';
import NewsContentComponent from 'src/component/NewsContentComponent';

const ContentComponent = () =>{

    const {news={}, loading, filter} = useContext(ApplicationState);
    const [hideDate, setHideDate] = useState(true);
    const dispatch = useContext(ApplicationDispatch);
    let contentClass = "content";
    
    if(loading || !news.articles || news.articles.length==0){
        contentClass+= " hidden";
    }

    const handleFilter = params =>{
        dispatch({type:'updatefilter',value:{...filter,...params}});
    }

    return <div className={contentClass}>
        <FilterComponent 
            total={news.totalResults||0} 
            {...filter} 
            handleFilter={handleFilter}
            hideDate={hideDate}
            setHideDate={setHideDate}/>
            
        {(!loading && news.articles && news.articles.length>0 && 
        <NewsContentComponent news={news.articles}/>)||
        (loading && <div className="spinner-box">
                        <div className="circle-border">
                            <div className="circle-core"></div>
                        </div>
                    </div>)||
        <div className="no-news">
            <h2>No News found for given filters!!</h2> 
            <span>Try with resetting the filters</span>   
        </div>}
        
    </div>
} 

export default ContentComponent;