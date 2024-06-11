const languageCodeMap = {
  cpp: 54,
  python: 92,
  javascript: 93,
  java: 91,
};
async function GetSubmissin(tokenId, callback) {
  const url =  `https://judge0-ce.p.rapidapi.com/submissions/${tokenId}?base64_encoded=true&fields=*`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "c86f2a0670msh44e2aa847e0328bp1c7d7ejsne7eed9bf6deb",
      "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.text();
    return result;
  } catch (error) {
    callback({ apiStatus: "error", message: JSON.stringify(error) });
  }
}
export async function makeSubmission({
  currentcode,
  language,
  callback,
  stdin,
}) 
{ 
  console.log(currentcode);
  const url =
    "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&fields=*";
  const httpoptions = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "Content-Type": "application/json",
      "X-RapidAPI-Key": "07a452e695msh7b7aba318a9fb1dp1919cejsn085fc1e6f5bc",
      "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
    },
    body: JSON.stringify({
      language_id: languageCodeMap[language],
      source_code: btoa(currentcode),
      stdin: btoa(stdin),
    }),
  };

  try {
    callback({ apiStatus: "loading" });
    const response = await fetch(url, httpoptions);
    const result = await response.json();
    const tokenid = result.token;
    let statusCode = 1;
    let apiSubmissinResult;
    let ApiSubmissinResultObject;
    while (statusCode === 1 || statusCode === 2) {
      try {
        apiSubmissinResult = await GetSubmissin(tokenid);
        ApiSubmissinResultObject = JSON.parse(apiSubmissinResult);
        statusCode = ApiSubmissinResultObject["status_id"];
      } catch (error) {
        callback({ apiStatus: "error", message: JSON.stringify(error) });
        break;
      }
    }
    if (ApiSubmissinResultObject) {
      callback({ apiStatus: "success", data: ApiSubmissinResultObject });
    }
  } catch (error) {
    callback({
      apiStatus: "error",
      message: JSON.stringify(error),
    });
  }
}
