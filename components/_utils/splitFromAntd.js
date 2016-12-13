import React from 'react';
import warning from 'warning';

/**
 * 代替form.getFieldDecorator
 */
export const getFieldDecorator = (form) => {
  if (form && form.getFieldDecorator) {
    return (name, config) => form.getFieldDecorator(name, config);
  } else {
    warning(
      form && form.getFieldDecorator,
      'The method of form.getFieldDecorator can not be found, please check the version of antd'
    );
    return (name, config) => (component) => {
      return React.cloneElement(component, { 
        value: config.initialValue,
        name,
        ...config
      });
    }
  }
}

/**
 * 代替form.getFieldValue
 */
export const getFieldValue = (form) => {
  if (form && form.getFieldValue) {
    return (name) => form.getFieldValue(name);
  } else {
    warning(
      form && form.getFieldValue,
      'The method of form.getFieldValue can not be found, please check the version of antd'
    );
    return (name) => null
  }
}

/**
 * 代替form.setFieldsValue
 */
export const setFieldsValue = (form) => {
  if (form && form.setFieldsValue) {
    return (obj) => form.setFieldsValue(obj);
  } else {
    warning(
      form && form.setFieldsValue,
      'The method of form.setFieldsValue can not be found, please check the version of antd'
    );
    return (obj) => null
  }
}