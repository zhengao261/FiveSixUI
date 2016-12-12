/**
* @file AreaSelect 所属区域选择组件
* @author 谢天
* @version 0.0.1
* @todo antd form问题，尤其是初始化的时候
*/
import React, {Component, PropTypes} from 'react';
import Aoi from '../../components/Aoi';
import City from '../../components/City';
import Partner from '../../components/Partner';
import Team from '../../components/Team';
import {getData, getCascaderChildren} from '../../utils';
import {tplData} from '../../data';
import _ from 'lodash';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import lazyCache from 'react-lazy-cache';
/**
 * 组件属性申明
 *
 * @property {function} onChange
 * @property {object} value
 * @property {string} type
 * @property {array} data
 * @property {object} config
 */
const propTypes = {
    config: PropTypes.object,
    value: PropTypes.object,
    type: PropTypes.string,
    data: PropTypes.array,
    onChange: PropTypes.func
};
/**
 * 容器组件
 * @export
 * @class AreaSelect
 * @extends {React.Component}
 */
class AreaSelect extends Component {
    constructor(props) {
        super(props);
        this.handleChange = (e, k) => {
            let ret = {...this.props.value};
            getCascaderChildren(this.props.config, this.props.type, k).map(
                (i) => {
                    this.props.config[i].multiple && this.props.config[i].withAll ? ret[i] = _.map(getData(this.props.config, this.props.type, {...ret, [k]: e}, this.props.data || this.cache.tpldata, i), 'value') : ret[i] = '';
                }
            );
            ret[k] = e;
            this.props.onChange && this.props.onChange(ret);
        };
        /**
        * 级联方向 pure
        * @param {object} props
        * @return {array} element
        */
        this.adjustCascader = (props) => {
            let ret = [
                props.config.aoi.show
                ? <Aoi
                  {...props.config.aoi}
                  data={this.cache.aoi}
                  value={props.value.aoi}
                  onChange={this.handleChange}
                  />
                : null,
                props.config.partner.show
                ? <Partner
                  {...props.config.partner}
                  data={this.cache.partner}
                  value={props.value.partner}
                  onChange={this.handleChange}
                  />
                : null
            ];
            return props.type === 'forward' ? ret : ret.reverse();
        };
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    componentWillMount() {
        this.cache = lazyCache(this, {
            tpldata: {
                params: ['type'],
                fn: (a) => tplData(a)
            },
            team: {
                params: ['config', 'type', 'value', 'data'],
                fn: (a, b, c, d = this.cache.tpldata) => getData(a, b, c, d, 'team')
            },
            city: {
                params: ['config', 'type', 'value', 'data'],
                fn: (a, b, c, d = this.cache.tpldata) => getData(a, b, c, d, 'city')
            },
            aoi: {
                params: ['config', 'type', 'value', 'data'],
                fn: (a, b, c, d = this.cache.tpldata) => getData(a, b, c, d, 'aoi')
            },
            partner: {
                params: ['config', 'type', 'value', 'data'],
                fn: (a, b, c, d = this.cache.tpldata) => getData(a, b, c, d, 'partner')
            }
        });
    }
    componentWillReceiveProps(nextProps) {
        this.cache.componentWillReceiveProps(nextProps);
    }
    render() {
        return (
          <div style={{display: 'inline-block'}}>
            {this.props.config.team.show
                ? <Team
                  {...this.props.config.team}
                  data={this.cache.team}
                  value={this.props.value.team}
                  onChange={this.handleChange}
                  />
                : null
            }
            {this.props.config.city.show
                ? <City
                  {...this.props.config.city}
                  data={this.cache.city}
                  value={this.props.value.city}
                  onChange={this.handleChange}
                  />
                : null
            }
            {this.adjustCascader(this.props)}
          </div>
        );
    }
}

AreaSelect.propTypes = propTypes;

AreaSelect.defaultProps = {
    type: 'forward',
    value: {
        team: '',
        city: '',
        aoi: '',
        partner: ''
    }
};

export default AreaSelect;
