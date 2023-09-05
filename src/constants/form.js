export const QUALIFICATIONS = {
  Qualification: "",
  BTech: "btech",
  MTech: "mtech",
};

export const GENDER = {
  Male: "M",
  Female: "F",
};

export const QUALIFICATION_LABELS = {
  [QUALIFICATIONS.BTech]: "BTech",
  [QUALIFICATIONS.MTech]: "MTech",
};

export const GENDER_LABELS = {
  [GENDER.Female]: "Female",
  [GENDER.Male]: "Male",
};

export const GENDER_SELECT = { Gender: "", ...GENDER };

export const STEPPER_STATES = [
  { id: 1, label: "Personal Details", path: "/form" },
  { id: 2, label: "Create Deal", path: "/form/deals" },
  { id: 3, label: "User Listing", path: "" },
];
