import { Model, Sequelize, DataTypes } from 'sequelize';

export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  class User extends Model {
    public id!: number;
    public email!: string;
    public password!: string;
    public firstName!: string;
    public lastName!: string;
    public address!: string;
    public phoneNumber!: string;
    public gender!: boolean;
    public image?: string;
    public roleId!: string;
    public positionId?: string;
    static associate(models: any) {
      // định nghĩa mối quan hệ
    }
  }

  User.init({
    email: dataTypes.STRING,
    password: dataTypes.STRING,
    firstName: dataTypes.STRING,
    lastName: dataTypes.STRING,
    address: dataTypes.STRING,
    phoneNumber: dataTypes.STRING,
    gender: dataTypes.BOOLEAN,
    image: dataTypes.STRING,
    roleId: dataTypes.STRING,
    positionId: dataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};
