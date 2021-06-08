

export const setupReducer = (state, action) => {

    switch (action.type) {
        case "task": {
            return state = {
                taskName: action.payload.title,
                taskGoal: action.payload.goal,
                taskID: action.payload.id
            }
        }
            break;
        case "task_parition": {
            return state = {
                ...state,
                task_paritions: [...action.payload]
            }
        }
            break;
        case "time_scope": {
            return state = {
                ...state,
                time_scope: action.payload
            }
        }

        default:
            return state
            break;
    }

}