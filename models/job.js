const db = require('../db');
const ExpressError = require('../helpers/expressError');

class Job {
    constructor({ id, title, salary, equity, company_handle }) {
        this.id = id;
        this.title = title;
        this.salary = salary;
        this.equity = equity;
        this.company_handle = company_handle;
    }

    static async getAll() {
        const result = await db.query(
            `SELECT id, title, salary, equity, company_handle
             FROM jobs`
        );
        return result.rows.map(row => new Job(row));
    }

    static async getById(id) {
        const result = await db.query(
            `SELECT id, title, salary, equity, company_handle
             FROM jobs
             WHERE id = $1`,
            [id]
        );
        const job = result.rows[0];
        if (!job) {
            throw new ExpressError('Job not found', 404);
        }
        return new Job(job);
    }

    static async create({ title, salary, equity, company_handle }) {
        const result = await db.query(
            `INSERT INTO jobs (title, salary, equity, company_handle)
             VALUES ($1, $2, $3, $4)
             RETURNING id, title, salary, equity, company_handle`,
            [title, salary, equity, company_handle]
        );
        return new Job(result.rows[0]);
    }

    async update({ title, salary, equity }) {
        const result = await db.query(
            `UPDATE jobs
             SET title = $1, salary = $2, equity = $3
             WHERE id = $4
             RETURNING id, title, salary, equity, company_handle`,
            [title, salary, equity, this.id]
        );
        return new Job(result.rows[0]);
    }

    async remove() {
        await db.query(
            `DELETE FROM jobs
             WHERE id = $1`,
            [this.id]
        );
    }
}

module.exports = Job;