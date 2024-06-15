import dotenv from "dotenv";
dotenv.config();
import server from "./index.js";
import { connectDb } from "./src/config/db.js";

// Start server 
try {
    server.listen(process.env.PORT, async () => {
        await connectDb();
        console.log(`server is running at port ${process.env.PORT}`);
    })
} catch (err) {
    console.log(`server failed with error ${err}`);
}