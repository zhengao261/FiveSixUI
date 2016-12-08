import React, { Component, PropTypes} from 'react';
import { Crumb, ImageModal, SearchPeriod, Show } from 'fivesix';
import { Button } from 'antd';

export default class Homepage extends Component { 
    render() {
        return (
            <div>
                <Crumb
                    data = {[{title: '骑士管理', link: 'www.baidu.com'},{title: '装备管理'}]}
                />
                <ImageModal 
                    src = 'http://yizhan.baidu.com/static/logisticsfrontend/images/sound_d165ad8.png'
                >
                    <img src="http://yizhan.baidu.com/static/logisticsfrontend/images/sound_d165ad8.png" />
                </ImageModal>
                <ImageModal 
                    src = 'http://yizhan.baidu.com/static/logisticsfrontend/images/download_195f873.png'
                >
                    点我点我
                </ImageModal>
                <SearchPeriod/>
                <Show
                    isShow = { false }
                    isInline = { true }
                    isDelay = { false }
                >
                    <Button>测试</Button>
                </Show>
                    <Button>测试</Button>
                
            </div>
        )
        
    }
}