export const responseSuccessWithData = (data: any) => {
	if (!data) {
		return responseErrorWithMessage("Data not found");
	} else {
		return { data: data };
	}
};
export const responseSuccessWithMessage = (
	message: string = "Yeyy... Request Send With Successfully"
) => ({
	message: message,
});
export const responseErrorWithMessage = (
	message: string = "Upsss... Something went wrong on server"
) => ({
	message: message,
});
