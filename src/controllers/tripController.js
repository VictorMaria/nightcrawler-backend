import { postTrip, updateTripStatus, getRequesterEmail } from '../services/tripServices';
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
  const payload = {
    ...req.body, status: 'pending', type: 'one-way', userId: id
  };
  try {
    const tripRequest = await postTrip(payload);

    return respondWithSuccess(
      res,
      statusCode.created,
      'request successfully sent',
      tripRequest.toJSON()
    );
  } catch (error) {
    return respondWithWarning(res, statusCode.internalServerError, 'Internal Server Error');
  }
};

export const approveTripRequest = async (req, res) => {
  const status = 'approved';
  try {
    const tripRequest = await updateTripStatus(req.params.tripId, status);
    const {
      1: { dataValues }
    } = tripRequest;
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
    return respondWithSuccess(
      res,
      statusCode.success,
      'Trip has been updated successfully',
      dataValues
    );
  } catch (error) {
    return respondWithWarning(res, statusCode.internalServerError, 'Oops something bad happened');
  }
};

export const getTripRequest = async (req, res) => (!req.trip
  ? respondWithWarning(res, statusCode.internalServerError, 'Oops something bad happened')
  : respondWithSuccess(res, statusCode.success, 'Operation successful', req.trip));
/**
 * A function to create a return trip
 * @param {object} req
 * @param {object} res
 * @returns {object} response
 */
export const returnTripRequest = async (req, res) => {
  const { id } = req.auth;
  const { returnDate, departureDate } = req.body;
  const returnDateToISO = new Date(returnDate).toISOString();
  const departureDateToISO = new Date(departureDate).toISOString();

  if (departureDateToISO > returnDateToISO) {
    return respondWithWarning(res, statusCode.badRequest, 'return date cannot be before departure date');
  }
  const data = {
    ...req.body,
    status: 'pending',
    type: 'return',
    userId: id
  };
  try {
    const returnTrip = await postTrip(data);
    return respondWithSuccess(res, statusCode.created, 'Request Successful', returnTrip.dataValues);
  } catch (error) {
    return respondWithWarning(res, statusCode.internalServerError, 'Internal Server Error');
  }
};
