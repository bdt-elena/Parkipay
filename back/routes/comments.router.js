const express = require('express');
const router = express.Router();
const CommentService = require('../services/comments.service');
const validatorHandler = require('../middlewares/validator.handler');
const service = new CommentService();
const {
  createComment,
  updateComment,
  getCommentID,
} = require('../dtos/comments.dto');

router.get('/', async (req, res) => {
  const { size } = req.query;
  const limit = size || 10;
  const Comments = await service.find(limit);
  res.json(Comments);
});

//STATUS CODE

router.get(
  '/:id',
  validatorHandler(getCommentID, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const Comment = await service.findOne(id);
      res.json({
        success: true,
        message: 'Este es el comentario encontrado',
        data: Comment,
      });
    } catch (error) {
      next(error);
    }
  }
);
router.post(
  '/',
  validatorHandler(createComment, 'body'),
  async (req, res, next) => {
    const body = req.body;
    try {
      const newComment = await service.create(body);
      res.json({
        success: true,
        message: 'Comentario creado correctamente',
        data: newComment,
      });
    } catch (error) {
      next(error);
    }
  }
);

//MENSAJES DE ERROR
router.patch(
  '/:id',
  validatorHandler(getCommentID, 'params'),
  validatorHandler(updateComment, 'body'),
  async (req, res) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const Comment = await service.update(id, body);
      res.json({
        message: 'update',
        data: Comment,
        id,
      });
    } catch (error) {
      res.status(404).json({
        message: error.message,
      });
    }
  }
);

router.put(
  '/:id',
  validatorHandler(getCommentID, 'params'),
  validatorHandler(updateComment, 'body'),
  async (req, res) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const Comment = await service.updateComplete(id, body);
      res.json({
        message: 'update total',
        data: Comment,
        id,
      });
    } catch (error) {
      res.status(404).json({
        message: error.message,
      });
    }
  }
);

router.delete(
  '/:id',
  validatorHandler(getCommentID, 'params'),
  async (req, res) => {
    const { id } = req.params;
    res.json({
      message: 'delete',
      id,
    });
  }
);

module.exports = router;