/**
* @file MultiTeamSelect 多物流方选择组件
* @author 谢天
* @version 0.0.1
*/
import React, {Component, PropTypes} from 'react';
import Aoi from '../../components/Aoi';
import City from '../../components/City';
import Partner from '../../components/Partner';
import Team from '../../components/Team';
import {getData, getCascaderChildren} from '../../utils';
import _ from 'lodash';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import lazyCache from 'react-lazy-cache';
import { getCookie, UrlData } from '../../data';
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
    onChange: PropTypes.func,
    updateDataAction: PropTypes.func
};
/**
 * 容器组件
 * @export
 * @class MultiTeamSelect
 * @extends {React.Component}
 */
class MultiTeamSelect extends Component {
    constructor(props) {
        super(props);
        this._data_ = {};
        this._value = '';
        this._key = '';
        /**
        * 转换team pure
        * @param {array} team
        * @return {array} team
        */
        this.transferTeam = (team) => {
            if (!_.isArray(team)) {
                console.warn('The Data should be Array of team, check your Data, or use window._INITDATA_.slist');
                return [];
            }
            return _.compact(team.map(
              (item) => {
                  if (item.sid != 2000000) {
                      return _.mapKeys(item, (v, k) => {
                          if (k === 'sid') {
                              return 'value';
                          }
                          if (k === 'sname') {
                              return 'text';
                          }
                          return k;
                      });
                  }
              }));
        };
        this.handleChange = (e, k) => {
            let ret = _.cloneDeep(this.props.value);
            if (_.isArray(e) && e.length !== 1 && k === 'team') {
                getCascaderChildren(this.props.config, this.props.type, k).map(i => ret[i] = '');
                ret[k] = e;
                this.props.onChange && this.props.onChange(ret);
            } else if (this._data_[e[0]] && k === 'team') {
                getCascaderChildren(this.props.config, this.props.type, k).map(
                  (i) => {
                      this.props.config[i].multiple && this.props.config[i].withAll ? ret[i] = _.map(getData(this.props.config, this.props.type, {...ret, [k]: e}, this._data_[e[0]], i), 'value') : ret[i] = '';
                  }
                );
                ret[k] = e;
                this.props.onChange && this.props.onChange(ret);
            } else if (k === 'team') {
                this._value = e;
                this._key = k;
                this.props.updateDataAction && this.props.updateDataAction(e);
            } else {
                let ret = {...this.props.value};
                getCascaderChildren(this.props.config, this.props.type, k).map(
                (i) => {
                    this.props.config[i].multiple && this.props.config[i].withAll ? ret[i] = _.map(getData(this.props.config, this.props.type, {...ret, [k]: e}, this.cache.UrlData, i), 'value') : ret[i] = '';
                }
            );
                ret[k] = e;
                this.props.onChange && this.props.onChange(ret);
            }
        };
        /**
        * 级联方向 pure
        * @param {object} props
        * @return {array} element
        */
        this.adjustCascader = (props) => {
            let ret = [
                props.config.aoi.show && _.isArray(this.props.value.team) && this.props.value.team.length <= 1
                ? <Aoi
                  {...props.config.aoi}
                  data={this.cache.aoi}
                  value={props.value.aoi}
                  onChange={this.handleChange}
                  />
                : null,
                props.config.partner.show && _.isArray(this.props.value.team) && this.props.value.team.length <= 1
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
            team: {
                params: ['teamList'],
                fn: (a = window._INITDATA_.slist) => this.transferTeam(a)
            },
            UrlData: {
                params: ['data', 'type'],
                fn: UrlData
            },
            city: {
                params: ['config', 'type', 'value', 'UrlData'],
                fn: (a, b, c, d) => getData(a, b, c, d, 'city')
            },
            aoi: {
                params: ['config', 'type', 'value', 'UrlData'],
                fn: (a, b, c, d) => getData(a, b, c, d, 'aoi')
            },
            partner: {
                params: ['config', 'type', 'value', 'UrlData'],
                fn: (a, b, c, d) => getData(a, b, c, d, 'partner')
            }
        });
    }
    componentWillReceiveProps(nextProps) {
        this.cache.componentWillReceiveProps(nextProps);
        if (!_.isEqual(this.props.data, nextProps.data)) {
            let ret = _.cloneDeep(nextProps.value);
            let data = UrlData(nextProps.data, nextProps.type);
            getCascaderChildren(nextProps.config, nextProps.type, this._key).map(
                  (i) => {
                      nextProps.config[i].multiple && nextProps.config[i].withAll ? ret[i] = _.map(getData(nextProps.config, nextProps.type, {...ret, [this._key]: this._value}, data, i), 'value') : ret[i] = '';
                  }
            );
            ret[this._key] = this._value;
            nextProps.onChange && nextProps.onChange(ret);
            this._data_[this._value[0]] = data;
        }
    }
    render() {
        return (
          <div style={{display: 'inline-block'}}>
            {this.props.config.team.show
                ? <Team
                  {...this.props.config.team}
                  data={this.cache.team}
                  value={this.props.value.team || parseInt(getCookie('waimai_logistics_spt'), 10)}
                  onChange={this.handleChange}
                  multiple
                  />
                : null
            }
            {this.props.config.city.show && _.isArray(this.props.value.team) && this.props.value.team.length <= 1
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

MultiTeamSelect.propTypes = propTypes;

MultiTeamSelect.defaultProps = {
    type: 'forward'
};

export default MultiTeamSelect;
