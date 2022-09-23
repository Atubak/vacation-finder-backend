"use strict";
const bcrypt = require("bcrypt");

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

    await queryInterface.bulkInsert(
      "users",
      [
        {
          name: "Mr. Anderson",
          email: "neo@matrix.com",
          password: bcrypt.hashSync("neo", 10),
          imgUrl:
            "https://res.cloudinary.com/djsz833wc/image/upload/v1663793927/VacaLoca%20Users/janh62bqjrxrxkgonugi.png",
          description: "I know Kung-Fu!",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Strawberry",
          email: "strawberry@fields.com",
          password: bcrypt.hashSync("strawberry", 10),
          imgUrl:
            "https://res.cloudinary.com/djsz833wc/image/upload/v1663793504/VacaLoca%20Users/ubr3cdwespcd6kmmlia3.png",
          description: "You are the straw to my berry.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
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
