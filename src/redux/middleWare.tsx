// import { showAlert } from "./actions"
// import { CREATE_POST } from "./types"

// const spam = ['fuck', 'suck']

// export function spamWordsMiddleWare({dispatch}) {
//     return function(next) {
//         return function (action) {
//             if(action.type === CREATE_POST) {
//                 const found = spam.filter(w => action.payload.title.includes(w))
//                 if(found.length) {
//                     return dispatch(showAlert('hhh'))
//                 }
//             }
//             return next(action)
//         }
//     }
// }
