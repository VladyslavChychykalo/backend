import { NextFunction, Request, Response } from 'express';
import Joi from '@hapi/joi';
import shortid from 'shortid';
import users from '../db';
import DB from '../db/db';

export default class Controllers {
  // GetAllUsers

  static getAllUsers(req: Request, res: Response) {
    DB.query('SELECT * FROM "user"')
      .then((r) => {
        console.log(r.rows);
        res.json(r.rows);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => DB.close());

    // ==================================================================

    // res.status(201).json(users);
  }

  // GetUser

  static getUser(req: Request, res: Response) {
    const { id } = req.params;
    DB.query(`SELECT * FROM "user" WHERE id = ${id}`)
      .then((r) => {
        console.log(r.rows);
        res.json(r.rows);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => DB.close());

    // ==================================================================

    // const { id } = req.params;
    // const requestedUser = users.find((user) => user.id === id);
    // if (!requestedUser) {
    //   const err: any = new Error(`User with id ${id} does not exist`);
    //   err.status = 404;
    //   throw err;
    // }
    // res.json(requestedUser);
  }

  // CreateUser

  static validateCreateUser(req: Request, res: Response, next: NextFunction) {
    const userSchema = Joi.object({
      name: Joi.string().required(),
      // surname: Joi.string().required(),
    });
    const result = userSchema.validate(req.body);
    if (result.error) {
      res.status(400).send(result.error);
    }
    next();
  }

  static createUser(req: Request, res: Response) {
    console.log(req.body.name);
    DB.query(`INSERT INTO "user" (name) VALUES ('${req.body.name}')`)
      .then((r) => {
        console.log(r.rows);
        res.json(r.rows);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => DB.close());

    // =================================================================

    // const id = shortid();
    // const newUser = {
    //   ...req.body,
    //   id,
    // };
    // users.unshift(newUser);
    // res.status(201).send(newUser);
  }

  // upadteUser
  static validateUpdateUser(req: Request, res: Response, next: NextFunction) {
    const userSchema = Joi.object({
      id: Joi.string(),
      name: Joi.string(),
      // surname: Joi.string(),
    });

    const result = userSchema.validate(req.body);
    if (result.error) {
      res.status(400).send(result.error);
    }
    next();
  }

  static updateUser(req: Request, res: Response) {
    console.log(req.body.name);
    DB.query(
      `UPDATE "user" SET name = '${req.body.name}' WHERE id = '${req.body.id}'`
    )
      .then((r) => {
        console.log(r.rows);
        res.json(r.rows);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => DB.close());

    // ==========================================================

    // const { id } = req.params;
    // const userIndex = users.findIndex((user) => user.id === id);
    // console.log(req.body);
    // users[userIndex] = {
    //   ...users[userIndex],
    //   ...req.body,
    // };
    // res.send(users[userIndex]);
  }

  // deleteUser
  static deleteUser(req: Request, res: Response) {
    DB.query(`DELETE FROM "user" WHERE id = '${req.body.id}'`)
      .then((r) => {
        console.log(r.rows);
        res.json(r.rows);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => DB.close());

    // ===========================================================

    // const { id } = req.params;
    // const userIndex = users.findIndex((user) => user.id === id);
    // users.splice(userIndex, 1);
    // res.status(204).send();
  }
}
