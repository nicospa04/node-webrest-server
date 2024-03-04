import { Request, Response } from "express"
import { prisma } from "../../data/postgres"
import { CreateToDoDto, UpdateToDoDto } from "../../domain/dtos"



export class ToDosController {

    constructor(){}


        public getToDos = async (req: Request,res: Response) => {
           const toDos = await prisma.todo.findMany()
            return res.json(toDos)
        }
        public getToDoById = async(req: Request,res: Response) => {
           //GET
          const id = +req.params.id
          if(isNaN(id)) return res.status(400).json({message: 'Invalid id'})
            
          const todo = await prisma.todo.findFirst({
                where: {
                    id: id
                }
            })

            if(todo) res.json(todo)
            else res.status(404).json({message: `Todo with id ${id} not found`})
        }

        public createToDo = async (req: Request,res: Response) => {
           //POST
           
           const [error,createToDo] = CreateToDoDto.create(req.body);
           if(error) return res.status(400).json({message: error})


            const task = await prisma.todo.create({
                data: createToDo!       
            })

            return res.json(task)
        }
    
        public updateTodo = async ( req: Request, res: Response ) => {

            const id = +req.params.id;
            
            const [error,UpdatedTodo] = UpdateToDoDto.create({id, ...req.body})

            if(error) return res.status(400).json({message: error})

            
            const FindedTodo = await prisma.todo.findFirst({
                where: {
                    id: id
                }
            })
            if ( !FindedTodo ) return res.status( 404 ).json( { error: 'Todo not found' } );

            const updatedTodo = await prisma.todo.update({
                where: {id: id},
                data: UpdatedTodo!.values
            })

            return res.json(updatedTodo)
            }
          

        public deleteToDo = async (req: Request,res: Response) => {
            //DELETE
            const id = +req.params.id
            if(isNaN(id)) return res.status(400).json({message: 'Invalid id'})

            const deleteTodo = await prisma.todo.findFirst({
                where:{id: id}
            })

            if(!deleteTodo) return res.status(404).json({message: 'Todo not found'})

            await prisma.todo.delete({
                where: {
                    id: id
                }
            })
            return res.json({message: `Todo with id ${id} deleted`})
        }

}