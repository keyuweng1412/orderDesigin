import React, {Component} from 'react'
import 'antd/dist/antd.css';
import {Select,Input,Button,List} from 'antd'
// import store from '../store/index'
import {connect} from 'react-redux'

const Option = Select.Option;

var count = 0
var fruit = ''
var priceContent = ''
var inputV = 0


class OrderM extends Component{
    
    render(){
        const {models,text,inputValue,list,sum} = this.props
        // console.log(models);
        fruit = models[count].name;
        priceContent = text;
        inputV = inputValue;
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
            <Button type="primary" style={{marginLeft:'3px'}} onClick={this.props.clickBtn}>订购</Button>
            <div>
                <List style={{marginTop:'10px', width:'430px'}}
                bordered
                dataSource={list}
                renderItem={(item,index)=>(<List.Item onClick={() => {this.props.deleItem(index)}}>{item}</List.Item>)}></List>
            </div>
            <Button type='default' onClick={this.props.summation}>合计</Button>
            <Button>{sum}</Button>
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
        sum:state.sumReducer.sum
    }
}

const mapDispatchToProps = (dispatch) => {
        return {
            //下拉框改变
            handleFruitsChange(value){
                console.log(value);
                count = value
                const action = {
                    type: 'select_change',
                    value: count
                }
                dispatch(action)
                
            },
            //   输入框改变
            handleInputChange(e){
                const action = {
                    type:'input_change',
                    value: e.target.value
                }
                dispatch(action)
            },
            // 点击提交
            clickBtn(){
                const action = {
                    type: 'btn_click',
                    data:{fruit,priceContent,inputV}
                }
                dispatch(action)
            },
            // 删除
            deleItem (index) {
            console.log(index);
                const action = {
                    type: 'delete_item',
                    index: index
                }
                dispatch(action)
            },
            // 合计
            summation(){
                const action = {
                    type: 'btn_sum',
                    data:{priceContent,inputV}
                }
                dispatch(action)
            }


        }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OrderM);

