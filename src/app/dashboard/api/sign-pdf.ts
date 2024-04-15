const signPdf = async (pdfId: string, pdfName: string): Promise<void> => {
  const userJSONString: string | null = localStorage.getItem("user");
  const user = userJSONString && JSON.parse(userJSONString);

  // Extract access token from user data
  const accessToken: string | undefined = user?.stsTokenManager?.accessToken;

  // Construct URL with payload and access token as query parameters
  const queryParams = new URLSearchParams({
    pdf_id: pdfId,
    pdf_name: pdfName,
    user_email: user?.email,
    accessToken: accessToken || "",
  });
  const redirectUrl = `${process.env.NEXT_PUBLIC_PDF_EDIT_URL}?${queryParams.toString()}`;

  // Redirect user to the Svelte app with the constructed URL
  window.location.href = redirectUrl;
};

export default signPdf;