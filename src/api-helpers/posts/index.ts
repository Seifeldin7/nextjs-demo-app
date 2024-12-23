export async function getPosts() {
    const response = await fetch("http://nodejs-express-app:4000/api/v1/posts");
    const data = await response.json();
    
    return data;
}