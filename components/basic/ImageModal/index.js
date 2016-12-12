/**
 * @file 复合组件，图片查看器，可放大、缩小、顺时针和逆时针旋转
 *       modified by lichun<lichun@iwaimai.baidu.com> 修改为使用包裹子元素的方式，修改旋转主体；
 * @author lihuan <lihuan@iwaimai.baidu.com>
 * @version 0.1.0
 */
import React, { PropTypes } from 'react';
import { Modal, Button, Checkbox, message } from 'antd';
import './styles.less';

/**
 * 组件属性申明
 * 
 * @property {string} src 图片跳转链接
 * @property {bool} show 是否显示组件， default = false
 * @property {func} onClose 关闭查看器组件事件后钩子，会传入图片src值
 * @property {func} onOpen 打开查看器组件事件后钩子，会传入图片src值
 */
const propTypes = {
    src: PropTypes.string,
    show: PropTypes.bool,
    onClose: PropTypes.func,
    onOpen: PropTypes.func
};

const ButtonGroup = Button.Group;
const DEFAULT_WIDTH = 300, MAX_WIDTH = 1000, ZOOM_FACTOR = 0.2;
/**
 * 主组件
 * 
 * @export
 * @class ImageModal
 * @extends {React.Component}
 * 
 */
export default class ImageModal extends React.Component {
    /**
     * Creates an instance of ImageModal.
     * 
     * @param {any} props
     * 
     * @memberOf ImageModal
     */
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            width: DEFAULT_WIDTH,
            deg: 0
        }
    }

    /**
     * 组件属性申明
     * 
     * @type {propTypes}
     * @memberOf ImageModal
     */
    propTypes: propTypes

    /**
     * 缩小图片
     * 
     * @memberOf ImageModal
     */
    zoominImg() {
        const { width, deg } = this.state;
        if (width <= DEFAULT_WIDTH) {
            return;
        } else {
            this.setState({
                width: width * (1 - ZOOM_FACTOR)
            });
        }
    }

    /**
     * 放大图片
     * 
     * @memberOf ImageModal
     */
    zoomoutImg() {
        const { width, deg } = this.state;
        if (width >= MAX_WIDTH) {
            return;
        } else {
            this.setState({
                width: width * (1 + ZOOM_FACTOR)
            });
        }
    }

    /**
     * 逆时针旋转图片
     * 
     * @memberOf ImageModal
     */
    counterclockImg() {
        const { width, deg } = this.state;
        this.setState({
            deg: (deg - 90 + 360) % 360
        })
    }

    /**
     * 顺时针旋转图片
     * 
     * @memberOf ImageModal
     */
    clockwiseImg() {
        const { width, deg } = this.state;
        this.setState({
            deg: (deg + 90) % 360
        })
    }

    handleClose(onClose) {
        this.setState({
            show: false
        })
        onClose && onClose(this.props.src);
    }

    handleOpen(onOpen) {
        this.setState({
            show: true
        })
        onOpen && onOpen(this.props.src);
    }

    render() {
        const { show, width, deg } = this.state;
        const { src, onOpen, onClose } = this.props;
        const srcStr = src || (this.props.children.props ? this.props.children.props.src : '');
        return  (
            <div className="wl-imagemodal-wrapper">
                <div
                    className = "wl-imagemodal-con"
                    onClick = {() => this.handleOpen(onOpen)}
                >
                    { this.props.children }
                </div>
                { show ? (
                    <Modal visible={ show || false } onCancel={ () => this.handleClose(onClose) }
                        footer={ null }
                        width={ width+32 }
                    >
                        
                        <div style={ { width } }>
                            <img 
                                src={ srcStr } 
                                style={{
                                    width: width,
                                    transform: 'rotate('+deg+'deg)'
                                }}
                            />
                        </div>
                    </Modal>
                ) : ''}
                { show ? (
                    <div style={{ position: 'fixed', left: 100, top: 70, zIndex: 9999}}>
                        <ButtonGroup style={{left: '50%', marginLeft: -110}}>
                            <Button onClick={ () => this.zoominImg() } >缩小</Button>
                            <Button onClick={ () => this.zoomoutImg() } >放大</Button>
                            <Button onClick={ () => this.counterclockImg() } >逆时针</Button>
                            <Button onClick={ () => this.clockwiseImg()} >顺时针</Button>
                        </ButtonGroup>
                    </div>
                ) : ''}
            </div>
        )
    }
}