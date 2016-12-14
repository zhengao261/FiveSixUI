/**
 * @file 用户密码输入校验组件 
 *       特性：明文密码输入控件；
 *            当input值为******时，点击密码，密码值清空；
 *       modified by zhangcongfeng<zhangcongfeng@iwaimai.baidu.com>
 *       modified by lichun<lichun@iwaimai.baidu.com> 20161213
 * 
 * @author lichun <lichun@iwaimai.baidu.com>
 * @version 0.0.1
 * 
 */
import React, { PropTypes } from 'react'
import { Input } from 'antd';

/**
 * 组件属性申明
 */
const propTypes = {
}

/**
 * 主组件
 * 
 * @export
 * @class UserPassWord
 * @extends {React.Component}
 */
export default class UserPassWord extends React.Component {
    render() {
        const { value, onChange, ...others } = this.props;

        return <Input
                size="large"
                value = { value }
                onChange = { onChange }
                onFocus = {(e) => {
                    if (e && e.currentTarget) {
                        let value = e.currentTarget.value;
                        if (value === PASSWORD_MASK) {
                            e.currentTarget.value = '';
                        }
                    }
                }}
                { ...others }
            />
    }
}
