import { Request, Response } from "express";
import validator from "validator";
import { utils } from "../utils/utils";
import model from "../models/usuarioModel";


class UsuarioController {


  public async list(req: Request, res: Response) {
    try {
      return res.json({ message: "Listado de Usuario", code: 0 });
    } catch (error: any) {
      return res.status(500).json({ message: `${error.message}` });
    }
  }


  public async add(req: Request, res: Response) {
    try {
        
      const newUser = req.body;
      var encytedText = await utils.hashPassword(newUser.password);
      newUser.password = encytedText;
      await model.add(newUser);
      return res.json({ message: "Usuario agregado", code: 0 });
      
      
  } catch (error: any) {
      if (error.message === "El usuario con este email ya existe") {
          return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: error.message });
  }
  }


  public async update(req: Request, res: Response) {
    try {
      const userUpdate = req.body;
      var encytedText = await utils.hashPassword(userUpdate.password);
      userUpdate.password = encytedText;
      await model.update(userUpdate);
      return res.json({ message: "Usuario actualizado", code: 0 });
  } catch (error: any) {
      if (error.message === "El usuario con este email no existe") {
          return res.status(404).json({ message: error.message });
      }
      return res.status(500).json({ message: error.message });
  }
  }


  public async delete(req: Request, res: Response) {
    try {
      return res.json({ message: "Eliminación de Usuario", code: 0 });
    } catch (error: any) {
      return res.status(500).json({ message: `${error.message}` });
    }
  }
}
export const usuarioController = new UsuarioController();