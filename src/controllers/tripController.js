import { postTrip, updateTripStatus, getRequesterEmail, getRequest, rejectRequest, findTripById } from '../services/tripServices';
import { respondWithSuccess, respondWithWarning } from '../helpers/responseHandler';
import statusCode from '../helpers/statusCode';
import { approvedEmitter } from '../helpers/notificationHandler';




/**
* make trip request
* @param {object} req
* @param {object} res
* @returns {object} json response
*/
export const oneWayTripRequest = async (req, res) => {
  const { id } = req.auth;
  const payload = { ...req.body, status: 'pending', userId: id };
  try {
    const tripRequest = await postTrip(payload);

    return respondWithSuccess(res, statusCode.created, 'request successfully sent', tripRequest.toJSON());
  } catch (error) {
    return respondWithWarning(res, statusCode.internalServerError, 'Internal Server Error');
  }
};
export const getTripRequests = async (req, res) => {
  const { id } = req.auth;
  try {
    const tripRequests = await getRequest(id);
    return respondWithSuccess(res, statusCode.success, 'resource successfully fetched', tripRequests);
  } catch(error) {
    return respondWithWarning(res, statusCode.internalServerError, error.message);
  }
}

export const approveTripRequest = async (req, res) => {
  const status = 'approved';
  try {
    const tripRequest = await updateTripStatus(req.params.tripId, status);
    const { 1: { dataValues } } = tripRequest;
    const requesterEmail = await getRequesterEmail(dataValues.userId);
    const payload = {
      type: 'Approved Trip',
      title: dataValues.reason,
      tripId: dataValues.id,
      userId: dataValues.userId,
      requester: requesterEmail,
      message: 'Your Trip has been approved'
    };
    approvedEmitter(payload);
    return respondWithSuccess(res, statusCode.success, 'Trip has been updated successfully', dataValues);
  } catch (error) {
    return respondWithWarning(res, statusCode.internalServerError, 'Oops something bad happened');
  }
};

export const getTripRequest = async (req, res) => (!req.trip ? respondWithWarning(res, statusCode.internalServerError, 'Oops something bad happened')
  : respondWithSuccess(res, statusCode.success, 'Operation successful', req.trip));


  export const rejectTripRequest = async (req, res) => {
    const {  status } = req.body;
   
    try {
      const [ , tripRequest ]= await rejectRequest(req.params.tripId, status);
      return respondWithSuccess(res, statusCode.success, 'Trip has been updated successfully', tripRequest.toJSON());
    } catch (error) {
      return respondWithWarning(res, statusCode.internalServerError, error.message);
    }
  }
