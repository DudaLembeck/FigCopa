import { ref } from 'vue'
import data from '@/data/data.json'

const figuras = ref(data.figuras)

export function useAlbum(){

    function alterarStatus(id:number){

        const figura = figuras.value.find(
            f => f.id === id
        )

        if(figura){
            figura.status = !figura.status
        }
    }

    return{
        figuras,
        alterarStatus
    }

}