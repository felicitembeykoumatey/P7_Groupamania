module.exports = (sequelize, Sequelize) => {
  const CommentModel = sequelize.define(
    "commentModel",
    {
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
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

  return CommentModel;
};
