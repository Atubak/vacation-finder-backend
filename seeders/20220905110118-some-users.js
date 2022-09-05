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
          name: "John Doe",
          email: "johndoe@hotmail.com",
          password: bcrypt.hashSync("john", 10),
          imgUrl:
            "https://i.pinimg.com/originals/6a/7b/0b/6a7b0b15659ff7b51efa21ab9d5f49da.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Jane Doe",
          email: "janedoe@hotmail.com",
          password: bcrypt.hashSync("jane", 10),
          imgUrl:
            "https://i.pinimg.com/originals/6a/7b/0b/6a7b0b15659ff7b51efa21ab9d5f49da.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Dom Johnson",
          email: "domjohnson@hotmail.com",
          password: bcrypt.hashSync("dom", 10),
          imgUrl:
            "https://i.pinimg.com/originals/6a/7b/0b/6a7b0b15659ff7b51efa21ab9d5f49da.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Debby Jenkins",
          email: "debbyjenkins@hotmail.com",
          password: bcrypt.hashSync("debby", 10),
          imgUrl:
            "https://i.pinimg.com/originals/6a/7b/0b/6a7b0b15659ff7b51efa21ab9d5f49da.jpg",
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
