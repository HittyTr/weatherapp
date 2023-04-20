export const  locationReducer = ( state , action ) => {
        switch (action.type) {
            case  'SET_LOCATION' :
                return {...state,location:action.payload};
            case  'SET_WEATHER' :
                return {...state,weather:action.payload};
            case  'SET_FORECAST' :
                return {...state,forecast:action.payload};
            default :
                return state ;
        }
    }