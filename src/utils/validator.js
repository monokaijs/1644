class Validator {
    constructor() {

    }
    static name(name) {
        const re = /^[a-zA-Z ]+$/;
        return re.test(String(name));
    }
    static email(email = "") {
        // email must be validated in format.
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    static password(password = "") {
        // password must at least 6 chars.
        return password.length >= 6;
    }
}

module.exports = Validator;