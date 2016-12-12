/**
 * 此页面主要用于测试组件在antd的form中的使用，包括get&set
 */
import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import { TimeRangePicker, AreaSelect } from 'fivesix';
import { Form, Button } from 'antd';

const FormItem = Form.Item;

class TestForm extends Component {
    handleSubmit() {
        let result = this.props.form.getFieldsValue();
        console.log(result);
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
          <div style={{ marginLeft: 30, marginTop: 30 }}>
            <Form horizontal>
              <FormItem
                label="生成时间"
              >
                {getFieldDecorator('timePicker', {
                    initialValue: { start: moment().startOf('day'), end: moment() }
                })(
                  <TimeRangePicker
                    ordered={false}
                  />
                            )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('areaSelect', {
                    initialValue: {
                        team: '',
                        aoi: [],
                        partner: []
                    }
                })(
                  <AreaSelect.AreaSelect
                    config={{
                        team: {
                            show: true,
                            showSearch: true
                        },
                        city: {
                            show: false,
                            multiple: false
                        },
                        aoi: {
                            show: true,
                            multiple: true,
                            withAll: true,
                            showLable: true
                        },
                        partner: {
                            show: true,
                            showtext: true,
                            multiple: true,
                            withAll: true,
                            showLable: true
                        }
                    }}
                  />)}
              </FormItem>
              <FormItem>
                <Button onClick={(event) => this.handleSubmit(event)}>提交</Button>
              </FormItem>
            </Form>
          </div>
        );
    }
}
export default Form.create()(TestForm);
