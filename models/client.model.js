module.exports = (sequelize, Sequelize) => {
  const Client = sequelize.define("client", {
    fname: {
      type: Sequelize.STRING
    },
    lname: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    tel: {
      type: Sequelize.INTEGER
    }
  });

  return Client;
};