import React, { PropTypes } from 'react';
import { Icon, InputNumber, Input } from 'antd';

import './styles.less'

/**
 * 组件属性申明
 */
const propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  items: PropTypes.array.isRequired,
}

/**
 * 里程计价组件
 */
export default class MultiConsequentInputGroup extends React.Component {
  constructor(props) {
    super(props)
  }
  propTypes: propTypes
  render() {
    return 
  }
}
