import { getStorage } from "firebase/storage";
import app from "./initialize";

const storage = getStorage(app);

export default storage;
