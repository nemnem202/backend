import multer from 'multer';

const storage = multer.memoryStorage();
const uploadMiddleWare = multer({storage: storage});
export default uploadMiddleWare;