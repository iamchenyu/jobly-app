import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    // there are multiple ways to pass an authorization token, this is how to pass it in the header.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get all companies. */
  static async getAllCompanies() {
    let res = await this.request(`companies`);
    return res.companies;
  }

  /** Get details on a company by handle. */
  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get all jobs. */
  static async getAllJobs() {
    let res = await this.request("jobs");
    return res.jobs;
  }

  /** Get details on a job by id. */
  static async getJob(id) {
    let res = await this.request(`jobs/${id}`);
    return res.job;
  }

  /** Apply for a job. */
  static async apply(username, jobId) {
    const res = await this.request(
      `users/${username}/jobs/${jobId}`,
      {},
      "post"
    );
    return res;
  }

  /** Log in a user. */
  static async login(data) {
    const res = await this.request("auth/login", data, "post");
    return res;
  }

  /** Register a user. */
  static async register(data) {
    const res = await this.request("auth/register", data, "post");
    return res;
  }

  /** Get a single user. */
  static async getUser(username) {
    const res = await this.request(`users/${username}`);
    return res;
  }

  /** Update a single user. */
  static async updateUser(username, data) {
    const res = await this.request(`users/${username}`, data, "patch");
    return res;
  }

  /** UnSplash API calls. */
  static async getImages() {
    const res = await axios.get(`${BASE_URL}/apis/images`);
    return res;
  }
}

// set up the token
JoblyApi.token = JSON.parse(localStorage.getItem("token"));

export { JoblyApi };
