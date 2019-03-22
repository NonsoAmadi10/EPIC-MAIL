import Validate from '../../validator/validate';


class msgSanitize {

    static msgPost(req, res, next) {
    const { subject, message }= req.body;
    const { id } = req.params;
    
    const response = error => res.status(400).send({status: 400, error });

    if (Validate.checkEmpty(subject)) return response('subject cannot be empty');
    if (Validate.checkEmpty(message)) return response('message cannot be empty');
    if (Validate.isMultipleSpace(subject)) return response('subject body cannot contain multiple spaces');
   

    return next();
    }

    static msgParam(req, res,next) {
        const { id } = req.params;
        const response = error => res.status(400).send({status: 400, error });
        if (Validate.isValidParams(id)) return response('Request parameter entered is not Valid');

        return next();
    }
}

export default msgSanitize;
