import { getFirestore } from "firebase/firestore";
import app from "./initialize";

const db = getFirestore(app);

export default db;
