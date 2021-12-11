'use strict'
let userForm = new UserForm();
userForm.loginFormCallback = (data) => {
    ApiConnector.login(data, (res) => {
        res.success ? location.reload() : userForm.setLoginErrorMessage(res.error);
    })
};

userForm.registerFormCallback = (data) => {
    ApiConnector.register(data, (res) => {
        res.success ? location.reload() : userForm.setRegisterErrorMessage(res.error);
    })
};
