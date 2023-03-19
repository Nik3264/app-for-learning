export const getResource = async (urlAuth, url) => {
    let res = await fetch(urlAuth);
    let token = await res.json();
  
    let resData = await fetch(url,{
      method: "GET",
      headers:{
      'Content-type': 'application/json',
      'Authorization': `Bearer ${token.token}`
      }
    });
    let data = await resData.json();
    console.log(data);
    return data;
  }
