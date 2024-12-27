import { API_BASE_URL } from "../../utils/constants";

export async function getPosts(token: string) {
  const response = await fetch(`${API_BASE_URL}/api/v1/posts`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();

  return data;
}
