module.exports = class UserDto {
    id;
    name;
    email;
    password;
    isActivated;
    activationLink;
    
    constructor(model){
        this.id = model.id;
        this.name = model.name;
        this.email = model.email;
        this.password = model.password;
        this.isActivated = model.isActivated;
        this.activationLink = model.activationLink;
    }
}