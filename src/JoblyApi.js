import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interaction with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response || err.message);
      let message = err.response?.data?.error?.message || "Unknown error occured";
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get all companies with optional search field. */
  static async getCompanies(searchTerm) {
    const res = await this.request("companies", { name: searchTerm });
    return res.companies;
  }

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    const res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get all jobs wtih optional search field. */

  static async getJobs(searchTerm) {
    const res = await this.request("jobs", { title: searchTerm });
    return res.jobs;
  }

  
  static async getJobs(searchTerm = "") {
    const query = searchTerm ? `?title=${searchTerm}` : "";
    const res = await this.request(`jobs${query}`);
    return res.jobs;
  }



  static async getJob(id) {
    const res = await this.request(`jobs/${id}`);
    return res.job;
  }
  // obviously, you'll add a lot here ...
  /** Log in with username and password. */
  static async login(data) {
    const res = await this.request(`auth/token`, data, "post");
    return res.token;
  }

  /** Register a new user. */
  static async signup(data) {
    const res = await this.request(`auth/register`, data, "post");
    return res.token;
  }

  /** Get the current user by username. */
  static async getCurrentUser(username) {
    const res = await this.request(`users/${username}`);
    return res.user;
  }

  /** Update profile for the logged-in user. */
  static async saveProfile(username, data) {
    const res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }

  /** Apply for a job by job ID. */
  static async applyToJob(username, jobId) {
    await this.request(`users/${username}/jobs/${jobId}`, {}, "post");
  }

}

// for now, put token ("testuser" / "password" on class)
JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
    "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
    "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default JoblyApi;