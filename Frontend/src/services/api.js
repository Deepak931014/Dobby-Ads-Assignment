export const asyncPostCall = async (path, headersBody) => {
  try {
    const response = await fetch(`https://dobby-ads-server-ak2s.onrender.com${path}`, headersBody);
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.indexOf('application/json') !== -1) {
      const data = await response.json();
      return data;
    } else {
      const errorText = await response.text();
      console.error(`Error: ${errorText}`);
      throw new Error(`Unexpected response format: ${contentType}`);
    }
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};
