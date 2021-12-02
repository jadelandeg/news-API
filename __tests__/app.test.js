const db = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");
const request = require("supertest");
const app = require("../app");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("GET /api/", () => {
  test("should return JSON object of endpoints", () => {
    return request(app)
      .get("/api/")
      .expect((response) => {
        expect(typeof response.body).toEqual("object");
      });
  });
});

describe("GET /api/topics", () => {
  test("200: returns an array of topics", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((response) => {
        expect(response.body.topics.length > 0).toBe(true);
        return response;
      })
      .then((response) => {
        response.body.topics.forEach((topic) => {
          expect(topic).toEqual(
            expect.objectContaining({
              slug: expect.any(String),
              description: expect.any(String),
            })
          );
        });
      });
  });
});

describe.only("GET /api/fskfddlsfkl", () => {
  test("404: returns not found", () => {
    return request(app)
      .get("/api/fskfddlsfkl")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toEqual("path not found");
      });
  });
});

describe("GET /api/articles/:id", () => {
  test("200: returns article with specified id and number of comments", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual({
          article: {
            article_id: 1,
            title: "Living in the shadow of a great man",
            topic: "mitch",
            author: "butter_bridge",
            body: "I find this existence challenging",
            created_at: expect.any(String),
            votes: 100,
            comment_count: "11",
          },
        });
      });
  });
  test("400: returns bad request", () => {
    return request(app)
      .get("/api/articles/bananas")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("bad request");
      });
  });
  test("404: returns article doesn't exist", () => {
    return request(app)
      .get("/api/articles/50000")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("article doesn't exist");
      });
  });
});

describe("PATCH /api/articles/:articleid", () => {
  test("200: returns updated article", () => {
    const articleVotes = { inc_votes: 10 };
    return request(app)
      .patch("/api/articles/5")
      .send(articleVotes)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual({
          article: {
            article_id: 5,
            title: "UNCOVERED: catspiracy to bring down democracy",
            topic: "cats",
            author: "rogersop",
            body: "Bastet walks amongst us, and the cats are taking arms!",
            created_at: expect.any(String),
            votes: 10,
          },
        });
      });
  });
  test("200: returns unchanged article", () => {
    return request(app)
      .patch("/api/articles/5")
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual({
          article: {
            article_id: 5,
            title: "UNCOVERED: catspiracy to bring down democracy",
            topic: "cats",
            author: "rogersop",
            body: "Bastet walks amongst us, and the cats are taking arms!",
            created_at: expect.any(String),
            votes: 0,
          },
        });
      });
  });
  test("400: returns request must be a number", () => {
    return request(app)
      .patch("/api/articles/5")
      .send({ inc_votes: "jade" })
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("request must be a number");
      });
  });
  test("400: returns bad request", () => {
    const articleVotes = { inc_votes: 10 };
    return request(app)
      .patch("/api/articles/banana")
      .send(articleVotes)
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("bad request");
      });
  });
  test("404: returns article doesn't exist", () => {
    const articleVotes = { inc_votes: 10 };
    return request(app)
      .patch("/api/articles/1000000")
      .send(articleVotes)
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("article doesn't exist");
      });
  });
});

describe("GET /api/articles", () => {
  test("200: returns an array of articles sorted by date", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((response) => {
        expect(response.body.articles.length > 0).toBe(true);
        return response;
      })
      .then((response) => {
        response.body.articles.forEach((article) => {
          expect(article).toEqual(
            expect.objectContaining({
              author: expect.any(String),
              title: expect.any(String),
              article_id: expect.any(Number),
              created_at: expect.any(String),
              votes: expect.any(Number),
              comment_count: expect.any(String),
              topic: expect.any(String),
            })
          );
          expect(response.body.articles).toBeSortedBy("created_at", {
            descending: true,
          });
        });
      });
  });
  test("200: accepts a sort_by query and an order query", () => {
    return request(app)
      .get("/api/articles?sort_by=comment_count&order=ASC")
      .expect(200)
      .then((response) => {
        response.body.articles.map((article) => {
          expect(article).toEqual(
            expect.objectContaining({
              author: expect.any(String),
              title: expect.any(String),
              article_id: expect.any(Number),
              created_at: expect.any(String),
              votes: expect.any(Number),
              comment_count: expect.any(String),
              topic: expect.any(String),
            })
          );
          expect(response.body.articles).toBeSortedBy("comment_count", {
            ascending: true,
            coerce: true,
          });
        });
      });
  });
  test("200: accepts a topic query and filters articles by that topic", () => {
    return request(app)
      .get("/api/articles?topic=cats")
      .expect(200)
      .then((response) => {
        response.body.articles.forEach((article) => {
          expect(article).toHaveProperty("topic", "cats");
        });
      });
  });
  test('400: returns "invalid search request"', () => {
    return request(app)
      .get("/api/articles?sort_by=bananas")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("invalid search request");
      });
  });
  test('400: returns "invalid search request"', () => {
    return request(app)
      .get("/api/articles?order=bananas")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("invalid search request");
      });
  });
  test('404: returns "not a topic"', () => {
    return request(app)
      .get("/api/articles?topic=bananas")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("not a topic");
      });
  });
  test('404: returns "no articles associated with that topic"', () => {
    return request(app)
      .get("/api/articles?topic=paper")
      .expect(200)
      .then((response) => {
        expect(response.body.articles).toEqual([]);
      });
  });
});

