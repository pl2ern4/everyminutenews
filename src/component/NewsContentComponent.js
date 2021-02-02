
const NewsContentComponent = ({news})=>{
    return (<>
        {news && news.map((obj,key)=>(
            <div key={`news-${key}`} className="card">
                <a target="_blank" rel="noopener noreferrer" href={obj.url}>
                <div >
                    <h3>{obj.title}</h3>
                    <p>{obj.description}</p>
                    <p>
                        {(obj.author && (<span>Pubished by:{obj.author}</span>))||null}
                        <span>Published on :{(new Date(obj.publishedAt)).toDateString()}</span>
                    </p>
                </div>
                </a>
            </div>
        ))}
    </>)
}

export default NewsContentComponent;