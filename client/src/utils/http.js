const doFetch = async (url, options) => {
    console.log("dofetch: ", options.body.entries)
    const response = await fetch(url, options);
    const json = await response.json();
    if (json.error) {
      throw new Error(json.message + ': ' + json.error);
    } else if (!response.ok) {
      throw new Error('doFetch: fetch failed!', url);
    } else {
      return json;
    }
  };
  
  export {doFetch};