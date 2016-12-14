/**
 * 此页面主要用于测试组件在antd的form中的使用，包括get&set
 */
import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import { TimeRangePicker, UserPassWordInput, BankSelect, verify } from 'fivesix';

import { Form, Button, Input } from 'antd';

const FormItem = Form.Item;

class TestForm extends Component {
    handleSubmit() {
        let result = this.props.form.getFieldsValue();
        console.log(result);
        console.log(verify.formfieldsValidate(this.props.form, (msg) => console.log(msg)));
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
                {getFieldDecorator('password', {
                  rules : verify.setRules(['REQUIRED', 'USER_NAME'])
                })(
                  <Input />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('bank', {
                  rules : verify.setRules(['REQUIRED'])
                })(
                  <BankSelect />
                )}
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
