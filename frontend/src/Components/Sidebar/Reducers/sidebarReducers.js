import { SIDEBAR_ACTIONS } from "../Actions/sidebarActions";

const intialState=()=>({
    open:false
})

export default(state=intialState(),action)=>{
    switch (action.type) {
        case SIDEBAR_ACTIONS.SIDEBAR_OPEN:{
            return{
                ...state
            }
        }
            
         case SIDEBAR_ACTIONS.SIDEBAR_CLOSE:{
            return{
                ...state
            }
         }

         default:
            return state
    }
}