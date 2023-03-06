import { format } from "date-fns";

const dateFormatter = (date) =>
	date ? format(new Date(date), "dd-MM-yyyy") : "";

export { dateFormatter };
