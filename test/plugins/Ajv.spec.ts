import { describe } from "mocha";
import { expect } from "chai";

import Ajv from "ajv";
import { ajvSelfPlugin } from "../../src/plugins/Ajv";
import { v4 } from "uuid";

describe("Ajv Plugin", () => {
    it("inject self plugin", () => {
        const ajv = new Ajv();
        ajvSelfPlugin(ajv);
        expect(Object.keys(ajv.formats)).to.have.all.members(["uuid-v4", "unix-timestamp"]);
    });

    it("uuid-v4", () => {
        const ajv = new Ajv();
        ajvSelfPlugin(ajv);

        const validate = ajv.compile({
            type: "object",
            required: ["uuid"],
            properties: {
                uuid: {
                    type: "string",
                    format: "uuid-v4",
                },
            },
        });

        {
            const testUUIDValidFail = {
                uuid: "x",
            };

            validate(testUUIDValidFail);

            expect(validate.errors).not.null;
        }

        {
            const testUUIDValidSuccess = {
                uuid: v4(),
            };

            validate(testUUIDValidSuccess);

            expect(validate.errors).to.null;
        }
    });

    it("unix-timestamp", () => {
        const ajv = new Ajv();
        ajvSelfPlugin(ajv);

        const validate = ajv.compile({
            type: "object",
            required: ["timestamp"],
            properties: {
                timestamp: {
                    type: "integer",
                    format: "unix-timestamp",
                },
            },
        });

        {
            const testTimestampValidFail = {
                timestamp: 100000,
            };

            validate(testTimestampValidFail);

            expect(validate.errors).not.null;
        }

        {
            const testTimestampValidSuccess = {
                timestamp: Date.now(),
            };

            validate(testTimestampValidSuccess);

            expect(validate.errors).to.null;
        }
    });
});
