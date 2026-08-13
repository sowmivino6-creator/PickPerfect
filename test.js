const mongoose = require("mongoose");

(async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://pickperfect_user:pickperfect123@cluster0.j4dznap.mongodb.net/pickperfect?retryWrites=true&w=majority&appName=Cluster0"
    );

    console.log("✅ Connected");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();