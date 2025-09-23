import axios from "axios";

const userServiceUrl = process.env.USER_SERVICE_URL || "http://localhost:8080";

export async function getUser(userId: string) {
  const res = await axios.get(`${userServiceUrl}/users/${userId}`);
  return res.data;
}
