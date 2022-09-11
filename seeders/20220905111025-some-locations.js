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

    await queryInterface.bulkInsert("locations", [
      {
        info: "Amsterdam, North-Holland, The Netherlands",
        lat: 52.3681531,
        lon: 4.9125935,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        info: "London, United Kingdom",
        lat: 51.5080989,
        lon: -0.0759211,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        info: "Vasco da Gama, Goa, India",
        lat: 15.4014241,
        lon: 73.814987,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        info: "Freetown, Western Area, Sierra Leone",
        lat: 8.4972574,
        lon: -13.2856258,
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
