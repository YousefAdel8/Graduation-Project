export function getTokenData() {
  const token = localStorage.getItem("userToken");
  if (!token) {
    console.warn("No token found in localStorage");
    return null;
  }
  try {
    const decoded = JSON.parse(atob(token.split('.')[1]));
    console.log("Decoded Token:", decoded); 
    return decoded;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
}