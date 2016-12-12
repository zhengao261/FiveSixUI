import React from 'react';
import { render, shallow, mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import moment from 'moment';

import { Crumb } from '../../../components';

describe('Crumb', () => {
    // 基础测试
    // [{title: '骑士管理', link: ''},{title: '装备管理'}]
    it('Test prop: data', () => {
        const data = [{title: '骑士管理', link: 'www.baidu.com'},{title: '装备管理'}];

        const wrapper = mount(
            <Crumb 
                data = { data } />
        );
        expect(wrapper.find('.wl-crumb').find('span').at(0).text()).to.equal("当前位置：");
        expect(wrapper.find('[href="www.baidu.com"]').text()).to.equal("骑士管理");
        expect(wrapper.find('.ant-breadcrumb-separator')).to.have.length(2);
        expect(wrapper.find('.ant-breadcrumb-link')).to.have.length(2);
        expect(wrapper.find('.ant-breadcrumb-link').at(1).text()).to.equal("装备管理");
    });
});

