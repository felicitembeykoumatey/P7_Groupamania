moodule.exports = (sequelize, Sequelize) => {
  const commentModels = sequelize.define('comment', {
    content:{type:Sequelize.TEXT, allowNull:false},
    date:{type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    }
  },{
    timestamps: false
  });
  return commentModels;
}