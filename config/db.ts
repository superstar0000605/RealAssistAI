import mongoose from "mongoose";

export default async () => {
  mongoose.connect("mongodb://localhost:27017/chatAIdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
};
