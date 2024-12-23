export async function getPosts() {
    const response = await fetch("http://localhost:4000/api/v1/posts");
    const data = await response.json();
    
    return data;
}