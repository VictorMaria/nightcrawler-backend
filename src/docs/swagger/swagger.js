// eslint-disable-next-line import/named
import { API_URL } from '../../config/constants';
import { created, success } from './definitions/successResponse';
import {
  badRequest, notAuthorized, accessForbidden, notFound, conflict,
  serverError
} from './definitions/errorResponse';
import { SigninCreate, Signin, Logout } from './definitions/auth';
import {
  createUser, updateRoleReq, updateRoleRes,
  resetPassword, resetPasswordResponse, forgotPassword, resetUserPassword, verifyUser
} from './definitions/users';
import { permissionsRes } from './definitions/permissions';
import { updateRolePermissionsReq, rolesRes, updateRolePermissionsRes } from './definitions/roles';
import {
  createAccommodationReq, createAccommodationRes, createRoomReq, createRoomRes,
  getAccommodationRes, getAllAccommodationsRes
} from './definitions/accommodation';
import {
  createBookingReq, createBookingRes, getBookingRes, getAllBookingsRes
} from './definitions/booking';


import { signInPath, logoutPath } from './paths/auth';
import {
  userRolePath, createUserPath, resetPasswordPath, forgotPasswordPath, resetUserPasswordPath,
  verifyUserPath
} from './paths/users';
import { requestTrip, approvedTripPath, getTripPath, viewAllTripRequest, rejectTrip } from './paths/trips';
import { createTrip, viewAllTripRequestRes, updateTrip } from './definitions/trip';
import { permissionsPath } from './paths/permissions';
import { rolesPath, rolePermissionsPath } from './paths/roles';
import {
  createAccommodationPath, createRoomPath, getAccommodationPath, getTripAccommodationsPath
} from './paths/accommodations';
import {
  bookingPath, getSingleBookingPath, getUserBookings
} from './paths/booking';
import socialMediaAuthentication from './definitions/socialMedia';
import { googlePath, facebookPath } from './paths/socialAuth';
import {
  ProfileCreate, ProfileResponds, ProfileHeaders, ProfileUpdate, ProfileUpdateResponds
} from './definitions/profile';
import profilePath from './paths/profile';

const swaggerDocument = {
  swagger: '2.0',
  info: {
    version: '1.0.0',
    title: 'Barefoot Nomad API',
    description: 'API Documentation for Barefoot Nomad.',
    header: 'none'
  },
  host: API_URL,
  basePath: '/api/v1/',
  produces: ['application/json'],
  consumes: ['application/json'],
  schemes: ['http', 'https'],
  securityDefinitions: {
    BearerToken: {
      description: `
        All protected routes must be accessed with a Bearer Token.
        The JWT Token is generated by the API upon user login.`,
      type: 'apiKey',
      name: 'Authorization',
      in: 'header'
    },
  },
  tags: [
    {
      name: 'auth',
      description: 'Everything about authentication'
    },
    {
      name: 'users',
      description: 'Everything about the user interaction'
    },
    {
      name: 'permissions',
      description: 'Everything about permissions'
    },
    {
      name: 'roles',
      description: 'Everything about roles'
    },
    {
      name: 'trips',
      description: 'Trip related actions'
    },
    {
      name: 'accommodations',
      description: 'Accommodation related endpoints'
    },
    {
      name: 'bookings',
      description: 'Accommodation related endpoints'
    }
  ],
  paths: {
    '/auth/signin': signInPath,
    '/auth/logout': logoutPath,
    '/users': createUserPath,
    '/users/verify': verifyUserPath,
    '/users/roles/{roleId}': userRolePath,
    '/permissions': permissionsPath,
    '/roles': rolesPath,
    '/roles/{roleId}/permissions': rolePermissionsPath,
    '/users/forgot-password': forgotPasswordPath,
    '/users/reset-forgot-password': resetPasswordPath,
    '/users/reset-user-password': resetUserPasswordPath,
    '/trips/request': requestTrip,
    '/trips/{tripId}/approve': approvedTripPath,
    '/trips/{tripId}/reject': rejectTrip,
    '/trips/{tripId}': getTripPath,
    '/trips': viewAllTripRequest,
    '/accommodations': createAccommodationPath,
    '/accommodations/rooms/{accommodationId}': createRoomPath,
    '/accommodations/{accommodationId}': getAccommodationPath,
    '/accommodations/trips/{tripId}': getTripAccommodationsPath,
    '/auth/google': googlePath,
    '/auth/facebook': facebookPath,
    '/user': createUser,
    '/users/profile': profilePath,
    '/bookings': bookingPath,
    '/bookings/user': getUserBookings,
    '/bookings{bookingId}': getSingleBookingPath,
  },
  definitions: {
    createBookingReq,
    createBookingRes,
    getBookingRes,
    getAllBookingsRes,
    getAccommodationRes,
    getAllAccommodationsRes,
    createAccommodationRes,
    createAccommodationReq,
    createRoomReq,
    createRoomRes,
    SigninCreate, // signin request
    Signin, // signin response
    createUser, // create user
    verifyUser, // verify user
    success, // 200
    created,
    ProfileHeaders, // profile header token
    ProfileCreate, // profile create request
    ProfileResponds, // profile response
    ProfileUpdate, // profile update request
    ProfileUpdateResponds, // profile update response
    updateRoleReq,
    updateRoleRes,
    permissionsRes,
    forgotPassword,
    resetUserPassword,
    updateRolePermissionsReq,
    updateRolePermissionsRes,
    rolesRes,
    createTrip,
    updateTrip,
    updateRoleRes,
    viewAllTripRequestRes,
    resetPassword, // reset password request
    resetPasswordResponse,
    badRequest, // 400
    notAuthorized, // 401
    accessForbidden, // 403
    notFound, // 404
    conflict, // 409
    serverError, // 503
    socialMediaAuthentication, // social media login response
    Logout
  }
};

export default swaggerDocument;
