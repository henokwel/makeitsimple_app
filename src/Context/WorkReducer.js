
// import { useContext } from "react";
// import { ContextProvider } from "./MyContext";

// const { setup } = useContext(ContextProvider)



// Get User data, use it as default state
//  When a mini task is done, mark it as done
// If not done, set it as next to work on

export const workReducer = (state, action) => {

    switch (action.type) {
        case "userData": {
            // console.log("Work Reducer Run");
            return state = action.payload
        }
            break;
        case "done_task": {
            // get task []
            // filter done mini-task
            // saved task[] - done mini-task

            return state = {
                ...state,
                task_paritions: [...action.payload]
            }
        }
            break;
        case "reset": {
            return state = action.payload
        }
            break

        default:
            return state
            break;
    }

}