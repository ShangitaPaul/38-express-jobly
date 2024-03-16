"use strict";

const { NotFoundError, BadRequestError } = require("../expressError");
const db = require("../db.js");
const Job = require("./job.js");
/**
 * This module contains tests for the Job model.
 * @module JobTests
 */
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testJobIds,
} = require("./_testCommon");

// Setup common test data
beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** create */

describe("create", function () {
  // Test data for creating a new job
  let newJob = {
    companyHandle: "c1",
    title: "Test",
    salary: 100,
    equity: "0.1",
  };

  // Test case for creating a new job
  test("works", async function () {
    // Create a new job
    let job = await Job.create(newJob);
    // Check if the created job matches the expected data
    expect(job).toEqual({
      ...newJob,
      id: expect.any(Number),
    });
  });
});

/************************************** findAll */

describe("findAll", function () {
  // Test case for finding all jobs
  test("works: no filter", async function () {
    // Find all jobs without any filter
    let jobs = await Job.findAll();
    // Check if the returned jobs match the expected data
    expect(jobs).toEqual([
      {
        id: testJobIds[0],
        title: "Job1",
        salary: 100,
        equity: "0.1",
        companyHandle: "c1",
        companyName: "C1",
      },
      // Additional job objects...
    ]);
  });

  // Additional test cases for finding jobs with filters...
});

/************************************** get */

describe("get", function () {
  // Test case for getting a job by ID
  test("works", async function () {
    // Get a job by ID
    let job = await Job.get(testJobIds[0]);
    // Check if the returned job matches the expected data
    expect(job).toEqual({
      id: testJobIds[0],
      title: "Job1",
      salary: 100,
      equity: "0.1",
      company: {
        handle: "c1",
        name: "C1",
        description: "Desc1",
        numEmployees: 1,
        logoUrl: "http://c1.img",
      },
    });
  });

  // Test case for handling not found error
  test("not found if no such job", async function () {
    try {
      // Try to get a job with a non-existent ID
      await Job.get(0);
      // Fail the test if the job is found
      fail();
    } catch (err) {
      // Check if the error is a NotFoundError
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});

/************************************** update */

describe("update", function () {
  // Test data for updating a job
  let updateData = {
    title: "New",
    salary: 500,
    equity: "0.5",
  };

  // Test case for updating a job
  test("works", async function () {
    // Update a job
    let job = await Job.update(testJobIds[0], updateData);
    // Check if the updated job matches the expected data
    expect(job).toEqual({
      id: testJobIds[0],
      companyHandle: "c1",
      ...updateData,
    });
  });

  // Test case for handling not found error
  test("not found if no such job", async function () {
    try {
      // Try to update a job with a non-existent ID
      await Job.update(0, {
        title: "test",
      });
      // Fail the test if the job is found
      fail();
    } catch (err) {
      // Check if the error is a NotFoundError
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });

  // Test case for handling bad request error with no data
  test("bad request with no data", async function () {
    try {
      // Try to update a job with no data
      await Job.update(testJobIds[0], {});
      // Fail the test if no error is thrown
      fail();
    } catch (err) {
      // Check if the error is a BadRequestError
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });
});

/************************************** remove */

describe("remove", function () {
  // Test case for removing a job
  test("works", async function () {
    // Remove a job
    await Job.remove(testJobIds[0]);
    // Check if the job is removed from the database
    const res = await db.query(
        "SELECT id FROM jobs WHERE id=$1", [testJobIds[0]]);
    expect(res.rows.length).toEqual(0);
  });

  // Test case for handling not found error
  test("not found if no such job", async function () {
    try {
      // Try to remove a job with a non-existent ID
      await Job.remove(0);
      // Fail the test if the job is found
      fail();
    } catch (err) {
      // Check if the error is a NotFoundError
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});
