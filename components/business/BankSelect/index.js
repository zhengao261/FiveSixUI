/**
 * @file 银行选择组件
 *      modified by zhangmin01 <zhangmin01@iwaimai.baidu.com>
 * @author lichun <lichun@iwaimai.baidu.com>
 * @version 0.0.1
 */
import React, {PropTypes} from 'react';
import {Select} from 'antd';
import {BANK_OPTIONS} from './constant';
import _ from 'lodash'

/**
 * 组件属性申明
 * @property {string} value
 * @property {function} onChange 
 */
const propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};
const Option = Select.Option;

/**
 * 表单项--银行
 * @class
 * @extends ReactComponent
 */
export default class BankSelect extends React.Component {
    constructor(props) {
        super(props)
    }

    propTypes: propTypes

    /**
     * 创建选择器的option pure
     *
     * @param {array} arr
     * @return {array} option
     */
    _createOptionsFromArray(arr) {
        let options = arr.map(item => (
            <Option value={item} key={item}>{item}</Option>
        ))
        return options;
    }

    _getOptions () {
        const {isSelectAllOptions} = this.props;
        let options = this._createOptionsFromArray(BANK_OPTIONS);
        if (isSelectAllOptions) {
            options.unshift(<Option value=""  key="all">全部</Option>);
        }
        return options;
    }

    render() {
        return (
            <Select
                { ...this.props }
            >
                {this._getOptions()}
            </Select>
        )
    }
}