describe("GET api/articles/:article_id/comments", () => {
  test("200: should return array of comments", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then((response) => {
        expect(response.body.comments.length > 0).toBe(true);
        return response;
      })
      .then((response) => {
        response.body.comments.forEach((comment) => {
          expect(comment).toEqual(
            expect.objectContaining({
              comment_id: expect.any(Number),
              votes: expect.any(Number),
              created_at: expect.any(String),
              author: expect.any(String),
              body: expect.any(String),
            })
          );
        });
      });
  });
  test("200: should return an empty array if article has no comments", () => {
    return request(app)
      .get("/api/articles/2/comments")
      .expect(200)
      .then((response) => {
        expect(response.body.comments).toEqual([]);
      });
  });
  test("400: should return bad request", () => {
    return request(app)
      .get("/api/articles/dog/comments")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toEqual("bad request");
      });
  });
  test("404: should return article doesn't exist", () => {
    return request(app)
      .get("/api/articles/100000/comments")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toEqual("article doesn't exist");
      });
  });
  test("404: path not found", () => {
    return request(app)
      .get("/api/articles/1/cmmmnts")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("path not found");
      });
  });
});

describe("POST: /api/articles/:article_id/comments", () => {
  test("201: should return the posted comment", () => {
    return request(app)
      .post("/api/articles/1/comments")
      .send({
        username: "rogersop",
        body: "new comment",
      })
      .expect(201)
      .then((response) => {
        expect(response.body.comment).toEqual({
          author: "rogersop",
          body: "new comment",
          votes: 0,
          comment_id: 19,
          article_id: 1,
          created_at: expect.any(String),
        });
      });
  });
  test("400: returns bad request", () => {
    return request(app)
      .post("/api/articles/dogs/comments")
      .send({
        username: "rogersop",
        body: "new comment",
      })
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("bad request");
      });
  });
  test("404: article doesn't exist", () => {
    return request(app)
      .post("/api/articles/10000/comments")
      .send({
        username: "rogersop",
        body: "new comment",
      })
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("article doesn't exist");
      });
  });
  test("400: returns request must contain a body", () => {
    return request(app)
      .post("/api/articles/1/comments")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("request must contain a body");
      });
  });
  test("400: returns request must contain a body", () => {
    return request(app)
      .post("/api/articles/1/comments")
      .send({ username: "rogersop" })
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("request must contain a body");
      });
  });
  test("400: returns request must contain a body", () => {
    return request(app)
      .post("/api/articles/1/comments")
      .send({ body: "jade" })
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("request must contain a body");
      });
  });
  test("404: returns user doesn't exist", () => {
    return request(app)
      .post("/api/articles/1/comments")
      .send({ username: "jade", body: "hello" })
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("user doesn't exist");
      });
  });
});

describe("DELETE /api/comments/:comment_id", () => {
  test("204: returns no content", () => {
    return request(app).delete("/api/comments/1").expect(204);
  });
  test("400: returns bad request", () => {
    return request(app)
      .delete("/api/comments/hello")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("bad request");
      });
  });
  test("404: comment doesn't exist", () => {
    return request(app)
      .delete("/api/comments/100000")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("comment doesn't exist");
      });
  });
});

describe("GET /api/users", () => {
  test("200: returns an array of objects with the property username", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then((response) => {
        expect(response.body.users).toEqual([
          { username: "butter_bridge" },
          { username: "icellusedkars" },
          { username: "rogersop" },
          { username: "lurker" },
        ]);
      });
  });
});

describe("GET api/users/:username", () => {
  test("200: returns a user object", () => {
    return request(app)
      .get("/api/users/butter_bridge")
      .expect(200)
      .then((response) => {
        expect(response.body.user).toEqual({
          username: "butter_bridge",
          name: "jonny",
          avatar_url:
            "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
        });
      });
  });
  test("404: user doesn't exist", () => {
    return request(app)
      .get("/api/users/hellomynameisjade")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("user doesn't exist");
      });
  });
});

describe("PATCH /api/comments/:comment_id", () => {
  test("200: returns updated comment", () => {
    return request(app)
      .patch("/api/comments/1")
      .send({ inc_votes: 10 })
      .expect(200)
      .then((response) => {
        expect(response.body.comment).toEqual({
          body: "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
          votes: 26,
          author: "butter_bridge",
          article_id: 9,
          created_at: expect.any(String),
        });
      });
  });
});
