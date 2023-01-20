import { User } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import storage from "../fireabse/storage";

const uploadAvatarImage = async (user: User, file: File) => {
  const uid = user.uid;

  const fileType = file.type;

  let extension;
  if (fileType == "image/jpeg") {
    extension = "jpg";
  } else if (fileType == "image/png") {
    extension = "png";
  }

  const storageRef = ref(storage, `/user/${uid}/public/profile.${extension}`);
  const metadata = {
    contentType: fileType,
  };

  let avatarImageSrc = "";

  const snapshot = await uploadBytes(storageRef, file, metadata);
  avatarImageSrc = await getDownloadURL(snapshot.ref);

  return avatarImageSrc;
};

export default uploadAvatarImage;
