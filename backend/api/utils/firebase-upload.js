const { ref, uploadBytesResumable, getDownloadURL, deleteObject, listAll } = require("firebase/storage");
const storage = require('../config/firebase-configs.js');
const fs = require('fs');
const path = require("path");

const uploadFile = async (id, files) => {
  const downloadUrls = [];
  try {
    for (const file of files) {
      const filePath = path.join(file.destination, file.filename);
      const fileBuffer = fs.readFileSync(filePath);
      const storageRef = ref(storage, `project-images/${id}/${file.originalname}`);
      const uploadTask = await uploadBytesResumable(storageRef, fileBuffer);

      uploadTask.task.on('state_changed',
        (snapshot) => {},
        (error) => {
          console.error('Error uploading file:', error);
        }
      );

      const snapshot = await uploadTask.task;
      if (snapshot.state === 'success') {
        const downloadURL = await getDownloadURL(snapshot.ref);
        downloadUrls.push(downloadURL);
        fs.unlinkSync(filePath);
      }
    }

    return downloadUrls;
  } catch (error) {
    console.error('Error uploading files:', error);
    throw error;
  }
}

const deleteFiles = async (id) => {
  try {
    await listAll(ref(storage, `project-images/${id}`))
      .then((res) => {
        res.items.forEach((itemRef) => {
          console.log('Deleted ' + itemRef.name);
          deleteObject(itemRef);
        });
      }).catch((error) => {
        console.log(error.message);
      });
  } catch (error) {
    console.error('Error deleting files:', error);
    throw error;
  }
}

module.exports = { uploadFile, deleteFiles };
