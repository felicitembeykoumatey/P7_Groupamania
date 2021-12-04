module.exports = (sequelize, Sequelize) => {
  const PostModel = sequelize.define(
    "postModel",
    {
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      image: {
        type: Sequelize.STRING(191),
      },
      date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    },
    {
      timestamps: false,
    }
  );

  return PostModel;
};
