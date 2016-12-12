import React from 'react';
import { render,shallow,mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import moment from 'moment';

import { ImageModal } from '../../../components';

describe('ImageModal', () => {
    // 基础测试
    it('Test prop: src', () => {
        const wrapper = mount( < ImageModal src = 'http://yizhan.baidu.com/static/logisticsfrontend/images/download_195f873.png' >
            点击出图< /ImageModal>
        );
        expect(wrapper.find('.wl-imagemodal-con').text()).to.equal("点击出图");
        wrapper.find('.wl-imagemodal-con').simulate('click');

    });
    it('Test prop: onClose', () => {
        const onClose = sinon.spy();
        const wrapper = mount( < ImageModal src = 'http://yizhan.baidu.com/static/logisticsfrontend/images/download_195f873.png'
            onClose = {
                onClose
            } >
            点击出图 < /ImageModal>
        );
        wrapper.setState({
            show: true
        });
        wrapper.setState({
            show: false
        });
        expect(onClose).to.have.property('callCount', 1);
    });
    it('Test circle: onOpen', () => {
        const onOpen = sinon.spy();
        const wrapper = mount( < ImageModal src = 'http://yizhan.baidu.com/static/logisticsfrontend/images/download_195f873.png'
            onOpen = {
                onOpen
            } >
            点击出图 < /ImageModal>
        );
        wrapper.setState({
            show: true
        });
        expect(onOpen).to.have.property('callCount', 1);
    });
    it('Test state', () => {
        const wrapper = mount( < ImageModal src = 'http://yizhan.baidu.com/static/logisticsfrontend/images/download_195f873.png' >
            点击出图 < /ImageModal>
        );
        wrapper.setState({
            show: true,
            width: 400,
            deg: 90
        });
        expect(wrapper.find('img[src="http://yizhan.baidu.com/static/logisticsfrontend/images/sound_d165ad8.png"]')).to.have.length(1);
    });
});