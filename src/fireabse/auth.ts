import { getAuth } from "firebase/auth";
import app from "./initialize";

const auth = getAuth(app);

export default auth;
