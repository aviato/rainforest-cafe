const { parse }    = require('url');
const challengeUrl = 'https://letsrevolutionizetesting.com/challenge'

async function getChallengeResponse(url, ids = []) {
  try {
    const headers = {
      'Accept': 'application/json'
    };

    const res  = await fetch(url, { method: 'GET', headers });
    const data = await res.json();

    if (data.follow) {
      const parsed = parse(data.follow, true);
      const id     = parseInt(parsed?.query?.id, 10);

      console.log({ parsed, id });

      return await getChallengeResponse(data.follow, [...ids, id]);
    } else {
      console.log("Is this the end?");
      console.log({ res, data });
      return ids;
    }
  } catch (e) {
    console.error("Request failed: ", e);
  }
}

(async function() {
  const result = await getChallengeResponse(challengeUrl);
  if (Array.isArray(result) && result.length) {
    const sum = result.reduce((next, acc) => acc + next, 0);
    console.log(`The sum of all the ids is ${sum}`);
  }
})();

