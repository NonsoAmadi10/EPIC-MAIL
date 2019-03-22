import Validate from '../../validator/validate';

class Group {

    static groupUtils(req, res, next){
        const { name, email } = req.body;
        const response = error =>{ return res.status(400).send({ status: 'error', error }); };

        if (Validate.checkEmpty(name)) return response('Name cannot be empty');
        if (Validate.checkEmpty(email)) return response('Email cannot be empty');
        if (Validate.isMultipleSpace(email)) return response('email cannot contain multiple spaces');
        if (Validate.isNotNumber(name)) return response('Name cannot contain numbers');
        if (Validate.isMultipleSpace(name)) return response('Name cannot contain multiple spaces');
        
        return next();
    }
}

export default Group;
