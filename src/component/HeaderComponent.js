import { useRef, useLayoutEffect, useContext } from 'react';
import {ApplicationState, ApplicationDispatch} from 'src/context/ApplicationContext';
import {TOPSTORIES, ALLSTORIES} from "src/utility/constant"
 
import countryList from 'src/utility/countrylist.json';
import {fetchData} from 'src/utility/service'

const HeaderComponent = () => {
    const {activeLink, date, country} = useContext(ApplicationState);
    const dispatch = useContext(ApplicationDispatch);
    const searchRef = useRef();

    useLayoutEffect(()=>{
        displayClock();
    },[])

    const displayClock=()=>{
        let date = new Date();
        dispatch({type:'updateTime', 'value':`${date.toDateString()} ${date.toLocaleTimeString()}`});
        setTimeout(displayClock, 1000); 
    }

    const onChangeCountry=params=>{
        dispatch({type:'setCountry', 'value':(params.target.value).toLowerCase()});
    }

    const handleClick = (params,e)=>{
        dispatch({type:"selectedLink", value:params});
        e.preventDefault();
    }

    const handleSubmit = e =>{
        const value = e.target["search"].value;
        dispatch({type:"updateText", value});
        fetchData(`${activeLink}?country=${country}&q=${encodeURIComponent(value)}`)
        .then(res=>dispatch({type:"updateNews",value:{...res}}));
        e.preventDefault();
    }

    return (<header className="header">
                <span>News Every Minute!!</span>
                <span>{date}</span>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input ref={searchRef} type="text" name="search" required/>
                        <button type="submit">Search!</button>  
                    </div>
                </form> 
                <div className="country-wrapper">
                    You are in 
                <select name="country" onChange={onChangeCountry} defaultValue="IN">
                    {
                        Object.keys(countryList).map((o,i)=>(
                        <option key={i} value={o}>{countryList[o]}</option>
                        ))
                    }
                </select>
                </div>
                <a className={(activeLink===TOPSTORIES && 'active')||''} onClick={e=>handleClick(TOPSTORIES,e)} href="!#">Top Stories</a>
                <a className={(activeLink===ALLSTORIES && 'active')||''} onClick={e=>handleClick(ALLSTORIES,e)} href="!#">All</a>
           </header>)
} 

export default HeaderComponent;