const chai = require("chai");
const chaiHttp = require("chai-http");

const { app, runServer, closeServer } = require("../app");

const expect = chai.expect;

// This let's us make HTTP requests in our tests.
chai.use(chaiHttp);

describe("Blog Post App", function() {
  before(function() {
    return runServer();
  });

  after(function() {
    return closeServer();
  });

  // get test working 
  it("should list items on GET", function() {
    return chai
      .request(app)
      .get("/blog-posts")
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a("array");
        expect(res.body.length).to.be.at.least(1);
        // each item should be an object with key/value pairs
        // for `id`, `name` and `checked`.
        const expectedKeys = 
        ["id", "title", "content", "author", "publishDate"];
        res.body.forEach(function(item) {
          expect(item).to.be.a("object");
          expect(item).to.include.keys(expectedKeys);
        });
      });
  });

  it("should add an item on POST", function() {
    const newItem = {title: "Ghost", content: "in the shell", author: "PuppetMaster"};
    return chai
      .request(app)
      .post("/blog-posts")
      .send(newItem)
      .then(function(res) {
        expect(res).to.have.status(201);
        expect(res).to.be.json;
        expect(res.body).to.be.a("object");
        expect(res.body.title).to.equal(newItem.title);
        expect(res.body.content).to.equal(newItem.content);
        });
      });

    it("should update blog posts on PUT", function() {
      return (
        chai
          .request(app)
          // first have to get
          .get("/blog-posts")
          .then(function(res) {
            const updatedPost = Object.assign(res.body[0], {
              title: "Adam",
              content: "Shout to the Lord "
            });
            return chai
              .request(app)
              .put(`/blog-posts/${res.body[0].id}`)
              .send(updatedPost)
              .then(function(res) {
                expect(res).to.have.status(204);
              });
          })
      );
  });  
  
  it("should delete blog post on DELETE", function () {
    return(
      chai 
        .request(app)
        .get("/blog-posts")
        .then(function (res) {
          return chai.request(app).delete(`/blog-posts/${res.body[0].id}`);
        })
        .then(function (res) {
          expect(res).to.have.status(204);
        })
    );

  });

});


