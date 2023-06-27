const router = require('express').Router();

const {
  getUsersInfo,
  getUserInfo,
  getCurrentUserInfo,

  setUserInfo,
  setUserAvatar,

  loginUser,
  registerUser,
} = require('../controllers/users');

router.get('/me', getCurrentUserInfo);
router.get('/', getUsersInfo);
router.get('/:id', getUserInfo);

router.patch('/me', setUserInfo);
router.patch('/me/avatar', setUserAvatar);

router.post('/signin', loginUser);
router.post('/signup', registerUser);

module.exports = router;
