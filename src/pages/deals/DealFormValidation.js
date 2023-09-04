import * as yup from "yup";

const MAX_FILE_SIZE = 3 * 1024 * 1024;

const DealFormSchema = yup.object().shape({
  dealType: yup.string().required("Deal Type is required"),
  syndicateName: yup.string().required("Syndicate Name is required"),
  roundSize: yup.string().required("Round Size is required"),
  roundName: yup.string().required("Round Name is required"),
  minInvest: yup
    .string()
    .test(
      "minInvest",
      "Min. Invest cannot be less than zero",
      (value) => value >= 0
    )
    .required("Min. Invest is required"),
  preMoneyValuation: yup.string().required("Pre-money Valuation is required"),
  dealInstrument: yup.string().required("Deal Instrument is required"),
  dealRoute: yup.string().required("Deal Route is required"),
  startDate: yup.date().required("Start Date is required"),
  endDate: yup
    .date()
    .required("End Date is required")
    .min(yup.ref("startDate"), "End Date can't be before Start Date"),
  avgAmtInsight1: yup
    .string()
    .required("AAI is required"),
  avgAmtInsight2: yup
    .string()
    .test(
      "minValue",
      "Avg Amount Insight cannot be less than zero",
      (value) => value >= 0
    )
    .required("Avg Amount Insight is required"),
  email: yup.array().of(
    yup.object().shape({
      email: yup.string().email("Invalid Email").required("Required field"),
    })
  ),
  highlights: yup
    .array()
    .of(
      yup.object().shape({
        description: yup.string().required("Highlight Description is required"),
      })
    )
    .min(1),
  document: yup.array().of(
    yup.object().shape({
      name: yup.string().required("Document name is required"),
      description: yup.string(),
      doc: yup
        .mixed()
        .required("Upload doc image")
        .test("fileSize", "Max. size 3MB", (value) => {
          if (!value) return true;

          const fileSizeInBytes = value.size || 0;
          return fileSizeInBytes <= MAX_FILE_SIZE;
        }),
    })
  ),
  bgImage: yup
    .mixed()
    .required("Upload Background Image")
    .test("fileSize", "Max. size 3MB", (value) => {
      if (!value) return true;

      const fileSizeInBytes = value.size || 0;
      return fileSizeInBytes <= MAX_FILE_SIZE;
    }),
  coverImage: yup
    .mixed()
    .required("Upload Cover Image")
    .test("fileSize", "Max. size 3MB", (value) => {
      if (!value) return true;

      const fileSizeInBytes = value.size || 0;
      return fileSizeInBytes <= MAX_FILE_SIZE;
    }),
});

export default DealFormSchema;
