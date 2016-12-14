import { PASSWORD_MASK } from './constant';

const verify = {};

verify.formfieldsValidate = (form, showMsg) => {
    let errMsg = '';
    form.validateFields((errors, values) => {
        if (!!errors) {
            for(const key in errors) {
                errMsg = errors[key].errors[0].message;
                return;
            }
        }
    });
    if (errMsg !== '') {
        showMsg && showMsg.call(null, errMsg);
        return false;
    } else {
        return true;
    }
}

verify.setRules = (ruleArr, fieldName) => {
  let rules = [];
  for (let i = 0; i < ruleArr.length; i++) {
    const item = ruleArr[i];
    if (typeof item == 'string') {
      let rule = RULEMAPPING[item];
      rule && rules.push(rule(fieldName));
    } else {
      rules.push(item);
    }
  }
  return rules;
}

export default verify;

const RULEMAPPING = {};

RULEMAPPING.REQUIRED = (fieldName = '此项') => (
  { required: true, message: `${fieldName}为必填项` }
)

RULEMAPPING.USER_PASSWORD = (fieldName = '密码') => (
  {
    validator: (rule, value, callback) => {
      if (value && value === PASSWORD_MASK) {
          callback();
      } else if (value && !/^[a-zA-Z0-9_!@#$%\^\&\*\(\)\.]{6,32}$/.test(value)) {
          callback(`${fieldName}长度6-32位，且只包含数字字母及_!@#$%^&*()`);
      } else if (value && !/([a-zA-Z]+.*[0-9]+)|([0-9]+.*[a-zA-Z]+)/.test(value)) {
          callback(`${fieldName}需同时包含数字和字母`);
      } else {
          callback();
      }
    }
  }
);

RULEMAPPING.USER_NAME = (fieldName = '用户名') => (
  {
    validator: (rule, value, callback) => {
      if (value && !/^[a-zA-Z]{1}[a-zA-Z0-9_@\.\-]{3,63}$/.test(value)) {
          callback(`请输入正确${fieldName}，字母开头，可包含字母数字下划线，长度为4-64`);
      } else {
          callback();
      }
    }
  }
);

RULEMAPPING.TELEPHONE = (fieldName = '手机号码') => (
  {
    validator: (rule, value, callback) => {
      if (value && !/^1[34578]{1}\d{9}$/.test(value)) {
          callback(`请输入正确${fieldName}`);
      } else {
          callback();
      }
    }
  }
);

RULEMAPPING.IDCARD = (fieldName = '身份证号码') => (
  {
    validator: (rule, value, callback) => {
      const arrExp = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];//加权因子
      const arrValid = [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2];//校验码
      if (/^\d{17}\d|x$/i.test(value)) {
          let sum = 0, idx;
          for (let i = 0; i < value.length - 1; i++) {
              // 对前17位数字与权值乘积求和
              sum += parseInt(value.substr(i, 1), 10) * arrExp[i];
          }
          // 计算模（固定算法）
          idx = sum % 11;
          // 检验第18为是否与校验码相等
          if (arrValid[idx] == value.substr(17, 1).toUpperCase()) {
              callback()
          } else {
              callback(`请输入正确${fieldName}`);
          }
      }
      else {
          callback(`请输入正确${fieldName}`);
      }
    }
  }
);

RULEMAPPING.CHINESE_NAME = (fieldName = '中文姓名') => (
  {
    validator: (rule, value, callback) => {
      if (value && !/^[\u4e00-\u9fa5]{1,20}$/.test(value)) {
        callback(`${fieldName}必须使用身份证中文姓名`);
      } else {
        callback();
      }
    }
  }
);

RULEMAPPING.CHINESE = (fieldName = '此项') => (
  {
    validator: (rule, value, callback) => {
      if (value && !/^[\u4e00-\u9fa5]*$/.test(value)) {
        callback(`${fieldName}为中文`);
      } else {
        callback();
      }
    }
  }
);

RULEMAPPING.BANK_NO = (fieldName = '银行卡号') => (
  {
    validator: (rule, value, callback) => {
      if (value && !/^(\d{4}\s?){4}(\d{3})?$/.test(value)) {
        callback(`请输入正确的${fieldName}`);
      } else {
        callback();
      }
    }
  }
);
