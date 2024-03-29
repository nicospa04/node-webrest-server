import { Router } from "express"
import { ToDosController } from "./controller"

export class ToDoRoutes {

    static get routes(): Router{

        const router = Router()
        const toDosController = new ToDosController()

        router.get('/',  toDosController.getToDos)
        router.get('/:id', toDosController.getToDoById)
        router.post('/', toDosController.createToDo)
        router.put('/:id', toDosController.updateTodo)
        router.delete('/:id', toDosController.deleteToDo)

        return router
    }

} 