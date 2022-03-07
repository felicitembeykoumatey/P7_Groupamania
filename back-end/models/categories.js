
module.exports = (sequelize, Sequelize) =>{
  const Categorie = sequelize.define('categorie', {
    title: {
      type: Sequelize.STRING(45),
      allowNull: false
    },
    
    // horodatage valeur date et heure
    date: { type: Sequelize.DATE,
      defaultValue: Sequelize.NOW }
  //  updatedAt: Sequelize.DATE,
  });
  return Categorie;
};
