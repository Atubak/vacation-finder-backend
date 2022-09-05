"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert("comments", [
      {
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque tempus nec turpis sit amet porta. Nam ullamcorper hendrerit sodales. Etiam.",
        userId: 1,
        locationId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque tempus nec turpis sit amet porta. Nam ullamcorper hendrerit sodales. Etiam.",
        userId: 2,
        locationId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque tempus nec turpis sit amet porta. Nam ullamcorper hendrerit sodales. Etiam.",
        userId: 3,
        locationId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque tempus nec turpis sit amet porta. Nam ullamcorper hendrerit sodales. Etiam.",
        userId: 4,
        locationId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
