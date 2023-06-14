import chatRoutes from "../routes/chat";

export default app => {
  app.use("/api/chat", chatRoutes);
};
