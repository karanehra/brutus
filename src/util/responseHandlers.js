/**
 * Sends a `200` status code with given payload
 * @param {Object} res The express response object
 * @param {Object} payload The payload to send with response
 */
export const sendSuccessResponse = (res, payload) => {
  res.status(200).send(payload);
};

/**
 * Sends a `500` status code with given payload
 * @param {Object} res The express response object
 * @param {Object} payload The payload to send with response
 */
export const sendServerErrorResponse = (res, payload) => {
  res.status(500).send(payload);
};

/**
 * Sends a `201` status code with the created entity in the payload
 * @param {Object} res The express response object
 * @param {Object} payload The created entity
 */
export const sendCreatedResponse = (res, payload) => {
  res.status(201).send(payload);
};

/**
 * Sends a `401` status code with a message payload
 * @param {Object} res The express response object
 * @param {Object} payload The created entity
 * @param {String} payload.message The created entity
 */
export const sendUnauthorizedResponse = (res, payload) => {
  res.status(401).send(payload);
};
