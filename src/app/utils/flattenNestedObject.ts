const flattenNestedObject = (
  parentKey: string,
  nestedObject?: Record<string, unknown>,
  modifiedUpdatedData?: Record<string, unknown>,
) => {
  if (
    nestedObject &&
    typeof nestedObject === 'object' &&
    typeof modifiedUpdatedData === 'object'
  ) {
    for (const [key, value] of Object.entries(nestedObject)) {
      modifiedUpdatedData[`${parentKey}.${key}`] = value;
    }
  }
};

export default flattenNestedObject;

// if (name && Object.keys(name).length) {
//   for (const [key, value] of Object.entries(name)) {
//     modifiedUpdatedData[`name.${key}`] = value;
//   }
// }
// if (guardian && Object.keys(guardian).length) {
//   for (const [key, value] of Object.entries(guardian)) {
//     modifiedUpdatedData[`guardian.${key}`] = value;
//   }
// }
// if (localGuardian && Object.keys(localGuardian).length) {
//   for (const [key, value] of Object.entries(localGuardian)) {
//     modifiedUpdatedData[`localGuardian.${key}`] = value;
//   }
// }
