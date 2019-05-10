import React, {Component} from 'react'
import 'antd/dist/antd.css';
import {Select,Input,Button,List} from 'antd'
import store from '../store/index'

const Option = Select.Option;

// const fruits = ['apple', 'banana'];
// const prices = {
//     apple: '2',
//     banana: '3',
// };

var count = ''

class OrderM extends Component{
    
    constructor(props){
        super(props)
        this.state = store.getState()
        console.log(this.state);
        // 监听store中数据的改变
        store.subscribe(this.storeChnage)
        this.deleItem = this.deleItem.bind(this)
        
    }

    // 监听方法
    storeChnage = () => {
        console.log('store changed');
        this.setState(store.getState())
      }

    //下拉框改变
      handleProvinceChange = (value) => {
          console.log(value);
          count = value
          document.getElementById('label1').innerHTML = this.state.prices[value]
          
      }

    //   输入框改变
    handleInputChange = (e) =>{
        const action = {
            type:'input_change',
            value: e.target.value
        }
        store.dispatch(action)
    }

    // 点击提交
    clickBtn = (e) => {
        const action = {
            type: 'btn_click',
            value: count
        }
        store.dispatch(action)
    }
    // 删除
    deleItem (index) {
        console.log(index);
        
        const action = {
            type: 'delete_item',
            value: index
        }
        store.dispatch(action)
    }

    render(){
        const {fruits,prices,inputValue,list} = this.state
        return(
            <div>
            <Select
            defaultValue={fruits[0]}
            style={{ width: 120 }}
            onChange={this.handleProvinceChange}
            >
            {fruits.map(fruit => <Option key={fruit}>{fruit}</Option>)}
            </Select>

            <Button id='label1'>{prices[fruits[0]]}</Button>
            <Input style={{width:'220px'}} 
                value={inputValue} onChange={this.handleInputChange}
                placeholder="Please input with a number" 
                allowClear />
            <Button type="primary" style={{marginLeft:'3px'}} onClick={this.clickBtn}>订购</Button>
            <div>
                <List style={{marginTop:'10px', width:'430px'}}
                bordered
                dataSource={list}
                renderItem={(item,index)=>(<List.Item onClick={() => {this.deleItem(index)}}>{item}</List.Item>)}></List>
            </div>
            
            </div>  
        )
    }
}

export default OrderM;

