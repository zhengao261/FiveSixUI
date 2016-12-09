import _ from 'lodash';
import I from 'immutable';

/**
 * @export {object} 工具方法
 */
const Utils = {};

/**
 * 取某个值下的children，如果存在的话 pure
 * @param {string} value
 * @param {array} data
 * @return {array} array
 */
const getSingleChildren = (value, data) => {
    if (!_.isArray(data) || data.length === 0) {
        return {
            children: []
        };
    }
    let $$data = I.Seq(data);
    let ret = $$data.find((v) => v.value === value);
    if (typeof ret === 'undefined') {
        let next = [];
        $$data.forEach(
            (item) => {
                if (item.children) {
                    next = next.concat(item.children);
                }
            }
        );
        return getSingleChildren(value, next);
    }
    return ret;
};
/**
 * 取某个值下的多个children，如果存在的话 pure
 * @param {string} value
 * @param {array} data
 * @return {array} array
 */
const getMultiChildren = (value, data) => {
    let ret = [];
    if (_.isArray(value)) {
        I.Seq(value).forEach(
            (item) => {
                ret = ret.concat(getSingleChildren(item, data).children);
            }
        );
        return _.uniqBy(ret, 'value');
    } else if (value.indexOf(',') !== -1) {
        I.Seq(value.split(',')).forEach(
            (item) => {
                ret = ret.concat(getSingleChildren(item, data).children);
            }
        );
        return _.uniqBy(ret, 'value');
    }
    return getSingleChildren(value, data).children;
};
/**
 * 组合children pure
 * @param {string} data
 * @return {array} data
 */
const concatChildren = (data) => {
    let ret = I.Seq();
    I.Seq(data).forEach(
        item => {
            if (item.children) {
                ret = ret.concat(item.children);
            }
        }
    );
    return _.uniqBy(ret.toJS(), 'value');
};
/**
 * 根据config取级联方向 pure
 * @param {object} config
 * @param {string} cascader
 * @return {array} now
 */
const getCascader = (config, cascader) => {
    let now = [];
    for (let i of Object.keys(config)) {
        if (config[i].show) {
            now.push(i);
        }
    }
    if (cascader !== 'forward' && now.indexOf('aoi') !== -1) {
        now.splice(now.indexOf('aoi'), 1);
        now.push('aoi');
    }
    return now;
};
/**
 * 根据config取跳跃值 pure
 * @param {object} config
 * @param {string} cascader
 * @param {string} type
 * @return {number} skip
 */
const getSkip = (config, cascader, type) => {
    let init = cascader === 'forward' ? ['team', 'city', 'aoi', 'partner'] : ['team', 'city', 'partner', 'aoi'];
    let now = getCascader(config, cascader);
    let nowPa = now.indexOf(type) - 1 < 0 ? type : now[now.indexOf(type) - 1];
    let initPa = init.indexOf(type) - 1 < 0 ? type : init[init.indexOf(type) - 1];
    return nowPa !== initPa ? init.indexOf(type) - now.indexOf(type) : 0;
};
/**
 * 取options data pure
 * @param {object} config
 * @param {string} cascader
 * @param {string} value
 * @param {array} data
 * @param {string} type
 * @return {array} data
 */
Utils.getData = (config, cascader, value, data, type) => {
    let now = getCascader(config, cascader);
    if (now.indexOf(type) !== -1) {
        let ret = now.indexOf(type) - 1 < 0 ? data : getMultiChildren(value[now[now.indexOf(type) - 1]], data);
        for (let i = 0; i < getSkip(config, cascader, type); i++) {
            ret = concatChildren(ret);
        }
        return ret;
    }
    return [];
};
/**
 * 取孩子组件
 * @param {object} config
 * @param {string} cascader
 * @param {string} type
 * @return {string} children type
 */
Utils.getCascaderChildren = (config, cascader, type) => {
    let ret = getCascader(config, cascader);
    return ret.splice(ret.indexOf(type));
};

export default Utils;
