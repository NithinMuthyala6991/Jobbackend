import multer from "multer";


const storage = multer.memoryStorage()
const mediaHandler = multer({ storage: storage });

export default mediaHandler;