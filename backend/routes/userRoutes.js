import express from 'express';
const router = express.Router();

import {auth,isAdmin} from '../middlewares/auth.js';
import {signup,login} from '../controllers/Auth.js';
import {createFaculty,
        getFaculty,
        getFacultyById,
        updateFaculty,
        deleteFaculty,
        filterFaculty} from '../controllers/FacultyController.js';

//signup login routes
router.post('/signup',signup);
router.post('/login',login);

//faculty routes
router.post('/createFaculty',auth,isAdmin,createFaculty);
router.get('/getFaculty',getFaculty);
router.get('/faculty/:id', getFacultyById); 
router.patch('/updateFaculty/:id',auth,isAdmin,updateFaculty);
router.delete('/deleteFaculty/:id',auth,isAdmin,deleteFaculty);
router.get('/filterFaculty',filterFaculty);

import {
    createAlumni,
    getAlumni,
    getAlumniById,
    updateAlumni,
    deleteAlumni,
    filterAlumni,
  } from '../controllers/AlumniController.js';
  
  // Alumni routes
  router.post('/createAlumni', auth, isAdmin, createAlumni);
  router.get('/getAlumni', getAlumni);
  router.get('/alumni/:id', getAlumniById);
  router.patch('/updateAlumni/:id', auth, isAdmin, updateAlumni);
  router.delete('/deleteAlumni/:id', auth, isAdmin, deleteAlumni);
  router.get('/filterAlumni', filterAlumni);
  
  export default router;