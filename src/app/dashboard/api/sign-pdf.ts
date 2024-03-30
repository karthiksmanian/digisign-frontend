const signPdf = async (pdfId: string, pdfName: string): Promise<void> => {
  const userJSONString: string | null = localStorage.getItem("user");
  const userJSON = userJSONString && JSON.parse(userJSONString);
  const userEmail = userJSON.email;
  const payload = {'pdf_id': pdfId, 'pdf_name': pdfName, 'user_email': userEmail}
  console.log(payload);
};

export default signPdf;