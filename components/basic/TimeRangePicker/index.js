/**
 * @file 复合组件，时间段选择器组件
 *       modified by lihuan<lihuan@iwaimai.baidu.com>
 * 
 * @author lishaoyi <lishaoyi@iwaimai.baidu.com>
 * @version 0.0.1
 * 
 */
import React, { PropTypes } from 'react';
import { TimePicker } from 'antd';
import moment from 'moment';
import './styles.less';

/**
 * 组件属性申明
 * @property {array} value 起止时间 {strat:Moment, end:Moment}
 * @property {string} separator 起止时间间隔号，默认为'至'
 * @property {function} onChange 时间change事件 ［一个参数，为object］
 * @property {bool} 是否是按序的 默认为true
 * @property {object} startConfig antd TimePicker的扩展属性支持
 * @property {object} endConfig antd TimePicker的扩展属性支持
 */
const propTypes = {
    value: PropTypes.array,
    separator:PropTypes.string,
    onChange: PropTypes.func,
    ordered: PropTypes.bool,
    startConfig: PropTypes.object,
    endConfig: PropTypes.object
}

/**
 * 主组件
 * 
 * @export
 * @class TimeRangePicker
 * @extends {React.Component}
 */
export default class TimeRangePicker extends React.Component {
    /**
     * Creates an instance of TimeRangePicker.
     * 
     * @param {any} props
     * 
     * @memberOf TimeRangePicker
     */
	constructor(props) {
		super(props);
	}
    handleChange(type, value) {
        const { onChange } = this.props;
        onChange && onChange({
            start: this.start,
            end: this.end,
            [type]: value
        })
    }
    disabledHours(min, max) {
        const hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
        if (min) {
            let minHour = min.hour();
            return hours.splice(0, minHour);
        }
        if (max) {
            let maxHour = max.hour();
            return hours.splice(maxHour + 1);
        }
        return [];
    }

    disabledMinutes(hour, min, max) {
        const minutes = Array.from({length:60}, (v, k) => k);
        if (min) {
            let minHour = min.hour();
            let minMinute = min.minute();
            return minHour == hour ? minutes.splice(0, minMinute) : [];
        }
        if (max) {
            let maxHour = max.hour();
            let maxMinute = max.minute();
            return maxHour == hour ? minutes.splice(maxMinute + 1) : [];
        }
        return [];
    }

    disabledSeconds(hour, minute, min, max) {
        const second = Array.from({length:60}, (v, k) => k);
        if (min) {
            let minHour = min.hour();
            let minMinute = min.minute();
            let minSecond = min.second();
            return (minHour == hour && minMinute == minute) ? second.splice(0, minSecond) : [];
        }
        if (max) {
            let maxHour = max.hour();
            let maxMinute = max.minute();
            let maxSecond = max.second();
            return (maxHour == hour && maxMinute == minute) ? second.splice(0, maxSecond) : [];
        }
        return [];
    }

	render() {
        const { value, separator, startConfig, endConfig, ordered } = this.props
        this.start = value ? value.start : moment();
        this.end = value ? value.end : moment();

		return  (
            <div className='wl-timerangepicker-wrapper'>
                <TimePicker 
                    className = "wl-timerangepicker-start-time"
                    disabledHours = { ordered ? () => this.disabledHours(null, this.end) : () => [] }
                    disabledMinutes = { ordered ? (hour) => this.disabledMinutes(hour, null, this.end) : () => [] }
                    disabledSeconds = { ordered ? (hour, minute) => this.disabledSeconds(hour, minute, null, this.end) : () => [] }
                    value = { this.start }
                    onChange = { (start) => this.handleChange('start', start) }
                    { ...startConfig }
                    />
                    { separator || ' 至 ' }
                <TimePicker 
                    className = "wl-timerangepicker-end-time"
                    value = { this.end }
                    disabledHours = { ordered ? () => this.disabledHours(this.start) : () => [] }
                    disabledMinutes = { ordered ? (hour) => this.disabledMinutes(hour, this.start) : () => [] }
                    disabledSeconds = { ordered ? (hour, minute) => this.disabledSeconds(hour, minute, this.start) : () => []}
                    onChange = { (end) => this.handleChange('end', end) }
                    { ...endConfig }
                    />
            </div>
        )
	}
}