import { combineReducers } from 'redux'
import {SELECT_CHANGE,INPUT_CHANGE,BTN_CLICK,DELETE_ITEM} from '../actionTypes/actionTypes'
const modelState = {
    models:[{id:'0',name:'苹果',price:11},
           {id:'1',name:'香蕉',price:12},
           {id:'2',name:'草莓',price:13}
          ],
    text:'11'
}

const listState = {
    inputValue:'',
    listDic:{fruitName:'',unitPrice: 0,count:0,tatalPrice:0},
    list: [],
    sum:0
}


export const modelReducer=(state=modelState, action) => {
    switch(action.type){
        case SELECT_CHANGE:
        return {...state, text: state.models[action.value].price}
        default:
        return state
    }

}


function listReducer (state = listState, action){
    switch(action.type){
        case INPUT_CHANGE:{
            return {...state, inputValue:action.value}
        }
        
        case BTN_CLICK:{
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
            // const {fruit, priceContent,inputV} = action.data
            newState.listDic.fruitName = action.name
            newState.listDic.unitPrice = action.price
            newState.listDic.count = action.count
            newState.listDic.tatalPrice = action.total
            // const str = '商品名:' + fruit + ',' + 
            //             '单价:' + priceContent + ',' + 
            //             '数量:' + inputV + ',' + 
            //             '总价:' + priceContent*inputV
            newState.list.push(newState.listDic)
            // newState.sum += priceContent*inputV
            newState.sum += action.total
            newState.inputValue = ''
            return newState
        }
        case DELETE_ITEM:{
            const newState = JSON.parse(JSON.stringify(state))
            if(window.confirm('你确定删除吗？')){
                newState.list.splice(action.index, 1)
                
                newState.sum -= action.list[action.index].tatalPrice
                
            }
            return newState
        }
        default:
        return state
    }
}


export default combineReducers({
    modelReducer,
    listReducer,
    
})