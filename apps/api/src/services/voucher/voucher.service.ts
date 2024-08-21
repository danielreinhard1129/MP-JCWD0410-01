// import { Event } from '@prisma/client';
// import prisma from '../../prisma';

// export const CreateEventService = async (body: Event) => {
//   const {
//     name,
//     thumbnail,
//     description,
//     location,
//     startDate,
//     endDate,
//     discount,
//     quota,
//     booked,
//     isDeleted,
//     userId,
//     categoryId,
//     price, // Add the missing price field
//   } = body;

//   try {
//     const newEvent = await prisma.event.create({
//       data: {
//         name,
//         thumbnail,
//         description,
//         location,
//         startDate,
//         endDate,
//         discount,
//         quota,
//         booked,
//         isDeleted,
//         userId,
//         categoryId,
//         price, // Include the price field
//       },
//     });

//     return newEvent;
//   } catch (error) {
//     throw error;
//   }
// };
