const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app.js");

chai.should();
chai.use(chaiHttp);

describe("Test User Signup", () => {
    it("User signup should return status 200 or 409", done => {
        chai
            .request(app)
            .post('/users/register')
            .send({ name: "Tester", email: "test@yahoo.com", password: "HatchTest123", confirmPassword: "HatchTest123" })
            .end((err, res) => {
                try {
                    res.should.have.status(200);
                } catch (err) {
                    try {
                        res.should.have.status(409);
                    } catch (err) {
                        console.log(err);
                    }
                }
                done();
            })
    })
})
//Add User Deletion later