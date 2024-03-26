export const GetPdfDetails = async () => {
  try {
    const userId = JSON.parse(localStorage.getItem('user'))['uid']
    const accessToken = JSON.parse(localStorage.getItem('user'))['stsTokenManager']['accessToken']  
    const response = await fetch(`http://localhost:5000/pdfs/user?user_id=${userId}`, {
      Authorization: accessToken
    })
    return response.json()
  } catch (e) {
    // console.log(e)
  }
}