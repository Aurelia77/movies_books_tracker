// Fonction pour trier le tableau d'objets par ordre alphabétique sur l'attribut name (ne prend pas en compte la casse)
export const sortArrayBy = (array, propriete) => {
    //console.log("array dans fonct sort", array)     // bizarre dans le LOG il est déjà trié !!! Pourquoi ???
    return array.sort((a, b) => {
        // console.log("a : ",a.name.toLocaleLowerCase())
        // console.log("b : ",b.name.toLocaleLowerCase())
        // console.log(a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase())
        if (propriete === 'name') return (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase() ? 1 : -1)
        else if (propriete === 'category') return (a.category.toLocaleLowerCase() > b.category.toLocaleLowerCase() ? 1 : -1)
    })
}
