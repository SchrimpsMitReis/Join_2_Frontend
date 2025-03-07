class Account extends Contact {
    constructor(id, name, email, tel, password) {
        super(id, name, email, tel)
        this.password = password;
    }
}
