import { Request, Response } from "express";
import { utils } from "../utils/utils";
import model from "../models/usuarioModel";


class UsuarioController {


  public async list(req: Request, res: Response) {
    try {
      const usuarios = await model.list();
      return res.json(usuarios);
    } catch (error: any) {
      return res.status(500).json({ message: `${error.message}` });
    }
  }


  public async add(req: Request, res: Response) {
    try {
      const newUser = req.body;
      if(newUser.password == "") return res.json({message: "Password vacia", code: 500});
      if(newUser.email == "") return res.json({message: "Email vacio", code: 500});
      let encytedText = await utils.hashPassword(newUser.password);
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
      if(userUpdate.password == "") return res.json({message: "Password vacia", code: 500});
      if(userUpdate.email == "") return res.json({message: "Email vacio", code: 500});
      let encytedText = await utils.hashPassword(userUpdate.password);
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
      const email = req.body.email;
      await model.delete(email);
      return res.json({ message: "Usuario eliminado", code: 0 });
    } catch (error: any) {
      return res.status(500).json({ message: `${error.message}` });
    }
  }
}
export const usuarioController = new UsuarioController();