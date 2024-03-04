export class CreateToDoDto {
    
    constructor(
        public readonly text: string
    ){}

    static create(props: {[key:string]: any}):[string?,CreateToDoDto?] {

        const {text} = props
        if(!text) return ['Invalid text', undefined]
        if(typeof text !== 'string') return ['Invalid text', undefined]


        return [undefined, new CreateToDoDto(text)]
    }
}