import log from "../logger";
import {AnySchema} from "yup";
import {Request, Response, NextFunction} from "express";

const validate = (schema: AnySchema) => async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        await schema.validate({
            body: req.body,
            query: req.query,
            params: req.params,

        });
        return next();
    } catch (e) {
        log.error(e);
        return res.status(400).send(e.error);
    }
}
export default validate;