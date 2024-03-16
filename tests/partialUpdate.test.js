const partialUpdate = require('./partialUpdate');
const ExpressError = require('./expressError');

describe('partialUpdate', () => {
    it('should partially update query with one field', () => {
        const result = partialUpdate('table', 'col', 'val', 'key', 1);
        expect(typeof result).toBe('string');
    });

    it('should partially update query with multiple fields', () => {
        const result = partialUpdate('table', 'col1', 'val1', 'col2', 'val2');
        expect(typeof result).toBe('string');
    });

    it('should throw error if no table provided', () => {
        expect(() => {
            partialUpdate();
        }).toThrow(ExpressError);
    });

    it('should throw error if no column provided', () => {
        expect(() => {
            partialUpdate('table');
        }).toThrow(ExpressError);
    });

    it('should throw error if no value provided', () => {
        expect(() => {
            partialUpdate('table', 'col');
        }).toThrow(ExpressError);
    });

    it('should throw error if no key provided', () => {
        expect(() => {
            partialUpdate('table', 'col', 'val');
        }).toThrow(ExpressError);
    });
});const { sqlForPartialUpdate } = require("../helpers/sql");
const { BadRequestError } = require("../expressError");

describe("sqlForPartialUpdate", () => {
  test("should generate the correct SQL query and values for partial update", () => {
    const dataToUpdate = {
      firstName: "Aliya",
      age: 32,
    };

    const jsToSql = {
      firstName: "first_name",
    };

    const result = sqlForPartialUpdate(dataToUpdate, jsToSql);

    expect(result.setCols).toEqual('"first_name"=$1, "age"=$2');
    expect(result.values).toEqual(["Aliya", 32]);
  });

  test("should throw BadRequestError if no data is provided", () => {
    const dataToUpdate = {};

    const jsToSql = {
      firstName: "first_name",
    };

    expect(() => {
      sqlForPartialUpdate(dataToUpdate, jsToSql);
    }).toThrow(BadRequestError);
  });
});

/*const partialUpdate = require('./partialUpdate');
const ExpressError = require('./expressError');

describe('partialUpdate', () => {
    it('should partially update query with one field', () => {
        const result = partialUpdate('table', 'col', 'val', 'key', 1);
        expect(typeof result).toBe('string');
    });
    it('should partially update query with multiple fields', () => {
        const result = partialUpdate('table', 'col1', 'val1', 'col2', 'val2');
        expect(typeof result).toBe('string');
    });
    it('should throw error if no table provided', () => {
        expect(() => {
            partialUpdate();
        }).toThrow(ExpressError);
    });
    it('should throw error if no column provided', () => {
        expect(() => {
            partialUpdate('table');
        }).toThrow(ExpressError);
    });
    it('should throw error if no value provided', () => {
    
    */

// describe('partialUpdate', () => {
//     it('should partially update query with one field', () => {
//         const result = partialUpdate('table', 'col', 'val', 'key', 1);
//         expect(typeof result).toBe('string');
//     });
//     it('should partially update query with multiple fields', () => {
//         const result = partialUpdate('table', 'col1', 'val1', 'col2', 'val2');
//         expect(typeof result).toBe('string');
//     }
//     it('should throw error if no table provided', () => {
//         expect(() => {
//             partialUpdate();
//         }).toThrow(ExpressError);
//     });
//     it('should throw error if no column provided', () => {
//         expect(() => {
//             partialUpdate('table');
//         }).toThrow(ExpressError);
//     });
//     it('should throw error if no value provided', () => {
//         expect(() => {
//             partialUpdate('table', 'col');
//         }).toThrow(ExpressError);
//     });
//     it('should throw error if no key provided', () => {
//         expect(() => {
//             partialUpdate('table', 'col', 'val');
//         }).toThrow(ExpressError);
//     });
// }

