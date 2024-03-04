import { Request, Response } from "express"

interface ToDo {
    id: number
    name: string
    createdAt: Date|null

}

const toDos: ToDo[] = [
    {id:1, name:'Todo 1', createdAt: new Date()},
    {id:2, name:'Todo 2', createdAt: new Date()},
    {id:3, name:'Todo 3', createdAt: new Date()},
]

export class ToDosController {

    constructor(){}


        public getToDos = (req: Request,res: Response) => {
            return res.json(toDos)
        }
        public getToDoById = (req: Request,res: Response) => {
           //GET
            const id = +req.params.id
            const todo = toDos.find(todo => todo.id === id)
            if(isNaN(id)) return res.status(400).json({message: 'Invalid id'})
            if(todo) return res.json(todo)
            else return res.status(404).json({message: 'Not found'})
        }

        public createToDo = (req: Request,res: Response) => {
           //POST
            const body = req.body
            toDos.push({id: toDos.length + 1, name: body.name, createdAt: new Date()})
            return res.json(toDos)
        }
    
        public updateToDo = (req: Request,res: Response) => {
          //PUT
            const id = +req.params.id
            const body = req.body
            const todo = toDos.find(todo => todo.id === id)
            if(isNaN(id)) return res.status(400).json({message: 'Invalid id'})
            if(todo){
                todo.name = body.name || todo.name
                if(body.createdAt == 'null'){
                    todo.createdAt = null
                }else todo.createdAt = body.createdAt || todo.createdAt 
                return res.json(toDos)
            }
            else return res.status(404).json({message: 'Not found'})
        }

        public deleteToDo = (req: Request,res: Response) => {
            //DELETE
            const id = +req.params.id
            const todo = toDos.find(todo => todo.id === id)
            if(isNaN(id)) return res.status(400).json({message: 'Invalid id'})
            if(todo){
                toDos.splice(toDos.indexOf(todo),1)
                return res.json(toDos)
            }
            else return res.status(404).json({message: 'Not found'})
        }

}