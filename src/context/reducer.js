function applicationReducer(state, action) {  
    switch (action.type) {
      case 'updateText':{
        return {
          ...state,
          searchText : action.value
        }
      }
      case 'setCountry':{
        return {
          ...state,
          country:action.value
        }
      }
      case 'updatefilter':{
        return {
          ...state,
          filter: {...action.value}
        }
      }
      case 'getNews':{
        return {
          ...state,
          loading:true
        }
      }
      case 'updateNews':{
        return {
          ...state,
          news:action.value,
          loading:false
        }
      }
      case 'selectedLink':{
        return {
          ...state,
          activeLink : action.value
        }
      }
      case 'updateTime':{
        return {
          ...state,
          date:action.value
        }
      }
      default: {
        throw new Error(`Unhandled action type: ${action.type}`)
      }
    }
}

export default applicationReducer;