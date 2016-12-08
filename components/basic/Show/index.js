/**
* @file 是否展示组件
*       modified by wangjuan01 <wangjuan01@iwaimai.baidu.com>
* 
* @author zhangyinhui <498821924@qq.com>
* @version 0.0.1
* 
*/
import React, { PropTypes } from 'react';
import './styles.less';

/**
 * 组件属性申明
 *
 * @property {bool} isShow 是否显示，默认值为true
 * @property {bool} isDelay 是否延迟，默认false
 * @property {bool} isInline 是否是行内元素，默认为false
 */
const propTypes = {
      isShow: PropTypes.bool,
      isDelay: PropTypes.bool,
      isInline: PropTypes.bool
}

/**
 * 主组件
 * 
 * @export
 * @class Show
 * @extends {React.Component}
 */
export default class Show extends React.Component {
    static defaultProps = {
        isShow: true,
        isDelay: false,
        isInline: false
    };

    constructor(props) {
        super(props);
    }

    render() {
        const { isShow, isDelay, isInline } = this.props;

        /**
	     * delay逻辑判断说明
	     * 
	     * delay为true时，isShow为true返回该组件，false时返回null，即消除该dom
	     * delay为false时，isShow为true返回该组件，false时更改display为none
	     */
	     
        return (
        	<div 
        		style = {{ display: isShow === false ? 'none' : ( isInline ? 'inline-block' : 'block' ) }} 
    			className = 'wl-show-animated wl-show-slideInUp'
    		>
	            { (isDelay && isShow === false) ? '' : this.props.children }
	        </div>
	    );
    }
}
