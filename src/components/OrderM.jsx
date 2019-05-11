import React, {Component} from 'react'
import 'antd/dist/antd.css';
import {Select,Input,Button,List} from 'antd'

import {connect} from 'react-redux'
import {SELECT_CHANGE,INPUT_CHANGE,BTN_CLICK,DELETE_ITEM} from '../actionTypes/actionTypes'
const Option = Select.Option;

var count = 0
// var fruit = ''
// var priceContent = ''
// var inputV = 0


class OrderM extends Component{
    
    render(){
        const {models,text,inputValue,list,sum} = this.props
        // fruit = models[count].name;
        // priceContent = text;
        // inputV = inputValue;
        return(
            <div>
            <Select
            defaultValue={models[0].name}
            style={{ width: 120 }}
            onChange={this.props.handleFruitsChange}
            >
            {models.map(model => <Option key={model.id}>{model.name}</Option>)}
            </Select>

            <Button>{text}</Button>
            <Input style={{width:'220px'}} 
                value={inputValue} onChange={this.props.handleInputChange}
                placeholder="Please input with a number" 
                allowClear />
            <Button type="primary" style={{marginLeft:'3px'}} onClick={()=>{this.props.clickBtn(models[count].name, text, inputValue)}}>订购</Button>
            <div>
                <List style={{marginTop:'10px', width:'430px'}}
                bordered
                dataSource={list}
                renderItem={(item,index)=>(
                <List.Item onClick={() => {this.props.deleItem(index,list)}}>
                {item.fruitName + "--" + item.unitPrice + "--" + item.count + "--" + item.tatalPrice}
                </List.Item>)}>
                </List>
            </div>
            
            <Button>{'合计'+ sum}</Button>
            </div>  
        )
    }
}
const mapStateToProps = (state) => {
    return {
        models: state.modelReducer.models,
        text: state.modelReducer.text,
        inputValue: state.listReducer.inputValue,
        list: state.listReducer.list,
        sum:state.listReducer.sum
    }
}

const mapDispatchToProps = (dispatch) => {
        return {
            //下拉框改变
            handleFruitsChange(value){
                console.log(value);
                count = value
                const action = {
                    type: SELECT_CHANGE,
                    value: count
                }
                dispatch(action)
                
            },
            //   输入框改变
            handleInputChange(e){
                const action = {
                    type:INPUT_CHANGE,
                    value: e.target.value
                }
                dispatch(action)
            },
            // 点击提交
            clickBtn(name,price,count){
                const action = {
                    type: BTN_CLICK,
                    name:name,
                    price:price,
                    count:count,
                    total:price*count
                    // data:{fruit,priceContent,inputV}
                }
                dispatch(action)
            },
            // 删除
            deleItem (index,list) {
            console.log(index);
                const action = {
                    type: DELETE_ITEM,
                    index: index,
                    list:list
                }
                dispatch(action)
            },



        }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OrderM);

