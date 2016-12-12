const tools = {};

tools.formfieldsValidte = (form, showMsg) => {
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

export default tools;