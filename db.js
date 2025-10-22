import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
  email: { type: String, unique: true },
  username: String,
  password: String
});

const AdminSchema = new Schema({
  email: { type: String, unique: true },
  username: String,
  password: String
});

const CourseSchema = new Schema({
  creatorId: ObjectId,
  title: String,
  description: String,
  price: Number,
  imageUrl: String,
});

const PurchaseSchema = new Schema({
  userId: ObjectId,
  courseId: ObjectId
})

export const UserModel = mongoose.model('users', UserSchema);
export const AdminModel = mongoose.model('admins', AdminSchema);
export const CourseModel = mongoose.model('courses', CourseSchema);
export const PurchaseModel = mongoose.model('purchases', PurchaseSchema);

