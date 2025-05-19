import * as Yup from "yup";

export const jobValidationSchema = Yup.object({
  jobTitle: Yup.string().required("Required"),
  companyName: Yup.string().required("Required"),
  location: Yup.string().required("Required"),
  jobType: Yup.string().required("Required"),
  salaryMin: Yup.number().required("Required").typeError("Must be a number"),
  salaryMax: Yup.number().required("required").typeError("Must be a number"),
  deadline: Yup.date().required("Required"),
  description: Yup.string().required("Required"),
});
