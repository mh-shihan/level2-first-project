// const queryObj = { ...query };

//   let searchTerm = '';
//   if (query?.searchTerm) {
//     searchTerm = query.searchTerm as string;
//   }

//   const studentSearchableField: string[] = [
//     'id',
//     'email',
//     'name.firstName',
//     'presentAddress',
//     'contactNo',
//   ];
//   const searchQuery = Student.find({
//     $or: studentSearchableField.map((field) => ({
//       [field]: { $regex: searchTerm, $options: 'i' },
//     })),
//   });

//   // Filtering
//   const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
//   excludeFields.forEach((element) => delete queryObj[element]);

//   const filterQuery = searchQuery
//     .find(queryObj)
//     .populate('admissionSemester')
//     .populate({
//       path: 'academicDepartment',
//       populate: {
//         path: 'academicFaculty',
//       },
//     });

//   // Sorting
//   let sort = '-createdAt';
//   if (query?.sort) {
//     sort = query.sort as string;
//   }
//   const sortQuery = filterQuery.sort(sort);

//   // Pagination & Limiting
//   let limit = 1;
//   let page = 1;

//   if (query?.limit) {
//     limit = Number(query.limit);
//   }
//   if (query?.page) {
//     page = Number(query.page);
//   }

//   const paginateQuery = sortQuery.skip((page - 1) * limit);

//   const limitQuery = paginateQuery.limit(limit);

//   // Field Limiting
//   let fields = '__v';
//   if (query?.fields) {
//     fields = (query.fields as string).split(',').join(' ');
//     console.log({ fields });
//   }

//   const fieldQuery = await limitQuery.select(fields);
//   return fieldQuery;

// GET LAST STUDENT ID
// const findLastStudentId = async () => {
//   const lastStudent = await User.findOne(
//     {
//       role: 'student',
//     },
//     {
//       id: 1,
//       _id: 0,
//     },
//   )
//     .sort({ createdAt: -1 })
//     .lean();

//   return lastStudent?.id;
// };
