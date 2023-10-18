import MenuController from "../controllers/MenuController";
import BaseRoutes from "./BaseRouter";

class MenuRoutes extends BaseRoutes {

    public routes(): void {
        this.router.get("/", MenuController.index);
        this.router.post("/", MenuController.create);
        this.router.get("/:id", MenuController.show);
        this.router.put("/:id", MenuController.update);
        this.router.delete("/:id", MenuController.delete);
    }
}

export default new MenuRoutes().router;