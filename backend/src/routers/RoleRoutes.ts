import RoleController from "../controllers/RoleController";
// import validate from "../middleware/RoleValidator";
import BaseRoutes from "./BaseRouter";

class RoleRoutes extends BaseRoutes {

    public routes(): void {
        this.router.get("/", RoleController.index);
        this.router.post("/", RoleController.create);
        this.router.get("/:id", RoleController.show);
        this.router.put("/:id", RoleController.update);
        this.router.delete("/:id", RoleController.delete);
    }
}

export default new RoleRoutes().router;