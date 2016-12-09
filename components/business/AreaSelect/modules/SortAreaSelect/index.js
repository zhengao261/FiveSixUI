/**
 * @todo
 */
import React, {Component, PropTypes} from 'react';

let SortAreaSelect = {};
const create = (config) => (comp) => class SortAreaSelect extends Component {
    render() {
        return <comp {...this.props}/>;
    }
};
SortAreaSelect.create = create;
export default SortAreaSelect;
