/**
* @file City 城市组件
* @author 谢天
* @version 0.0.1
*/
import React, {Component, PropTypes} from 'react';
import { Select } from '../../../basic/Select';

/**
 * 组件属性申明
 *
 * @property {function} onChange
 * @property {(string|array)} value
 * @property {bool} multiple
 * @property {bool} showSearch
 * @property {bool} withAll
 * @property {array} data
 * @property {bool} showLable
 */
const propTypes = {
    onChange: PropTypes.func,
    multiple: PropTypes.bool,
    showSearch: PropTypes.bool,
    withAll: PropTypes.bool,
    data: PropTypes.array,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    showLable: PropTypes.bool
};
/**
 * 展示组件
 * @export
 * @class City
 * @extends {React.Component}
 */
class City extends Component {
    constructor(props) {
        super(props);
        this.handleChange = (v) => {
            this.props.onChange && this.props.onChange(v, 'city');
        };
    }
    render() {
        return (
          <div style={{display: 'inline-block'}}>
            <div style={{display: 'inline-block', marginLeft: '5px', marginRight: '5px', fontSize: '12px'}}>{this.props.showLable ? '城市：' : ''}</div>
            <Select
              multiple={this.props.multiple}
              showSearch={this.props.showSearch}
              showAll={this.props.withAll}
              data={_.map(this.props.data, item => _.pickBy(item, v => !_.isArray(v)))}
              onChange={this.handleChange}
              value={this.props.value}
            />
          </div>
        );
    }
}

City.propTypes = propTypes;

export default City;
