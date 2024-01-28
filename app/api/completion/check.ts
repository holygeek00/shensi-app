const AK = "CGd1dmv8WT7T3QXohe3FXaZB";
const SK = "a0q4My9zFg0TUsrahxM5pxXL4Oqe0OeP";

export async function textCensorHandler(text) {
  try {
    const accessToken = await getAccessToken();

    const response = await fetch('https://aip.baidubce.com/rest/2.0/solution/v1/text_censor/v2/user_defined?access_token=' + accessToken, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      body: 'text=' + encodeURIComponent(text)
    });

    const data = await response.json();

    if (data.conclusion === "合规") {
      return data.conclusion;
    } else {
      const message = data.data[0].msg;
      console.log(message)
      return message;
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

async function getAccessToken() {
  const response = await fetch(`https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=${AK}&client_secret=${SK}`, {
    method: 'POST'
  });

  const data = await response.json();
  return data.access_token;
}
