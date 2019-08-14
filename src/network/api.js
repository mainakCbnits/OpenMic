import axios from "axios";

export const baseURL = "http://111.93.169.90:3004/";

export const endPoints = {
  login: "api/userLogin",
  signUp: "api/userSignUp",
  resendVerifyOtp: "api/resendVerificationOtp",
  otpVerifySignUp: "api/userOtpVerify",
  forgotPassword: "api/userForgotPassword",
  otpVerifyForgotPassword: "api/passwordOtpVerify",
  resendResetPasswordOtp: "api/resendResetPasswordOtp",
  passwordUpdate: "api/passwordUpdate",
  uploadUserProfileImage: "api/uploadUserProfileImage",
  uploadUserCoverImage : "api/uploadUserCoverImage",
};

export const POST = async (endPoint, params, header) => {

  try {
    var response = await axios({
      method: "post",
      url: baseURL + endPoint,
      data: params,
      headers: header && header
    });
    //var returnObj = JSON.parse(JSON.stringify(response.data));
    console.log("response in api ==>", response);

    return response.data;
    // return response;
  } catch (e) {
    var returnObj = {
      msg: e,
      ack: -1
    };
    console.log("catch ==> ", returnObj);
    return returnObj;
  }
};

export const GET = async (endPoint) => {
  try {
    var response = await axios({
      method: "get",
      url: baseURL + endPoint
    });
    console.log("response in api ==>", response);
    return response.data;
  } catch (e) {
    var returnObj = {
      msg: e,
      ack: -1
    };
    console.log("catch ==> ", returnObj);
    return returnObj;
  }
};

