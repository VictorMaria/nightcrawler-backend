/**
 * Handles all http responses
 * @exports responseHandler
 */

/**
  * @param  {Object} res
  * @param  {Number} statusCode
  * @param  {String} message
  * @param {Object} additionalFields
  * @returns {Object} null
  */
export function respondWithSuccess(res, statusCode = 200, message, additionalFields = {}) {
  return res.status(statusCode).send({ success: true, message, payload: { ...additionalFields } });
}

/**
  * @param  {Object} res
  * @param  {Number} statusCode
  * @param  {String} message
  * @param {Object} additionalFields
  * @returns {Object} null
  */
export function respondWithWarning(res, statusCode = 500, message, additionalFields = {}) {
  return res.status(statusCode).send({ success: false, message, payload: { ...additionalFields } });
}
