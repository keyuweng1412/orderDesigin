const defaultState ={
    fruits:['苹果', '香蕉' , '草莓'],
    prices:{苹果:'2', 香蕉:'3',草莓:'4'},
    inputValue:'',
    list:[]
}
export default (state=defaultState, action) => {
    if(action.type === 'input_change'){
        const newState = JSON.parse(JSON.stringify(state))
        newState.inputValue = action.value
        return newState
    }
    if(action.type === 'btn_click'){
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
        const str = '商品名:' + (action.value?action.value:'苹果') + ',' +
                    '单价:'+ (action.value?newState.prices[action.value]:newState.prices['苹果']) + ',' +
                    '数量:' + newState.inputValue + ',' +
                    '总价:' + newState.prices[action.value?action.value:'苹果']*newState.inputValue
        newState.list.push(str)
        newState.inputValue = ''
        return newState
    }

    if(action.type === 'delete_item'){
        const newState = JSON.parse(JSON.stringify(state))
        if(window.confirm('你确定删除吗？')){
            newState.list.splice(action.value, 1)
        }
        return newState
    }
    return state;
}