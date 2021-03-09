const md5 = require('md5');

class Database {
    static database;
    constructor() {
    }
    static async connect(client) {
        this.client = client;
        try {
            await this.client.connect();
            this.database = this.client.db("assignment1");
        } catch (e) {
            console.log(e);
            throw "Connection cannot be established";
        }
    }
    static createAccount(firstName, lastName, email, password) {
        return new Promise((resolve, reject) => {
            const accounts = this.database.collection("users");
            accounts.findOne({
                email: email
            }).then(existingAccounts => {
                if (!existingAccounts) {
                    accounts.insertOne({
                        firstName: firstName.trim(),
                        lastName: lastName.trim(),
                        fullName: lastName.trim() + " " + firstName.trim(),
                        email: email,
                        password: md5(password),
                        role: 'user'
                    }).then(resolve);
                } else {
                    reject("Account is already exist.");
                }
            }).catch(() => {
                reject("Unknown error.")
            });
        });
    }
    static login(email, password) {
        return new Promise((resolve, reject) => {
            const users = this.database.collection("users");
            users.findOne({
                email: email,
                password: md5(password)
            }).then(account => {
                if (account) {
                    resolve(account);
                } else {
                    reject("Wrong username/password.");
                }
            });
        });
    }
}

module.exports = Database;