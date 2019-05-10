import { combineReducers } from 'redux'

const modelState = {
    models:[{id:'0',name:'苹果',price:11},
           {id:'1',name:'香蕉',price:12},
           {id:'2',name:'草莓',price:13}
          ],
    text:'11'
}

const listState = {
    inputValue:'',
    list: []
}

const sumState = {
    sum: 0
}

export const modelReducer=(state=modelState, action) => {
    switch(action.type){
        case 'select_change':
        return {...state, text: state.models[action.value].price}
        default:
        return state
    }

}


function listReducer (state = listState, action){
    switch(action.type){
        case 'input_change':{
            const newState = JSON.parse(JSON.stringify(state))
            newState.inputValue = action.value
            return newState
        }
        
        case 'btn_click':{
            const newState = JSON.parse(JSON.stringify(state))
            if(!newState.inputValue){
                alert('数量不能为空')
                return newState
            }
            if(isNaN(newState.inputValue)){
                alert('请输入数字')
                newState.inputValue = ''
                return newState
            }
            const {fruit, priceContent,inputV} = action.data
            const str = '商品名:' + fruit + ',' + 
                        '单价:' + priceContent + ',' + 
                        '数量:' + inputV + ',' + 
                        '总价:' + priceContent*inputV
            newState.list.push(str)

            // newState.inputValue = ''
            return newState
        }
        case 'delete_item':{
            const newState = JSON.parse(JSON.stringify(state))
            if(window.confirm('你确定删除吗？')){
                newState.list.splice(action.index, 1)
            }
            return newState
        }
        default:
        return state
    }
}

function sumReducer(state=sumState, action){
    switch(action.type){
        case 'btn_sum':
        const {priceContent, inputV} = action.data
        return {...state, sum:state.sum += priceContent*inputV}
        default:
        return state
    }
}

export default combineReducers({
    modelReducer,
    listReducer,
    sumReducer
})